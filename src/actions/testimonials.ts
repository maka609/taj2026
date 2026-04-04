'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const testimonialSchema = z.object({
  parentName: z.string().min(3),
  contentAr: z.string().min(10),
  contentEn: z.string().min(10),
  rating: z.number().int().min(1).max(5).default(5),
  approved: z.boolean().default(false),
})

export async function getTestimonials(filter?: 'all' | 'approved' | 'pending') {
  try {
    const where = filter === 'approved' ? { approved: true } : filter === 'pending' ? { approved: false } : {}
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: testimonials }
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return { success: false, error: 'فشل في جلب البيانات' }
  }
}

export async function updateTestimonialStatus(id: string, approved: boolean) {
  try {
    await prisma.testimonial.update({
      where: { id },
      data: { approved }
    })
    revalidatePath('/admin/testimonials')
    return { success: true }
  } catch (error) {
    console.error('Error updating testimonial status:', error)
    return { success: false, error: 'فشل في تحديث الحالة' }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin/testimonials')
    return { success: true }
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return { success: false, error: 'فشل في الحذف' }
  }
}

export async function submitTestimonial(data: z.infer<typeof testimonialSchema>) {
  try {
    const validated = testimonialSchema.parse(data)
    const testimonial = await prisma.testimonial.create({
      data: {
        parentName: validated.parentName,
        contentAr: validated.contentAr,
        contentEn: validated.contentEn,
        rating: validated.rating,
        approved: false, // Always default to false for public submissions
      }
    })
    revalidatePath('/admin/testimonials')
    return { success: true, data: testimonial }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    console.error('Error submitting testimonial:', error)
    return { success: false, error: 'فشل في إرسال التقييم' }
  }
}
