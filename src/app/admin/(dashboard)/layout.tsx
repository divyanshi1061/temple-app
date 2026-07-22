"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { removeAuthToken } from "@/lib/adminApi";
import { 
  FaImage, 
  FaVideo, 
  FaSun, 
  FaPhone, 
  FaSignOutAlt, 
  FaGlobe, 
  FaBars, 
  FaTimes,
  FaCogs,
  FaStar
} from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/verify");
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/admin/login");
        }
      } catch (_err) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    removeAuthToken();
    router.push("/admin/login");
  };

  // Safe check to avoid rendering dashboard items during redirect checks
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold tracking-wide text-amber-800">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null; // Will redirect shortly
  }

  const menuItems = [
    { label: "Overview", icon: FaCogs, path: "/admin" },
    { label: "Gallery Manager", icon: FaImage, path: "/admin/gallery" },
    { label: "Video Manager", icon: FaVideo, path: "/admin/videos" },
    { label: "Review Manager", icon: FaStar, path: "/admin/reviews" },
    { label: "Acharya Portrait", icon: FaSun, path: "/admin/hero" },
    { label: "Contact Details", icon: FaPhone, path: "/admin/contact" },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-gray-800 font-sans">
      
      {/* 1. Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200/60 p-6 flex-shrink-0 shadow-sm">
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-gold to-yellow-600 flex items-center justify-center text-white shadow-md">
            <span className="font-bold text-lg font-cinzel">ॐ</span>
          </div>
          <div>
            <h2 className="text-sm font-extrabold tracking-wide font-cinzel text-gray-900">ACHARYA PANEL</h2>
            <span className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mt-0.5">Maa Baglamukhi</span>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="flex-grow space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-600 via-gold to-yellow-600 text-white shadow-md"
                    : "text-gray-600 hover:text-amber-800 hover:bg-amber-50/60 font-semibold"
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-gray-200/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold tracking-wide text-gray-600 hover:text-amber-800 hover:bg-amber-50/60 transition-all font-semibold"
          >
            <FaGlobe size={16} />
            <span>View Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-xl text-sm font-bold tracking-wide text-red-600 hover:text-red-750 hover:bg-red-50/60 transition-all cursor-pointer font-semibold"
          >
            <FaSignOutAlt size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Mobile Header & Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200/60 flex items-center justify-between px-6 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-gold to-yellow-600 flex items-center justify-center text-white shadow-md">
            <span className="font-bold text-base font-cinzel">ॐ</span>
          </div>
          <h2 className="text-xs font-bold tracking-wider font-cinzel text-gray-900">ACHARYA PANEL</h2>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-amber-700 p-2 rounded-lg hover:bg-amber-50/60 transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* 3. Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#FAF8F5]/98 pt-20 px-6 flex flex-col justify-between">
          <nav className="space-y-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl text-base font-bold tracking-wide transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-amber-600 via-gold to-yellow-600 text-white shadow-md"
                      : "text-gray-700 hover:text-amber-800 hover:bg-white"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="pb-10 space-y-4 border-t border-gray-200/60 pt-6">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 px-5 py-4 rounded-xl text-base font-bold tracking-wide text-gray-600 hover:text-amber-800 font-semibold"
            >
              <FaGlobe size={18} />
              <span>View Website</span>
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-4 w-full text-left px-5 py-4 rounded-xl text-base font-bold tracking-wide text-red-600 hover:text-red-750 hover:bg-red-50/60 transition-all cursor-pointer font-semibold"
            >
              <FaSignOutAlt size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Panel Content wrapper */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0 overflow-y-auto max-h-screen">
        <div className="p-6 md:p-10 max-w-[1440px] mx-auto w-full flex-grow flex flex-col">
          {children}
        </div>
      </main>

    </div>
  );
}
