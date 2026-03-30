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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    title: "الإحصائيات",
    href: "/admin",
    icon: LayoutDashboard,
    emoji: "📊",
  },
  {
    title: "طلبات القبول",
    href: "/admin/admissions",
    icon: FileText,
    emoji: "📝",
  },
  {
    title: "الرسائل",
    href: "/admin/messages",
    icon: MessageSquare,
    emoji: "💬",
  },
  {
    title: "الأخبار",
    href: "/admin/news",
    icon: Newspaper,
    emoji: "📰",
  },
  {
    title: "مكتبة الصور",
    href: "/admin/gallery",
    icon: ImageIcon,
    emoji: "🖼️",
  },
  {
    title: "صور الصفحة الرئيسية",
    href: "/admin/sliders",
    icon: LayoutGrid,
    emoji: "🎬",
  },
  {
    title: "آراء أولياء الأمور",
    href: "/admin/testimonials",
    icon: Star,
    emoji: "⭐",
  },
  {
    title: "الأسئلة الشائعة",
    href: "/admin/faq",
    icon: HelpCircle,
    emoji: "❓",
  },
  {
    title: "الكادر التعليمي",
    href: "/admin/staff",
    icon: Users,
    emoji: "👨‍🏫",
  },
  {
    title: "التقويم والأحداث",
    href: "/admin/calendar",
    icon: Calendar,
    emoji: "📅",
  },
  {
    title: "الملفات والتحميلات",
    href: "/admin/downloads",
    icon: Download,
    emoji: "📥",
  },
  {
    title: "النسخ الاحتياطي",
    href: "/admin/unified-backup",
    icon: Database,
    emoji: "💾",
  },
  {
    title: "المراقبة الأمنية",
    href: "/admin/security-logs",
    icon: ShieldAlert,
    emoji: "🔒",
  },
  {
    title: "التوظيف والوظائف",
    href: "/admin/careers",
    icon: Briefcase,
    emoji: "💼",
  },
  {
    title: "إعدادات الموقع",
    href: "/admin/settings",
    icon: Settings,
    emoji: "⚙️",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 p-3 bg-primary text-white rounded-xl lg:hidden shadow-lg hover:bg-primary/90 transition"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-40 h-screen w-80 bg-white border-l border-gray-100 transition-transform lg:translate-x-0 shadow-xl overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        dir="rtl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-8 bg-gradient-to-br from-primary to-blue-600">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
                <p className="text-xs text-white/80 mt-0.5">مدارس تاج النزهة</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="flex-1 truncate">{item.title}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-white hover:text-blue-600 transition-all group shadow-sm"
            >
              <Globe className="w-5 h-5" />
              <span>العودة للموقع</span>
            </Link>
            
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all group"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
