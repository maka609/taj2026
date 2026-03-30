"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Download, FileText, FileArchive, Search, LayoutGrid } from "lucide-react";
import { useParams } from "next/navigation";
import { getDocuments } from "@/actions/downloads";

export default function DownloadsPage() {
  const t = useTranslations("Navigation");
  const params = useParams();
  const locale = params.locale as string;
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data } = await getDocuments();
      setDocuments(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleDownload = (file: any) => {
    if (file.fileUrl) {
      window.open(file.fileUrl, '_blank');
    } else {
      alert(`جاري تحميل: ${file.titleAr || file.title}\n\nملاحظة: لتفعيل التحميل الفعلي، يرجى:\n1. رفع الملفات على Supabase Storage\n2. ربط الملفات بقاعدة البيانات\n3. تحديث روابط الملفات`);
    }
  };

  const handleContactClick = () => {
    window.location.href = `/${locale}/contact`;
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            <div className="flex items-center gap-3 text-primary mb-4 font-bold tracking-wide">
              <Download className="w-6 h-6 border-2 border-primary rounded-md p-0.5" />
              <span>{locale === 'ar' ? 'مركز التحميلات والملفات' : 'Downloads Center'}</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t("downloads")}</h1>
            <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
              {locale === 'ar' 
                ? 'بإمكان أولياء الأمور والطلاب تحميل كافة الملفات، الجداول، والمستندات الهامة من هنا.'
                : 'Parents and students can download all files, schedules, and important documents from here.'}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="relative group w-full lg:w-80">
              <input 
                type="text" 
                placeholder={locale === 'ar' ? 'ابحث عن ملف...' : 'Search for a file...'}
                className="w-full px-12 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
              />
              <Search className={`absolute ${locale === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4`} />
            </div>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"><LayoutGrid className="w-5 h-5 text-gray-500" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">جاري التحميل...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">لا توجد ملفات متاحة حالياً</p>
            </div>
          ) : (
            documents.map((file) => (
              <div key={file.id} className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex items-center justify-between hover:scale-[1.02] duration-300">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-gray-900 truncate max-w-[300px] lg:max-w-[400px]">
                      {locale === 'ar' ? file.titleAr : file.titleEn}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{file.category}</span>
                      <span className="flex items-center gap-1">
                        <FileArchive className="w-3 h-3" /> 
                        {file.fileSize ? `${(file.fileSize / 1024 / 1024).toFixed(1)} MB` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownload(file)}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-2xl transition-all shadow-sm group-hover:shadow-lg active:scale-90"
                >
                  <Download className="w-6 h-6" />
                  <span className="text-[10px] font-bold">
                    {locale === 'ar' ? 'تحميل الآن' : 'Download'}
                  </span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-20 p-12 bg-white rounded-[3rem] text-center shadow-xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
              {locale === 'ar' ? 'هل تبحث عن ملف آخر؟' : 'Looking for another file?'}
            </h3>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
              {locale === 'ar'
                ? 'إذا كنت بحاجة إلى أي مستند أو جدول غير متوفر هنا، يرجى التواصل مع إدارة المدرسة مباشرة أو عبر صفحتنا على مواقع التواصل الاجتماعي.'
                : 'If you need any document or schedule not available here, please contact the school administration directly or through our social media pages.'}
            </p>
            <button 
              onClick={handleContactClick}
              className="px-12 py-5 bg-primary text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl shadow-primary/20"
            >
              {locale === 'ar' ? 'تواصل مع الإدارة 📧' : 'Contact Administration 📧'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
