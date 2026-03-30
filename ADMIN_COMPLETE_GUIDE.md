# 🎓 دليل لوحة التحكم الكامل - مدارس تاج النزهة

## 📦 ما تم إنجازه

### ✅ الصفحات (15 صفحة)
```
✅ /admin                    - لوحة الإحصائيات
✅ /admin/admissions         - طلبات القبول
✅ /admin/messages           - الرسائل
✅ /admin/news               - الأخبار
✅ /admin/gallery            - مكتبة الصور
✅ /admin/sliders            - صور الصفحة الرئيسية
✅ /admin/testimonials       - آراء أولياء الأمور
✅ /admin/faq                - الأسئلة الشائعة
✅ /admin/staff              - الكادر التعليمي
✅ /admin/calendar           - التقويم والأحداث
✅ /admin/downloads          - الملفات والتحميلات
✅ /admin/unified-backup     - النسخ الاحتياطي
✅ /admin/security-logs      - المراقبة الأمنية
✅ /admin/careers            - التوظيف والوظائف
✅ /admin/settings           - إعدادات الموقع
```

### ✅ المكونات (Components)
```
✅ AdminSidebar.tsx          - القائمة الجانبية المحسّنة
✅ AdminModal.tsx            - النوافذ المنبثقة
✅ DataTable.tsx             - الجداول
✅ NewsDashboard.tsx         - لوحة الأخبار
✅ NewsForm.tsx              - نموذج الأخبار
✅ SliderUploadForm.tsx      - نموذج رفع السلايدر (جديد)
```

### ✅ Server Actions
```
✅ src/actions/auth.ts       - المصادقة
✅ src/actions/news.ts       - الأخبار
✅ src/actions/sliders.ts    - السلايدر (جديد)
```

### ✅ المكتبات المساعدة
```
✅ src/lib/prisma.ts         - Prisma Client
✅ src/lib/utils.ts          - دوال مساعدة
✅ src/lib/supabase.ts       - Supabase Client (جديد)
✅ src/lib/upload.ts         - رفع الملفات (جديد)
```

### ✅ قاعدة البيانات
```
✅ prisma/schema.prisma      - Schema كامل (17 Model)
```

---

## 🎨 التحسينات على UI

### Sidebar
- ✅ تصميم متدرج (Gradient Background)
- ✅ عرض أكبر (320px بدلاً من 288px)
- ✅ أيقونات ملونة مع خلفيات
- ✅ تأثيرات hover محسّنة
- ✅ شريط جانبي للعنصر النشط
- ✅ زر mobile محسّن

### Dashboard
- ✅ بطاقات إحصائيات بتأثيرات hover
- ✅ ألوان متدرجة للأيقونات
- ✅ تحسين المسافات والأحجام
- ✅ بطاقات الأنشطة الأخيرة محسّنة

### Layout
- ✅ خلفية متدرجة للصفحة
- ✅ مسافات أكبر (padding)
- ✅ تحسين responsive design

---

## 🚀 خطوات التشغيل

### 1. تثبيت المكتبات
```bash
npm install
```

### 2. إعداد Environment Variables
```bash
# انسخ الملف
cp .env.local.example .env.local

# عدّل القيم في .env.local
```

### 3. إعداد قاعدة البيانات
```bash
# إنشاء الجداول
npx prisma migrate dev --name init

# توليد Prisma Client
npx prisma generate

# فتح Prisma Studio (اختياري)
npx prisma studio
```

### 4. إنشاء مستخدم Admin
```bash
# افتح Prisma Studio
npx prisma studio

# أو استخدم هذا الكود في console
```

```typescript
// في src/scripts/create-admin.ts
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@tajschools.com',
      password: hashedPassword,
      name: 'المدير',
      role: 'ADMIN'
    }
  })
  
  console.log('Admin created:', admin)
}

createAdmin()
```

### 5. تشغيل المشروع
```bash
npm run dev
```

### 6. تسجيل الدخول
```
URL: http://localhost:3000/portal/login
Email: admin@tajschools.com
Password: admin123
```

---

## 📁 هيكل المشروع

