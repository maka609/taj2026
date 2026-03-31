"use client";

import React, { useState } from "react";
import { Plus, Briefcase, Users } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AdminModal } from "@/components/ui/admin-modal";
import { CareerForm } from "@/components/admin/careers/CareerForm";
import { deleteCareer, updateCareerStatus } from "@/actions/careers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CareerItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  department: string;
  deadline?: Date | null;
  active: boolean;
  createdAt: Date;
  _count?: {
    applications: number;
  };
}

interface CareersDashboardProps {
  initialData: CareerItem[];
}

export default function CareersDashboard({ initialData }: CareersDashboardProps) {
  const [careers, setCareers] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<CareerItem | null>(null);

  const columns: ColumnDef<CareerItem>[] = [
    {
      header: "الوظيفة",
      accessorKey: (row: CareerItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.titleAr}</p>
            <p className="text-[10px] text-gray-400 font-sans">{row.titleEn}</p>
          </div>
        </div>
      ),
    },
    {
      header: "القسم",
      accessorKey: (row: CareerItem) => (
        <span className="text-xs font-bold text-gray-500">{row.department}</span>
      ),
    },
    {
      header: "الطلبات",
      accessorKey: (row: CareerItem) => (
        <div className="flex items-center gap-1.5 text-primary font-bold">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs">{row._count?.applications || 0} طلب</span>
        </div>
      ),
    },
    {
      header: "الحالة",
      accessorKey: (row: CareerItem) => (
        <button
            onClick={() => handleStatusToggle(row.id, !row.active)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${row.active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-gray-50 text-gray-400 border-gray-100"}`}
        >
          {row.active ? "نشط" : "مغلق"}
        </button>
      ),
    }
  ];

  const handleStatusToggle = async (id: string, active: boolean) => {
      const result = await updateCareerStatus(id, active);
      if (result.success) {
          setCareers(careers.map(c => c.id === id ? { ...c, active } : c));
          toast.success(active ? "تم تفعيل الوظيفة" : "تم إغلاق التقديم للوظيفة");
      } else {
          toast.error("فشل في تحديث الحالة");
      }
  };

  const handleEdit = (row: CareerItem) => {
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: CareerItem) => {
    if (confirm(`هل أنت متأكد من حذف هذه الوظيفة؟ سيتم حذف جميع الطلبات المرتبطة بها.`)) {
      const result = await deleteCareer(row.id);
      if (result.success) {
          setCareers(careers.filter(c => c.id !== row.id));
          toast.success("تم حذف الوظيفة بنجاح");
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">التوظيف والوظائف 💼</h1>
          <p className="text-gray-500 mt-1 font-medium">إدارة الفرص الوظيفية المتاحة ومتابعة طلبات المتقدمين.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة وظيفة جديدة
        </Button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={careers}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      </div>

      {/* Reusable Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingData ? "تعديل بيانات الوظيفة" : "إضافة وظيفة جديدة"}
      >
        <CareerForm
          initialData={editingData}
          onSuccess={closeModal}
        />
      </AdminModal>

    </div>
  );
}
