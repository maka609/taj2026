import AdminSidebar from "@/components/admin/AdminSidebar";
import { ErrorBoundary } from "@/components/admin/ui/ErrorBoundary";
import { SecurityProvider } from "@/components/common/SecurityProvider";
import { adminAuthCheck } from "@/lib/auth-check";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await adminAuthCheck();
  return (
    <SecurityProvider>
    <div className="flex min-h-screen bg-[#fcfcfd] overflow-hidden selection:bg-primary/10 selection:text-primary" dir="rtl">
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
    </SecurityProvider>
  );
}
