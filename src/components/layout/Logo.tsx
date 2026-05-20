"use client";

interface LogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

export default function Logo({
  className = "",
  size = 40,
}: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center select-none bg-transparent ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <span 
        className="text-gold font-extrabold tracking-tight filter drop-shadow-[0_1.5px_3px_rgba(197,160,89,0.3)] transition-transform duration-300 group-hover:scale-105"
        style={{ 
          fontSize: `${size * 0.75}px`,
          lineHeight: 1,
          fontFamily: "var(--font-cinzel), serif"
        }}
      >
        ॐ
      </span>
    </div>
  );
}
