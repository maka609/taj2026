'use client'

import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { deleteStaff } from "@/actions/staff";

interface Staff {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  department: string | null;
  imageUrl: string | null;
  order: number;
}

export default function StaffClient({ initialData }: { initialData: Staff[] }) {
  const [staff, setStaff] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العضو؟')) return;
    
    setLoading(id);
    const result = await deleteStaff(id);
    if (result.success) {
      setStaff(staff.filter(s => s.id !== id));
    }
    setLoading(null);
  };

  const handleEdit = (id: string) => {
    alert('سيتم إضافة نموذج التعديل قريباً');
  };

  if (staff.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">لا يوجد أعضاء في الكادر التعليمي</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staff.map((member) => (
        <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            {member.imageUrl ? (
              <img src={member.imageUrl} alt={member.nameAr} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-primary">
                {member.nameAr.charAt(0)}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{member.nameAr}</h3>
          <p className="text-sm text-gray-600 mb-1">{member.roleAr}</p>
          {member.department && (
            <p className="text-xs text-gray-500 mb-4">{member.department}</p>
          )}
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => handleEdit(member.id)}
              className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
            >
              <Edit className="w-4 h-4 text-blue-600" />
            </button>
            <button 
              onClick={() => handleDelete(member.id)}
              disabled={loading === member.id}
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
