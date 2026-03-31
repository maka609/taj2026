"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GraduationCap, Globe, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Framer Motion Variants ---

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const logoVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const nameVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const gatewayVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

import { Geist, Geist_Mono, Cairo } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export default function LanguageGateway() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already seen the splash animation
    const hasSeenSplash = localStorage.getItem("taj_splash_seen");

    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      // Sequence timing:
      // 0s-1s: Logo reveal
      // 0.6s-1.6s: Name reveal
      // 1.6s-3.5s: Static visibility
      // 3.5s-4.0s: Transition out
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("taj_splash_seen", "true");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleLanguageSelect = (locale: string) => {
    setIsLoading(true);
    setSelectedLocale(locale);

    // Set cookie for next-intl
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax; Secure`;

    // Redirect to the locale version
    router.push(`/${locale}`);
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} min-h-screen bg-white bg-gradient-to-b from-white via-white to-blue-50/40 flex items-center justify-center relative overflow-hidden font-sans selection:bg-primary/10 w-full`}>
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"
        />
      </div>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-20 text-center space-y-12"
          >
            {/* Logo Sequence */}
            <motion.div variants={logoVariants} className="relative inline-block">
              <div className="w-36 h-36 bg-deep-navy rounded-[3rem] flex items-center justify-center mx-auto shadow-4xl shadow-deep-navy/30 relative overflow-hidden">
                {/* Micro-animation: Shimmer */}
                <motion.div
                  animate={{
                    x: [-200, 200],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12"
                />
                <GraduationCap className="w-20 h-20 text-white relative z-10" />
              </div>

              {/* Premium Glow Effect */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-10 bg-primary/20 blur-[80px] rounded-full -z-10"
              />
            </motion.div>

            {/* School Name Sequence */}
            <motion.div variants={nameVariants} className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-deep-navy uppercase">
                  TAJ SCHOOLS
                </h1>
                <h2 className="text-4xl font-bold text-primary font-cairo">مدارس تاج النزهة</h2>
              </div>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.2 }}
                className="flex items-center justify-center gap-6 max-w-md mx-auto"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
                <p className="text-primary text-sm font-black uppercase tracking-[0.6em] whitespace-nowrap">
                  International Excellence
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="gateway"
            variants={gatewayVariants}
            initial="initial"
            animate="animate"
            className="max-w-4xl w-full mx-6 relative z-10 text-center space-y-16"
          >
            {/* Minimal Logo for Selection Screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-deep-navy rounded-[1.8rem] flex items-center justify-center mx-auto shadow-2xl shadow-deep-navy/10">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-deep-navy uppercase">
                TAJ SCHOOLS
              </h1>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
              {/* Arabic Language Card */}
              <motion.button
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect("ar")}
                disabled={isLoading}
                className="relative group bg-white/40 backdrop-blur-2xl border border-white/40 rounded-[3rem] p-12 flex flex-col items-center justify-center gap-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-20 h-20 bg-white/60 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-500 shadow-inner">
                  <span className="text-3xl font-black text-deep-navy group-hover:text-white transition-colors duration-500 font-cairo">
                    ع
                  </span>
                </div>
                <div className="space-y-3">
                  <h2 className="text-4xl font-black text-deep-navy font-cairo">العربية</h2>
                  <div className="px-4 py-1.5 bg-deep-navy/5 rounded-full group-hover:bg-primary/10 transition-colors">
                    <p className="text-gray-500 group-hover:text-primary text-[10px] font-black uppercase tracking-widest font-cairo">
                      دخول البوابة
                    </p>
                  </div>
                </div>
              </motion.button>

              {/* English Language Card */}
              <motion.button
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect("en")}
                disabled={isLoading}
                className="relative group bg-white/40 backdrop-blur-2xl border border-white/40 rounded-[3rem] p-12 flex flex-col items-center justify-center gap-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-20 h-20 bg-white/60 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-500 shadow-inner">
                  <span className="text-2xl font-black text-deep-navy group-hover:text-white transition-colors duration-500">
                    EN
                  </span>
                </div>
                <div className="space-y-3">
                  <h2 className="text-4xl font-black text-deep-navy tracking-tight">English</h2>
                  <div className="px-4 py-1.5 bg-deep-navy/5 rounded-full group-hover:bg-primary/10 transition-colors">
                    <p className="text-gray-500 group-hover:text-primary text-[10px] font-black uppercase tracking-widest">
                      Enter Portal
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Footer / Status Area */}
            <div className="pt-8 h-20 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      Redirecting to {selectedLocale === "ar" ? "Arabic" : "English"}...
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
        )}
      </AnimatePresence>
    </div>
  );
}
