"use client";

import React, { useState } from "react";
import { Plus, Search, Calendar, Image as ImageIcon } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AdminModal } from "@/components/ui/admin-modal";
import { NewsForm } from "@/components/admin/news/NewsForm";
import { deleteNews } from "@/actions/news";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

interface NewsItem {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  imageUrl?: string | null;
  createdAt: Date;
}

interface NewsDashboardProps {
  initialData: NewsItem[];
}

export default function NewsDashboard({ initialData }: NewsDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = initialData.filter(item =>
    item.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.titleEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnDef<NewsItem>[] = [
    {
      header: "الخبر",
      accessorKey: (row: NewsItem) => (
        <div className="flex items-center gap-4">
          <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 border border-gray-100">
            {row.imageUrl ? (
              <Image src={row.imageUrl} alt={row.titleAr} width={56} height={40} className="object-cover w-full h-full" />
            ) : (
              <ImageIcon className="w-4 h-4 text-gray-300" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate max-w-[200px]">{row.titleAr}</p>
            <p className="text-[10px] text-gray-400 font-sans truncate max-w-[200px]">{row.titleEn}</p>
          </div>
        </div>
      ),
    },
    {
      header: "تاريخ النشر",
      accessorKey: (row: NewsItem) => (
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-3 h-3" />
          <span className="text-xs font-medium">
            {new Date(row.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
      ),
    },
    {
        header: "الحالة",
        accessorKey: () => (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">نشط</span>
        )
    }
  ];

  const handleEdit = (row: NewsItem) => {
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: NewsItem) => {
    if (confirm(`هل أنت متأكد من حذف الخبر: ${row.titleAr}؟`)) {
      const result = await deleteNews(row.id);
      if (result.success) {
          toast.success("تم حذف الخبر بنجاح");
      } else {
          toast.error("فشل في حذف الخبر");
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">إدارة الأخبار 📰</h1>
          <p className="text-gray-500 mt-1 font-medium">نشر وتحديث آخر أخبار وفعاليات المدرسة.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة خبر جديد
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-4 sm:p-6">
            <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="بحث في الأخبار..."
                    className="pr-10 h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
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
