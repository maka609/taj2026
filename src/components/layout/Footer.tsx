"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { GraduationCap, Mail, Phone, MapPin, ArrowUpRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <footer className="bg-deep-navy text-gray-400 pt-32 pb-12 overflow-hidden relative" dir={isRtl ? "rtl" : "ltr"}>
      {/* Geometric White Grid Pattern on Blue Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none" />

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Brand Column */}
          <div className="space-y-10">
            <Link href={`/${locale}`} className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/30 group-hover:rotate-6 transition-transform">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white leading-none">TAJ SCHOOLS</span>
                <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase mt-1">International Excellence</span>
              </div>
            </Link>
            <p className="text-base leading-relaxed font-medium text-gray-400/80 max-w-sm">
              {isRtl
                ? "نلتزم في مدارس تاج النزهة بتقديم تعليم عالمي المستوى يمزج بين الأصالة والابتكار، لنبني أجيالاً قادرة على قيادة المستقبل بروح واثقة وعلم نافع."
                : "At Taj Schools, we are committed to providing world-class education blending heritage and innovation, building generations capable of leading the future."}
            </p>
            <div className="flex gap-4">
                {[Share2, Share2, Share2, Share2].map((Icon, i) => (
                    <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                    </Link>
                ))}
            </div>
          </div>

          {/* Site Map */}
          <div className="space-y-8">
            <h3 className={cn("text-white font-black text-xs uppercase tracking-[0.3em] border-primary pb-2 flex items-center gap-2", isRtl ? "border-r-4 pr-4" : "border-l-4 pl-4")}>
                {isRtl ? "خريطة الموقع" : "Site Map"}
            </h3>
            <nav className="flex flex-col gap-5">
              {["about", "news", "staff", "careers", "faq"].map((link) => (
                  <Link key={link} href={`/${locale}/${link}`} className="text-sm font-bold hover:text-white transition-colors flex items-center justify-between group">
                    <span className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
                        {t(link)}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-all" />
                  </Link>
              ))}
            </nav>
          </div>

          {/* Quick Access */}
          <div className="space-y-8">
             <h3 className={cn("text-white font-black text-xs uppercase tracking-[0.3em] border-blue-400 pb-2 flex items-center gap-2", isRtl ? "border-r-4 pr-4" : "border-l-4 pl-4")}>
                {isRtl ? "روابط سريعة" : "Quick Access"}
            </h3>
            <nav className="flex flex-col gap-5">
              {["admission", "calendar", "downloads", "portal"].map((link) => (
                  <Link key={link} href={`/${locale}/${link}`} className="text-sm font-bold hover:text-white transition-colors flex items-center justify-between group">
                    <span className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/30 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300" />
                        {t(link)}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-all" />
                  </Link>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h3 className={cn("text-white font-black text-xs uppercase tracking-[0.3em] border-primary pb-2 flex items-center gap-2", isRtl ? "border-r-4 pr-4" : "border-l-4 pl-4")}>
                {isRtl ? "اتصل بنا" : "Contact Us"}
            </h3>
            <div className="space-y-6">
              <Link href="#" className="flex items-start gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                <MapPin className="w-6 h-6 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors">
                    {isRtl ? "القاهرة، النزهة الجديدة، شارع النصر، مبنى مدرسة تاج النزهة" : "Al-Nasr St., New Nozha, Cairo, Taj Schools Campus"}
                </span>
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group hover:bg-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{isRtl ? "رقم الهاتف" : "Phone"}</span>
                    <span className="text-sm font-bold font-sans text-gray-200" dir="ltr">+20 123 456 7890</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group hover:bg-primary transition-colors">
                    <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{isRtl ? "البريد الإلكتروني" : "Email"}</span>
                    <span className="text-sm font-bold text-gray-200">info@taj-schools.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                &copy; {new Date().getFullYear()} TAJ SCHOOLS. INTERNATIONAL EXCELLENCE.
            </p>
            <div className="flex items-center gap-6">
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">{isRtl ? "سياسة الخصوصية" : "Privacy Policy"}</Link>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">{isRtl ? "شروط الخدمة" : "Terms of Service"}</Link>
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
            DESIGNED WITH ❤️ BY TAJ DEV TEAM
          </p>
        </div>
      </div>
    </footer>
  );
}
