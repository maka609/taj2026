"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500" dir="rtl">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-4 w-96 rounded-lg" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-none shadow-sm bg-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-12 w-12 rounded-2xl" />
                <Skeleton className="h-6 w-16 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
              <Skeleton className="h-6 w-32 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
            <div className="p-0">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="px-8 py-5 flex items-center justify-between border-b last:border-0 border-gray-50">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32 rounded-lg" />
                        <Skeleton className="h-3 w-20 rounded-lg" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64 rounded-xl" />
                    <Skeleton className="h-4 w-96 rounded-lg" />
                </div>
                <Skeleton className="h-12 w-48 rounded-2xl" />
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardContent className="p-6">
                    <Skeleton className="h-11 w-full rounded-xl" />
                </CardContent>
            </Card>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-50 flex gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-4 flex-1 rounded-lg" />
                    ))}
                </div>
                <div className="divide-y divide-gray-50">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="px-6 py-5 flex items-center gap-4">
                             {[...Array(4)].map((_, j) => (
                                <Skeleton key={j} className="h-10 flex-1 rounded-xl" />
                             ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
