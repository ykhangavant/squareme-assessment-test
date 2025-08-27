"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Chart Skeleton
export function ChartSkeleton() {
   return (
      <Card className="fundr-card">
         <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <Skeleton className="h-6 w-20 mb-2" />
                  <div className="flex items-center gap-2">
                     <Skeleton className="h-4 w-12" />
                     <Skeleton className="h-4 w-24" />
                  </div>
               </div>
               <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
               </div>
            </div>
         </CardHeader>
         <CardContent>
            <div className="mb-4">
               <Skeleton className="h-8 w-32 mb-1" />
               <Skeleton className="h-4 w-24" />
            </div>

            <div className="h-48 sm:h-64 flex items-end justify-between px-4 pb-4">
               {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton
                     key={i}
                     className="w-6 bg-yellow-200"
                     style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
               ))}
            </div>
         </CardContent>
      </Card>
   );
}

// Table Row Skeleton
export function TableRowSkeleton() {
   return (
      <tr className="border-b">
         <td className="py-4 px-8">
            <div className="flex items-center">
               <Skeleton className="h-4 w-4 mr-3" />
               <Skeleton className="h-4 w-20" />
            </div>
         </td>
         <td className="py-4">
            <Skeleton className="h-4 w-24" />
         </td>
         <td className="py-4">
            <Skeleton className="h-4 w-16" />
         </td>
         <td className="py-4">
            <Skeleton className="h-4 w-20" />
         </td>
         <td className="py-4">
            <Skeleton className="h-4 w-16" />
         </td>
         <td className="py-4">
            <Skeleton className="h-6 w-20 rounded-full" />
         </td>
      </tr>
   );
}

// Table Skeleton
export function TableSkeleton({ rows = 6 }: { rows?: number }) {
   return (
      <div className="fundr-card">
         {/* Table */}
         <div className="hidden md:block">
            <table className="w-full">
               <thead>
                  <tr className="border-b bg-gray-50">
                     <th className="text-left py-4 px-6">
                        <Skeleton className="h-4 w-24" />
                     </th>
                     <th className="text-left py-4 px-6">
                        <Skeleton className="h-4 w-24" />
                     </th>
                     <th className="text-left py-4 px-6">
                        <Skeleton className="h-4 w-20" />
                     </th>
                     <th className="text-left py-4 px-6">
                        <Skeleton className="h-4 w-12" />
                     </th>
                     <th className="text-left py-4 px-6">
                        <Skeleton className="h-4 w-12" />
                     </th>
                     <th className="text-left py-4 px-6">
                        <Skeleton className="h-4 w-16" />
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {Array.from({ length: rows }).map((_, i) => (
                     <TableRowSkeleton key={i} />
                  ))}
               </tbody>
            </table>
         </div>

         {/* Mobile Cards */}
         <div className="md:hidden space-y-4 p-4">
            {Array.from({ length: rows }).map((_, i) => (
               <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
               >
                  <div className="flex justify-between items-start">
                     <div>
                        <Skeleton className="h-6 w-24 mb-1" />
                        <Skeleton className="h-4 w-16" />
                     </div>
                     <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="space-y-1">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-3/4" />
                  </div>
               </div>
            ))}
         </div>

         {/* Pagination */}
         <div className="p-6 border-t flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
               <Skeleton className="h-8 w-8" />
               <Skeleton className="h-8 w-8" />
               <Skeleton className="h-8 w-8" />
               <Skeleton className="h-8 w-8" />
            </div>
         </div>
      </div>
   );
}

// Metrics Card Skeleton
export function MetricsCardSkeleton() {
   return (
      <Card className="fundr-card max-w-md">
         <CardContent className="p-6">
            <div className="flex items-center justify-between">
               <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-40" />
               </div>
               <Skeleton className="h-12 w-12 rounded-full" />
            </div>
         </CardContent>
      </Card>
   );
}
