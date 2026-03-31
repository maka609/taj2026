"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  BookOpen,
  FileCheck,
  History,
  MessageSquare,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Send,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

const features = [
  { id: 1, titleAr: "تلخيص الفيديو", titleEn: "Video Summary", descAr: "ملخص سريع لأهم الأفكار التي ذكرت في الفيديو", descEn: "A quick summary of the main ideas mentioned in the video.", icon: FileCheck, color: "text-blue-500", bgColor: "bg-blue-50" },
  { id: 2, titleAr: "إعادة شرح المحتوى", titleEn: "Re-explanation", descAr: "لو في جزء مش واضح هيشرحهولك بأسلوب أسهل", descEn: "If a part is unclear, he will explain it in a simpler way.", icon: BookOpen, color: "text-purple-500", bgColor: "bg-purple-50" },
  { id: 3, titleAr: "Flash cards", titleEn: "Flash cards", descAr: "كروت صغيرة فيها أهم النقاط في الدرس", descEn: "Small cards containing the most important points in the lesson.", icon: History, color: "text-rose-500", bgColor: "bg-rose-50" },
  { id: 4, titleAr: "اختبار على الدرس", titleEn: "Quiz on Lesson", descAr: "هعملك اختبار من محتوى الفيديو عشان نتأكد إنك فاهم", descEn: "I will make a quiz from the video content to make sure you understand.", icon: MessageSquare, color: "text-orange-500", bgColor: "bg-orange-50" },
];

export default function AIAssistantModal({ isOpen, onClose, locale }: AIAssistantModalProps) {
  const isRtl = locale === "ar";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir={isRtl ? "rtl" : "ltr"}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-3xl overflow-hidden border border-white/20"
          >
            {/* Header / Top Decorations */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-vibrant-orange to-mint-green" />

            <button
              onClick={onClose}
              aria-label={isRtl ? "إغلاق" : "Close"}
              className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 sm:p-16 space-y-12">
              {/* Profile / Intro Section */}
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center shadow-inner overflow-hidden border border-gray-100">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                            <Sparkles className="w-10 h-10" />
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-vibrant-orange text-white p-2 rounded-xl shadow-lg border-2 border-white">
                        <Star className="w-4 h-4 fill-white" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl sm:text-5xl font-black text-deep-navy tracking-tight">
                        {isRtl ? "مساعدك الذكي للمذاكرة" : "Your Smart Study Assistant"}
                    </h2>
                    <p className="text-lg text-gray-500 font-bold max-w-xl mx-auto">
                        {isRtl ? "اختار تحب أساعدك إزاي في الفيديو ده؟" : "Choose how you would like me to help you in this video?"}
                    </p>
                </div>
              </div>

              {/* Action Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feat) => (
                    <motion.div
                        key={feat.id}
                        whileHover={{ y: -10 }}
                        className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 hover:border-primary/20 transition-all duration-300 group cursor-pointer"
                    >
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300", feat.bgColor, feat.color)}>
                            <feat.icon className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-black text-deep-navy mb-3 group-hover:text-primary transition-colors">
                            {isRtl ? feat.titleAr : feat.titleEn}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            {isRtl ? feat.descAr : feat.descEn}
                        </p>
                    </motion.div>
                ))}
              </div>

              {/* Chat Input Area */}
              <div className="relative pt-10 border-t border-gray-50 group">
                <div className="relative">
                    <Input
                        placeholder={isRtl ? "مش فاهم حاجة؟ اسألني..." : "Don't understand something? Ask me..."}
                        className={cn("h-20 rounded-[2rem] bg-gray-50 border-gray-100 font-bold px-10 text-lg shadow-inner focus:bg-white transition-all", isRtl ? "pr-10" : "pl-10")}
                    />
                    <div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center gap-3", isRtl ? "left-5" : "right-5")}>
                        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-gray-400 hover:text-primary">
                             <History className="w-5 h-5" />
                        </Button>
                        <Button className="w-14 h-14 rounded-2xl bg-vibrant-orange text-white shadow-xl shadow-vibrant-orange/30 hover:scale-105 active:scale-95 transition-all">
                             <Send className={cn("w-6 h-6", isRtl && "rotate-180")} />
                        </Button>
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
