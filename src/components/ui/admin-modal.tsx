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
      <DialogContent className={cn("max-w-2xl rounded-3xl p-0 border-none shadow-2xl overflow-hidden", className)} dir="rtl">
        {/* Custom Header to match the Ultra-Modern design */}
        <DialogHeader className="px-8 py-6 border-b border-gray-50 bg-white sticky top-0 z-10 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-gray-900 tracking-tight">{title}</DialogTitle>
          {/* Close button is handled by DialogContent primitive but we can customize it via CSS or props if needed */}
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
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
