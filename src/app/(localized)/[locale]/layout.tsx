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

  return (
    <div
      lang={locale}
      dir={direction}
      className="min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20"
      style={{
        // Dynamic colors from database
        "--primary": settings?.primaryColor || "#7c3aed",
        "--secondary": settings?.secondaryColor || "#ea580c",
      } as React.CSSProperties}
    >
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
