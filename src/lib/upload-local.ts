/**
 * حل مؤقت لرفع الملفات بدون Supabase
 * يحول الملفات إلى Base64 ويخزنها في قاعدة البيانات
 * 
 * ملاحظة: هذا الحل للتطوير فقط
 * في الإنتاج يجب استخدام Supabase Storage
 */

export async function uploadImageLocal(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      reject(new Error('الملف يجب أن يكون صورة'));
      return;
    }

    // التحقق من حجم الملف (2MB max للـ Base64)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      reject(new Error('حجم الصورة يجب أن يكون أقل من 2 ميجابايت'));
      return;
    }

    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    
    reader.onerror = () => {
      reject(new Error('فشل في قراءة الملف'));
    };
    
    reader.readAsDataURL(file);
  });
}

export async function uploadFileLocal(file: File): Promise<{ url: string; size: number }> {
  return new Promise((resolve, reject) => {
    // التحقق من حجم الملف (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      reject(new Error('حجم الملف يجب أن يكون أقل من 5 ميجابايت'));
      return;
    }

    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve({
        url: base64String,
        size: file.size
      });
    };
    
    reader.onerror = () => {
      reject(new Error('فشل في قراءة الملف'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * تحقق من وجود إعدادات Supabase
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key'
  );
}
