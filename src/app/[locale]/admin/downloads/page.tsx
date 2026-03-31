import { getDocuments } from "@/actions/downloads";
import DownloadsDashboard from "@/components/admin/downloads/DownloadsDashboard";

export const metadata = {
  title: "الملفات والتحميلات | Taj El-Nozha Admin",
};

export default async function AdminDownloadsPage() {
  const { data } = await getDocuments();

  return (
    <div className="w-full">
      <DownloadsDashboard initialData={data || []} />
    </div>
  );
}
