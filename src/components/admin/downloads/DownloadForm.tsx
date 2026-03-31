"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createDocument, updateDocument } from "@/actions/downloads";
import { Loader2, Type, Link as LinkIcon, Layout, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Document Schema
const documentSchema = z.object({
  titleAr: z.string().min(3, { message: "العنوان بالعربي يجب أن يكون 3 أحرف على الأقل" }),
  titleEn: z.string().min(3, { message: "English title must be at least 3 characters" }),
  fileUrl: z.string().url({ message: "الرجاء إدخال رابط ملف صحيح" }),
  category: z.string().min(2, { message: "الرجاء تحديد القسم" }),
  fileSize: z.number().optional().nullable(),
});

type DownloadFormValues = z.infer<typeof documentSchema>;

interface DocumentItem {
    id: string;
    titleAr: string;
    titleEn: string;
    fileUrl: string;
    category: string;
    fileSize?: number | null;
}

interface DownloadFormProps {
  initialData?: DocumentItem | null;
  onSuccess: () => void;
}

export function DownloadForm({ initialData, onSuccess }: DownloadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DownloadFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      titleAr: initialData?.titleAr || "",
      titleEn: initialData?.titleEn || "",
      fileUrl: initialData?.fileUrl || "",
      category: initialData?.category || "",
      fileSize: initialData?.fileSize || null,
    },
  });

  const onSubmit: SubmitHandler<DownloadFormValues> = async (data) => {
    let result;
    if (initialData?.id) {
      result = await updateDocument(initialData.id, data);
    } else {
      result = await createDocument(data);
    }

    if (result.success) {
      toast.success(initialData ? "تم تحديث الملف بنجاح" : "تم رفع الملف بنجاح");
      onSuccess();
    } else {
      toast.error(result.error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500" dir="rtl">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Arabic Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Type className="w-4 h-4 text-primary" />
            اسم الملف (عربي)
          </label>
          <Input
            {...register("titleAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: جدول حصص الصف الأول"
          />
          {errors.titleAr && <p className="text-red-500 text-xs font-semibold">{errors.titleAr.message}</p>}
        </div>

        {/* English Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            File Name (English)
          </label>
          <Input
            {...register("titleEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="Example: Grade 1 Schedule"
          />
          {errors.titleEn && <p className="text-red-500 text-xs font-semibold">{errors.titleEn.message}</p>}
        </div>

        {/* File URL */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <LinkIcon className="w-4 h-4 text-primary" />
            رابط الملف *
          </label>
          <Input
            {...register("fileUrl")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="https://example.com/file.pdf"
          />
          {errors.fileUrl && <p className="text-red-500 text-xs font-semibold">{errors.fileUrl.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Layout className="w-4 h-4 text-primary" />
            التصنيف
          </label>
          <Input
            {...register("category")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: جداول مدرسية، كتب..."
          />
          {errors.category && <p className="text-red-500 text-xs font-semibold">{errors.category.message}</p>}
        </div>

        {/* File Size */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <FileText className="w-4 h-4 text-primary" />
            حجم الملف (بالبايت)
          </label>
          <Input
            type="number"
            {...register("fileSize", { valueAsNumber: true })}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="اختياري"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-end gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 min-w-[160px] rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                جاري الحفظ...
            </div>
          ) : initialData ? "حفظ التعديلات" : "رفع الملف"}
        </Button>
      </div>
    </form>
  );
}
