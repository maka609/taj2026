"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Newspaper,
  Image as ImageIcon,
  LayoutGrid,
  Star,
  HelpCircle,
  Users,
  Calendar,
  Download,
  Database,
  ShieldAlert,
  Briefcase,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "الإحصائيات", href: "/admin", icon: LayoutDashboard },
  { title: "طلبات القبول", href: "/admin/admissions", icon: FileText },
  { title: "الرسائل", href: "/admin/messages", icon: MessageSquare },
  { title: "الأخبار", href: "/admin/news", icon: Newspaper },
  { title: "مكتبة الصور", href: "/admin/gallery", icon: ImageIcon },
  { title: "صور الصفحة الرئيسية", href: "/admin/sliders", icon: LayoutGrid },
  { title: "آراء أولياء الأمور", href: "/admin/testimonials", icon: Star },
  { title: "الأسئلة الشائعة", href: "/admin/faq", icon: HelpCircle },
  { title: "الكادر التعليمي", href: "/admin/staff", icon: Users },
  { title: "التقويم والأحداث", href: "/admin/calendar", icon: Calendar },
  { title: "الملفات والتحميلات", href: "/admin/downloads", icon: Download },
  { title: "النسخ الاحتياطي", href: "/admin/unified-backup", icon: Database },
  { title: "المراقبة الأمنية", href: "/admin/security-logs", icon: ShieldAlert },
  { title: "التوظيف والوظائف", href: "/admin/careers", icon: Briefcase },
  { title: "إعدادات الموقع", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
         <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="rounded-xl shadow-md bg-white">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
         </Button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-screen w-72 bg-white border-l border-gray-100 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block shadow-2xl lg:shadow-none",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        dir="rtl"
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-50 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-deep-navy rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-deep-navy leading-tight">لوحة الإدارة</h1>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Taj El-Nozha School</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20 font-semibold"
                        : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-transform duration-200 group-hover:scale-110", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                    <span className="text-sm">{item.title}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute left-2 w-1.5 h-1.5 bg-white rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 bg-gray-50/50 border-t border-gray-100 space-y-2">
             <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-white hover:text-primary transition-all shadow-sm border border-transparent hover:border-gray-100"
            >
              <Globe className="w-4 h-4" />
              <span>زيارة الموقع</span>
              <ChevronLeft className="w-3 h-3 mr-auto opacity-40" />
            </Link>
            
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e5e7eb;
        }
      `}</style>
    </>
  );
}
