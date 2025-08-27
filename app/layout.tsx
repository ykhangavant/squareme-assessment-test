import { ReduxProvider } from "@/components/common/ReduxProvider";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
   subsets: ["latin"],
   variable: "--font-sans",
});

export const metadata: Metadata = {
   title: "FundR Dashboard",
   description: "Modern financial dashboard for FundR",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${inter.className} font-sans antialiased`}>
            <ReduxProvider>
               <Layout>{children}</Layout>
            </ReduxProvider>
         </body>
      </html>
   );
}
