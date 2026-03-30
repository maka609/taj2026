import React from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getEvents } from "@/actions/calendar";
import CalendarClient from "@/components/admin/calendar/CalendarClient";

export default async function CalendarPage() {
  const { data: events } = await getEvents();

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">التقويم والأحداث 📅</h1>
        <p className="text-gray-500 mt-2">إدارة الفعاليات والأحداث المدرسية</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          <Plus className="w-5 h-5" />
          إضافة حدث جديد
        </button>
      </div>

      <CalendarClient initialData={events || []} />
    </div>
  );
}
