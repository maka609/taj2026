"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Users,
  Newspaper,
  MessageSquare,
  Briefcase,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Settings,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "إجمالي طلبات القبول",
    value: "128",
    change: "+12%",
    icon: FileCheck,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "الرسائل الجديدة",
    value: "24",
    change: "+5%",
    icon: MessageSquare,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "الأخبار المنشورة",
    value: "45",
    change: "0%",
    icon: Newspaper,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  {
    label: "طلبات التوظيف",
    value: "12",
    change: "+2",
    icon: Briefcase,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function AdminDashboard() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="space-y-12 pb-12" dir={isRtl ? "rtl" : "ltr"}>
      {/* Premium Header */}
      <div className="relative p-12 rounded-[3.5rem] bg-deep-purple overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
         <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />

         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">النظام يعمل بكفاءة قصوى</span>
               </div>
               <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-none">مركز القيادة 🛡️</h1>
               <p className="text-white/70 font-medium text-xl max-w-2xl leading-relaxed">أهلاً بك في المحرك المركزي لمدارس تاج النزهة. تابع الأداء والطلبات والمستجدات لحظة بلحظة وبكل سلاسة.</p>
            </div>
            <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/admin/admissions`}>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16 px-10 rounded-2xl font-black text-lg btn-interactive">
                        {isRtl ? "الطلبات الجديدة" : "New Requests"}
                    </Button>
                </Link>
                <Link href={`/${locale}/admin/settings`}>
                    <Button className="h-16 px-10 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 bg-white text-primary hover:bg-gray-50 btn-interactive">
                        <Settings className="w-5 h-5 ml-2" />
                        {isRtl ? "الإعدادات" : "Settings"}
                    </Button>
                </Link>
            </div>
         </div>
      </div>

      {/* Stats Grid - Fixed Alignment */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card className="group card-premium p-1 hover:border-primary/20 bg-white shadow-xl shadow-gray-200/40">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className={cn(stat.bgColor, "p-5 rounded-2xl group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-sm")}>
                    <stat.icon className={cn("w-7 h-7", stat.color, "group-hover:text-white transition-colors duration-500")} />
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[11px] font-black">{stat.change}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{stat.label}</p>
                  <h3 className="text-4xl font-black text-deep-navy tracking-tight">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid - Responsive & Aligned */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Admissions */}
        <Card className="card-premium overflow-hidden bg-white shadow-2xl shadow-gray-200/50">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-10 py-10 bg-gray-50/30">
            <div className="space-y-2">
                <CardTitle className="text-2xl font-black text-deep-navy flex items-center gap-3">
                   <FileCheck className="w-7 h-7 text-primary" />
                   أحدث طلبات القبول
                </CardTitle>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">آخر 3 طلبات مسجلة هذا الأسبوع</p>
            </div>
            <Link href={`/${locale}/admin/admissions`}>
                <Button variant="ghost" size="sm" className="font-black text-primary hover:bg-primary/5 px-6 h-12 rounded-xl group btn-interactive">
                    {isRtl ? "عرض الكل" : "View All"}
                    <ArrowRight className={cn("w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform", isRtl && "rotate-180")} />
                </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex items-center justify-between px-10 py-8 hover:bg-slate-50/50 transition-all group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary font-black text-xl group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                      أ
                    </div>
                    <div className="space-y-1">
                      <p className="font-black text-deep-navy text-lg group-hover:text-primary transition-colors">أحمد محمد علي</p>
                      <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                         الصف الأول الابتدائي • منذ ساعة
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-2.5 bg-blue-50/50 border border-blue-100 rounded-full shadow-sm">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        قيد المراجعة
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card className="card-premium overflow-hidden bg-white shadow-2xl shadow-gray-200/50">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-10 py-10 bg-gray-50/30">
            <div className="space-y-2">
                <CardTitle className="text-2xl font-black text-deep-navy flex items-center gap-3">
                   <Newspaper className="w-7 h-7 text-vibrant-orange" />
                   أحدث الأخبار
                </CardTitle>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">إدارة المحتوى والمستجدات التعليمية</p>
            </div>
            <Link href={`/${locale}/admin/news`}>
                <Button variant="ghost" size="sm" className="font-black text-primary hover:bg-primary/5 px-6 h-12 rounded-xl group btn-interactive">
                    {isRtl ? "إدارة الأخبار" : "Manage News"}
                    <Plus className="w-5 h-5 ml-2" />
                </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex items-center gap-8 px-10 py-8 hover:bg-slate-50/50 transition-all group cursor-pointer">
                  <div className="w-24 h-20 bg-slate-50 rounded-2xl shrink-0 overflow-hidden shadow-inner border border-gray-100">
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-50 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <p className="font-black text-deep-navy text-lg truncate group-hover:text-primary transition-colors leading-tight">بدء التسجيل للعام الدراسي الجديد 2026/2027</p>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">منذ ساعتين</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                        <span className="text-[9px] font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">أخبار عامة</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
