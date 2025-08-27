"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   Sheet,
   SheetContent,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { FaSortDown } from "react-icons/fa";
import { MobileSidebar } from "./MobileSidebar";

export function Header() {
   return (
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 h-20 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
         {/* Left side - Logo and mobile menu */}
         <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Sheet>
               <SheetTrigger asChild>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="lg:hidden hover:bg-transparent hover:text-gray-800"
                  >
                     <Menu className="size-8" />
                     <span className="sr-only">Toggle navigation menu</span>
                  </Button>
               </SheetTrigger>
               <SheetContent side="left" className="p-0 w-64">
                  <SheetTitle className="sr-only" />
                  <MobileSidebar />
               </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="hidden sm:flex items-center">
               <Image
                  src="/images/logo.svg"
                  alt="FundR"
                  width={100}
                  height={24}
                  className="h-6 w-auto"
               />
            </div>
         </div>

         {/* Logo */}
         <div className="flex sm:hidden items-center">
            <Image
               src="/images/logo.svg"
               alt="FundR"
               width={100}
               height={24}
               className="h-6 w-auto"
            />
         </div>

         {/* Right side - notifications and user avatar */}
         <div className="flex items-center space-x-4">
            <Button
               variant="ghost"
               size="icon"
               className="relative"
               aria-label="View notifications"
            >
               <Bell className="size-6 text-gray-600" />
               <span className="sr-only">Notifications</span>
            </Button>

            <div className="flex gap-1 items-center">
               <Avatar
                  className="size-12"
                  role="button"
                  tabIndex={0}
                  aria-label="User menu"
               >
                  <AvatarFallback className="bg-green-500 text-white text-sm font-medium">
                     GA
                  </AvatarFallback>
               </Avatar>
               <FaSortDown className="hidden sm:block text-gray-500" />
            </div>
         </div>
      </header>
   );
}
