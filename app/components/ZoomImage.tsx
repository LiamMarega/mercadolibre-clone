'use client';

import { useRef, useState } from "react";

interface ZoomImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomImage({ src, alt, className = "" }: ZoomImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg transition-shadow duration-300  ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`aspect-square w-full transition-transform duration-200 ${
          isZoomed ? "scale-200" : ""
        }`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`
        }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
} 