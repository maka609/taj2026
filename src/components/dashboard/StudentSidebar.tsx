"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  LayoutDashboard,
  BookOpen,
  PenTool,
  Calendar,
  Wallet,
  Users,
  History,
  Heart,
  QrCode,
  MapPin,
  User,
  LogOut,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { titleAr: "نظرة عامة", titleEn: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { titleAr: "دوراتي", titleEn: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { titleAr: "الاختبارات", titleEn: "Quizzes", href: "/dashboard/quizzes", icon: PenTool },
  { titleAr: "جدول الحصص", titleEn: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { titleAr: "محفظتي", titleEn: "My Wallet", href: "/dashboard/wallet", icon: Wallet },
  { titleAr: "اشتراكاتي", titleEn: "My Subscriptions", href: "/dashboard/subscriptions", icon: Users },
  { titleAr: "تقرير المشتريات", titleEn: "Order History", href: "/dashboard/orders", icon: History },
  { titleAr: "إنضم للتدريس معنا", titleEn: "Teach With Us", href: "/dashboard/teach", icon: Users },
  { titleAr: "المفضلة", titleEn: "Favorites", href: "/dashboard/favorites", icon: Heart },
  { titleAr: "الباركود و qr code", titleEn: "Barcode & QR Code", href: "/dashboard/qr", icon: QrCode },
  { titleAr: "كتبي", titleEn: "My Books", href: "/dashboard/books", icon: BookOpen },
  { titleAr: "عناوين", titleEn: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { titleAr: "حسابي", titleEn: "My Account", href: "/dashboard/account", icon: User },
];

export default function StudentSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <aside className="h-full flex flex-col bg-card border-l border-border/50 shadow-sm" dir={isRtl ? "rtl" : "ltr"}>
      {/* Sidebar Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-black text-deep-navy tracking-tight uppercase">VOLASSES</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const fullHref = `/${locale}${item.href}`;
          const isActive = pathname === fullHref || (item.href === "/dashboard" && pathname === `/${locale}/dashboard`);

          return (
            <Link
              key={item.href}
              href={fullHref}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                isActive
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600")} />
              <span className="text-sm">{isRtl ? item.titleAr : item.titleEn}</span>

              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className={cn("absolute w-1.5 h-6 bg-primary rounded-full", isRtl ? "-right-1" : "-left-1")}
                />
              )}

              {item.titleAr === "محفظتي" && (
                <span className="mr-auto text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-black">
                  350 EGP
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-6 border-t border-border/50">
        <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-bold btn-interactive">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">{isRtl ? "تسجيل خروج" : "Logout"}</span>
        </button>
      </div>

      <style jsx>{`
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
    </aside>
  );
}
