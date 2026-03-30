import React from "react";
import { getAdmissions } from "@/actions/admissions";
import AdmissionsClient from "@/components/admin/admissions/AdmissionsClient";

export default async function AdmissionsPage() {
  const { data: admissions } = await getAdmissions();

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">طلبات القبول 📝</h1>
        <p className="text-gray-500 mt-2">إدارة ومراجعة طلبات القبول للطلاب الجدد</p>
      </div>

      <AdmissionsClient initialData={admissions || []} />
    </div>
  );
}
