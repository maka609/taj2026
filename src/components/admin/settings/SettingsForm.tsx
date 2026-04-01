"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateGlobalSettings, updateSMTPConfig } from "@/actions/settings";
import { GlobalSettingsSchema, SMTPConfigSchema } from "@/lib/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import { toast } from "sonner";
import {
  Loader2, Save, Globe, Mail, Layout, Palette,
  Phone, MapPin, Search, Shield, GraduationCap,
  Info
} from "lucide-react";
import { z } from "zod";

interface SettingsFormProps {
  globalSettings: any;
  smtpConfig: any;
}

export default function SettingsForm({ globalSettings, smtpConfig }: SettingsFormProps) {

  // 1. Global Settings Form
  const globalForm = useForm<z.infer<typeof GlobalSettingsSchema>>({
    resolver: zodResolver(GlobalSettingsSchema),
    defaultValues: globalSettings || {
      siteNameAr: "مدارس تاج النزهة",
      siteNameEn: "Taj Schools",
      primaryColor: "#7c3aed",
      secondaryColor: "#ea580c",
      contactEmail: "info@taj-schools.com",
      isAdmissionOpen: true,
      currentYear: "2025/2026",
      enableGPC: true,
      showCookieBanner: true
    }
  });

  // 2. SMTP Form
  const smtpForm = useForm<z.infer<typeof SMTPConfigSchema>>({
    resolver: zodResolver(SMTPConfigSchema),
    defaultValues: smtpConfig || {
      host: "smtp.gmail.com",
      port: 587,
      fromEmail: "no-reply@taj-schools.com",
      fromName: "Taj Schools",
    }
  });

  const onGlobalSubmit = async (values: z.infer<typeof GlobalSettingsSchema>) => {
    const res = await updateGlobalSettings(values);
    if (res.success) toast.success("تم تحديث الإعدادات بنجاح");
    else toast.error(res.error || "خطأ غير معروف");
  };

  const onSMTPSubmit = async (values: z.infer<typeof SMTPConfigSchema>) => {
    const res = await updateSMTPConfig(values);
    if (res.success) toast.success("تم تحديث إعدادات SMTP بنجاح");
    else toast.error(res.error || "خطأ غير معروف");
  };

  useEffect(() => {
    const errors = globalForm.formState.errors;
    if (Object.keys(errors).length > 0) {
      console.log("Global Form Errors:", errors);
    }
  }, [globalForm.formState.errors]);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-deep-navy tracking-tight">إعدادات المنصة ⚙️</h1>
        <p className="text-gray-500 font-medium">تحكم شامل في الهوية، الأداء، والخصوصية.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white/50 border border-white/20 shadow-sm mb-8 overflow-x-auto justify-start h-auto p-1.5 gap-1.5 flex-nowrap">
          <TabsTrigger value="general" className="gap-2 h-11"><Globe className="w-4 h-4" /> عام</TabsTrigger>
          <TabsTrigger value="hero" className="gap-2 h-11"><Layout className="w-4 h-4" /> الهيرو</TabsTrigger>
          <TabsTrigger value="academic" className="gap-2 h-11"><GraduationCap className="w-4 h-4" /> أكاديمي</TabsTrigger>
          <TabsTrigger value="footer" className="gap-2 h-11"><MapPin className="w-4 h-4" /> التذييل</TabsTrigger>
          <TabsTrigger value="seo" className="gap-2 h-11"><Search className="w-4 h-4" /> SEO & AI</TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2 h-11"><Shield className="w-4 h-4" /> الخصوصية</TabsTrigger>
          <TabsTrigger value="smtp" className="gap-2 h-11"><Mail className="w-4 h-4" /> SMTP</TabsTrigger>
        </TabsList>

        <form onSubmit={globalForm.handleSubmit(onGlobalSubmit)}>
          {/* Tab 1: General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                   <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary"/> هوية الموقع</CardTitle>
                   <CardDescription>الأسماء والشعارات الأساسية.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-4">
                  <div className="space-y-2">
                    <Label>اسم الموقع (عربي)</Label>
                    <Input {...globalForm.register("siteNameAr")} className={globalForm.formState.errors.siteNameAr ? 'border-red-500' : ''} />
                  </div>
                  <div className="space-y-2">
                    <Label>Site Name (English)</Label>
                    <Input {...globalForm.register("siteNameEn")} dir="ltr" className="font-sans" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <ImageUpload
                            bucket="settings"
                            label="اللوجو (Logo)"
                            currentImage={globalForm.watch("logoUrl") || undefined}
                            onUploadComplete={(url) => globalForm.setValue("logoUrl", url)}
                        />
                    </div>
                    <div className="space-y-2">
                        <ImageUpload
                            bucket="settings"
                            label="الفافيكون (Favicon)"
                            currentImage={globalForm.watch("faviconUrl") || undefined}
                            onUploadComplete={(url) => globalForm.setValue("faviconUrl", url)}
                        />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                   <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-vibrant-orange"/> ثيم الموقع</CardTitle>
                   <CardDescription>تحكم في الألوان العالمية للموقع.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-4">
                  <div className="space-y-2">
                    <Label>اللون الأساسي (Primary)</Label>
                    <div className="flex gap-2">
                        <Input {...globalForm.register("primaryColor")} type="color" className="h-12 w-20 p-1" />
                        <Input {...globalForm.register("primaryColor")} dir="ltr" className="font-sans" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>اللون الثانوي (Secondary)</Label>
                    <div className="flex gap-2">
                        <Input {...globalForm.register("secondaryColor")} type="color" className="h-12 w-20 p-1" />
                        <Input {...globalForm.register("secondaryColor")} dir="ltr" className="font-sans" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: Hero Section */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle>محتوى قسم الهيرو</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>العنوان الرئيسي (عربي)</Label>
                            <Input {...globalForm.register("heroTitleAr")} />
                        </div>
                        <div className="space-y-2">
                            <Label>العنوان الفرعي (عربي)</Label>
                            <Input {...globalForm.register("heroSubtitleAr")} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Hero Title (English)</Label>
                            <Input {...globalForm.register("heroTitleEn")} dir="ltr" className="font-sans" />
                        </div>
                        <div className="space-y-2">
                            <Label>Hero Subtitle (English)</Label>
                            <Input {...globalForm.register("heroSubtitleEn")} dir="ltr" className="font-sans" />
                        </div>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Academic Settings */}
          <TabsContent value="academic" className="space-y-6">
            <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle>الحالة الأكاديمية</CardTitle>
                    <CardDescription>إدارة التسجيل والعام الدراسي.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="space-y-0.5">
                            <Label className="text-base">حالة التسجيل (Admission)</Label>
                            <p className="text-sm text-gray-500">فتح أو إغلاق باب التقديم للطلاب الجدد.</p>
                        </div>
                        <Switch
                            checked={globalForm.watch("isAdmissionOpen")}
                            onCheckedChange={(val) => globalForm.setValue("isAdmissionOpen", val)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>العام الدراسي الحالي</Label>
                        <Input {...globalForm.register("currentYear")} placeholder="مثال: 2025/2026" />
                    </div>
                </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Footer & Contact */}
          <TabsContent value="footer" className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="card-premium p-6 lg:col-span-2">
                    <CardHeader className="px-0 pt-0"><CardTitle>التواصل</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>البريد الإلكتروني</Label>
                            <Input {...globalForm.register("contactEmail")} dir="ltr" />
                        </div>
                        <div className="space-y-2">
                            <Label>الهاتف</Label>
                            <Input {...globalForm.register("contactPhone")} dir="ltr" />
                        </div>
                        <div className="space-y-2">
                            <Label>العنوان (عربي)</Label>
                            <Input {...globalForm.register("contactAddressAr")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Address (English)</Label>
                            <Input {...globalForm.register("contactAddressEn")} dir="ltr" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0"><CardTitle>التواصل الاجتماعي</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <Input {...globalForm.register("facebookUrl")} dir="ltr" placeholder="Facebook URL" />
                        <Input {...globalForm.register("instagramUrl")} dir="ltr" placeholder="Instagram URL" />
                        <Input {...globalForm.register("youtubeUrl")} dir="ltr" placeholder="Youtube URL" />
                        <Input {...globalForm.register("twitterUrl")} dir="ltr" placeholder="X / Twitter" />
                    </CardContent>
                </Card>
             </div>
          </TabsContent>

          {/* Tab 5: SEO & AI Search */}
          <TabsContent value="seo" className="space-y-6">
            <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center gap-2"><Search className="w-5 h-5 text-blue-500" /> محركات البحث والذكاء الاصطناعي</CardTitle>
                    <CardDescription>إدارة أرشفة المدرسة (Schema.org) والبيانات المنظمة.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>وصف الموقع (عربي) - SEO Description</Label>
                            <textarea {...globalForm.register("seoDescriptionAr")} className="w-full min-h-[100px] p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label>SEO Description (English)</Label>
                            <textarea {...globalForm.register("seoDescriptionEn")} dir="ltr" className="w-full min-h-[100px] p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm font-sans" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>الرقم الضريبي للمؤسسة (Tax ID)</Label>
                            <Input {...globalForm.register("orgTaxId")} />
                        </div>
                        <div className="space-y-2">
                            <Label>تاريخ التأسيس (Founding Date)</Label>
                            <Input {...globalForm.register("orgFoundingDate")} placeholder="مثال: 1995" />
                        </div>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 6: Privacy & Compliance */}
          <TabsContent value="privacy" className="space-y-6">
             <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-mint-green" /> الخصوصية والامتثال</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="space-y-0.5">
                            <Label className="text-base">Global Privacy Control (GPC)</Label>
                            <p className="text-sm text-gray-500">احترام إشارات الخصوصية العالمية من المتصفحات.</p>
                        </div>
                        <Switch
                            checked={globalForm.watch("enableGPC")}
                            onCheckedChange={(val) => globalForm.setValue("enableGPC", val)}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="space-y-0.5">
                            <Label className="text-base">بانر الكوكيز (Cookie Banner)</Label>
                            <p className="text-sm text-gray-500">إظهار رسالة الموافقة على ملفات تعريف الارتباط.</p>
                        </div>
                        <Switch
                            checked={globalForm.watch("showCookieBanner")}
                            onCheckedChange={(val) => globalForm.setValue("showCookieBanner", val)}
                        />
                    </div>
                </CardContent>
             </Card>
          </TabsContent>

          {/* Global Save Button */}
          <div className="!mt-8 flex justify-end gap-3 sticky bottom-0 bg-slate-50/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 z-10">
             {Object.keys(globalForm.formState.errors).length > 0 && (
               <p className="text-red-500 text-sm flex items-center gap-2 px-4 font-bold animate-pulse">
                 يرجى مراجعة التبويبات لتصحيح الأخطاء
               </p>
             )}
             <SubmitButton loading={globalForm.formState.isSubmitting} />
          </div>
        </form>

        {/* Tab 7: SMTP (Separate Form) */}
        <TabsContent value="smtp">
          <form onSubmit={smtpForm.handleSubmit(onSMTPSubmit)}>
            <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle>إعدادات البريد (SMTP)</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Host</Label>
                        <Input {...smtpForm.register("host")} dir="ltr" />
                    </div>
                    <div className="space-y-2">
                        <Label>Port</Label>
                        <Input {...smtpForm.register("port", { valueAsNumber: true })} type="number" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                        <Label>Username</Label>
                        <Input {...smtpForm.register("user")} dir="ltr" />
                    </div>
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input {...smtpForm.register("pass")} type="password" dir="ltr" />
                    </div>
                </CardContent>
                <div className="flex justify-end mt-8">
                    <SubmitButton loading={smtpForm.formState.isSubmitting} />
                </div>
            </Card>
          </form>
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
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 ml-2" /> حفظ الإعدادات</>}
        </Button>
    )
}
