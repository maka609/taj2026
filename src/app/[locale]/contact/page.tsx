"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sendMessage } from "@/actions/messages";

export default function ContactPage() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await sendMessage(formData);
      if (result.success) {
        setIsSuccess(true);
        toast.success(isRtl ? "تم إرسال رسالتك بنجاح" : "Your message has been sent successfully");
      } else {
        toast.error(result.error || (isRtl ? "حدث خطأ" : "An error occurred"));
      }
    } catch (err) {
      toast.error(isRtl ? "فشل الاتصال بالخادم" : "Server connection failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-[#fcfcfd]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24 space-y-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
            >
                <Sparkles className="w-3 h-3" /> {isRtl ? "متاحون لخدمتكم" : "Available to serve you"}
            </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-deep-navy tracking-tight"
          >
            {t("contact")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {isRtl
              ? "لديك سؤال أو استفسار؟ فريقنا الإداري والتربوي يسعده دائماً سماع صوتكم وتقديم المساعدة اللازمة."
              : "Have a question or inquiry? Our administrative and educational team is always happy to hear from you and provide the necessary assistance."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {[
                { title: isRtl ? "موقعنا" : "Our Location", info: isRtl ? "القاهرة، النزهة الجديدة، شارع النصر" : "Cairo, New Nozha, El Nasr St", icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
                { title: isRtl ? "اتصل بنا" : "Call Us", info: "+20 123 456 7890", info2: "+20 098 765 4321", icon: Phone, color: "text-emerald-600", bg: "bg-emerald-50" },
                { title: isRtl ? "البريد الإلكتروني" : "Email", info: "info@taj-nozha.com", info2: "admissions@taj-nozha.com", icon: Mail, color: "text-violet-600", bg: "bg-violet-50" },
                { title: isRtl ? "ساعات العمل" : "Working Hours", info: isRtl ? "الأحد - الخميس: 8 صباحاً - 3 مساءً" : "Sun - Thu: 8 AM - 3 PM", info2: isRtl ? "الجمعة - السبت: مغلق" : "Fri - Sat: Closed", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" }
            ].map((item, i) => (
                <Card key={i} className="border-none shadow-sm bg-white hover:shadow-xl transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
                    <CardContent className="p-8 flex items-start gap-6 group-hover:translate-x-2 transition-transform duration-500">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500", item.bg, item.color)}>
                            <item.icon className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-black text-deep-navy">{item.title}</h3>
                            <p className="text-gray-500 font-bold text-sm leading-relaxed">{item.info}</p>
                            {item.info2 && <p className="text-gray-500 font-bold text-sm leading-relaxed">{item.info2}</p>}
                        </div>
                    </CardContent>
                </Card>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="border-none shadow-2xl shadow-gray-200/40 rounded-[3.5rem] bg-white overflow-hidden h-full">
              <CardContent className="p-10 sm:p-16">
                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center py-12 space-y-10"
                        >
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-inner">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-deep-navy">{isRtl ? "شكراً لتواصلك!" : "Thanks for reaching out!"}</h2>
                                <p className="text-gray-500 font-medium text-lg max-w-sm">
                                    {isRtl ? "لقد تم استلام رسالتك بنجاح. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن." : "Your message has been received successfully. Our team will respond as soon as possible."}
                                </p>
                            </div>
                            <Button onClick={() => setIsSuccess(false)} className="h-14 px-10 rounded-2xl font-black">
                                {isRtl ? "إرسال رسالة أخرى" : "Send another message"}
                            </Button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
                                    <MessageSquare className="w-3 h-3" /> {isRtl ? "راسلنا الآن" : "Message us now"}
                                </div>
                                <h2 className="text-4xl font-black text-deep-navy">{isRtl ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "الاسم بالكامل" : "Full Name"}</label>
                                    <Input name="name" value={formData.name} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" placeholder={isRtl ? "أدخل اسمك الكريم" : "Enter your full name"} required />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "البريد الإلكتروني" : "Email Address"}</label>
                                    <Input name="email" value={formData.email} onChange={handleChange} dir="ltr" type="email" className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-sans font-bold px-6 focus:bg-white transition-all" placeholder="name@example.com" required />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "الموضوع" : "Subject"}</label>
                                <Input name="subject" value={formData.subject} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" placeholder={isRtl ? "عن ماذا تود الاستفسار؟" : "What is your inquiry about?"} required />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "رسالتك" : "Your Message"}</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none" rows={6} placeholder={isRtl ? "اكتب استفسارك هنا بالتفصيل..." : "Write your inquiry here in detail..."} required />
                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                    <>
                                        <span>{isRtl ? "إرسال الرسالة" : "Send Message"}</span>
                                        <Send className={cn("w-5 h-5 ml-3", isRtl && "rotate-180")} />
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
