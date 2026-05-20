"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Plus, Trash2, X, Star } from "lucide-react";

type TestimonialType = {
  _id: string;
  nameEn: string;
  nameHi: string;
  locationEn: string;
  locationHi: string;
  textEn: string;
  textHi: string;
  rating: number;
};

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    nameEn: "", nameHi: "", locationEn: "", locationHi: "", 
    textEn: "", textHi: "", rating: 5
  });

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTestimonials = async () => {
      await fetchTestimonials();
    };
    void loadTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Testimonial added successfully");
        setIsModalOpen(false);
        setFormData({ nameEn: "", nameHi: "", locationEn: "", locationHi: "", textEn: "", textHi: "", rating: 5 });
        fetchTestimonials();
      } else {
        toast.error("Failed to add testimonial");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Testimonial deleted");
        fetchTestimonials();
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
          <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Testimonials</h1>
          <p className="text-sm text-gray-500">Manage devotee experiences and reviews</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-sacred py-2.5 px-4 text-sm rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          Loading testimonials...
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          No testimonials found. Add your first review.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-1.5 text-red-600 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold tracking-wider">English</span>
                    <p className="text-gray-700 italic text-sm mt-0.5">&ldquo;{t.textEn}&rdquo;</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold tracking-wider">Hindi</span>
                    <p className="text-gray-700 italic text-sm mt-0.5">&ldquo;{t.textHi}&rdquo;</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold">
                  {t.nameEn.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{t.nameEn} ({t.nameHi})</h4>
                  <p className="text-xs text-gray-500">{t.locationEn} / {t.locationHi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 font-cinzel">Add Testimonial</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
                  <input required type="text" value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="e.g. Ramesh Kumar" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (Hindi)</label>
                  <input required type="text" value={formData.nameHi} onChange={e => setFormData({...formData, nameHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="e.g. रमेश कुमार" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location (English)</label>
                  <input type="text" value={formData.locationEn} onChange={e => setFormData({...formData, locationEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="e.g. Delhi, India" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location (Hindi)</label>
                  <input type="text" value={formData.locationHi} onChange={e => setFormData({...formData, locationHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none" placeholder="e.g. दिल्ली, भारत" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote Review (English)</label>
                  <textarea required rows={3} value={formData.textEn} onChange={e => setFormData({...formData, textEn: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" placeholder="Enter review in English" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote Review (Hindi)</label>
                  <textarea required rows={3} value={formData.textHi} onChange={e => setFormData({...formData, textHi: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none resize-none" placeholder="हिंदी में समीक्षा दर्ज करें" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (Stars)</label>
                  <select value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-gold outline-none bg-white">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-gold rounded-lg hover:bg-gold-dim">
                  {saving ? "Saving..." : "Add Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
