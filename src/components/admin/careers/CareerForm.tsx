"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createCareer, updateCareer } from "@/actions/careers";
import { Loader2, Type, Layout, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Career Schema
const careerSchema = z.object({
  titleAr: z.string().min(3, { message: "العنوان بالعربي يجب أن يكون 3 أحرف على الأقل" }),
  titleEn: z.string().min(3, { message: "English title must be at least 3 characters" }),
  descriptionAr: z.string().min(10, { message: "الوصف بالعربي قصير جداً" }),
  descriptionEn: z.string().min(10, { message: "English description is too short" }),
  department: z.string().min(2, { message: "الرجاء تحديد القسم" }),
  deadline: z.string().optional().nullable(),
  active: z.boolean(),
});

type CareerFormValues = z.infer<typeof careerSchema>;

interface CareerItem {
    id: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    department: string;
    deadline?: Date | string | null;
    active: boolean;
}

interface CareerFormProps {
  initialData?: CareerItem | null;
  onSuccess: () => void;
}

export function CareerForm({ initialData, onSuccess }: CareerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      titleAr: initialData?.titleAr || "",
      titleEn: initialData?.titleEn || "",
      descriptionAr: initialData?.descriptionAr || "",
      descriptionEn: initialData?.descriptionEn || "",
      department: initialData?.department || "",
      deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().slice(0, 10) : "",
      active: initialData?.active ?? true,
    },
  });

  const onSubmit: SubmitHandler<CareerFormValues> = async (data) => {
    let result;
    const formattedData = {
        ...data,
        deadline: data.deadline ? new Date(data.deadline) : null,
    };

    if (initialData?.id) {
      result = await updateCareer(initialData.id, formattedData as any);
    } else {
      result = await createCareer(formattedData as any);
    }

    if (result.success) {
      toast.success(initialData ? "تم تحديث الوظيفة بنجاح" : "تمت إضافة الوظيفة بنجاح");
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
            عنوان الوظيفة (عربي)
          </label>
          <Input
            {...register("titleAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: معلم لغة عربية"
          />
          {errors.titleAr && <p className="text-red-500 text-xs font-semibold">{errors.titleAr.message}</p>}
        </div>

        {/* English Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Job Title (English)
          </label>
          <Input
            {...register("titleEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="Example: Arabic Teacher"
          />
          {errors.titleEn && <p className="text-red-500 text-xs font-semibold">{errors.titleEn.message}</p>}
        </div>

        {/* Department */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Layout className="w-4 h-4 text-primary" />
            القسم
          </label>
          <Input
            {...register("department")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: اللغات، العلوم..."
          />
          {errors.department && <p className="text-red-500 text-xs font-semibold">{errors.department.message}</p>}
        </div>

        {/* Deadline */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Calendar className="w-4 h-4 text-primary" />
            آخر موعد للتقديم
          </label>
          <Input
            type="date"
            {...register("deadline")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
          />
        </div>

        {/* Description Ar */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <FileText className="w-4 h-4 text-primary" />
            وصف الوظيفة والمتطلبات (عربي)
          </label>
          <textarea
            {...register("descriptionAr")}
            rows={4}
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-medium leading-relaxed"
            placeholder="اكتب تفاصيل الوظيفة هنا..."
          />
          {errors.descriptionAr && <p className="text-red-500 text-xs font-semibold">{errors.descriptionAr.message}</p>}
        </div>

        {/* Description En */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Job Description (English)
          </label>
          <textarea
            {...register("descriptionEn")}
            dir="ltr"
            rows={4}
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-sans leading-relaxed"
            placeholder="Write job details here..."
          />
          {errors.descriptionEn && <p className="text-red-500 text-xs font-semibold">{errors.descriptionEn.message}</p>}
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
          ) : initialData ? "حفظ التعديلات" : "نشر الوظيفة"}
        </Button>
      </div>
    </form>
  );
}
