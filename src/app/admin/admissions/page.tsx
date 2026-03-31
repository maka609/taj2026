import React from "react";
import { getAdmissions } from "@/actions/admissions";
import AdmissionsDashboard from "@/components/admin/admissions/AdmissionsDashboard";

export const metadata = {
  title: "إدارة طلبات القبول | Taj El-Nozha Admin",
};

export default async function AdmissionsPage() {
  const { data: admissions } = await getAdmissions();

  return (
    <div className="w-full">
      <AdmissionsDashboard initialData={admissions || []} />
    </div>
  );
}
