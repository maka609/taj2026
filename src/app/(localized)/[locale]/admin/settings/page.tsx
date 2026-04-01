import { getGlobalSettings, getSMTPConfig } from "@/actions/settings";
import { getSettings } from "@/actions/settings-engine";
import SettingsForm from "@/components/admin/settings/SettingsForm";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "إعدادات المنصة | Taj Schools Admin",
};

export default async function AdminSettingsPage() {
  const [globalRes, smtpRes, settings] = await Promise.all([
    getGlobalSettings(),
    getSMTPConfig(),
    getSettings()
  ]);

  return (
    <div className="w-full">
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsForm
            globalSettings={globalRes.data}
            smtpConfig={smtpRes.data}
            settings={settings}
        />
      </Suspense>
    </div>
  );
}

function SettingsSkeleton() {
    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <Skeleton className="h-10 w-64 rounded-xl" />
                <Skeleton className="h-4 w-96 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton className="h-[400px] w-full rounded-3xl" />
                <Skeleton className="h-[400px] w-full rounded-3xl" />
            </div>
        </div>
    )
}
