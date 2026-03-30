'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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
