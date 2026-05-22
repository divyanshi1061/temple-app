"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const newReview = {
      _id: Date.now().toString(),
      nameEn: name,
      nameHi: name, // simplify by using the same input
      locationEn: location || "India",
      locationHi: location || "India",
      textEn: text,
      textHi: text,
      rating: rating,
    };

    // Save to localStorage
    const saved = localStorage.getItem("user_reviews");
    const reviews = saved ? JSON.parse(saved) : [];
    reviews.push(newReview);
    localStorage.setItem("user_reviews", JSON.stringify(reviews));

    // Dispatch custom event to notify TestimonialsSection
    window.dispatchEvent(new Event("reviewsUpdated"));

    // Reset and close
    setName("");
    setLocation("");
    setText("");
    setRating(5);
    onClose();
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
                className="btn-sacred w-full py-3 rounded-xl font-bold uppercase tracking-wider text-sm mt-2"
              >
                {lang === "en" ? "Submit Review" : "समीक्षा सबमिट करें"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
