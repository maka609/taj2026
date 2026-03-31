"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Calendar as CalendarIcon,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  Upload
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AIAssistantModal from "@/components/dashboard/AIAssistantModal";
import FileUploadModal from "@/components/dashboard/FileUploadModal";

// Dummy data for components
const courses = [
  { id: 1, title: "رياضيات - الصف الثاني الثانوي", progress: 80, color: "text-mint-green", bgColor: "bg-mint-green/10" },
  { id: 2, title: "فيزياء - الصف الثاني الثانوي", progress: 65, color: "text-vibrant-orange", bgColor: "bg-vibrant-orange/10" },
  { id: 3, title: "كيمياء - الصف الثاني الثانوي", progress: 90, color: "text-deep-purple", bgColor: "bg-deep-purple/10" },
];

const schedule = [
  { id: 1, title: "مراجعة فيزياء - لايف", type: "LIVE", time: "09:00 - 10:00 PM", status: "Join", color: "bg-rose-500", text: "text-rose-500" },
  { id: 2, title: "مراجعة فيزياء - مسجل", type: "RECORDED", time: "05:00 - 06:00 PM", status: "Watch", color: "bg-amber-500", text: "text-amber-500" },
  { id: 3, title: "مراجعة فيزياء - مسجل، لايف", type: "LIVE/RECORDED", time: "11:00 - 12:00 PM", status: "Join", color: "bg-primary", text: "text-primary" },
];

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const dates = [
  { day: "SUN", date: 1, hasClass: false },
  { day: "MON", date: 2, hasClass: false },
  { day: "TUE", date: 3, hasClass: true, active: true },
  { day: "WED", date: 4, hasClass: false },
  { day: "THU", date: 5, hasClass: true },
  { day: "FRI", date: 6, hasClass: false },
  { day: "SAT", date: 7, hasClass: false },
];

