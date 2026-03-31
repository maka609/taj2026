import { getBackups } from "@/actions/backups";
import BackupDashboard from "@/components/admin/backup/BackupDashboard";

export const metadata = {
  title: "النسخ الاحتياطي | Taj El-Nozha Admin",
};

export default async function AdminBackupPage() {
  const { data } = await getBackups();

  return (
    <div className="w-full">
      <BackupDashboard initialData={data || []} />
    </div>
  );
}
