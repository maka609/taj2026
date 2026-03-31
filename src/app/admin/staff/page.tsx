import { Suspense } from "react";
import { getStaff } from "@/actions/staff";
import StaffDashboard from "@/components/admin/staff/StaffDashboard";
import { TableSkeleton } from "@/components/ui/skeletons";

export const metadata = {
  title: "إدارة الكادر التعليمي | Taj El-Nozha Admin",
};

async function StaffContent() {
  const { data } = await getStaff();
  return <StaffDashboard initialData={data || []} />;
}

export default function StaffPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<TableSkeleton />}>
        <StaffContent />
      </Suspense>
    </div>
  );
}
