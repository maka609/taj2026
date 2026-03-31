"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, XCircle, Quote } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { deleteTestimonial, updateTestimonialStatus } from "@/actions/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface TestimonialItem {
  id: string;
  parentName: string;
  contentAr: string;
  contentEn: string;
  rating: number;
  approved: boolean;
  createdAt: Date;
}

interface TestimonialsDashboardProps {
  initialData: TestimonialItem[];
}

export default function TestimonialsDashboard({ initialData }: TestimonialsDashboardProps) {
  const [testimonials, setTestimonials] = useState(initialData);

  const columns: ColumnDef<TestimonialItem>[] = [
    {
      header: "ولي الأمر",
      accessorKey: (row: TestimonialItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary font-bold">
            {row.parentName.charAt(0)}
          </div>
          <p className="font-bold text-gray-900">{row.parentName}</p>
        </div>
      ),
    },
    {
      header: "الرأي",
      accessorKey: (row: TestimonialItem) => (
        <div className="max-w-[300px]">
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{row.contentAr}</p>
          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < row.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
            ))}
          </div>
        </div>
      ),
    },
    {
      header: "الحالة",
      accessorKey: (row: TestimonialItem) => (
        <button
            onClick={() => handleStatusToggle(row.id, !row.approved)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${row.approved ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}
        >
          {row.approved ? "منشور" : "مرفوض"}
        </button>
      ),
    }
  ];

  const handleStatusToggle = async (id: string, approved: boolean) => {
      const result = await updateTestimonialStatus(id, approved);
      if (result.success) {
          setTestimonials(testimonials.map(t => t.id === id ? { ...t, approved } : t));
          toast.success(approved ? "تم نشر التقييم بنجاح" : "تم سحب نشر التقييم");
      } else {
          toast.error("فشل في تحديث الحالة");
      }
  };

  const handleDelete = async (row: TestimonialItem) => {
    if (confirm(`هل أنت متأكد من حذف تقييم: ${row.parentName}؟`)) {
      const result = await deleteTestimonial(row.id);
      if (result.success) {
          setTestimonials(testimonials.filter(t => t.id !== row.id));
          toast.success("تم حذف التقييم بنجاح");
      } else {
          toast.error("فشل في الحذف");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">آراء أولياء الأمور ⭐</h1>
        <p className="text-gray-500 font-medium">مراجعة ونشر تقييمات أولياء الأمور والطلاب.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <Quote className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">إجمالي التقييمات</p>
                      <h3 className="text-2xl font-bold text-gray-900">{testimonials.length}</h3>
                  </div>
              </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">المنشورة</p>
                      <h3 className="text-2xl font-bold text-gray-900">{testimonials.filter(t => t.approved).length}</h3>
                  </div>
              </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">بانتظار المراجعة</p>
                      <h3 className="text-2xl font-bold text-gray-900">{testimonials.filter(t => !t.approved).length}</h3>
                  </div>
              </CardContent>
          </Card>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={testimonials}
            columns={columns}
            onDelete={handleDelete}
        />
      </div>

    </div>
  );
}
