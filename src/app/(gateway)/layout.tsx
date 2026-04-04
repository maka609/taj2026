import type { Metadata } from "next";
import { geistSans, geistMono, cairo } from "../fonts";
import "../globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "مدارس تاج النزهة اللغوية",
  description: "Taj El-Nozha Language Schools",
};

export default function GatewayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable}`} suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' data: blob: *.supabase.co; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'; connect-src 'self' *.supabase.co;"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
