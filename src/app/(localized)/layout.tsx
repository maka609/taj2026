import type { Metadata } from "next";
import { geistSans, geistMono, cairo } from "../fonts";
import "../globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "مدارس تاج النزهة اللغوية",
  description: "Taj El-Nozha Language Schools",
};

export default function LocalizedRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable}`}>
      <body suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
