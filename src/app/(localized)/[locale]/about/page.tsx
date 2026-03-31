"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Target, Eye, History, ShieldCheck, Award, Users, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const t = useTranslations("Navigation");
  const common = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="pt-40 pb-24 px-6 overflow-hidden" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
            >
                {isRtl ? "نحن هنا من أجلهم" : "We are here for them"}
            </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-deep-navy mb-8 leading-tight"
          >
            {t("about")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-medium leading-relaxed"
          >
            {isRtl
              ? "مدارس تاج النزهة اللغوية ليست مجرد مؤسسة تعليمية، بل هي رحلة متكاملة لبناء العقول وتشكيل وجدان قادة المستقبل في بيئة عصرية وملهمة."
              : "Taj Al-Nozha Language Schools is not just an educational institution, but a complete journey to build minds and shape the future leaders in a modern and inspiring environment."}
          </motion.p>
        </div>

        {/* History and Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-40">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={item}>
                <Card className="border-none shadow-sm bg-blue-50/50 hover:shadow-xl transition-all duration-500 rounded-[2rem] overflow-hidden group">
                    <CardContent className="p-10 flex gap-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                            <History className="w-8 h-8" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black text-deep-navy">{isRtl ? "قصة النجاح" : "Success Story"}</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">
                            {isRtl
                              ? "انطلقت رحلتنا برؤية طموحة تهدف إلى إحداث نقلة نوعية في التعليم. اليوم، نفخر بكوننا صرحاً تعليمياً يجمع بين خبرة السنين وأحدث ما توصلت إليه التكنولوجيا الرقمية."
                              : "Our journey began with an ambitious vision aimed at making a qualitative leap in education. Today, we are proud to be an educational monument that combines years of experience with the latest digital technology."}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Card className="border-none shadow-sm bg-emerald-50/50 hover:shadow-xl transition-all duration-500 rounded-[2rem] overflow-hidden group">
                    <CardContent className="p-10 flex gap-6">
                        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black text-deep-navy">{isRtl ? "التزامنا الأخلاقي" : "Our Ethical Commitment"}</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                {isRtl
                                  ? "التربية قبل التعليم هي شعارنا. نغرس في طلابنا قيم الصدق، الأمانة، والاعتزاز بالهوية، ليكونوا سفراء خير لوطنهم ومجتمعهم."
                                  : "Raising before education is our motto. We instill in our students values of honesty, integrity, and pride in identity, to be ambassadors of good for their country and society."}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3.5rem] bg-gradient-to-br from-primary/10 to-blue-900/5 overflow-hidden relative border border-gray-100 shadow-2xl">
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                     <GraduationCap className="w-64 h-64 text-primary" />
                 </div>
                 {/* Floating Badges */}
                 <div className="absolute top-12 -right-6 bg-white p-5 rounded-2xl shadow-2xl border border-gray-50 animate-bounce" style={{ animationDuration: '3s' }}>
                    <Award className="w-8 h-8 text-amber-500" />
                 </div>
                 <div className="absolute bottom-12 -left-6 bg-white p-5 rounded-2xl shadow-2xl border border-gray-50 animate-bounce" style={{ animationDuration: '4s' }}>
                    <Users className="w-8 h-8 text-primary" />
                 </div>
            </div>
          </motion.div>
        </div>

        {/* Vision and Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-none shadow-sm bg-white hover:shadow-3xl transition-all duration-700 rounded-[3rem] p-12 text-center h-full group">
                <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 mx-auto mb-8 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-500">
                <Eye className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black text-deep-navy mb-6">{isRtl ? "رؤيتنا" : "Our Vision"}</h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                {isRtl
                  ? "أن نكون النموذج الرائد عالمياً في التعليم المدمج الذي يجمع بين القيم الإنسانية النبيلة والمهارات التقنية المتقدمة، لنخرج جيلاً مبدعاً ومنافساً."
                  : "To be the globally leading model in blended education that combines noble human values with advanced technical skills, to produce a creative and competitive generation."}
                </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-none shadow-sm bg-white hover:shadow-3xl transition-all duration-700 rounded-[3rem] p-12 text-center h-full group">
                <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center text-violet-600 mx-auto mb-8 group-hover:scale-110 group-hover:bg-violet-100 transition-all duration-500">
                <Target className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black text-deep-navy mb-6">{isRtl ? "رسالتنا" : "Our Mission"}</h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                    {isRtl
                      ? "تمكين طلابنا من خلال بيئة تعليمية ذكية ومحفزة، تعتمد على البحث والتفكير الناقد، لبناء شخصيات متوازنة جسدياً وفكرياً واجتماعياً."
                      : "Empowering our students through a smart and stimulating educational environment, based on research and critical thinking, to build physically, intellectually, and socially balanced personalities."}
                </p>
            </Card>
          </motion.div>
        </div>

        {/* Core Pillars */}
        <section className="mb-20">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">{isRtl ? "ركائزنا" : "Our Pillars"}</h2>
                <h3 className="text-4xl font-black text-deep-navy">{isRtl ? "ما الذي يميز" : "What Distinguishes"} <span className="text-primary">{isRtl ? "تاج النزهة؟" : "Taj Al-Nozha?"}</span></h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: isRtl ? "تميز أكاديمي" : "Academic Excellence", icon: BookOpen, color: "bg-blue-500" },
                    { title: isRtl ? "بيئة آمنة" : "Safe Environment", icon: ShieldCheck, color: "bg-emerald-500" },
                    { title: isRtl ? "تكنولوجيا متطورة" : "Advanced Tech", icon: Target, color: "bg-violet-500" },
                    { title: isRtl ? "رعاية مواهب" : "Talent Care", icon: Award, color: "bg-amber-500" }
                ].map((pillar, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[2rem] bg-white border border-gray-50 shadow-sm hover:shadow-xl transition-all text-center group"
                    >
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg transition-transform duration-500 group-hover:rotate-12", pillar.color)}>
                            <pillar.icon className="w-7 h-7" />
                        </div>
                        <h4 className="font-black text-deep-navy">{pillar.title}</h4>
                    </motion.div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
