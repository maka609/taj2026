"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Phone, Award, Search, Users, ShieldCheck, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StaffListProps {
  staff: any[];
}

export default function StaffList({ staff }: StaffListProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredStaff = staff.filter(member =>
    (isRtl ? member.nameAr : member.nameEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isRtl ? member.roleAr : member.roleEn).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-40 pb-24 px-6 overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
          >
            {isRtl ? "نخبة المعلمين" : "Our Elite Educators"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-deep-navy leading-tight"
          >
            {isRtl ? "الكادر التعليمي" : "Our Staff"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-medium leading-relaxed"
          >
            {isRtl
              ? "نفخر في مدارس تاج النزهة بامتلاكنا نخبة من أفضل الكفاءات التعليمية والإدارية، المكرسين لبناء مستقبل طلابنا."
              : "At Taj Al-Nozha, we are proud to have a team of highly qualified educators and administrators dedicated to building our students' future."}
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-24 relative group"
        >
          <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center bg-white rounded-[2rem] shadow-sm border border-gray-100 p-2 pl-6 focus-within:shadow-2xl focus-within:border-primary/20 transition-all duration-500">
            <Search className="w-6 h-6 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isRtl ? "ابحث عن معلم أو تخصص..." : "Search for a teacher or role..."}
              className="border-none shadow-none focus-visible:ring-0 text-lg font-bold bg-transparent px-4"
            />
            <Button className="rounded-2xl h-12 px-8 font-black">
              {isRtl ? "بحث" : "Search"}
            </Button>
          </div>
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStaff.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-none shadow-sm hover:shadow-3xl transition-all duration-700 rounded-[3rem] bg-white overflow-hidden group h-full flex flex-col">
                <CardContent className="p-0 flex-1 flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={isRtl ? member.nameAr : member.nameEn}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <GraduationCap className="w-20 h-20 text-primary opacity-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <div className="flex gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur hover:bg-primary transition-colors flex items-center justify-center text-white cursor-pointer">
                            <Mail className="w-5 h-5" />
                         </div>
                         <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur hover:bg-primary transition-colors flex items-center justify-center text-white cursor-pointer">
                            <Phone className="w-5 h-5" />
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                        <Award className="w-3 h-3" />
                        {isRtl ? member.roleAr : member.roleEn}
                      </div>
                      <h4 className="text-xl font-black text-deep-navy group-hover:text-primary transition-colors mb-2">
                        {isRtl ? member.nameAr : member.nameEn}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        {isRtl ? "مربي فاضل يتمتع بخبرة واسعة في تدريس المناهج الحديثة." : "An experienced educator dedicated to modern teaching methods."}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                       <div className="flex -space-x-2 rtl:space-x-reverse">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
                             <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm">
                             <Award className="w-4 h-4" />
                          </div>
                       </div>
                       <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                          {isRtl ? "محبوب الطلاب" : "Student Favorite"}
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-24 space-y-6">
             <div className="w-24 h-24 bg-gray-100 rounded-[2.5rem] flex items-center justify-center mx-auto text-gray-300">
                <Search className="w-10 h-10" />
             </div>
             <p className="text-xl font-bold text-gray-400">
               {isRtl ? "لم يتم العثور على نتائج للبحث." : "No staff members found."}
             </p>
             <Button variant="outline" onClick={() => setSearchTerm("")} className="rounded-xl font-black">
                {isRtl ? "إعادة تعيين" : "Reset Search"}
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}
