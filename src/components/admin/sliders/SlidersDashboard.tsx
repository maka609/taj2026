"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AdminModal } from "@/components/ui/admin-modal";
import { SliderForm } from "@/components/admin/sliders/SliderForm";
import { deleteSlider, updateSliderStatus } from "@/actions/sliders";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface SliderItem {
  id: string;
  imageUrl: string;
  titleAr?: string | null;
  titleEn?: string | null;
  link?: string | null;
  order: number;
  active: boolean;
  createdAt: Date;
}

interface SlidersDashboardProps {
  initialData: SliderItem[];
}

export default function SlidersDashboard({ initialData }: SlidersDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<SliderItem | null>(null);

  const columns: ColumnDef<SliderItem>[] = [
    {
      header: "الصورة",
      accessorKey: (row: SliderItem) => (
        <div className="w-24 h-14 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 border border-gray-100">
          <Image src={row.imageUrl} alt={row.titleAr || "Slider Image"} width={96} height={56} className="object-cover w-full h-full" />
        </div>
      ),
    },
    {
      header: "العنوان",
      accessorKey: (row: SliderItem) => (
        <div className="min-w-0">
          <p className="font-bold text-gray-900 truncate max-w-[200px]">{row.titleAr || "بدون عنوان"}</p>
          <p className="text-[10px] text-gray-400 font-sans truncate max-w-[200px]">{row.titleEn || "No title"}</p>
        </div>
      ),
    },
    {
        header: "الترتيب",
        accessorKey: "order" as keyof SliderItem,
        className: "text-center font-mono font-bold text-primary bg-primary/5 rounded-lg",
    },
    {
      header: "الحالة",
      accessorKey: (row: SliderItem) => (
        <button
            onClick={() => handleStatusToggle(row.id, !row.active)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${row.active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-gray-50 text-gray-400 border-gray-100"}`}
        >
          {row.active ? "نشط" : "معطل"}
        </button>
      ),
    }
  ];

  const handleStatusToggle = async (id: string, active: boolean) => {
      const result = await updateSliderStatus(id, active);
      if (result.success) {
          toast.success(active ? "تم تفعيل السلايدر" : "تم تعطيل السلايدر");
      } else {
          toast.error("فشل في تحديث الحالة");
      }
  };

  const handleEdit = (row: SliderItem) => {
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: SliderItem) => {
    if (confirm(`هل أنت متأكد من حذف هذه الصورة من السلايدر؟`)) {
      const result = await deleteSlider(row.id);
      if (result.success) {
          toast.success("تم حذف الصورة بنجاح");
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">صور الصفحة الرئيسية 🎬</h1>
          <p className="text-gray-500 mt-1 font-medium">إدارة الصور المتحركة (Slider) المعروضة في مقدمة الموقع.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة صورة جديدة
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
        title={editingData ? "تعديل بيانات السلايدر" : "إضافة صورة جديدة"}
      >
        <SliderForm
          initialData={editingData}
          onSuccess={closeModal}
        />
      </AdminModal>

    </div>
  );
}
