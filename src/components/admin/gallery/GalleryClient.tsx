'use client'

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteGalleryImage } from "@/actions/gallery";

interface GalleryImage {
  id: string;
  url: string;
  captionAr: string | null;
  captionEn: string | null;
  category: string | null;
  createdAt: Date;
}

export default function GalleryClient({ initialData }: { initialData: GalleryImage[] }) {
  const [images, setImages] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
    
    setLoading(id);
    const result = await deleteGalleryImage(id);
    if (result.success) {
      setImages(images.filter(img => img.id !== id));
    }
    setLoading(null);
  };

  if (images.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">لا توجد صور في المكتبة</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((item) => (
        <div key={item.id} className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
          <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
            {item.url ? (
              <img src={item.url} alt={item.captionAr || ''} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                صورة
              </div>
            )}
          </div>
          <div className="p-3">
            <p className="text-sm font-medium text-gray-700 truncate">
              {item.captionAr || item.category || 'بدون عنوان'}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleDateString('ar-EG')}
            </p>
          </div>
          <button 
            onClick={() => handleDelete(item.id)}
            disabled={loading === item.id}
            className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
