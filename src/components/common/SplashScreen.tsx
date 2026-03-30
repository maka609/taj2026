"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Sparkles } from "lucide-react";

// Generate static positions for particles to avoid hydration mismatch
const particlePositions = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 13.7 + 17) % 100,
  top: (i * 23.3 + 11) % 100,
  delay: (i * 0.5) % 5,
  duration: 3 + (i * 0.7) % 7,
}));

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Hide splash screen after animation
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

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
      <div className="relative z-10 text-center space-y-8 px-4">
        
        {/* Logo with Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 w-32 h-32 border-4 border-blue-500/30 rounded-full animate-ping"></div>
            
            {/* Middle Ring */}
            <div className="absolute inset-2 w-28 h-28 border-4 border-blue-400/40 rounded-full animate-spin-slow"></div>
            
            {/* Logo Container */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce-slow">
              <GraduationCap className="w-16 h-16 text-white" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* School Name */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight animate-fade-in">
            مدارس تاج النزهة
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 font-bold animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Taj Al-Nozha Schools
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-200/80 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Sparkles className="w-4 h-4" />
            <p className="text-sm font-medium">حيث يبدأ التميز والإبداع</p>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 mx-auto space-y-3 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-blue-500/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-blue-200 text-sm font-bold">
            {progress < 100 ? 'جاري التحميل...' : 'مرحباً بك!'}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
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
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
      `}</style>
    </div>
  );
}
