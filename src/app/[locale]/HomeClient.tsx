"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Users,
  Trophy,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Quote,
  Calendar,
  CheckCircle2,
  Play,
  Sparkles,
  ShieldCheck,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HomeClientProps {
  locale: string;
  sliders: any[];
  news: any[];
  testimonials: any[];
}

export default function HomeClient({ locale, sliders, news, testimonials }: HomeClientProps) {
  const [currentSlider, setCurrentSlider] = React.useState(0);
  const isRtl = locale === "ar";

  React.useEffect(() => {
    if (sliders.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlider((prev) => (prev + 1) % sliders.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [sliders.length]);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-slate-50/30" dir={isRtl ? "rtl" : "ltr"}>

      {/* 1. Ultra-Modern Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] shadow-sm">
                <Sparkles className="w-4 h-4" />
                {isRtl ? "مستقبل التعليم الرقمي يبدأ هنا" : "The Future of Digital Education Starts Here"}
            </div>

            <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlider}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <h1 className="text-6xl lg:text-8xl font-black text-deep-navy leading-[1] tracking-tight">
                        {(isRtl ? sliders[currentSlider]?.titleAr : sliders[currentSlider]?.titleEn) || (isRtl ? "نصنع قادة" : "Building Leaders")} <br />
                        <span className="text-primary italic">{(isRtl ? sliders[currentSlider]?.descriptionAr : sliders[currentSlider]?.descriptionEn) || (isRtl ? "الغد اليوم." : "Of Tomorrow.")}</span>
                    </h1>
                  </motion.div>
                </AnimatePresence>

                <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                    {isRtl
                      ? "تجربة تعليمية ذكية تجمع بين الإبداع والتكنولوجيا، نؤهل أبناءنا للتميز في عالم متسارع."
                      : "A smart educational experience combining creativity and technology, preparing our students for excellence."}
                </p>
            </div>

            <div className="flex flex-wrap gap-5 pt-4">
                <Link href={`/${locale}/admission`}>
                    <Button className="group h-20 px-12 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95 bg-primary hover:bg-primary/90 btn-interactive">
                        {isRtl ? "سجل الآن مجاناً" : "Join Now for Free"}
                        <ArrowRight className={cn("w-6 h-6 ml-3 transition-transform group-hover:translate-x-1", isRtl && "rotate-180")} />
                    </Button>
                </Link>
                <Link href={`/${locale}/portal/login`}>
                    <Button variant="outline" className="h-20 px-12 rounded-[2rem] font-black text-xl border-gray-200 text-deep-navy hover:bg-gray-50 transition-all btn-interactive">
                        {isRtl ? "دخول الطلاب" : "Student Login"}
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-10 pt-10 border-t border-gray-100">
                <div className="flex -space-x-4 rtl:space-x-reverse">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-14 h-14 rounded-2xl border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg">
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <Users className="w-5 h-5 text-gray-500" />
                            </div>
                        </div>
                    ))}
                    <div className="w-14 h-14 rounded-2xl border-4 border-white bg-vibrant-orange text-white flex items-center justify-center font-black text-sm shadow-xl shadow-vibrant-orange/20">+1.5k</div>
                </div>
                <div className="space-y-1">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    {isRtl ? "أكثر من 1500 طالب متميز" : "More than 1500 elite students"}
                    </p>
                </div>
            </div>
          </motion.div>

          {/* Right Side: Animated Slider Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] rounded-[4rem] bg-white p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100">
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-gray-50">
                    <AnimatePresence mode="wait">
                      {sliders.length > 0 ? (
                        <motion.div
                          key={currentSlider}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 1.2, ease: "circOut" }}
                          className="w-full h-full relative"
                        >
                          <Image
                            src={sliders[currentSlider].imageUrl}
                            alt="Slider"
                            fill
                            className="object-cover"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </motion.div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <GraduationCap className="w-40 h-40 text-primary opacity-10 animate-bounce" />
                        </div>
                      )}
                    </AnimatePresence>
                </div>

                {/* Floating Stats UI */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute top-20 -right-12 bg-white/80 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-white/40 flex items-center gap-5"
                >
                    <div className="w-14 h-14 rounded-2xl bg-mint-green/20 flex items-center justify-center text-mint-green">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-deep-navy">100%</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{isRtl ? "اعتماد دولي" : "Accredited"}</p>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 -left-12 bg-primary p-6 rounded-[2.5rem] shadow-3xl shadow-primary/30 flex items-center gap-5 text-white"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Users className="w-7 h-7" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black">+150</h4>
                        <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">{isRtl ? "معلم خبير" : "Expert Teachers"}</p>
                    </div>
                </motion.div>

                {/* Slider Progress Bar */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {sliders.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlider(i)}
                        className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          currentSlider === i ? "bg-white w-12" : "bg-white/40 w-3 hover:bg-white/60"
                        )}
                      />
                    ))}
                </div>
            </div>

            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-gray-100 rounded-full -z-10 opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-gray-50 rounded-full -z-10 opacity-30" />
          </motion.div>
        </div>
      </section>

      {/* 2. Features Grid - Redesigned */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
                <div className="space-y-6 max-w-2xl">
                    <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em]">{isRtl ? "لماذا تختار منصتنا؟" : "Why Choose Our Platform?"}</h2>
                    <h3 className="text-5xl lg:text-7xl font-black text-deep-navy leading-tight">
                        {isRtl ? "نحن نعيد تعريف" : "We Are Redefining"} <br />
                        <span className="text-vibrant-orange">{isRtl ? "التعليم الذكي" : "Smart Learning"}</span>
                    </h3>
                </div>
                <p className="text-lg text-gray-500 font-medium max-w-xs pb-4">
                    {isRtl ? "نوفر بيئة تفاعلية تهدف إلى تمكين الطالب وتحفيز الإبداع لديه من خلال أحدث الوسائل." : "Providing an interactive environment aimed at empowering students and stimulating creativity."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { title: isRtl ? "فصول ذكية" : "Smart Classes", desc: isRtl ? "تفاعل مباشر مع نخبة من المدرسين المعتمدين." : "Direct interaction with elite certified teachers.", icon: Play, color: "bg-primary/10 text-primary" },
                    { title: isRtl ? "مسارات مخصصة" : "Personalized Paths", desc: isRtl ? "خطة دراسية تعتمد على مستوى الطالب وقدراته." : "Study plans based on student levels and abilities.", icon: BookOpen, color: "bg-vibrant-orange/10 text-vibrant-orange" },
                    { title: isRtl ? "تقارير ذكية" : "Smart Reports", desc: isRtl ? "متابعة دقيقة للأداء ونقاط القوة والضعف." : "Accurate monitoring of performance, strengths and weaknesses.", icon: TrendingUp, color: "bg-mint-green/10 text-mint-green" },
                ].map((feat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -15 }}
                        className="p-12 rounded-[3.5rem] bg-slate-50/50 border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group"
                    >
                        <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm", feat.color)}>
                            <feat.icon className="w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-black text-deep-navy mb-4 group-hover:text-primary transition-colors">{feat.title}</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. CTA Banner - High Impact */}
      <section className="py-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto rounded-[4.5rem] bg-deep-navy p-12 md:p-24 relative overflow-hidden text-center flex flex-col items-center space-y-12"
          >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent)]" />
              <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/grid.svg')]" />

              <h2 className="text-5xl md:text-8xl font-black text-white relative z-10 tracking-tight leading-[1.1]">
                  {isRtl ? "ابدأ رحلة" : "Start Your"} <br /> <span className="text-mint-green">{isRtl ? "النجاح الآن" : "Success Journey"}</span>
              </h2>
              <p className="text-blue-100/60 font-bold max-w-2xl text-xl relative z-10 leading-relaxed">
                  {isRtl ? "انضم لأكثر من 5000 خريج فخور بمدرستنا واستعد لمستقبل باهر." : "Join more than 5000 proud graduates of our school and prepare for a bright future."}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                  <Link href={`/${locale}/admission`}>
                    <Button className="h-24 px-16 rounded-[2.5rem] font-black text-2xl bg-white text-primary hover:bg-gray-50 shadow-2xl hover:scale-105 transition-all active:scale-95 btn-interactive">
                        {isRtl ? "سجل طلب التحاق" : "Apply Now"}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/contact`}>
                    <Button variant="outline" className="h-24 px-16 rounded-[2.5rem] font-black text-2xl border-white/10 text-white hover:bg-white/5 transition-all btn-interactive">
                        {isRtl ? "تواصل معنا" : "Contact Us"}
                    </Button>
                  </Link>
              </div>
          </motion.div>
      </section>

    </div>
  );
}
