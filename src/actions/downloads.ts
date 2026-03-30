'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const documentSchema = z.object({
  titleAr: z.string().min(3),
  titleEn: z.string().min(3),
  fileUrl: z.string().url(),
  category: z.string(),
  fileSize: z.number().int().optional(),
})

export async function getDocuments() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: documents }
  } catch (error) {
    console.error('Error fetching documents:', error)
    return { success: false, error: 'فشل في جلب البيانات' }
  }
}

export async function createDocument(data: z.infer<typeof documentSchema>) {
  try {
    console.log('Creating document with data:', data)
    const validated = documentSchema.parse(data)
    console.log('Validated data:', validated)
    const document = await prisma.document.create({ data: validated })
    console.log('Document created:', document)
    revalidatePath('/admin/downloads')
    return { success: true, data: document }
  } catch (error) {
    console.error('Error creating document:', error)
    return { success: false, error: 'فشل في الإضافة' }
  }
}

export async function deleteDocument(id: string) {
  try {
    // جلب بيانات الملف أولاً
    const document = await prisma.document.findUnique({ where: { id } })
    
    if (document && document.fileUrl) {
      // استخراج اسم الملف من الرابط
      const urlParts = document.fileUrl.split('/')
      const fileName = urlParts[urlParts.length - 1]
      
      // حذف الملف من Supabase Storage
      const { supabase } = await import('@/lib/supabase')
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([fileName])
      
      if (storageError) {
        console.error('Error deleting from storage:', storageError)
        // نكمل الحذف من قاعدة البيانات حتى لو فشل حذف الملف
      }
    }
    
    // حذف السجل من قاعدة البيانات
    await prisma.document.delete({ where: { id } })
    revalidatePath('/admin/downloads')
    return { success: true }
  } catch (error) {
    console.error('Error deleting document:', error)
    return { success: false, error: 'فشل في الحذف' }
  }
}
