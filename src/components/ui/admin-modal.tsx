"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function AdminModal({ isOpen, onClose, title, children, className }: AdminModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("max-w-2xl rounded-[3rem] p-0 border border-white/20 bg-white/60 backdrop-blur-3xl shadow-3xl overflow-hidden", className)} dir="rtl">
        {/* Custom Header to match the Ultra-Modern design */}
        <DialogHeader className="px-10 py-8 border-b border-white/20 bg-white/20 sticky top-0 z-10">
          <DialogTitle className="text-2xl font-black text-deep-navy tracking-tight">{title}</DialogTitle>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </DialogContent>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e5e7eb;
        }
      `}</style>
    </Dialog>
  );
}
