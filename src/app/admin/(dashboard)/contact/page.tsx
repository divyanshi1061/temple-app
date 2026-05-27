"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { fetchWithAuth } from "@/lib/adminApi";
import { SITE_CONFIG } from "@/lib/constants";
import { 
  FaPhone, 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaChevronRight,
  FaSave,
  FaUndo
} from "react-icons/fa";

export default function ContactDetailsManager() {
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load current configuration from DB
  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithAuth("/contact");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setPhone(data.phone || "");
          setWhatsapp(data.whatsapp || "");
          setEmail(data.email || "");
          setAddress(data.address || "");
        }
      } else {
        toast.error("Failed to load contact details");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading contact details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  // Save/Upsert contact config
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetchWithAuth("/admin/contact", {
        method: "POST",
        body: JSON.stringify({
          phone,
          whatsapp,
          email,
          address
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save contact details");
      }

      toast.success("Contact details updated successfully");
      // Update state
      setPhone(data.phone || "");
      setWhatsapp(data.whatsapp || "");
      setEmail(data.email || "");
      setAddress(data.address || "");
    } catch (err: any) {
      toast.error(err.message || "Error saving contact details");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset form to hardcoded system defaults
  const handleResetToDefault = () => {
    if (confirm("This will clear the database record and revert the public site to hardcoded defaults. Continue?")) {
      setPhone("");
      setWhatsapp("");
      setEmail("");
      setAddress("");
      toast.success("Form fields reset (click Save to update the database)");
    }
  };

  return (
    <div className="space-y-8 flex-grow">
      
      {/* Module Title */}
      <div className="border-b border-gray-200/80 pb-5">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-extrabold uppercase tracking-widest mb-1.5">
          <span>Modules</span>
          <FaChevronRight size={8} />
          <span className="text-amber-700">Contact Details</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide font-cinzel">
          Contact Details Manager
        </h1>
        <p className="text-gray-500 text-xs mt-1 font-medium">
          Modify the primary contact numbers, email, and location text on the public homepage and footer. Leave empty to fallback to system defaults.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Configuration Form Box */}
        <div className="xl:col-span-7 bg-white border border-gold/15 rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-2 border-amber-600 pl-2.5">
            Configure Details
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-gray-550">Loading contact details...</p>
            </div>
          ) : (
            <form onSubmit={handleSaveContact} className="space-y-5">
              {/* Phone Field */}
              <div>
                <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaPhone size={12} />
                  </span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={SITE_CONFIG.phone}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs text-gray-900 placeholder:text-gray-400 font-semibold transition-all shadow-xs"
                  />
                </div>
                <p className="text-[9px] text-gray-500 mt-1 font-medium">Default: {SITE_CONFIG.phone}</p>
              </div>

              {/* WhatsApp Field */}
              <div>
                <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                  WhatsApp Number (with Country Code, no symbols)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaWhatsapp size={13} />
                  </span>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={SITE_CONFIG.whatsapp}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs text-gray-900 placeholder:text-gray-400 font-semibold transition-all shadow-xs"
                  />
                </div>
                <p className="text-[9px] text-gray-500 mt-1 font-medium">Default: {SITE_CONFIG.whatsapp}</p>
              </div>

              {/* Email Field */}
              <div>
                <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaEnvelope size={12} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={SITE_CONFIG.email}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs text-gray-900 placeholder:text-gray-400 font-semibold transition-all shadow-xs"
                  />
                </div>
                <p className="text-[9px] text-gray-500 mt-1 font-medium">Default: {SITE_CONFIG.email}</p>
              </div>

              {/* Physical Address Field */}
              <div>
                <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
                  Physical Address
                </label>
                <div className="relative">
                  <span className="absolute top-4 left-4 text-gray-400">
                    <FaMapMarkerAlt size={12} />
                  </span>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={SITE_CONFIG.address.hi}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs text-gray-900 placeholder:text-gray-400 font-semibold resize-none transition-all shadow-xs"
                  />
                </div>
                <p className="text-[9px] text-gray-500 mt-1 font-medium leading-relaxed">
                  Default (Hindi): {SITE_CONFIG.address.hi}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-200/60">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="flex-1 py-3 border border-gray-200 hover:border-gray-300 text-gray-550 hover:text-gray-700 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <FaUndo size={10} />
                  <span>Reset Fields</span>
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 via-gold to-yellow-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-gold/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Details...</span>
                    </>
                  ) : (
                    <>
                      <FaSave size={11} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Informational Help Box (Right) */}
        <div className="xl:col-span-5 bg-white border border-gold/15 rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-2 border-amber-600 pl-2.5">
            Database vs Fallbacks
          </h2>
          <div className="space-y-4 text-xs font-semibold text-gray-600 leading-relaxed">
            <p>
              The public website checks for a custom configuration in MongoDB first. If found, it instantly overrides the display values for phone numbers, WhatsApp click links, email envelopes, and map text dynamically on the client.
            </p>
            <p>
              If a field is left blank or the record does not exist in MongoDB, the site gracefully falls back to the original hardcoded constants (e.g. <span className="text-amber-700">{SITE_CONFIG.phone}</span>).
            </p>
            <p>
              This ensures that the website is always 100% operational and has working contact cards even if the database is reset.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
