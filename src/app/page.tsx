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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden font-sans selection:bg-primary/10">
      {/* Dynamic Glassmorphic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
            animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl w-full mx-6 relative z-10 text-center space-y-16"
      >
        {/* Premium Logo Section */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-8"
        >
            <div className="w-28 h-28 bg-deep-navy rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl shadow-deep-navy/20 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <GraduationCap className="w-14 h-14 text-white relative z-10" />
                </motion.div>
            </div>
            <div className="space-y-3">
                <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-deep-navy uppercase">TAJ SCHOOLS</h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-primary/20" />
                    <p className="text-primary text-xs font-black uppercase tracking-[0.5em]">International Excellence</p>
                    <div className="h-px w-12 bg-primary/20" />
                </div>
            </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
            {/* Arabic Card - Glassmorphism */}
            <motion.button
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect('ar')}
                disabled={isLoading}
                className="relative group bg-white/40 backdrop-blur-2xl border border-white/40 rounded-[3rem] p-12 flex flex-col items-center justify-center gap-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-20 h-20 bg-white/60 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-500 shadow-inner">
                    <span className="text-3xl font-black text-deep-navy group-hover:text-white transition-colors duration-500 font-cairo">ع</span>
                </div>
                <div className="space-y-3">
                    <h2 className="text-4xl font-black text-deep-navy font-cairo">العربية</h2>
                    <div className="px-4 py-1.5 bg-deep-navy/5 rounded-full group-hover:bg-primary/10 transition-colors">
                        <p className="text-gray-500 group-hover:text-primary text-[10px] font-black uppercase tracking-widest font-cairo">دخول البوابة</p>
                    </div>
                </div>
            </motion.button>

            {/* English Card - Glassmorphism */}
            <motion.button
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect('en')}
                disabled={isLoading}
                className="relative group bg-white/40 backdrop-blur-2xl border border-white/40 rounded-[3rem] p-12 flex flex-col items-center justify-center gap-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-20 h-20 bg-white/60 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-500 shadow-inner">
                    <span className="text-2xl font-black text-deep-navy group-hover:text-white transition-colors duration-500">EN</span>
                </div>
                <div className="space-y-3">
                    <h2 className="text-4xl font-black text-deep-navy tracking-tight">English</h2>
                    <div className="px-4 py-1.5 bg-deep-navy/5 rounded-full group-hover:bg-primary/10 transition-colors">
                        <p className="text-gray-500 group-hover:text-primary text-[10px] font-black uppercase tracking-widest">Enter Portal</p>
                    </div>
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
