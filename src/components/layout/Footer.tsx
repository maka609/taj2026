"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const t = useTranslations("Navigation");
  const locale = useLocale();

  return (
    <footer className="bg-[#0f172a] text-gray-400 pt-32 pb-12 overflow-hidden relative" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white leading-none">TAJ SCHOOLS</span>
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase mt-1">Language Institution</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-medium">
              نلتزم في مدارس تاج النزهة بتقديم تعليم عالمي المستوى يمزج بين الأصالة والابتكار، لنبني أجيالاً قادرة على قيادة المستقبل.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-sm uppercase tracking-widest border-r-4 border-primary pr-4">خريطة الموقع</h3>
            <nav className="flex flex-col gap-4">
              {["about", "news", "staff", "careers", "faq"].map((link) => (
                  <Link key={link} href={`/${locale}/${link}`} className="text-sm font-bold hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
                    {t(link)}
                  </Link>
              ))}
            </nav>
          </div>

          {/* Quick Access */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-sm uppercase tracking-widest border-r-4 border-primary pr-4">روابط سريعة</h3>
            <nav className="flex flex-col gap-4">
              {["admission", "calendar", "downloads", "portal"].map((link) => (
                  <Link key={link} href={`/${locale}/${link}`} className="text-sm font-bold hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/20 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300" />
                    {t(link)}
                  </Link>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-sm uppercase tracking-widest border-r-4 border-primary pr-4">اتصل بنا</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs font-bold leading-relaxed text-gray-300">القاهرة، النزهة الجديدة، شارع النصر، مبنى المدرسة</span>
              </div>
              <div className="flex items-center gap-4 px-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-bold font-sans text-gray-300" dir="ltr">+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-4 px-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-bold text-gray-300">info@taj-nozha.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} TAJ SCHOOLS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[10px] font-black uppercase tracking-tighter hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-tighter hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { cn } from "@/lib/utils";
