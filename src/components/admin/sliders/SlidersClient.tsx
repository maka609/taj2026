'use client'

import React, { useState } from "react";
import { ArrowUp, ArrowDown, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteSlider, toggleSliderActive } from "@/actions/sliders";

interface Slider {
  id: string;
  imageUrl: string;
  titleAr: string | null;
  titleEn: string | null;
  order: number;
  active: boolean;
}

export default function SlidersClient({ initialData }: { initialData: Slider[] }) {
  const [sliders, setSliders] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggleActive = async (id: string) => {
    setLoading(id);
    const result = await toggleSliderActive(id);
    if (result.success) {
      setSliders(sliders.map(s => 
        s.id === id ? { ...s, active: !s.active } : s
      ));
    }
    setLoading(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    
    setLoading(id);
    const result = await deleteSlider(id);
    if (result.success) {
      setSliders(sliders.filter(s => s.id !== id));
    }
    setLoading(null);
  };

  if (sliders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">لا توجد صور في السلايدر</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sliders.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
          <div className="w-32 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex-shrink-0 overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.titleAr || ''} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                صورة {item.order}
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{item.titleAr || 'بدون عنوان'}</p>
            <p className="text-sm text-gray-500">الترتيب: {item.order}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              <ArrowUp className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              <ArrowDown className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={() => handleToggleActive(item.id)}
              disabled={loading === item.id}
              className={`p-2 rounded-lg transition disabled:opacity-50 ${item.active ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {item.active ? (
                <Eye className="w-4 h-4 text-green-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button 
              onClick={() => handleDelete(item.id)}
              disabled={loading === item.id}
              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
