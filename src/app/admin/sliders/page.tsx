import { getSliders } from "@/actions/sliders";
import SlidersDashboard from "@/components/admin/sliders/SlidersDashboard";

export const metadata = {
  title: "إدارة صور الصفحة الرئيسية | Taj El-Nozha Admin",
};

export default async function SlidersPage() {
  const { data } = await getSliders();

  return (
    <div className="w-full">
      <SlidersDashboard initialData={data || []} />
    </div>
  );
}
