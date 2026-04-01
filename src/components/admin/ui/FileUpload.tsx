'use client'

import { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { uploadFile } from '@/lib/upload';

interface FileUploadProps {
  bucket: string;
  onUploadComplete: (url: string, fileName: string, fileSize: number) => void;
  currentFile?: string;
  label?: string;
  accept?: string;
}

export default function FileUpload({ 
  bucket, 
  onUploadComplete, 
  currentFile,
  label = "رفع ملف",
  accept = ".pdf,.doc,.docx,.xls,.xlsx"
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(currentFile || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // التحقق من حجم الملف (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('حجم الملف يجب أن يكون أقل من 10 ميجابايت');
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setError(null);

    try {
      const { url, size } = await uploadFile(file, bucket);
      onUploadComplete(url, file.name, size);
      setError(null);
    } catch (err: any) {
      console.error('File Upload Error:', err);
      setError(err.message || 'فشل في رفع الملف');
      setFileName(currentFile || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {fileName ? (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">{fileName}</p>
              <p className="text-xs text-gray-500">ملف مرفوع</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition"
        >
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-3"></div>
              <p className="text-gray-600">جاري الرفع...</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-600 mb-1">اضغط لاختيار ملف</p>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX, XLS, XLSX (حد أقصى 10MB)</p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
