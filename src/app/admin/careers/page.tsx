'use client'

import { Plus, Eye } from "lucide-react";

export default function CareersPage() {
  const handleAddJob = () => {
    alert('سيتم إضافة نموذج إضافة وظيفة قريباً');
  };

  const handleViewApplications = (jobTitle: string) => {
    alert(`عرض طلبات التوظيف لوظيفة: ${jobTitle}`);
  };
  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">التوظيف والوظائف 💼</h1>
        <p className="text-gray-500 mt-2">إدارة الوظائف المتاحة وطلبات التوظيف</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <button 
          onClick={handleAddJob}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <Plus className="w-5 h-5" />
          إضافة وظيفة جديدة
        </button>
      </div>

      <div className="space-y-4">
        {[
          { title: "معلم لغة عربية", dept: "اللغات", applications: 12, active: true },
          { title: "معلم رياضيات", dept: "العلوم", applications: 8, active: true },
          { title: "مشرف أنشطة", dept: "الأنشطة", applications: 5, active: false },
        ].map((job, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.dept} • {job.applications} طلب</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${job.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                  {job.active ? "نشط" : "مغلق"}
                </span>
                <button 
                  onClick={() => handleViewApplications(job.title)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  <Eye className="w-4 h-4" />
                  عرض الطلبات
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
