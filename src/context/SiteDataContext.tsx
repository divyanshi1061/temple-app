"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiBase, getAssetUrl } from "@/lib/adminApi";

interface SiteData {
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
  } | null;
  heroImage: string | null;
  videos: any[] | null;
  gallery: any[] | null;
  reviews: any[] | null;
  isLoading: boolean;
  error: Error | null;
}

const SiteDataContext = createContext<SiteData | undefined>(undefined);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>({
    contact: null,
    heroImage: null,
    videos: null,
    gallery: null,
    reviews: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchAllData() {
      try {
        const timestamp = Date.now();
        const base = getApiBase();
        const opts = { cache: "no-store" as RequestCache, signal: controller.signal };

        // Fire all requests concurrently
        const [contactRes, heroRes, videosRes, galleryRes, reviewsRes] = await Promise.allSettled([
          fetch(`${base}/contact?t=${timestamp}`, opts),
          fetch(`${base}/hero?t=${timestamp}`, opts),
          fetch(`${base}/videos?t=${timestamp}`, opts),
          fetch(`${base}/gallery?t=${timestamp}`, opts),
          fetch(`${base}/reviews?t=${timestamp}`, opts)
        ]);

        if (!isMounted) return;

        const parseIfOk = async (res: PromiseSettledResult<Response>) => {
          if (res.status === 'fulfilled' && res.value.ok) {
            return await res.value.json().catch(() => null);
          }
          return null;
        };

        const contactData = await parseIfOk(contactRes);
        const heroData = await parseIfOk(heroRes);
        const videosData = await parseIfOk(videosRes);
        const galleryData = await parseIfOk(galleryRes);
        const reviewsData = await parseIfOk(reviewsRes);

        setData({
          contact: contactData || null,
          heroImage: heroData && heroData.url ? getAssetUrl(heroData.url) : null,
          videos: Array.isArray(videosData) ? videosData : null,
          gallery: Array.isArray(galleryData) ? galleryData : null,
          reviews: Array.isArray(reviewsData) ? reviewsData : null,
          isLoading: false,
          error: null,
        });

      } catch (err: any) {
        if (!isMounted) return;
        console.warn("Notice: Failed to load site data (Backend offline). Using system defaults.");
        setData(prev => ({ ...prev, isLoading: false, error: err }));
      }
    }

    fetchAllData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
