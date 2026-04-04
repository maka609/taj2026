import createIntlMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always'
});

export default auth(async (req: NextRequest & { auth?: unknown }) => {
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
