"use client";

import React from "react";
import { Shield, AlertCircle, Clock, User, Globe } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Card, CardContent } from "@/components/ui/card";

interface SecurityLog {
  id: string;
  action: string;
  ip?: string | null;
  details?: string | null;
  createdAt: Date;
  user?: {
      name?: string | null;
      email?: string | null;
  } | null;
}

interface SecurityDashboardProps {
  initialData: SecurityLog[];
}

export default function SecurityDashboard({ initialData }: SecurityDashboardProps) {
  const columns: ColumnDef<SecurityLog>[] = [
    {
      header: "العملية",
      accessorKey: (row: SecurityLog) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${row.action.includes("فشل") ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900">{row.action}</span>
        </div>
      ),
    },
    {
      header: "المستخدم",
      accessorKey: (row: SecurityLog) => (
        <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{row.user?.name || "زائر / غير معروف"}</span>
        </div>
      ),
    },
    {
      header: "العنوان IP",
      accessorKey: (row: SecurityLog) => (
        <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-mono text-gray-400">{row.ip || "0.0.0.0"}</span>
        </div>
      ),
    },
    {
      header: "التوقيت",
      accessorKey: (row: SecurityLog) => (
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium">
            {new Date(row.createdAt).toLocaleString('ar-EG')}
          </span>
        </div>
      ),
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">المراقبة الأمنية 🔒</h1>
        <p className="text-gray-500 font-medium">سجل الأنشطة والعمليات الأمنية لمراقبة سلامة النظام.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">إجمالي العمليات</p>
                      <h3 className="text-2xl font-bold text-gray-900">{initialData.length}</h3>
                  </div>
              </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">تنبيهات أمنية</p>
                      <h3 className="text-2xl font-bold text-rose-600">{initialData.filter(l => l.action.includes("فشل")).length}</h3>
                  </div>
              </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">عناوين IP فريدة</p>
                      <h3 className="text-2xl font-bold text-gray-900">{new Set(initialData.map(l => l.ip)).size}</h3>
                  </div>
              </CardContent>
          </Card>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={initialData}
            columns={columns}
        />
      </div>

    </div>
  );
}
