"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, User, Phone, Home, GraduationCap, ArrowRight, ArrowLeft, Loader2, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { submitAdmission } from "@/actions/admissions";

export default function AdmissionPage() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const steps = [
    { id: 1, title: isRtl ? "بيانات الطالب" : "Student Info", icon: User },
    { id: 2, title: isRtl ? "بيانات ولي الأمر" : "Parent Info", icon: Phone },
    { id: 3, title: isRtl ? "السكن والتواصل" : "Contact Info", icon: Home },
    { id: 4, title: isRtl ? "المرحلة الدراسية" : "Academic Grade", icon: GraduationCap },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<any>({
    studentNameAr: "",
    studentNameEn: "",
    dateOfBirth: "",
    gender: "ذكر",
    parentName: "",
    nationalId: "",
    job: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    gradeApplying: "",
    previousSchool: "",
    notes: ""
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length) {
      // Basic client-side validation per step
      if (currentStep === 1) {
        if (!formData.studentNameAr || !formData.studentNameEn || !formData.dateOfBirth) {
            toast.error(isRtl ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields");
            return;
        }
      }
      if (currentStep === 2) {
        if (!formData.parentName || !formData.nationalId || !formData.job) {
            toast.error(isRtl ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields");
            return;
        }
      }
      if (currentStep === 3) {
        if (!formData.parentPhone || !formData.parentEmail || !formData.address) {
            toast.error(isRtl ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields");
            return;
        }
      }
      nextStep();
    } else {
      setIsSubmitting(true);
      try {
        const result = await submitAdmission({
          studentNameAr: formData.studentNameAr,
          studentNameEn: formData.studentNameEn,
          gradeApplying: formData.gradeApplying,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender as any,
          parentEmail: formData.parentEmail,
          parentPhone: formData.parentPhone,
          notes: `Parent: ${formData.parentName}, Job: ${formData.job}, Address: ${formData.address}`,
        });

        if (result.success) {
          setIsSuccess(true);
          toast.success(isRtl ? "تم إرسال طلبك بنجاح" : "Your application has been sent successfully");
        } else {
          toast.error(result.error || (isRtl ? "حدث خطأ" : "An error occurred"));
        }
      } catch (err) {
        toast.error(isRtl ? "فشل الاتصال بالخادم" : "Server connection failed");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6 pt-24" dir={isRtl ? "rtl" : "ltr"}>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl w-full text-center space-y-10"
        >
          <div className="relative mx-auto w-32 h-32 rounded-[3rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-2xl shadow-emerald-500/10">
            <CheckCircle2 className="w-16 h-16" />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-emerald-200 rounded-[3rem]"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-deep-navy">{isRtl ? "تم استلام طلبكم!" : "Application Received!"}</h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
                {isRtl
                  ? "شكراً لانضمامكم لعائلة مدارس تاج النزهة. سنقوم بمراجعة طلبكم والتواصل معكم عبر الهاتف أو البريد الإلكتروني في أقرب وقت ممكن لبدء إجراءات المقابلة."
                  : "Thank you for joining the Taj Al-Nozha family. We will review your application and contact you via phone or email as soon as possible to start the interview procedures."}
            </p>
          </div>

          <Button
            onClick={() => window.location.href = `/${locale}`}
            className="h-16 px-12 rounded-[1.5rem] font-black text-lg shadow-2xl shadow-primary/30 w-full"
          >
            {isRtl ? "العودة للرئيسية" : "Back to Home"}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-40 pb-24 px-6 overflow-hidden" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3 h-3" /> {isRtl ? "خطوة نحو المستقبل" : "A step towards the future"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-deep-navy tracking-tight"
          >
            {t("admission")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-medium text-lg"
          >
            {isRtl
              ? "يرجى ملء النموذج أدناه بدقة، وسيتواصل معك فريق القبول لدينا قريباً."
              : "Please fill out the form below accurately, and our admissions team will contact you soon."}
          </motion.p>
        </div>

        {/* Stepper Modern */}
        <div className="flex items-center justify-between mb-16 relative px-4 max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{
                      scale: isCurrent ? 1.2 : 1,
                      backgroundColor: isActive ? "var(--color-primary)" : "#ffffff"
                  }}
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                    isActive ? "border-primary shadow-xl shadow-primary/20 text-white" : "border-gray-100 text-gray-400"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <span className={cn(
                  "absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-colors duration-500",
                  isActive ? "text-primary" : "text-gray-400"
                )}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container Modern */}
        <Card className="border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] bg-white overflow-hidden">
          <CardContent className="p-10 sm:p-16">
            <form onSubmit={handleSubmit} className="space-y-12">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: locale === "ar" ? -20 : 20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "اسم الطالب (عربي)" : "Student Name (Arabic)"}</label>
                        <Input name="studentNameAr" value={formData.studentNameAr} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" placeholder="محمد أحمد علي" required />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "الاسم بالكامل (إنجليزي)" : "Full Name (English)"}</label>
                        <Input dir="ltr" name="studentNameEn" value={formData.studentNameEn} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-sans font-bold px-6 focus:bg-white transition-all" placeholder="Mohamed Ahmed Ali" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "تاريخ الميلاد" : "Date of Birth"}</label>
                        <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" required />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "النوع" : "Gender"}</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-14 px-6 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold appearance-none" required>
                          <option value="ذكر">{isRtl ? "ذكر" : "Male"}</option>
                          <option value="أنثى">{isRtl ? "أنثى" : "Female"}</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "اسم ولي الأمر" : "Parent Name"}</label>
                      <Input name="parentName" value={formData.parentName} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" placeholder={isRtl ? "أحمد علي حسن" : "Ahmed Ali Hassan"} required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "الرقم القومي" : "National ID"}</label>
                        <Input name="nationalId" value={formData.nationalId} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" placeholder="29010101234567" required minLength={14} maxLength={14} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "الوظيفة" : "Job"}</label>
                        <Input name="job" value={formData.job} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" placeholder={isRtl ? "مهندس، طبيب..." : "Engineer, Doctor..."} required />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "رقم الهاتف" : "Phone Number"}</label>
                        <Input dir="ltr" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" placeholder="01012345678" required />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "البريد الإلكتروني" : "Email Address"}</label>
                        <Input dir="ltr" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" placeholder="parent@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "العنوان بالتفصيل" : "Detailed Address"}</label>
                      <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-6 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none" rows={4} placeholder="المحافظة، الحي، الشارع..." required />
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "المرحلة الدراسية المطلوبة" : "Grade Applying"}</label>
                      <select name="gradeApplying" value={formData.gradeApplying} onChange={handleChange} className="w-full h-14 px-6 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold appearance-none" required>
                        <option value="">{isRtl ? "اختر المرحلة" : "Select Grade"}</option>
                        <option>تمهيدي (Pre-KG)</option>
                        <option>حضانة (KG1)</option>
                        <option>حضانة (KG2)</option>
                        <option>الأول الابتدائي</option>
                        <option>الثاني الابتدائي</option>
                        <option>الثالث الابتدائي</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-deep-navy uppercase tracking-wider">{isRtl ? "المدرسة السابقة (إن وجد)" : "Previous School (if any)"}</label>
                      <Input name="previousSchool" value={formData.previousSchool} onChange={handleChange} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6 focus:bg-white transition-all" />
                    </div>
                    <div className="flex items-start gap-4 p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-blue-900/70 font-bold leading-relaxed">
                          {isRtl
                            ? "أقر بصحة جميع البيانات المدخلة أعلاه وأوافق على شروط وسياسات القبول الخاصة بمدارس تاج النزهة اللغوية."
                            : "I acknowledge the accuracy of all the data entered above and agree to the terms and admission policies of Taj Al-Nozha Language Schools."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pt-10 border-t border-gray-50">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isSubmitting}
                  className={cn(
                    "h-14 px-8 rounded-2xl font-black transition-all",
                    currentStep === 1 ? "invisible" : "text-gray-400 hover:bg-gray-100"
                  )}
                >
                  <ArrowRight className={cn("w-5 h-5 ml-2", isRtl ? "" : "rotate-180")} />
                  {isRtl ? "السابق" : "Previous"}
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-10 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 transition-all hover:scale-[1.05] active:scale-95 min-w-[180px]"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      {currentStep === steps.length ? (isRtl ? "إرسال الطلب" : "Submit Request") : (isRtl ? "التالي" : "Next")}
                      {currentStep < steps.length && <ArrowLeft className={cn("w-5 h-5 mr-2", isRtl ? "" : "rotate-180")} />}
                      {currentStep === steps.length && <Send className="w-5 h-5 mr-2" />}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
