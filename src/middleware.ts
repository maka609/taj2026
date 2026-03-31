import createIntlMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always'
});

export default auth((req: NextRequest & { auth: any }) => {
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

  // Strict Security for Admin & Dashboard Pages
  if (isAdminPage || isDashboardPage) {
    if (!isAuth) {
      const locale = req.cookies.get('NEXT_LOCALE')?.value || 'ar';
      return Response.redirect(new URL(`/${locale}/portal/login`, req.nextUrl));
    }
  }

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
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
