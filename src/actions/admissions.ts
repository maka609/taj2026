'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const admissionSchema = z.object({
  studentNameAr: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  studentNameEn: z.string().min(3, 'Name must be at least 3 characters'),
  gradeApplying: z.string().min(1, 'الرجاء اختيار الصف'),
  dateOfBirth: z.string(),
  gender: z.enum(['ذكر', 'أنثى']),
  parentEmail: z.string().email('بريد إلكتروني غير صحيح'),
  parentPhone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  notes: z.string().optional(),
})

export async function getAdmissions(status?: string) {
  try {
    const where = status && status !== 'all' ? { status: status as any } : {}
    
    const admissions = await prisma.admissionApplication.findMany({
      where,
      include: { parent: true },
      orderBy: { createdAt: 'desc' }
    })
    
    return { success: true, data: admissions }
  } catch (error) {
    console.error('Error fetching admissions:', error)
    return { success: false, error: 'فشل في جلب البيانات' }
  }
}

export async function updateAdmissionStatus(id: string, status: 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED') {
  try {
    await prisma.admissionApplication.update({
      where: { id },
      data: { status }
    })
    
    revalidatePath('/admin/admissions')
    return { success: true }
  } catch (error) {
    console.error('Error updating admission:', error)
    return { success: false, error: 'فشل في تحديث الحالة' }
  }
}

export async function deleteAdmission(id: string) {
  try {
    await prisma.admissionApplication.delete({
      where: { id }
    })
    
    revalidatePath('/admin/admissions')
    return { success: true }
  } catch (error) {
    console.error('Error deleting admission:', error)
    return { success: false, error: 'فشل في الحذف' }
  }
}
