"use client";

import React from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Send,
  Building2,
  Users,
  Heart,
  Search,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CareersListProps {
  vacancies: any[];
}

export default function CareersList({ vacancies }: CareersListProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredVacancies = vacancies.filter(v =>
    (isRtl ? v.titleAr : v.titleEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-40 pb-24 px-6 overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3 h-3" /> {isRtl ? "انضم لفريقنا" : "Join Our Team"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-deep-navy leading-[1.1] tracking-tight"
          >
            {isRtl ? "نبحث عن" : "We are Looking for"} <span className="text-primary">{isRtl ? "المبدعين" : "Talents"}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            {isRtl
              ? "هل أنت شغوف بالتعليم والابتكار؟ في مدارس تاج النزهة، نوفر بيئة عمل ملهمة تدعم النمو المهني وتسعى دائماً للتميز."
              : "Are you passionate about education and innovation? At Taj Al-Nozha, we provide an inspiring environment that supports professional growth."}
          </motion.p>
        </div>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24 items-center">
           <div className="lg:col-span-2 relative group">
              <Search className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 transition-colors group-focus-within:text-primary", isRtl ? "right-6" : "left-6")} />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isRtl ? "ابحث عن وظيفة محددة..." : "Search for a position..."}
                className={cn("h-20 rounded-[2rem] bg-white border-gray-100 focus:bg-white focus:border-primary shadow-2xl shadow-gray-200/40 text-xl font-bold transition-all px-16")}
              />
           </div>
           <div className="flex justify-around bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm">
              <div className="text-center">
                 <h4 className="text-2xl font-black text-primary">{vacancies.length}</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{isRtl ? "وظيفة متاحة" : "Open Positions"}</p>
              </div>
              <div className="w-px h-12 bg-gray-100" />
              <div className="text-center">
                 <h4 className="text-2xl font-black text-deep-navy">150+</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{isRtl ? "موظف حالي" : "Current Employees"}</p>
              </div>
           </div>
        </div>

        {/* Vacancies Grid */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredVacancies.map((job, i) => (
              <motion.div
                layout
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white overflow-hidden group">
                  <CardContent className="p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                      <div className="w-20 h-20 bg-primary/5 text-primary rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        <Briefcase className="w-10 h-10" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                           <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                             {job.type}
                           </span>
                           <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                             {job.department}
                           </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-black text-deep-navy group-hover:text-primary transition-colors">
                          {isRtl ? job.titleAr : job.titleEn}
                        </h3>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-bold">
                           <div className="flex items-center gap-2">
                             <MapPin className="w-4 h-4 text-primary" />
                             {isRtl ? "القاهرة، النزهة" : "Cairo, Nozha"}
                           </div>
                           <div className="flex items-center gap-2">
                             <Clock className="w-4 h-4 text-primary" />
                             {new Date(job.createdAt).toLocaleDateString(locale)}
                           </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="h-16 px-10 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                    >
                      {isRtl ? "تقدم للوظيفة" : "Apply Now"}
                      <ArrowRight className={cn("w-5 h-5 ml-2", isRtl && "rotate-180")} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredVacancies.length === 0 && (
           <div className="text-center py-40 bg-white rounded-[4rem] shadow-sm border border-gray-50">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300 mb-8">
                 <Building2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-gray-400 mb-4">
                {isRtl ? "لا توجد وظائف شاغرة حالياً تطابق بحثك." : "No vacancies match your search."}
              </h3>
              <Button variant="outline" onClick={() => setSearchTerm("")} className="rounded-xl h-12 font-black">
                {isRtl ? "عرض كل الوظائف" : "Show All Jobs"}
              </Button>
           </div>
        )}

        {/* Benefits Section */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { title: isRtl ? "بيئة عمل ملهمة" : "Inspiring Culture", icon: Heart, color: "bg-rose-50 text-rose-500" },
                { title: isRtl ? "نمو مهني مستمر" : "Career Growth", icon: Sparkles, color: "bg-amber-50 text-amber-500" },
                { title: isRtl ? "تأمين صحي واجتماعي" : "Full Benefits", icon: Users, color: "bg-blue-50 text-blue-500" }
            ].map((benefit, i) => (
                <div key={i} className="p-10 rounded-[3rem] bg-white border border-gray-50 shadow-sm hover:shadow-xl transition-all group">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12", benefit.color)}>
                        <benefit.icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-black text-deep-navy mb-4">{benefit.title}</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        {isRtl
                          ? "نحرص على توفير كافة المزايا التي تضمن راحة واستقرار موظفينا وإبداعهم."
                          : "We ensure providing all benefits that guarantee our employees' comfort, stability and creativity."}
                    </p>
                </div>
            ))}
        </section>
      </div>
    </div>
  );
}
