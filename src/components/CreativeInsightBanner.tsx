import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";

interface InsightData {
  id: string;
  tag: string;
  year: string;
  stat: string;
  glowColor: string;
  headline: string;
  subtext?: string;
  authorOrSource?: string;
}

const insights: InsightData[] = [
  {
    id: "shower-idea",
    tag: "CREATIVE INTUITION",
    year: "2026",
    stat: "72%",
    glowColor: "#FE4A03",
    headline: "of people say that get their best ideas in the shower.",
    subtext: "Breakthrough creative direction happens when deep technical craft connects with spontaneous intuition.",
    authorOrSource: "Global Cognitive Creativity Study",
  },
  {
    id: "visual-impact",
    tag: "BRAND PERCEPTION",
    year: "2026",
    stat: "94%",
    glowColor: "#FF6A00",
    headline: "of first impressions are directly influenced by design and aesthetic craft.",
    subtext: "High-end art direction and cohesive visual systems build immediate credibility and emotional resonance.",
    authorOrSource: "Stanford Human-Computer Interaction Lab",
  },
  {
    id: "video-retention",
    tag: "MOTION DYNAMICS",
    year: "2026",
    stat: "85%",
    glowColor: "#FF3300",
    headline: "of modern audiences retain brand stories through dynamic motion & video.",
    subtext: "Kinetic typography, 3D CGI, and rhythm-driven editing drive record engagement across digital touchpoints.",
    authorOrSource: "Digital Media & Video Engagement Index",
  },
];

