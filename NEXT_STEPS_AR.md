# الخطوات التالية لإكمال لوحة التحكم 🚀

## ✅ تم الإنجاز

1. ✅ إنشاء 15 صفحة أدمن كاملة
2. ✅ تصميم Sidebar متجاوب وعصري
3. ✅ Prisma Schema شامل لكل الميزات
4. ✅ تحسين UI بألوان متدرجة وظلال
5. ✅ دعم RTL كامل للعربية
6. ✅ تكامل NextAuth للتسجيل والخروج

---

## 📋 المطلوب الآن

### 1️⃣ ربط قاعدة البيانات (أولوية عالية)

```bash
# تشغيل Migration
npx prisma migrate dev --name init

# توليد Prisma Client
npx prisma generate
```

### 2️⃣ إنشاء Server Actions

قم بإنشاء ملفات Actions لكل صفحة:

```typescript
// مثال: src/actions/admissions.ts
'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAdmissions() {
  return await prisma.admissionApplication.findMany({
    include: { parent: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function updateAdmissionStatus(id: string, status: string) {
  await prisma.admissionApplication.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin/admissions')
}
```

### 3️⃣ إضافة Forms للإدخال

استخدم `react-hook-form` + `zod` للتحقق:

```typescript
// مثال: NewsForm
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const newsSchema = z.object({
  titleAr: z.string().min(3),
  titleEn: z.string().min(3),
  contentAr: z.string().min(10),
  contentEn: z.string().min(10),
})
```

### 4️⃣ إعداد رفع الملفات (Supabase Storage)

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// رفع صورة
export async function uploadImage(file: File, bucket: string) {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)
  
  if (error) throw error
  
  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl
}
```

### 5️⃣ حماية المسارات (Middleware)

```typescript
// src/middleware.ts
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/portal/login', req.url))
  }
  
  if (isAdminRoute && req.auth?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: ['/admin/:path*']
}
```

---

## 🎯 أولويات التطوير

### المرحلة 1: الوظائف الأساسية (أسبوع 1)
- [ ] ربط صفحة الأخبار بقاعدة البيانات
- [ ] إضافة/تعديل/حذف الأخبار
- [ ] رفع صور الأخبار
- [ ] عرض الأخبار في الموقع الرئيسي

### المرحلة 2: طلبات القبول (أسبوع 2)
- [ ] عرض طلبات القبول
- [ ] تغيير حالة الطلب (قبول/رفض)
- [ ] إرسال إشعارات بالبريد
- [ ] تصدير البيانات إلى Excel

### المرحلة 3: الكادر التعليمي (أسبوع 3)
- [ ] إضافة/تعديل بيانات المعلمين
- [ ] رفع صور المعلمين
- [ ] ترتيب العرض
- [ ] عرض في الموقع الرئيسي

### المرحلة 4: باقي الصفحات (أسبوع 4)
- [ ] مكتبة الصور + Gallery
- [ ] السلايدر الرئيسي
- [ ] التقويم والأحداث
- [ ] الأسئلة الشائعة
- [ ] التقييمات

### المرحلة 5: الميزات المتقدمة (أسبوع 5)
- [ ] نظام الإشعارات
- [ ] البحث المتقدم
- [ ] التصدير والطباعة
- [ ] الإحصائيات التفصيلية
- [ ] النسخ الاحتياطي التلقائي

---

## 🔧 أدوات مساعدة

### مكتبات مفيدة:
```bash
npm install react-hot-toast          # للإشعارات
npm install @tanstack/react-table    # للجداول المتقدمة
npm install recharts                 # للرسوم البيانية
npm install date-fns                 # للتواريخ
npm install react-dropzone           # لرفع الملفات
```

### Components جاهزة:
- استخدم `DataTable.tsx` الموجود في `src/components/admin/ui/`
- استخدم `AdminModal.tsx` للنوافذ المنبثقة
- أنشئ `LoadingSpinner.tsx` للتحميل
- أنشئ `ConfirmDialog.tsx` للتأكيد

---

## 📝 ملاحظات مهمة

1. **الأمان أولاً**: تأكد من التحقق من الصلاحيات في كل Server Action
2. **التحقق من البيانات**: استخدم Zod في كل مكان
3. **معالجة الأخطاء**: أضف try/catch في كل Action
4. **الإشعارات**: أعلم المستخدم بنجاح/فشل العمليات
5. **Loading States**: أضف حالات التحميل لتحسين UX

---

## 🎨 تحسينات UI إضافية

- [ ] إضافة Skeleton Loaders
- [ ] تحسين الرسوم المتحركة (Animations)
- [ ] إضافة Dark Mode
- [ ] تحسين الـ Mobile Experience
- [ ] إضافة Tooltips للأيقونات

---

## 🚀 نصائح للأداء

1. استخدم `React.memo` للمكونات الثقيلة
2. استخدم `useMemo` و `useCallback` بحكمة
3. قم بعمل Pagination للبيانات الكبيرة
4. استخدم `next/image` لتحسين الصور
5. قم بعمل Lazy Loading للمكونات الكبيرة

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. راجع الـ Console للأخطاء
2. تحقق من الـ Network Tab
3. راجع Prisma Studio: `npx prisma studio`
4. تحقق من الـ Database Logs في Neon

---

**بالتوفيق! 🎉**
