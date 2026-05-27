"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      {children}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            fontSize: '13px',
            fontWeight: '600'
          }
        }} 
      />
    </div>
  );
}
