"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft, MapPin, Clock, Plus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  { id: 1, title: "بداية الفصل الدراسي الثاني", date: "2026-02-15", time: "08:00 AM", category: "أكاديمي", color: "bg-blue-500" },
  { id: 2, title: "مسابقة أوائل الطلبة", date: "2026-03-10", time: "10:00 AM", category: "مسابقات", color: "bg-emerald-500" },
  { id: 3, title: "احتفالية يوم الأم", date: "2026-03-21", time: "11:00 AM", category: "احتفالات", color: "bg-pink-500" },
  { id: 4, title: "رحلة مدرسية (مجمع الأديان)", date: "2026-03-25", time: "07:30 AM", category: "رحلات", color: "bg-amber-500" },
  { id: 5, title: "اجتماع أولياء الأمور", date: "2026-04-02", time: "05:00 PM", category: "إداري", color: "bg-purple-500" },
];

export default function CalendarPage() {
  const t = useTranslations("Navigation");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Simple calendar math
  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const monthNameAr = selectedDate.toLocaleString("ar-EG", { month: "long" });

  const prevMonth = () => setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setSelectedDate(new Date(currentYear, currentMonth + 1, 1));

  const totalDays = daysInMonth(currentMonth, currentYear);
  const startOffset = firstDayOfMonth(currentMonth, currentYear);

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            <div className="flex items-center gap-3 text-primary mb-4 font-bold tracking-wide">
              <CalendarIcon className="w-6 h-6 border-2 border-primary rounded-md p-0.5" />
              <span>التقويم الأكاديمي والفعاليات</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t("calendar")}</h1>
            <p className="text-xl text-gray-500 leading-relaxed font-sans max-w-xl">ابق على اطلاع دائم بكافة المواعيد، الإجازات الرسمية، والفعاليات المخطط لها خلال العام الدراسي.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-lg border border-gray-100 group">
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all"><Filter className="w-6 h-6 text-gray-500" /></button>
            <button className="px-8 py-3 bg-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-3">
              <Plus className="w-5 h-5" /> أضف فعالية
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-4">
                {monthNameAr} <span className="text-gray-400">{currentYear}</span>
              </h2>
              <div className="flex items-center gap-4">
                <button onClick={prevMonth} className="p-4 bg-white hover:bg-primary hover:text-white rounded-2xl transition-all shadow-sm border border-gray-100"><ChevronRight className="w-6 h-6" /></button>
                <button onClick={nextMonth} className="p-4 bg-white hover:bg-primary hover:text-white rounded-2xl transition-all shadow-sm border border-gray-100"><ChevronLeft className="w-6 h-6" /></button>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-7 mb-6">
                {["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"].map((day) => (
                  <div key={day} className="text-center text-sm font-extrabold text-gray-400 uppercase tracking-widest">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`offset-${i}`} className="h-32 rounded-3xl bg-gray-50/50 opacity-0" />
                ))}
                
                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayEvents = events.filter(e => e.date === dateStr);
                  const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, day).toDateString();
                  
                  return (
                    <div key={day} className={cn(
                      "h-32 p-4 rounded-3xl border transition-all hover:shadow-lg hover:z-10 group overflow-hidden relative",
                      isToday ? "bg-primary/5 border-primary shadow-inner" : "bg-white border-gray-100"
                    )}>
                      <span className={cn(
                        "text-lg font-extrabold mb-2 block",
                        isToday ? "text-primary" : "text-gray-900"
                      )}>{day}</span>
                      <div className="space-y-1">
                        {dayEvents.map(e => (
                          <div key={e.id} className={cn("text-[10px] p-1.5 rounded-lg text-white font-bold truncate transition-transform hover:scale-110", e.color)}>
                            {e.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Event Details List */}
          <div className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-4">
              فعاليات قادمة 🚀
            </h3>
            
            {events.map((event) => (
              <div key={event.id} className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex items-start gap-6 hover:translate-x-2">
                <div className={cn("w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 shadow-lg", event.color)}>
                  <span className="text-xs font-bold uppercase tracking-tighter opacity-80">{new Date(event.date).toLocaleString("ar-EG", { month: "short" })}</span>
                  <span className="text-2xl font-black">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-xl font-extrabold text-gray-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{event.title}</h4>
                  <div className="flex flex-col gap-3 text-sm font-bold text-gray-400">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl w-fit">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl w-fit">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>مسرح المدرسة الرئيسي</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="p-10 bg-gray-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                <h4 className="text-2xl font-extrabold">حمّل التقويم السنوي</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">احصل على النسخة المطبوعة من التقويم الأكاديمي لعام 2026/2027 بصيغة PDF.</p>
                <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 active:scale-95">
                  <Plus className="w-6 h-6 rotate-45" /> تحميل الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
