import React from "react";
import { Upload } from "lucide-react";
import { getSliders } from "@/actions/sliders";
import SlidersClient from "@/components/admin/sliders/SlidersClient";

export default async function SlidersPage() {
  const { data: sliders } = await getSliders();

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">صور الصفحة الرئيسية 🎬</h1>
        <p className="text-gray-500 mt-2">إدارة السلايدر والصور المتحركة في الصفحة الرئيسية</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          <Upload className="w-5 h-5" />
          إضافة صورة جديدة
        </button>
      </div>

      <SlidersClient initialData={sliders || []} />
    </div>
  );
}
