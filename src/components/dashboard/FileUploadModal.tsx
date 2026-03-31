"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  Loader2,
  FileCheck,
  FileWarning,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

interface UploadFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  type: string;
}

const dummyFiles: UploadFile[] = [
  { id: "1", name: "Lesson 1 Physics.pdf", size: "2.4 MB", progress: 100, status: "completed", type: "pdf" },
  { id: "2", name: "Math Assignment 2.png", size: "500 KB", progress: 14, status: "uploading", type: "image" },
  { id: "3", name: "Exercise_Chemistry.zip", size: "12 MB", progress: 100, status: "completed", type: "zip" },
];

export default function FileUploadModal({ isOpen, onClose, locale }: FileUploadModalProps) {
  const [files, setFiles] = useState<UploadFile[]>(dummyFiles);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRtl = locale === "ar";

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10" dir={isRtl ? "rtl" : "ltr"}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-4xl bg-white rounded-[3.5rem] shadow-4xl overflow-hidden border border-white/20 p-8 sm:p-16"
          >
            <button
              onClick={onClose}
              aria-label={isRtl ? "إغلاق" : "Close"}
              className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-5xl font-black text-deep-navy tracking-tight">
                  {isRtl ? "تسليم الواجب" : "Assignment Submission"}
                </h2>
                <p className="text-lg text-gray-500 font-bold max-w-xl mx-auto">
                   {isRtl ? "Math Assignment | Lesson 2" : "Math Assignment | Lesson 2"}
                </p>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "relative aspect-[3/1] min-h-[240px] rounded-[3rem] border-4 border-dashed transition-all duration-500 flex flex-col items-center justify-center gap-6 cursor-pointer group",
                  isDragging
                    ? "bg-primary/5 border-primary scale-[1.02]"
                    : "bg-slate-50/50 border-gray-100 hover:bg-white hover:border-primary/20 hover:shadow-2xl hover:shadow-gray-200/50"
                )}
              >
                <input type="file" className="hidden" ref={fileInputRef} multiple />
                <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                   <UploadCloud className="w-12 h-12" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xl font-black text-deep-navy">{isRtl ? "اضغط أو اسحب الملفات هنا للتحميل" : "Click or drag files here to upload"}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{isRtl ? "الأنواع المسموح بها: JPG, PNG, SVG, ZIP, PDF" : "Allowed: JPG, PNG, SVG, ZIP, PDF"}</p>
                </div>
              </div>

              {/* Files List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {files.map((file) => (
                    <div key={file.id} className="relative group card-premium p-6 flex flex-col items-center text-center gap-4 bg-gray-50/30 overflow-hidden">
                        <div className="relative w-20 h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-gray-100">
                             <FileText className={cn("w-10 h-10", file.status === "uploading" ? "text-gray-200" : "text-primary")} />

                             {file.status === "uploading" && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                     <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                </div>
                             )}
                        </div>

                        <div className="w-full space-y-1">
                             <p className="text-sm font-black text-deep-navy truncate max-w-full px-2">{file.name}</p>
                             <p className="text-[10px] font-bold text-gray-400">{file.size}</p>
                        </div>

                        {file.status === "uploading" && (
                             <div className="w-full space-y-2">
                                <div className="flex justify-between items-center text-[9px] font-black uppercase text-primary">
                                    <span>Uploading...</span>
                                    <span>{file.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-primary" style={{ width: `${file.progress}%` }} />
                                </div>
                             </div>
                        )}

                        {file.status === "completed" && (
                             <button className="absolute top-2 right-2 w-8 h-8 rounded-xl bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-100">
                                <Trash2 className="w-4 h-4" />
                             </button>
                        )}
                    </div>
                ))}

                <button className="card-premium p-6 border-4 border-dashed border-gray-100 bg-transparent flex flex-col items-center justify-center gap-4 text-gray-300 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest">{isRtl ? "إضافة المزيد" : "Add More"}</span>
                </button>
              </div>

              <div className="flex justify-center pt-8">
                  <Button className="h-20 px-24 rounded-[2rem] font-black text-2xl shadow-3xl shadow-primary/30 btn-interactive bg-primary hover:bg-primary/90">
                      {isRtl ? "ارسال المهمة" : "Submit Assignment"}
                  </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
