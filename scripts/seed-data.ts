import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // إضافة أخبار تجريبية
  console.log('📰 Adding news...')
  await prisma.news.createMany({
    data: [
      {
        titleAr: 'بدء التسجيل للعام الدراسي 2026/2027',
        titleEn: 'Registration Opens for 2026/2027',
        contentAr: 'يسرنا أن نعلن عن بدء التسجيل للعام الدراسي الجديد',
        contentEn: 'We are pleased to announce registration for the new academic year',
        slug: 'registration-2026-2027',
      },
      {
        titleAr: 'نتائج امتحانات الفصل الأول',
        titleEn: 'First Semester Results',
        contentAr: 'تم الإعلان عن نتائج امتحانات الفصل الدراسي الأول',
        contentEn: 'First semester exam results have been announced',
        slug: 'first-semester-results',
      },
    ],
    skipDuplicates: true,
  })

  // إضافة كادر تعليمي
  console.log('👨‍🏫 Adding staff...')
  await prisma.staff.createMany({
    data: [
      {
        nameAr: 'د. أحمد محمد',
        nameEn: 'Dr. Ahmed Mohamed',
        roleAr: 'مدير المدرسة',
        roleEn: 'School Principal',
        department: 'الإدارة',
        order: 1,
      },
      {
        nameAr: 'أ. فاطمة علي',
        nameEn: 'Ms. Fatma Ali',
        roleAr: 'معلمة لغة عربية',
        roleEn: 'Arabic Teacher',
        department: 'اللغات',
        order: 2,
      },
      {
        nameAr: 'أ. محمود حسن',
        nameEn: 'Mr. Mahmoud Hassan',
        roleAr: 'معلم رياضيات',
        roleEn: 'Math Teacher',
        department: 'العلوم',
        order: 3,
      },
    ],
    skipDuplicates: true,
  })

  // إضافة طلبات قبول
  console.log('📝 Adding admissions...')
  await prisma.admissionApplication.createMany({
    data: [
      {
        studentNameAr: 'أحمد محمد علي',
        studentNameEn: 'Ahmed Mohamed Ali',
        gradeApplying: 'الصف الأول الابتدائي',
        dateOfBirth: new Date('2019-05-15'),
        gender: 'ذكر',
        parentEmail: 'parent1@example.com',
        parentPhone: '01234567890',
        status: 'PENDING',
      },
      {
        studentNameAr: 'فاطمة أحمد',
        studentNameEn: 'Fatma Ahmed',
        gradeApplying: 'الصف الثاني الابتدائي',
        dateOfBirth: new Date('2018-08-20'),
        gender: 'أنثى',
        parentEmail: 'parent2@example.com',
        parentPhone: '01234567891',
        status: 'REVIEWING',
      },
      {
        studentNameAr: 'محمد خالد',
        studentNameEn: 'Mohamed Khaled',
        gradeApplying: 'الصف الثالث الابتدائي',
        dateOfBirth: new Date('2017-03-10'),
        gender: 'ذكر',
        parentEmail: 'parent3@example.com',
        parentPhone: '01234567892',
        status: 'APPROVED',
      },
    ],
    skipDuplicates: true,
  })

  // إضافة رسائل
  console.log('💬 Adding messages...')
  await prisma.message.createMany({
    data: [
      {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '01234567890',
        subject: 'استفسار عن المصروفات',
        message: 'أود الاستفسار عن المصروفات الدراسية للعام القادم',
        read: false,
      },
      {
        name: 'فاطمة علي',
        email: 'fatma@example.com',
        phone: '01234567891',
        subject: 'طلب موعد لزيارة المدرسة',
        message: 'أرغب في حجز موعد لزيارة المدرسة والاطلاع على المرافق',
        read: false,
      },
    ],
    skipDuplicates: true,
  })

  // إضافة أسئلة شائعة
  console.log('❓ Adding FAQs...')
  await prisma.fAQ.createMany({
    data: [
      {
        questionAr: 'ما هي مواعيد التسجيل للعام الدراسي الجديد؟',
        questionEn: 'What are the registration dates for the new academic year?',
        answerAr: 'يبدأ التسجيل من 1 يونيو حتى 31 أغسطس من كل عام',
        answerEn: 'Registration starts from June 1st to August 31st every year',
        order: 1,
      },
      {
        questionAr: 'هل توفر المدرسة خدمة النقل المدرسي؟',
        questionEn: 'Does the school provide transportation?',
        answerAr: 'نعم، نوفر خدمة النقل المدرسي لجميع المناطق المحيطة',
        answerEn: 'Yes, we provide school transportation for all surrounding areas',
        order: 2,
      },
    ],
    skipDuplicates: true,
  })

  // إضافة أحداث
  console.log('📅 Adding events...')
  await prisma.event.createMany({
    data: [
      {
        titleAr: 'بداية العام الدراسي',
        titleEn: 'Start of Academic Year',
        startDate: new Date('2026-09-01'),
        color: '#3b82f6',
      },
      {
        titleAr: 'اجتماع أولياء الأمور',
        titleEn: 'Parents Meeting',
        startDate: new Date('2026-09-15'),
        color: '#10b981',
      },
    ],
    skipDuplicates: true,
  })

  // إضافة تقييمات
  console.log('⭐ Adding testimonials...')
  await prisma.testimonial.createMany({
    data: [
      {
        parentName: 'أحمد محمد',
        contentAr: 'مدرسة ممتازة والكادر التعليمي محترف جداً',
        contentEn: 'Excellent school with very professional staff',
        rating: 5,
        approved: true,
      },
      {
        parentName: 'فاطمة علي',
        contentAr: 'أفضل مدرسة في المنطقة، ابني سعيد جداً',
        contentEn: 'Best school in the area, my son is very happy',
        rating: 5,
        approved: false,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
