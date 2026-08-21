import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  Star,
  Clock,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move
} from "lucide-react";
import { getOptimizedCloudinaryUrl } from "../lib/imageOptimization";

export interface CaseStudyProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  image: string;
  gallery: string[];
  deliverables: string[];
  description: string;
  highlight: string;
  layoutType?: "editorial" | "cinematic" | "cyber" | "minimal";
}

interface CaseStudyModalProps {
  key?: string;
  project: CaseStudyProject | null;
  onClose: () => void;
  index?: number;
  overrideLayout?: "editorial" | "cinematic" | "cyber" | "minimal";
}

export default function CaseStudyModal({ project, onClose, index = 0, overrideLayout }: CaseStudyModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreenMode, setIsFullscreenMode] = useState<boolean>(false);
  const lightboxContainerRef = useRef<HTMLDivElement | null>(null);

  // Collect all unique showcase images for lightbox carousel
  const allImages = project
    ? Array.from(new Set([
        ...(project.gallery || []),
        project.image
      ])).filter(Boolean)
    : [];

  const openLightbox = (imgUrl: string) => {
    const idx = allImages.indexOf(imgUrl);
    setLightboxIndex(idx !== -1 ? idx : 0);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      lightboxContainerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreenMode(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreenMode(false);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (zoomLevel > 1) {
      handleResetZoom();
    } else {
      setZoomLevel(2.2);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (lightboxIndex === null) return;
    if (e.deltaY < 0) {
      setZoomLevel((prev) => Math.min(prev + 0.25, 4));
    } else if (e.deltaY > 0) {
      setZoomLevel((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPanOffset({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragOrigin({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanOffset({
        x: e.clientX - dragOrigin.x,
        y: e.clientY - dragOrigin.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nextLightboxImage = useCallback(() => {
    if (lightboxIndex === null || allImages.length === 0) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, [lightboxIndex, allImages.length]);

  const prevLightboxImage = useCallback(() => {
    if (lightboxIndex === null || allImages.length === 0) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0));
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, [lightboxIndex, allImages.length]);

  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowRight") nextLightboxImage();
        else if (e.key === "ArrowLeft") prevLightboxImage();
        else if (e.key === "+" || e.key === "=") handleZoomIn();
        else if (e.key === "-" || e.key === "_") handleZoomOut();
        else if (e.key === "0") handleResetZoom();
        else if (e.key === "f" || e.key === "F") handleToggleFullscreen();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, lightboxIndex, nextLightboxImage, prevLightboxImage, onClose, zoomLevel]);

  if (!project || typeof document === "undefined") return null;

  // Determine layout style: explicitly set or derived from index/id
  const layouts: Array<"editorial" | "cinematic" | "cyber" | "minimal"> = [
    "editorial",
    "cinematic",
    "cyber",
    "minimal",
  ];

  let chosenLayout = overrideLayout || project.layoutType;
  if (!chosenLayout) {
    const numericId = project.id ? project.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) : index;
    chosenLayout = layouts[numericId % layouts.length];
  }

  const modalContent = (
    <AnimatePresence mode="wait">
      <div key={`casestudy-modal-${project.id}`} className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-hidden">
        {/* Modal Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/92 backdrop-blur-2xl z-0"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="relative w-full max-w-6xl max-h-[92vh] sm:max-h-[88vh] bg-[#0A0A0B] border border-white/15 rounded-3xl overflow-y-auto overscroll-contain z-10 text-white shadow-[0_25px_80px_rgba(0,0,0,0.9)] no-scrollbar pb-8 sm:pb-12"
        >
          {/* Universal Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-[#FE4A03] border border-white/20 hover:border-[#FE4A03] flex items-center justify-center text-white transition-all duration-300 z-50 shadow-2xl backdrop-blur-md cursor-pointer group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* =========================================================
              LAYOUT 1: EDITORIAL SPLIT-CANVAS (Index % 4 === 0)
             ========================================================= */}
          {chosenLayout === "editorial" && (
            <div className="p-4 sm:p-8 lg:p-12 flex flex-col gap-6 sm:gap-10">
              {/* Layout Identifier & Top Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 pr-10 sm:pr-12">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#FE4A03] text-white text-[10px] sm:text-xs font-bold font-mono tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="text-white/40 text-[10px] sm:text-xs font-mono">Editorial Case Study Layout</span>
                </div>
                <div className="text-xs text-white/50 font-mono hidden sm:block">
                  client: <span className="text-white font-medium">{project.client}</span> ({project.year})
                </div>
              </div>

              {/* Split Content Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                {/* Text Content Column */}
                <div className={`lg:col-span-5 flex flex-col justify-between gap-6 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-4 sm:space-y-5">
                    {/* Highlight Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FE4A03]/10 border border-[#FE4A03]/30 text-[#FE4A03] text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#FE4A03]" />
                      <span>{project.highlight}</span>
                    </div>

                    {/* Main Title */}
                    <h2 className="text-2xl sm:text-5xl font-black tracking-tight leading-[1.08] text-white">
                      {project.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#FE4A03] font-sans font-semibold text-sm sm:text-lg">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-white/70 text-xs sm:text-base font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Deliverables Section */}
                    <div className="pt-3 sm:pt-4 border-t border-white/10 space-y-2.5">
                      <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/40">
                        PROJECT SCOPE & DELIVERABLES
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.deliverables.map((d, i) => (
                          <div
                            key={`${d}-${i}`}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#141416] border border-white/10 text-xs font-medium text-white/90 hover:border-white/20 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FE4A03] shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Partner Client Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#121214] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] sm:text-xs text-white/40 block font-mono mb-0.5">Partner Client</span>
                      <span className="text-sm sm:text-base font-bold text-white">{project.client}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] sm:text-xs text-white/40 block font-mono mb-0.5">Year Completed</span>
                      <span className="text-base sm:text-lg font-bold text-[#FE4A03]">{project.year}</span>
                    </div>
                  </div>
                </div>

                {/* Image Gallery Canvas Column (3-Image Showcase Layout matching reference) */}
                <div className={`lg:col-span-7 flex flex-col gap-3.5 sm:gap-4 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Top Featured Image */}
                  {project.gallery[0] && (
                    <div
                      onClick={() => openLightbox(project.gallery[0])}
                      className="w-full h-64 sm:h-80 lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#FE4A03]/80 hover:shadow-[0_0_25px_rgba(254,74,3,0.25)] relative group bg-[#0C0C0E] shadow-xl cursor-pointer transition-all duration-300 flex items-center justify-center"
                    >
                      <img
                        src={getOptimizedCloudinaryUrl(project.gallery[0], { width: 1400, quality: "auto:good" })}
                        alt={`${project.title} - Showcase 1`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Bottom Row (Gallery Image 2 & Gallery Image 3 - Side by Side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {project.gallery.slice(1, 3).map((img, i) => (
                      <div
                        key={`gallery-sub-${i}-${img}`}
                        onClick={() => openLightbox(img)}
                        className="w-full h-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#FE4A03]/80 hover:shadow-[0_0_20px_rgba(254,74,3,0.25)] relative group bg-[#0C0C0E] shadow-lg cursor-pointer transition-all duration-300 flex items-center justify-center"
                      >
                        <img
                          src={getOptimizedCloudinaryUrl(img, { width: 900, quality: "auto:good" })}
                          alt={`${project.title} - Showcase ${i + 2}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              LAYOUT 2: CINEMATIC PANORAMIC & BENTO (Index % 4 === 1)
             ========================================================= */}
          {chosenLayout === "cinematic" && (
            <div className="flex flex-col">
              {/* Full-Bleed Panoramic Top Banner */}
              <div
                onClick={() => openLightbox(project.gallery[0] || project.image)}
                className="relative w-full h-52 sm:h-80 md:h-[380px] overflow-hidden group cursor-pointer"
              >
                <img
                  src={getOptimizedCloudinaryUrl(project.gallery[0] || project.image, { width: 1400, quality: "auto:good" })}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/50 to-transparent pointer-events-none" />

                {/* Floating Info Overlay inside Banner */}
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-10 right-4 sm:right-10 flex flex-col gap-1.5 sm:gap-2 pointer-events-none">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FE4A03] text-white text-[10px] sm:text-xs font-bold font-mono">
                      {project.category}
                    </span>
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 text-[10px] sm:text-xs font-mono">
                      {project.year} • {project.client}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
                    {project.title}
                  </h2>
                  <p className="text-white/80 text-xs sm:text-base font-light max-w-2xl">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Middle Metric Bar (3 Cards) */}
              <div className="px-4 sm:px-10 py-4 sm:py-6 border-y border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 bg-white/[0.02]">
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#FE4A03]" />
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/40 block">Client Partner</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{project.client}</span>
                  </div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FE4A03]" />
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/40 block">Key Result</span>
                    <span className="text-xs sm:text-sm font-bold text-[#FE4A03]">{project.highlight}</span>
                  </div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#FE4A03]" />
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/40 block">Release Year</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{project.year}</span>
                  </div>
                </div>
              </div>

              {/* Lower Section Split */}
              <div className="p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Description & Scope */}
                <div className={`lg:col-span-6 flex flex-col gap-4 sm:gap-6 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Cinematic Case Overview</h3>
                  <p className="text-white/70 text-xs sm:text-base font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2.5 pt-3 sm:pt-4 border-t border-white/10">
                    <span className="text-[10px] sm:text-xs font-mono uppercase text-white/50 tracking-wider block">
                      Deliverables Suite
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.deliverables.map((item, i) => (
                        <div
                          key={`${item}-${i}`}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FE4A03] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gallery Mosaic */}
                <div className={`lg:col-span-6 flex flex-col gap-3 sm:gap-4 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h4 className="text-xs sm:text-sm font-mono uppercase text-white/50 tracking-wider">
                    Gallery Reel ({project.gallery.length} Images)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {project.gallery.map((img, i) => (
                      <div
                        key={`cinematic-gallery-${i}-${img}`}
                        onClick={() => openLightbox(img)}
                        className="w-full h-32 sm:h-44 rounded-2xl overflow-hidden border border-white/10 hover:border-[#FE4A03]/80 hover:shadow-[0_0_20px_rgba(254,74,3,0.25)] relative group cursor-pointer transition-all duration-300"
                      >
                        <img
                          src={getOptimizedCloudinaryUrl(img, { width: 600, quality: "auto:good" })}
                          alt={`Gallery asset ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              LAYOUT 3: CYBER MAGAZINE 3-COLUMN (Index % 4 === 2)
             ========================================================= */}
          {chosenLayout === "cyber" && (
            <div className="p-4 sm:p-8 lg:p-12 flex flex-col gap-6 sm:gap-8">
              {/* Top Banner Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/10 pb-4 sm:pb-6 pr-10 sm:pr-12">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FE4A03]/20 border border-[#FE4A03]/40 text-[#FE4A03] text-[10px] sm:text-xs font-bold font-mono">
                      {project.category}
                    </span>
                    <span className="text-white/40 text-[10px] sm:text-xs font-mono">Cyber Magazine Format</span>
                  </div>
                  <h2 className="text-2xl sm:text-5xl font-black tracking-tight text-white">
                    {project.title}
                  </h2>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-[10px] sm:text-xs text-white/40 block font-mono">Client</span>
                  <span className="text-base sm:text-lg font-bold text-white">{project.client}</span>
                </div>
              </div>

              {/* 3-Column Content Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
                {/* Column 1: Deliverables & Specs (3 cols) */}
                <div className="md:col-span-3 flex flex-col gap-3 sm:gap-4 bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 h-fit">
                  <div className="flex items-center gap-2 text-[#FE4A03] font-mono text-xs font-bold uppercase">
                    <Layers className="w-4 h-4" />
                    <span>Project Specs</span>
                  </div>
                  <ul className="space-y-2 pt-2 border-t border-white/10">
                    {project.deliverables.map((d, i) => (
                      <li key={`${d}-${i}`} className="flex items-center gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FE4A03] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/40 block">Key Distinction</span>
                    <span className="text-xs font-bold text-[#FE4A03]">{project.highlight}</span>
                  </div>
                </div>

                {/* Column 2: Main Featured Hero Image (5 cols) */}
                <div
                  onClick={() => openLightbox(project.gallery[0] || project.image)}
                  className="md:col-span-5 w-full h-52 md:h-[420px] rounded-2xl overflow-hidden border border-[#FE4A03]/40 hover:border-[#FE4A03] hover:shadow-[0_0_30px_rgba(254,74,3,0.3)] relative group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getOptimizedCloudinaryUrl(project.gallery[0] || project.image, { width: 1200, quality: "auto:good" })}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 pointer-events-none">
                    <p className="text-xs text-white/90 font-medium line-clamp-2">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Column 3: Narrative & Gallery Stack (4 cols) */}
                <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6 justify-between">
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-base sm:text-lg font-bold text-white">Narrative & Context</h4>
                    <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Gallery Thumbnails */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-white/40 uppercase block">Gallery Preview ({project.gallery.length} Images)</span>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      {project.gallery.map((gImg, i) => (
                        <div
                          key={`cyber-gallery-${i}-${gImg}`}
                          onClick={() => openLightbox(gImg)}
                          className="h-20 sm:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-[#FE4A03]/80 hover:shadow-[0_0_15px_rgba(254,74,3,0.25)] relative group cursor-pointer transition-all duration-300"
                        >
                          <img
                            src={getOptimizedCloudinaryUrl(gImg, { width: 450, quality: "auto:good" })}
                            alt={`Gallery ${i}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              LAYOUT 4: MINIMALIST DARK CARD (Index % 4 === 3)
             ========================================================= */}
          {chosenLayout === "minimal" && (
            <div className="p-4 sm:p-8 lg:p-12 flex flex-col gap-6 sm:gap-8">
              {/* Header */}
              <div className="flex flex-col gap-1.5 sm:gap-2 border-b border-white/10 pb-4 sm:pb-6 pr-10 sm:pr-12">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FE4A03] text-white text-[10px] sm:text-xs font-bold font-mono">
                    {project.category}
                  </span>
                  <span className="text-white/50 text-[10px] sm:text-xs font-mono">
                    {project.client} • {project.year}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-5xl font-black tracking-tight text-white mt-1">
                  {project.title}
                </h2>
                <p className="text-white/60 text-xs sm:text-base font-light">
                  {project.subtitle}
                </p>
              </div>

              {/* Main Content 2-Column Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Image */}
                <div
                  onClick={() => openLightbox(project.gallery[0] || project.image)}
                  className={`lg:col-span-7 h-52 sm:h-80 md:h-[380px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#FE4A03]/80 hover:shadow-[0_0_25px_rgba(254,74,3,0.25)] relative group cursor-pointer transition-all duration-300 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <img
                    src={getOptimizedCloudinaryUrl(project.gallery[0] || project.image, { width: 1200, quality: "auto:good" })}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Overview & Deliverables List */}
                <div className={`lg:col-span-5 flex flex-col gap-4 sm:gap-6 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Project Scope</h3>
                    <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-[10px] sm:text-xs font-mono uppercase text-[#FE4A03] font-bold">
                      Key Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.deliverables.map((item, i) => (
                        <div key={`${item}-${i}`} className="flex items-center gap-2 text-xs text-white/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FE4A03] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Full-Width Gallery Masonry */}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <h4 className="text-sm font-mono text-white/50 uppercase tracking-wider">
                  Full Asset Showcase Gallery
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.gallery.map((img, i) => (
                    <div
                      key={`minimal-gallery-${i}-${img}`}
                      onClick={() => openLightbox(img)}
                      className="h-52 rounded-2xl overflow-hidden border border-white/10 hover:border-[#FE4A03]/80 hover:shadow-[0_0_20px_rgba(254,74,3,0.25)] relative group cursor-pointer transition-all duration-300"
                    >
                      <img
                        src={getOptimizedCloudinaryUrl(img, { width: 700, quality: "auto:good" })}
                        alt={`Gallery asset ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* FULLSCREEN INTERACTIVE IMAGE LIGHTBOX & ZOOM VIEWER */}
      <AnimatePresence>
        {lightboxIndex !== null && allImages[lightboxIndex] && (
          <motion.div
            ref={lightboxContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black/98 backdrop-blur-3xl p-2 sm:p-4 md:p-6 select-none overflow-hidden"
          >
            {/* Minimal Floating Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              title="Close (Esc)"
              className="absolute top-4 sm:top-6 right-4 sm:right-6 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#FE4A03] border border-white/20 hover:border-[#FE4A03] flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer group shadow-2xl"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Main Interactive Zoom Canvas */}
            <div
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDoubleClick={handleDoubleClick}
              className={`relative w-full h-full flex-1 flex items-center justify-center overflow-hidden rounded-2xl ${
                zoomLevel > 1
                  ? isDragging
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-zoom-in"
              }`}
            >
              {/* Previous Image Arrow */}
              {allImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevLightboxImage();
                  }}
                  aria-label="Previous Image"
                  className="absolute left-3 sm:left-6 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/80 hover:bg-[#FE4A03] border border-white/20 hover:border-[#FE4A03] flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              )}

              {/* Active Image with Pan & Zoom Transform */}
              <div
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="w-full h-full flex items-center justify-center p-2 sm:p-4 select-none touch-none"
              >
                <img
                  key={`zoom-img-${lightboxIndex}`}
                  src={getOptimizedCloudinaryUrl(allImages[lightboxIndex], { width: 2600, quality: "auto:best" })}
                  alt={`${project.title} showcase full resolution ${lightboxIndex + 1}`}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="max-w-full max-h-[82vh] object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Image Arrow */}
              {allImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextLightboxImage();
                  }}
                  aria-label="Next Image"
                  className="absolute right-3 sm:right-6 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/80 hover:bg-[#FE4A03] border border-white/20 hover:border-[#FE4A03] flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              )}

              {/* Floating Pan Hint when Zoomed */}
              {zoomLevel > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white/80 text-[11px] font-mono flex items-center gap-2 pointer-events-none shadow-2xl">
                  <Move className="w-3.5 h-3.5 text-[#FE4A03]" />
                  <span>Click & Drag to Pan • Double-click to Reset</span>
                </div>
              )}
            </div>

            {/* Lightbox Footer Thumbnail Bar */}
            {allImages.length > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-3 z-30 overflow-x-auto max-w-full py-1.5 px-3 bg-[#0A0A0C]/80 border border-white/10 backdrop-blur-xl rounded-2xl no-scrollbar">
                {allImages.map((img, idx) => (
                  <button
                    key={`lightbox-thumb-${idx}-${img}`}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setZoomLevel(1);
                      setPanOffset({ x: 0, y: 0 });
                    }}
                    className={`relative h-11 w-14 sm:h-14 sm:w-20 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer shrink-0 bg-[#070709] p-0.5 ${
                      idx === lightboxIndex
                        ? "border-[#FE4A03] ring-2 ring-[#FE4A03]/60 scale-105 shadow-[0_0_15px_rgba(254,74,3,0.5)]"
                        : "border-white/20 opacity-50 hover:opacity-100 hover:border-white/50"
                    }`}
                  >
                    <img
                      src={getOptimizedCloudinaryUrl(img, { width: 180, quality: "auto:eco" })}
                      alt={`Thumbnail ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}


