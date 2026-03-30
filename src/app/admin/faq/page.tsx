import React from "react";
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { getFAQs } from "@/actions/faq";
import FAQClient from "@/components/admin/faq/FAQClient";

export default async function FAQPage() {
  const { data: faqs } = await getFAQs();

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">الأسئلة الشائعة ❓</h1>
        <p className="text-gray-500 mt-2">إدارة الأسئلة والأجوبة الشائعة</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          <Plus className="w-5 h-5" />
          إضافة سؤال جديد
        </button>
      </div>

      <FAQClient initialData={faqs || []} />
    </div>
  );
}
