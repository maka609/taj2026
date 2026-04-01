"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSettingAction } from "@/actions/settings-engine";
import { getOptimizedImage } from "@/lib/utils";
import { SiteSettingsSchema, type SiteSettings } from "@/lib/settings-schema";
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

interface SettingsFormProps {
  settings: SiteSettings;
}

export default function SettingsForm({ settings }: SettingsFormProps) {

  // Section Forms
  const generalForm = useForm<SiteSettings['general']>({
    resolver: zodResolver(SiteSettingsSchema.shape.general),
    defaultValues: settings.general
  });

  const academicForm = useForm<SiteSettings['academic']>({
    resolver: zodResolver(SiteSettingsSchema.shape.academic),
    defaultValues: settings.academic
  });

  const contactForm = useForm<SiteSettings['contact']>({
    resolver: zodResolver(SiteSettingsSchema.shape.contact),
    defaultValues: settings.contact
  });

  const socialForm = useForm<SiteSettings['social']>({
    resolver: zodResolver(SiteSettingsSchema.shape.social),
    defaultValues: settings.social
  });

  const seoForm = useForm<SiteSettings['seo']>({
    resolver: zodResolver(SiteSettingsSchema.shape.seo),
    defaultValues: settings.seo
  });

  const smtpForm = useForm<SiteSettings['smtp']>({
    resolver: zodResolver(SiteSettingsSchema.shape.smtp),
    defaultValues: settings.smtp
  });

  const securityForm = useForm<SiteSettings['security']>({
    resolver: zodResolver(SiteSettingsSchema.shape.security),
    defaultValues: settings.security
  });

  const onUpdateSection = async (key: keyof SiteSettings, values: any) => {
    const res = await updateSettingAction(key, values);
    if (res.success) toast.success(`تم تحديث قسم [${key}] بنجاح`);
    else toast.error(res.error || "فشل في التحديث");
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-deep-navy tracking-tight">التحكم العالمي (Settings Engine) ⚙️</h1>
        <p className="text-gray-500 font-medium">نظام الإعدادات المتكامل - الإصدار الموحد 2026</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white/50 border border-white/20 shadow-sm mb-8 overflow-x-auto justify-start h-auto p-1.5 gap-1.5 flex-nowrap scrollbar-hide">
          <TabsTrigger value="general" className="gap-2 h-11"><Globe className="w-4 h-4" /> عام</TabsTrigger>
          <TabsTrigger value="academic" className="gap-2 h-11"><GraduationCap className="w-4 h-4" /> أكاديمي</TabsTrigger>
          <TabsTrigger value="contact" className="gap-2 h-11"><Phone className="w-4 h-4" /> التواصل</TabsTrigger>
          <TabsTrigger value="seo" className="gap-2 h-11"><Search className="w-4 h-4" /> SEO & AI</TabsTrigger>
          <TabsTrigger value="smtp" className="gap-2 h-11"><Mail className="w-4 h-4" /> البريد (SMTP)</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 h-11"><ShieldCheck className="w-4 h-4" /> الأمان</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <form onSubmit={generalForm.handleSubmit((v) => onUpdateSection('general', v))}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0"><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary"/> هوية المنصة</CardTitle></CardHeader>
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
                                label="أيقونة (Favicon)"
                                currentImage={generalForm.watch("faviconUrl") || undefined}
                                onUploadComplete={(url) => generalForm.setValue("faviconUrl", url)}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0"><CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-vibrant-orange"/> الثيم والألوان</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <div className="space-y-2">
                            <Label>اللون الأساسي</Label>
                            <div className="flex gap-2">
                                <Input {...generalForm.register("primaryColor")} type="color" className="h-12 w-20 p-1 rounded-xl" />
                                <Input {...generalForm.register("primaryColor")} dir="ltr" className="h-12 flex-1 rounded-xl font-sans uppercase" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>اللون الثانوي</Label>
                            <div className="flex gap-2">
                                <Input {...generalForm.register("secondaryColor")} type="color" className="h-12 w-20 p-1 rounded-xl" />
                                <Input {...generalForm.register("secondaryColor")} dir="ltr" className="h-12 flex-1 rounded-xl font-sans uppercase" />
                            </div>
                        </div>
                        <div className="pt-4 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <p className="font-bold text-deep-navy text-sm">GPC Signal (Global Privacy Control)</p>
                                <p className="text-xs text-gray-500">تحميل إشارة الخصوصية الحديثة تلقائياً.</p>
                            </div>
                            <input type="checkbox" {...generalForm.register("gpcEnabled")} className="w-6 h-6 rounded-md accent-primary" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-end mt-6"><SubmitButton loading={generalForm.formState.isSubmitting} /></div>
          </form>
        </TabsContent>

        <TabsContent value="academic">
          <form onSubmit={academicForm.handleSubmit((v) => onUpdateSection('academic', v))}>
             <Card className="card-premium p-8">
                <CardHeader className="px-0 pt-0"><CardTitle>الإعدادات الأكاديمية</CardTitle></CardHeader>
                <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>حالة التسجيل</Label>
                        <select {...academicForm.register("registrationStatus")} className="w-full h-12 rounded-xl border border-slate-200 px-4 bg-white">
                            <option value="open">مفتوح (Open)</option>
                            <option value="closed">مغلق (Closed)</option>
                            <option value="coming_soon">قريباً (Coming Soon)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>العام الدراسي</Label>
                        <Input {...academicForm.register("academicYear")} className="h-12 rounded-xl" placeholder="2026/2027" />
                    </div>
                </CardContent>
                <div className="flex justify-end mt-8"><SubmitButton loading={academicForm.formState.isSubmitting} /></div>
             </Card>
          </form>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={contactForm.handleSubmit((v) => onUpdateSection('contact', v))}>
                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0"><CardTitle>بيانات التواصل</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <div className="space-y-2"><Label>البريد الإلكتروني</Label><Input {...contactForm.register("email")} dir="ltr" className="h-12 rounded-xl font-sans" /></div>
                        <div className="space-y-2"><Label>رقم الهاتف</Label><Input {...contactForm.register("phone")} dir="ltr" className="h-12 rounded-xl font-sans" /></div>
                        <div className="space-y-2"><Label>واتساب (WhatsApp)</Label><Input {...contactForm.register("whatsapp")} dir="ltr" className="h-12 rounded-xl font-sans" /></div>
                    </CardContent>
                    <div className="flex justify-end mt-6"><SubmitButton loading={contactForm.formState.isSubmitting} /></div>
                </Card>
            </form>
            <form onSubmit={socialForm.handleSubmit((v) => onUpdateSection('social', v))}>
                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0"><CardTitle>روابط التواصل الاجتماعي</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <div className="space-y-2"><Label>Facebook</Label><Input {...socialForm.register("facebook")} dir="ltr" className="h-11 rounded-xl font-sans" /></div>
                        <div className="space-y-2"><Label>Instagram</Label><Input {...socialForm.register("instagram")} dir="ltr" className="h-11 rounded-xl font-sans" /></div>
                        <div className="space-y-2"><Label>Twitter / X</Label><Input {...socialForm.register("twitter")} dir="ltr" className="h-11 rounded-xl font-sans" /></div>
                    </CardContent>
                    <div className="flex justify-end mt-6"><SubmitButton loading={socialForm.formState.isSubmitting} /></div>
                </Card>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="seo">
          <form onSubmit={seoForm.handleSubmit((v) => onUpdateSection('seo', v))}>
            <Card className="card-premium p-8">
                <CardHeader className="px-0 pt-0">
                    <CardTitle>محركات البحث و AI Search</CardTitle>
                    <CardDescription>تحسين المدرسة في أرشيفات جوجل وذكاء ChatGPT.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-4">
                    <div className="space-y-2"><Label>اسم المؤسسة الرسمي</Label><Input {...seoForm.register("organizationName")} className="h-12 rounded-xl" /></div>
                    <div className="space-y-2"><Label>وصف الميتا (Meta Description)</Label><textarea {...seoForm.register("description")} className="w-full min-h-[100px] rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-primary/20" /></div>
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-xs text-primary leading-relaxed">تنبيه: سيقوم النظام تلقائياً بإنشاء JSON-LD Schema متكامل من نوع EducationalOrganization لضمان ظهورك في الصدارة.</div>
                </CardContent>
                <div className="flex justify-end mt-8"><SubmitButton loading={seoForm.formState.isSubmitting} /></div>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="smtp">
          <form onSubmit={smtpForm.handleSubmit((v) => onUpdateSection('smtp', v))}>
            <Card className="card-premium p-8">
                <CardHeader className="px-0 pt-0"><CardTitle>خادم البريد الإلكتروني (SMTP)</CardTitle></CardHeader>
                <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Host</Label><Input {...smtpForm.register("host")} dir="ltr" className="h-12 rounded-xl font-sans" /></div>
                    <div className="space-y-2"><Label>Port</Label><Input {...smtpForm.register("port", { valueAsNumber: true })} type="number" dir="ltr" className="h-12 rounded-xl font-sans" /></div>
                    <div className="space-y-2"><Label>Username</Label><Input {...smtpForm.register("user")} dir="ltr" className="h-12 rounded-xl font-sans" /></div>
                    <div className="space-y-2"><Label>Password</Label><Input {...smtpForm.register("pass")} type="password" dir="ltr" className="h-12 rounded-xl font-sans" /></div>
                    <div className="space-y-2"><Label>From Name</Label><Input {...smtpForm.register("fromName")} className="h-12 rounded-xl" /></div>
                    <div className="space-y-2">
                        <Label>التشفير (Encryption)</Label>
                        <select {...smtpForm.register("encryption")} className="w-full h-12 rounded-xl border border-slate-200 px-4 bg-white">
                            <option value="TLS">TLS</option>
                            <option value="SSL">SSL</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                </CardContent>
                <div className="flex justify-end mt-8"><SubmitButton loading={smtpForm.formState.isSubmitting} /></div>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="security">
          <form onSubmit={securityForm.handleSubmit((v) => onUpdateSection('security', v))}>
            <Card className="card-premium p-8 border-red-100 bg-red-50/5">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-red-600 flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> الأمان المتقدم</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-6">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div><p className="font-bold text-deep-navy">وضع الصيانة (Maintenance Mode)</p><p className="text-xs text-gray-500">إغلاق الموقع للعامة والسماح بدخول الأدمن فقط.</p></div>
                        <input type="checkbox" {...securityForm.register("maintenanceMode")} className="w-6 h-6 rounded-md accent-red-600" />
                    </div>
                    <div className="space-y-2"><Label>مدة الجلسة (دقائق)</Label><Input {...securityForm.register("sessionTimeout", { valueAsNumber: true })} type="number" dir="ltr" className="h-12 rounded-xl font-sans" /></div>
                </CardContent>
                <div className="flex justify-end mt-8"><SubmitButton loading={securityForm.formState.isSubmitting} /></div>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
    return (
        <Button type="submit" disabled={loading} className="h-14 px-10 rounded-2xl font-black text-lg shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 btn-interactive">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 ml-2" /> حفظ التغييرات</>}
        </Button>
    )
}
