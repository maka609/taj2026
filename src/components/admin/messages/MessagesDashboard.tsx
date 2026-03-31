"use client";

import React, { useState } from "react";
import { Mail, MailOpen, User, Phone, Calendar, Search } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AdminModal } from "@/components/ui/admin-modal";
import { deleteMessage, markAsRead } from "@/actions/messages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface MessagesDashboardProps {
  initialData: MessageItem[];
}

export default function MessagesDashboard({ initialData }: MessagesDashboardProps) {
  const [messages, setMessages] = useState(initialData);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = messages.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns: ColumnDef<MessageItem>[] = [
    {
      header: "المرسل",
      accessorKey: (row: MessageItem) => (
        <div className={`flex items-center gap-3 ${!row.read ? "font-bold" : ""}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!row.read ? "bg-blue-100 text-primary" : "bg-gray-100 text-gray-400"}`}>
            {row.read ? <MailOpen className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-gray-900">{row.name}</p>
            <p className="text-[10px] text-gray-400 font-sans">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "الموضوع",
      accessorKey: (row: MessageItem) => (
        <p className={`text-sm truncate max-w-[250px] ${!row.read ? "font-bold text-gray-900" : "text-gray-500"}`}>
            {row.subject || "بدون موضوع"}
        </p>
      ),
    },
    {
      header: "التاريخ",
      accessorKey: (row: MessageItem) => (
        <span className="text-xs text-gray-400 font-medium">
            {new Date(row.createdAt).toLocaleDateString('ar-EG')}
        </span>
      ),
    }
  ];

  const handleView = async (row: MessageItem) => {
    setSelectedMessage(row);
    if (!row.read) {
        const result = await markAsRead(row.id);
        if (result.success) {
            setMessages(messages.map(m => m.id === row.id ? { ...m, read: true } : m));
        }
    }
  };

  const handleDelete = async (row: MessageItem) => {
    if (confirm(`هل أنت متأكد من حذف هذه الرسالة؟`)) {
      const result = await deleteMessage(row.id);
      if (result.success) {
          setMessages(messages.filter(m => m.id !== row.id));
          toast.success("تم حذف الرسالة بنجاح");
      } else {
          toast.error("فشل في الحذف");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">بريد الرسائل 💬</h1>
        <p className="text-gray-500 font-medium">استقبال ومتابعة رسائل التواصل من زوار الموقع.</p>
      </div>

      {/* Search */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-4 sm:p-6">
            <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="بحث في الرسائل..."
                    className="pr-10 h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={filteredData}
            columns={columns}
            onEdit={handleView}
            onDelete={handleDelete}
        />
      </div>

      {/* View Modal */}
      <AdminModal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="تفاصيل الرسالة"
      >
        {selectedMessage && (
            <div className="space-y-8" dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">المرسل</p>
                            <p className="font-bold text-gray-900">{selectedMessage.name}</p>
                            <p className="text-xs text-primary font-sans">{selectedMessage.email}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">الهاتف</p>
                            <p className="font-bold text-gray-900 font-sans">{selectedMessage.phone || "غير متوفر"}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                            <Calendar className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">تاريخ الإرسال</p>
                            <p className="font-bold text-gray-900">{new Date(selectedMessage.createdAt).toLocaleString('ar-EG')}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">نص الرسالة</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                        {selectedMessage.message}
                    </p>
                </div>

                <div className="pt-6 border-t border-gray-50 flex justify-end">
                    <Button onClick={() => setSelectedMessage(null)} className="h-11 rounded-xl px-8 font-bold">
                        إغلاق
                    </Button>
                </div>
            </div>
        )}
      </AdminModal>

    </div>
  );
}
