'use client'

import { Upload, X } from "lucide-react";
import { getDocuments, createDocument } from "@/actions/downloads";
import DownloadsClient from "@/components/admin/downloads/DownloadsClient";
import { useEffect, useState } from "react";

export default function DownloadsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    category: '',
    fileUrl: '',
    fileSize: 0
  });

  useEffect(() => {
    async function loadData() {
      const { data } = await getDocuments();
      setDocuments(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleUpload = () => {
    setShowModal(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // التحقق من حجم الملف
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('حجم الملف يجب أن يكون أقل من 10 ميجابايت');
      return;
    }

    setUploading(true);
    try {
      // رفع الملف على Supabase
      const { supabase } = await import('@/lib/supabase');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('فشل في رفع الملف. تأكد من إنشاء bucket باسم "documents" في Supabase');
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      setFormData(prev => ({
        ...prev,
        fileUrl: urlData.publicUrl,
        fileSize: file.size
      }));
      
      alert('تم رفع الملف بنجاح!');
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء رفع الملف');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form data before validation:', formData);
    
    // التحقق من البيانات
    if (!formData.titleAr || formData.titleAr.length < 3) {
      alert('العنوان بالعربي يجب أن يكون 3 أحرف على الأقل');
      return;
    }
    if (!formData.titleEn || formData.titleEn.length < 3) {
      alert('العنوان بالإنجليزي يجب أن يكون 3 أحرف على الأقل');
      return;
    }
    if (!formData.category) {
      alert('يرجى اختيار التصنيف');
      return;
    }
    if (!formData.fileUrl) {
      alert('يرجى رفع الملف أولاً');
      return;
    }

    console.log('Sending data to server:', formData);
    setUploading(true);
    const result = await createDocument(formData);
    console.log('Server response:', result);
    
    if (result.success) {
      // إعادة تحميل البيانات من قاعدة البيانات
      const { data: updatedDocuments } = await getDocuments();
      setDocuments(updatedDocuments || []);
      
      setShowModal(false);
      setFormData({ titleAr: '', titleEn: '', category: '', fileUrl: '', fileSize: 0 });
      alert('تم إضافة الملف بنجاح! ✅');
    } else {
      alert(result.error || 'فشل في الإضافة');
    }
    setUploading(false);
  };

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">الملفات والتحميلات 📥</h1>
        <p className="text-gray-500 mt-2">إدارة الملفات والمستندات المتاحة للتحميل</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <button 
          onClick={handleUpload}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <Upload className="w-5 h-5" />
          رفع ملف جديد
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">جاري التحميل...</p>
        </div>
      ) : (
        <DownloadsClient initialData={documents} />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">رفع ملف جديد</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* زر اختبار */}
              <button
                type="button"
                onClick={() => {
                  console.log('Current formData:', formData);
                  alert(JSON.stringify(formData, null, 2));
                }}
                className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
              >
                🔍 اختبار البيانات (للتطوير)
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان (عربي) *</label>
                <input
                  type="text"
                  name="titleAr"
                  value={formData.titleAr}
                  onChange={(e) => {
                    console.log('titleAr changed:', e.target.value);
                    setFormData({ ...formData, titleAr: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="مثال: جدول الحصص"
                  required
                  minLength={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان (English) *</label>
                <input
                  type="text"
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={(e) => {
                    console.log('titleEn changed:', e.target.value);
                    setFormData({ ...formData, titleEn: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Example: Class Schedule"
                  required
                  minLength={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التصنيف</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">اختر التصنيف</option>
                  <option value="الجداول الدراسية">الجداول الدراسية</option>
                  <option value="المتطلبات المدرسية">المتطلبات المدرسية</option>
                  <option value="سياسات المدرسة">سياسات المدرسة</option>
                  <option value="نماذج وأوراق">نماذج وأوراق</option>
                  <option value="التقويم المدرسي">التقويم المدرسي</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الملف *</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
                {uploading && (
                  <p className="text-sm text-blue-600 mt-2">⏳ جاري رفع الملف...</p>
                )}
                {formData.fileUrl && !uploading && (
                  <p className="text-sm text-green-600 mt-2">✓ تم رفع الملف بنجاح!</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading || !formData.fileUrl}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'جاري الحفظ...' : 'حفظ الملف'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={uploading}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
