"use client";

import React, { useState } from "react";
import { Database, Download, ShieldCheck } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { deleteBackup, createBackup } from "@/actions/backups";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface BackupItem {
  id: string;
  label: string;
  fileUrl: string;
  createdAt: Date;
}

interface BackupDashboardProps {
  initialData: BackupItem[];
}

export default function BackupDashboard({ initialData }: BackupDashboardProps) {
  const [backups, setBackups] = useState(initialData);

  const columns: ColumnDef<BackupItem>[] = [
    {
      header: "النسخة الاحتياطية",
      accessorKey: (row: BackupItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.label}</p>
            <p className="text-[10px] text-gray-400 font-sans">{new Date(row.createdAt).toLocaleString('ar-EG')}</p>
          </div>
        </div>
      ),
    },
    {
        header: "الرابط",
        accessorKey: (row: BackupItem) => (
            <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-primary font-bold">
                <a href={row.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="w-3.5 h-3.5 ml-1.5" />
                    تحميل الملف
                </a>
            </Button>
        )
    }
  ];

  const handleCreate = async () => {
      toast.info("جاري إنشاء نسخة احتياطية جديدة...");
      // Mocking backup creation logic
      const result = await createBackup(`نسخة احتياطية يدوية ${new Date().toLocaleDateString('ar-EG')}`, "#");
      if (result.success && result.data) {
          setBackups([result.data, ...backups]);
          toast.success("تم إنشاء النسخة الاحتياطية بنجاح");
      }
  };

  const handleDelete = async (row: BackupItem) => {
    if (confirm(`هل أنت متأكد من حذف هذه النسخة الاحتياطية؟`)) {
      const result = await deleteBackup(row.id);
      if (result.success) {
          setBackups(backups.filter(b => b.id !== row.id));
          toast.success("تم حذف النسخة بنجاح");
      } else {
          toast.error("فشل في الحذف");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">النسخ الاحتياطي 💾</h1>
          <p className="text-gray-500 mt-1 font-medium">إدارة وحماية بيانات المدرسة عبر النسخ الاحتياطي الدوري.</p>
        </div>
        <Button
          onClick={handleCreate}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Database className="w-5 h-5 ml-2" />
          إنشاء نسخة يدوية
        </Button>
      </div>

      {/* Info Card */}
      <Card className="border-none shadow-sm bg-blue-600 overflow-hidden text-white">
        <CardContent className="p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1">نظام النسخ التلقائي نشط</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                    يتم أخذ نسخة احتياطية كاملة من قاعدة البيانات والملفات يومياً في تمام الساعة 2:00 صباحاً.
                    يتم الاحتفاظ بآخر 30 نسخة تلقائية.
                </p>
            </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={backups}
            columns={columns}
            onDelete={handleDelete}
        />
      </div>

    </div>
  );
}
