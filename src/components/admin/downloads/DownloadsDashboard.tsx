"use client";

import React, { useState } from "react";
import { Plus, FileText, Download } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AdminModal } from "@/components/ui/admin-modal";
import { DownloadForm } from "@/components/admin/downloads/DownloadForm";
import { deleteDocument } from "@/actions/downloads";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DocumentItem {
  id: string;
  titleAr: string;
  titleEn: string;
  fileUrl: string;
  category: string;
  fileSize?: number | null;
  createdAt: Date;
}

interface DownloadsDashboardProps {
  initialData: DocumentItem[];
}

export default function DownloadsDashboard({ initialData }: DownloadsDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<DocumentItem | null>(null);

  const columns: ColumnDef<DocumentItem>[] = [
    {
      header: "الملف",
      accessorKey: (row: DocumentItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.titleAr}</p>
            <p className="text-[10px] text-gray-400 font-sans">{row.titleEn}</p>
          </div>
        </div>
      ),
    },
    {
      header: "التصنيف",
      accessorKey: (row: DocumentItem) => (
        <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-[10px] font-bold border border-gray-100 uppercase">
          {row.category}
        </span>
      ),
    },
    {
      header: "الحجم",
      accessorKey: (row: DocumentItem) => (
        <span className="text-xs font-mono text-gray-400">
            {row.fileSize ? `${(row.fileSize / 1024 / 1024).toFixed(2)} MB` : "N/A"}
        </span>
      ),
    },
    {
        header: "رابط",
        accessorKey: (row: DocumentItem) => (
            <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-primary">
                <a href={row.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 ml-1" />
                    تحميل
                </a>
            </Button>
        )
    }
  ];

  const handleEdit = (row: DocumentItem) => {
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: DocumentItem) => {
    if (confirm(`هل أنت متأكد من حذف الملف: ${row.titleAr}؟`)) {
      const result = await deleteDocument(row.id);
      if (result.success) {
          toast.success("تم حذف الملف بنجاح");
      } else {
          toast.error("فشل في الحذف");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">الملفات والتحميلات 📥</h1>
          <p className="text-gray-500 mt-1 font-medium">إدارة الكتب المدرسية، الجداول، والمستندات المتاحة للتحميل.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 ml-2" />
          رفع ملف جديد
        </Button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={initialData}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      </div>

      {/* Reusable Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingData ? "تعديل بيانات الملف" : "رفع ملف جديد"}
      >
        <DownloadForm
          initialData={editingData}
          onSuccess={closeModal}
        />
      </AdminModal>

    </div>
  );
}
