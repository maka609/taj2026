import React from "react";
import { Upload } from "lucide-react";
import { getGalleryImages } from "@/actions/gallery";
import GalleryClient from "@/components/admin/gallery/GalleryClient";

export default async function GalleryPage() {
  const { data: images } = await getGalleryImages();

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">مكتبة الصور 🖼️</h1>
        <p className="text-gray-500 mt-2">إدارة صور الأنشطة والفعاليات المدرسية</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          <Upload className="w-5 h-5" />
          رفع صور جديدة
        </button>
      </div>

      <GalleryClient initialData={images || []} />
    </div>
  );
}
