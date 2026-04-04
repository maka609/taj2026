import createIntlMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { NextRequest } from 'next/server';

// --- In-Memory Rate Limit Store ---
interface RateLimitData {
  count: number;
  resetTime: number;
  loginFailures: number;
  lastLoginFailure: number;
}

const rateLimitStore = new Map<string, Record<string, RateLimitData>>();

function getIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || '127.0.0.1';
}

function checkRateLimit(ip: string, route: string, limit: number, windowMs: number): { allowed: boolean, remaining: number, reset: number } {
  const now = Date.now();
  let ipData = rateLimitStore.get(ip);
  if (!ipData) {
    ipData = {};
    rateLimitStore.set(ip, ipData);
  }

  const routeData = ipData[route] || { count: 0, resetTime: now + windowMs, loginFailures: 0, lastLoginFailure: 0 };

  if (now > routeData.resetTime) {
    routeData.count = 1;
    routeData.resetTime = now + windowMs;
  } else {
    routeData.count++;
  }

  ipData[route] = routeData;

  return {
    allowed: routeData.count <= limit,
    remaining: Math.max(0, limit - routeData.count),
    reset: routeData.resetTime
  };
}

const intlMiddleware = createIntlMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always'
});

export default auth(async (req: NextRequest & { auth?: unknown }) => {
  const ip = getIP(req);
  const pathname = req.nextUrl.pathname;

  // 1. Global Rate Limit: 100 req / 15 min
  const globalLimit = checkRateLimit(ip, 'global', 100, 15 * 60 * 1000);
  if (!globalLimit.allowed) {
    return new Response('Too Many Requests', { status: 429 });
  }

  // 2. /api/auth/login: 5 attempts / min
  if (pathname.includes('/api/auth/login')) {
    const loginLimit = checkRateLimit(ip, 'login', 5, 60 * 1000);
    if (!loginLimit.allowed) {
      return new Response('Login Limit Exceeded', { status: 429 });
    }

    // Slow down: add 500ms delay after 3 fails
    const ipData = rateLimitStore.get(ip);
    if (ipData && ipData['login']?.loginFailures > 3) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // 3. /api/upload: 10 uploads / hour
  if (pathname.includes('/api/upload')) {
    const uploadLimit = checkRateLimit(ip, 'upload', 10, 60 * 60 * 1000);
    if (!uploadLimit.allowed) {
      return new Response('Upload Limit Exceeded', { status: 429 });
    }
  }

  // 4. /api/* public routes (excluding auth/upload): 60 req / min
  if (pathname.startsWith('/api/') && !pathname.includes('/api/auth') && !pathname.includes('/api/upload')) {
    const apiLimit = checkRateLimit(ip, 'api-public', 60, 60 * 1000);
    if (!apiLimit.allowed) {
      return new Response('API Rate Limit Exceeded', { status: 429 });
    }
  }

  // 5. /api/* Body size limit: 10kb
  if (pathname.startsWith('/api/')) {
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
      return new Response('Payload Too Large', { status: 413 });
    }
  }

  const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL;

  // --- Handle CORS Preflight ---
  if (req.method === 'OPTIONS') {
    const response = new Response(null, { status: 204 });
    if (allowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }

  // --- Request Timeout Logic ---
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const processRequest = async () => {
    const response = await handleMiddleware(req);
    return response;
  };

  try {
    const response = await Promise.race([
      processRequest(),
      new Promise<Response | undefined>((_, reject) => {
        controller.signal.addEventListener('abort', () => {
          reject(new Error('Gateway Timeout'));
        });
      })
    ]);

    if (!response) return response;

    // Add CORS headers to the response
    const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL;
    if (allowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    return response;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Gateway Timeout') {
      return new Response('Gateway Timeout', { status: 504 });
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
});

async function handleMiddleware(req: NextRequest & { auth?: unknown }) {
  const isAuth = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Detect if it's an admin page (handles both /admin and /[locale]/admin)
  const isAdminPage = pathname.startsWith('/admin') ||
                      pathname.match(/^\/(ar|en)\/admin/);

  const isDashboardPage = pathname.match(/^\/(ar|en)\/dashboard/);

  const isApiRoute = pathname.startsWith('/api') && !pathname.startsWith('/api/auth');
  const isRootPage = pathname === '/';

  // Protect Internal API Routes
  if (isApiRoute && !isAuth) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get locale from cookie
  const localeCookie = req.cookies.get('NEXT_LOCALE')?.value;

  // Strict Security for Admin & Dashboard Pages (TEMPORARILY DISABLED FOR PREVIEW)
  /*
  if (isAdminPage || isDashboardPage) {
    if (!isAuth) {
      const locale = req.cookies.get('NEXT_LOCALE')?.value || 'ar';
      return Response.redirect(new URL(`/${locale}/portal/login`, req.nextUrl));
    }
  }
  */

  // Handle Root Page (Splash Screen)
  if (isRootPage) {
    // If admin is logged in, send to admin dashboard
    if (isAuth && req.auth.role === 'ADMIN') {
        return Response.redirect(new URL('/admin', req.nextUrl));
    }

    // If locale is already chosen, redirect to that locale
    if (localeCookie && ['ar', 'en'].includes(localeCookie)) {
        return Response.redirect(new URL(`/${localeCookie}`, req.nextUrl));
    }

    // Otherwise, let them see the splash screen (root page.tsx)
    return;
  }

  // next-intl logic for other pages
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
