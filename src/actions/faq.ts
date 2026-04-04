'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { handleActionError } from '@/lib/error-handler'

const faqSchema = z.object({
  questionAr: z.string().min(5),
  questionEn: z.string().min(5),
  answerAr: z.string().min(10),
  answerEn: z.string().min(10),
  order: z.number().int().default(0),
})

export async function getFAQs() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' }
    })
    return { success: true, data: faqs }
  } catch (error) {
    return handleActionError(error, 'فشل في جلب البيانات')
  }
}

export async function createFAQ(data: z.infer<typeof faqSchema>) {
  try {
    const validated = faqSchema.parse(data)
    const faq = await prisma.fAQ.create({
      data: {
        questionAr: validated.questionAr,
        questionEn: validated.questionEn,
        answerAr: validated.answerAr,
        answerEn: validated.answerEn,
        order: validated.order,
      }
    })
    revalidatePath('/admin/faq')
    return { success: true, data: faq }
  } catch (error) {
    return handleActionError(error, 'فشل في الإضافة')
  }
}

export async function updateFAQ(id: string, data: Partial<z.infer<typeof faqSchema>>) {
  try {
    const validated = faqSchema.partial().parse(data)
    const faq = await prisma.fAQ.update({
      where: { id },
      data: validated
    })
    revalidatePath('/admin/faq')
    return { success: true, data: faq }
  } catch (error) {
    return handleActionError(error, 'فشل في التحديث')
  }
}

export async function updateFAQOrder(id: string, order: number) {
    try {
      await prisma.fAQ.update({ where: { id }, data: { order } })
      revalidatePath('/admin/faq')
      return { success: true }
    } catch (error) {
      return handleActionError(error, 'فشل في تحديث الترتيب')
    }
}

export async function deleteFAQ(id: string) {
  try {
    await prisma.fAQ.delete({ where: { id } })
    revalidatePath('/admin/faq')
    return { success: true }
  } catch (error) {
    return handleActionError(error, 'فشل في الحذف')
  }
}
