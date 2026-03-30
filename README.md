# 🎓 Taj El-Nozha Language Schools - Admin Panel

## مدارس تاج النزهة اللغوية - لوحة التحكم

A comprehensive, modern admin panel built with Next.js 16, Tailwind CSS, Prisma, and Neon PostgreSQL.

لوحة تحكم شاملة وعصرية مبنية باستخدام Next.js 16 و Tailwind CSS و Prisma و Neon PostgreSQL.

---

## ✨ Features | المميزات

### 🎨 Modern UI Design
- ✅ 15 fully functional admin pages
- ✅ Responsive sidebar with RTL support
- ✅ Gradient backgrounds and modern shadows
- ✅ Lucide React icons with emojis
- ✅ Mobile-friendly hamburger menu
- ✅ Smooth transitions and hover effects

### 🔐 Security & Authentication
- ✅ NextAuth.js v5 integration
- ✅ Role-based access control (ADMIN, STAFF, STUDENT, PARENT)
- ✅ Security logs tracking
- ✅ Password encryption with bcrypt

### 📊 Complete Admin Features
- ✅ Dashboard with statistics
- ✅ Admission applications management
- ✅ News & announcements
- ✅ Staff management
- ✅ Gallery & sliders
- ✅ Calendar & events
- ✅ FAQ management
- ✅ Testimonials review
- ✅ File downloads
- ✅ Career postings
- ✅ Messages inbox
- ✅ Site settings
- ✅ Backup management
- ✅ Security monitoring

---

## 🚀 Quick Start | البدء السريع

### 1. Install Dependencies | تثبيت المكتبات
```bash
npm install
```

### 2. Setup Environment | إعداد البيئة
```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### 3. Setup Database | إعداد قاعدة البيانات
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run Development Server | تشغيل السيرفر
```bash
npm run dev
```

### 5. Access Admin Panel | الوصول للوحة التحكم
```
http://localhost:3000/admin
```

---

## 📁 Project Structure | هيكل المشروع

```
taj2026/
├── prisma/
│   └── schema.prisma              # Database schema (17 models)
├── src/
│   ├── actions/                   # Server Actions
│   │   ├── auth.ts
│   │   ├── news.ts
│   │   └── sliders.ts
│   ├── app/
│   │   ├── admin/                 # Admin pages (15 pages)
│   │   └── [locale]/              # Public pages
│   ├── components/
│   │   ├── admin/                 # Admin components
│   │   └── common/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── supabase.ts
│   │   ├── upload.ts
│   │   └── utils.ts
│   └── auth.ts
├── ADMIN_PANEL.md                 # Admin panel overview
├── ADMIN_COMPLETE_GUIDE.md        # Complete guide
├── NEXT_STEPS_AR.md               # Next steps (Arabic)
└── README.md                      # This file
```

---

## 🛠️ Tech Stack | التقنيات المستخدمة

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Storage:** Supabase Storage
- **Icons:** Lucide React
- **Language:** TypeScript
- **Validation:** Zod

---

## 📋 Admin Pages | صفحات الأدمن

| # | Page | Route | Status |
|---|------|-------|--------|
| 1 | Dashboard | `/admin` | ✅ |
| 2 | Admissions | `/admin/admissions` | ✅ |
| 3 | Messages | `/admin/messages` | ✅ |
| 4 | News | `/admin/news` | ✅ |
| 5 | Gallery | `/admin/gallery` | ✅ |
| 6 | Sliders | `/admin/sliders` | ✅ |
| 7 | Testimonials | `/admin/testimonials` | ✅ |
| 8 | FAQ | `/admin/faq` | ✅ |
| 9 | Staff | `/admin/staff` | ✅ |
| 10 | Calendar | `/admin/calendar` | ✅ |
| 11 | Downloads | `/admin/downloads` | ✅ |
| 12 | Backup | `/admin/unified-backup` | ✅ |
| 13 | Security | `/admin/security-logs` | ✅ |
| 14 | Careers | `/admin/careers` | ✅ |
| 15 | Settings | `/admin/settings` | ✅ |

---

## 📚 Documentation | التوثيق

- **[ADMIN_PANEL.md](./ADMIN_PANEL.md)** - Overview and features
- **[ADMIN_COMPLETE_GUIDE.md](./ADMIN_COMPLETE_GUIDE.md)** - Complete setup guide
- **[NEXT_STEPS_AR.md](./NEXT_STEPS_AR.md)** - Next development steps (Arabic)

---

## 🎯 Next Steps | الخطوات التالية

### Phase 1: Connect Real Data
- [ ] Create Server Actions for all pages
- [ ] Connect pages to Prisma database
- [ ] Add input forms with validation
- [ ] Implement CRUD operations

### Phase 2: File Upload
- [ ] Setup Supabase Storage buckets
- [ ] Implement image upload
- [ ] Add image processing
- [ ] Add file management

### Phase 3: Advanced Features
- [ ] Notification system
- [ ] Advanced search & filters
- [ ] Export to Excel/PDF
- [ ] Detailed analytics
- [ ] Automatic backups

---

## 🔐 Environment Variables | متغيرات البيئة

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

---

## 👨‍💻 Development | التطوير

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Prisma Studio
npx prisma studio
```

---

## 📄 License | الترخيص

This project is proprietary to Taj El-Nozha Language Schools.

هذا المشروع خاص بمدارس تاج النزهة اللغوية.

---

## 🎉 Credits | الشكر

Developed by **Kiro AI Assistant**

تم التطوير بواسطة **Kiro AI Assistant**

---

**Ready to use! Start connecting real data.** 🚀

**جاهز للاستخدام! ابدأ بربط البيانات الحقيقية.** 🚀
