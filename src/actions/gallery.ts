'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const gallerySchema = z.object({
  url: z.string().url(),
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
    console.error('Error fetching gallery images:', error)
    return { success: false, error: 'فشل في جلب البيانات' }
  }
}

export async function createGalleryImage(data: z.infer<typeof gallerySchema>) {
    try {
      const validated = gallerySchema.parse(data)
      const image = await prisma.galleryImage.create({ data: validated })
      revalidatePath('/admin/gallery')
      return { success: true, data: image }
    } catch (error) {
      console.error('Error creating gallery image:', error)
      return { success: false, error: 'فشل في الإضافة' }
    }
}

export async function deleteGalleryImage(id: string) {
  try {
    await prisma.galleryImage.delete({ where: { id } })
    revalidatePath('/admin/gallery')
    return { success: true }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { success: false, error: 'فشل في الحذف' }
  }
}
