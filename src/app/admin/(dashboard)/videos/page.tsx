"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { fetchWithAuth, getAssetUrl } from "@/lib/adminApi";
import { 
  FaUpload, 
  FaTrashAlt, 
  FaVideo, 
  FaYoutube, 
  FaCalendarAlt, 
  FaChevronRight,
  FaLink,
  FaTimes
} from "react-icons/fa";

interface VideoItem {
  _id: string;
  type: "upload" | "embed";
  url: string;
  title: string;
  uploadedAt: string;
}

export default function VideoManager() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [videoType, setVideoType] = useState<"embed" | "upload">("embed");
  const [embedUrl, setEmbedUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load videos from DB
  const loadVideos = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithAuth("/videos");
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
      } else {
        toast.error("Failed to load videos");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading videos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // Helper to extract YouTube video ID and construct clean embed URL
  const cleanYouTubeUrl = (url: string): string => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;

    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[1] && match[1].length === 11) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url; // fallback to user's URL if not a standard youtube link
  };

  // Handle local video file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected preview file
  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
  };

  // Handle video creation submit
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a video title");
      return;
    }

    if (videoType === "embed" && !embedUrl.trim()) {
      toast.error("Please enter an embed URL");
      return;
    }

    if (videoType === "upload" && !selectedFile) {
      toast.error("Please select a video file to upload");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("type", videoType);
    formData.append("title", title);

    if (videoType === "embed") {
      formData.append("url", cleanYouTubeUrl(embedUrl));
    } else if (videoType === "upload" && selectedFile) {
      formData.append("videoFile", selectedFile);
    }

    try {
      const res = await fetchWithAuth("/admin/videos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save video");
      }

      toast.success("Video added successfully");
      setTitle("");
      setEmbedUrl("");
      removeSelectedFile();
      
      // Reload videos list
      loadVideos();
    } catch (err: any) {
      toast.error(err.message || "Error saving video");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle delete video
  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetchWithAuth(`/admin/videos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Video deleted successfully");
        setVideos((prev) => prev.filter((vid) => vid._id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete video");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting video");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 flex-grow">
      
      {/* Module Title */}
      <div className="border-b border-gray-200/80 pb-5">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-extrabold uppercase tracking-widest mb-1.5">
          <span>Modules</span>
          <FaChevronRight size={8} />
          <span className="text-amber-700">Video Manager</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide font-cinzel">
          Video Manager
        </h1>
        <p className="text-gray-500 text-xs mt-1 font-medium">
          Upload MP4 video clips or embed YouTube links to display in the dynamic video section of the site.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Form Box (Left/Top) */}
        <div className="xl:col-span-4 bg-white border border-gold/15 rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-2 border-amber-600 pl-2.5">
            Add New Video
          </h2>
          
          <form onSubmit={handleVideoSubmit} className="space-y-5">
            {/* Title Input */}
            <div>
              <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                Video Title
              </label>
              <input
                type="text"
                placeholder="e.g. Maa Baglamukhi Shringaar Havan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3 px-4 text-xs text-gray-900 placeholder:text-gray-400 font-semibold transition-all shadow-xs"
                required
              />
            </div>

            {/* Video Source Type Toggle */}
            <div>
              <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                Video Source Type
              </label>
              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setVideoType("embed")}
                  className={`py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    videoType === "embed"
                      ? "bg-white border border-gray-200/50 text-amber-700 shadow-xs"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  YouTube Embed
                </button>
                <button
                  type="button"
                  onClick={() => setVideoType("upload")}
                  className={`py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    videoType === "upload"
                      ? "bg-white border border-gray-200/50 text-amber-700 shadow-xs"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Local MP4 File
                </button>
              </div>
            </div>

            {/* Conditional Source Inputs */}
            {videoType === "embed" ? (
              <div>
                <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                  YouTube Link / Embed URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <FaLink size={12} />
                  </span>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3 pl-9 pr-4 text-xs text-gray-900 placeholder:text-gray-400 font-semibold transition-all shadow-xs"
                  />
                </div>
                <p className="text-[9px] text-gray-500 font-semibold mt-1 leading-relaxed">
                  Tip: Copy-paste any standard YouTube video URL, and it will be parsed automatically.
                </p>
              </div>
            ) : (
              <div>
                <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                  Select Video File (MP4)
                </label>
                {selectedFile ? (
                  <div className="bg-gray-50 border border-gray-200/50 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 bg-white border border-gray-200 text-amber-700 rounded-xl flex-shrink-0 shadow-xs">
                        <FaVideo size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-700 truncate">{selectedFile.name}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeSelectedFile}
                      className="p-2 border border-gray-200 hover:border-red-500 bg-white text-gray-400 hover:text-red-650 hover:bg-red-50 rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-2xl p-6 text-center cursor-pointer transition-all bg-gray-50/50 hover:bg-gray-50 flex flex-col items-center gap-3 group shadow-xs"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="video/mp4, video/x-m4v, video/*"
                      className="hidden" 
                    />
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 group-hover:border-amber-500/30 flex items-center justify-center text-gray-500 group-hover:text-amber-600 transition-colors shadow-xs">
                      <FaUpload size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-700">Click to Select MP4 File</p>
                      <p className="text-[10px] text-gray-500 font-semibold mt-1">Recommended size under 30MB</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading || (!title.trim())}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-gold to-yellow-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-gold/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Video...</span>
                </>
              ) : (
                "Save Video"
              )}
            </button>
          </form>
        </div>

        {/* Video List (Right/Bottom) */}
        <div className="xl:col-span-8 bg-white border border-gold/15 rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-2 border-amber-600 pl-2.5">
            Active Video Section Items
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-gray-550">Loading videos list...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3 border border-gray-200 border-dashed rounded-2xl bg-gray-50/30">
              <FaVideo size={32} className="text-amber-700/60" />
              <div>
                <p className="text-xs font-bold text-gray-700">No Dynamic Videos Configured</p>
                <p className="text-[10px] text-gray-500 font-semibold mt-1">
                  Add a YouTube URL or upload a file on the left to display videos in the public section.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((vid) => (
                <div 
                  key={vid._id} 
                  className="bg-[#FAF8F5]/60 border border-gray-200/50 rounded-2xl overflow-hidden group shadow-xs flex flex-col justify-between"
                >
                  {/* Player area */}
                  <div className="aspect-video relative bg-black border-b border-gray-150">
                    {vid.type === "embed" ? (
                      <iframe 
                        className="absolute inset-0 w-full h-full"
                        src={vid.url} 
                        title={vid.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      />
                    ) : (
                      <video 
                        className="absolute inset-0 w-full h-full object-contain"
                        src={getAssetUrl(vid.url)} 
                        controls 
                      />
                    )}
                  </div>

                  {/* Details and Delete */}
                  <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        {vid.type === "embed" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-200 text-red-650 text-[8px] font-extrabold uppercase tracking-wider rounded">
                            <FaYoutube size={8} />
                            <span>YouTube</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-650 text-[8px] font-extrabold uppercase tracking-wider rounded">
                            <FaVideo size={8} />
                            <span>File Upload</span>
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-gray-800 text-xs font-bold leading-relaxed line-clamp-2">
                        {vid.title}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-[9px] text-amber-700/70 font-semibold uppercase tracking-wider mt-2">
                        <FaCalendarAlt size={10} />
                        <span>{new Date(vid.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteVideo(vid._id)}
                      disabled={deletingId === vid._id}
                      className="w-full mt-3 py-2 border border-red-200 hover:border-red-500 bg-red-50/50 hover:bg-red-50 text-red-650 hover:text-red-750 text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      {deletingId === vid._id ? (
                        <span className="w-3.5 h-3.5 border-2 border-red-650 border-t-transparent rounded-full animate-spin" />
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

    </div>
  );
}
