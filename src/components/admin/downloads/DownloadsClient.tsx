'use client'

import React, { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { deleteDocument } from "@/actions/downloads";

interface Document {
  id: string;
  titleAr: string;
  titleEn: string;
  fileUrl: string;
  category: string;
  fileSize: number | null;
}

export default function DownloadsClient({ initialData }: { initialData: Document[] }) {
  const [documents, setDocuments] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    
    setLoading(id);
    const result = await deleteDocument(id);
    if (result.success) {
      setDocuments(documents.filter(d => d.id !== id));
    }
    setLoading(null);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'غير معروف';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">لا توجد ملفات</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((file) => (
        <div key={file.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{file.titleAr}</p>
              <p className="text-sm text-gray-500">
                {file.category} • {formatFileSize(file.fileSize)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={file.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm"
            >
              تحميل
            </a>
            <button 
              onClick={() => handleDelete(file.id)}
              disabled={loading === file.id}
              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
