import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/actions/settings-engine";
import { getOptimizedImage } from "@/lib/utils";
import React from "react";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  const settings = await getSettings();
  const optimizedLogo = getOptimizedImage(settings?.general?.logoUrl, { width: 200, height: 200 });
  const optimizedFavicon = getOptimizedImage(settings?.general?.faviconUrl, { width: 32, height: 32 });

  // JSON-LD for Schema.org SEO
  const jsonLd = settings?.seo?.schema || {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": settings?.general?.siteNameEn || "Taj Schools",
    "alternateName": settings?.general?.siteNameAr || "مدارس تاج النزهة",
    "url": "https://taj-schools.com",
    "logo": optimizedLogo,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings?.contact?.phone,
      "contactType": "customer service",
      "email": settings?.contact?.email
    }
  };

  return (
    <div
      lang={locale}
      dir={direction}
      className="min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20"
      style={{
        // Dynamic colors from database using settings engine
        "--primary": settings?.general?.primaryColor || "#7c3aed",
        "--secondary": settings?.general?.secondaryColor || "#ea580c",
        // Additional requested variables
        "--primary-color": settings?.general?.primaryColor || "#7c3aed",
        "--school-name": locale === 'ar' ? settings?.general?.siteNameAr : settings?.general?.siteNameEn
      } as React.CSSProperties}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {settings?.general?.gpcEnabled && (
        <meta name="GPC" content="true" />
      )}
      {settings?.general?.faviconUrl && (
        <link rel="icon" href={optimizedFavicon} />
      )}
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        <main className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
          {children}
        </main>
        <Footer settings={settings} />
      </NextIntlClientProvider>
    </div>
  );
}
