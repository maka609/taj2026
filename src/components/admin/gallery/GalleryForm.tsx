"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createGalleryImage } from "@/actions/gallery";
import { Loader2, Type, Layout, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Gallery Schema
const gallerySchema = z.object({
  url: z.string().url({ message: "الرجاء إدخال رابط صورة صحيح" }),
  captionAr: z.string().optional().nullable(),
  captionEn: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

interface GalleryFormProps {
  onSuccess: () => void;
}

export function GalleryForm({ onSuccess }: GalleryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      url: "",
      captionAr: "",
      captionEn: "",
      category: "",
    },
  });

  const onSubmit: SubmitHandler<GalleryFormValues> = async (data) => {
    const result = await createGalleryImage(data);
    if (result.success) {
      toast.success("تمت إضافة الصورة بنجاح");
      onSuccess();
    } else {
      toast.error(result.error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500" dir="rtl">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* URL */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <ImageIcon className="w-4 h-4 text-primary" />
            رابط الصورة *
          </label>
          <Input
            {...register("url")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="https://example.com/gallery-image.jpg"
          />
          {errors.url && <p className="text-red-500 text-xs font-semibold">{errors.url.message}</p>}
        </div>

        {/* Caption Arabic */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Type className="w-4 h-4 text-primary" />
            الوصف (عربي)
          </label>
          <Input
            {...register("captionAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: طلاب المدرسة في المعمل"
          />
          {errors.captionAr && <p className="text-red-500 text-xs font-semibold">{errors.captionAr.message}</p>}
        </div>

        {/* Caption English */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Caption (English)
          </label>
          <Input
            {...register("captionEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="Example: Students in the lab"
          />
          {errors.captionEn && <p className="text-red-500 text-xs font-semibold">{errors.captionEn.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Layout className="w-4 h-4 text-primary" />
            التصنيف
          </label>
          <Input
            {...register("category")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: فعاليات رياضية، رحلات..."
          />
          {errors.category && <p className="text-red-500 text-xs font-semibold">{errors.category.message}</p>}
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
                جاري الرفع...
            </div>
          ) : "إضافة الصورة"}
        </Button>
      </div>
    </form>
  );
}
