"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createStaff, updateStaff } from "@/actions/staff";
import { Loader2, User, Briefcase, Layout, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Staff Schema
const staffSchema = z.object({
  nameAr: z.string().min(3, { message: "الاسم بالعربي يجب أن يكون 3 أحرف على الأقل" }),
  nameEn: z.string().min(3, { message: "English name must be at least 3 characters" }),
  roleAr: z.string().min(3, { message: "الوظيفة بالعربي يجب أن تكون 3 أحرف على الأقل" }),
  roleEn: z.string().min(3, { message: "English role must be at least 3 characters" }),
  department: z.string().optional(),
  imageUrl: z.string().url({ message: "الرجاء إدخال رابط صورة صحيح" }).or(z.literal("")),
  order: z.number().int().min(0),
});

type StaffFormValues = z.infer<typeof staffSchema>;

interface StaffMember {
    id: string;
    nameAr: string;
    nameEn: string;
    roleAr: string;
    roleEn: string;
    department?: string | null;
    imageUrl?: string | null;
    order: number;
}

interface StaffFormProps {
  initialData?: StaffMember | null;
  onSuccess: () => void;
}

export function StaffForm({ initialData, onSuccess }: StaffFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      nameAr: initialData?.nameAr || "",
      nameEn: initialData?.nameEn || "",
      roleAr: initialData?.roleAr || "",
      roleEn: initialData?.roleEn || "",
      department: initialData?.department || "",
      imageUrl: initialData?.imageUrl || "",
      order: initialData?.order ?? 0,
    },
  });

  const onSubmit: SubmitHandler<StaffFormValues> = async (data) => {
    let result;
    if (initialData?.id) {
      result = await updateStaff(initialData.id, data);
    } else {
      result = await createStaff(data);
    }

    if (result.success) {
      toast.success(initialData ? "تم تحديث البيانات بنجاح" : "تمت إضافة الموظف بنجاح");
      onSuccess();
    } else {
      toast.error(result.error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500" dir="rtl">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Arabic Name */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <User className="w-4 h-4 text-primary" />
            الاسم الكامل (عربي)
          </label>
          <Input
            {...register("nameAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: أحمد محمد علي"
          />
          {errors.nameAr && <p className="text-red-500 text-xs font-semibold">{errors.nameAr.message}</p>}
        </div>

        {/* English Name */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Full Name (English)
          </label>
          <Input
            {...register("nameEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="Example: Ahmed Mohamed"
          />
          {errors.nameEn && <p className="text-red-500 text-xs font-semibold">{errors.nameEn.message}</p>}
        </div>

        {/* Arabic Role */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Briefcase className="w-4 h-4 text-primary" />
            المسمى الوظيفي (عربي)
          </label>
          <Input
            {...register("roleAr")}
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-bold"
            placeholder="مثال: معلم لغة عربية"
          />
          {errors.roleAr && <p className="text-red-500 text-xs font-semibold">{errors.roleAr.message}</p>}
        </div>

        {/* English Role */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Role (English)
          </label>
          <Input
            {...register("roleEn")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="Example: Arabic Teacher"
          />
          {errors.roleEn && <p className="text-red-500 text-xs font-semibold">{errors.roleEn.message}</p>}
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
            placeholder="مثال: المرحلة الابتدائية"
          />
          {errors.department && <p className="text-red-500 text-xs font-semibold">{errors.department.message}</p>}
        </div>

        {/* Order */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
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

        {/* Image URL */}
        <div className="space-y-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <ImageIcon className="w-4 h-4 text-primary" />
            رابط الصورة الشخصية
          </label>
          <Input
            {...register("imageUrl")}
            dir="ltr"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-primary/10 transition-all font-sans"
            placeholder="https://example.com/avatar.jpg"
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
          ) : initialData ? "حفظ التعديلات" : "إضافة الموظف"}
        </Button>
      </div>
    </form>
  );
}
