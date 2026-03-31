import { getGalleryImages } from "@/actions/gallery";
import GalleryDashboard from "@/components/admin/gallery/GalleryDashboard";

export const metadata = {
  title: "مكتبة الصور | Taj El-Nozha Admin",
};

export default async function GalleryPage() {
  const { data } = await getGalleryImages();

  return (
    <div className="w-full">
      <GalleryDashboard initialData={data || []} />
    </div>
  );
}
