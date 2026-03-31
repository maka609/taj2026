"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Newspaper,
  MessageSquare,
  Briefcase,
  FileCheck,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
  return (
    <div className="space-y-12 pb-12" dir="rtl">
      {/* Premium Header */}
      <div className="relative p-12 rounded-[3rem] bg-deep-navy overflow-hidden shadow-3xl">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent)]" />
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">النظام يعمل بكفاءة</span>
               </div>
               <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">مركز القيادة 🛡️</h1>
               <p className="text-blue-100/70 font-medium text-lg max-w-xl">أهلاً بك في المحرك المركزي لمدارس تاج النزهة. تابع الأداء والطلبات لحظة بلحظة.</p>
            </div>
            <div className="flex gap-4">
                <Link href="/admin/admissions">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-8 rounded-2xl font-bold">
                        الطلبات الجديدة
                    </Button>
                </Link>
                <Link href="/admin/settings">
                    <Button className="h-14 px-8 rounded-2xl font-black shadow-2xl shadow-blue-500/40">
                        الإعدادات
                    </Button>
                </Link>
            </div>
         </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card className="group hover:scale-105 transition-all duration-500 border-none bg-white/60 backdrop-blur-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`${stat.bgColor} p-4 rounded-[1.5rem] group-hover:bg-primary transition-colors duration-500`}>
                    <stat.icon className={`w-6 h-6 ${stat.color} group-hover:text-white transition-colors duration-500`} />
                  </div>
                  <span className="flex items-center text-[11px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <TrendingUp className="w-3.5 h-3.5 ml-1.5" />
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                  <h3 className="text-3xl font-black text-deep-navy">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Admissions */}
        <Card className="border-none bg-white/60 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100/50 px-10 py-8 bg-gray-50/30">
            <div className="space-y-1">
                <CardTitle className="text-xl font-black text-deep-navy">أحدث طلبات القبول 📝</CardTitle>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">آخر 3 طلبات مسجلة</p>
            </div>
            <Link href="/admin/admissions">
                <Button variant="ghost" size="sm" className="font-black text-primary hover:bg-primary/5 px-4 h-10 rounded-xl">
                    عرض الكل
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100/50">
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex items-center justify-between px-10 py-7 hover:bg-white/80 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-black text-lg group-hover:scale-110 transition-transform">
                      أ
                    </div>
                    <div>
                      <p className="font-black text-deep-navy text-base">أحمد محمد علي</p>
                      <p className="text-sm text-gray-500 font-medium">الصف الأول الابتدائي • منذ ساعة</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-blue-50/50 border border-blue-100 rounded-full">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        قيد المراجعة
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card className="border-none bg-white/60 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100/50 px-10 py-8 bg-gray-50/30">
            <div className="space-y-1">
                <CardTitle className="text-xl font-black text-deep-navy">أحدث الأخبار 📰</CardTitle>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">إدارة المحتوى والمستجدات</p>
            </div>
            <Link href="/admin/news">
                <Button variant="ghost" size="sm" className="font-black text-primary hover:bg-primary/5 px-4 h-10 rounded-xl">
                    إدارة الأخبار
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100/50">
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex items-center gap-6 px-10 py-7 hover:bg-white/80 transition-all group">
                  <div className="w-20 h-16 bg-gray-100 rounded-2xl shrink-0 overflow-hidden shadow-inner">
                      <div className="w-full h-full bg-gradient-to-br from-violet-100 to-violet-50 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-deep-navy text-base truncate group-hover:text-primary transition-colors">بدء التسجيل للعام الدراسي الجديد 2026/2027</p>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400 font-medium">منذ ساعتين</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span className="text-[10px] font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">أخبار عامة</span>
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
