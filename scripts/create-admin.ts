import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Creating admin user...')

  // تشفير كلمة المرور
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // إنشاء المستخدم
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tajschools.com' },
    update: {},
    create: {
      email: 'admin@tajschools.com',
      password: hashedPassword,
      name: 'المدير العام',
      role: 'ADMIN',
      emailVerified: new Date()
    }
  })

  console.log('✅ Admin user created successfully!')
  console.log('📧 Email:', admin.email)
  console.log('🔑 Password: admin123')
  console.log('🎯 Role:', admin.role)
  console.log('\n🚀 You can now login at: http://localhost:3000/ar/portal/login')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
