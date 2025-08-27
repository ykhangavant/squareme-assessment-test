"use client";

import { cn } from "@/lib/utils";
import {
   ArrowUpDown,
   FileText,
   Globe,
   LayoutDashboard,
   Settings,
   Wallet,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
   { name: "Get Started", href: "/get-started", icon: Globe },
   { name: "Dashboard", href: "/", icon: LayoutDashboard },
   { name: "Accounts", href: "/accounts", icon: Wallet },
   { name: "Transfers", href: "/transfers", icon: ArrowUpDown },
   { name: "Transactions", href: "/transactions", icon: FileText },
   { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
   const pathname = usePathname();

   return (
      <div className="flex flex-col h-full bg-white border-r border-gray-200">
         {/* Navigation */}
         <nav className="flex-1 px-0 py-4 space-y-1">
            {navigation.map((item) => {
               const isActive = pathname === item.href;
               return (
                  <Link
                     key={item.name}
                     href={item.href}
                     className={cn(
                        "flex items-center px-8 py-4 text-sm font-medium transition-colors",
                        isActive
                           ? "bg-blue-600 text-gray-50"
                           : "text-blue-900 hover:bg-gray-50 hover:text-gray-900"
                     )}
                  >
                     <item.icon className="mr-3 h-5 w-5" />
                     {item.name}
                  </Link>
               );
            })}
         </nav>
      </div>
   );
}
