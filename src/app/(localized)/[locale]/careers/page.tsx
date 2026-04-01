import prisma from "@/lib/prisma";
import CareersList from "@/components/careers/CareersList";

async function getCareers() {
  try {
    const careers = await prisma.career.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    });
    return careers;
  } catch (error) {
    console.error('Error fetching careers:', error);
    return [];
  }
}

export const metadata = {
  title: "الوظائف والتوظيف | مدارس تاج النزهة",
};

export default async function CareersPage() {
  const vacancies = await getCareers();

  return <CareersList vacancies={vacancies as any || []} />;
}
