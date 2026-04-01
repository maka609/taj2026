import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Global Settings...')

  const settings = [
    {
      key: 'general',
      value: {
        siteNameAr: 'مدارس تاج النزهة الحديثة',
        siteNameEn: 'Taj El-Nozha Modern Schools',
        logoUrl: '/logo.png',
        faviconUrl: '/favicon.ico',
        primaryColor: '#7c3aed', // Deep Purple
        secondaryColor: '#ea580c', // Vibrant Orange
        gpcEnabled: true,
      },
    },
    {
      key: 'academic',
      value: {
        registrationStatus: 'open', // open, closed, coming_soon
        currentSemester: 'First 2026/2027',
      },
    },
    {
      key: 'social',
      value: {
        facebook: 'https://facebook.com/taj-schools',
        instagram: 'https://instagram.com/taj-schools',
        youtube: 'https://youtube.com/taj-schools',
        twitter: 'https://twitter.com/taj-schools',
      },
    },
    {
      key: 'seo',
      value: {
        organizationName: 'مدارس تاج النزهة اللغوية',
        description: 'مؤسسة تعليمية رائدة تقدم تعليماً متميزاً وفق أحدث المعايير العالمية.',
        schema: {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Taj El-Nozha Language Schools",
          "url": "https://taj-schools.com",
          "logo": "https://taj-schools.com/logo.png",
          "sameAs": [
            "https://facebook.com/taj-schools",
            "https://instagram.com/taj-schools"
          ]
        }
      },
    },
    {
        key: 'contact',
        value: {
            email: 'info@taj-schools.com',
            phone: '+20123456789',
            addressAr: 'القاهرة، مصر',
            addressEn: 'Cairo, Egypt',
        }
    }
  ]

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    })
  }

  console.log('✅ Settings seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
