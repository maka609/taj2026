"use client";

import React, { useState } from "react";
import { Search, Calendar, GraduationCap, Mail, Phone, MoreHorizontal } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { updateAdmissionStatus } from "@/actions/admissions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AdmissionStatus = "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED";

interface AdmissionApplication {
    id: string;
    studentNameAr: string;
    studentNameEn: string;
    gradeApplying: string;
    dateOfBirth: Date;
    gender: string;
    parentEmail: string;
    parentPhone: string;
    status: string;
    notes?: string | null;
    createdAt: Date;
}

interface AdmissionsDashboardProps {
  initialData: AdmissionApplication[];
}

export default function AdmissionsDashboard({ initialData }: AdmissionsDashboardProps) {
  const [admissions, setAdmissions] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdmissionStatus | "ALL">("ALL");

  const filteredData = admissions.filter(item => {
    const matchesSearch = item.studentNameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.parentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: AdmissionStatus) => {
    const result = await updateAdmissionStatus(id, status);
    if (result.success) {
      setAdmissions(admissions.map(a => a.id === id ? { ...a, status } : a));
      toast.success(`تم تغيير حالة الطلب إلى ${getStatusLabel(status)}`);
    } else {
      toast.error("فشل في تحديث حالة الطلب");
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING": return "قيد الانتظار";
      case "REVIEWING": return "قيد المراجعة";
      case "APPROVED": return "مقبول";
      case "REJECTED": return "مرفوض";
      default: return status;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-50 text-amber-600 border-amber-100";
      case "REVIEWING": return "bg-blue-50 text-blue-600 border-blue-100";
      case "APPROVED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "REJECTED": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  const columns: ColumnDef<AdmissionApplication>[] = [
    {
      header: "الطالب",
      accessorKey: (row: AdmissionApplication) => (
        <div className="flex flex-col">
          <p className="font-bold text-gray-900">{row.studentNameAr}</p>
          <div className="flex items-center gap-1 mt-1">
            <GraduationCap className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] text-gray-500 font-medium">{row.gradeApplying}</span>
          </div>
        </div>
      ),
    },
    {
      header: "معلومات التواصل",
      accessorKey: (row: AdmissionApplication) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600 font-sans">{row.parentEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600 font-sans">{row.parentPhone || "N/A"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "تاريخ الطلب",
      accessorKey: (row: AdmissionApplication) => (
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-3 h-3" />
          <span className="text-xs font-medium">
            {new Date(row.createdAt).toLocaleDateString('ar-EG')}
          </span>
        </div>
      ),
    },
    {
      header: "الحالة",
      accessorKey: (row: AdmissionApplication) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(row.status)}`}>
          {getStatusLabel(row.status)}
        </span>
      ),
    },
    {
        header: "إجراءات",
        accessorKey: (row: AdmissionApplication) => (
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                    <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1.5">تغيير الحالة</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleStatusChange(row.id, "REVIEWING")} className="rounded-lg cursor-pointer">قيد المراجعة</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(row.id, "APPROVED")} className="rounded-lg cursor-pointer text-emerald-600 font-medium">قبول الطلب</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(row.id, "REJECTED")} className="rounded-lg cursor-pointer text-rose-600 font-medium">رفض الطلب</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-lg cursor-pointer">عرض التفاصيل</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">طلبات القبول 📝</h1>
        <p className="text-gray-500 font-medium">مراجعة وإدارة طلبات الالتحاق الجديدة بالمدرسة.</p>
      </div>

      {/* Filters & Search */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="بحث باسم الطالب أو البريد الإلكتروني..."
                    className="pr-10 h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
                    <Button
                        key={status}
                        variant={statusFilter === status ? "default" : "outline"}
                        onClick={() => setStatusFilter(status as AdmissionStatus | "ALL")}
                        className={`h-11 rounded-xl px-4 font-bold transition-all whitespace-nowrap ${statusFilter === status ? "shadow-md shadow-primary/20" : "border-gray-100 text-gray-500"}`}
                    >
                        {status === "ALL" ? "الكل" : getStatusLabel(status)}
                    </Button>
                ))}
            </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
            data={filteredData}
            columns={columns}
        />
      </div>

    </div>
  );
}
