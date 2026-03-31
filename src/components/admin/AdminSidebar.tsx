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
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("AdminSidebar");
  const common = useTranslations("Common");
  const admin = useTranslations("Admin");
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const menuItems = [
    { title: t("stats"), href: `/${locale}/admin`, icon: LayoutDashboard },
    { title: t("admissions"), href: `/${locale}/admin/admissions`, icon: FileText },
    { title: t("messages"), href: `/${locale}/admin/messages`, icon: MessageSquare },
    { title: t("news"), href: `/${locale}/admin/news`, icon: Newspaper },
    { title: t("gallery"), href: `/${locale}/admin/gallery`, icon: ImageIcon },
    { title: t("sliders"), href: `/${locale}/admin/sliders`, icon: LayoutGrid },
    { title: t("testimonials"), href: `/${locale}/admin/testimonials`, icon: Star },
    { title: t("faq"), href: `/${locale}/admin/faq`, icon: HelpCircle },
    { title: t("staff"), href: `/${locale}/admin/staff`, icon: Users },
    { title: t("calendar"), href: `/${locale}/admin/calendar`, icon: Calendar },
    { title: t("downloads"), href: `/${locale}/admin/downloads`, icon: Download },
    { title: t("backup"), href: `/${locale}/admin/unified-backup`, icon: Database },
    { title: t("security"), href: `/${locale}/admin/security-logs`, icon: ShieldAlert },
    { title: t("careers"), href: `/${locale}/admin/careers`, icon: Briefcase },
    { title: t("settings"), href: `/${locale}/admin/settings`, icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      {!isOpen && (
        <div className={cn("lg:hidden fixed top-4 z-[60]", isRtl ? "left-4" : "right-4")}>
           <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="rounded-xl shadow-md bg-white/80 backdrop-blur-md border-gray-100 h-12 w-12">
              <Menu className="h-6 w-6 text-deep-navy" />
           </Button>
        </div>
      )}

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
          "fixed top-0 z-[100] h-screen w-80 bg-white/80 backdrop-blur-2xl border-white/20 transition-transform duration-500 ease-in-out lg:translate-x-0 lg:static lg:block shadow-3xl lg:shadow-none",
          isRtl ? "right-0 border-l" : "left-0 border-r",
          isOpen ? "translate-x-0" : (isRtl ? "translate-x-full" : "-translate-x-full")
        )}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="flex flex-col h-full relative">
          {/* Close button for mobile inside sidebar */}
          <div className="lg:hidden absolute top-6 rtl:left-6 ltr:right-6 z-20">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-xl bg-gray-50 border border-gray-100">
               <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Logo Section */}
          <div className="p-8 border-b border-gray-100/50 bg-white/40 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-deep-navy rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/30">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div className="pr-10 rtl:pr-0 rtl:pl-10 lg:pr-0 lg:pl-0">
                <h1 className="text-xl font-black text-deep-navy leading-none">{t("adminPanel")}</h1>
                <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Taj Al-Nozha</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                      isActive
                        ? "bg-primary text-white shadow-xl shadow-primary/25 font-black scale-[1.02]"
                        : "text-gray-500 hover:bg-primary/5 hover:text-primary"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                    <span className="text-sm tracking-tight">{item.title}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className={cn("absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]", isRtl ? "left-3" : "right-3")}
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
              href={`/${locale}`}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-white hover:text-primary transition-all shadow-sm border border-transparent hover:border-gray-100"
            >
              <Globe className="w-4 h-4" />
              <span>{admin("visitSite")}</span>
              {isRtl ? (
                <ChevronLeft className="w-3 h-3 mr-auto opacity-40" />
              ) : (
                <ChevronRight className="w-3 h-3 ml-auto opacity-40" />
              )}
            </Link>
            
            <button
              onClick={() => signOut({ callbackUrl: `/${locale}` })}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>{common("logout")}</span>
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
