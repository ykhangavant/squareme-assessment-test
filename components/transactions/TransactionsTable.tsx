"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableSkeleton } from "@/components/ui/skeletons";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { PaginationInfo, Transaction } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TransactionsTableProps {
   transactions: Transaction[];
   pagination?: PaginationInfo;
   isLoading?: boolean;
   onPageChange?: (page: number) => void;
}

export function TransactionsTable({
   transactions,
   pagination,
   isLoading,
   onPageChange,
}: TransactionsTableProps) {
   const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-NG", {
         style: "currency",
         currency: "NGN",
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
      }).format(amount);
   };

   const getStatusBadge = (status: string) => {
      if (status === "Processed") {
         return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-400 rounded-full py-1 px-3 w-full max-w-25">
               <span className="size-2 bg-green-300 rounded-full" /> Processed
            </Badge>
         );
      }
      return (
         <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-400 rounded-full py-1 px-3 w-full max-w-25">
            <span className="size-2 bg-red-500 rounded-full" /> Failed
         </Badge>
      );
   };

   if (isLoading) {
      return <TableSkeleton rows={6} />;
   }

   const renderPagination = () => {
      if (!pagination || !onPageChange) return null;

      const { currentPage, totalPages } = pagination;
      const pages = [];

      // Generate page numbers
      for (let i = 1; i <= Math.min(totalPages, 5); i++) {
         pages.push(i);
      }

      return (
         <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-gray-500">
               Showing {(currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
               {Math.min(
                  currentPage * pagination.itemsPerPage,
                  pagination.totalItems
               )}{" "}
               of {pagination.totalItems} results
            </div>
            <div className="flex items-center gap-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
               >
                  <ChevronLeft className="h-4 w-4" />
               </Button>
               {pages.map((page) => (
                  <Button
                     key={page}
                     variant={currentPage === page ? "default" : "outline"}
                     size="sm"
                     onClick={() => onPageChange(page)}
                     className="h-8 w-8 p-0"
                  >
                     {page}
                  </Button>
               ))}
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
               >
                  <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
         </div>
      );
   };

   return (
      <div className="rounded-lg sm:border">
         {/* Desktop Table */}
         <div className="hidden md:block">
            <Table>
               <TableHeader>
                  <TableRow className="border-b bg-transparent h-14">
                     <TableHead className="w-24 flex justify-center items-center translate-y-2">
                        <Checkbox />
                     </TableHead>
                     <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AMOUNT
                     </TableHead>
                     <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TRANSACTION ID
                     </TableHead>
                     <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TRANSACTION TYPE
                     </TableHead>
                     <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DATE
                     </TableHead>
                     <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TIME
                     </TableHead>
                     <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        STATUS
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody className="bg-white rounded-lg">
                  {transactions.map((transaction) => (
                     <TableRow
                        key={transaction.id}
                        className="hover:bg-gray-50/50 h-14"
                     >
                        <TableCell className="w-24 flex justify-center items-center translate-y-2">
                           <Checkbox />
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">
                           {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell className="text-gray-600 font-mono text-sm">
                           {transaction.transactionId}
                        </TableCell>
                        <TableCell className="text-gray-600">
                           {transaction.type}
                        </TableCell>
                        <TableCell className="text-gray-600">
                           {transaction.date}
                        </TableCell>
                        <TableCell className="text-gray-600">
                           {transaction.time}
                        </TableCell>
                        <TableCell>
                           {getStatusBadge(transaction.status)}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>

         {/* Mobile Cards */}
         <div className="md:hidden space-y-4 p-4">
            {transactions.map((transaction) => (
               <div
                  key={transaction.id}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 divide-y space-y-0"
               >
                  {/* Amount Row */}
                  <div className="flex justify-between items-center py-4 px-2">
                     <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AMOUNT:
                     </div>
                     <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(transaction.amount)}
                     </div>
                  </div>

                  {/* Transaction Type Row */}
                  <div className="flex justify-between items-center py-4 px-2">
                     <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TRANSACTION TYPE:
                     </div>
                     <div className="text-sm font-medium text-gray-900">
                        {transaction.type.toUpperCase()}
                     </div>
                  </div>

                  {/* Date Row */}
                  <div className="flex justify-between items-center py-4 px-2">
                     <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DATE:
                     </div>
                     <div className="text-sm font-medium text-gray-900">
                        {transaction.date}, {transaction.time}
                     </div>
                  </div>

                  {/* Status Row */}
                  <div className="flex justify-between items-center py-4 px-2">
                     <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        STATUS:
                     </div>
                     <div>{getStatusBadge(transaction.status)}</div>
                  </div>
               </div>
            ))}
         </div>

         {/* Pagination */}
         {renderPagination()}
      </div>
   );
}
