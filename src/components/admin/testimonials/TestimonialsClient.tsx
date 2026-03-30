'use client'

import React, { useState } from "react";
import { Star, Check, X } from "lucide-react";
import { approveTestimonial, deleteTestimonial } from "@/actions/testimonials";

interface Testimonial {
  id: string;
  parentName: string;
  contentAr: string;
  contentEn: string;
  rating: number;
  approved: boolean;
}

export default function TestimonialsClient({ initialData }: { initialData: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoading(id);
    const result = await approveTestimonial(id);
    if (result.success) {
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, approved: true } : t
      ));
    }
    setLoading(null);
  };

  const handleReject = async (id: string) => {
    if (!confirm('هل أنت متأكد من رفض هذا التقييم؟')) return;
    
    setLoading(id);
    const result = await deleteTestimonial(id);
    if (result.success) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
    setLoading(null);
  };

  if (testimonials.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">لا توجد تقييمات</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className={`bg-white rounded-xl shadow-sm border p-6 ${
            testimonial.approved ? "border-green-200" : "border-yellow-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-900">{testimonial.parentName}</p>
              <div className="flex gap-1 mt-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                testimonial.approved
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {testimonial.approved ? "منشور" : "قيد المراجعة"}
            </span>
          </div>
          <p className="text-gray-700 mb-4">{testimonial.contentAr}</p>
          {!testimonial.approved && (
            <div className="flex gap-2">
              <button 
                onClick={() => handleApprove(testimonial.id)}
                disabled={loading === testimonial.id}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                نشر
              </button>
              <button 
                onClick={() => handleReject(testimonial.id)}
                disabled={loading === testimonial.id}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                رفض
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
