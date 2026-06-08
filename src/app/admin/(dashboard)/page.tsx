"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { API_BASE, fetchWithAuth } from "@/lib/adminApi";
import { 
  FaImage, 
  FaVideo, 
  FaSun, 
  FaPhone, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaArrowRight,
  FaStar
} from "react-icons/fa";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    galleryCount: 0,
    videoCount: 0,
    hasHeroImage: false,
    hasContactConfig: false,
    reviewCount: 0,
    pendingReviewCount: 0,
  });
  
  const [connectionStatus, setConnectionStatus] = useState<"loading" | "connected" | "disconnected">("loading");

  useEffect(() => {
    async function loadStats() {
      try {
        setConnectionStatus("loading");
        
        // Parallel fetch of public details to extract counts & statuses
        const [galleryRes, videosRes, heroRes, contactRes, reviewsRes] = await Promise.all([
          fetch(`${API_BASE}/gallery`),
          fetch(`${API_BASE}/videos`),
          fetch(`${API_BASE}/hero`),
          fetch(`${API_BASE}/contact`),
          fetchWithAuth("/admin/reviews").catch(() => null),
        ]);

        const gallery = galleryRes.ok ? await galleryRes.json() : [];
        const videos = videosRes.ok ? await videosRes.json() : [];
        const hero = heroRes.ok ? await heroRes.json() : null;
        const contact = contactRes.ok ? await contactRes.json() : null;
        const reviews = reviewsRes && reviewsRes.ok ? await reviewsRes.json() : [];

        const pending = Array.isArray(reviews) ? reviews.filter((r: any) => !r.approved).length : 0;

        setStats({
          galleryCount: Array.isArray(gallery) ? gallery.length : 0,
          videoCount: Array.isArray(videos) ? videos.length : 0,
          hasHeroImage: !!hero,
          hasContactConfig: !!contact,
          reviewCount: Array.isArray(reviews) ? reviews.length : 0,
          pendingReviewCount: pending,
        });

        setConnectionStatus("connected");
      } catch (err) {
        console.error("Failed to load statistics:", err);
        setConnectionStatus("disconnected");
      }
    }

    loadStats();
  }, []);

  const actionCards = [
    {
      title: "Gallery Manager",
      desc: "Upload new ritual photos or delete dynamic gallery items.",
      icon: FaImage,
      count: `${stats.galleryCount} Dynamic Photos`,
      path: "/admin/gallery",
      color: "from-amber-50/50 to-yellow-50/20",
      borderColor: "border-amber-200/50",
      iconColor: "text-amber-700",
    },
    {
      title: "Video Manager",
      desc: "Embed YouTube links or upload video clips of havan ceremonies.",
      icon: FaVideo,
      count: `${stats.videoCount} Dynamic Videos`,
      path: "/admin/videos",
      color: "from-blue-50/50 to-indigo-50/20",
      borderColor: "border-blue-200/50",
      iconColor: "text-blue-700",
    },
    {
      title: "Review Manager",
      desc: "Approve or delete dynamic user reviews. Pending reviews must be verified before showing live.",
      icon: FaStar,
      count: `${stats.pendingReviewCount} Pending / ${stats.reviewCount} Total`,
      path: "/admin/reviews",
      color: "from-yellow-50/50 to-amber-50/20",
      borderColor: "border-gold/20",
      iconColor: "text-amber-800",
    },
    {
      title: "Acharya Portrait Manager",
      desc: "Change the portrait image of Acharya Pt. Rudraksh Rajpurohit in the hero section circle cutout.",
      icon: FaSun,
      count: stats.hasHeroImage ? "Custom Portrait Active" : "Default Portrait Active",
      path: "/admin/hero",
      color: "from-orange-50/50 to-red-50/20",
      borderColor: "border-orange-200/50",
      iconColor: "text-orange-700",
    },
    {
      title: "Contact Details Manager",
      desc: "Modify phone, WhatsApp number, email, and map address details.",
      icon: FaPhone,
      count: stats.hasContactConfig ? "Custom Details Active" : "Default Configuration",
      path: "/admin/contact",
      color: "from-emerald-50/50 to-teal-50/20",
      borderColor: "border-emerald-200/50",
      iconColor: "text-emerald-700",
    },
  ];

  return (
    <div className="space-y-8 flex-grow">
      
      {/* Welcome Banner */}
      <div className="bg-white border border-gold/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <h1 className="text-xl md:text-2xl font-bold font-cinzel tracking-wider text-amber-700 uppercase">
            Jai Maa Baglamukhi
          </h1>
          <p className="text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
            Welcome, Acharya Ji, to the administrative control panel.
          </p>
          <p className="text-gray-500 text-xs font-semibold">
            Manage your website content dynamically from this panel.
          </p>
        </div>
        
        {/* Connection Status indicator */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-2xl self-start md:self-center shadow-xs">
          {connectionStatus === "loading" && (
            <>
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-ping" />
              <span className="text-xs font-bold text-gray-500">Connecting Server...</span>
            </>
          )}
          {connectionStatus === "connected" && (
            <>
              <FaCheckCircle className="text-emerald-600 text-sm" />
              <span className="text-xs font-bold text-emerald-700">Database Connected</span>
            </>
          )}
          {connectionStatus === "disconnected" && (
            <>
              <FaExclamationTriangle className="text-red-600 text-sm" />
              <span className="text-xs font-bold text-red-700">Server Offline</span>
            </>
          )}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold tracking-[0.2em] text-amber-800 uppercase">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actionCards.map((card) => (
            <Link
              key={card.title}
              href={card.path}
              className={`bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.005] shadow-xs hover:shadow-md transition-all group`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className={`inline-block px-3 py-1 bg-white border border-gray-200/80 rounded-lg text-[10px] font-extrabold tracking-wider ${card.iconColor} uppercase shadow-xs`}>
                    {card.count}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
                  <p className="text-gray-550 text-xs font-semibold leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className={`p-4 bg-white border border-gray-100 rounded-2xl ${card.iconColor} shadow-xs`}>
                  <card.icon size={20} />
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-gray-200/50 flex justify-end">
                <div
                  className={`inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase ${card.iconColor} group-hover:underline`}
                >
                  <span>Manage</span>
                  <FaArrowRight size={10} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
