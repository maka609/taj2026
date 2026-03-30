"use client";

import { useState } from "react";
import { loginAction } from "@/actions/auth";
import { Loader2, Lock, Mail, GraduationCap, Sparkles, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, setIsPending] = useState(false);

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
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl w-full mx-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Side - Branding */}
        <div className="hidden md:block text-white space-y-8 pr-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 rotate-6 hover:rotate-0 transition-transform duration-500">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">مدارس تاج النزهة</h1>
              <p className="text-blue-300 font-medium">Taj Schools Portal</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                <Shield className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">دخول آمن ومشفر</h3>
                <p className="text-blue-200/80 text-sm">حماية كاملة لبياناتك الشخصية</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">واجهة سهلة وعصرية</h3>
                <p className="text-blue-200/80 text-sm">تجربة استخدام مميزة وسلسة</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                <GraduationCap className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">متابعة شاملة</h3>
                <p className="text-blue-200/80 text-sm">كل ما تحتاجه في مكان واحد</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-blue-200/60 text-sm">
              منصة متكاملة للطلاب وأولياء الأمور والموظفين
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 hover:shadow-blue-500/20 transition-all duration-500">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              تسجيل الدخول
            </h2>
            <p className="text-gray-500 font-medium">
              مرحباً بك في بوابة مدارس تاج النزهة
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700 text-sm font-bold text-center animate-shake">
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  {errorMsg}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-xl relative block w-full px-4 py-4 pr-12 border-2 border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-all"
                    placeholder="example@tajschools.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-xl relative block w-full px-4 py-4 pr-12 border-2 border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-all"
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center items-center gap-3 py-4 px-6 border-0 text-base font-black rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-[0px_0px_30px_5px] hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <span>دخول إلى البوابة</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="pt-6 border-t border-gray-200">
              <Link 
                href="/ar" 
                className="flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>العودة للصفحة الرئيسية</span>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
