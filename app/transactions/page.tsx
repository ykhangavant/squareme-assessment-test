"use client";

import { TransactionsFilters } from "@/components/transactions/TransactionsFilters";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
   fetchTransactions,
   setFilters,
} from "@/store/slices/transactionsSlice";
import { TransactionFilters } from "@/types";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
   const dispatch = useAppDispatch();
   const { data, isLoading, error, filters } = useAppSelector(
      (state) => state.transactions
   );
   const [currentPage, setCurrentPage] = useState(1);

   // Initialize default date range if not set
   useEffect(() => {
      if (!filters.dateRange.from || !filters.dateRange.to) {
         const defaultFilters = {
            dateRange: {
               from: new Date(2023, 5, 6), // June 6, 2023
               to: new Date(2023, 5, 15), // June 15, 2023
            },
         };
         dispatch(setFilters(defaultFilters));
      }
   }, [dispatch, filters.dateRange.from, filters.dateRange.to]);

   useEffect(() => {
      if (filters.dateRange.from && filters.dateRange.to) {
         dispatch(fetchTransactions({ page: currentPage, filters }));
      }
   }, [dispatch, currentPage, filters]);

   const handleFiltersChange = (newFilters: Partial<TransactionFilters>) => {
      dispatch(setFilters(newFilters));
      setCurrentPage(1); // Reset to first page when filters change
   };

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   if (error) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error: {error}</div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <TransactionsFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
         />

         <TransactionsTable
            transactions={data?.transactions || []}
            pagination={data?.pagination}
            isLoading={isLoading}
            onPageChange={handlePageChange}
         />
      </div>
   );
}
