# 🗂️ إنشاء Storage Buckets في Supabase

## ✅ الإعدادات تمت بنجاح!

تم إضافة:
- ✅ Supabase URL: `https://gifidfogddfbguhrvqyd.supabase.co`
- ✅ Anon Key: مضاف في `.env`
- ✅ Access Keys: مضافة في `.env`

---

## 📋 الخطوة التالية: إنشاء Buckets

### 1. افتح لوحة تحكم Supabase

اذهب إلى: https://supabase.com/dashboard/project/gifidfogddfbguhrvqyd/storage/buckets

### 2. أنشئ الـ Buckets التالية

اضغط **"New bucket"** وأنشئ كل bucket بالإعدادات التالية:

#### Bucket 1: sliders
- **Name**: `sliders`
- **Public bucket**: ✅ نعم (اختر Public)
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/*`

#### Bucket 2: news
- **Name**: `news`
- **Public bucket**: ✅ نعم
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/*`

#### Bucket 3: gallery
- **Name**: `gallery`
- **Public bucket**: ✅ نعم
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/*`

#### Bucket 4: staff
- **Name**: `staff`
- **Public bucket**: ✅ نعم
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/*`

#### Bucket 5: documents
- **Name**: `documents`
- **Public bucket**: ✅ نعم
- **File size limit**: 10 MB
- **Allowed MIME types**: `application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`

---

## 🔐 إعداد Policies (مهم جداً!)

بعد إنشاء كل bucket، يجب إضافة Policies للسماح بالرفع والحذف:

### لكل Bucket:

1. اضغط على اسم الـ Bucket
2. اذهب إلى تبويب **"Policies"**
3. اضغط **"New Policy"**
4. اختر **"For full customization"**

#### Policy 1: السماح بالقراءة للجميع
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'sliders');
```
**غير `'sliders'` لاسم الـ Bucket الحالي**

#### Policy 2: السماح بالرفع للمستخدمين المسجلين
```sql
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'sliders');
```

#### Policy 3: السماح بالحذف للمستخدمين المسجلين
```sql
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'sliders');
```

**كرر هذه الـ Policies لكل Bucket** (sliders, news, gallery, staff, documents)

---

## 🚀 اختبار الإعداد

بعد إنشاء الـ Buckets والـ Policies:

1. أعد تشغيل السيرفر:
```bash
npm run dev
```

2. اذهب إلى: http://localhost:3000/admin/sliders

3. اضغط "إضافة سلايدر جديد"

4. جرب رفع صورة

5. إذا نجح الرفع → ✅ كل شيء يعمل!

---

## ✅ قائمة التحقق

- [ ] تم إنشاء bucket: `sliders`
- [ ] تم إنشاء bucket: `news`
- [ ] تم إنشاء bucket: `gallery`
- [ ] تم إنشاء bucket: `staff`
- [ ] تم إنشاء bucket: `documents`
- [ ] تم إضافة Policies لكل bucket
- [ ] تم اختبار رفع صورة

---

## 🎯 بعد الانتهاء

بعد إكمال هذه الخطوات، ستتمكن من:

✅ رفع صور السلايدر  
✅ رفع صور الأخبار  
✅ رفع صور المعرض  
✅ رفع صور الكادر التعليمي  
✅ رفع المستندات والملفات  

كل الأزرار في الأدمن ستعمل بشكل كامل! 🚀
