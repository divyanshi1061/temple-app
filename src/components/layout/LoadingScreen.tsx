"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)", transition: { duration: 0.4, ease: "easeOut" } }}
        >
          {/* Rotating rings */}
          {[0, 1, 2].map((i) => (
            <motion.div key={i}
              className="absolute rounded-full"
              style={{
                width: `${300 + i * 200}px`, height: `${300 + i * 200}px`,
                border: "1px solid rgba(255,255,255,0.03)",
                top: "50%", left: "50%",
                marginTop: `-${(300 + i * 200) / 2}px`,
                marginLeft: `-${(300 + i * 200) / 2}px`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.1, 0.2, 0.1] }}
              transition={{
                rotate: { duration: 25 + i * 10, repeat: Infinity, ease: "linear" },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}

          {/* Om Symbol */}
          <motion.div className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}>
            <motion.div className="absolute -inset-16 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            <motion.span className="text-8xl md:text-9xl text-white relative z-10 font-bold drop-shadow-sm select-none">
              ॐ
            </motion.span>
            <motion.h2 className="mt-8 text-xs tracking-[0.35em] text-white/80 uppercase font-bold"
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.3 }}>
              Maa Baglamukhi
            </motion.h2>
            <motion.p className="mt-3 text-[10px] text-white/40 tracking-[0.25em] font-semibold"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.3 }}>
              ॐ ह्लीं बगलामुखी नमः
            </motion.p>
            <motion.div className="mt-10 h-[1.5px] w-36 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <motion.div className="h-full rounded-full bg-white"
                initial={{ width: "0%" }} animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "easeOut" }} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
