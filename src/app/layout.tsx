import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "مدارس تاج النزهة اللغوية",
  description: "Taj El-Nozha Language Schools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable}`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
