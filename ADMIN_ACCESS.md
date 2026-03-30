# 🔐 الوصول للوحة التحكم | Admin Access

## ✅ تم إنشاء مستخدم Admin

تم إنشاء مستخدم admin بنجاح في قاعدة البيانات!

---

## 🎯 بيانات تسجيل الدخول | Login Credentials

```
📧 البريد الإلكتروني: admin@tajschools.com
🔑 كلمة المرور: admin123
```

---

## 🚀 خطوات الوصول | Access Steps

### الطريقة 1: الوصول المباشر (مؤقت)
حالياً يمكنك الوصول مباشرة للوحة التحكم بدون تسجيل دخول:

```
http://localhost:3000/admin
```

### الطريقة 2: تسجيل الدخول (موصى بها)
1. افتح صفحة تسجيل الدخول:
   ```
   http://localhost:3000/ar/portal/login
   ```

2. أدخل البيانات:
   - البريد: `admin@tajschools.com`
   - كلمة المرور: `admin123`

3. سيتم توجيهك تلقائياً إلى:
   ```
   http://localhost:3000/admin
   ```

---

## 🔧 إعادة إنشاء مستخدم Admin

إذا احتجت إعادة إنشاء المستخدم:

```bash
npm run create-admin
```

---

## 🛡️ تفعيل الحماية

حالياً الحماية معطلة مؤقتاً في `src/middleware.ts` للتطوير.

### لتفعيل الحماية:

1. افتح `src/middleware.ts`
2. احذف التعليق من الكود:

```typescript
// قبل التعديل (معطل)
/*
if (isAdminPage || isPortalPage) {
  if (!isAuth && !isAuthPage) {
    return Response.redirect(new URL('/ar/portal/login', req.nextUrl));
  }
}
*/

// بعد التعديل (مفعّل)
if (isAdminPage || isPortalPage) {
  if (!isAuth && !isAuthPage) {
    return Response.redirect(new URL('/ar/portal/login', req.nextUrl));
  }
}
```

3. احذف السطر:
```typescript
if (isAdminPage) {
  return;
}
```

---

## 👥 إنشاء مستخدمين إضافيين

### عبر Prisma Studio:
```bash
npx prisma studio
```

ثم:
1. افتح جدول `User`
2. اضغط `Add record`
3. املأ البيانات:
   - email: البريد الإلكتروني
   - password: استخدم bcrypt hash (يمكن استخدام: https://bcrypt-generator.com/)
   - name: الاسم
   - role: اختر من (ADMIN, STAFF, STUDENT, PARENT)

### عبر Script:
عدّل `scripts/create-admin.ts` وغيّر البيانات ثم شغّل:
```bash
npm run create-admin
```

---

## 🔑 تغيير كلمة المرور

### الطريقة 1: عبر Prisma Studio
```bash
npx prisma studio
```
ثم عدّل حقل `password` بـ hash جديد

### الطريقة 2: عبر bcrypt
```typescript
import bcrypt from 'bcryptjs'
const hash = await bcrypt.hash('new-password', 10)
console.log(hash)
```

---

## ⚠️ ملاحظات أمنية

1. ✅ غيّر كلمة المرور الافتراضية في Production
2. ✅ فعّل الحماية في `middleware.ts` قبل النشر
3. ✅ استخدم HTTPS في Production
4. ✅ لا تشارك بيانات الدخول
5. ✅ استخدم كلمات مرور قوية

---

## 🎉 جاهز!

يمكنك الآن الوصول للوحة التحكم والبدء في التطوير!

**الخطوة التالية:** ابدأ بربط البيانات الحقيقية في الصفحات
