"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  width: number;
  height: number;
  left: string;
  top: string;
  bg: string;
  duration: number;
  delay: number;
  yOffset: number;
}

export default function ParticleField({ count = 25 }: { count?: number }) {
  const [particles] = useState<Particle[]>(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    width: Math.random() * 3 + 1,
    height: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    bg: `rgba(212, 160, 23, ${(Math.random() * 0.4 + 0.1).toFixed(2)})`,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 5,
    yOffset: -(Math.random() * 200 + 100),
  })));

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.width, height: p.height, left: p.left, top: p.top, background: p.bg }}
          animate={{ y: [0, p.yOffset], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