export default function DashboardOverview() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);

  return (
    <div className="space-y-10 pb-12" dir={isRtl ? "rtl" : "ltr"}>

      {/* Top Section: Greeting & Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 relative p-10 rounded-[3rem] bg-gradient-to-br from-deep-purple to-purple-800 text-white overflow-hidden shadow-2xl shadow-primary/20"
        >
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/pattern.png')] opacity-10" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest">
                        {isRtl ? "نظام إدارة التعلم" : "Learning Management System"}
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
                            {isRtl ? "صباح الخير، احمد" : "Good Morning, Ahmed"}
                            <span className="animate-bounce">👋</span>
                        </h1>
                        <p className="text-white/70 font-medium text-lg">
                            {isRtl ? "انت أنجزت 70% من هدفك للأسبوع ده!" : "You have completed 70% of your weekly goal!"}
                        </p>
                    </div>
                    <div className="w-full max-w-md h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-mint-green shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                        />
                    </div>
                </div>

                {/* Study Timer Component */}
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-xl min-w-[240px] space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                           {isRtl ? "مذاكرة فيزياء" : "Physics Session"}
                        </span>
                    </div>
                    <div className="text-4xl font-black text-center tracking-wider tabular-nums">00:55:42</div>
                    <div className="flex gap-2">
                        <Button className="flex-1 h-12 rounded-xl bg-mint-green text-white font-black text-sm hover:bg-mint-green/90 btn-interactive shadow-lg shadow-mint-green/20">
                            {isRtl ? "إكمال المهمة" : "Complete Task"}
                        </Button>
                        <Button
                            onClick={() => setIsAIModalOpen(true)}
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 rounded-xl bg-white/10 text-white hover:bg-white/20 btn-interactive"
                        >
                            <Sparkles className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Small Progress Card */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="card-premium p-10 flex flex-col justify-between"
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Award className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{isRtl ? "أداء العام" : "Annual Performance"}</span>
                        <h4 className="text-2xl font-black text-deep-navy">70%</h4>
                    </div>
                </div>

                {/* Circular Gauge Ring (Simplified SVG) */}
                <div className="relative w-40 h-40 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset={440 * (1 - 0.7)} className="text-primary" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-deep-navy">70%</span>
                        <span className="text-[10px] font-black text-primary uppercase">{isRtl ? "مكتمل" : "Completed"}</span>
                    </div>
                </div>
            </div>

            <p className="text-xs font-bold text-gray-400 leading-relaxed text-center mt-6">
                {isRtl ? "أداؤك أعلى من المتوسط بـ 10%" : "Your performance is 10% above average!"}
            </p>
        </motion.div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left/Main Column (Courses) */}
        <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-deep-navy tracking-tight">{isRtl ? "المواد الدراسية" : "Course Subjects"}</h2>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white shadow-sm hover:bg-gray-50 border border-gray-100">
                        <ChevronLeft className={cn("w-5 h-5", !isRtl && "rotate-180")} />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white shadow-sm hover:bg-gray-50 border border-gray-100">
                        <ChevronRight className={cn("w-5 h-5", isRtl && "rotate-180")} />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course, i) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="card-premium p-8 flex flex-col items-center gap-6 group hover:border-primary/20"
                    >
                        <div className="relative w-24 h-24">
                             <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-50" />
                                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="264" strokeDashoffset={264 * (1 - course.progress/100)} className={course.color} />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-black text-deep-navy">{course.progress}%</span>
                            </div>
                        </div>
                        <div className="text-center space-y-1">
                            <h4 className="text-sm font-black text-deep-navy group-hover:text-primary transition-colors">{course.title}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isRtl ? "عدد الحصص 30 / 45" : "30 / 45 Lessons"}</p>
                        </div>
                        <Button className="w-full h-12 rounded-xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/10 btn-interactive">
                            {isRtl ? "واصل التعلم" : "Continue Learning"}
                        </Button>
                    </motion.div>
                ))}
            </div>

            {/* Assignments & Quizzes Tabs Component */}
            <div className="card-premium overflow-hidden">
                <div className="flex border-b border-gray-100 bg-gray-50/30">
                    <button className="flex-1 py-6 px-10 text-sm font-black text-primary border-b-2 border-primary relative">
                        {isRtl ? "الاختبارات" : "Quizzes"}
                    </button>
                    <button className="flex-1 py-6 px-10 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
                        {isRtl ? "تسليم الواجب" : "Assignment Submission"}
                    </button>
                </div>
                <div className="p-10 space-y-6">
                    <div className="flex items-center gap-4 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h5 className="text-base font-black text-deep-navy">{isRtl ? "اختبار مادة الفيزياء" : "Physics Quiz"}</h5>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isRtl ? "منذ ساعة • 20 سؤال" : "1 hour ago • 20 questions"}</p>
                        </div>
                        <Button
                            onClick={() => setIsFileModalOpen(true)}
                            className="rounded-[1.5rem] h-12 px-8 font-black bg-primary text-white shadow-xl shadow-primary/10 btn-interactive"
                        >
                            <Upload className="w-4 h-4 ml-2" />
                            {isRtl ? "تسليم الواجب" : "Submit Assignment"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Sidebar Column (Calendar & Schedule) */}
        <div className="space-y-10">
            {/* Calendar Widget */}
            <div className="card-premium p-8">
                <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-gray-100">
                        <ChevronLeft className={cn("w-4 h-4", !isRtl && "rotate-180")} />
                    </Button>
                    <h3 className="text-base font-black text-deep-navy">Sep 2025</h3>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-gray-100">
                        <ChevronRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
                    </Button>
                </div>

                <div className="grid grid-cols-7 gap-y-6 text-center">
                    {days.map(d => (
                        <span key={d} className="text-[10px] font-black text-gray-300 tracking-widest">{d}</span>
                    ))}
                    {dates.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <div className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all",
                                d.active ? "bg-vibrant-orange text-white shadow-xl shadow-vibrant-orange/30 scale-110" : "text-gray-600 hover:bg-gray-50"
                            )}>
                                {d.date}
                            </div>
                            {d.hasClass && !d.active && <div className="w-1 h-1 rounded-full bg-primary" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scheduled Classes List */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-deep-navy tracking-tight">{isRtl ? "الحصص" : "Classes"}</h3>
                <div className="space-y-4">
                    {schedule.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col gap-6 relative group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="text-[10px] font-black text-gray-400 tabular-nums">{item.time}</span>
                                </div>
                                <div className={cn("px-4 py-1.5 rounded-full text-[10px] font-black text-white shadow-lg", item.color)}>
                                    {item.type}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-base font-black text-deep-navy leading-none">{item.title}</h4>
                                <p className="text-xs font-bold text-gray-400">{isRtl ? "كورس الفيزياء • مستر/ اسلام" : "Physics Course • Mr. Eslam"}</p>
                            </div>
                            <div className="flex gap-3">
                                <Button className={cn("flex-1 h-12 rounded-[1.2rem] font-black text-sm btn-interactive shadow-lg", item.status === "Join" ? "bg-rose-500 text-white shadow-rose-500/20" : "bg-primary text-white shadow-primary/20")}>
                                    {isRtl ? (item.status === "Join" ? "إنضم الآن" : "مشاهدة الدرس") : item.status}
                                </Button>
                                <div className="w-12 h-12 rounded-[1.2rem] bg-slate-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                                    <Video className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

      </div>

      {/* Modals */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        locale={locale}
      />
      <FileUploadModal
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        locale={locale}
      />

    </div>
  );
}
