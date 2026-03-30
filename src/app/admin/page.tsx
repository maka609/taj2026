"use client";

import React from "react";
import Link from "next/link";
import { 
  Users, 
  Newspaper, 
  MessageSquare, 
  Briefcase, 
  FileCheck,
  TrendingUp
} from "lucide-react";

const stats = [
  {
    label: "إجمالي طلبات القبول",
    value: "128",
    change: "+12%",
    icon: FileCheck,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "الرسائل الجديدة",
    value: "24",
    change: "+5%",
    icon: MessageSquare,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "الأخبار المنشورة",
    value: "45",
    change: "0%",
    icon: Newspaper,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    label: "طلبات التوظيف",
    value: "12",
    change: "+2",
    icon: Briefcase,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
];

export default function AdminDashboard() {
  return (
    <div dir="rtl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">لوحة الإحصائيات 📊</h1>
        <p className="text-gray-600 text-lg">أهلاً بك مجدداً في لوحة تحكم مدارس تاج النزهة</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3.5 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 ml-1" />
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions or Recent Activity could go here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-5 text-gray-900">آخر طلبات القبول 📝</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gradient-to-l from-blue-50 to-transparent rounded-xl hover:from-blue-100 transition-colors">
                <div className="flex items-center">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold ml-3 shadow-sm">
                    أ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">أحمد محمد علي</p>
                    <p className="text-xs text-gray-600 mt-0.5">الصف الأول الابتدائي</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
                  قيد المراجعة
                </span>
              </div>
            ))}
          </div>
          <Link href="/admin/admissions">
            <button className="w-full mt-6 py-3 text-primary font-semibold hover:bg-primary/5 rounded-xl text-center transition-colors">
              عرض كل الطلبات ←
            </button>
          </Link>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-5 text-gray-900">أحدث الأخبار 📰</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-4 bg-gradient-to-l from-purple-50 to-transparent rounded-xl hover:from-purple-100 transition-colors">
                <div className="w-16 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg ml-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 line-clamp-1 text-sm">بدء التسجيل للعام الدراسي الجديد 2026/2027</p>
                  <p className="text-xs text-gray-600 mt-1">منذ ساعتين</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/news">
            <button className="w-full mt-6 py-3 text-primary font-semibold hover:bg-primary/5 rounded-xl text-center transition-colors">
              إدارة الأخبار ←
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
