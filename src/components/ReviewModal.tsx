"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { API_BASE } from "@/lib/adminApi";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const { lang } = useLanguage();
  
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedId = localStorage.getItem("visitor_device_uuid");
      if (!storedId) {
        storedId = "device_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now().toString(36);
        localStorage.setItem("visitor_device_uuid", storedId);
      }
      setDeviceId(storedId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text || !deviceId) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          text,
          rating,
          deviceId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(
          lang === "en"
            ? "Thank you! Your review has been submitted for approval."
            : "धन्यवाद! आपकी समीक्षा स्वीकृति के लिए सबमिट कर दी गई है।"
        );
        
        // Local state backup for instant preview matching old behavior
        const localReview = {
          _id: data.review?._id || Date.now().toString(),
          nameEn: name,
          nameHi: name,
          locationEn: location || "India",
          locationHi: location || "India",
          textEn: text,
          textHi: text,
          rating: rating,
        };
        const saved = localStorage.getItem("user_reviews");
        const reviews = saved ? JSON.parse(saved) : [];
        reviews.push(localReview);
        localStorage.setItem("user_reviews", JSON.stringify(reviews));

        // Dispatch update event
        window.dispatchEvent(new Event("reviewsUpdated"));

        // Reset inputs
        setName("");
        setLocation("");
        setText("");
        setRating(5);
        
        // Auto-close after delay
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 3000);
      } else {
        const msg = data.message || "Failed to submit review.";
        const isDuplicate = msg.toLowerCase().includes("already submitted");
        setErrorMessage(
          lang === "en"
            ? (isDuplicate ? "You have already submitted a review." : msg)
            : (isDuplicate ? "आप पहले ही एक समीक्षा सबमिट कर चुके हैं।" : "समीक्षा सबमिट करने में विफल।")
        );
      }
    } catch (err) {
      setErrorMessage(
        lang === "en"
          ? "Network error. Please try again later."
          : "नेटवर्क त्रुटि। कृपया बाद में पुनः प्रयास करें।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <IoCloseOutline size={24} />
            </button>
            
            <h2 className="text-2xl font-cinzel font-bold text-gray-900 mb-6 text-center">
              {lang === "en" ? "Share Your Experience" : "अपना अनुभव साझा करें"}
            </h2>

            {successMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs md:text-sm font-semibold rounded-lg p-3 text-center mb-4">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-xs md:text-sm font-semibold rounded-lg p-3 text-center mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  {lang === "en" ? "Your Name" : "आपका नाम"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                  placeholder={lang === "en" ? "John Doe" : "आपका नाम"}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  {lang === "en" ? "Location (Optional)" : "स्थान (वैकल्पिक)"}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                  placeholder={lang === "en" ? "Delhi, India" : "दिल्ली, भारत"}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  {lang === "en" ? "Rating" : "रेटिंग"}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl focus:outline-none"
                    >
                      <FaStar className={star <= rating ? "text-gold" : "text-gray-200"} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  {lang === "en" ? "Your Review" : "आपकी समीक्षा"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none resize-none"
                  placeholder={lang === "en" ? "Share your miraculous experience..." : "अपना अनुभव साझा करें..."}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !!successMessage}
                className={`btn-sacred w-full py-3 rounded-xl font-bold uppercase tracking-wider text-sm mt-2 flex items-center justify-center gap-2 ${
                  isSubmitting || !!successMessage ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{lang === "en" ? "Submitting..." : "सबमिट किया जा रहा है..."}</span>
                  </>
                ) : (
                  <span>{lang === "en" ? "Submit Review" : "समीक्षा सबमिट करें"}</span>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
