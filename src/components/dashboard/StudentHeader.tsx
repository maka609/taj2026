"use client";

import React from "react";
import { Search, Bell, Globe, ChevronDown, User, Moon, Sun } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";

export default function StudentHeader() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-border/50 sticky top-0 z-40 px-6 md:px-10 flex items-center justify-between" dir={isRtl ? "rtl" : "ltr"}>
      {/* Search Bar */}
      <div className="flex-1 max-w-lg relative group">
        <Search className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors", isRtl ? "right-4" : "left-4")} />
        <Input
          type="search"
          placeholder={isRtl ? "البحث عن أي شئ..." : "Search for anything..."}
          className={cn("h-12 rounded-2xl bg-gray-50/50 border-gray-100 font-bold focus:bg-white transition-all pl-12 pr-12", isRtl ? "pr-12" : "pl-12")}
        />
        <div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center gap-2", isRtl ? "left-3" : "right-3")}>
             <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md text-gray-400 font-black">CTRL + K</span>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <Button variant="ghost" size="icon" className="w-11 h-11 rounded-2xl hover:bg-gray-100 text-gray-500">
          <Globe className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="w-11 h-11 rounded-2xl hover:bg-gray-100 text-gray-500 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-vibrant-orange rounded-full border-2 border-white" />
        </Button>

        {/* Theme Toggler (Dummy) */}
        <Button variant="ghost" size="icon" className="w-11 h-11 rounded-2xl hover:bg-gray-100 text-gray-500">
          <Moon className="w-5 h-5" />
        </Button>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block" />

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors btn-interactive group">
           <div className="flex flex-col items-end hidden sm:flex">
             <span className="text-sm font-black text-deep-navy group-hover:text-primary transition-colors leading-none">admin trail</span>
             <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">admin</span>
           </div>
           <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary shadow-lg shadow-primary/20">
              <Avatar className="w-full h-full">
                <AvatarFallback className="text-white font-black text-sm flex items-center justify-center h-full">A</AvatarFallback>
              </Avatar>
           </div>
           <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