export default function CreativeInsightBanner() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse interaction for subtle 3D parallax tilt & dynamic luminous spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 140 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const currentInsight = insights[activeIndex];

  return (
    <div 
      id="creative-insight-section"
      className="w-full max-w-7xl mx-auto flex flex-col gap-5 pt-10 sm:pt-14 select-none"
    >
      {/* Section Header Matching Creative Toolkit Style */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FE4A03] animate-pulse shadow-[0_0_10px_#FE4A03]" />
            <h3 className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white/60 uppercase">
              CREATIVE PERSPECTIVE // {currentInsight.tag}
            </h3>
          </div>

          {/* Interactive tabs */}
          <div className="flex items-center gap-2">
            {insights.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View perspective ${idx + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? "w-8 bg-[#FE4A03] shadow-[0_0_12px_#FE4A03]"
                    : "w-2.5 bg-neutral-800 hover:bg-neutral-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* The Recreated Poster Card from Pinterest / Figma */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#060608] border border-[#FE4A03]/35 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_45px_rgba(254,74,3,0.18)] transition-all duration-700 hover:border-[#FE4A03]/70 hover:shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_70px_rgba(254,74,3,0.35)] min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex flex-col justify-between p-6 sm:p-12 md:p-14 cursor-pointer"
          onClick={() => setActiveIndex((prev) => (prev + 1) % insights.length)}
        >
          {/* Deep Ambient Atmospheric Glow (Warm incandescent gradient blooms) */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background: `
                radial-gradient(circle at 18% 28%, rgba(254, 74, 3, 0.42) 0%, rgba(254, 74, 3, 0.12) 35%, transparent 65%),
                radial-gradient(circle at 82% 45%, rgba(255, 75, 0, 0.55) 0%, rgba(254, 74, 3, 0.22) 42%, transparent 75%),
                radial-gradient(circle at 50% 95%, rgba(25, 10, 5, 0.95) 0%, transparent 60%)
              `,
            }}
          />

          {/* Dynamic Follow-Mouse Spotlight Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
            style={{
              background: useTransform(
                [smoothMouseX, smoothMouseY],
                ([x, y]) =>
                  `radial-gradient(circle 420px at ${Number(x) * 100}% ${Number(y) * 100}%, rgba(254,74,3,0.25), transparent 70%)`
              ),
            }}
          />

          {/* Top Row: Brand / Figma Style Tag on Left, Year on Right */}
          <div className="relative z-20 flex items-center justify-between w-full text-white/50 font-mono text-xs sm:text-sm tracking-wider">
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-white/85 text-xs sm:text-sm font-sans tracking-wide">
                figma
              </span>
              <span className="text-white/20">/</span>
              <span className="text-[#FE4A03] font-mono text-xs font-semibold uppercase tracking-wider">
                SEKY CREATIVES
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-white/60">
              <span>{currentInsight.year}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FE4A03] shadow-[0_0_8px_#FE4A03]" />
            </div>
          </div>

          {/* Main Grid: Left Typographic Statement & Stat + Right Glowing Geometric Lightning Ribbon */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-8">
            
            {/* Left Column: Big Glowing Stat & Statement */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`insight-content-${currentInsight.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  {/* Glowing Incandescent Number matching image */}
                  <div className="relative inline-block w-fit">
                    {/* Backlight Luminous Orange Gaussian Halo */}
                    <span 
                      aria-hidden="true"
                      className="absolute inset-0 font-extrabold text-7xl sm:text-8xl md:text-9xl lg:text-[145px] xl:text-[160px] tracking-tight leading-none text-[#FE4A03] blur-3xl opacity-90 select-none"
                    >
                      {currentInsight.stat}
                    </span>

                    {/* Secondary Crisp White Gaussian Blur */}
                    <span 
                      aria-hidden="true"
                      className="absolute inset-0 font-extrabold text-7xl sm:text-8xl md:text-9xl lg:text-[145px] xl:text-[160px] tracking-tight leading-none text-white blur-md opacity-70 select-none"
                    >
                      {currentInsight.stat}
                    </span>

                    {/* Crisp Ultra-Bold Foreground Text */}
                    <h2 className="relative font-sans font-extrabold text-7xl sm:text-8xl md:text-9xl lg:text-[145px] xl:text-[160px] tracking-tight leading-none text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.75)] select-none">
                      {currentInsight.stat}
                    </h2>
                  </div>

                  {/* Headline Statement matching exact reference formatting */}
                  <p className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight text-white/95 leading-[1.12] max-w-xl mt-4 sm:mt-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                    {currentInsight.headline}
                  </p>

                  {/* Context Subtext */}
                  {currentInsight.subtext && (
                    <p className="text-neutral-400 text-sm sm:text-base font-normal leading-relaxed max-w-lg mt-3 sm:mt-4">
                      {currentInsight.subtext}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Recreated Glowing Geometric Angled Lightning Sculpture */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end overflow-visible">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] aspect-[1/1] flex items-center justify-center">
                
                {/* Massive Diffuse Neon Flame Radial Bloom behind shape */}
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full blur-[80px] pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 60% 50%, rgba(254,74,3,0.85) 0%, rgba(255,40,0,0.55) 40%, transparent 75%)",
                  }}
                />

                {/* SVG Glowing Zigzag Ribbon Shape matching the reference image */}
                <motion.svg
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full relative z-10 filter drop-shadow-[0_0_35px_rgba(254,74,3,0.9)]"
                  animate={{
                    y: isHovered ? [-3, 3, -3] : [-5, 5, -5],
                    rotate: isHovered ? [0, 1.5, 0, -1.5, 0] : [0, 0.75, 0, -0.75, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <defs>
                    {/* Molten Glow Gradient along Ribbon path */}
                    <linearGradient id="neonMoltenGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="12%" stopColor="#FFE066" />
                      <stop offset="35%" stopColor="#FE4A03" />
                      <stop offset="65%" stopColor="#FF1800" />
                      <stop offset="85%" stopColor="#CC0000" />
                      <stop offset="100%" stopColor="#3A0000" />
                    </linearGradient>

                    {/* Specular White Rim Highlight */}
                    <linearGradient id="specularRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="30%" stopColor="#FFCC66" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#FE4A03" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#FF0000" stopOpacity="0.1" />
                    </linearGradient>

                    <filter id="outerNeonBlur" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="16" result="blur" />
                    </filter>

                    <filter id="midNeonBlur" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                    </filter>
                  </defs>

                  {/* 1. Deepest outer soft blur layer */}
                  <path
                    d="M 280 20 L 210 130 C 205 138 212 148 222 148 L 330 148 C 342 148 348 162 340 172 L 230 330 C 220 344 240 360 252 348 L 370 190 C 378 180 372 165 360 165 L 260 165 L 320 35 Z"
                    fill="url(#neonMoltenGrad)"
                    filter="url(#outerNeonBlur)"
                    opacity="0.6"
                  />

                  {/* 2. Mid blur luminescence layer */}
                  <path
                    d="M 270 25 L 205 132 C 201 139 207 148 216 148 L 325 148 C 336 148 342 161 334 170 L 235 325 C 226 338 244 352 254 340 L 360 192 C 367 183 361 170 350 170 L 255 170 L 310 38 Z"
                    fill="url(#neonMoltenGrad)"
                    filter="url(#midNeonBlur)"
                    opacity="0.85"
                  />

                  {/* 3. Crisp Geometric Ribbon Body (matching the shape in image) */}
                  <path
                    d="M 270 25 L 205 132 C 201 139 207 148 216 148 L 325 148 C 336 148 342 161 334 170 L 235 325 C 226 338 244 352 254 340 L 360 192 C 367 183 361 170 350 170 L 255 170 L 310 38 Z"
                    fill="url(#neonMoltenGrad)"
                    stroke="url(#specularRimGrad)"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* 4. White-Hot Inner Bevel Light Accent */}
                  <path
                    d="M 270 25 L 205 132 C 201 139 207 148 216 148 L 325 148"
                    stroke="#FFFFFF"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.95"
                    filter="drop-shadow(0 0 8px #FFFFFF)"
                  />

                  {/* 5. Center Corner Intense Flare Sparkle */}
                  <circle cx="216" cy="148" r="4" fill="#FFFFFF" opacity="0.95" filter="drop-shadow(0 0 6px #FFFFFF)" />
                  <circle cx="270" cy="25" r="4.5" fill="#FFFFFF" opacity="0.95" filter="drop-shadow(0 0 8px #FFFFFF)" />
                </motion.svg>
              </div>
            </div>

          </div>

          {/* Bottom Footer Details: Source & Interactive Prompt */}
          <div className="relative z-20 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-neutral-400 font-mono">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FE4A03]" />
              <span className="text-neutral-300">
                Source: {currentInsight.authorOrSource}
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300">
              <span>Click card or switch tabs to cycle perspectives</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FE4A03] animate-pulse" />
            </div>
          </div>

        </motion.div>

    </div>
  );
}
