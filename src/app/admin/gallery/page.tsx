"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Plus, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

type GalleryImage = {
  _id: string;
  url: string;
  title: string;
  category: string;
};

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({ url: "", title: "", category: "" });

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      await fetchImages();
    };
    void loadImages();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || cloudName === "your-cloud-name" || !uploadPreset || uploadPreset === "your-upload-preset") {
      toast.error("Cloudinary is not configured. Please add your credentials in .env.local to upload files directly!");
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    try {
      setUploadProgress(40);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      });

      setUploadProgress(80);
      if (res.ok) {
        const fileData = await res.json();
        setFormData({ ...formData, url: fileData.secure_url });
        toast.success("Image uploaded to Cloudinary successfully!");
      } else {
        const err = await res.json();
        toast.error(`Upload failed: ${err.error?.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("An error occurred during file upload.");
      console.error(error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) {
      toast.error("Please select a file to upload or enter an Image URL");
      return;
    }

    setUploading(true);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Image added to gallery database successfully");
        setIsModalOpen(false);
        setFormData({ url: "", title: "", category: "" });
        fetchImages();
      } else {
        toast.error("Failed to save image in database");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Image deleted");
        fetchImages();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Gallery</h1>
          <p className="text-sm text-gray-500">Manage images displayed in the gallery</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-sacred py-2.5 px-4 text-sm rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          Loading gallery...
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          No images found. Add your first image.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group relative flex flex-col justify-between h-full">
              <div className="aspect-[4/3] relative w-full bg-gray-50">
                <Image 
                  src={img.url.startsWith('http') ? img.url : `/${img.url}`} 
                  alt={img.title || "Gallery image"} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-3 bg-white border-t border-gray-50">
                <p className="text-sm font-medium text-gray-900 truncate">{img.title || "Untitled"}</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{img.category || "General"}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(img._id)}
                  className="p-1.5 bg-white text-red-600 rounded-lg shadow-sm hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 font-cinzel">Add Gallery Image</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload (Direct to Cloudinary)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gold transition-colors duration-300 relative bg-gray-50">
                  <div className="space-y-1 text-center">
                    {formData.url ? (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gold" />
                        <p className="text-sm text-green-600 font-medium mt-2">Image uploaded successfully!</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs mt-1">{formData.url}</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-gold hover:text-gold-dim focus-within:outline-none">
                            <span>Upload a file</span>
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="sr-only" />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
                {uploading && uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-gold h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Or Paste Image URL (Fallback)</label>
                <input type="text" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="e.g. https://..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="e.g. Navaratri Havan" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none bg-white">
                  <option value="">Select Category</option>
                  <option value="peeth">Siddh Peeth</option>
                  <option value="ceremony">Ceremony</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-2 text-sm font-medium text-white bg-gold rounded-lg hover:bg-gold-dim">
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
