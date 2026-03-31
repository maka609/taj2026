import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Share2, MessageCircle, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NewsDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

async function getNewsById(id: string) {
  try {
    const news = await prisma.news.findUnique({
      where: { id }
    });
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

async function getRelatedNews(id: string, locale: string) {
    try {
        const news = await prisma.news.findMany({
            where: { id: { not: id } },
            take: 2,
            orderBy: { publishedAt: 'desc' }
        });
        return news;
    } catch (error) {
        return [];
    }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, id } = await params;
  const news = await getNewsById(id);
  const isRtl = locale === 'ar';

  if (!news) {
    notFound();
  }

  const relatedNews = await getRelatedNews(id, locale);

  const title = isRtl ? news.titleAr : news.titleEn;
  const content = isRtl ? news.contentAr : news.contentEn;
  const description = (isRtl ? news.contentAr : news.contentEn).substring(0, 150) + '...';

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-40 pb-24 px-6 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumbs / Back */}
        <div className="mb-12">
            <Link href={`/${locale}/news`}>
                <Button variant="ghost" className="rounded-xl font-black text-gray-400 hover:text-primary gap-2">
                    <ArrowRight className={cn("w-4 h-4", isRtl ? "" : "rotate-180")} />
                    {isRtl ? 'العودة للأخبار' : 'Back to News'}
                </Button>
            </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-8 mb-16">
            <div className="flex flex-wrap items-center gap-6">
                <div className="bg-primary/5 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(news.publishedAt).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Clock className="w-4 h-4 text-primary" />
                    {isRtl ? 'قراءة في 5 دقائق' : '5 min read'}
                </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-deep-navy leading-[1.2]">
                {title}
            </h1>

            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                {description}
            </p>
        </div>

        {/* Featured Image */}
        {news.imageUrl && (
            <div className="relative aspect-[21/9] rounded-[3.5rem] overflow-hidden shadow-2xl mb-20">
                <Image
                    src={news.imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
        )}

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            <div className="lg:col-span-3">
                <article className="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:text-deep-navy prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:font-medium">
                    <div className="whitespace-pre-wrap">
                        {content}
                    </div>
                </article>

                {/* Share */}
                <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-deep-navy uppercase tracking-widest">{isRtl ? 'شارك الخبر:' : 'Share:'}</span>
                        <div className="flex gap-3">
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform bg-[#25D366]">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <Button variant="outline" className="rounded-xl font-black gap-2 h-12">
                        <Share2 className="w-4 h-4" />
                        {isRtl ? 'نسخ الرابط' : 'Copy Link'}
                    </Button>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-12">
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-deep-navy flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary" />
                        {isRtl ? 'أخبار مشابهة' : 'Related'}
                    </h3>
                    <div className="space-y-6">
                        {relatedNews.map((item: any) => (
                            <Link key={item.id} href={`/${locale}/news/${item.id}`} className="group block space-y-3">
                                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
                                    <Image src={item.imageUrl} alt={item.titleAr} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h4 className="font-black text-deep-navy group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                    {isRtl ? item.titleAr : item.titleEn}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>

                <Card className="border-none bg-deep-navy text-white rounded-[2.5rem] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                    <CardContent className="p-8 space-y-6 relative z-10 text-center">
                        <h4 className="text-xl font-black">{isRtl ? 'اشترك في بريدنا' : 'Newsletter'}</h4>
                        <p className="text-xs text-gray-400 font-medium">{isRtl ? 'احصل على آخر الأخبار مباشرة' : 'Get latest updates'}</p>
                        <Button className="w-full rounded-xl font-black">
                            {isRtl ? 'اشترك الآن' : 'Subscribe'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}

// Simple motion component wrapper since we are in a server component
function motion_div({ children, className, ...props }: any) {
    return <div className={className}>{children}</div>;
}
