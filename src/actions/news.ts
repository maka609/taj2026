"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const newsSchema = z.object({
  titleAr: z.string().min(5),
  titleEn: z.string().min(5),
  contentAr: z.string().min(10),
  contentEn: z.string().min(10),
  imageUrl: z.string().url().or(z.literal("")).optional().nullable(),
});

type NewsInput = z.infer<typeof newsSchema>;

export async function getNews() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: news };
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return { success: false, error: "فشل في جلب الأخبار" };
  }
}

export async function getNewsById(id: string) {
  try {
    const news = await prisma.news.findUnique({
      where: { id }
    });
    if (!news) return { success: false, error: "الخبر غير موجود" };
    return { success: true, data: news };
  } catch (error) {
    return { success: false, error: "فشل في جلب تفاصيل الخبر" };
  }
}

export async function createNews(formData: NewsInput) {
  try {
    const { titleAr, titleEn, contentAr, contentEn, imageUrl } = newsSchema.parse(formData);
    
    // Auto-generate a slug from English title or Date
    const baseSlug = titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const dateSlug = Date.now().toString(36);
    const slug = `${baseSlug}-${dateSlug}`;

    const newNews = await prisma.news.create({
      data: {
        titleAr,
        titleEn,
        contentAr,
        contentEn,
        imageUrl: imageUrl || null,
        slug
      }
    });

    revalidatePath("/admin/news");
    revalidatePath("/ar/news");
    revalidatePath("/en/news");

    return { success: true, data: newNews };
  } catch (error) {
    console.error("Error creating news:", error);
    return { success: false, error: "حدث خطأ أثناء إضافة الخبر" };
  }
}

export async function updateNews(id: string, formData: Partial<NewsInput>) {
  try {
    const { titleAr, titleEn, contentAr, contentEn, imageUrl } = formData;
    
    const updated = await prisma.news.update({
      where: { id },
      data: {
        titleAr,
        titleEn,
        contentAr,
        contentEn,
        ...(imageUrl !== undefined ? { imageUrl } : {})
      }
    });

    revalidatePath("/admin/news");
    revalidatePath("/ar/news");
    revalidatePath("/en/news");
    revalidatePath(`/ar/news/${updated.slug}`);
    revalidatePath(`/en/news/${updated.slug}`);

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating news:", error);
    return { success: false, error: "حدث خطأ أثناء تحديث الخبر" };
  }
}

export async function deleteNews(id: string) {
  try {
    await prisma.news.delete({
      where: { id }
    });

    revalidatePath("/admin/news");
    revalidatePath("/ar/news");
    revalidatePath("/en/news");

    return { success: true };
  } catch (error) {
    console.error("Error deleting news:", error);
    return { success: false, error: "فشل في حذف الخبر" };
  }
}
