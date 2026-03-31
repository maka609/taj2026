"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LanguageGateway() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full mx-6 relative z-10 text-center space-y-16"
      >
        {/* Logo Section */}
        <div className="space-y-6">
            <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 5 }}
                transition={{ repeat: Infinity, duration: 4, repeatType: "mirror", ease: "easeInOut" }}
                className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-3xl shadow-primary/30"
            >
                <GraduationCap className="w-12 h-12 text-white" />
            </motion.div>
            <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">TAJ SCHOOLS</h1>
                <p className="text-primary text-sm font-black uppercase tracking-[0.3em]">Education First</p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Arabic Option */}
            <motion.div
                whileHover={{ y: -10 }}
                className="relative group"
            >
                <Link href="/ar">
                    <div className="h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 flex flex-col items-center justify-center gap-6 group-hover:bg-white group-hover:border-primary transition-all duration-500 shadow-2xl overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <span className="text-2xl font-black text-white group-hover:text-primary transition-colors">ع</span>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-white group-hover:text-deep-navy transition-colors">العربية</h2>
                            <p className="text-gray-400 text-xs font-bold group-hover:text-gray-500 transition-colors">ادخل إلى النسخة العربية</p>
                        </div>
                        <ArrowLeft className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </div>
                </Link>
            </motion.div>

            {/* English Option */}
            <motion.div
                whileHover={{ y: -10 }}
                className="relative group"
            >
                <Link href="/en">
                    <div className="h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 flex flex-col items-center justify-center gap-6 group-hover:bg-white group-hover:border-primary transition-all duration-500 shadow-2xl overflow-hidden">
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <span className="text-2xl font-black text-white group-hover:text-primary transition-colors">EN</span>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-white group-hover:text-deep-navy transition-colors">English</h2>
                            <p className="text-gray-400 text-xs font-bold group-hover:text-gray-500 transition-colors">Enter the English version</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                    </div>
                </Link>
            </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-12"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                <Globe className="w-3 h-3 text-primary" />
                Select Language to continue
            </div>
            <p className="text-gray-600 text-[10px] font-bold mt-8 uppercase tracking-widest italic">
                &copy; {new Date().getFullYear()} Taj Al-Nozha Schools. All rights reserved.
            </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
