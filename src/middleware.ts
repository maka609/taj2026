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
  const isAuthPage = req.nextUrl.pathname.includes('/login') || req.nextUrl.pathname.includes('/register');
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
  const isPortalPage = req.nextUrl.pathname.includes('/portal');

  // NextAuth logic - تعطيل الحماية مؤقتاً للأدمن
  // TODO: تفعيل الحماية بعد إنشاء مستخدم admin
  /*
  if (isAdminPage || isPortalPage) {
    if (!isAuth && !isAuthPage) {
      return Response.redirect(new URL('/ar/portal/login', req.nextUrl));
    }
  }
  */

  // السماح بالوصول للأدمن بدون تسجيل دخول مؤقتاً
  if (isAdminPage) {
    return;
  }

  // If at root and no locale cookie, let it through to the gateway
  if (req.nextUrl.pathname === '/') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value;
    if (!locale) {
      return;
    }
  }

  // next-intl logic
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
