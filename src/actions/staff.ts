'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const staffSchema = z.object({
  nameAr: z.string().min(3),
  nameEn: z.string().min(3),
  roleAr: z.string().min(2),
  roleEn: z.string().min(2),
  department: z.string().optional(),
  imageUrl: z.string().min(1).optional(),
  order: z.number().int().default(0),
})

export async function getStaff() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { order: 'asc' }
    })
    
    return { success: true, data: staff }
  } catch (error) {
    console.error('Error fetching staff:', error)
    return { success: false, error: 'فشل في جلب البيانات' }
  }
}

export async function createStaff(data: z.infer<typeof staffSchema>) {
  try {
    const validated = staffSchema.parse(data)
    
    const staff = await prisma.staff.create({
      data: {
        nameAr: validated.nameAr,
        nameEn: validated.nameEn,
        roleAr: validated.roleAr,
        roleEn: validated.roleEn,
        department: validated.department,
        imageUrl: validated.imageUrl,
        order: validated.order,
      }
    })
    
    revalidatePath('/admin/staff')
    return { success: true, data: staff }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    console.error('Error creating staff:', error)
    return { success: false, error: 'فشل في الإضافة' }
  }
}

export async function updateStaff(id: string, data: Partial<z.infer<typeof staffSchema>>) {
  try {
    const validated = staffSchema.partial().parse(data)

    const staff = await prisma.staff.update({
      where: { id },
      data: validated
    })
    
    revalidatePath('/admin/staff')
    return { success: true, data: staff }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    console.error('Error updating staff:', error)
    return { success: false, error: 'فشل في التحديث' }
  }
}

export async function deleteStaff(id: string) {
  try {
    // جلب بيانات العضو أولاً
    const staff = await prisma.staff.findUnique({ where: { id } })
    
    if (staff && staff.imageUrl && staff.imageUrl.includes('supabase.co')) {
      // استخراج اسم الملف من الرابط (الرابط النظيف ينتهي باسم الملف)
      const fileName = staff.imageUrl.split('/').pop()?.split('?')[0]
      
      if (!fileName) return { success: false, error: 'تعذر تحديد ملف الصورة' }

      // حذف الصورة من Supabase Storage
      const { supabase } = await import('@/lib/supabase')
      const { error: storageError } = await supabase.storage
        .from('staff')
        .remove([fileName])
      
      if (storageError) {
        console.error('Error deleting from storage:', storageError)
        // نكمل الحذف من قاعدة البيانات حتى لو فشل حذف الصورة
      }
    }
    
    // حذف السجل من قاعدة البيانات
    await prisma.staff.delete({ where: { id } })
    revalidatePath('/admin/staff')
    return { success: true }
  } catch (error) {
    console.error('Error deleting staff:', error)
    return { success: false, error: 'فشل في الحذف' }
  }
}
