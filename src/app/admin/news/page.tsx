import { getNews } from "@/actions/news";
import NewsDashboard from "@/components/admin/news/NewsDashboard";

export const metadata = {
  title: "إدارة الأخبار | Taj El-Nozha Admin",
};

export default async function AdminNewsPage() {
  const { data } = await getNews();

  return (
    <div className="w-full">
      <NewsDashboard initialData={data || []} />
    </div>
  );
}
