"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft, MapPin, Clock, Plus, Sparkles, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface EventItem {
    id: string;
    titleAr: string;
    titleEn: string;
    description?: string | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    color?: string | null;
}

export default function CalendarList({ initialEvents }: { initialEvents: EventItem[] }) {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const isRtl = locale === "ar";
  const monthName = selectedDate.toLocaleString(isRtl ? "ar-EG" : "en-US", { month: "long" });

  const prevMonth = () => setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setSelectedDate(new Date(currentYear, currentMonth + 1, 1));

  const totalDays = daysInMonth(currentMonth, currentYear);
  const startOffset = firstDayOfMonth(currentMonth, currentYear);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-[#fcfcfd]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl space-y-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
            >
                <Sparkles className="w-3 h-3" /> {isRtl ? "المواعيد والفعاليات" : "Dates and Events"}
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-7xl font-black text-deep-navy tracking-tight"
            >
                {t("calendar")}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 font-medium leading-relaxed"
            >
                {isRtl
                  ? "تابع جدول الفعاليات، الأنشطة اللاصفية، والإجازات الرسمية لتبقى دائماً في قلب الحدث المدرسي."
                  : "Follow the schedule of events, extracurricular activities, and official holidays to stay at the heart of school life."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 bg-white p-4 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-50"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Bell className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{isRtl ? "تنبيهات" : "Alerts"}</p>
                <p className="text-sm font-bold text-deep-navy">{isRtl ? "لا توجد تغييرات اليوم" : "No changes today"}</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden"
          >
            <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-3xl font-black text-deep-navy flex items-center gap-4">
                {monthName} <span className="text-primary/40">{currentYear}</span>
              </h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={prevMonth} className="h-12 w-12 rounded-2xl border-gray-200 bg-white hover:bg-primary hover:text-white transition-all">
                    <ChevronRight className={cn("w-6 h-6", locale === "en" ? "rotate-180" : "")} />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth} className="h-12 w-12 rounded-2xl border-gray-200 bg-white hover:bg-primary hover:text-white transition-all">
                    <ChevronLeft className={cn("w-6 h-6", locale === "en" ? "rotate-180" : "")} />
                </Button>
              </div>
            </div>

            <div className="p-10">
              <div className="grid grid-cols-7 mb-10">
                {(isRtl ? ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]).map((day) => (
                  <div key={day} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-6">
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`offset-${i}`} className="aspect-square rounded-[1.5rem] bg-gray-50/30" />
                ))}

                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1;
                  const dayDate = new Date(currentYear, currentMonth, day);
                  const isToday = new Date().toDateString() === dayDate.toDateString();
                  const hasEvents = initialEvents.some(e => new Date(e.startDate).toDateString() === dayDate.toDateString());

                  return (
                    <motion.div
                      key={day}
                      whileHover={{ scale: 1.05 }}
                      className={cn(
                        "aspect-square p-4 rounded-[2rem] border transition-all relative flex flex-col items-center justify-center gap-2 group cursor-pointer",
                        isToday ? "bg-primary border-primary shadow-2xl shadow-primary/30 text-white" : "bg-white border-gray-100 hover:border-primary/20 hover:shadow-xl"
                      )}
                    >
                      <span className={cn(
                        "text-xl font-black",
                        isToday ? "text-white" : "text-deep-navy group-hover:text-primary transition-colors"
                      )}>{day}</span>
                      {hasEvents && (
                          <div className={cn("w-2 h-2 rounded-full", isToday ? "bg-white" : "bg-primary")} />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Event Details List */}
          <div className="lg:col-span-1 space-y-10">
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-black text-deep-navy flex items-center gap-4"
            >
              {isRtl ? "فعاليات هذا الشهر 🚀" : "This Month's Events 🚀"}
            </motion.h3>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                {initialEvents.length === 0 ? (
                    <p className="text-gray-400 font-bold text-center py-10 bg-white rounded-[2rem] border border-dashed border-gray-200">
                        {isRtl ? "لا توجد فعاليات مسجلة حالياً" : "No events recorded currently"}
                    </p>
                ) : initialEvents.slice(0, 5).map((event) => (
                    <motion.div key={event.id} variants={item}>
                        <Card className="border-none shadow-sm bg-white hover:shadow-2xl transition-all duration-700 rounded-[2.5rem] overflow-hidden group">
                            <CardContent className="p-8 flex items-start gap-6 group-hover:translate-x-2 transition-transform duration-500">
                                <div className={cn("w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 shadow-lg", event.color ? `bg-[${event.color}]` : "bg-primary")}>
                                    <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">
                                        {new Date(event.startDate).toLocaleString(isRtl ? "ar-EG" : "en-US", { month: "short" })}
                                    </span>
                                    <span className="text-2xl font-black">{new Date(event.startDate).getDate()}</span>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <h4 className="text-lg font-black text-deep-navy leading-tight group-hover:text-primary transition-colors">{isRtl ? event.titleAr : event.titleEn}</h4>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                                            <Clock className="w-3.5 h-3.5 text-primary" />
                                            <span>{new Date(event.startDate).toLocaleTimeString(isRtl ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                            <span>{isRtl ? "المبنى الأكاديمي" : "Academic Building"}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 bg-[#0f172a] rounded-[3.5rem] text-center text-white shadow-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
              <div className="relative z-10 space-y-6">
                <h4 className="text-2xl font-black tracking-tight">{isRtl ? "حمّل التقويم السنوي" : "Download Annual Calendar"}</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                    {isRtl ? "ابق على اطلاع بكافة مواعيد العام الدراسي 2026/2027." : "Stay informed about all the dates of the 2026/2027 academic year."}
                </p>
                <Button variant="secondary" className="w-full h-14 rounded-2xl font-black text-primary shadow-xl hover:scale-105 active:scale-95 transition-all">
                  {isRtl ? "تحميل بصيغة PDF" : "Download as PDF"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
