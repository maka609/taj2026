"use client";

import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Download, FileText, FileArchive, Search, LayoutGrid, Sparkles, MessageCircle } from "lucide-react";
import { getDocuments } from "@/actions/downloads";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/skeletons";

export default function DownloadsPage() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      const { data } = await getDocuments();
      setDocuments(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleDownload = (file: any) => {
    if (file.fileUrl) {
      window.open(file.fileUrl, '_blank');
    }
  };

  const filteredDocs = documents.filter(doc =>
    (locale === "ar" ? doc.titleAr : doc.titleEn).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-[#fcfcfd]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl space-y-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
            >
                <Sparkles className="w-3 h-3" /> {isRtl ? "مركز الموارد الرقمية" : "Digital Resource Center"}
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-7xl font-black text-deep-navy tracking-tight"
            >
                {t("downloads")}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 font-medium leading-relaxed"
            >
                {locale === 'ar'
                    ? 'بإمكان أولياء الأمور والطلاب الوصول لكافة الملفات التعليمية والجداول والمستندات الرسمية وتحميلها بسهولة.'
                    : 'Parents and students can easily access and download all educational files, schedules, and official documents.'}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group w-full lg:w-96"
          >
            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-primary", isRtl ? "right-5" : "left-5")} />
            <Input
                type="text" 
                placeholder={isRtl ? 'ابحث عن ملف...' : 'Search for a file...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn("h-16 rounded-2xl bg-white border-gray-100 focus:bg-white focus:border-primary shadow-xl shadow-gray-200/40 font-bold", isRtl ? "pr-14" : "pl-14")}
            />
          </motion.div>
        </div>

        {loading ? (
            <TableSkeleton />
        ) : filteredDocs.length === 0 ? (
            <div className="text-center py-32 space-y-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                    <Download className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-gray-400 font-bold text-xl">{isRtl ? "لا توجد ملفات حالياً" : "No files available currently"}</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredDocs.map((file) => (
                    <motion.div
                        layout
                        key={file.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-700 rounded-[3rem] bg-white overflow-hidden group">
                            <CardContent className="p-8 sm:p-10 flex items-center justify-between gap-6">
                                <div className="flex items-center gap-6 min-w-0">
                                    <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2 min-w-0">
                                        <h3 className="text-xl font-black text-deep-navy truncate group-hover:text-primary transition-colors">
                                        {locale === 'ar' ? file.titleAr : file.titleEn}
                                        </h3>
                                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            <span className="bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">{file.category}</span>
                                            <span className="flex items-center gap-1.5">
                                                <FileArchive className="w-3.5 h-3.5 text-primary" />
                                                {file.fileSize ? `${(file.fileSize / 1024 / 1024).toFixed(1)} MB` : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => handleDownload(file)}
                                    size="icon"
                                    className="h-16 w-16 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-[1.5rem] transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20 shrink-0"
                                >
                                    <Download className="w-7 h-7" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        )}

        {/* Support CTA */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-12 lg:p-20 bg-deep-navy rounded-[4rem] text-center text-white shadow-3xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
                <h3 className="text-3xl lg:text-5xl font-black tracking-tight">{isRtl ? "هل تبحث عن ملف آخر؟" : "Looking for another file?"}</h3>
                <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
                    {isRtl ? "إذا كنت بحاجة إلى أي مستند أو جدول غير متوفر في المركز الرقمي، يرجى التواصل معنا." : "If you need any document or schedule not available in the digital center, please contact us."}
                </p>
            </div>
            <Button
                onClick={() => window.location.href = `/${locale}/contact`}
                className="h-16 px-12 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 bg-primary"
            >
                {isRtl ? "تواصل مع الإدارة 📧" : "Contact Administration 📧"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
