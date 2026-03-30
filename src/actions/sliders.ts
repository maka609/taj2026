'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Schema للتحقق من البيانات
const sliderSchema = z.object({
  imageUrl: z.string().url(),
  titleAr: z.string().optional(),
  titleEn: z.string().optional(),
  link: z.string().url().optional(),
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
    console.error('Error fetching sliders:', error)
    return { success: false, error: 'فشل في جلب البيانات' }
  }
}

// إضافة سلايدر جديد
export async function createSlider(data: z.infer<typeof sliderSchema>) {
  try {
    const validated = sliderSchema.parse(data)
    
    const slider = await prisma.slider.create({
      data: validated
    })
    
    revalidatePath('/admin/sliders')
    revalidatePath('/')
    
    return { success: true, data: slider }
  } catch (error) {
    console.error('Error creating slider:', error)
    return { success: false, error: 'فشل في إضافة السلايدر' }
  }
}

// تحديث سلايدر
export async function updateSlider(id: string, data: Partial<z.infer<typeof sliderSchema>>) {
  try {
    const slider = await prisma.slider.update({
      where: { id },
      data
    })
    
    revalidatePath('/admin/sliders')
    revalidatePath('/')
    
    return { success: true, data: slider }
  } catch (error) {
    console.error('Error updating slider:', error)
    return { success: false, error: 'فشل في تحديث السلايدر' }
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
    console.error('Error deleting slider:', error)
    return { success: false, error: 'فشل في حذف السلايدر' }
  }
}

// تغيير ترتيب السلايدر
export async function reorderSlider(id: string, direction: 'up' | 'down') {
  try {
    const slider = await prisma.slider.findUnique({ where: { id } })
    if (!slider) return { success: false, error: 'السلايدر غير موجود' }
    
    const newOrder = direction === 'up' ? slider.order - 1 : slider.order + 1
    
    await prisma.slider.update({
      where: { id },
      data: { order: newOrder }
    })
    
    revalidatePath('/admin/sliders')
    
    return { success: true }
  } catch (error) {
    console.error('Error reordering slider:', error)
    return { success: false, error: 'فشل في تغيير الترتيب' }
  }
}

// تفعيل/إلغاء تفعيل السلايدر
export async function toggleSliderActive(id: string) {
  try {
    const slider = await prisma.slider.findUnique({ where: { id } })
    if (!slider) return { success: false, error: 'السلايدر غير موجود' }
    
    await prisma.slider.update({
      where: { id },
      data: { active: !slider.active }
    })
    
    revalidatePath('/admin/sliders')
    revalidatePath('/')
    
    return { success: true }
  } catch (error) {
    console.error('Error toggling slider:', error)
    return { success: false, error: 'فشل في تغيير الحالة' }
  }
}
