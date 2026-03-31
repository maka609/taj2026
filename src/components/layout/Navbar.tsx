"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "h-16 md:h-20" : "h-20 md:h-24"
      )}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <nav
        className={cn(
          "w-full h-full flex items-center justify-between px-4 md:px-12 transition-all duration-500 border-b",
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-gray-100 shadow-sm"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-deep-navy rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-500">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-deep-navy leading-none tracking-tight">TAJ SCHOOLS</span>
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mt-0.5">Education First</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={`/${locale}${item.href === "/" ? "" : item.href}`}
              className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors relative group"
            >
              {t(item.label)}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher />
          <div className="h-6 w-px bg-gray-200" />
          <Link href={`/${locale}/admission`}>
            <Button className="rounded-2xl h-11 px-8 font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                {t("admission")}
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden relative z-[60]">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-deep-navy active:scale-90 transition-all border border-gray-100"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: locale === 'ar' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: locale === 'ar' ? '100%' : '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[55] lg:hidden flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-4 overflow-y-auto pb-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === "/" ? "" : item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-6 border-b border-gray-50 group"
                >
                  <span className="text-2xl font-black text-deep-navy group-hover:text-primary transition-colors">{t(item.label)}</span>
                  <ChevronDown className={cn("w-6 h-6 text-gray-300", locale === "ar" ? "rotate-90" : "-rotate-90")} />
                </Link>
              ))}

              <div className="mt-10 space-y-10">
                  <div className="flex items-center justify-between bg-gray-50 p-6 rounded-3xl">
                      <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Language</span>
                      <LanguageSwitcher />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <Link href={`/${locale}/admission`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full rounded-2xl h-16 font-black text-xl shadow-2xl shadow-primary/30 btn-interactive">
                            {t("admission")}
                        </Button>
                    </Link>
                    <Link href={`/${locale}/portal/login`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full rounded-2xl h-16 font-black text-xl border-gray-200 text-deep-navy btn-interactive">
                            {locale === 'ar' ? "دخول الطلاب" : "Student Login"}
                        </Button>
                    </Link>
                  </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
