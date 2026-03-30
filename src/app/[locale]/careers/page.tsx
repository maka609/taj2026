import React from "react";
import { useTranslations } from "next-intl";
import { Briefcase, UserCheck, Timer, ArrowLeft, Search, GraduationCap } from "lucide-react";
import Link from "next/link";

const vacancies = [
  {
    id: 1,
    titleAr: "معلم لغة إنجليزية (Senior)",
    department: "اللغات",
    type: "دوام كامل",
    deadline: "15 أبريل 2026",
    experience: "5-7 سنوات",
    excerpt: "نبحث عن معلم لغة إنجليزية متميز للانضمام لفريقنا في المرحلة الإعدادية..."
  },
  {
    id: 2,
    titleAr: "أخصائي حاسب آلي",
    department: "تكنولوجيا المعلومات",
    type: "دوام كامل",
    deadline: "20 أبريل 2026",
    experience: "2-3 سنوات",
    excerpt: "المسؤول عن صيانة معامل الحاسب وتدريس مادة الـ ICT للمرحلة الابتدائية..."
  },
  {
    id: 3,
    titleAr: "مشرف أدوار",
    department: "الإدارة",
    type: "دوام كامل",
    deadline: "10 أبريل 2026",
    experience: "خبرة سابقة",
    excerpt: "القيام بمهام الإشراف والمتابعة اليومية للطلاب والحفاظ على النظام العام..."
  }
];

export default function CareersPage() {
  const t = useTranslations("Navigation");

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-primary mb-4 font-bold tracking-wide">
              <Briefcase className="w-6 h-6 border-2 border-primary rounded-md p-0.5" />
              <span>انضم لعائلتنا</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t("careers")}</h1>
            <p className="text-xl text-gray-500 leading-relaxed font-sans">نحن في مدارس تاج النزهة اللغوية نقدر المبدعين والمحبين للتعليم. ابدأ مشوارك المهني معنا وساهم في بناء مستقبل طلابنا.</p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col sm:flex-row items-center gap-8 group">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <UserCheck className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-right">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">تقديم مباشر</h3>
              <p className="text-sm text-gray-500 mb-4 font-bold tracking-tighter">هل تمتلك مهارة غير مذكورة؟</p>
              <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary/90 transition-all">أرسل سيرتك الذاتية 📄</button>
            </div>
          </div>
        </div>

        <div className="mb-12 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <input 
              type="text" 
              placeholder="ابحث عن وظيفة..." 
              className="w-full px-14 py-4 rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm shadow-sm"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select className="px-6 py-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm font-bold text-gray-500 shadow-sm focus:border-primary transition-all">
              <option>جميع الأقسام</option>
              <option>أكاديمي</option>
              <option>إداري</option>
              <option>فني</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {vacancies.map((job) => (
            <div key={job.id} className="group bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:-translate-y-1 duration-300">
              <div className="space-y-6 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold ring-1 ring-blue-100 uppercase tracking-tighter">{job.department}</span>
                  <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-xs font-bold ring-1 ring-amber-100 uppercase tracking-tighter">{job.type}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-primary transition-colors">{job.titleAr}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm max-w-2xl">{job.excerpt}</p>
                </div>
                <div className="flex flex-wrap items-center gap-8 pt-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-tight">
                    <Timer className="w-5 h-5 text-gray-300" />
                    <span>تاريخ الانتهاء:</span>
                    <span className="text-red-400">{job.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-tight">
                    <GraduationCap className="w-5 h-5 text-gray-300" />
                    <span>الخبرة:</span>
                    <span className="text-gray-900">{job.experience}</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex flex-col gap-4">
                <button className="px-10 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                  تقدم الآن <ArrowLeft className="w-5 h-5 group-hover:gap-4 transition-all" />
                </button>
                <button className="px-10 py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all border border-gray-100 flex items-center justify-center gap-3">
                  تفاصيل الوظيفة
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-gray-900 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 space-y-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto backdrop-blur-md">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-extrabold text-white">لم تجد التخصص المناسب؟</h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans">يسعدنا دائماً استقبال السير الذاتية للكوادر المتميزة في جميع التخصصات. سنقوم بالتواصل معك فور توفر شاغر يناسب مؤهلاتك.</p>
            <button className="px-12 py-5 bg-white text-gray-900 rounded-2xl font-extrabold text-xl hover:scale-105 transition-transform shadow-xl shadow-white/10">أرسل سيرتك الذاتية 📁</button>
          </div>
        </div>
      </div>
    </div>
  );
}
