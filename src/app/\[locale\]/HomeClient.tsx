"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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
  ArrowUpRight,
  Play,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HomeClientProps {
  locale: string;
  sliders: any[];
  news: any[];
  testimonials: any[];
}

// 1. Sophisticated Letter-by-Letter Animation
const LetterAnimation = ({ text, className }: { text: string; className?: string }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className={cn("flex flex-wrap justify-center", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// 2. Animated Counter Component using useInView
const Counter = ({ value, label, icon: Icon, isRtl }: { value: string; label: string; icon: any; isRtl: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const target = parseInt(value.replace(/\D/g, ""));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      if (start === end) return;

      let totalDuration = 2000;
      let incrementTime = Math.max(totalDuration / end, 10);

      let timer = setInterval(() => {
        start += Math.ceil(end / 100);
        if (start >= end) {
            setCount(end);
            clearInterval(timer);
        } else {
            setCount(start);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex items-center gap-5 group">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-xl">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className={isRtl ? "text-right" : "text-left"}>
        <h3 className="text-3xl font-black text-white leading-none mb-1">
            {value.includes("+") ? `+${count}` : value.includes("%") ? `${count}%` : count}
        </h3>
        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
};

export default function HomeClient({ locale, sliders, news, testimonials }: HomeClientProps) {
  const isRtl = locale === "ar";

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: isRtl ? 'rtl' : 'ltr' }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Fallback slides if none provided
  const displaySlides = sliders.length > 0 ? sliders : [
    { imageUrl: "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=2067", title: "Modern Campus" },
    { imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070", title: "Smart Classrooms" },
    { imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2070", title: "Excellence in Education" }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden font-cairo" dir={isRtl ? "rtl" : "ltr"}>

      {/* 1. ELITE DYNAMIC SPIDER HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-deep-navy">

        {/* Embla Slider with Ken Burns */}
        <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {displaySlides.map((slide, index) => (
              <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden">
                <Image
                  src={slide.imageUrl}
                  alt={slide.titleAr || "Taj Schools"}
                  fill
                  priority={index === 0}
                  className={cn(
                    "object-cover transition-transform duration-[10000ms] ease-linear scale-110",
                    selectedIndex === index && "scale-100"
                  )}
                />
                {/* Elite Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/40 to-transparent" />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Layer */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="inline-block p-8 md:p-12 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-3xl mb-12"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-black uppercase tracking-[0.3em] mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {isRtl ? "التسجيل مفتوح 2026/2027" : "ADMISSIONS OPEN 2026/2027"}
                </motion.div>

                <LetterAnimation
                    text={isRtl ? "نصنع قادة الغد اليوم" : "Building Leaders of Tomorrow Today"}
                    className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight mb-8"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-lg md:text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed mb-10"
                >
                    {isRtl
                        ? "أول مدرسة تدمج الذكاء الاصطناعي مع القيم العربية الأصيلة لخلق جيل مبدع ومتميز."
                        : "The first school integrating AI with authentic Arabic values to create a brilliant and distinguished generation."}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <Link href={`/${locale}/admission`}>
                        <Button className="h-16 md:h-20 px-10 md:px-14 rounded-2xl font-black text-lg md:text-xl shadow-3xl shadow-primary/40 hover:scale-105 transition-all bg-primary hover:bg-primary/90 text-white animate-pulse-gentle">
                            {isRtl ? "سجل الآن" : "Enroll Now"}
                            <Rocket className={cn("w-6 h-6 ml-3", isRtl && "rotate-[-45deg]")} />
                        </Button>
                    </Link>
                    <Link href={`/${locale}/virtual-tour`}>
                        <Button variant="outline" className="h-16 md:h-20 px-10 md:px-14 rounded-2xl font-black text-lg md:text-xl border-white/20 text-white hover:bg-white/10 backdrop-blur-md transition-all">
                            {isRtl ? "جولة افتراضية" : "Virtual Tour"}
                            <Play className="w-5 h-5 ml-3 fill-current" />
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>

        {/* Floating Glass Stats Bar */}
        <div className="absolute bottom-10 left-6 right-6 z-20">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="max-w-6xl mx-auto bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-4xl flex flex-wrap justify-around gap-10"
            >
                <Counter value="+1000" label={isRtl ? "طالب متميز" : "Elite Students"} icon={Users} isRtl={isRtl} />
                <Counter value="50+" label={isRtl ? "فصلاً ذكياً" : "Smart Classes"} icon={GraduationCap} isRtl={isRtl} />
                <Counter value="Awarded" label={isRtl ? "مدرسة معتمدة" : "Award Winning"} icon={Award} isRtl={isRtl} />
                <Counter value="100%" label={isRtl ? "تقنيات AI" : "AI Integrated"} icon={BrainCircuit} isRtl={isRtl} />
            </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-30">
            {displaySlides.map((_, i) => (
                <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={cn(
                        "w-1.5 transition-all duration-500 rounded-full",
                        selectedIndex === i ? "bg-primary h-12" : "bg-white/20 h-4 hover:bg-white/50"
                    )}
                />
            ))}
        </div>
      </section>

      {/* 2. RECONSTRUCTED FEATURES MODULE */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24 space-y-4">
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.5em]">
                    {isRtl ? "مستقبل التعليم يبدأ هنا" : "The Future of Education Starts Here"}
                </h2>
                <h3 className="text-4xl md:text-6xl font-black text-deep-navy">
                    {isRtl ? "لماذا يختارنا المبدعون؟" : "Why Creators Choose Us?"}
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    {
                      title: isRtl ? "مناهج عالمية حديثة" : "Modern Curriculum",
                      desc: isRtl ? "نركز على التفكير الإبداعي ومهارات القرن الحادي والعشرين عبر مناهج معتمدة دولياً." : "Focusing on creative thinking and 21st-century skills through internationally accredited curricula.",
                      icon: BookOpen,
                      color: "from-blue-600 to-blue-400"
                    },
                    {
                      title: isRtl ? "بيئة تعليمية آمنة" : "Safe Environment",
                      desc: isRtl ? "نضمن أعلى معايير السلامة والرعاية النفسية والجسدية لكل طالب داخل حرمنا المدرسي." : "Ensuring the highest standards of safety, psychological, and physical care for every student.",
                      icon: ShieldCheck,
                      color: "from-emerald-600 to-emerald-400"
                    },
                    {
                      title: isRtl ? "تكامل الذكاء الاصطناعي" : "AI Integration",
                      desc: isRtl ? "أول منصة تعليمية تستخدم أدوات الذكاء الاصطناعي لتخصيص المسارات التعليمية للطلاب." : "The first educational platform using AI tools to personalize learning paths for students.",
                      icon: BrainCircuit,
                      color: "from-violet-600 to-violet-400"
                    }
                ].map((feat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -20, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="group"
                    >
                        <Card className="h-full border-none shadow-2xl shadow-gray-200/50 rounded-[3rem] bg-white overflow-hidden p-10 md:p-14 relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[5rem] -z-10 group-hover:bg-primary/5 transition-colors" />
                            <CardContent className="p-0 space-y-8">
                                <div className={cn("w-20 h-20 rounded-3xl bg-gradient-to-br flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-all duration-500", feat.color)}>
                                    <feat.icon className="w-10 h-10 text-white" />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-2xl font-black text-deep-navy">{feat.title}</h4>
                                    <p className="text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                                </div>
                                <Button variant="ghost" className="p-0 font-black text-primary hover:bg-transparent hover:text-primary/80 group-hover:gap-4 transition-all">
                                    {isRtl ? "اكتشف التفاصيل" : "Explore Details"}
                                    <ArrowUpRight className="w-5 h-5 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. CTA: JOIN THE EXCELLENCE */}
      <section className="pb-32 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto rounded-[4rem] bg-deep-navy p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center shadow-4xl"
          >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent)]" />
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />

              <div className="relative z-10 max-w-3xl space-y-10">
                  <Award className="w-20 h-20 text-blue-400 mx-auto mb-8 animate-bounce-slow" />
                  <h2 className="text-4xl lg:text-7xl font-black text-white leading-tight">
                      {isRtl ? "ابدأ رحلة التميز الآن" : "Start the Journey of Excellence"}
                  </h2>
                  <p className="text-white/60 font-bold text-lg md:text-xl leading-relaxed">
                      {isRtl
                        ? "انضم إلى عائلة مدارس تاج النزهة حيث نؤمن بأن كل طفل هو مشروع قائد ناجح. مقاعدنا محدودة، احجز مكان طفلك اليوم."
                        : "Join the Taj Schools family where we believe every child is a potential leader. Limited seats available, reserve your spot today."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
                      <Link href={`/${locale}/admission`}>
                        <Button className="h-20 px-16 rounded-2xl font-black text-xl bg-white text-primary hover:bg-gray-100 shadow-2xl transition-all hover:scale-105">
                            {isRtl ? "نموذج القبول الإلكتروني" : "E-Admission Form"}
                        </Button>
                      </Link>
                      <Link href={`/${locale}/contact`}>
                        <Button variant="outline" className="h-20 px-16 rounded-2xl font-black text-xl border-white/20 text-white hover:bg-white/10 transition-all">
                            {isRtl ? "تواصل معنا" : "Contact Us"}
                        </Button>
                      </Link>
                  </div>
              </div>
          </motion.div>
      </section>

    </div>
  );
}
