import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface PreloaderProps {
  key?: string;
  onComplete: () => void;
}

// Critical assets to preload in the background
const DESKTOP_ASSETS = [
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786710737/2k_copy_igj9rp.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/w_1000,f_auto,q_auto:good/v1786220085/Flynet_Rebrand_copy_2_gqevmw.jpg",
];

const MOBILE_ASSETS = [
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786710737/2k_copy_igj9rp.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/w_600,f_auto,q_auto:good/v1786220085/Flynet_Rebrand_copy_2_gqevmw.jpg",
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING STUDIO CANVAS");

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const assetsToPreload = isMobile ? MOBILE_ASSETS : DESKTOP_ASSETS;

    // 1. Kick off background asset preloading
    let loadedCount = 0;
    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
      };
      img.src = src;
    });

    // 2. Responsive duration: snappy 900ms on mobile, smooth 1400ms on desktop
    const startTime = Date.now();
    const duration = isMobile ? 900 : 1400;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // If assets finish early, advance progress faster
      const assetBonus = (loadedCount / assetsToPreload.length) * 15;
      const timeProgress = (elapsed / duration) * 100;
      const calculatedProgress = Math.min(Math.floor(timeProgress + assetBonus), 100);

      setProgress(calculatedProgress);

      if (calculatedProgress < 30) {
        setStatusText("INITIALIZING ENVIRONMENT");
      } else if (calculatedProgress < 65) {
        setStatusText("PRELOADING MEDIA & ASSETS");
      } else if (calculatedProgress < 95) {
        setStatusText("FINALIZING VISUAL EXPERIENCE");
      } else {
        setStatusText("READY");
      }

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, isMobile ? 120 : 250); // fast transition on mobile
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      id="site-preloader"
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#060608] text-white select-none px-6 py-8 sm:px-12 sm:py-12 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(254,74,3,0.18) 0%, rgba(254,74,3,0.05) 45%, transparent 70%)",
        }}
      />
      <div 
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Top Bar: Brand & Year */}
      <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase text-white/50 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FE4A03] animate-pulse" />
          <span className="font-semibold text-white/90">SEKY CREATIVE</span>
        </div>
        <div className="hidden sm:block text-white/40">
          DESIGN &bull; DIRECTION &bull; PRODUCTION
        </div>
        <div className="font-mono text-white/60">FOLIO // 2026</div>
      </div>

      {/* Center: Hero Counter & Branding */}
      <div className="flex flex-col items-center justify-center text-center z-10 my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FE4A03] text-xs uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curating Visual Experience</span>
        </motion.div>

        {/* Large Percentage Counter */}
        <div className="relative font-bold font-mono text-6xl sm:text-8xl md:text-9xl tracking-tighter text-white mb-4">
          <span className="tabular-nums">{progress}</span>
          <span className="text-[#FE4A03] text-4xl sm:text-6xl md:text-7xl ml-1 font-sans font-light">
            %
          </span>
        </div>

        {/* Dynamic Status Text */}
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-white/40 min-h-[20px]">
          {statusText}
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-80 h-1 bg-white/10 rounded-full mt-8 overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FE4A03]/80 via-[#FE4A03] to-[#FF8C00] rounded-full shadow-[0_0_12px_#FE4A03]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>

      {/* Bottom Bar: System Indicators */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-white/40 z-10">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">AUTOLOAD: OPTIMIZED</span>
          <span>WEBP &bull; AVIF &bull; 60FPS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60">SEKY &times; CREATIVES</span>
        </div>
      </div>
    </motion.div>
  );
}
