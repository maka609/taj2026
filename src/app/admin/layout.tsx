import AdminSidebar from "@/components/admin/AdminSidebar";
import { ErrorBoundary } from "@/components/admin/ui/ErrorBoundary";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="flex min-h-screen bg-[#fcfcfd] overflow-hidden selection:bg-primary/10 selection:text-primary" dir={dir}>
      {/* Sidebar - fixed on large screens */}
      <div className="hidden lg:block w-72 flex-shrink-0 border-l border-gray-100 bg-white shadow-xl shadow-gray-200/50">
        <AdminSidebar />
      </div>
      
      {/* Sidebar for mobile is handled inside the component with fixed positioning */}
      <div className="block lg:hidden">
        <AdminSidebar />
      </div>

      <main className="flex-1 h-screen overflow-y-auto px-6 py-8 lg:px-12 lg:py-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
