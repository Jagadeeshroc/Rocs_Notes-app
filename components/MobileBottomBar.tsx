"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaPlus, FaCog } from "react-icons/fa"; // Added FaCog for settings placeholder

export default function MobileBottomBar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: <FaHome size={20} /> },
    { name: "Add", href: "/notes/add", icon: <FaPlus size={20} /> },
    // You can add more items here like Profile/Settings
    { name: "Settings", href: "/settings", icon: <FaCog size={20} /> }, 
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-all ${
                isActive ? "text-blue-400 bg-slate-800" : "text-slate-400 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}