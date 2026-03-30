"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Navigation");
  const common = useTranslations("Common");
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand and Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                TAJ <span className="text-primary">SCHOOLS</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              مدارس تاج النزهة اللغوية - التميز في التعليم وبناء الشخصية. نسعى دائماً لتقديم أفضل تجربة تعليمية لأبنائنا في بيئة آمنة ومتطورة.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors text-white text-xs">FB</Link>
              <Link href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors text-white text-xs">IG</Link>
              <Link href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors text-white text-xs">YT</Link>
              <Link href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors text-white text-xs">X</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg">روابط سريعة</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/about" className="text-sm hover:text-primary transition-colors">{t("about")}</Link>
              <Link href="/news" className="text-sm hover:text-primary transition-colors">{t("news")}</Link>
              <Link href="/staff" className="text-sm hover:text-primary transition-colors">{t("staff")}</Link>
              <Link href="/careers" className="text-sm hover:text-primary transition-colors">{t("careers")}</Link>
              <Link href="/faq" className="text-sm hover:text-primary transition-colors">{t("faq")}</Link>
            </nav>
          </div>

          {/* Important Resources */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg">مصادر هامة</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/admission" className="text-sm hover:text-primary transition-colors">{t("admission")}</Link>
              <Link href="/calendar" className="text-sm hover:text-primary transition-colors">{t("calendar")}</Link>
              <Link href="/downloads" className="text-sm hover:text-primary transition-colors">{t("downloads")}</Link>
              <Link href="/portal" className="text-sm hover:text-primary transition-colors text-primary font-bold">{t("portal")}</Link>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg">تواصل معنا</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-sm text-gray-400 leading-relaxed">القاهرة، النزهة، شارع المدرسة، مبنى رقم 123</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-gray-400" dir="ltr">+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-gray-400">info@taj-nozha.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} مدارس تاج النزهة اللغوية. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">اتفاقية الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
