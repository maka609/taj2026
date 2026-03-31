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
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
  const isRootPage = req.nextUrl.pathname === '/';

  // Get locale from cookie
  const localeCookie = req.cookies.get('NEXT_LOCALE')?.value;

  // Strict Security for Admin Pages
  if (isAdminPage) {
    if (!isAuth || req.auth.role !== 'ADMIN') {
      const locale = req.cookies.get('NEXT_LOCALE')?.value || 'ar';
      return Response.redirect(new URL(`/${locale}/portal/login`, req.nextUrl));
    }
    return;
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
