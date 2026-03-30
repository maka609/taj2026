import React from "react";
import { Newspaper, Calendar, ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

async function getNews() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 12
    });
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

interface NewsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations("Navigation");
  const newsItems = await getNews();

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            <div className="flex items-center gap-3 text-primary mb-4 font-bold tracking-wide">
              <Newspaper className="w-6 h-6 border-2 border-primary rounded-md p-0.5" />
              <span>{locale === 'ar' ? 'آخر الأخبار والفعاليات' : 'Latest News & Events'}</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t("news")}</h1>
            <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
              {locale === 'ar' 
                ? 'تابعوا أحدث التطورات، الإعلانات، والفعاليات المدرسية لحظة بلحظة.'
                : 'Follow the latest developments, announcements, and school events.'}
            </p>
          </div>
          {newsItems.length > 0 && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-tighter">
                  {locale === 'ar' ? 'خبر عاجل' : 'Breaking News'}
                </p>
                <p className="font-bold text-gray-900 truncate max-w-[200px]">
                  {locale === 'ar' ? newsItems[0].titleAr : newsItems[0].titleEn}
                </p>
              </div>
            </div>
          )}
        </div>

        {newsItems.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {locale === 'ar' ? 'لا توجد أخبار حالياً' : 'No news available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsItems.map((news) => (
              <Link 
                key={news.id} 
                href={`/${locale}/news/${news.id}`} 
                className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col h-full hover:-translate-y-2 duration-300"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                  {news.imageUrl ? (
                    <img 
                      src={news.imageUrl} 
                      alt={locale === 'ar' ? news.titleAr : news.titleEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                      <Newspaper className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent group-hover:scale-110 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm">
                    {locale === 'ar' ? 'أخبار' : 'News'}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(news.publishedAt).toLocaleDateString(
                        locale === 'ar' ? 'ar-EG' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {locale === 'ar' ? news.titleAr : news.titleEn}
                  </h3>
                  <p className="text-gray-500 line-clamp-3 mb-8 leading-relaxed text-sm">
                    {locale === 'ar' ? news.contentAr.substring(0, 150) : news.contentEn.substring(0, 150)}...
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                    <span>{locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                    <ArrowLeft className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
