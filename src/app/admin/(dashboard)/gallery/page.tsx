"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { fetchWithAuth, getAssetUrl } from "@/lib/adminApi";
import { 
  FaUpload, 
  FaTrashAlt, 
  FaImage, 
  FaCalendarAlt, 
  FaTimes, 
  FaChevronRight,
  } from "react-icons/fa";

interface GalleryItem {
  _id: string;
  filename: string;
  caption: string;
  url: string;
  uploadedAt: string;
}

export default function GalleryManager() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Fetch dynamic gallery images from database
  const loadImages = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithAuth("/gallery");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      } else {
        toast.error("Failed to load gallery images");
      }
    } catch (_err) {
      console.error(_err);
      toast.error("Error loading gallery images");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  // Handle files selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);

      // Generate previews
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove selected preview file
  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    // Revoke object URL to avoid leaks
    URL.revokeObjectURL(previews[index]);
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle upload form submission
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetchWithAuth("/admin/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to upload images");
      }

      toast.success("Images uploaded successfully");
      setCaption("");
      setSelectedFiles([]);
      // Revoke previews
      previews.forEach(p => URL.revokeObjectURL(p));
      setPreviews([]);
      
      // Reload images list
      loadImages();
    } catch (err: any) {
      toast.error(err.message || "Error uploading images");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle delete action
  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const executeDeleteImage = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;

    setDeletingId(id);
    try {
      const res = await fetchWithAuth(`/admin/gallery/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Image deleted successfully");
        setImages((prev) => prev.filter((img) => img._id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete image");
      }
    } catch (_err) {
      console.error(_err);
      toast.error("Error deleting image");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-8 flex-grow">
      
      {/* Module Title */}
      <div className="border-b border-gray-200/80 pb-5">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-extrabold uppercase tracking-widest mb-1.5">
          <span>Modules</span>
          <FaChevronRight size={8} />
          <span className="text-amber-700">Gallery Manager</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide font-cinzel">
          Gallery Manager
        </h1>
        <p className="text-gray-500 text-xs mt-1 font-medium">
          Upload and organize dynamic images that appear at the end of the public gallery.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Upload Form Box (Left/Top) */}
        <div className="xl:col-span-4 bg-white border border-gold/15 rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-2 border-amber-600 pl-2.5">
            Upload Image(s)
          </h2>
          
          <form onSubmit={handleUploadSubmit} className="space-y-5">
            {/* Files selection drop area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-2xl p-6 text-center cursor-pointer transition-all bg-gray-50/50 hover:bg-gray-50 flex flex-col items-center gap-3 group shadow-xs"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden" 
              />
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 group-hover:border-amber-500/30 flex items-center justify-center text-gray-500 group-hover:text-amber-600 transition-colors shadow-xs">
                <FaUpload size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700">Click to Select Files</p>
                <p className="text-[10px] text-gray-500 font-semibold mt-1">Supports PNG, JPG, JPEG, WEBP</p>
              </div>
            </div>

            {/* Selected File Previews */}
            {previews.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider">
                  Selected Files ({previews.length})
                </p>
                <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 bg-gray-50 border border-gray-200 rounded-xl">
                  {previews.map((preview, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200 shadow-xs">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeSelectedFile(idx)}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Caption Input */}
            <div>
              <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                Caption / Title (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter caption for these images"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3.5 px-4 text-xs text-gray-900 placeholder:text-gray-400 font-semibold transition-all shadow-xs"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading || selectedFiles.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-gold to-yellow-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-gold/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                "Upload Image(s)"
              )}
            </button>
          </form>
        </div>

        {/* Dynamic Images Grid (Right/Bottom) */}
        <div className="xl:col-span-8 bg-white border border-gold/15 rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-2 border-amber-600 pl-2.5">
            Dynamic Uploads List
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-gray-550">Loading images...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3 border border-gray-200 border-dashed rounded-2xl bg-gray-50/30">
              <FaImage size={32} className="text-amber-700/60" />
              <div>
                <p className="text-xs font-bold text-gray-700">No Custom Images Found</p>
                <p className="text-[10px] text-gray-500 font-semibold mt-1">
                  Upload images on the left to add them to your public gallery page.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img) => (
                <div 
                  key={img._id} 
                  className="bg-[#FAF8F5]/60 border border-gray-200/50 rounded-2xl overflow-hidden group shadow-xs flex flex-col justify-between"
                >
                  {/* Photo area */}
                  <div className="aspect-video relative bg-gray-100 overflow-hidden border-b border-gray-150">
                    <img 
                      src={getAssetUrl(img.url)} 
                      alt={img.caption || "Gallery"} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                    />
                  </div>

                  {/* Details and Delete */}
                  <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-gray-800 text-xs font-bold leading-relaxed line-clamp-2">
                        {img.caption || <span className="text-gray-500 italic">No Caption</span>}
                      </p>
                      
                      <div className="flex items-center gap-1.5 text-[9px] text-amber-700/70 font-semibold uppercase tracking-wider mt-2">
                        <FaCalendarAlt size={10} />
                        <span>{new Date(img.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteClick(img._id)}
                      disabled={deletingId === img._id}
                      className="w-full mt-3 py-2 border border-red-200 hover:border-red-500 bg-red-50/50 hover:bg-red-50 text-red-650 hover:text-red-750 text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      {deletingId === img._id ? (
                        <span className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <FaTrashAlt size={10} />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        message="Are you sure you want to delete this image? This action cannot be undone."
        onConfirm={executeDeleteImage}
        onCancel={() => setConfirmDeleteId(null)}
      />

    </div>
  );
}
