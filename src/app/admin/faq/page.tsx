import { getFAQs } from "@/actions/faq";
import FAQDashboard from "@/components/admin/faq/FAQDashboard";

export const metadata = {
  title: "الأسئلة الشائعة | Taj El-Nozha Admin",
};

export default async function AdminFAQPage() {
  const { data } = await getFAQs();

  return (
    <div className="w-full">
      <FAQDashboard initialData={data || []} />
    </div>
  );
}
