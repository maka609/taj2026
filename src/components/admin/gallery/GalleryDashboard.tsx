"use client";

import React, { useState } from "react";
import { Plus, Search, Trash2, Image as ImageIcon } from "lucide-react";
import { AdminModal } from "@/components/ui/admin-modal";
import { GalleryForm } from "@/components/admin/gallery/GalleryForm";
import { deleteGalleryImage } from "@/actions/gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: string;
  url: string;
  captionAr?: string | null;
  captionEn?: string | null;
  category?: string | null;
  createdAt: Date;
}

interface GalleryDashboardProps {
  initialData: GalleryImage[];
}

export default function GalleryDashboard({ initialData }: GalleryDashboardProps) {
  const [images, setImages] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filteredData = images.filter(item => {
    const matchesSearch = (item.captionAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.captionEn?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "ALL" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الصورة؟")) {
      const result = await deleteGalleryImage(id);
      if (result.success) {
        setImages(images.filter(img => img.id !== id));
        toast.success("تم حذف الصورة بنجاح");
      } else {
        toast.error("فشل في حذف الصورة");
      }
    }
  };

  const categories = Array.from(new Set(initialData.map(img => img.category).filter(Boolean))) as string[];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">مكتبة الصور 🖼️</h1>
          <p className="text-gray-500 mt-1 font-medium">إدارة صور الفعاليات والأنشطة المدرسية.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة صور جديدة
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="بحث في وصف الصور..."
                    className="pr-10 h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <Button
                    variant={categoryFilter === "ALL" ? "default" : "outline"}
                    onClick={() => setCategoryFilter("ALL")}
                    className={`h-11 rounded-xl px-4 font-bold transition-all ${categoryFilter === "ALL" ? "shadow-md shadow-primary/20" : "border-gray-100 text-gray-500"}`}
                >
                    الكل
                </Button>
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        variant={categoryFilter === cat ? "default" : "outline"}
                        onClick={() => setCategoryFilter(cat)}
                        className={`h-11 rounded-xl px-4 font-bold transition-all whitespace-nowrap ${categoryFilter === cat ? "shadow-md shadow-primary/20" : "border-gray-100 text-gray-500"}`}
                    >
                        {cat}
                    </Button>
                ))}
            </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      {filteredData.length === 0 ? (
          <div className="w-full h-80 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد صور حالياً</h3>
            <p className="text-gray-400 text-sm font-medium">قم بإضافة صور جديدة لتظهر هنا.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
                {filteredData.map((img) => (
                    <motion.div
                        key={img.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-square hover:shadow-xl transition-all duration-500"
                    >
                        <Image
                            src={img.url}
                            alt={img.captionAr || "Gallery Image"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                            {img.captionAr && <p className="text-white font-bold text-sm line-clamp-2 mb-2">{img.captionAr}</p>}
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-white/70 bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
                                    {img.category || "عام"}
                                </span>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg shadow-lg"
                                    onClick={() => handleDelete(img.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
          </div>
      )}

      {/* Reusable Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="إضافة صور جديدة"
      >
        <GalleryForm
          onSuccess={() => {
              setIsModalOpen(false);
              // Refreshing data here would be ideal, but for now we rely on the parent state management if needed
          }}
        />
      </AdminModal>

    </div>
  );
}
