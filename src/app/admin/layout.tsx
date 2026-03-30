import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden" dir="rtl">
      {/* Sidebar - fixed on large screens */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <AdminSidebar />
      </div>
      
      {/* Sidebar for mobile is handled inside the component with absolute positioning */}
      <div className="block lg:hidden">
        <AdminSidebar />
      </div>

      <main className="flex-1 h-full overflow-y-auto p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
