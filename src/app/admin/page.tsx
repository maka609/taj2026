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
    <div className="space-y-10" dir="rtl">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">نظرة عامة 📊</h1>
        <p className="text-gray-500 font-medium">أهلاً بك في لوحة تحكم مدارس تاج النزهة. إليك آخر التحديثات.</p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-2xl`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3 h-3 ml-1" />
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Admissions */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-8 py-6">
            <CardTitle className="text-lg font-bold">آخر طلبات القبول 📝</CardTitle>
            <Link href="/admin/admissions">
                <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5">
                    عرض الكل
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex items-center justify-between px-8 py-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-bold">
                      أ
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">أحمد محمد علي</p>
                      <p className="text-xs text-gray-500 font-medium">الصف الأول الابتدائي</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    قيد المراجعة
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-8 py-6">
            <CardTitle className="text-lg font-bold">أحدث الأخبار 📰</CardTitle>
            <Link href="/admin/news">
                <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5">
                    إدارة الأخبار
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex items-center gap-4 px-8 py-5 hover:bg-gray-50/50 transition-colors">
                  <div className="w-16 h-12 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-violet-100 to-violet-50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">بدء التسجيل للعام الدراسي الجديد 2026/2027</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">منذ ساعتين</p>
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