```
taj2026/
├── prisma/
│   └── schema.prisma              # قاعدة البيانات
├── src/
│   ├── actions/                   # Server Actions
│   │   ├── auth.ts
│   │   ├── news.ts
│   │   └── sliders.ts
│   ├── app/
│   │   ├── admin/                 # صفحات الأدمن
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── admissions/
│   │   │   ├── calendar/
│   │   │   ├── careers/
│   │   │   ├── downloads/
│   │   │   ├── faq/
│   │   │   ├── gallery/
│   │   │   ├── messages/
│   │   │   ├── news/
│   │   │   ├── security-logs/
│   │   │   ├── settings/
│   │   │   ├── sliders/
│   │   │   ├── staff/
│   │   │   ├── testimonials/
│   │   │   └── unified-backup/
│   │   └── [locale]/              # صفحات الموقع
│   ├── components/
│   │   ├── admin/                 # مكونات الأدمن
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── news/
│   │   │   ├── sliders/
│   │   │   └── ui/
│   │   ├── common/
│   │   └── layout/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── supabase.ts
│   │   ├── upload.ts
│   │   └── utils.ts
│   └── auth.ts
├── .env.local.example
├── ADMIN_PANEL.md
├── ADMIN_COMPLETE_GUIDE.md
└── NEXT_STEPS_AR.md
```

---

## 🔧 الخطوات التالية

### المرحلة 1: ربط البيانات (أولوية عالية)
1. إنشاء Server Actions لكل صفحة
2. ربط الصفحات بقاعدة البيانات
3. إضافة Forms للإدخال والتعديل
4. إضافة التحقق من البيانات (Zod)

### المرحلة 2: رفع الملفات
1. إعداد Supabase Buckets
2. تطبيق رفع الصور في كل صفحة
3. معالجة الصور (resize, compress)
4. إضافة معاينة قبل الرفع

### المرحلة 3: الميزات المتقدمة
1. نظام الإشعارات (react-hot-toast)
2. البحث والفلترة
3. التصدير إلى Excel/PDF
4. الإحصائيات التفصيلية
5. النسخ الاحتياطي التلقائي

---

## 📚 أمثلة الاستخدام

### مثال 1: جلب البيانات
```typescript
// في صفحة Server Component
import { getSliders } from '@/actions/sliders'

export default async function SlidersPage() {
  const { data: sliders } = await getSliders()
  
  return (
    <div>
      {sliders?.map(slider => (
        <div key={slider.id}>{slider.titleAr}</div>
      ))}
    </div>
  )
}
```

### مثال 2: رفع صورة
```typescript
'use client'
import { uploadImage } from '@/lib/upload'
import { createSlider } from '@/actions/sliders'

async function handleUpload(file: File) {
  const imageUrl = await uploadImage(file, 'sliders')
  await createSlider({ imageUrl, titleAr: 'عنوان' })
}
```

### مثال 3: حذف عنصر
```typescript
'use client'
import { deleteSlider } from '@/actions/sliders'
import toast from 'react-hot-toast'

async function handleDelete(id: string) {
  const result = await deleteSlider(id)
  if (result.success) {
    toast.success('تم الحذف بنجاح')
  }
}
```

---

## 🎯 نصائح مهمة

### الأمان
- ✅ تحقق من الصلاحيات في كل Server Action
- ✅ استخدم Zod للتحقق من البيانات
- ✅ لا تعرض أخطاء قاعدة البيانات للمستخدم
- ✅ استخدم HTTPS في Production

### الأداء
- ✅ استخدم Pagination للبيانات الكبيرة
- ✅ استخدم next/image للصور
- ✅ قم بعمل Lazy Loading للمكونات
- ✅ استخدم React.memo بحكمة

### UX
- ✅ أضف Loading States
- ✅ أضف Skeleton Loaders
- ✅ أعلم المستخدم بنجاح/فشل العمليات
- ✅ أضف Confirm Dialogs للحذف

---

## 🐛 حل المشاكل الشائعة

### مشكلة: Prisma Client لا يعمل
```bash
npx prisma generate
```

### مشكلة: الصور لا ترفع
- تحقق من Supabase credentials
- تحقق من Bucket permissions
- تحقق من حجم الملف

### مشكلة: NextAuth لا يعمل
- تحقق من NEXTAUTH_SECRET
- تحقق من NEXTAUTH_URL
- تحقق من Database connection

---

## 📞 الدعم

للمساعدة:
1. راجع الـ Console للأخطاء
2. افتح Prisma Studio: `npx prisma studio`
3. راجع Network Tab في DevTools
4. تحقق من Database Logs في Neon

---

## 🎉 تم بنجاح!

لوحة التحكم جاهزة للاستخدام والتطوير. كل الصفحات موجودة، الـ UI محسّن، والـ Schema جاهز.

**الخطوة التالية:** ابدأ بربط البيانات الحقيقية!

---

**تم التطوير بواسطة Kiro AI Assistant**
**Developed by Kiro AI Assistant**
