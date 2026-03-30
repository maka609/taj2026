import React from "react";
import { Shield, AlertTriangle } from "lucide-react";

export default function SecurityLogsPage() {
  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">المراقبة الأمنية 🔒</h1>
        <p className="text-gray-500 mt-2">سجل الأنشطة والعمليات الأمنية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">محاولات تسجيل دخول</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">محاولات فاشلة</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">المستخدمون النشطون</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <Shield className="w-10 h-10 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">آخر الأنشطة</h2>
        <div className="space-y-3">
          {[
            { action: "تسجيل دخول ناجح", user: "admin@school.com", ip: "192.168.1.1", time: "منذ 5 دقائق", type: "success" },
            { action: "تعديل بيانات طالب", user: "staff@school.com", ip: "192.168.1.5", time: "منذ 15 دقيقة", type: "info" },
            { action: "محاولة تسجيل دخول فاشلة", user: "unknown@test.com", ip: "45.67.89.10", time: "منذ ساعة", type: "warning" },
          ].map((log, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${log.type === "warning" ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-600">{log.user} • {log.ip}</p>
                </div>
                <p className="text-xs text-gray-500">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
