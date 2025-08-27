"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import {
   setSelectedPeriod,
   updateChartData,
} from "@/store/slices/dashboardSlice";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function RevenueChart() {
   const dispatch = useAppDispatch();
   const { data, selectedPeriod } = useAppSelector((state) => state.dashboard);

   const handlePeriodChange = (
      period: "today" | "last7days" | "last30days"
   ) => {
      dispatch(setSelectedPeriod(period));
      if (data) {
         dispatch(updateChartData(period));
      }
   };

   if (!data) return null;
   const formatCurrency = (value: number) => {
      return new Intl.NumberFormat("en-NG", {
         style: "currency",
         currency: "NGN",
         minimumFractionDigits: 2,
      }).format(value);
   };

   const formatYAxis = (value: number) => {
      if (value >= 1000000) {
         return `${value / 1000000}M`;
      }
      if (value >= 1000) {
         return `${value / 1000}K`;
      }
      return value.toString();
   };

   return (
      <Card className="fundr-card bg-gray-100 p-6 sm:p-8">
         <CardHeader className="px-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 font-semibold">
                     Showing data for
                  </span>
                  <Select
                     value={selectedPeriod}
                     onValueChange={(
                        value: "today" | "last7days" | "last30days"
                     ) => handlePeriodChange(value)}
                  >
                     <SelectTrigger className="w-[140px] h-8 text-sm">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="last7days">Last 7 days</SelectItem>
                        <SelectItem value="last30days">Last 30 days</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="flex flex-wrap gap-2">
                  <Button
                     variant={selectedPeriod === "today" ? "default" : "ghost"}
                     size="sm"
                     onClick={() => handlePeriodChange("today")}
                     className={cn(
                        "text-xs px-6 hover:bg-transparent hover:text-inherit rounded-md cursor-pointer",
                        `${
                           selectedPeriod === "today" &&
                           "bg-blue-400 hover:bg-blue-400 hover:text-white"
                        }`
                     )}
                  >
                     Today
                  </Button>
                  <Button
                     variant={
                        selectedPeriod === "last7days" ? "default" : "ghost"
                     }
                     size="sm"
                     onClick={() => handlePeriodChange("last7days")}
                     className={cn(
                        "text-xs px-6 hover:bg-transparent hover:text-inherit rounded-md cursor-pointer",
                        `${
                           selectedPeriod === "last7days" &&
                           "bg-blue-400 hover:bg-blue-400 hover:text-white"
                        }`
                     )}
                  >
                     Last 7 days
                  </Button>
                  <Button
                     variant={
                        selectedPeriod === "last30days" ? "default" : "ghost"
                     }
                     size="sm"
                     onClick={() => handlePeriodChange("last30days")}
                     className={cn(
                        "text-xs px-6 hover:bg-transparent hover:text-inherit rounded-md cursor-pointer",
                        `${
                           selectedPeriod === "last30days" &&
                           "bg-blue-400 hover:bg-blue-400 hover:text-white"
                        }`
                     )}
                  >
                     Last 30 days
                  </Button>
               </div>
            </div>
         </CardHeader>
         <CardContent className="p-6 sm:p-8 bg-gray-50 rounded-md border">
            <div className="mb-6">
               <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                     Revenue
                  </h3>
                  <span className="text-sm text-green-600 font-medium">
                     +{Math.abs(data.metrics.revenue.change).toFixed(2)}%
                  </span>
                  <span className="text-sm text-gray-500">
                     {data.metrics.revenue.period}
                  </span>
               </div>
               <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(data.metrics.revenue.current)}
               </div>
               <div className="text-sm text-gray-500">in total value</div>
            </div>

            <div className="h-48 sm:h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                     data={data.chartData}
                     margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
                  >
                     <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                     />
                     <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                        tickFormatter={formatYAxis}
                        width={40}
                     />
                     <Bar
                        dataKey="value"
                        fill="#fbbf24"
                        radius={[4, 4, 0, 0]}
                     />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </CardContent>
      </Card>
   );
}
