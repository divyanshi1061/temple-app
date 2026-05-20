"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";
import { FaPlay, FaChevronDown } from "react-icons/fa";

type DbPhoto = {
  _id: string;
  url: string;
  title?: string;
  category?: string;
};

type DbVideo = {
  _id: string;
  url: string;
  title?: string;
};

const DEFAULT_PHOTOS = [
  "mata-idol-1.jpg",
  "mata-idol-2.jpg",
  "temple-inside-1.jpg",
  "temple-entrance-1.jpg",
  "temple-night-1.jpg",
  "temple-night-2.jpg",
  "temple-dome-night.jpg",
  "temple-bhog-area.jpg",
  "real-havan-kund.jpg",
  "real-puja-plate.jpg",
  "real-gallery-1.jpg",
  "real-gallery-2.jpg",
  "real-gallery-3.jpg",
  "real-gallery-4.jpg",
  "real-gallery-5.jpg",
  "temple-sunset.png",
];

const DEFAULT_VIDEOS = [
  { _id: "v1", url: "8KwG82gkkYA", title: "Maa Baglamukhi Darshan" },
  { _id: "v2", url: "6nuT2qMTnK0", title: "Maa Baglamukhi Havan" },
  { _id: "v3", url: "tPOJesFzepA", title: "Nalkheda Dham Darshan" },
];

