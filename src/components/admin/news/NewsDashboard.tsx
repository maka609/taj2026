"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/admin/ui/DataTable";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { NewsForm } from "@/components/admin/news/NewsForm";
import { deleteNews } from "@/actions/news";
import Image from "next/image";

interface NewsDashboardProps {
  initialData: any[];
}

export default function NewsDashboard({ initialData }: NewsDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any | null>(null);

  const columns: ColumnDef<any>[] = [
    {
      header: "الصورة",
      accessorKey: (row) => (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
          {row.imageUrl ? (
            <Image src={row.imageUrl} alt={row.titleAr} width={48} height={48} className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-400 text-xs">بدون صورة</span>
          )}
        </div>
      ),
    },
    {
      header: "العنوان العربي",
      accessorKey: "titleAr",
      className: "font-bold text-gray-900 w-1/3",
    },
    {
      header: "العنوان الإنجليزي",
      accessorKey: "titleEn",
      className: "text-gray-500 font-medium font-sans w-1/3",
    },
    {
      header: "تاريخ الإضافة",
      accessorKey: (row) => (
        <span className="text-gray-500 font-medium block w-max">
          {new Date(row.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      ),
    },
  ];

  const handleEdit = (row: any) => {
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: any) => {
    // In a production app, use full AlertDialog.
    if (confirm(`هل أنت متأكد من حذف الخبر: ${row.titleAr}؟`)) {
      await deleteNews(row.id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">إدارة الأخبار</h1>
          <p className="text-gray-500 mt-2 font-medium">قم بإضافة، تعديل، وحذف أحدث الأخبار المعروضة في الموقع.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary/90 hover:scale-[1.02] shadow-sm transition-all transform shrink-0"
        >
          <Plus className="w-5 h-5" />
          إضافة خبر جديد
        </button>
      </div>

      {/* Main Table */}
      <DataTable 
        data={initialData} 
        columns={columns} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Reusable Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingData ? "تعديل بيانات الخبر" : "إضافة خبر جديد"}
      >
        <NewsForm 
          initialData={editingData} 
          onSuccess={closeModal} 
        />
      </AdminModal>
      
    </div>
  );
}
