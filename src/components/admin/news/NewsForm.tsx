"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createNews, updateNews } from "@/actions/news";
import { Loader2 } from "lucide-react";

// Input Validation Schema using Zod
const newsSchema = z.object({
  titleAr: z.string().min(5, { message: "العنوان العربي يجب أن يكون 5 أحرف على الأقل" }),
  titleEn: z.string().min(5, { message: "العنوان الإنجليزي يجب أن يكون 5 أحرف على الأقل" }),
  contentAr: z.string().min(10, { message: "المحتوى العربي قصير جداً" }),
  contentEn: z.string().min(10, { message: "المحتوى الإنجليزي قصير جداً" }),
  imageUrl: z.string().url({ message: "الرجاء إدخال رابط صورة صحيح" }).or(z.literal("")),
});

type NewsFormValues = z.infer<typeof newsSchema>;

interface NewsFormProps {
  initialData?: any;
  onSuccess: () => void;
}

export function NewsForm({ initialData, onSuccess }: NewsFormProps) {
  const [errorMsg, setErrorMsg] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      titleAr: initialData?.titleAr || "",
      titleEn: initialData?.titleEn || "",
      contentAr: initialData?.contentAr || "",
      contentEn: initialData?.contentEn || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const onSubmit: SubmitHandler<NewsFormValues> = async (data) => {
    setErrorMsg("");
    let result;
    
    if (initialData?.id) {
      result = await updateNews(initialData.id, data);
    } else {
      result = await createNews(data);
    }

    if (result.success) {
      onSuccess();
    } else {
      setErrorMsg(result.error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title Arabic */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">العنوان (عربي)</label>
          <input
            {...register("titleAr")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            placeholder="أدخل عنوان الخبر بالعربية"
            dir="rtl"
          />
          {errors.titleAr && <p className="text-red-500 text-xs font-medium">{errors.titleAr.message}</p>}
        </div>

        {/* Title English */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">العنوان (إنجليزي)</label>
          <input
            {...register("titleEn")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            placeholder="Enter news title in English"
            dir="ltr"
          />
          {errors.titleEn && <p className="text-red-500 text-xs font-medium">{errors.titleEn.message}</p>}
        </div>
        
        {/* Content Arabic */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-gray-700">المحتوى (عربي)</label>
          <textarea
            {...register("contentAr")}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
            placeholder="أدخل تفاصيل الخبر بالعربية..."
            dir="rtl"
          />
          {errors.contentAr && <p className="text-red-500 text-xs font-medium">{errors.contentAr.message}</p>}
        </div>

        {/* Content English */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-gray-700">المحتوى (إنجليزي)</label>
          <textarea
            {...register("contentEn")}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
            placeholder="Enter news details in English..."
            dir="ltr"
          />
          {errors.contentEn && <p className="text-red-500 text-xs font-medium">{errors.contentEn.message}</p>}
        </div>

        {/* Image URL */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-gray-700">رابط صورة الغلاف (اختياري)</label>
          <input
            {...register("imageUrl")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            placeholder="https://example.com/image.jpg"
            dir="ltr"
          />
          {errors.imageUrl && <p className="text-red-500 text-xs font-medium">{errors.imageUrl.message}</p>}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[140px]"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : initialData ? "حفظ التعديلات" : "إضافة الخبر"}
        </button>
      </div>
    </form>
  );
}
