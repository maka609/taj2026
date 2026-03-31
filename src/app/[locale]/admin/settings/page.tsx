import { getSettings } from "@/actions/settings";
import SettingsForm from "@/components/admin/settings/SettingsForm";

export const metadata = {
  title: "إعدادات الموقع | Taj El-Nozha Admin",
};

export default async function AdminSettingsPage() {
  const { data } = await getSettings();

  return (
    <div className="w-full">
      <SettingsForm initialData={data || {}} />
    </div>
  );
}
