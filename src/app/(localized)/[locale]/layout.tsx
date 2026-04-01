import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getGlobalSettings } from "@/actions/settings";
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

  const { data: settings } = await getGlobalSettings();

  // Schema.org Structured Data (EducationalOrganization)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": locale === 'ar' ? settings?.siteNameAr : settings?.siteNameEn,
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://taj-schools.com",
    "logo": settings?.logoUrl || "/logo.png",
    "description": locale === 'ar' ? settings?.seoDescriptionAr : settings?.seoDescriptionEn,
    "address": {
        "@type": "PostalAddress",
        "streetAddress": locale === 'ar' ? settings?.contactAddressAr : settings?.contactAddressEn,
        "addressCountry": "JO"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": settings?.contactPhone,
        "contactType": "customer service"
    },
    "foundingDate": settings?.orgFoundingDate,
    "taxID": settings?.orgTaxId
  };

  return (
    <div
      lang={locale}
      dir={direction}
      className="min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20"
      style={{
        // Dynamic colors from database (OKLCH supported if string format matches)
        "--primary": settings?.primaryColor || "#7c3aed",
        "--secondary": settings?.secondaryColor || "#ea580c",
      } as React.CSSProperties}
    >
      {/* Schema.org for AI & Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dynamic Favicon */}
      {settings?.faviconUrl && (
          <link rel="icon" href={settings.faviconUrl} sizes="any" />
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
