"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateSettings } from "@/actions/settings";
import { Loader2, Save, School, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Settings Schema
const settingsSchema = z.object({
  schoolNameAr: z.string().min(3, { message: "اسم المدرسة مطلوب" }),
  schoolNameEn: z.string().min(3, { message: "School name is required" }),
  phone: z.string().min(5, { message: "رقم الهاتف مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  addressAr: z.string().min(5, { message: "العنوان مطلوب" }),
  addressEn: z.string().min(5, { message: "Address is required" }),
  facebookUrl: z.string().url().or(z.literal("")),
  instagramUrl: z.string().url().or(z.literal("")),
  twitterUrl: z.string().url().or(z.literal("")),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  initialData: Record<string, string>;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      schoolNameAr: initialData.schoolNameAr || "مدارس تاج النزهة اللغوية",
      schoolNameEn: initialData.schoolNameEn || "Taj El-Nozha Language Schools",
      phone: initialData.phone || "",
      email: initialData.email || "",
      addressAr: initialData.addressAr || "",
      addressEn: initialData.addressEn || "",
      facebookUrl: initialData.facebookUrl || "",
      instagramUrl: initialData.instagramUrl || "",
      twitterUrl: initialData.twitterUrl || "",
    },
  });

  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    const result = await updateSettings(data as Record<string, string>);
    if (result.success) {
      toast.success("تم حفظ الإعدادات بنجاح");
    } else {
      toast.error("فشل في حفظ الإعدادات");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500" dir="rtl">

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">إعدادات الموقع ⚙️</h1>
        <p className="text-gray-500 font-medium">التحكم في المعلومات الأساسية والروابط الخاصة بالمدرسة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* General Info */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-gray-50 px-8 py-6 bg-gray-50/30">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <School className="w-5 h-5 text-primary" />
                    المعلومات الأساسية
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">اسم المدرسة (عربي)</label>
                    <Input {...register("schoolNameAr")} className="h-12 rounded-xl" />
                    {errors.schoolNameAr && <p className="text-red-500 text-xs">{errors.schoolNameAr.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">School Name (English)</label>
                    <Input {...register("schoolNameEn")} dir="ltr" className="h-12 rounded-xl font-sans" />
                </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-gray-50 px-8 py-6 bg-gray-50/30">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    معلومات الاتصال
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5" /> الهاتف
                        </label>
                        <Input {...register("phone")} className="h-12 rounded-xl font-sans" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5" /> البريد
                        </label>
                        <Input {...register("email")} className="h-12 rounded-xl font-sans" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> العنوان (عربي)
                    </label>
                    <Input {...register("addressAr")} className="h-12 rounded-xl" />
                </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="border-none shadow-sm bg-white overflow-hidden lg:col-span-2">
            <CardHeader className="border-b border-gray-50 px-8 py-6 bg-gray-50/30">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    التواصل الاجتماعي
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        Facebook
                    </label>
                    <Input {...register("facebookUrl")} dir="ltr" className="h-12 rounded-xl font-sans" placeholder="https://facebook.com/..." />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        Instagram
                    </label>
                    <Input {...register("instagramUrl")} dir="ltr" className="h-12 rounded-xl font-sans" placeholder="https://instagram.com/..." />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        Twitter (X)
                    </label>
                    <Input {...register("twitterUrl")} dir="ltr" className="h-12 rounded-xl font-sans" placeholder="https://twitter.com/..." />
                </div>
            </CardContent>
          </Card>
      </div>

      <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-14 min-w-[200px] rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                    <Save className="w-5 h-5 ml-2" />
                    حفظ كل التغييرات
                </>
            )}
          </Button>
      </div>
    </form>
  );
}
