"use client";

import { Button } from "@/components/ui/button";
import { PaginationInfo } from "@/types";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface TransactionsPaginationProps {
   pagination: PaginationInfo;
   onPageChange: (page: number) => void;
}

export function TransactionsPagination({
   pagination,
   onPageChange,
}: TransactionsPaginationProps) {
   const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;

   const startItem = (currentPage - 1) * itemsPerPage + 1;

   const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
         for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
         }
      } else {
         if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
         } else if (currentPage >= totalPages - 2) {
            pages.push(
               1,
               "...",
               totalPages - 3,
               totalPages - 2,
               totalPages - 1,
               totalPages
            );
         } else {
            pages.push(
               1,
               "...",
               currentPage - 1,
               currentPage,
               currentPage + 1,
               "...",
               totalPages
            );
         }
      }

      return pages;
   };

   return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
         <div className="text-sm text-gray-700 order-2 sm:order-1">
            Showing {startItem} of {totalItems} results
         </div>

         <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className="flex items-center gap-1"
            >
               <ChevronLeft className="h-4 w-4" />
               <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="hidden sm:flex items-center space-x-2">
               {getPageNumbers().map((page, index) => (
                  <div key={index}>
                     {page === "..." ? (
                        <Button variant="ghost" size="sm" disabled>
                           <MoreHorizontal className="h-4 w-4" />
                        </Button>
                     ) : (
                        <Button
                           variant={
                              currentPage === page ? "default" : "outline"
                           }
                           size="sm"
                           onClick={() => onPageChange(page as number)}
                           className="min-w-[32px]"
                        >
                           {page}
                        </Button>
                     )}
                  </div>
               ))}
            </div>

            {/* Mobile page indicator */}
            <div className="sm:hidden px-3 py-1 text-sm text-gray-700">
               {currentPage} of {totalPages}
            </div>

            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
               className="flex items-center gap-1"
            >
               <span className="hidden sm:inline">Next</span>
               <ChevronRight className="h-4 w-4" />
            </Button>
         </div>
      </div>
   );
}
