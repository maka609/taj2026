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
  Play
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
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [sliders.length]);

  return (
    <div className="flex flex-col w-full overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>

      {/* 1. Enhanced Hero Section with Slider */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Background Slider Effects */}
        <AnimatePresence mode="wait">
          {sliders.length > 0 && (
            <motion.div
              key={currentSlider}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={sliders[currentSlider].imageUrl}
                alt="Background"
                fill
                className="object-cover grayscale"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {isRtl ? "مرحباً بكم في صرح العلم" : "Welcome to Taj Al-Nozha"}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlider}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl lg:text-7xl font-black text-deep-navy leading-[1.1] tracking-tight">
                    {(isRtl ? sliders[currentSlider]?.titleAr : sliders[currentSlider]?.titleEn) || (isRtl ? "نصنع قادة" : "Building Leaders")} <br />
                    <span className="text-primary">{(isRtl ? sliders[currentSlider]?.descriptionAr : sliders[currentSlider]?.descriptionEn) || (isRtl ? "الغد اليوم." : "Of Tomorrow.")}</span>
                </h1>
              </motion.div>
            </AnimatePresence>

            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-lg">
                {isRtl
                  ? "في مدارس تاج النزهة، نقدم تجربة تعليمية استثنائية تجمع بين أحدث المناهج الدولية والقيم العربية الراسخة، في بيئة رقمية متكاملة."
                  : "At Taj Al-Nozha Schools, we offer an exceptional educational experience combining modern curricula with deep-rooted values."}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
                <Link href={`/${locale}/admission`}>
                    <Button className="group h-16 px-10 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95">
                        {isRtl ? "سجل ابنك الآن" : "Enroll Now"}
                        <ArrowRight className={cn("w-5 h-5 ml-2 transition-transform group-hover:translate-x-1", isRtl && "rotate-180")} />
                    </Button>
                </Link>
                <Link href={`/${locale}/about`}>
                    <Button variant="outline" className="h-16 px-10 rounded-2xl font-black text-lg border-gray-200 text-deep-navy hover:bg-gray-50 transition-all">
                        {isRtl ? "اكتشف مدرستنا" : "Discover Our School"}
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-8 pt-8">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center font-bold text-xs">
                            <Users className="w-4 h-4 text-gray-400" />
                        </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center font-bold text-xs">+1.2k</div>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {isRtl ? "طالب مسجل هذا العام" : "Enrolled Students"}
                </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-primary/10 to-blue-600/5 p-4">
                <div className="relative w-full h-full rounded-[2.5rem] bg-white shadow-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      {sliders.length > 0 ? (
                        <motion.div
                          key={currentSlider}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 1 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={sliders[currentSlider].imageUrl}
                            alt={(isRtl ? sliders[currentSlider].titleAr : sliders[currentSlider].titleEn) || ""}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <GraduationCap className="w-32 h-32 text-primary opacity-20" />
                        </div>
                      )}
                    </AnimatePresence>
                </div>

                {/* Floating Info Card */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 max-w-[200px] z-20"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-xs font-black text-deep-navy">
                          {isRtl ? "اعتماد دولي" : "Accredited"}
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                      {isRtl
                        ? "المدرسة حاصلة على أعلى تقييم جودة في المنطقة التعليمية."
                        : "Highly rated for educational quality and excellence."}
                    </p>
                </motion.div>

                {/* Slider Controls */}
                {sliders.length > 1 && (
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2 flex flex-col gap-2 z-20">
                    {sliders.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlider(i)}
                        className={cn(
                          "w-3 h-3 rounded-full transition-all duration-300",
                          currentSlider === i ? "bg-primary h-8" : "bg-primary/20 hover:bg-primary/40"
                        )}
                      />
                    ))}
                  </div>
                )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-24 bg-deep-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
                { label: isRtl ? "سنوات الخبرة" : "Years of Exp", val: "+25", icon: Calendar },
                { label: isRtl ? "معلم متميز" : "Teachers", val: "+150", icon: Users },
                { label: isRtl ? "خريج فخور" : "Graduates", val: "+5000", icon: GraduationCap },
                { label: isRtl ? "جائزة تفوق" : "Awards", val: "+80", icon: Trophy },
            ].map((stat, i) => (
                <div key={i} className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group hover:bg-primary hover:border-primary transition-all duration-500">
                        <stat.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">{stat.val}</h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-32 bg-[#fcfcfd]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">
                  {isRtl ? "لماذا نحن؟" : "Why Choose Us?"}
                </h2>
                <h3 className="text-4xl lg:text-5xl font-black text-deep-navy">
                  {isRtl ? "بيئة تعليمية" : "Inspirational"} <span className="text-primary">{isRtl ? "ملهمة" : "Environment"}</span>
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {isRtl
                    ? "نوفر كل ما يحتاجه الطالب لينمو ويتطور في جوانب شخصيته المختلفة."
                    : "Providing everything a student needs to grow and develop in all personality aspects."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                      title: isRtl ? "تقنيات حديثة" : "Modern Tech",
                      desc: isRtl ? "فصول ذكية ومختبرات حاسب متطورة تدعم أحدث وسائل التعليم الرقمي." : "Smart classrooms and computer labs supporting the latest digital education tools.",
                      icon: BookOpen
                    },
                    {
                      title: isRtl ? "أنشطة متنوعة" : "Activities",
                      desc: isRtl ? "برامج رياضية وفنية وثقافية لتنمية مهارات الطلاب وهواياتهم الشخصية." : "Sports, art, and cultural programs to develop student skills and hobbies.",
                      icon: Trophy
                    },
                    {
                      title: isRtl ? "كادر متخصص" : "Expert Staff",
                      desc: isRtl ? "نخبة من المعلمين والإداريين ذوي الخبرة والكفاءة العالية في التربية والتعليم." : "A group of highly experienced and qualified teachers and administrators.",
                      icon: Users
                    }
                ].map((feat, i) => (
                    <Card key={i} className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white overflow-hidden group">
                        <CardContent className="p-10 space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                                <feat.icon className="w-6 h-6 text-primary group-hover:text-white transition-all" />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-black text-deep-navy">{feat.title}</h4>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                            </div>
                            <Button variant="ghost" className="p-0 font-bold text-primary group-hover:gap-2 transition-all">
                                {isRtl ? "اقرأ المزيد" : "Read More"}
                                <ChevronLeft className={cn("w-4 h-4 ml-1", !isRtl && "rotate-180")} />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* 4. Latest News Section */}
      {news.length > 0 && (
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">
                  {isRtl ? "آخر الأخبار" : "Latest Updates"}
                </h2>
                <h3 className="text-4xl lg:text-5xl font-black text-deep-navy">
                  {isRtl ? "فعالياتنا" : "Our"} <span className="text-primary">{isRtl ? "المستمرة" : "Events"}</span>
                </h3>
              </div>
              <Link href={`/${locale}/news`}>
                <Button variant="outline" className="rounded-xl font-bold h-12">
                  {isRtl ? "مشاهدة الكل" : "View All"}
                  <ArrowRight className={cn("w-4 h-4 ml-2", isRtl && "rotate-180")} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.slice(0, 3).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/${locale}/news/${item.id}`} className="group">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                      <Image
                        src={item.imageUrl || ""}
                        alt={isRtl ? item.titleAr : item.titleEn}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black text-primary flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString(locale)}
                      </div>
                    </div>
                    <h4 className="text-xl font-black text-deep-navy group-hover:text-primary transition-colors mb-3 line-clamp-2">
                      {isRtl ? item.titleAr : item.titleEn}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed">
                      {(isRtl ? item.contentAr : item.contentEn).substring(0, 100)}...
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">
                {isRtl ? "آراء أولياء الأمور" : "Testimonials"}
              </h2>
              <h3 className="text-4xl lg:text-5xl font-black text-deep-navy">
                {isRtl ? "شهادات" : "What"} <span className="text-primary">{isRtl ? "نعتز بها" : "They Say"}</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((item, i) => (
                <Card key={item.id} className="border-none shadow-sm rounded-3xl bg-white p-8 relative overflow-hidden">
                  <Quote className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 -rotate-12" />
                  <CardContent className="p-0 space-y-6 relative z-10">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Trophy key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed italic">
                      "{isRtl ? item.contentAr : item.contentEn}"
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary">
                        {item.parentName[0]}
                      </div>
                      <div>
                        <h4 className="font-black text-deep-navy">{item.parentName}</h4>
                        <p className="text-xs text-gray-400 font-bold">{isRtl ? "ولي أمر" : "Parent"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA Section */}
      <section className="py-24 px-6 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto rounded-[3.5rem] bg-primary p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center space-y-10"
          >
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.png')] bg-repeat" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <h2 className="text-4xl lg:text-6xl font-black text-white relative z-10 leading-[1.2]">
                  {isRtl ? "هل أنت جاهز للانضمام" : "Ready to Join"} <br /> {isRtl ? "لعائلة تاج النزهة؟" : "The Taj Al-Nozha Family?"}
              </h2>
              <p className="text-white/80 font-bold max-w-xl text-lg relative z-10 leading-relaxed">
                  {isRtl
                    ? "ابدأ رحلة طفلك التعليمية اليوم في واحدة من أرقى المؤسسات التعليمية. باب القبول مفتوح الآن للعام الدراسي الجديد."
                    : "Start your child's educational journey today. Admissions are now open for the new academic year."}
              </p>
              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                  <Link href={`/${locale}/admission`}>
                    <Button variant="secondary" className="h-20 px-12 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-primary bg-white">
                        {isRtl ? "سجل طلب التحاق الآن" : "Apply Now"}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/contact`}>
                    <Button variant="ghost" className="h-20 px-12 rounded-2xl font-black text-xl text-white hover:bg-white/10 transition-all">
                        {isRtl ? "تواصل معنا" : "Contact Us"}
                    </Button>
                  </Link>
              </div>
          </motion.div>
      </section>

    </div>
  );
}
