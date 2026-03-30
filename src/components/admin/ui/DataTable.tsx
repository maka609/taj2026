"use client";

import React from "react";
import { Edit, Trash2, BoxSelect } from "lucide-react";

export type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T | ((row: T) => React.ReactNode);
  className?: string;
};

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  isLoading?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading
}: DataTableProps<T>) {

  if (isLoading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 animate-pulse">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium tracking-wide">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <BoxSelect className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد بيانات حالياً</h3>
        <p className="text-gray-500 text-sm">قم بإضافة عنصر جديد ليظهر هنا.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50/80 text-gray-500 uppercase font-bold tracking-tight text-xs">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={`px-6 py-5 whitespace-nowrap ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-5 text-center w-32 whitespace-nowrap">الإجراءات</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${col.className || ""}`}>
                    {typeof col.accessorKey === 'function' 
                      ? col.accessorKey(row) 
                      : (row[col.accessorKey] as React.ReactNode)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(row)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(row)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
