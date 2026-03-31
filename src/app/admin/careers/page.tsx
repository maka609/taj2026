import { getCareers } from "@/actions/careers";
import CareersDashboard from "@/components/admin/careers/CareersDashboard";

export const metadata = {
  title: "التوظيف والوظائف | Taj El-Nozha Admin",
};

export default async function AdminCareersPage() {
  const { data } = await getCareers();

  return (
    <div className="w-full">
      <CareersDashboard initialData={data || []} />
    </div>
  );
}
