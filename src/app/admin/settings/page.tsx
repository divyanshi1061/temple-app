"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Save } from "lucide-react";

export default function SettingsManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    facebook: "", instagram: "", whatsapp: "", phone: "", email: "", addressEn: "", addressHi: ""
  });

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data._id) {
        setFormData(data);
      }
    } catch (error) {
      toast.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      await fetchSettings();
    };
    void loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Settings updated successfully");
      } else {
        toast.error("Failed to update settings");
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
          <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Contact Settings</h1>
          <p className="text-sm text-gray-500">Manage contact information and social links</p>
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
          <div className="p-8 text-center text-gray-500">Loading settings...</div>
        ) : (
          <form className="p-6 space-y-8" onSubmit={handleSubmit}>
            
            {/* Primary Contact */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Primary Contact Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="text" value={formData.phone || ""} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <input type="text" value={formData.whatsapp || ""} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Location Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address (English)</label>
                  <textarea rows={3} value={formData.addressEn || ""} onChange={e => setFormData({...formData, addressEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address (Hindi)</label>
                  <textarea rows={3} value={formData.addressHi || ""} onChange={e => setFormData({...formData, addressHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                  <input type="url" value={formData.facebook || ""} onChange={e => setFormData({...formData, facebook: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                  <input type="url" value={formData.instagram || ""} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                </div>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
