"use client";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { TransactionFilters } from "@/types";
import { format } from "date-fns";
import { CalendarDays, CloudUpload } from "lucide-react";
import { useState } from "react";

interface TransactionsFiltersProps {
   filters: TransactionFilters;
   onFiltersChange: (filters: Partial<TransactionFilters>) => void;
}

export function TransactionsFilters({
   filters,
   onFiltersChange,
}: TransactionsFiltersProps) {
   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

   const handleDateRangeChange = (
      from: Date | undefined,
      to: Date | undefined
   ) => {
      onFiltersChange({
         dateRange: {
            from: from || null,
            to: to || null,
         },
      });
   };

   const formatDateRange = () => {
      if (filters.dateRange.from && filters.dateRange.to) {
         return `${format(filters.dateRange.from, "MMM d, yyyy")} - ${format(
            filters.dateRange.to,
            "MMM d, yyyy"
         )}`;
      }
      return "Select Date Range";
   };

   return (
      <div className="flex flex-col gap-4 px-4 sm:px-0">
         <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="md:mr-auto flex w-full md:w-fit">
               <Select
                  value={filters.account}
                  onValueChange={(value) => onFiltersChange({ account: value })}
               >
                  <SelectTrigger className="sm:w-[180px]">
                     <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="All Accounts">All Accounts</SelectItem>
                     <SelectItem value="Sterling Bank">
                        Sterling Bank
                     </SelectItem>
                     <SelectItem value="Other Bank">Other Bank</SelectItem>
                  </SelectContent>
               </Select>

               <Button
                  variant="outline"
                  className="flex ml-auto md:hidden items-center gap-2 w-fit sm:w-auto rounded-lg"
               >
                  <CloudUpload className="h-4 w-4" />
                  Export
               </Button>
            </div>

            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
               <div className="flex items-center gap-4 w-full md:w-fit justify-between">
                  <p className="hidden sm:block ml-2 mr-auto whitespace-nowrap text-gray-600 font-medium">
                     Select Date Range:
                  </p>
                  <PopoverTrigger asChild>
                     <Button variant="outline" className="font-normal w-fit">
                        <CalendarDays className="mr-2 h-4 w-4 rounded-lg" />
                        {formatDateRange()}
                     </Button>
                  </PopoverTrigger>
               </div>
               <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                     mode="range"
                     selected={{
                        from: filters.dateRange.from || undefined,
                        to: filters.dateRange.to || undefined,
                     }}
                     onSelect={(range) => {
                        handleDateRangeChange(range?.from, range?.to);
                        if (range?.from && range?.to) {
                           setIsDatePickerOpen(false);
                        }
                     }}
                     numberOfMonths={1}
                  />
               </PopoverContent>
            </Popover>

            <Button
               variant="outline"
               className="hidden md:flex items-center gap-2 w-full md:w-auto rounded-lg"
            >
               <CloudUpload className="h-4 w-4" />
               Export
            </Button>
         </div>
      </div>
   );
}
