"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { fetchWithAuth, getAssetUrl } from "@/lib/adminApi";
import { 
  FaUpload, 
  FaChevronRight,
  } from "react-icons/fa";

interface HeroItem {
  _id: string;
  filename: string;
  url: string;
  uploadedAt: string;
}

export default function HeroBackgroundManager() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentHero, setCurrentHero] = useState<HeroItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load current hero image configuration
  const loadHero = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithAuth("/hero");
      if (res.ok) {
        const data = await res.json();
        setCurrentHero(data);
      } else {
        toast.error("Failed to retrieve current hero status");
      }
    } catch (_err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHero();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  // Cancel selection
  const removeSelection = () => {
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
  };

  // Submit background change
  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image file first");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("heroImage", selectedFile);

    try {
      const res = await fetchWithAuth("/admin/hero", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update background image");
      }

      toast.success("Hero background updated successfully");
      removeSelection();
      // Reload details
      loadHero();
    } catch (err: any) {
      toast.error(err.message || "Error updating background image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 flex-grow">
      
      {/* Module Title */}
      <div className="border-b border-gray-200/80 pb-5">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-extrabold uppercase tracking-widest mb-1.5">
          <span>Modules</span>
          <FaChevronRight size={8} />
          <span className="text-amber-700">Acharya Portrait</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide font-cinzel">
          Acharya Portrait Image
        </h1>
        <p className="text-gray-500 text-xs mt-1 font-medium">
          Upload a new portrait image for Acharya Pt. Rudraksh Rajpurohit (displayed in the circular frame in the main hero section of the website). If not set, it will fallback to default `/acharya-new.webp`.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Upload Form Box (Left) */}
        <div className="lg:col-span-5 bg-white border border-gold/15 rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-2 border-amber-600 pl-2.5">
            Change Portrait Image
          </h2>
          
          <form onSubmit={handleHeroSubmit} className="space-y-5">
            {/* Input Selection Area */}
            {filePreview ? (
              <div className="space-y-4">
                <div className="aspect-square max-w-[200px] mx-auto relative rounded-full overflow-hidden border-4 border-amber-500/20 bg-gray-50 shadow-xs">
                  <img src={filePreview} alt="Selected Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={removeSelection}
                    className="flex-1 py-2.5 border border-gray-200 hover:border-gray-300 text-gray-550 hover:text-gray-700 text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 py-2.5 bg-gradient-to-r from-amber-600 via-gold to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-md"
                  >
                    {isUploading ? "Uploading..." : "Save Portrait"}
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-2xl p-8 text-center cursor-pointer transition-all bg-gray-50/50 hover:bg-gray-50 flex flex-col items-center gap-3 group shadow-xs"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden" 
                />
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 group-hover:border-amber-500/30 flex items-center justify-center text-gray-500 group-hover:text-amber-650 transition-colors shadow-xs">
                  <FaUpload size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700">Select Portrait Image</p>
                  <p className="text-[10px] text-gray-500 font-semibold mt-1">Recommended: Square format (e.g. 500x500 px)</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Live Preview / Status Box (Right) */}
        <div className="lg:col-span-7 bg-white border border-gold/15 rounded-3xl p-6 space-y-6 shadow-sm flex flex-col items-center lg:items-stretch">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-2 border-amber-600 pl-2.5 self-start">
            Active Portrait Status
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 w-full">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-gray-550">Loading current portrait details...</p>
            </div>
          ) : (
            <div className="space-y-6 w-full flex flex-col items-center">
              {/* Circular Image Preview Container */}
              <div className="aspect-square w-48 h-48 md:w-56 md:h-56 relative rounded-full overflow-hidden border-4 border-gold bg-white shadow-md flex-shrink-0">
                <img 
                  src={currentHero ? getAssetUrl(currentHero.url) : "/acharya-new.webp"} 
                  alt="Active Portrait" 
                  className="w-full h-full object-cover" 
                />
                
                {/* Status Badge */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border bg-white/95 backdrop-blur-sm shadow-xs flex items-center gap-1.5 z-10 border-gray-200/80">
                  <span className={`w-1.5 h-1.5 rounded-full ${currentHero ? "bg-amber-655" : "bg-emerald-500"} ${currentHero ? "bg-amber-600 animate-pulse" : "bg-emerald-500"}`} />
                  <span className="text-[8px] font-extrabold uppercase tracking-wider text-gray-700">
                    {currentHero ? "Custom Portrait" : "Default System Image"}
                  </span>
                </div>
              </div>

              {/* Configurations List */}
              <div className="p-4 bg-gray-50 border border-gray-250/50 rounded-2xl space-y-3 shadow-xs w-full">
                <div className="flex items-center justify-between text-xs border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">Filename</span>
                  <span className="text-gray-800 font-bold truncate max-w-[220px]">
                    {currentHero ? currentHero.filename : "acharya-new.webp"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">Last Updated</span>
                  <span className="text-gray-800 font-bold">
                    {currentHero ? new Date(currentHero.uploadedAt).toLocaleDateString() : "System Default"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
