"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Sparkles, Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

// Generate static positions for particles to avoid hydration mismatch
const particlePositions = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 13.7 + 17) % 100,
  top: (i * 23.3 + 11) % 100,
  delay: (i * 0.5) % 5,
  duration: 3 + (i * 0.7) % 7,
}));

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    
    // Check if user has already seen the splash screen
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash === 'true') {
      // User has seen splash before, don't show it
      setIsVisible(false);
      return;
    }
    
    // First time visitor, show splash
    setIsVisible(true);
    
    // Show language buttons after 2 seconds
    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 2000);

    return () => {
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleLanguageSelect = (locale: string) => {
    // Mark that user has seen the splash screen
    localStorage.setItem('hasSeenSplash', 'true');
    
    setIsVisible(false);
    
    // Check if we need to change language
    const currentLocale = pathname.split('/')[1];
    if (currentLocale !== locale) {
      setTimeout(() => {
        router.push(`/${locale}`);
      }, 500);
    }
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-2xl">
        
        {/* Logo with Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 w-40 h-40 border-4 border-blue-500/30 rounded-full animate-ping"></div>
            
            {/* Middle Ring */}
            <div className="absolute inset-2 w-36 h-36 border-4 border-blue-400/40 rounded-full animate-spin-slow"></div>
            
            {/* Logo Container */}
            <div className="relative w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce-slow">
              <GraduationCap className="w-20 h-20 text-white" />
              <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-yellow-300 animate-pulse" />
              <Sparkles className="absolute -bottom-3 -left-3 w-6 h-6 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* School Name */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight animate-fade-in drop-shadow-2xl">
            مدارس تاج النزهة
          </h1>
          <p className="text-2xl md:text-3xl text-blue-300 font-bold animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Taj Al-Nozha Schools
          </p>
          <div className="flex items-center justify-center gap-3 text-blue-200/90 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Sparkles className="w-5 h-5" />
            <p className="text-lg font-semibold">حيث يبدأ التميز والإبداع</p>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Language Selection Buttons */}
        {showButtons && (
          <div className="space-y-6 animate-fade-in-up pt-8">
            <div className="flex items-center justify-center gap-2 text-white/80 mb-4">
              <Globe className="w-5 h-5" />
              <p className="text-sm font-medium">اختر اللغة / Choose Language</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Arabic Button */}
              <button
                onClick={() => handleLanguageSelect('ar')}
                className="group relative w-64 px-8 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-black text-white">ع</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">العربية</p>
                    <p className="text-sm text-blue-200">للأولياء والطلاب</p>
                  </div>
                </div>
              </button>

              {/* English Button */}
              <button
                onClick={() => handleLanguageSelect('en')}
                className="group relative w-64 px-8 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-black text-white">EN</span>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-black text-white">English</p>
                    <p className="text-sm text-blue-200">For Parents & Students</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Decorative hint */}
            <p className="text-white/60 text-sm animate-pulse mt-6">
              👆 اضغط لاختيار اللغة المفضلة
            </p>
          </div>
        )}

        {/* Loading indicator before buttons appear */}
        {!showButtons && (
          <div className="flex justify-center gap-2 animate-fade-in pt-8" style={{ animationDelay: '0.9s' }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-30px) translateX(15px); 
            opacity: 0.7; 
          }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { 
            transform: translateY(0) scale(1); 
          }
          50% { 
            transform: translateY(-10px) scale(1.05); 
          }
        }
        
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