export default function GalleryPage() {
  const { lang } = useLanguage();
  const [photos, setPhotos] = useState<DbPhoto[]>([]);
  const [videos, setVideos] = useState<DbVideo[]>([]);
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Photos
        const photoRes = await fetch("/api/admin/gallery");
        if (photoRes.ok) {
          const photoData = await photoRes.json();
          if (photoData && photoData.length > 0) {
            setPhotos(photoData);
          } else {
            setPhotos(DEFAULT_PHOTOS.map((url, i) => ({ _id: `p-${i}`, url })));
          }
        } else {
          setPhotos(DEFAULT_PHOTOS.map((url, i) => ({ _id: `p-${i}`, url })));
        }

        // Fetch Videos
        const videoRes = await fetch("/api/admin/videos");
        if (videoRes.ok) {
          const videoData = await videoRes.json();
          if (videoData && videoData.length > 0) {
            setVideos(videoData);
          } else {
            setVideos(DEFAULT_VIDEOS);
          }
        } else {
          setVideos(DEFAULT_VIDEOS);
        }
      } catch (error) {
        console.error("Failed to fetch gallery details", error);
        setPhotos(DEFAULT_PHOTOS.map((url, i) => ({ _id: `p-${i}`, url })));
        setVideos(DEFAULT_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showMorePhotos = () => {
    setVisiblePhotos(prev => Math.min(prev + 6, photos.length));
  };

  return (
    <main className="min-h-screen bg-sacred-white pt-28 pb-20">
      {/* Premium Hero Header */}
      <section className="relative overflow-hidden pb-16 pt-10">
        <div className="absolute inset-0 bg-sacred-pattern opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-sacred relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-gold text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold bg-gold/10 px-5 py-2.5 rounded-full border border-gold/20 shadow-sm backdrop-blur-md">
              {lang === 'en' ? 'Divine Darshan' : 'दिव्य दर्शन'}
            </span>
            <h1 className="text-4xl md:text-6xl mt-8 mb-6 font-bold tracking-tight text-gray-900 font-cinzel leading-tight">
              {lang === 'en' ? 'Sacred Gallery' : 'पवित्र गैलरी'}
            </h1>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
              {lang === 'en'
                ? 'Witness the divine energy of our sacred rituals, havans, and the majestic Nalkheda Dham through our visual collection.'
                : 'हमारे दृश्य संग्रह के माध्यम से हमारे पवित्र अनुष्ठानों, हवनों और राजसी नलखेड़ा धाम की दिव्य ऊर्जा का दर्शन करें।'}
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Loading sacred media...</div>
      ) : (
        <>
          {/* Videos Section */}
          <section className="container-sacred py-12">
            <motion.div className="flex items-center gap-4 mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="w-10 h-[1px] bg-gold" />
              <h2 className="text-3xl font-bold text-gray-900 font-cinzel tracking-tight m-0">
                {lang === 'en' ? 'Video Darshan' : 'वीडियो दर्शन'}
              </h2>
              <div className="flex-1 h-[1px] bg-gray-100" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {videos.map((video) => {
                const youtubeId = video.url;
                const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
                
                return (
                  <motion.div
                    key={video._id}
                    variants={staggerItem}
                    className="group flex flex-col"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Thumbnail Container */}
                    <a
                      href={`https://www.youtube.com/watch?v=${youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-video rounded-3xl overflow-hidden shadow-md cursor-pointer border border-gray-100/50 bg-black block group-hover:shadow-xl group-hover:border-gold/30 transition-all duration-300"
                    >
                      <img
                        src={thumbnail}
                        alt={`${video.title || "Sacred Maa Baglamukhi Video Darshan"} - Acharya Pt. Rudraksh Rajpurohit Nalkheda`}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-all duration-500 group-hover:scale-105"
                      />
                      
                      {/* Saffron Play Overlay Icon */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gold shadow-2xl group-hover:bg-gold group-hover:text-white transition-all duration-300 group-hover:scale-110">
                          <FaPlay className="w-4 h-4 ml-1" />
                        </div>
                      </div>

                      {/* Saffron Progress Bar Line Mockup */}
                      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold via-orange-500 to-red-600 transition-all duration-300 w-0 group-hover:w-full" />
                    </a>

                    {/* Video Meta Info (YouTube Layout) */}
                    <div className="flex gap-4 mt-5 px-1">
                      {/* Sacred Avatar Rounded Symbol */}
                      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold flex-shrink-0 shadow-sm">
                        <span className="font-cinzel font-bold text-xs">ॐ</span>
                      </div>
                      
                      {/* Texts */}
                      <div className="flex-1 min-w-0">
                        <a
                          href={`https://www.youtube.com/watch?v=${youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-900 font-bold font-cinzel text-base tracking-tight leading-snug group-hover:text-gold transition-colors duration-200 truncate"
                        >
                          {video.title}
                        </a>
                        <p className="text-xs text-gray-500 font-semibold mt-1">
                          {lang === 'en' ? 'Acharya Pt. Rudraksh Rajpurohit' : 'आचार्य पं. रुद्राक्ष राजपुरोहित'}
                        </p>
                        <p className="text-[10px] text-gold font-bold uppercase tracking-wider mt-0.5">
                          {lang === 'en' ? 'Siddh Peeth Nalkheda Dham • Live' : 'सिद्ध पीठ नलखेड़ा धाम • लाइव'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* Photos Section */}
          <section className="container-sacred py-16">
            <motion.div className="flex items-center gap-4 mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="w-10 h-[1px] bg-gold" />
              <h2 className="text-3xl font-bold text-gray-900 font-cinzel tracking-tight m-0">
                {lang === 'en' ? 'Photo Darshan' : 'फोटो दर्शन'}
              </h2>
              <div className="flex-1 h-[1px] bg-gray-100" />
            </motion.div>

            {/* Pinterest Staggered Masonry columns */}
            <motion.div
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {photos.slice(0, visiblePhotos).map((photo, i) => {
                let aspectClass = "aspect-square";
                if (i % 4 === 0) aspectClass = "aspect-[3/4]";
                else if (i % 4 === 1) aspectClass = "aspect-[4/3]";
                else if (i % 4 === 2) aspectClass = "aspect-[4/5]";
                else if (i % 4 === 3) aspectClass = "aspect-[16/10]";

                const photoUrl = photo.url.startsWith('http') ? photo.url : `/${photo.url}`;
                const titleText = photo.title || (lang === 'en' ? 'Sacred Ritual' : 'पवित्र अनुष्ठान');

                return (
                  <motion.div
                    key={photo._id}
                    variants={staggerItem}
                    className="break-inside-avoid mb-6 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100/60 hover:border-gold/30 transition-all duration-500 cursor-pointer"
                  >
                    {/* Image Container with Organic Pinterest Stagger */}
                    <div className={`relative w-full overflow-hidden ${aspectClass}`}>
                      <img
                        src={photoUrl}
                        alt={`${titleText} - Maa Baglamukhi Temple, Acharya Pt. Rudraksh Rajpurohit Nalkheda`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      {/* Premium Ambient Saffron Glow on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gold/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Minimal card: image-only layout (no captions/descriptions) */}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Show More Button */}
            {visiblePhotos < photos.length && (
              <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <button
                  onClick={showMorePhotos}
                  className="group flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-full shadow-sm hover:shadow-md hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {lang === 'en' ? 'Load More Sacred Photos' : 'और अधिक फोटो देखें'}
                  <FaChevronDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
