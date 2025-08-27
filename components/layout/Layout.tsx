"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
   children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />

         <div className="flex pt-20">
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:top-20 lg:bottom-0">
               <Sidebar />
            </div>

            <main className="flex-1 lg:ml-64 py-6">
               <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  {children}
               </div>
            </main>
         </div>
      </div>
   );
}
