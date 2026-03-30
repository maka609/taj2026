"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BookOpen, Users, Calendar, Download } from 'lucide-react';
import SplashScreen from '@/components/common/SplashScreen';

export default function HomePage() {
  const t = useTranslations('Navigation');
  const common = useTranslations('Common');

  return (
    <>
      <SplashScreen />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <main className="pt-20">
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
          <div className="absolute inset-0 opacity-40">
             {/* Use generate_image for real images later, placeholder for now */}
            <div className="w-full h-full bg-gradient-to-tr from-primary to-blue-900" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-5xl lg:text-7xl font-extrabold mb-6 animate-fade-in tracking-tight">
              {common('welcome')}
            </h2>
            <p className="text-xl lg:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              مكان تبدأ فيه أحلام أولادكم بالنمو والتفوق في بيئة تعليمية متطورة
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="/ar/admission" 
                className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                {t('admission')}
              </Link>
              <Link 
                href="/ar/about" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                {t('about')}
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, title: t('news'), href: '/ar/news', color: 'bg-blue-500' },
                { icon: Calendar, title: t('calendar'), href: '/ar/calendar', color: 'bg-emerald-500' },
                { icon: Download, title: t('downloads'), href: '/ar/downloads', color: 'bg-amber-500' },
                { icon: Users, title: t('staff'), href: '/ar/staff', color: 'bg-indigo-500' },
              ].map((item, id) => (
                <Link 
                  key={id}
                  href={item.href}
                  className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">استكشف المزيد من التفاصيل والمعلومات المهمة</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
