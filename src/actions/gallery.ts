'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { handleActionError } from '@/lib/error-handler'

const gallerySchema = z.object({
  url: z.string().min(1),
  captionAr: z.string().optional().nullable(),
  captionEn: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
})

export async function getGalleryImages() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: images }
  } catch (error) {
    return handleActionError(error, 'فشل في جلب البيانات')
  }
}

export async function createGalleryImage(data: z.infer<typeof gallerySchema>) {
    try {
      const validated = gallerySchema.parse(data)
      const image = await prisma.galleryImage.create({
        data: {
          url: validated.url,
          captionAr: validated.captionAr,
          captionEn: validated.captionEn,
          category: validated.category,
        }
      })
      revalidatePath('/admin/gallery')
      return { success: true, data: image }
    } catch (error) {
      return handleActionError(error, 'فشل في الإضافة')
    }
}

export async function deleteGalleryImage(id: string) {
  try {
    await prisma.galleryImage.delete({ where: { id } })
    revalidatePath('/admin/gallery')
    return { success: true }
  } catch (error) {
    return handleActionError(error, 'فشل في الحذف')
  }
}
