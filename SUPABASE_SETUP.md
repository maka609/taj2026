# 🚀 إعداد Supabase Storage

## ✅ المفاتيح المتوفرة

لديك الآن:
- **Access Key ID**: `dbe0f0efd7fdbc6344834a141acda0af`
- **Secret Access Key**: `63538193670cacbc0764c4a76cae8a05c539832e90091b5a01244554d4998d3e`

تم إضافتها في ملف `.env` ✅

---

## 📋 الخطوات المطلوبة

### 1. الحصول على Supabase Project URL و Anon Key

يجب الحصول على هذه المعلومات من لوحة تحكم Supabase:

1. افتح مشروعك في Supabase: https://supabase.com/dashboard
2. اذهب إلى **Settings** → **API**
3. انسخ:
   - **Project URL** (مثل: `https://xxxxx.supabase.co`)
   - **anon/public key** (مفتاح طويل يبدأ بـ `eyJ...`)

### 2. تحديث ملف `.env`

استبدل القيم التالية في ملف `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"  # ضع الـ URL الحقيقي
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"  # ضع الـ Anon Key الحقيقي
```

---

## 🗂️ إنشاء Storage Buckets

يجب إنشاء Buckets في Supabase لتخزين الملفات:

### في لوحة تحكم Supabase:

1. اذهب إلى **Storage** من القائمة الجانبية
2. اضغط **New bucket**
3. أنشئ الـ Buckets التالية:

| اسم الـ Bucket | الوصف | Public |
|---------------|-------|--------|
| `sliders` | صور السلايدر الرئيسي | ✅ نعم |
| `news` | صور الأخبار | ✅ نعم |
| `gallery` | مكتبة الصور | ✅ نعم |
| `staff` | صور الكادر التعليمي | ✅ نعم |
| `documents` | الملفات والمستندات | ✅ نعم |

**ملاحظة**: اجعل كل الـ Buckets **Public** لتتمكن من عرض الصور مباشرة.

---

## 🔐 إعداد Storage Policies

لكل Bucket، يجب إضافة Policies للسماح بالرفع والحذف:

### في لوحة تحكم Supabase:

1. اذهب إلى **Storage** → اختر الـ Bucket
2. اضغط **Policies**
3. أضف Policy جديدة:

#### Policy للرفع (Upload):
```sql
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'sliders');
```

#### Policy للقراءة (Public Access):
```sql
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'sliders');
```

#### Policy للحذف (Delete):
```sql
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'sliders');
```

**كرر هذه الخطوات لكل Bucket** (استبدل `'sliders'` باسم الـ Bucket).

---

## 🧪 اختبار الإعداد

بعد إكمال الخطوات السابقة:

1. أعد تشغيل السيرفر:
```bash
npm run dev
```

2. اذهب إلى صفحة الأدمن: http://localhost:3000/admin/sliders
3. جرب رفع صورة
4. إذا نجح الرفع، ستظهر الصورة في الصفحة ✅

---

## 📝 ملاحظات مهمة

### استخدام المفاتيح الحالية (S3-Compatible API)

المفاتيح التي أضفتها (Access Key و Secret Key) يمكن استخدامها مع S3-compatible API:

```typescript
// مثال: استخدام AWS SDK مع Supabase Storage
import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: 'https://your-project.supabase.co/storage/v1/s3',
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY!,
  },
});
```

لكن الطريقة الأسهل هي استخدام Supabase Client مباشرة (الموجود حالياً في `src/lib/upload.ts`).

---

## 🎯 الخطوة التالية

بعد إكمال الإعداد، يمكنك:

1. ✅ رفع صور السلايدر
2. ✅ رفع صور الأخبار
3. ✅ رفع صور مكتبة الصور
4. ✅ رفع صور الكادر التعليمي
5. ✅ رفع المستندات والملفات

كل الأزرار في الأدمن جاهزة وتنتظر فقط إكمال إعداد Supabase! 🚀

---

## ❓ مشاكل شائعة

### 1. خطأ "Missing Supabase environment variables"
- تأكد من إضافة `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` في `.env`
- أعد تشغيل السيرفر بعد تعديل `.env`

### 2. خطأ "Storage bucket not found"
- تأكد من إنشاء الـ Bucket في لوحة تحكم Supabase
- تأكد من أن اسم الـ Bucket مطابق للكود

### 3. خطأ "Permission denied"
- تأكد من إضافة Storage Policies للـ Bucket
- تأكد من أن الـ Bucket مضبوط على Public

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. راجع توثيق Supabase: https://supabase.com/docs/guides/storage
2. تحقق من Console في المتصفح للأخطاء
3. تأكد من صحة المفاتيح في `.env`

