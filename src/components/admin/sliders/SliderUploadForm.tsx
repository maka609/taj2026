'use client'

import React, { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadImage } from '@/lib/upload'
import { createSlider } from '@/actions/sliders'

interface SliderUploadFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function SliderUploadForm({ onSuccess, onCancel }: SliderUploadFormProps) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    link: '',
    order: 0,
    active: true
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      setError('الرجاء اختيار صورة')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // رفع الصورة
      const imageUrl = await uploadImage(file, 'sliders')
      
      // حفظ البيانات في قاعدة البيانات
      const result = await createSlider({
        imageUrl,
        ...formData
      })

      if (result.success) {
        alert('تم إضافة السلايدر بنجاح')
        onSuccess?.()
      } else {
        setError(result.error || 'حدث خطأ')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('فشل في رفع الصورة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {/* رسالة خطأ */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* معاينة الصورة */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الصورة
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null)
                  setFile(null)
                }}
                className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">اضغط لاختيار صورة</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (حد أقصى 5MB)</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* العنوان بالعربي */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          العنوان (عربي) - اختياري
        </label>
        <input
          type="text"
          value={formData.titleAr}
          onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="مثال: مرحباً بكم في مدارس تاج النزهة"
        />
      </div>

      {/* العنوان بالإنجليزي */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          العنوان (English) - اختياري
        </label>
        <input
          type="text"
          value={formData.titleEn}
          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Example: Welcome to Taj El-Nozha Schools"
        />
      </div>

      {/* الرابط */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الرابط - اختياري
        </label>
        <input
          type="url"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://example.com"
        />
      </div>

      {/* الترتيب */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الترتيب
        </label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* نشط */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="active"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
        />
        <label htmlFor="active" className="text-sm font-medium text-gray-700">
          نشط (سيظهر في الموقع)
        </label>
      </div>

      {/* الأزرار */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'جاري الرفع...' : 'إضافة السلايدر'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            إلغاء
          </button>
        )}
      </div>
    </form>
  )
}
