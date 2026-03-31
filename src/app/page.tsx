"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Globe, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LanguageGateway() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<string | null>(null);

  const handleLanguageSelect = (locale: string) => {
    setIsLoading(true);
    setSelectedLocale(locale);

    // Set cookie for next-intl
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

    // Redirect to the locale version
    router.push(`/${locale}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden font-sans selection:bg-primary/10">
      {/* Ultra-Modern Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />
        {/* Subtle Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full mx-6 relative z-10 text-center space-y-16"
      >
        {/* Logo Section with Fade-in & Scale */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="space-y-6"
        >
            <div className="w-24 h-24 bg-deep-navy rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-deep-navy/10 relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <GraduationCap className="w-12 h-12 text-white relative z-10" />
            </div>
            <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-deep-navy uppercase">TAJ SCHOOLS</h1>
                <p className="text-primary text-xs font-bold uppercase tracking-[0.4em]">International Education</p>
            </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Arabic Card */}
            <motion.button
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect('ar')}
                disabled={isLoading}
                className="relative group bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                    <span className="text-2xl font-black text-deep-navy group-hover:text-primary transition-colors duration-500 font-cairo">ع</span>
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-deep-navy font-cairo">العربية</h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest font-cairo">ادخل إلى الموقع</p>
                </div>
            </motion.button>

            {/* English Card */}
            <motion.button
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect('en')}
                disabled={isLoading}
                className="relative group bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                    <span className="text-xl font-black text-deep-navy group-hover:text-primary transition-colors duration-500">EN</span>
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-deep-navy tracking-tight">English</h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Enter the website</p>
                </div>
            </motion.button>
        </div>

        {/* Footer & Loading State */}
        <div className="pt-8 h-20 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            Redirecting to {selectedLocale === 'ar' ? 'Arabic' : 'English'}...
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="footer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <Globe className="w-3 h-3 text-primary" />
                            Select Language to continue
                        </div>
                        <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">
                            &copy; {new Date().getFullYear()} Taj Al-Nozha Schools
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
