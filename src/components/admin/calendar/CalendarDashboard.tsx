"use client";

import React, { useState } from "react";
import { Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AdminModal } from "@/components/ui/admin-modal";
import { EventForm } from "@/components/admin/calendar/EventForm";
import { deleteEvent } from "@/actions/calendar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EventItem {
  id: string;
  titleAr: string;
  titleEn: string;
  description?: string | null;
  startDate: Date;
  endDate?: Date | null;
  color?: string | null;
}

interface CalendarDashboardProps {
  initialData: EventItem[];
}

export default function CalendarDashboard({ initialData }: CalendarDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<EventItem | null>(null);

  const columns: ColumnDef<EventItem>[] = [
    {
      header: "الحدث",
      accessorKey: (row: EventItem) => (
        <div className="flex items-center gap-3">
          <div className="w-2 h-10 rounded-full shrink-0" style={{ backgroundColor: row.color || "#3b82f6" }} />
          <div>
            <p className="font-bold text-gray-900">{row.titleAr}</p>
            <p className="text-[10px] text-gray-400 font-sans">{row.titleEn}</p>
          </div>
        </div>
      ),
    },
    {
      header: "التاريخ والوقت",
      accessorKey: (row: EventItem) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">
              {new Date(row.startDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-medium">
                {new Date(row.startDate).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "الوصف",
      accessorKey: (row: EventItem) => (
        <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">
          {row.description || "لا يوجد وصف"}
        </p>
      ),
    }
  ];

  const handleEdit = (row: EventItem) => {
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: EventItem) => {
    if (confirm(`هل أنت متأكد من حذف الحدث: ${row.titleAr}؟`)) {
      const result = await deleteEvent(row.id);
      if (result.success) {
          toast.success("تم حذف الحدث بنجاح");
      } else {
          toast.error("فشل في حذف الحدث");
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">التقويم والأحداث 📅</h1>
          <p className="text-gray-500 mt-1 font-medium">إدارة المواعيد، الإجازات، والفعاليات المدرسية القادمة.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة حدث جديد
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
        title={editingData ? "تعديل بيانات الحدث" : "إضافة حدث جديد"}
      >
        <EventForm
          initialData={editingData}
          onSuccess={closeModal}
        />
      </AdminModal>

    </div>
  );
}
