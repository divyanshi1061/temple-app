"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Save } from "lucide-react";

export default function HeaderManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    headingEn: "", headingHi: "", subheadingEn: "", subheadingHi: ""
  });

  const fetchHeader = async () => {
    try {
      const res = await fetch("/api/admin/header");
      const data = await res.json();
      if (data._id) {
        setFormData(data);
      } else {
        // Defaults if none exist
        setFormData({
          headingEn: "Acharya Pt. Rudraksh Rajpurohit",
          headingHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
          subheadingEn: "Siddh Peeth Maa Baglamukhi Temple — Nalkheda Dham",
          subheadingHi: "सिद्ध पीठ माँ बगलामुखी मंदिर — नलखेड़ा धाम"
        });
      }
    } catch (error) {
      toast.error("Failed to fetch header content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadHeader = async () => {
      await fetchHeader();
    };
    void loadHeader();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/header", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Header text updated successfully");
      } else {
        toast.error("Failed to update header text");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Header Text</h1>
          <p className="text-sm text-gray-500">Edit homepage hero section heading and subheading</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="btn-sacred py-2.5 px-4 text-sm rounded-lg flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          Loading header content...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Main Heading</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Heading (English)</label>
                    <input type="text" value={formData.headingEn} onChange={e => setFormData({...formData, headingEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Heading (Hindi)</label>
                    <input type="text" value={formData.headingHi} onChange={e => setFormData({...formData, headingHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Subheading</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subheading (English)</label>
                    <textarea rows={2} value={formData.subheadingEn} onChange={e => setFormData({...formData, subheadingEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subheading (Hindi)</label>
                    <textarea rows={2} value={formData.subheadingHi} onChange={e => setFormData({...formData, subheadingHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 font-cinzel">Live Preview</h3>
              <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">English</div>
            </div>
            <div className="p-8 text-center bg-sacred-white relative min-h-[300px] flex flex-col justify-center items-center">
              <h1 className="text-4xl md:text-5xl mb-4 font-bold tracking-tight text-gray-900 font-cinzel">
                {formData.headingEn || "Heading goes here"}
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-500 font-medium tracking-tight">
                {formData.subheadingEn || "Subheading goes here"}
              </h2>
            </div>
            
            <div className="p-4 border-b border-t border-gray-100 bg-gray-50 flex justify-between items-center mt-4">
              <h3 className="font-bold text-gray-900 font-cinzel">Live Preview</h3>
              <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">Hindi</div>
            </div>
            <div className="p-8 text-center bg-sacred-white relative min-h-[300px] flex flex-col justify-center items-center">
              <h1 className="text-4xl md:text-5xl mb-4 font-bold tracking-tight text-gray-900 font-cinzel">
                {formData.headingHi || "शीर्षक यहाँ जाएगा"}
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-500 font-medium tracking-tight">
                {formData.subheadingHi || "उपशीर्षक यहाँ जाएगा"}
              </h2>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
