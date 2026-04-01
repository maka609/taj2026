"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateGlobalSettings, updateSMTPConfig } from "@/actions/settings";
import { updateSettingAction } from "@/actions/settings-engine";
import { getOptimizedImage } from "@/lib/utils";
import { SiteSettingsSchema, type SiteSettings } from "@/lib/settings-schema";
import { GlobalSettingsSchema, SMTPConfigSchema } from "@/lib/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import { toast } from "sonner";
import {
  Loader2, Save, Globe, Mail, Layout, Palette,
  Phone, MapPin, GraduationCap, ShieldCheck, Search
} from "lucide-react";
import { z } from "zod";

interface SettingsFormProps {
  globalSettings: any;
  smtpConfig: any;
  settings: SiteSettings | null;
}

export default function SettingsForm({ globalSettings, smtpConfig, settings }: SettingsFormProps) {

  // New Settings Engine Forms
  const generalForm = useForm<SiteSettings['general']>({
    resolver: zodResolver(SiteSettingsSchema.shape.general),
    defaultValues: settings?.general || {
      siteNameAr: "مدارس تاج النزهة",
      siteNameEn: "Taj Schools",
      primaryColor: "#7c3aed",
      secondaryColor: "#ea580c",
      gpcEnabled: true,
    }
  });

  const academicForm = useForm<SiteSettings['academic']>({
    resolver: zodResolver(SiteSettingsSchema.shape.academic),
    defaultValues: settings?.academic || {
      registrationStatus: "open",
    }
  });

  const seoForm = useForm<SiteSettings['seo']>({
    resolver: zodResolver(SiteSettingsSchema.shape.seo),
    defaultValues: settings?.seo || {}
  });

  const contactForm = useForm<SiteSettings['contact']>({
    resolver: zodResolver(SiteSettingsSchema.shape.contact),
    defaultValues: settings?.contact || {
      email: "info@taj-schools.com",
    }
  });

  const socialForm = useForm<SiteSettings['social']>({
      resolver: zodResolver(SiteSettingsSchema.shape.social),
      defaultValues: settings?.social || {}
  });

  const onUpdateSection = async (key: keyof SiteSettings, values: any) => {
    const res = await updateSettingAction(key, values);
    if (res.success) toast.success(`تم تحديث إعدادات ${key} بنجاح`);
    else toast.error(res.error || "خطأ في التحديث");
  };

  // Legacy SMTP Form
  const smtpForm = useForm<z.infer<typeof SMTPConfigSchema>>({
    resolver: zodResolver(SMTPConfigSchema),
    defaultValues: smtpConfig || {
      host: "smtp.gmail.com",
      port: 587,
      fromEmail: "no-reply@taj-schools.com",
      fromName: "Taj Schools",
    }
  });

  const onSMTPSubmit = async (values: z.infer<typeof SMTPConfigSchema>) => {
    const res = await updateSMTPConfig(values);
    if (res.success) toast.success("تم تحديث إعدادات SMTP بنجاح");
    else toast.error(res.error || "خطأ غير معروف");
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-deep-navy tracking-tight">إعدادات المنصة المتكاملة ⚙️</h1>
        <p className="text-gray-500 font-medium">نظام التحكم العالمي (Settings Engine v2.0) - إصدار 2026</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white/50 border border-white/20 shadow-sm mb-8 overflow-x-auto justify-start h-auto p-1.5 gap-1.5 flex-nowrap">
          <TabsTrigger value="general" className="gap-2 h-11"><Globe className="w-4 h-4" /> عام</TabsTrigger>
          <TabsTrigger value="academic" className="gap-2 h-11"><GraduationCap className="w-4 h-4" /> أكاديمي</TabsTrigger>
          <TabsTrigger value="contact" className="gap-2 h-11"><Phone className="w-4 h-4" /> التواصل</TabsTrigger>
          <TabsTrigger value="seo" className="gap-2 h-11"><Search className="w-4 h-4" /> SEO & AI</TabsTrigger>
          <TabsTrigger value="smtp" className="gap-2 h-11"><Mail className="w-4 h-4" /> البريد (SMTP)</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 h-11"><ShieldCheck className="w-4 h-4" /> الأمان</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <form onSubmit={generalForm.handleSubmit((val) => onUpdateSection('general', val))}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary"/> الهوية الأساسية</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <div className="space-y-2">
                            <Label>اسم المدرسة (عربي)</Label>
                            <Input {...generalForm.register("siteNameAr")} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label>School Name (English)</Label>
                            <Input {...generalForm.register("siteNameEn")} dir="ltr" className="h-12 rounded-xl font-sans" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <ImageUpload
                                bucket="settings"
                                label="الشعار (Logo)"
                                currentImage={generalForm.watch("logoUrl") || undefined}
                                onUploadComplete={(url) => generalForm.setValue("logoUrl", url)}
                            />
                            <ImageUpload
                                bucket="settings"
                                label="أيقونة المتصفح (Favicon)"
                                currentImage={generalForm.watch("faviconUrl") || undefined}
                                onUploadComplete={(url) => generalForm.setValue("faviconUrl", url)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-vibrant-orange"/> المظهر والبراند</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <div className="space-y-2">
                            <Label>اللون الأساسي</Label>
                            <div className="flex gap-2">
                                <Input {...generalForm.register("primaryColor")} type="color" className="h-12 w-20 p-1 rounded-xl" />
                                <Input {...generalForm.register("primaryColor")} dir="ltr" className="h-12 flex-1 rounded-xl font-sans" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>اللون الثانوي</Label>
                            <div className="flex gap-2">
                                <Input {...generalForm.register("secondaryColor")} type="color" className="h-12 w-20 p-1 rounded-xl" />
                                <Input {...generalForm.register("secondaryColor")} dir="ltr" className="h-12 flex-1 rounded-xl font-sans" />
                            </div>
                        </div>
                        <div className="pt-4 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <p className="font-bold text-deep-navy text-sm">Global Privacy Control (GPC)</p>
                                <p className="text-xs text-gray-500">تفعيل إشارة الخصوصية العالمية للامتثال</p>
                            </div>
                            <input
                                type="checkbox"
                                {...generalForm.register("gpcEnabled")}
                                className="w-6 h-6 rounded-md accent-primary"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-end mt-6">
                <SubmitButton loading={generalForm.formState.isSubmitting} />
            </div>
          </form>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic">
          <form onSubmit={academicForm.handleSubmit((val) => onUpdateSection('academic', val))}>
            <Card className="card-premium p-8">
                <CardHeader className="px-0 pt-0">
                    <CardTitle>الإعدادات الأكاديمية</CardTitle>
                    <CardDescription>التحكم في حالة التسجيل والفصول الدراسية.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>حالة التسجيل</Label>
                        <select
                            {...academicForm.register("registrationStatus")}
                            className="w-full h-12 rounded-xl border border-slate-200 px-4 bg-white"
                        >
                            <option value="open">مفتوح</option>
                            <option value="closed">مغلق</option>
                            <option value="coming_soon">قريباً</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>الفصل الدراسي الحالي</Label>
                        <Input {...academicForm.register("currentSemester")} className="h-12 rounded-xl" placeholder="مثال: الفصل الأول 2026/2027" />
                    </div>
                </CardContent>
                <div className="flex justify-end mt-8">
                    <SubmitButton loading={academicForm.formState.isSubmitting} />
                </div>
            </Card>
          </form>
        </TabsContent>

        {/* Contact & Social Settings */}
        <TabsContent value="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={contactForm.handleSubmit((val) => onUpdateSection('contact', val))}>
                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0"><CardTitle>بيانات التواصل</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <div className="space-y-2">
                            <Label>البريد الرسمي</Label>
                            <Input {...contactForm.register("email")} dir="ltr" className="h-12 rounded-xl font-sans" />
                        </div>
                        <div className="space-y-2">
                            <Label>رقم الهاتف</Label>
                            <Input {...contactForm.register("phone")} dir="ltr" className="h-12 rounded-xl font-sans" />
                        </div>
                        <div className="space-y-2">
                            <Label>العنوان (عربي)</Label>
                            <Input {...contactForm.register("addressAr")} className="h-12 rounded-xl" />
                        </div>
                    </CardContent>
                    <div className="flex justify-end mt-6">
                        <SubmitButton loading={contactForm.formState.isSubmitting} />
                    </div>
                </Card>
            </form>

            <form onSubmit={socialForm.handleSubmit((val) => onUpdateSection('social', val))}>
                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0"><CardTitle>التواصل الاجتماعي</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <div className="space-y-2">
                            <Label>Facebook</Label>
                            <Input {...socialForm.register("facebook")} dir="ltr" className="h-11 rounded-xl font-sans" />
                        </div>
                        <div className="space-y-2">
                            <Label>Instagram</Label>
                            <Input {...socialForm.register("instagram")} dir="ltr" className="h-11 rounded-xl font-sans" />
                        </div>
                        <div className="space-y-2">
                            <Label>YouTube</Label>
                            <Input {...socialForm.register("youtube")} dir="ltr" className="h-11 rounded-xl font-sans" />
                        </div>
                    </CardContent>
                    <div className="flex justify-end mt-6">
                        <SubmitButton loading={socialForm.formState.isSubmitting} />
                    </div>
                </Card>
            </form>
          </div>
        </TabsContent>

        {/* SEO & AI Settings */}
        <TabsContent value="seo">
          <form onSubmit={seoForm.handleSubmit((val) => onUpdateSection('seo', val))}>
            <Card className="card-premium p-8">
                <CardHeader className="px-0 pt-0">
                    <CardTitle>محركات البحث وذكاء AI (Schema.org)</CardTitle>
                    <CardDescription>تحسين ظهور المدرسة في محركات البحث التقليدية والذكية.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-6">
                    <div className="space-y-2">
                        <Label>اسم المنظمة (SEO)</Label>
                        <Input {...seoForm.register("organizationName")} className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label>وصف الموقع (Meta Description)</Label>
                        <textarea
                            {...seoForm.register("description")}
                            className="w-full min-h-[100px] rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-800 text-sm">
                        نظام Settings Engine يقوم تلقائياً بتوليد JSON-LD Schema للـ EducationalOrganization بناءً على هذه البيانات.
                    </div>
                </CardContent>
                <div className="flex justify-end mt-8">
                    <SubmitButton loading={seoForm.formState.isSubmitting} />
                </div>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="smtp">
          <form onSubmit={smtpForm.handleSubmit(onSMTPSubmit)}>
            <Card className="card-premium p-8">
                <CardHeader className="px-0 pt-0">
                    <CardTitle>إعدادات خادم البريد (SMTP)</CardTitle>
                    <CardDescription>تستخدم لإرسال رسائل الترحيب وتغيير كلمة السر.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Host (المضيف)</Label>
                        <Input {...smtpForm.register("host")} dir="ltr" className="h-12 rounded-xl font-sans" />
                    </div>
                    <div className="space-y-2">
                        <Label>Port (المنفذ)</Label>
                        <Input {...smtpForm.register("port", { valueAsNumber: true })} type="number" dir="ltr" className="h-12 rounded-xl font-sans" />
                    </div>
                    <div className="space-y-2">
                        <Label>Username (المستخدم)</Label>
                        <Input {...smtpForm.register("user")} dir="ltr" className="h-12 rounded-xl font-sans" />
                    </div>
                    <div className="space-y-2">
                        <Label>Password (كلمة المرور)</Label>
                        <Input {...smtpForm.register("pass")} type="password" dir="ltr" className="h-12 rounded-xl font-sans" />
                    </div>
                </CardContent>
                <div className="flex justify-end mt-8">
                    <SubmitButton loading={smtpForm.formState.isSubmitting} />
                </div>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="security">
             <Card className="card-premium p-8 border-red-100 bg-red-50/10">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-red-600 flex items-center gap-2"><ShieldCheck className="w-6 h-6"/> الأمان المتقدم</CardTitle>
                    <CardDescription>إعدادات حماية المنصة والنسخ الاحتياطي.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-4">
                    <div className="p-6 bg-white rounded-2xl border border-red-100 space-y-4">
                         <div className="flex items-center justify-between">
                            <p className="font-bold text-deep-navy">وضع الصيانة (Maintenance Mode)</p>
                            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-not-allowed opacity-50">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                         </div>
                         <p className="text-xs text-gray-500">عند تفعيله، سيتمكن الأدمن فقط من دخول الموقع.</p>
                    </div>
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 hover:bg-slate-50">
                        تصدير كافة الإعدادات (JSON Export)
                    </Button>
                </CardContent>
             </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
    return (
        <Button
            type="submit"
            disabled={loading}
            className="h-14 px-10 rounded-2xl font-black text-lg shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 btn-interactive"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 ml-2" /> حفظ القسم</>}
        </Button>
    )
}
