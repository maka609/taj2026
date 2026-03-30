import React from "react";
import { getTestimonials } from "@/actions/testimonials";
import TestimonialsClient from "@/components/admin/testimonials/TestimonialsClient";

export default async function TestimonialsPage() {
  const { data: testimonials } = await getTestimonials();

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">آراء أولياء الأمور ⭐</h1>
        <p className="text-gray-500 mt-2">إدارة ومراجعة تقييمات أولياء الأمور</p>
      </div>

      <TestimonialsClient initialData={testimonials || []} />
    </div>
  );
}
