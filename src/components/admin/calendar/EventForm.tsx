"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createEvent, updateEvent } from "@/actions/calendar";
import { Loader2, Type, Calendar as CalendarIcon, FileText, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Event Schema
const eventSchema = z.object({
  titleAr: z.string().min(3, { message: "العنوان بالعربي يجب أن يكون 3 أحرف على الأقل" }),
  titleEn: z.string().min(3, { message: "English title must be at least 3 characters" }),
  description: z.string().optional().nullable(),
  startDate: z.string().min(1, { message: "الرجاء تحديد تاريخ البداية" }),
  endDate: z.string().optional().nullable(),
  color: z.string().min(1),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventItem {
    id: string;
    titleAr: string;
    titleEn: string;
    description?: string | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    color?: string | null;
}

interface EventFormProps {
  initialData?: EventItem | null;
  onSuccess: () => void;
}

export function EventForm({ initialData, onSuccess }: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      titleAr: initialData?.titleAr || "",
      titleEn: initialData?.titleEn || "",
      description: initialData?.description || "",
      startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().slice(0, 16) : "",
      endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().slice(0, 16) : "",
      color: initialData?.color || "#3b82f6",
    },
  });

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    let result;
    const formattedData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
    };

    if (initialData?.id) {
      result = await updateEvent(initialData.id, formattedData as any);
    } else {
      result = await createEvent(formattedData as any);
    }

    if (result.success) {
      toast.success(initialData ? "تم تحديث الحدث بنجاح" : "تمت إضافة الحدث بنجاح");
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
            عنوان الحدث (عربي)
          </label>
          <Input
            {...register("titleAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: إجازة اليوم الوطني"
          />
          {errors.titleAr && <p className="text-red-500 text-xs font-semibold">{errors.titleAr.message}</p>}
        </div>

        {/* English Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Event Title (English)
          </label>
          <Input
            {...register("titleEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="Example: National Day Holiday"
          />
          {errors.titleEn && <p className="text-red-500 text-xs font-semibold">{errors.titleEn.message}</p>}
        </div>

        {/* Start Date */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <CalendarIcon className="w-4 h-4 text-primary" />
            تاريخ ووقت البداية
          </label>
          <Input
            type="datetime-local"
            {...register("startDate")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
          />
          {errors.startDate && <p className="text-red-500 text-xs font-semibold">{errors.startDate.message}</p>}
        </div>

        {/* End Date */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            تاريخ ووقت النهاية (اختياري)
          </label>
          <Input
            type="datetime-local"
            {...register("endDate")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
          />
          {errors.endDate && <p className="text-red-500 text-xs font-semibold">{errors.endDate.message}</p>}
        </div>

        {/* Color Picker */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Palette className="w-4 h-4 text-primary" />
            لون الحدث
          </label>
          <div className="flex gap-4 items-center h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50">
            <input
                type="color"
                {...register("color")}
                className="w-8 h-8 rounded-lg border-none bg-transparent cursor-pointer"
            />
            <span className="text-xs text-gray-400 font-mono font-medium"># اختيار لون مخصص</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <FileText className="w-4 h-4 text-primary" />
            وصف الحدث
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-medium"
            placeholder="اكتب تفاصيل إضافية عن الحدث هنا..."
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
          ) : initialData ? "حفظ التعديلات" : "إضافة الحدث"}
        </Button>
      </div>
    </form>
  );
}
