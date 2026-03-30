"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, GraduationCap } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const navItems = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "news", href: "/news" },
  { label: "staff", href: "/staff" },
  { label: "calendar", href: "/calendar" },
  { label: "downloads", href: "/downloads" },
];

export default function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4" dir={locale === "ar" ? "rtl" : "ltr"}>
      <nav className="flex items-center justify-between border border-gray-200 px-6 py-4 rounded-full bg-white/95 backdrop-blur-lg shadow-lg text-sm max-w-7xl mx-auto">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 mx-7">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={`/${locale}${item.href === "/" ? "" : item.href}`}
              className="relative overflow-hidden h-6 group text-gray-700 font-semibold"
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                {t(item.label)}
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-blue-600">
                {t(item.label)}
              </span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/contact`}
            className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-medium transition text-gray-700"
          >
            {t("contact")}
          </Link>
          <Link
            href={`/${locale}/admission`}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-[0px_0px_30px_7px] hover:shadow-blue-500/30 text-white px-6 py-2 rounded-full text-sm font-bold hover:from-blue-700 hover:to-blue-800 transition duration-300"
          >
            {t("admission")}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700 shrink-0"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mt-2 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col items-center gap-4 md:hidden shadow-xl">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={`/${locale}${item.href === "/" ? "" : item.href}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-blue-600 transition text-gray-700 font-semibold"
            >
              {t(item.label)}
            </Link>
          ))}
          <div className="w-full border-t border-gray-200 pt-4 flex flex-col gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-medium transition text-center text-gray-700"
            >
              {t("contact")}
            </Link>
            <Link
              href={`/${locale}/admission`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold hover:from-blue-700 hover:to-blue-800 transition text-center"
            >
              {t("admission")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
