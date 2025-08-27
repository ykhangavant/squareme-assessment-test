"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import React from "react";

interface MetricsCardProps {
   bank: string;
   accountNumber: string;
   businessName: string;
}

export const MetricsCard = React.memo(function MetricsCard({
   bank,
   accountNumber,
   businessName,
}: MetricsCardProps) {
   const [isCopied, setIsCopied] = React.useState(false);

   const handleCopy = React.useCallback(() => {
      navigator.clipboard.writeText(accountNumber);
      setIsCopied(true);
      setTimeout(() => {
         setIsCopied(false);
      }, 2000);
   }, [accountNumber]);

   return (
      <Card className="fundr-card max-w-md p-0">
         <CardContent className="p-6">
            <div className="space-y-4">
               <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                     ACCOUNT DETAILS
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                     {bank}
                  </p>
               </div>

               <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                     {accountNumber}
                  </div>
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={handleCopy}
                     className="flex items-center gap-2 bg-purple-200 text-purple-500 border-purple-200 hover:bg-purple-100 hover:text-purple-500 cursor-pointer rounded-lg"
                  >
                     <Copy className="h-4 w-4" />
                     {isCopied ? "Copied" : "Copy"}
                  </Button>
               </div>

               <div>
                  <p className="text-sm font-medium text-gray-900">
                     {businessName}
                  </p>
               </div>
            </div>
         </CardContent>
      </Card>
   );
});
