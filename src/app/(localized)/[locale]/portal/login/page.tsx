"use client";

import { useState } from "react";
import { loginAction } from "@/actions/auth";
import { Loader2, Lock, Mail, GraduationCap, Sparkles, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, setIsPending] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Login");
  const common = useTranslations("Common");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("redirectTo", "/admin");

    try {
      const result = await loginAction(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else if (result?.success) {
        window.location.href = `/${locale}/admin`;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f172a]" dir={locale === "ar" ? "rtl" : "ltr"}>
      
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-6xl w-full mx-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side - Branding */}
        <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col space-y-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-3xl shadow-primary/30 rotate-6">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tight text-white leading-none">TAJ SCHOOLS</h1>
              <p className="text-primary text-xs font-black uppercase tracking-widest">{t("portalAccess")}</p>
            </div>
          </div>

          <div className="space-y-8">
            {[
                { title: t("secureEntry"), desc: t("secureDesc"), icon: Shield },
                { title: t("modernUI"), desc: t("modernDesc"), icon: Sparkles },
                { title: t("realtime"), desc: t("realtimeDesc"), icon: GraduationCap }
            ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                        <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-1 pt-1">
                        <h3 className="text-xl font-bold text-white leading-none">{item.title}</h3>
                        <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                    </div>
                </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5">
             <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{locale === "ar" ? "مدارس تاج النزهة اللغوية" : "Taj Al-Nozha Language Schools"} &copy; {new Date().getFullYear()}</p>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3.5rem] bg-white/95 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-10 sm:p-16 space-y-10">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                            <Lock className="w-10 h-10 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-deep-navy">{t("title")}</h2>
                            <p className="text-gray-500 font-medium">{t("subtitle")}</p>
                        </div>
                        <div className="flex justify-center pt-2">
                            <LanguageSwitcher />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-bold text-center flex items-center justify-center gap-2"
                            >
                                <Shield className="w-4 h-4" />
                                {errorMsg}
                            </motion.div>
                        )}

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-deep-navy uppercase tracking-widest px-1">{common("email")}</label>
                                <div className="relative group">
                                    <Mail className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors", locale === "ar" ? "right-5" : "left-5")} />
                                    <Input
                                        name="email"
                                        type="email"
                                        dir="ltr"
                                        required
                                        className={cn("h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold focus:bg-white transition-all", locale === "ar" ? "pr-14" : "pl-14")}
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-deep-navy uppercase tracking-widest px-1">{common("password")}</label>
                                <div className="relative group">
                                    <Lock className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors", locale === "ar" ? "right-5" : "left-5")} />
                                    <Input
                                        name="password"
                                        type="password"
                                        dir="ltr"
                                        required
                                        className={cn("h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold focus:bg-white transition-all", locale === "ar" ? "pr-14" : "pl-14")}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-16 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all mt-4"
                        >
                            {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    <span>{t("cta")}</span>
                                    <ArrowLeft className={cn("w-6 h-6 mr-3", locale === "ar" ? "" : "rotate-180")} />
                                </>
                            )}
                        </Button>

                        <div className="pt-6 border-t border-gray-50">
                            <Link href={`/${locale}`} className="flex items-center justify-center gap-2 text-sm font-black text-gray-400 hover:text-primary transition-colors group">
                                <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", locale === "ar" ? "rotate-180" : "")} />
                                {common("backToHome")}
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}
