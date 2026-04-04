import React from "react";
import { useLocale } from "next-intl";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import StudentHeader from "@/components/dashboard/StudentHeader";
import { SecurityProvider } from "@/components/common/SecurityProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <SecurityProvider>
    <div className="flex min-h-screen bg-background relative z-[110]" dir={isRtl ? "rtl" : "ltr"}>
      {/* Student Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0 bg-white border-x border-gray-100 shadow-xl shadow-gray-200/20">
        <StudentSidebar />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Student Header */}
        <StudentHeader />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
    </SecurityProvider>
  );
}
