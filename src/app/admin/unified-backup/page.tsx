'use client'

import { Download, Database, Clock } from "lucide-react";

export default function UnifiedBackupPage() {
  const handleCreateBackup = () => {
    alert('سيتم إنشاء نسخة احتياطية قريباً');
  };

  const handleDownloadBackup = (label: string) => {
    alert(`تحميل: ${label}`);
  };
  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">النسخ الاحتياطي 💾</h1>
        <p className="text-gray-500 mt-2">إدارة النسخ الاحتياطية لقاعدة البيانات</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <button 
          onClick={handleCreateBackup}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <Database className="w-5 h-5" />
          إنشاء نسخة احتياطية جديدة
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900">النسخ الاحتياطي التلقائي</p>
            <p className="text-sm text-blue-700">يتم إنشاء نسخة احتياطية تلقائياً كل يوم في الساعة 2:00 صباحاً</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: "نسخة احتياطية تلقائية", date: "2026/03/30 02:00", size: "45 MB", type: "auto" },
          { label: "نسخة احتياطية يدوية", date: "2026/03/29 14:30", size: "44 MB", type: "manual" },
          { label: "نسخة احتياطية تلقائية", date: "2026/03/29 02:00", size: "44 MB", type: "auto" },
        ].map((backup, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{backup.label}</p>
                <p className="text-sm text-gray-500">{backup.date} • {backup.size}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDownloadBackup(backup.label)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              <Download className="w-4 h-4" />
              تحميل
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
