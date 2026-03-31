'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { ApplicationStatus, Prisma } from '@prisma/client'

const admissionSchema = z.object({
  studentNameAr: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  studentNameEn: z.string().min(3, 'Name must be at least 3 characters'),
  gradeApplying: z.string().min(1, 'الرجاء اختيار الصف / Please select grade'),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "تاريخ ميلاد غير صحيح / Invalid date of birth",
  }),
  gender: z.enum(['ذكر', 'أنثى']),
  parentEmail: z.string().email('بريد إلكتروني غير صحيح / Invalid email'),
  parentPhone: z.string().min(10, 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل / Phone must be at least 10 digits'),
  notes: z.string().optional().nullable(),
})

export async function getAdmissions(status?: string) {
  try {
    const where: Prisma.AdmissionApplicationWhereInput = status && status !== 'all' ? { status: status as ApplicationStatus } : {}
    
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

export async function updateAdmissionStatus(id: string, status: string) {
  try {
    await prisma.admissionApplication.update({
      where: { id },
      data: { status: status as ApplicationStatus }
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

export async function submitAdmission(data: z.infer<typeof admissionSchema>) {
  try {
    const validated = admissionSchema.parse(data);

    const admission = await prisma.admissionApplication.create({
      data: {
        studentNameAr: validated.studentNameAr,
        studentNameEn: validated.studentNameEn,
        gradeApplying: validated.gradeApplying,
        dateOfBirth: new Date(validated.dateOfBirth),
        gender: validated.gender,
        parentEmail: validated.parentEmail,
        parentPhone: validated.parentPhone,
        notes: validated.notes || "",
        status: "PENDING"
      }
    });

    revalidatePath('/admin/admissions');
    return { success: true, data: admission };
  } catch (error) {
    console.error('Error submitting admission:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "بيانات غير صالحة" };
    }
    return { success: false, error: 'فشل في إرسال الطلب' };
  }
}
