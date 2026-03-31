import { getTestimonials } from "@/actions/testimonials";
import TestimonialsDashboard from "@/components/admin/testimonials/TestimonialsDashboard";

export const metadata = {
  title: "آراء أولياء الأمور | Taj El-Nozha Admin",
};

export default async function TestimonialsPage() {
  const { data } = await getTestimonials();

  return (
    <div className="w-full">
      <TestimonialsDashboard initialData={data || []} />
    </div>
  );
}
