// ============================================================
// FRAMER MOTION ANIMATION VARIANTS
// Sacred, clean, responsive motion design (optimized for speed & realism)
// ============================================================

import { Variants } from "framer-motion";

// Page transitions (subtle fade without page shifts)
export const pageTransition: Variants = {
  initial: { opacity: 0.95 },
  animate: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// Fade in from bottom (reduced offset and duration)
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay,
      ease: "easeOut",
    },
  }),
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay,
      ease: "easeOut",
    },
  }),
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 15 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay,
      ease: "easeOut",
    },
  }),
};

// Scale up reveal
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      delay,
      ease: "easeOut",
    },
  }),
};

// Blur to visible
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      delay,
      ease: "easeOut",
    },
  }),
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Card hover (subtler lift)
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  hover: {
    scale: 1.01,
    y: -3,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Glowing button
export const glowPulse = {
  initial: {
    boxShadow: "0 0 10px rgba(249, 115, 22, 0.15)",
  },
  animate: {
    boxShadow: [
      "0 0 10px rgba(249, 115, 22, 0.15)",
      "0 0 20px rgba(249, 115, 22, 0.25)",
      "0 0 10px rgba(249, 115, 22, 0.15)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Floating animation (toned down)
export const floating = {
  initial: { y: 0 },
  animate: {
    y: [-3, 3, -3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Rotating mandala
export const mandalaRotate = {
  animate: {
    rotate: 360,
    transition: {
      duration: 80,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Text reveal character by character
export const textRevealContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.15,
    },
  },
};

export const textRevealChar: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Parallax scroll
export const parallaxSlow = {
  initial: { y: 0 },
  animate: (scrollY: number) => ({
    y: scrollY * 0.15,
    transition: { type: "tween", ease: "linear" },
  }),
};

// Divine entrance
export const divineEntrance: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Slide in from sides
export const slideInFromLeft: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

// Navbar variants
export const navbarVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hidden: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Modal animation
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Accordion
export const accordionContent: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.15 },
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.25 },
      opacity: { duration: 0.2, delay: 0.05 },
    },
  },
};
