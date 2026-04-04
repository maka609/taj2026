'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { handleActionError } from '@/lib/error-handler'

// Schema للتحقق من البيانات
const sliderSchema = z.object({
  imageUrl: z.string().min(1), // يدعم URL أو Base64
  titleAr: z.string().optional().nullable(),
  titleEn: z.string().optional().nullable(),
  link: z.string().url().or(z.literal("")).optional().nullable(),
  order: z.number().int().default(0),
  active: z.boolean().default(true),
})

// جلب كل السلايدرات
export async function getSliders() {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: { order: 'asc' }
    })
    return { success: true, data: sliders }
  } catch (error) {
    return handleActionError(error, 'فشل في جلب البيانات')
  }
}

// إضافة سلايدر جديد
export async function createSlider(data: z.infer<typeof sliderSchema>) {
  try {
    const validated = sliderSchema.parse(data)
    
    const slider = await prisma.slider.create({
      data: {
        imageUrl: validated.imageUrl,
        titleAr: validated.titleAr,
        titleEn: validated.titleEn,
        link: validated.link,
        order: validated.order,
        active: validated.active,
      }
    })
    
    revalidatePath('/admin/sliders')
    revalidatePath('/')
    
    return { success: true, data: slider }
  } catch (error) {
    return handleActionError(error, 'فشل في إضافة السلايدر')
  }
}

// تحديث سلايدر
export async function updateSlider(id: string, data: Partial<z.infer<typeof sliderSchema>>) {
  try {
    const validated = sliderSchema.partial().parse(data)
    const slider = await prisma.slider.update({
      where: { id },
      data: validated
    })
    
    revalidatePath('/admin/sliders')
    revalidatePath('/')
    
    return { success: true, data: slider }
  } catch (error) {
    return handleActionError(error, 'فشل في تحديث السلايدر')
  }
}

// حذف سلايدر
export async function deleteSlider(id: string) {
  try {
    await prisma.slider.delete({
      where: { id }
    })
    
    revalidatePath('/admin/sliders')
    revalidatePath('/')
    
    return { success: true }
  } catch (error) {
    return handleActionError(error, 'فشل في حذف السلايدر')
  }
}

// تحديث حالة السلايدر
export async function updateSliderStatus(id: string, active: boolean) {
    try {
      await prisma.slider.update({
        where: { id },
        data: { active }
      })

      revalidatePath('/admin/sliders')
      revalidatePath('/')

      return { success: true }
    } catch (error) {
      return handleActionError(error, 'فشل في تحديث الحالة')
    }
}
