"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createNews, updateNews } from "@/actions/news";
import { Loader2, Type, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// News Schema
const newsSchema = z.object({
  titleAr: z.string().min(5, { message: "العنوان العربي يجب أن يكون 5 أحرف على الأقل" }),
  titleEn: z.string().min(5, { message: "English title must be at least 5 characters" }),
  contentAr: z.string().min(10, { message: "المحتوى العربي قصير جداً" }),
  contentEn: z.string().min(10, { message: "English content is too short" }),
  imageUrl: z.string().url({ message: "الرجاء إدخال رابط صورة صحيح" }).or(z.literal("")),
});

type NewsFormValues = z.infer<typeof newsSchema>;

interface NewsItem {
    id: string;
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    imageUrl?: string | null;
}

interface NewsFormProps {
  initialData?: NewsItem | null;
  onSuccess: () => void;
}

export function NewsForm({ initialData, onSuccess }: NewsFormProps) {
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
    let result;
    if (initialData?.id) {
      result = await updateNews(initialData.id, data);
    } else {
      result = await createNews(data);
    }

    if (result.success) {
      toast.success(initialData ? "تم تحديث الخبر بنجاح" : "تمت إضافة الخبر بنجاح");
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
            العنوان (عربي)
          </label>
          <Input
            {...register("titleAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold text-lg"
            placeholder="أدخل عنوان الخبر بالعربية"
          />
          {errors.titleAr && <p className="text-red-500 text-xs font-semibold">{errors.titleAr.message}</p>}
        </div>

        {/* English Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            News Title (English)
          </label>
          <Input
            {...register("titleEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans text-lg"
            placeholder="Enter news title in English"
          />
          {errors.titleEn && <p className="text-red-500 text-xs font-semibold">{errors.titleEn.message}</p>}
        </div>

        {/* Arabic Content */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <FileText className="w-4 h-4 text-primary" />
            المحتوى بالتفصيل (عربي)
          </label>
          <textarea
            {...register("contentAr")}
            rows={5}
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-medium leading-relaxed"
            placeholder="اكتب محتوى الخبر هنا..."
          />
          {errors.contentAr && <p className="text-red-500 text-xs font-semibold">{errors.contentAr.message}</p>}
        </div>

        {/* English Content */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Full Content (English)
          </label>
          <textarea
            {...register("contentEn")}
            dir="ltr"
            rows={5}
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-sans leading-relaxed"
            placeholder="Write the news content in English here..."
          />
          {errors.contentEn && <p className="text-red-500 text-xs font-semibold">{errors.contentEn.message}</p>}
        </div>

        {/* Image URL */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <ImageIcon className="w-4 h-4 text-primary" />
            رابط صورة الخبر
          </label>
          <Input
            {...register("imageUrl")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="https://example.com/news-image.jpg"
          />
          {errors.imageUrl && <p className="text-red-500 text-xs font-semibold">{errors.imageUrl.message}</p>}
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
          ) : initialData ? "حفظ التعديلات" : "نشر الخبر"}
        </Button>
      </div>
    </form>
  );
}
