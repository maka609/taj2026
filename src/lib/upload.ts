import { supabase } from './supabase'

/**
 * رفع صورة إلى Supabase Storage
 * @param file - ملف الصورة
 * @param bucket - اسم الـ bucket (مثل: 'sliders', 'news', 'gallery')
 * @returns رابط الصورة المرفوعة
 */
export async function uploadImage(file: File, bucket: string): Promise<string> {
  try {
    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      throw new Error('الملف يجب أن يكون صورة')
    }

    // التحقق من حجم الملف (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error('حجم الصورة يجب أن يكون أقل من 5 ميجابايت')
    }

    // إنشاء اسم فريد للملف
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    // رفع الملف
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error('فشل في رفع الصورة')
    }

    // الحصول على الرابط العام
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return urlData.publicUrl
  } catch (error) {
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
