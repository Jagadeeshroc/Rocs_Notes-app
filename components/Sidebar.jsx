"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaStickyNote,
  FaPlus,
  FaHome,
  FaCog,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  // State for "Pinning" the sidebar open
  const [isLocked, setIsLocked] = useState(true);
  // State for Hovering
  const [isHovered, setIsHovered] = useState(false);

  // The sidebar is "Wide" if it's either Locked OR Currently Hovered
  const isWide = isLocked || isHovered;

  const menuItems = [
    { name: "Dashboard", href: "/", icon: <FaHome size={20} /> },
    { name: "Create Note", href: "/notes/add", icon: <FaPlus size={20} /> },
    { name: "Settings", href: "/settings", icon: <FaCog size={20} /> },
  ];

  return (
    <aside
      // Handle Mouse Enter/Leave to trigger expansion without breaking Lock state
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`hidden md:flex flex-col h-screen  z-20 sticky top-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border-r border-slate-800/50 backdrop-blur-2xl ${
        isWide ? "w-66 shadow-[10px_0_30px_rgba(0,0,0,0.5)]" : "w-24"
      } bg-gray-900 overflow-visible`}
    >
      {/* --- LOCK TOGGLE BUTTON --- */}
      <button
        onClick={() => {
          // If we are currently locked and clicking to unlock,
          // set hover=true so it doesn't snap shut instantly under the mouse
          if (isLocked) setIsHovered(true);
          setIsLocked(!isLocked);
        }}
        className={`absolute -right-3 top-10 z-50 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-2 border-slate-950 ${
          isLocked
            ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]"
            : "bg-slate-800 text-slate-400 hover:bg-cyan-500 hover:text-black"
        }`}
        title={isLocked ? "Unlock Sidebar" : "Lock Sidebar Open"}
      >
        {isLocked ? <FaLock size={10} /> : <FaLockOpen size={10} />}
      </button>

      {/* --- HEADER --- */}
      <div className="h-24 flex items-center px-6 overflow-hidden relative group">
        {/* Futuristic Glow Blob */}
        <div
          className={`absolute top-2 left-6 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl transition-all duration-700 ${
            isWide ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Wide State Logo */}
        <div
          className={`flex items-center gap-2 transition-all duration-500 ${
            isWide ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              height="2em"
              className="text-cyan-500"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              >
                <path d="M12 21V7a2 2 0 0 1 2-2h7.4a.6.6 0 0 1 .6.6v13.114M12 21V7a2 2 0 0 0-2-2H2.6a.6.6 0 0 0-.6.6v13.114M14 19h8m-12 0H2"></path>
                <path
                  strokeLinejoin="round"
                  d="M12 21a2 2 0 0 1 2-2m-2 2a2 2 0 0 0-2-2"
                ></path>
              </g>
            </svg>

           
          </div>
          <h1 className="text-2xl font-bold tracking-[0.2em] text-white whitespace-nowrap font-sans ">
            ROCs<span className="text-cyan-400">.NOTE</span>
          </h1>
        </div>

        {/* Collapsed Logo (Centers itself when sidebar is small) */}
        {!isWide && (
          <div className="absolute left-0 w-full flex justify-center top-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              height="2em"
              className="text-white"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              >
                <path d="M12 21V7a2 2 0 0 1 2-2h7.4a.6.6 0 0 1 .6.6v13.114M12 21V7a2 2 0 0 0-2-2H2.6a.6.6 0 0 0-.6.6v13.114M14 19h8m-12 0H2"></path>
                <path
                  strokeLinejoin="round"
                  d="M12 21a2 2 0 0 1 2-2m-2 2a2 2 0 0 0-2-2"
                ></path>
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 px-4 space-y-4 mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center h-14 rounded-xl transition-all duration-300 overflow-hidden ${
                isActive
                  ? "bg-linear-to-r from-slate-800/80 to-transparent text-cyan-400 border-l-4 border-cyan-400"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {/* Icon Section (Stays fixed width) */}
              <div
                className={`absolute left-0 w-20 flex justify-center items-center h-full z-10 transition-all duration-300 ${
                  isActive ? "drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : ""
                }`}
              >
                {item.icon}
              </div>

              {/* Text Label (Slides in/out) */}
              <span
                className={`font-medium tracking-wide whitespace-nowrap ml-16 pl-2 transition-all duration-500 ${
                  isWide
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                {item.name}
              </span>

              {/* Hover Glow Effect Background */}
              <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
          );
        })}
      </nav>

      {/* --- FOOTER (User Profile) --- */}
      <div className="p-4 border-t border-slate-800/50 backdrop-blur-md bg-slate-900/30">
        <div
          className={`flex items-center transition-all duration-500 ${
            isWide ? "justify-start" : "justify-center"
          }`}
        >
          {/* Avatar (Always Visible) */}
          <div className="relative shrink-0 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300">
              JD
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>

          {/* Text Info (Slides in/out) */}
          <div
            className={`flex flex-col overflow-hidden transition-all duration-500 ${
              isWide ? "opacity-100 w-auto ml-4" : "opacity-0 w-0 ml-0"
            }`}
          >
            <span className="text-sm font-bold text-slate-200 truncate font-sans tracking-wide whitespace-nowrap">
              JAGADEESH
            </span>
            <span className="text-[10px] text-cyan-500 truncate tracking-[0.15em] uppercase whitespace-nowrap">
              System Admin
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
