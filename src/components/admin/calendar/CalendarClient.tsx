'use client'

import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { deleteEvent } from "@/actions/calendar";

interface Event {
  id: string;
  titleAr: string;
  titleEn: string;
  startDate: Date;
  endDate: Date | null;
  color: string | null;
}

export default function CalendarClient({ initialData }: { initialData: Event[] }) {
  const [events, setEvents] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    
    setLoading(id);
    const result = await deleteEvent(id);
    if (result.success) {
      setEvents(events.filter(e => e.id !== id));
    }
    setLoading(null);
  };

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">لا توجد أحداث</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div 
                className="w-3 h-3 rounded-full mt-1.5" 
                style={{ backgroundColor: event.color || '#3b82f6' }}
              ></div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{event.titleAr}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(event.startDate).toLocaleDateString('ar-EG')}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
                <Edit className="w-4 h-4 text-blue-600" />
              </button>
              <button 
                onClick={() => handleDelete(event.id)}
                disabled={loading === event.id}
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
