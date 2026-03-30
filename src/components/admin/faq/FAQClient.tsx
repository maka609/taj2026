'use client'

import React, { useState } from "react";
import { Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { deleteFAQ } from "@/actions/faq";

interface FAQ {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  order: number;
}

export default function FAQClient({ initialData }: { initialData: FAQ[] }) {
  const [faqs, setFaqs] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    
    setLoading(id);
    const result = await deleteFAQ(id);
    if (result.success) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
    setLoading(null);
  };

  if (faqs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">لا توجد أسئلة شائعة</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-2">{faq.questionAr}</p>
              <p className="text-gray-600 text-sm">{faq.answerAr}</p>
            </div>
            <div className="flex gap-2 mr-4">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <ArrowUp className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <ArrowDown className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
                <Edit className="w-4 h-4 text-blue-600" />
              </button>
              <button 
                onClick={() => handleDelete(faq.id)}
                disabled={loading === faq.id}
                className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
