"use client";

import React, { useState } from "react";
import { Plus, HelpCircle, ArrowUp, ArrowDown } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AdminModal } from "@/components/ui/admin-modal";
import { FAQForm } from "@/components/admin/faq/FAQForm";
import { deleteFAQ, updateFAQOrder } from "@/actions/faq";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  order: number;
  createdAt: Date;
}

interface FAQDashboardProps {
  initialData: FAQItem[];
}

export default function FAQDashboard({ initialData }: FAQDashboardProps) {
  const [faqs, setFaqs] = useState(initialData.sort((a, b) => a.order - b.order));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<FAQItem | null>(null);

  const columns: ColumnDef<FAQItem>[] = [
    {
      header: "السؤال",
      accessorKey: (row: FAQItem) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 line-clamp-1">{row.questionAr}</p>
            <p className="text-[10px] text-gray-400 font-sans line-clamp-1">{row.questionEn}</p>
          </div>
        </div>
      ),
    },
    {
      header: "الإجابة",
      accessorKey: (row: FAQItem) => (
        <p className="text-xs text-gray-500 line-clamp-2 max-w-[300px] leading-relaxed">
          {row.answerAr}
        </p>
      ),
    },
    {
      header: "الترتيب",
      accessorKey: (row: FAQItem) => (
        <div className="flex items-center gap-2 font-mono font-bold text-primary">
            <span>{row.order}</span>
            <div className="flex flex-col">
                <button onClick={() => handleOrderUpdate(row.id, row.order - 1)} className="hover:text-amber-600 transition-colors"><ArrowUp className="w-3 h-3" /></button>
                <button onClick={() => handleOrderUpdate(row.id, row.order + 1)} className="hover:text-amber-600 transition-colors"><ArrowDown className="w-3 h-3" /></button>
            </div>
        </div>
      ),
    }
  ];

  const handleOrderUpdate = async (id: string, newOrder: number) => {
      const result = await updateFAQOrder(id, Math.max(0, newOrder));
      if (result.success) {
          // Ideally re-fetch or re-sort local state
          toast.success("تم تحديث الترتيب");
      }
  };

  const handleEdit = (row: FAQItem) => {
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: FAQItem) => {
    if (confirm(`هل أنت متأكد من حذف هذا السؤال؟`)) {
      const result = await deleteFAQ(row.id);
      if (result.success) {
          setFaqs(faqs.filter(f => f.id !== row.id));
          toast.success("تم حذف السؤال بنجاح");
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">الأسئلة الشائعة ❓</h1>
          <p className="text-gray-500 mt-1 font-medium">إدارة قائمة الأسئلة الأكثر شيوعاً وإجاباتها.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة سؤال جديد
        </Button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={faqs}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      </div>

      {/* Reusable Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingData ? "تعديل بيانات السؤال" : "إضافة سؤال جديد"}
      >
        <FAQForm
          initialData={editingData}
          onSuccess={closeModal}
        />
      </AdminModal>

    </div>
  );
}
