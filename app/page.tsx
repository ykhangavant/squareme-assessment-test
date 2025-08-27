"use client";

import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ChartSkeleton, MetricsCardSkeleton } from "@/components/ui/skeletons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchDashboardData } from "@/store/slices/dashboardSlice";
import { useEffect } from "react";

export default function Dashboard() {
   const dispatch = useAppDispatch();
   const { data, isLoading, error, selectedPeriod } = useAppSelector(
      (state) => state.dashboard
   );

   useEffect(() => {
      dispatch(fetchDashboardData(selectedPeriod));
   }, [dispatch, selectedPeriod]);

   if (isLoading) {
      return (
         <div className="space-y-6">
            <Tabs defaultValue="tab-1" className="w-full">
               <TabsList className="h-auto rounded-none border-b w-full justify-start bg-transparent p-0">
                  <TabsTrigger
                     value="tab-1"
                     className="data-[state=active]:after:bg-blue-500 relative rounded-none py-2 pb-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                     <h1 className="text-base font-bold text-gray-900">
                        Online Payments
                     </h1>
                  </TabsTrigger>
               </TabsList>
               <TabsContent value="tab-1" className="py-8">
                  <div className="space-y-8">
                     <div>
                        <MetricsCardSkeleton />
                     </div>
                     <div>
                        <ChartSkeleton />
                     </div>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error: {error}</div>
         </div>
      );
   }

   if (!data) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">No data available</div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <Tabs defaultValue="tab-1" className="w-full">
            <TabsList className="h-auto rounded-none border-b w-full justify-start bg-transparent p-0">
               <TabsTrigger
                  value="tab-1"
                  className="data-[state=active]:after:bg-blue-500 relative rounded-none py-2 pb-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
               >
                  <h1 className="text-base font-bold text-gray-900">
                     Online Payments
                  </h1>
               </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1" className="py-8">
               <div className="space-y-8">
                  <div>
                     <MetricsCard
                        bank={data.metrics.accountDetails.bank}
                        accountNumber={
                           data.metrics.accountDetails.accountNumber
                        }
                        businessName={data.metrics.accountDetails.businessName}
                     />
                  </div>

                  <div>
                     <RevenueChart />
                  </div>
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
}
