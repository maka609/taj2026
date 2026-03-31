"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createSlider, updateSlider } from "@/actions/sliders";
import { Loader2, Type, Link as LinkIcon, Image as ImageIcon, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Slider Schema
const sliderSchema = z.object({
  imageUrl: z.string().url({ message: "الرجاء إدخال رابط صورة صحيح" }),
  titleAr: z.string().optional().nullable(),
  titleEn: z.string().optional().nullable(),
  link: z.string().url({ message: "الرجاء إدخال رابط صحيح" }).or(z.literal("")).optional().nullable(),
  order: z.number().int().min(0),
  active: z.boolean(),
});

type SliderFormValues = z.infer<typeof sliderSchema>;

interface SliderItem {
    id: string;
    imageUrl: string;
    titleAr?: string | null;
    titleEn?: string | null;
    link?: string | null;
    order: number;
    active: boolean;
}

interface SliderFormProps {
  initialData?: SliderItem | null;
  onSuccess: () => void;
}

export function SliderForm({ initialData, onSuccess }: SliderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SliderFormValues>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
      titleAr: initialData?.titleAr || "",
      titleEn: initialData?.titleEn || "",
      link: initialData?.link || "",
      order: initialData?.order ?? 0,
      active: initialData?.active ?? true,
    },
  });

  const onSubmit: SubmitHandler<SliderFormValues> = async (data) => {
    let result;
    if (initialData?.id) {
      result = await updateSlider(initialData.id, data as any);
    } else {
      result = await createSlider(data as any);
    }

    if (result.success) {
      toast.success(initialData ? "تم تحديث السلايدر بنجاح" : "تمت إضافة السلايدر بنجاح");
      onSuccess();
    } else {
      toast.error(result.error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500" dir="rtl">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image URL */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <ImageIcon className="w-4 h-4 text-primary" />
            رابط الصورة *
          </label>
          <Input
            {...register("imageUrl")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="https://example.com/slider.jpg"
          />
          {errors.imageUrl && <p className="text-red-500 text-xs font-semibold">{errors.imageUrl.message}</p>}
        </div>

        {/* Arabic Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Type className="w-4 h-4 text-primary" />
            العنوان (عربي)
          </label>
          <Input
            {...register("titleAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="أدخل عنواناً للصورة"
          />
          {errors.titleAr && <p className="text-red-500 text-xs font-semibold">{errors.titleAr.message}</p>}
        </div>

        {/* English Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Title (English)
          </label>
          <Input
            {...register("titleEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="Enter image title"
          />
          {errors.titleEn && <p className="text-red-500 text-xs font-semibold">{errors.titleEn.message}</p>}
        </div>

        {/* Link */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <LinkIcon className="w-4 h-4 text-primary" />
            الرابط (اختياري)
          </label>
          <Input
            {...register("link")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="https://..."
          />
          {errors.link && <p className="text-red-500 text-xs font-semibold">{errors.link.message}</p>}
        </div>

        {/* Order */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Hash className="w-4 h-4 text-primary" />
            ترتيب العرض
          </label>
          <Input
            type="number"
            {...register("order", { valueAsNumber: true })}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="0"
          />
          {errors.order && <p className="text-red-500 text-xs font-semibold">{errors.order.message}</p>}
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
          ) : initialData ? "حفظ التعديلات" : "إضافة إلى السلايدر"}
        </Button>
      </div>
    </form>
  );
}
