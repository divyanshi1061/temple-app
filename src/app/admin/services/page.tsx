"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Plus, Edit2, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";

type ServiceType = {
  _id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  longDescriptionEn?: string;
  longDescriptionHi?: string;
  image?: string;
  category: string;
  icon: string;
};

export default function ServicesManager() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    titleEn: "", titleHi: "", descriptionEn: "", descriptionHi: "", 
    longDescriptionEn: "", longDescriptionHi: "", image: "", category: "", icon: ""
  });

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadServices = async () => {
      await fetchServices();
    };
    void loadServices();
  }, []);

  const handleOpenModal = (service?: ServiceType) => {
    if (service) {
      setEditingId(service._id);
      setFormData({
        titleEn: service.titleEn || "",
        titleHi: service.titleHi || "",
        descriptionEn: service.descriptionEn || "",
        descriptionHi: service.descriptionHi || "",
        longDescriptionEn: service.longDescriptionEn || "",
        longDescriptionHi: service.longDescriptionHi || "",
        image: service.image || "",
        category: service.category || "",
        icon: service.icon || "",
      });
    } else {
      setEditingId(null);
      setFormData({ titleEn: "", titleHi: "", descriptionEn: "", descriptionHi: "", longDescriptionEn: "", longDescriptionHi: "", image: "", category: "", icon: "" });
    }
    setIsModalOpen(true);
  };

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
        setFormData({ ...formData, image: fileData.secure_url });
        toast.success("Cover image uploaded to Cloudinary successfully!");
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
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(`Service ${editingId ? "updated" : "created"} successfully`);
        setIsModalOpen(false);
        fetchServices();
      } else {
        toast.error("Operation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Service deleted");
        fetchServices();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Services</h1>
          <p className="text-sm text-gray-500">Manage the services displayed on the website</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-sacred py-2.5 px-4 text-sm rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No services found. Add your first one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title (EN)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        {service.image && <div className="w-8 h-8 rounded bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url(${service.image.startsWith('http') ? service.image : '/'+service.image})`}} />}
                        {service.titleEn}
                      </div>
                      <div className="text-sm text-gray-500 ml-10">{service.titleHi}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gold/10 text-gold uppercase tracking-wider">
                        {service.category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleOpenModal(service)} className="text-blue-600 hover:text-blue-900 mr-4">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 font-cinzel">{editingId ? "Edit Service" : "Add Service"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
                  <input required type="text" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (Hindi)</label>
                  <input required type="text" value={formData.titleHi} onChange={e => setFormData({...formData, titleHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (English)</label>
                  <textarea required value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Hindi)</label>
                  <textarea required value={formData.descriptionHi} onChange={e => setFormData({...formData, descriptionHi: e.target.value})} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Long Detail Description (English)</label>
                  <textarea value={formData.longDescriptionEn} onChange={e => setFormData({...formData, longDescriptionEn: e.target.value})} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Long Detail Description (Hindi)</label>
                  <textarea value={formData.longDescriptionHi} onChange={e => setFormData({...formData, longDescriptionHi: e.target.value})} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                </div>
                
                {/* Cover Image Upload Area */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Cover Image (Direct to Cloudinary)</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gold transition-colors duration-300 relative bg-gray-50">
                    <div className="space-y-1 text-center">
                      {formData.image ? (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="mx-auto h-10 w-10 text-gold" />
                          <p className="text-sm text-green-600 font-medium mt-2">Image uploaded successfully!</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs mt-1">{formData.image}</p>
                          <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium">Remove image</button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-10 w-10 text-gray-400 animate-pulse" />
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-gold hover:text-gold-dim focus-within:outline-none">
                              <span>Upload service cover file</span>
                              <input type="file" accept="image/*" onChange={handleFileUpload} className="sr-only" />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                  {uploading && uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div className="bg-gold h-1 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Or Paste Cover Image URL (Fallback)</label>
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="e.g. https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="e.g. anusthan, puja" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-2 text-sm font-medium text-white bg-gold rounded-lg hover:bg-gold-dim">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
