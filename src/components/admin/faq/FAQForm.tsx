"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createFAQ, updateFAQ } from "@/actions/faq";
import { Loader2, HelpCircle, MessageSquare, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// FAQ Schema
const faqSchema = z.object({
  questionAr: z.string().min(5, { message: "السؤال بالعربي يجب أن يكون 5 أحرف على الأقل" }),
  questionEn: z.string().min(5, { message: "English question must be at least 5 characters" }),
  answerAr: z.string().min(10, { message: "الإجابة بالعربي قصيرة جداً" }),
  answerEn: z.string().min(10, { message: "English answer is too short" }),
  order: z.number().int().min(0),
});

type FAQFormValues = z.infer<typeof faqSchema>;

interface FAQItem {
    id: string;
    questionAr: string;
    questionEn: string;
    answerAr: string;
    answerEn: string;
    order: number;
}

interface FAQFormProps {
  initialData?: FAQItem | null;
  onSuccess: () => void;
}

export function FAQForm({ initialData, onSuccess }: FAQFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      questionAr: initialData?.questionAr || "",
      questionEn: initialData?.questionEn || "",
      answerAr: initialData?.answerAr || "",
      answerEn: initialData?.answerEn || "",
      order: initialData?.order ?? 0,
    },
  });

  const onSubmit: SubmitHandler<FAQFormValues> = async (data) => {
    let result;
    if (initialData?.id) {
      result = await updateFAQ(initialData.id, data);
    } else {
      result = await createFAQ(data);
    }

    if (result.success) {
      toast.success(initialData ? "تم تحديث السؤال بنجاح" : "تمت إضافة السؤال بنجاح");
      onSuccess();
    } else {
      toast.error(result.error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500" dir="rtl">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Question Ar */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <HelpCircle className="w-4 h-4 text-primary" />
            السؤال (عربي)
          </label>
          <Input
            {...register("questionAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="أدخل السؤال بالعربية"
          />
          {errors.questionAr && <p className="text-red-500 text-xs font-semibold">{errors.questionAr.message}</p>}
        </div>

        {/* Question En */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Question (English)
          </label>
          <Input
            {...register("questionEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="Enter question in English"
          />
          {errors.questionEn && <p className="text-red-500 text-xs font-semibold">{errors.questionEn.message}</p>}
        </div>

        {/* Answer Ar */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <MessageSquare className="w-4 h-4 text-primary" />
            الإجابة (عربي)
          </label>
          <textarea
            {...register("answerAr")}
            rows={4}
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-medium leading-relaxed"
            placeholder="أدخل الإجابة بالعربية..."
          />
          {errors.answerAr && <p className="text-red-500 text-xs font-semibold">{errors.answerAr.message}</p>}
        </div>

        {/* Answer En */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Answer (English)
          </label>
          <textarea
            {...register("answerEn")}
            dir="ltr"
            rows={4}
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-sans leading-relaxed"
            placeholder="Enter answer in English..."
          />
          {errors.answerEn && <p className="text-red-500 text-xs font-semibold">{errors.answerEn.message}</p>}
        </div>

        {/* Order */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Hash className="w-4 h-4 text-primary" />
            الترتيب
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
          ) : initialData ? "حفظ التعديلات" : "إضافة السؤال"}
        </Button>
      </div>
    </form>
  );
}
