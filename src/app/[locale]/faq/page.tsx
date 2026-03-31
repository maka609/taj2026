"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { HelpCircle, ChevronDown, Search, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFAQs } from "@/actions/faq";

export default function FAQPage() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadFaqs() {
      const result = await getFAQs();
      if (result.success) {
        setFaqs(result.data || []);
      }
      setLoading(false);
    }
    loadFaqs();
  }, []);

  const filteredFaqs = faqs.filter(f =>
    (isRtl ? f.questionAr : f.questionEn).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-[#fcfcfd]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20 space-y-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
            >
                <Sparkles className="w-3 h-3" /> {isRtl ? "مركز المساعدة" : "Help Center"}
            </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-deep-navy tracking-tight"
          >
            {t("faq")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {isRtl
              ? "كل ما تود معرفته عن إجراءات القبول، المناهج الدراسية، والحياة اليومية في رحاب مدارس تاج النزهة."
              : "Everything you want to know about admission procedures, curricula, and daily life at Taj Al-Nozha Schools."}
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-16 group"
        >
          <Search className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 transition-colors group-focus-within:text-primary", isRtl ? "right-6" : "left-6")} />
          <Input
            type="text" 
            placeholder={isRtl ? "ابحث عن سؤالك هنا..." : "Search for your question here..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn("w-full h-20 rounded-[2rem] bg-white border-gray-100 focus:border-primary focus:ring-primary/10 outline-none transition-all text-xl shadow-2xl shadow-gray-200/40 font-bold", isRtl ? "pr-16" : "pl-16")}
          />
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-[2.5rem]" />)}
            </div>
          ) : (
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                <motion.div
                    layout
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={cn(
                        "bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden transition-all duration-500",
                        isOpen ? "shadow-2xl shadow-gray-200/50 scale-[1.02] border-primary/20" : "hover:shadow-xl"
                    )}
                >
                    <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={cn("w-full px-10 py-8 flex items-center justify-between gap-6 group", isRtl ? "text-right" : "text-left")}
                    >
                    <span className={cn(
                        "text-xl font-black transition-colors duration-300",
                        isOpen ? "text-primary" : "text-deep-navy group-hover:text-primary"
                    )}>
                        {isRtl ? faq.questionAr : faq.questionEn}
                    </span>
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 border-2",
                        isOpen ? "bg-primary border-primary text-white rotate-180 shadow-lg shadow-primary/20" : "bg-gray-50 border-gray-50 text-gray-400 group-hover:border-primary/20 group-hover:text-primary"
                    )}>
                        <ChevronDown className="w-6 h-6" />
                    </div>
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="px-10 pb-10">
                                    <div className="pt-8 border-t border-gray-50">
                                        <p className={cn("text-lg text-gray-500 font-medium leading-relaxed", isRtl ? "text-right" : "text-left")}>
                                            {isRtl ? faq.answerAr : faq.answerEn}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                );
            })}
          </AnimatePresence>
          )}
        </div>

        {/* Support CTA */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-12 lg:p-16 bg-white rounded-[4rem] text-center shadow-3xl border border-gray-50 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 space-y-8">
            <div className="w-20 h-20 bg-blue-50 text-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform duration-500">
                <MessageCircle className="w-10 h-10" />
            </div>
            <div className="space-y-3">
                <h3 className="text-3xl font-black text-deep-navy">{isRtl ? "لم تجد إجابتك؟" : "Didn't find your answer?"}</h3>
                <p className="text-xl text-gray-400 font-medium">{isRtl ? "نحن هنا دائماً لمساعدتك. تواصل مع فريق الدعم الفني أو القبول مباشرة." : "We are always here to help you. Contact technical support or admissions team directly."}</p>
            </div>
            <Button
                onClick={() => window.location.href = `/${locale}/contact`}
                className="h-16 px-12 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30"
            >
                {isRtl ? "تواصل معنا الآن" : "Contact Us Now"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
