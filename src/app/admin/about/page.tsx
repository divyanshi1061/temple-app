"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Save } from "lucide-react";

export default function AboutManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: "", titleHi: "", 
    descriptionEn: "", descriptionHi: "", 
    missionEn: "", missionHi: "", 
    visionEn: "", visionHi: ""
  });

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/admin/about");
      const data = await res.json();
      if (data._id) {
        setFormData(data);
      }
    } catch (error) {
      toast.error("Failed to fetch about content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadAbout = async () => {
      await fetchAbout();
    };
    void loadAbout();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("About content updated successfully");
      } else {
        toast.error("Failed to update content");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-cinzel">About Content</h1>
          <p className="text-sm text-gray-500">Manage the content on the About page</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="btn-sacred py-2.5 px-4 text-sm rounded-lg flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading content...</div>
        ) : (
          <form className="p-6 space-y-8" onSubmit={handleSubmit}>
            
            {/* Titles */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Main Title</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
                  <input type="text" value={formData.titleEn || ""} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (Hindi)</label>
                  <input type="text" value={formData.titleHi || ""} onChange={e => setFormData({...formData, titleHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Description</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
                  <textarea rows={5} value={formData.descriptionEn || ""} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Hindi)</label>
                  <textarea rows={5} value={formData.descriptionHi || ""} onChange={e => setFormData({...formData, descriptionHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Mission & Vision</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mission (English)</label>
                    <textarea rows={3} value={formData.missionEn || ""} onChange={e => setFormData({...formData, missionEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mission (Hindi)</label>
                    <textarea rows={3} value={formData.missionHi || ""} onChange={e => setFormData({...formData, missionHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vision (English)</label>
                    <textarea rows={3} value={formData.visionEn || ""} onChange={e => setFormData({...formData, visionEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vision (Hindi)</label>
                    <textarea rows={3} value={formData.visionHi || ""} onChange={e => setFormData({...formData, visionHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                  </div>
                </div>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
