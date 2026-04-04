import { supabase } from './supabase'
import { uploadImageLocal, isSupabaseConfigured } from './upload-local'
import { fileTypeFromBuffer } from 'file-type'
import { v4 as uuidv4 } from 'uuid'

/**
 * رفع صورة إلى Supabase Storage مع fallback للـ Base64 في حالة عدم الإعداد
 * @param file - ملف الصورة
 * @param bucket - اسم الـ bucket (مثل: 'sliders', 'news', 'gallery')
 * @returns رابط الصورة المرفوعة
 */
export async function uploadImage(file: File, bucket: string): Promise<string> {
  try {
    // 1. Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error('حجم الملف يجب أن يكون أقل من 5 ميجابايت')
    }

    // 2. Validate magic bytes using file-type
    const buffer = Buffer.from(await file.arrayBuffer())
    const type = await fileTypeFromBuffer(buffer)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!type || !allowedTypes.includes(type.mime)) {
      throw new Error('نوع الملف غير مدعوم. يرجى رفع صورة بصيغة JPEG أو PNG أو WEBP.')
    }

    // إذا كان Supabase غير مهيأ، نستخدم الرفع المحلي (Base64)
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase not configured, falling back to local Base64 upload');
      return await uploadImageLocal(file);
    }

    // 3. Rename file with UUID
    const fileExt = type.ext
    const fileName = `${uuidv4()}.${fileExt}`

    // رفع الملف
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)

      // إذا كان الخطأ متعلق بالـ bucket غير موجود، نوضح ذلك
      if (error.message.includes('bucket not found')) {
        throw new Error(`Bucket "${bucket}" غير موجود في Supabase. يرجى إنشاؤه أولاً.`)
      }

      throw new Error(`فشل في الرفع: ${error.message}`)
    }

    // الحصول على الرابط العام
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    // لضمان الحصول على رابط نظيف بدون بارامترات إضافية (Cache buster) إذا لم تكن مطلوبة
    const cleanUrl = urlData.publicUrl.split('?')[0];
    return cleanUrl;
  } catch (error: unknown) {
    console.error('Upload error:', error)
    throw error
  }
}

/**
 * حذف صورة من Supabase Storage
 * @param url - رابط الصورة
 * @param bucket - اسم الـ bucket
 */
export async function deleteImage(url: string, bucket: string): Promise<void> {
  try {
    // استخراج اسم الملف من الرابط
    const fileName = url.split('/').pop()
    if (!fileName) throw new Error('رابط غير صحيح')

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])

    if (error) {
      console.error('Supabase delete error:', error)
      throw new Error('فشل في حذف الصورة')
    }
  } catch (error) {
    console.error('Delete error:', error)
    throw error
  }
}

/**
 * رفع ملف (PDF, Doc, إلخ) إلى Supabase Storage مع fallback للـ Base64
 * @param file - الملف
 * @param bucket - اسم الـ bucket (مثل: 'documents')
 * @returns كائن يحتوي على الرابط والحجم
 */
export async function uploadFile(
  file: File,
  bucket: string
): Promise<{ url: string; size: number }> {
  try {
    // 1. Validate file size (5MB max as per requirement)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error('حجم الملف يجب أن يكون أقل من 5 ميجابايت')
    }

    // 2. Validate magic bytes using file-type
    const buffer = Buffer.from(await file.arrayBuffer())
    const type = await fileTypeFromBuffer(buffer)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!type || !allowedTypes.includes(type.mime)) {
      throw new Error('نوع الملف غير مدعوم. يرجى رفع صورة بصيغة JPEG أو PNG أو WEBP.')
    }

    // إذا كان Supabase غير مهيأ، نستخدم الرفع المحلي
    if (!isSupabaseConfigured() || !supabase) {
      const { uploadFileLocal } = await import('./upload-local');
      return await uploadFileLocal(file);
    }

    // 3. Rename file with UUID
    const fileExt = type.ext
    const fileName = `${uuidv4()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      if (error.message.includes('bucket not found')) {
        throw new Error(`Bucket "${bucket}" غير موجود في Supabase. يرجى إنشاؤه أولاً.`)
      }
      throw new Error(`فشل في رفع الملف: ${error.message}`)
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    const cleanUrl = urlData.publicUrl.split('?')[0];

    return {
      url: cleanUrl,
      size: file.size
    }
  } catch (error: unknown) {
    console.error('File Upload error:', error)
    throw error
  }
}

/**
 * رفع عدة صور دفعة واحدة
 * @param files - مصفوفة من الملفات
 * @param bucket - اسم الـ bucket
 * @returns مصفوفة من روابط الصور
 */
export async function uploadMultipleImages(
  files: File[],
  bucket: string
): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImage(file, bucket))
  return Promise.all(uploadPromises)
}
