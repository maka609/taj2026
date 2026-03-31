"use client";

import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AdminModal } from "@/components/ui/admin-modal";
import { StaffForm } from "@/components/admin/staff/StaffForm";
import { deleteStaff } from "@/actions/staff";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

interface StaffMember {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  department?: string | null;
  imageUrl?: string | null;
  order: number;
}

interface StaffDashboardProps {
  initialData: StaffMember[];
}

export default function StaffDashboard({ initialData }: StaffDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<StaffMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = initialData.filter(item =>
    item.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.roleAr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnDef<StaffMember>[] = [
    {
      header: "الموظف",
      accessorKey: (row: StaffMember) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 border border-gray-100">
            {row.imageUrl ? (
              <Image src={row.imageUrl} alt={row.nameAr} width={40} height={40} className="object-cover w-full h-full" />
            ) : (
              <span className="text-primary font-bold text-sm">{row.nameAr.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.nameAr}</p>
            <p className="text-xs text-gray-500 font-sans">{row.nameEn}</p>
          </div>
        </div>
      ),
    },
    {
      header: "المسمى الوظيفي",
      accessorKey: (row: StaffMember) => (
        <div>
          <p className="font-medium text-gray-700">{row.roleAr}</p>
          <p className="text-[10px] text-gray-400 font-sans">{row.roleEn}</p>
        </div>
      ),
    },
    {
      header: "القسم",
      accessorKey: "department" as keyof StaffMember,
      className: "text-gray-500 font-medium",
    },
    {
        header: "الترتيب",
        accessorKey: "order" as keyof StaffMember,
        className: "text-center font-mono text-gray-400",
    }
  ];

  const handleEdit = (row: StaffMember) => {
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: StaffMember) => {
    if (confirm(`هل أنت متأكد من حذف الموظف: ${row.nameAr}؟`)) {
      const result = await deleteStaff(row.id);
      if (result.success) {
          toast.success("تم حذف الموظف بنجاح");
      } else {
          toast.error("فشل في حذف الموظف");
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">الكادر التعليمي 👨‍🏫</h1>
          <p className="text-gray-500 mt-1 font-medium">إدارة بيانات المعلمين والإداريين في المدرسة.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة موظف جديد
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="بحث باسم الموظف أو المسمى الوظيفي..."
                    className="pr-10 h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button variant="outline" className="h-11 rounded-xl px-5 border-gray-100 text-gray-600 font-bold">
                <Filter className="w-4 h-4 ml-2" />
                تصفية
            </Button>
        </CardContent>
      </Card>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={filteredData}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      </div>

      {/* Reusable Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingData ? "تعديل بيانات الموظف" : "إضافة موظف جديد"}
      >
        <StaffForm
          initialData={editingData}
          onSuccess={closeModal}
        />
      </AdminModal>

    </div>
  );
}
