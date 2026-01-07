import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import MobileBottomBar from "@/components/MobileBottomBar"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes App",
  description: "Productivity Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-800`}>
        <div className="flex min-h-screen">
          
          {/* Sidebar acts as a flex item now. No fixed positioning needed. */}
          <Sidebar />

          {/* UPDATED LAYOUT: 
             1. Removed 'md:ml-64' (The sidebar pushes content automatically now)
             2. Kept 'flex-1' to fill remaining space
          */}
          <div className="flex-1 flex flex-col transition-all duration-300 pb-24 md:pb-0">
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
              {children}
            </main>
          </div>

          <MobileBottomBar />
          
        </div>
      </body>
    </html>
  );
}