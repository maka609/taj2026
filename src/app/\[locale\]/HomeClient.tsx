"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  BrainCircuit,
  Rocket,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HomeClientProps {
  locale: string;
  sliders: any[];
  news: any[];
  testimonials: any[];
}

export default function HomeClient({ locale, sliders, news, testimonials }: HomeClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isRtl = locale === "ar";

  useEffect(() => {
    if (sliders.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [sliders.length]);

  return (
    <div className="flex flex-col w-full overflow-hidden font-cairo" dir={isRtl ? "rtl" : "ltr"}>

      {/* 1. Elite Dynamic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* The Spider Slider / Hero Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            {sliders.length > 0 ? (
              <Image
                src={sliders[currentSlide].imageUrl}
                alt="Taj Schools Life"
                fill
                priority
                className="object-cover animate-ken-burns"
              />
            ) : (
              <div className="w-full h-full bg-deep-navy" />
            )}
            {/* Royal Blue Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/60 to-deep-navy/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 via-transparent to-deep-navy/80" />
          </motion.div>
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {isRtl ? "التسجيل مفتوح للعام الدراسي 2026/2027" : "Registration Open for 2026/2027"}
            </div>

            <h1 className="text-5xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                {isRtl ? "نصنع قادة" : "Building Leaders"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {isRtl ? "الغد اليوم." : "Of Tomorrow Today."}
                </span>
            </h1>

            <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
              {isRtl
                ? "انضم إلى صرح تعليمي يجمع بين الأصالة والابتكار، حيث نعد أطفالكم لمستقبل رقمي عالمي بروح القيم العربية."
                : "Join an educational landmark that combines authenticity with innovation, preparing your children for a global digital future."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <Link href={`/${locale}/admission`}>
                <Button className="h-20 px-12 rounded-2xl font-black text-xl shadow-3xl shadow-blue-500/30 hover:scale-105 transition-all bg-primary hover:bg-primary/90 text-white">
                    {isRtl ? "سجل ابنك الآن" : "Enroll Now"}
                    <Rocket className={cn("w-6 h-6 ml-3", isRtl && "rotate-[-45deg]")} />
                </Button>
            </Link>
            <Link href={`/${locale}/virtual-tour`}>
                <Button variant="outline" className="h-20 px-12 rounded-2xl font-black text-xl border-white/20 text-white hover:bg-white/10 backdrop-blur-md transition-all">
                    {isRtl ? "جولة افتراضية 360" : "Virtual Tour 360"}
                </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating Glassmorphism Stats Bar */}
        <div className="absolute bottom-12 left-6 right-6 z-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-10 shadow-3xl flex flex-wrap justify-around gap-8"
            >
                {[
                    { label: isRtl ? "طالب متميز" : "Elite Students", val: "+1200", icon: Users },
                    { label: isRtl ? "فصلاً حديثاً" : "Smart Classes", val: "50+", icon: GraduationCap },
                    { label: isRtl ? "اعتماد دولي" : "Accreditations", val: "12", icon: ShieldCheck },
                    { label: isRtl ? "دمج الذكاء الاصطناعي" : "AI Integrated", val: "100%", icon: BrainCircuit }
                ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-5 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                            <stat.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-right">
                            <h3 className="text-2xl font-black text-white leading-none mb-1">{stat.val}</h3>
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>

        {/* Slider Navigation Dots */}
        {sliders.length > 1 && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
                {sliders.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-500",
                            currentSlide === i ? "bg-primary h-10 w-2.5" : "bg-white/20 hover:bg-white/50"
                        )}
                    />
                ))}
            </div>
        )}
      </section>

      {/* 2. Why Taj? Modern Layout Modules */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                <div className="space-y-4 max-w-2xl">
                    <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] flex items-center gap-2">
                        <span className="w-8 h-px bg-primary" />
                        {isRtl ? "لماذا تختار تاج النزهة؟" : "Why Taj Schools?"}
                    </h2>
                    <h3 className="text-5xl lg:text-6xl font-black text-deep-navy leading-tight">
                        {isRtl ? "بيئة تعليمية" : "Future-Ready"} <br />
                        <span className="text-primary">{isRtl ? "عالمية بروح محلية" : "Learning Environment"}</span>
                    </h3>
                </div>
                <p className="text-lg text-gray-500 font-medium max-w-sm">
                    {isRtl
                        ? "نحن لا نكتفي بنقل المعرفة، بل نبني الشخصية وننمي المواهب عبر برامجنا التعليمية المتطورة."
                        : "We don't just transfer knowledge; we build character and develop talents through our advanced educational programs."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    {
                      title: isRtl ? "مناهج دولية متطورة" : "Modern Curriculum",
                      desc: isRtl ? "نعتمد أحدث المناهج العالمية التي تركز على التفكير النقدي وحل المشكلات." : "We adopt the latest global curricula focusing on critical thinking and problem-solving.",
                      icon: BookOpen,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      title: isRtl ? "بيئة آمنة وذكية" : "Safe & Smart Campus",
                      desc: isRtl ? "حرم مدرسي مجهز بأحدث تقنيات السلامة والمراقبة الذكية لراحة بال أولياء الأمور." : "A campus equipped with the latest safety technologies and smart monitoring.",
                      icon: ShieldCheck,
                      color: "from-emerald-500 to-emerald-600"
                    },
                    {
                      title: isRtl ? "دمج الذكاء الاصطناعي" : "AI Integration",
                      desc: isRtl ? "أول مدرسة في المنطقة تدمج أدوات الذكاء الاصطناعي في العملية التعليمية اليومية." : "The first school in the region to integrate AI tools into the daily educational process.",
                      icon: BrainCircuit,
                      color: "from-violet-500 to-violet-600"
                    }
                ].map((feat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -15 }}
                        transition={{ duration: 0.5 }}
                        className="relative group h-full"
                    >
                        <Card className="h-full border-none shadow-2xl shadow-gray-200/50 rounded-[3rem] bg-white overflow-hidden p-12 transition-all duration-500 hover:shadow-primary/10">
                            <CardContent className="p-0 space-y-8 flex flex-col h-full">
                                <div className={cn("w-20 h-20 rounded-3xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all duration-500", feat.color)}>
                                    <feat.icon className="w-10 h-10 text-white" />
                                </div>
                                <div className="space-y-4 flex-1">
                                    <h4 className="text-2xl font-black text-deep-navy">{feat.title}</h4>
                                    <p className="text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                                </div>
                                <div className="pt-6">
                                    <Button variant="ghost" className="p-0 font-black text-primary group-hover:gap-3 transition-all">
                                        {isRtl ? "اكتشف المزيد" : "Learn More"}
                                        <ArrowUpRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. The "Taj Family" Invitation Section */}
      <section className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto rounded-[4rem] bg-deep-navy p-12 lg:p-24 relative overflow-hidden grid lg:grid-cols-2 gap-16 items-center shadow-4xl"
          >
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 space-y-10">
                  <div className="space-y-6 text-right">
                      <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                          {isRtl ? "هل أنت جاهز لتكون جزءاً من" : "Ready to join the"} <br />
                          <span className="text-blue-400">{isRtl ? "عائلتنا المتميزة؟" : "Taj Family?"}</span>
                      </h2>
                      <p className="text-white/60 font-bold text-lg leading-relaxed max-w-xl">
                          {isRtl
                            ? "انضم إلى أكثر من 1200 ولي أمر وضعوا ثقتهم فينا. نحن نعد أطفالكم ليس فقط لاجتياز الامتحانات، بل للنجاح في الحياة."
                            : "Join over 1200 parents who trusted us. We prepare your children not just to pass exams, but to succeed in life."}
                      </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                      <Link href={`/${locale}/admission`}>
                        <Button className="h-20 px-12 rounded-2xl font-black text-xl bg-white text-primary hover:bg-gray-50 shadow-2xl transition-all">
                            {isRtl ? "بدء التسجيل الآن" : "Start Registration"}
                        </Button>
                      </Link>
                      <Link href={`/${locale}/contact`}>
                        <Button variant="outline" className="h-20 px-12 rounded-2xl font-black text-xl border-white/20 text-white hover:bg-white/10 transition-all">
                            {isRtl ? "تواصل مع مستشارك" : "Talk to Counselor"}
                        </Button>
                      </Link>
                  </div>

                  <div className="flex items-center gap-6 pt-6">
                      <div className="flex -space-x-4 rtl:space-x-reverse">
                          {[1,2,3,4].map(i => (
                              <div key={i} className="w-14 h-14 rounded-full border-4 border-deep-navy bg-gray-700 overflow-hidden relative">
                                  <Users className="p-3 w-full h-full text-white/20" />
                              </div>
                          ))}
                      </div>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
                          {isRtl ? "انضم لأكثر من 50 عائلة جديدة هذا الشهر" : "Joined by 50+ families this month"}
                      </p>
                  </div>
              </div>

              <div className="relative z-10 hidden lg:block h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-[3rem] backdrop-blur-3xl border border-white/10 rotate-3" />
                  <div className="absolute inset-0 bg-white/5 rounded-[3rem] border border-white/5 -rotate-3" />
                  <div className="absolute inset-4 rounded-[2.5rem] bg-gray-900/50 flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=2067&auto=format&fit=crop"
                        alt="School Life"
                        fill
                        className="object-cover opacity-60"
                      />
                      <div className="relative z-10 w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-3xl cursor-pointer hover:scale-110 transition-all">
                          <Play className="w-10 h-10 text-primary fill-primary ml-1" />
                      </div>
                  </div>
              </div>
          </motion.div>
      </section>

    </div>
  );
}
