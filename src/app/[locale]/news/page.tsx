import prisma from "@/lib/prisma";
import NewsList from "@/components/news/NewsList";

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
  const newsItems = await getNews();

  return <NewsList newsItems={newsItems as any} />;
}
