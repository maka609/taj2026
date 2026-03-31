"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen, Share2, Search, Filter, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsListProps {
  newsItems: any[];
}

export default function NewsList({ newsItems }: NewsListProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredNews = newsItems.filter(item =>
    (isRtl ? item.titleAr : item.titleEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isRtl ? item.contentAr : item.contentEn).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-40 pb-24 px-6 overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="space-y-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
            >
              {isRtl ? "آخر المستجدات" : "Latest Updates"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-black text-deep-navy leading-[1.1] tracking-tight"
            >
              {isRtl ? "أخبار" : "School"} <span className="text-primary">{isRtl ? "المدرسة" : "News"}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-500 font-medium leading-relaxed"
            >
              {isRtl
                ? "تابع فعالياتنا، إنجازات طلابنا، وأهم الأحداث التي تشكل مسارنا التعليمي في تاج النزهة."
                : "Follow our activities, student achievements, and the most important events shaping our journey at Taj Al-Nozha."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full md:w-auto relative"
          >
            <div className="flex items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-2 focus-within:shadow-2xl focus-within:border-primary/20 transition-all duration-500 min-w-[300px]">
              <Search className="w-5 h-5 text-gray-400 mx-3" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isRtl ? "ابحث في الأخبار..." : "Search news..."}
                className="border-none shadow-none focus-visible:ring-0 font-bold bg-transparent px-2"
              />
            </div>
          </motion.div>
        </div>

        {/* Featured News (First Item) */}
        {filteredNews.length > 0 && searchTerm === "" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <Link href={`/${locale}/news/${filteredNews[0].id}`}>
              <Card className="border-none shadow-sm hover:shadow-3xl transition-all duration-700 rounded-[3.5rem] bg-white overflow-hidden group">
                <CardContent className="p-0 flex flex-col lg:flex-row">
                  <div className="relative lg:w-1/2 aspect-[16/9] lg:aspect-auto overflow-hidden">
                    <Image
                      src={filteredNews[0].imageUrl || ""}
                      alt={isRtl ? filteredNews[0].titleAr : filteredNews[0].titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black text-primary flex items-center gap-2">
                       <Calendar className="w-4 h-4" />
                       {new Date(filteredNews[0].publishedAt).toLocaleDateString(locale)}
                    </div>
                  </div>
                  <div className="p-12 lg:p-20 lg:w-1/2 flex flex-col justify-center space-y-8">
                     <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                        <BookOpen className="w-4 h-4" />
                        {isRtl ? "خبر مميز" : "Featured News"}
                     </div>
                     <h2 className="text-3xl lg:text-5xl font-black text-deep-navy group-hover:text-primary transition-colors leading-tight">
                        {isRtl ? filteredNews[0].titleAr : filteredNews[0].titleEn}
                     </h2>
                     <p className="text-lg text-gray-500 font-medium leading-relaxed line-clamp-3">
                        {isRtl ? filteredNews[0].contentAr : filteredNews[0].contentEn}
                     </p>
                     <Button className="h-14 px-10 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 w-fit">
                        {isRtl ? "اقرأ الخبر كاملاً" : "Read Full Story"}
                        <ArrowRight className={cn("w-5 h-5 ml-2", isRtl && "rotate-180")} />
                     </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(searchTerm === "" ? filteredNews.slice(1) : filteredNews).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/${locale}/news/${item.id}`} className="group block">
                <Card className="border-none shadow-sm hover:shadow-3xl transition-all duration-700 rounded-[2.5rem] bg-white overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.imageUrl || ""}
                      alt={isRtl ? item.titleAr : item.titleEn}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black text-primary flex items-center gap-2">
                       <Calendar className="w-3 h-3" />
                       {new Date(item.publishedAt).toLocaleDateString(locale)}
                    </div>
                  </div>
                  <CardContent className="p-10 flex-1 flex flex-col justify-between">
                    <div className="space-y-6">
                      <h4 className="text-2xl font-black text-deep-navy group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {isRtl ? item.titleAr : item.titleEn}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium line-clamp-3 leading-relaxed">
                        {isRtl ? item.contentAr : item.contentEn}
                      </p>
                    </div>
                    <div className="pt-8 border-t border-gray-50 mt-8 flex items-center justify-between">
                       <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] group-hover:gap-2 transition-all flex items-center">
                          {isRtl ? "اقرأ المزيد" : "Read More"}
                          <ArrowRight className={cn("w-4 h-4 ml-1.5", isRtl && "rotate-180")} />
                       </span>
                       <Share2 className="w-5 h-5 text-gray-300 hover:text-primary transition-colors cursor-pointer" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredNews.length === 0 && (
           <div className="text-center py-40 space-y-8 bg-white rounded-[3rem] shadow-sm border border-gray-50 mt-20">
              <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-gray-200">
                 <Search className="w-10 h-10" />
              </div>
              <p className="text-2xl font-black text-gray-400">
                {isRtl ? "لم يتم العثور على أخبار بهذا الاسم." : "No news matching your search."}
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")} className="rounded-xl h-12 px-8 font-black">
                {isRtl ? "عرض كل الأخبار" : "Show All News"}
              </Button>
           </div>
        )}
      </div>
    </div>
  );
}
