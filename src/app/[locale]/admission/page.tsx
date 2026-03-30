"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, User, Phone, Home, GraduationCap, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "بيانات الطالب", icon: User },
  { id: 2, title: "بيانات ولي الأمر", icon: Phone },
  { id: 3, title: "السكن والتواصل", icon: Home },
  { id: 4, title: "المرحلة الدراسية", icon: GraduationCap },
];

export default function AdmissionPage() {
  const t = useTranslations("Navigation");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length) {
      nextStep();
    } else {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" dir="rtl">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">تم إرسال الطلب بنجاح!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            شكراً لثقتكم في مدارس تاج النزهة. سنقوم بمراجعة طلبكم والتواصل معكم عبر الهاتف أو البريد الإلكتروني في أقرب وقت ممكن.
          </p>
          <button 
            onClick={() => window.location.href = "/ar"}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t("admission")}</h1>
          <p className="text-gray-500 text-lg">يرجى ملء البيانات بدقة لضمان سرعة معالجة الطلب</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 hidden sm:block" />
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    isActive ? "bg-primary text-white scale-110 shadow-lg" : "bg-white text-gray-400 border-2 border-gray-200"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "mt-3 text-sm font-bold hidden sm:block",
                  isActive ? "text-primary" : "text-gray-400"
                )}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">اسم الطالب كاملاً (بالعربي)</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="محمد أحمد علي" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">اسم الطالب كاملاً (إنجليزي)</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Mohamed Ahmed Ali" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">تاريخ الميلاد</label>
                    <input type="date" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">النوع</label>
                    <select className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                      <option>ذكر</option>
                      <option>أنثى</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">اسم ولي الأمر</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="أحمد علي حسن" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">الرقم القومي لولي الأمر</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="29010101234567" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">الوظيفة</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">رقم الهاتف الأساسي</label>
                    <input type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="01012345678" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
                    <input type="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="parent@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">العنوان بالتفصيل</label>
                  <textarea className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" rows={3} required></textarea>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">المرحلة الدراسية المطلوبة</label>
                  <select className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required>
                    <option value="">اختر المرحلة</option>
                    <option>تمهيدي (Pre-KG)</option>
                    <option>حضانة (KG1)</option>
                    <option>حضانة (KG2)</option>
                    <option>الأول الابتدائي</option>
                    <option>الثاني الابتدائي</option>
                    <option>الثالث الابتدائي</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">المدرسة السابقة (إن وجد)</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                </div>
                <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-amber-800">بالضغط على إرسال، أنت توافق على شروط وقواعد القبول بالمدرسة.</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className={cn(
                  "px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all",
                  currentStep === 1 ? "invisible" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
              >
                <ArrowRight className="w-5 h-5" />
                السابق
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {currentStep === steps.length ? "إرسال الطلب" : "التالي"}
                    {currentStep < steps.length && <ArrowLeft className="w-5 h-5" />}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
