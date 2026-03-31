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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
        isScrolled ? "pt-4" : "pt-6"
      )}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <nav
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-8 py-4 rounded-[2rem] transition-all duration-500",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20"
            : "bg-white/40 backdrop-blur-md border border-white/10 shadow-sm"
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
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-deep-navy"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-4 bg-white/95 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 lg:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === "/" ? "" : item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 transition-colors group"
                >
                  <span className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">{t(item.label)}</span>
                  <ChevronDown className={cn("w-5 h-5 text-gray-300 -rotate-90 group-hover:text-primary transition-colors", locale === "ar" ? "rotate-90" : "-rotate-90")} />
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
              <div className="flex items-center justify-between px-4">
                  <span className="text-sm font-bold text-gray-400">اللغة / Language</span>
                  <LanguageSwitcher />
              </div>
              <Link href={`/${locale}/admission`} onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full rounded-[1.25rem] h-14 font-black text-lg shadow-xl shadow-primary/20 mt-2">
                    {t("admission")}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
