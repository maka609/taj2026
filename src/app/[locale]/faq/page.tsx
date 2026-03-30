"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "ما هي الأوراق المطلوبة للتقديم؟",
    answer: "تتضمن الأوراق المطلوبة أصل شهادة الميلاد المميكنة للطفل، 8 صور شخصية حديثة، صورة من البطاقة الشخصية للوالدين، والشهادة الصحية للطالب."
  },
  {
    question: "متى يبدأ سحب استمارات التقديم؟",
    answer: "يبدأ سحب استمارات التقديم معمولاً به من شهر مارس لكل عام لمراحل التمهيدي والحضانة، بينما المراحل الأخرى تبدأ من شهر مايو."
  },
  {
    question: "هل توفر المدرسة وسيلة انتقال (Bus)؟",
    answer: "نعم، توفر المدرسة أسطولاً حديثاً من الحافلات يغطي معظم مناطق القاهرة الكبرى، مع إشراف كامل لضمان سلامة الطلاب."
  },
  {
    question: "ما هي اللغات الأجنبية التي تدرس في المدرسة؟",
    answer: "تدرس اللغة الإنجليزية كلغة أولى، واللغتين الفرنسية أو الألمانية كلغة ثانية ابتداءً من المرحلة الابتدائية."
  },
  {
    question: "هل يوجد زي مدرسي موحد؟",
    answer: "نعم، للمدرسة زي مدرسي موحد خاص بكل مرحلة تعليمية، ويمكن الحصول عليه من منفذ بيع الزي داخل المدرسة."
  }
];

export default function FAQPage() {
  const t = useTranslations("Navigation");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
            <HelpCircle className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t("faq")}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">إجابات سريعة وواضحة على أكثر الأسئلة شيوعاً حول مدارسنا وإجراءات القبول.</p>
        </div>

        <div className="relative mb-12 group">
          <input 
            type="text" 
            placeholder="ابحث عن سؤالك هنا..." 
            className="w-full px-8 py-5 rounded-3xl bg-white border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg shadow-sm"
          />
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-8 py-7 flex items-center justify-between text-right gap-4 group"
                >
                  <span className={cn(
                    "text-xl font-bold transition-colors",
                    isOpen ? "text-primary" : "text-gray-900 group-hover:text-primary"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0",
                    isOpen ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
                  )}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>
                <div className={cn(
                  "px-8 transition-all duration-300 ease-in-out overflow-hidden",
                  isOpen ? "max-h-[500px] pb-10" : "max-h-0"
                )}>
                  <p className="text-lg text-gray-600 leading-relaxed border-t border-gray-50 pt-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 p-12 bg-white rounded-[3rem] text-center shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4">لم تجد إجابتك؟</h3>
          <p className="text-xl text-gray-500 mb-10">فريقنا متاح دائماً للرد على استفساراتكم المباشرة.</p>
          <button 
            onClick={() => window.location.href = "/ar/contact"}
            className="px-10 py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
          >
            تواصل معنا الآن
          </button>
        </div>
      </div>
    </div>
  );
}
