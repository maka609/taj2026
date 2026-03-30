import React from "react";
import { getMessages } from "@/actions/messages";
import MessagesClient from "@/components/admin/messages/MessagesClient";

export default async function MessagesPage() {
  const { data: messages } = await getMessages();

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">الرسائل 💬</h1>
        <p className="text-gray-500 mt-2">رسائل التواصل من أولياء الأمور والزوار</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <MessagesClient initialData={messages || []} />
      </div>
    </div>
  );
}
