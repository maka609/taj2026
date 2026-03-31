import { getSecurityLogs } from "@/actions/security";
import SecurityDashboard from "@/components/admin/security/SecurityDashboard";

export const metadata = {
  title: "المراقبة الأمنية | Taj El-Nozha Admin",
};

export default async function SecurityLogsPage() {
  const { data } = await getSecurityLogs();

  return (
    <div className="w-full">
      <SecurityDashboard initialData={data || []} />
    </div>
  );
}
