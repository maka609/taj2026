import { cn } from "@/lib/utils";
import * as React from "react";
import { Edit, Trash2, BoxSelect, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 animate-in fade-in duration-500">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-bold tracking-wide">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <BoxSelect className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد بيانات حالياً</h3>
        <p className="text-gray-400 text-sm font-medium">قم بإضافة عنصر جديد ليظهر هنا.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative w-full animate-in fade-in duration-500">
      <Table dir="rtl">
        <TableHeader className="bg-gray-50/50">
          <TableRow className="hover:bg-transparent border-gray-100">
            {columns.map((col, index) => (
              <TableHead key={index} className={cn("px-6 py-5 text-right font-bold text-gray-900 uppercase tracking-tight text-xs", col.className)}>
                {col.header}
              </TableHead>
            ))}
            {(onEdit || onDelete) && (
              <TableHead className="px-6 py-5 text-center font-bold text-gray-900 uppercase tracking-tight text-xs w-32">الإجراءات</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-50">
          {data.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50/30 transition-colors border-gray-50">
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex} className={cn("px-6 py-4 whitespace-nowrap", col.className)}>
                  {typeof col.accessorKey === 'function'
                    ? col.accessorKey(row)
                    : (row[col.accessorKey] as React.ReactNode)}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(row)}
                        className="h-9 w-9 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="تعديل"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(row)}
                        className="h-9 w-9 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
