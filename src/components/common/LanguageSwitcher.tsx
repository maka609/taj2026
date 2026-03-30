"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    
    // Replace the locale in the pathname
    const segments = pathname.split("/");
    // If the first segment is an existing locale, replace it
    if (segments[1] === "ar" || segments[1] === "en") {
      segments[1] = newLocale;
    } else {
      // If not, prepend the new locale (if using a specific strategy)
      segments.splice(1, 0, newLocale);
    }
    
    const newPathname = segments.join("/") || "/";
    router.push(newPathname);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all font-medium text-sm shadow-sm",
        className
      )}
    >
      <Globe className="w-4 h-4 text-primary" />
      <span className="uppercase">{locale === "ar" ? "EN" : "AR"}</span>
      <span className="text-gray-300">|</span>
      <span>{locale === "ar" ? "English" : "العربية"}</span>
    </button>
  );
}
