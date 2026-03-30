"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const t = useTranslations("Navigation");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t("contact")}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            يسعدنا تواصلكم معنا. فريقنا جاهز للرد على استفساراتكم ومساعدتكم في أي وقت.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">موقعنا</h3>
                <p className="text-gray-500 leading-relaxed text-sm">القاهرة، النزهة، شارع المدرسة، مبنى رقم 123</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">اتصل بنا</h3>
                <p className="text-gray-500 leading-relaxed text-sm" dir="ltr">+20 123 456 7890</p>
                <p className="text-gray-500 leading-relaxed text-sm" dir="ltr">+20 098 765 4321</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-500 leading-relaxed text-sm">info@taj-nozha.com</p>
                <p className="text-gray-500 leading-relaxed text-sm">admissions@taj-nozha.com</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ساعات العمل</h3>
                <p className="text-gray-500 leading-relaxed text-sm">الأحد - الخميس: 8 صباحاً - 3 مساءً</p>
                <p className="text-gray-500 leading-relaxed text-sm">الجمعة - السبت: مغلق</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 h-full">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">تم الإرسال بنجاح!</h2>
                  <p className="text-gray-600 mb-10 max-w-sm">شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن عبر بريدك الإلكتروني.</p>
                  <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">إرسال رسالة أخرى</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">أرسل لنا استفسارك ✉️</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">الاسم بالكامل</label>
                      <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="أحمد محمد" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
                      <input type="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="name@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">الموضوع</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="استفسار عن القبول" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">رسالتك</label>
                    <textarea className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" rows={6} placeholder="اكتب رسالتك هنا بالتفصيل..." required></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50">
                    {isSubmitting ? <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send className="w-5 h-5" /> إرسال الرسالة</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
              خريطة موقع المدرسة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
