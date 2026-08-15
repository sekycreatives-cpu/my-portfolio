import React, { useState, useEffect, useRef } from "react";
import {
  getOptimizedCloudinaryUrl,
  getLowResPlaceholderUrl,
  getCloudinarySrcSet,
} from "../lib/imageOptimization";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  targetWidth?: number;
  onClick?: () => void;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export { getLowResPlaceholderUrl as getLowResUrl };

export default function ProgressiveImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  targetWidth = 800,
  onClick,
  referrerPolicy = "no-referrer",
}: ProgressiveImageProps) {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Derive optimized asset URLs
  const lowResSrc = getLowResPlaceholderUrl(src);
  const optimizedSrc = getOptimizedCloudinaryUrl(src, {
    width: targetWidth,
    quality: "auto:good",
    format: "auto",
  });
  const srcSet = getCloudinarySrcSet(src, [360, 600, 900, 1200]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "500px 0px", // Aggressive prefetch: begin loading 500px before scrolling into view
        threshold: 0.01,
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative overflow-hidden bg-[#121214] ${className}`}
    >
      {/* 1. Micro Blurred Placeholder (~300 bytes) */}
      <img
        src={lowResSrc}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover filter blur-xl scale-110 transition-opacity duration-500 ease-in-out pointer-events-none ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        referrerPolicy={referrerPolicy}
        decoding="async"
      />

      {/* Shimmer pulse overlay while high-res image is fetching */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none" />
      )}

      {/* 2. High-Performance Compressed Image */}
      {isInView && (
        <img
          src={optimizedSrc}
          srcSet={srcSet || undefined}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          referrerPolicy={referrerPolicy}
          className={`w-full h-auto object-cover transition-all duration-500 ease-out ${
            isLoaded
              ? "opacity-100 blur-0 scale-100"
              : "opacity-0 blur-sm scale-102"
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
