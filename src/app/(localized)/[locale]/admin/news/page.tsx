import { Suspense } from "react";
import { getNews } from "@/actions/news";
import NewsDashboard from "@/components/admin/news/NewsDashboard";
import { TableSkeleton } from "@/components/ui/skeletons";

export const metadata = {
  title: "إدارة الأخبار | Taj El-Nozha Admin",
};

async function NewsContent() {
  const { data } = await getNews();
  return <NewsDashboard initialData={data || []} />;
}

export default function AdminNewsPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<TableSkeleton />}>
        <NewsContent />
      </Suspense>
    </div>
  );
}
