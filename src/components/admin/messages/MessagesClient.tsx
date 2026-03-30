'use client'

import React, { useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { markAsRead, deleteMessage } from "@/actions/messages";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
}

export default function MessagesClient({ initialData }: { initialData: Message[] }) {
  const [messages, setMessages] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
    if (hours > 0) return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
    return 'منذ دقائق';
  };

  const handleView = async (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      await markAsRead(msg.id);
      setMessages(messages.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    
    setLoading(id);
    const result = await deleteMessage(id);
    if (result.success) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
    setLoading(null);
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد رسائل</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer hover:shadow-sm ${
              msg.read ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex items-center gap-4 flex-1" onClick={() => handleView(msg)}>
              {msg.read ? (
                <MailOpen className="w-5 h-5 text-gray-400" />
              ) : (
                <Mail className="w-5 h-5 text-blue-600" />
              )}
              <div className="flex-1">
                <p className={`font-semibold ${msg.read ? "text-gray-700" : "text-gray-900"}`}>
                  {msg.name}
                </p>
                <p className={`text-sm ${msg.read ? "text-gray-500" : "text-gray-700"}`}>
                  {msg.subject || msg.message.substring(0, 50)}...
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-left">
                <p className="text-xs text-gray-500">{getTimeAgo(msg.createdAt)}</p>
                <button 
                  onClick={() => handleView(msg)}
                  className="text-primary hover:underline text-sm mt-1"
                >
                  عرض
                </button>
              </div>
              <button
                onClick={() => handleDelete(msg.id)}
                disabled={loading === msg.id}
                className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMessage(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.name}</h2>
                <p className="text-gray-600">{selectedMessage.email}</p>
                {selectedMessage.phone && <p className="text-gray-600">{selectedMessage.phone}</p>}
              </div>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            {selectedMessage.subject && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">الموضوع:</p>
                <p className="font-semibold text-gray-900">{selectedMessage.subject}</p>
              </div>
            )}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">الرسالة:</p>
              <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <div className="text-sm text-gray-500">
              {getTimeAgo(selectedMessage.createdAt)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
