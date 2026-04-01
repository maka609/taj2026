"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateGlobalSettings, updateSMTPConfig } from "@/actions/settings";
import { GlobalSettingsSchema, SMTPConfigSchema } from "@/lib/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save, Globe, Mail, Layout, Palette, Phone, MapPin } from "lucide-react";
import { z } from "zod";

interface SettingsFormProps {
  globalSettings: any;
  smtpConfig: any;
}

export default function SettingsForm({ globalSettings, smtpConfig }: SettingsFormProps) {

  // 1. General & Hero & Footer Form
  const globalForm = useForm<z.infer<typeof GlobalSettingsSchema>>({
    resolver: zodResolver(GlobalSettingsSchema),
    defaultValues: globalSettings || {
      siteNameAr: "مدارس تاج النزهة",
      siteNameEn: "Taj Schools",
      primaryColor: "#7c3aed",
      secondaryColor: "#ea580c",
      contactEmail: "info@taj-schools.com",
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

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-deep-navy tracking-tight">إعدادات المنصة ⚙️</h1>
        <p className="text-gray-500 font-medium">تحكم في كل تفاصيل الموقع، من الألوان إلى إعدادات البريد.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white/50 border border-white/20 shadow-sm mb-8 overflow-x-auto justify-start h-auto p-1.5 gap-1.5 flex-nowrap">
          <TabsTrigger value="general" className="gap-2 h-11"><Globe className="w-4 h-4" /> عام</TabsTrigger>
          <TabsTrigger value="hero" className="gap-2 h-11"><Layout className="w-4 h-4" /> الهيرو</TabsTrigger>
          <TabsTrigger value="footer" className="gap-2 h-11"><MapPin className="w-4 h-4" /> التذييل</TabsTrigger>
          <TabsTrigger value="smtp" className="gap-2 h-11"><Mail className="w-4 h-4" /> البريد (SMTP)</TabsTrigger>
        </TabsList>

        <form onSubmit={globalForm.handleSubmit(onGlobalSubmit)}>
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                   <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary"/> هوية الموقع</CardTitle>
                   <CardDescription>الأسماء واللوجو الأساسي للمنصة.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-4">
                  <div className="space-y-2">
                    <Label>اسم الموقع (عربي)</Label>
                    <Input {...globalForm.register("siteNameAr")} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Site Name (English)</Label>
                    <Input {...globalForm.register("siteNameEn")} dir="ltr" className="h-12 rounded-xl font-sans" />
                  </div>
                  <div className="space-y-2">
                    <Label>رابط اللوجو</Label>
                    <Input {...globalForm.register("logoUrl")} dir="ltr" className="h-12 rounded-xl font-sans" placeholder="https://..." />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium p-6">
                <CardHeader className="px-0 pt-0">
                   <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-vibrant-orange"/> نظام الألوان</CardTitle>
                   <CardDescription>الألوان الأساسية للهوية البصرية.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-4">
                  <div className="space-y-2">
                    <Label>اللون الأساسي (Primary)</Label>
                    <div className="flex gap-2">
                        <Input {...globalForm.register("primaryColor")} type="color" className="h-12 w-20 p-1 rounded-xl" />
                        <Input {...globalForm.register("primaryColor")} dir="ltr" className="h-12 flex-1 rounded-xl font-sans" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>اللون الثانوي (Secondary)</Label>
                    <div className="flex gap-2">
                        <Input {...globalForm.register("secondaryColor")} type="color" className="h-12 w-20 p-1 rounded-xl" />
                        <Input {...globalForm.register("secondaryColor")} dir="ltr" className="h-12 flex-1 rounded-xl font-sans" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hero" className="space-y-6">
            <Card className="card-premium p-8">
                <CardHeader className="px-0 pt-0">
                    <CardTitle>محتوى قسم الهيرو (Hero Section)</CardTitle>
                    <CardDescription>العناوين الرئيسية التي تظهر في الصفحة الافتتاحية.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>العنوان الرئيسي (عربي)</Label>
                            <Input {...globalForm.register("heroTitleAr")} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label>العنوان الفرعي (عربي)</Label>
                            <Input {...globalForm.register("heroSubtitleAr")} className="h-12 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Hero Main Title (English)</Label>
                            <Input {...globalForm.register("heroTitleEn")} dir="ltr" className="h-12 rounded-xl font-sans" />
                        </div>
                        <div className="space-y-2">
                            <Label>Hero Subtitle (English)</Label>
                            <Input {...globalForm.register("heroSubtitleEn")} dir="ltr" className="h-12 rounded-xl font-sans" />
                        </div>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="card-premium p-6 lg:col-span-2">
                    <CardHeader className="px-0 pt-0"><CardTitle>معلومات التواصل</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>البريد الإلكتروني</Label>
                            <Input {...globalForm.register("contactEmail")} dir="ltr" className="h-12 rounded-xl font-sans" />
                        </div>
                        <div className="space-y-2">
                            <Label>رقم الهاتف</Label>
                            <Input {...globalForm.register("contactPhone")} dir="ltr" className="h-12 rounded-xl font-sans" />
                        </div>
                        <div className="space-y-2">
                            <Label>العنوان (عربي)</Label>
                            <Input {...globalForm.register("contactAddressAr")} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label>Address (English)</Label>
                            <Input {...globalForm.register("contactAddressEn")} dir="ltr" className="h-12 rounded-xl font-sans" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0"><CardTitle>روابط التواصل الاجتماعي</CardTitle></CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                        <div className="relative">
                            <Input {...globalForm.register("facebookUrl")} dir="ltr" className="h-11 rounded-xl font-sans text-xs" placeholder="Facebook URL" />
                        </div>
                        <div className="relative">
                            <Input {...globalForm.register("instagramUrl")} dir="ltr" className="h-11 rounded-xl font-sans text-xs" placeholder="Instagram URL" />
                        </div>
                        <div className="relative">
                            <Input {...globalForm.register("youtubeUrl")} dir="ltr" className="h-11 rounded-xl font-sans text-xs" placeholder="Youtube URL" />
                        </div>
                        <div className="relative">
                            <Input {...globalForm.register("twitterUrl")} dir="ltr" className="h-11 rounded-xl font-sans text-xs" placeholder="X / Twitter URL" />
                        </div>
                    </CardContent>
                </Card>
             </div>
          </TabsContent>

          <TabsContent value="general" className="!mt-8 flex justify-end">
             <SubmitButton loading={globalForm.formState.isSubmitting} />
          </TabsContent>
          <TabsContent value="hero" className="!mt-8 flex justify-end">
             <SubmitButton loading={globalForm.formState.isSubmitting} />
          </TabsContent>
          <TabsContent value="footer" className="!mt-8 flex justify-end">
             <SubmitButton loading={globalForm.formState.isSubmitting} />
          </TabsContent>
        </form>

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
                    <div className="space-y-2">
                        <Label>From Email (بريد المرسل)</Label>
                        <Input {...smtpForm.register("fromEmail")} dir="ltr" className="h-12 rounded-xl font-sans" />
                    </div>
                    <div className="space-y-2">
                        <Label>From Name (اسم المرسل)</Label>
                        <Input {...smtpForm.register("fromName")} className="h-12 rounded-xl" />
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
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 ml-2" /> حفظ التغييرات</>}
        </Button>
    )
}
