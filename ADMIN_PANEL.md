# لوحة التحكم - مدارس تاج النزهة اللغوية
# Admin Panel - Taj El-Nozha Language Schools

## 📋 نظرة عامة | Overview

لوحة تحكم شاملة لإدارة جميع جوانب الموقع الإلكتروني للمدرسة، مبنية باستخدام Next.js 16 و Tailwind CSS و Prisma مع قاعدة بيانات Neon PostgreSQL.

A comprehensive admin panel to manage all aspects of the school website, built with Next.js 16, Tailwind CSS, and Prisma with Neon PostgreSQL.

---

## 🎯 الصفحات المتاحة | Available Pages

### ✅ تم الإنشاء | Completed

| الرقم | الصفحة | المسار | الوصف |
|------|--------|--------|-------|
| 1 | لوحة الإحصائيات | `/admin` | عرض الإحصائيات والبيانات الرئيسية |
| 2 | طلبات القبول | `/admin/admissions` | إدارة طلبات قبول الطلاب الجدد |
| 3 | الرسائل | `/admin/messages` | عرض وإدارة رسائل التواصل |
| 4 | الأخبار | `/admin/news` | إدارة الأخبار والإعلانات |
| 5 | مكتبة الصور | `/admin/gallery` | إدارة صور الأنشطة والفعاليات |
| 6 | صور الصفحة الرئيسية | `/admin/sliders` | إدارة السلايدر الرئيسي |
| 7 | آراء أولياء الأمور | `/admin/testimonials` | مراجعة ونشر التقييمات |
| 8 | الأسئلة الشائعة | `/admin/faq` | إدارة الأسئلة والأجوبة |
| 9 | الكادر التعليمي | `/admin/staff` | إدارة بيانات المعلمين |
| 10 | التقويم والأحداث | `/admin/calendar` | إدارة الفعاليات المدرسية |
| 11 | الملفات والتحميلات | `/admin/downloads` | إدارة الملفات المتاحة للتحميل |
| 12 | النسخ الاحتياطي | `/admin/unified-backup` | إدارة النسخ الاحتياطية |
| 13 | المراقبة الأمنية | `/admin/security-logs` | سجل الأنشطة الأمنية |
| 14 | التوظيف والوظائف | `/admin/careers` | إدارة الوظائف وطلبات التوظيف |
| 15 | إعدادات الموقع | `/admin/settings` | الإعدادات العامة للموقع |

---

## 🎨 المميزات | Features

### التصميم | Design
- ✅ واجهة مستخدم عصرية وسهلة الاستخدام
- ✅ دعم كامل للغة العربية (RTL)
- ✅ تصميم متجاوب لجميع الأجهزة
- ✅ ألوان متدرجة وظلال حديثة
- ✅ أيقونات من Lucide React
- ✅ رموز تعبيرية (Emojis) لسهولة التعرف

### الوظائف | Functionality
- ✅ نظام تسجيل دخول آمن (NextAuth.js)
- ✅ إدارة الصلاحيات (Role-based Access)
- ✅ سجل الأنشطة الأمنية
- ✅ نظام النسخ الاحتياطي
- ✅ دعم ثنائي اللغة (عربي/إنجليزي)

---

## 🗄️ قاعدة البيانات | Database Schema

### النماذج الرئيسية | Main Models

```prisma
- User (المستخدمون)
- News (الأخبار)
- Event (الأحداث)
- Document (المستندات)
- Staff (الكادر التعليمي)
- Testimonial (التقييمات)
- FAQ (الأسئلة الشائعة)
- Slider (السلايدر)
- GalleryImage (مكتبة الصور)
- AdmissionApplication (طلبات القبول)
- Career (الوظائف)
- JobApplication (طلبات التوظيف)
- Message (الرسائل)
- SiteSetting (إعدادات الموقع)
- SecurityLog (السجل الأمني)
- Backup (النسخ الاحتياطية)
```

---

## 🚀 البدء | Getting Started

### 1. تثبيت المتطلبات | Install Dependencies
```bash
npm install
```

### 2. إعداد قاعدة البيانات | Setup Database
```bash
# إنشاء الجداول
npx prisma migrate dev --name init

# توليد Prisma Client
npx prisma generate
```

### 3. تشغيل المشروع | Run Development Server
```bash
npm run dev
```

### 4. الوصول للوحة التحكم | Access Admin Panel
```
http://localhost:3000/admin
```

---

## 🔐 الأمان | Security

- ✅ مصادقة آمنة باستخدام NextAuth.js
- ✅ تشفير كلمات المرور (bcrypt)
- ✅ سجل الأنشطة الأمنية
- ✅ حماية المسارات (Middleware)
- ✅ التحقق من الصلاحيات

---

## 📱 التصميم المتجاوب | Responsive Design

- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1919px)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)

---

## 🎯 الخطوات التالية | Next Steps

### المرحلة 1: ربط البيانات الحقيقية
- [ ] ربط الصفحات بـ Prisma
- [ ] إنشاء Server Actions
- [ ] إضافة نماذج الإدخال
- [ ] التحقق من البيانات (Zod)

### المرحلة 2: رفع الملفات
- [ ] إعداد Supabase Storage
- [ ] رفع الصور
- [ ] رفع المستندات
- [ ] معالجة الصور

### المرحلة 3: الميزات المتقدمة
- [ ] نظام الإشعارات
- [ ] التصدير إلى Excel/PDF
- [ ] البحث المتقدم
- [ ] الفلترة والترتيب

---

## 📦 التقنيات المستخدمة | Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Icons:** Lucide React
- **Language:** TypeScript

---

## 👨‍💻 المطور | Developer

تم التطوير بواسطة Kiro AI Assistant
Developed by Kiro AI Assistant

---

## 📄 الترخيص | License

هذا المشروع خاص بمدارس تاج النزهة اللغوية
This project is proprietary to Taj El-Nozha Language Schools
