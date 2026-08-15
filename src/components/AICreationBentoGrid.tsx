import { useState, useRef, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Video,
  ZoomIn
} from "lucide-react";

interface AICreativeItem {
  id: string;
  type: "image" | "video";
  title: string;
  subtitle: string;
  category: "Generative Art" | "Neural Motion" | "Digital Avatars" | "Synth Art";
  year: string;
  client: string;
  image: string; // Main image or video poster
  gallery?: string[]; // Multiple images for image type
  videoUrl?: string; // MP4 video URL if type === "video"
  duration?: string; // Video duration e.g. "0:45"
  resolution?: string; // Resolution e.g. "4K Sora Render"
  description: string;
}

const aiCreativeItems: AICreativeItem[] = [
  {
    id: "ai-1",
    type: "image",
    title: "Neural Geometry",
    subtitle: "Generative Abstract Parametric Architecture",
    category: "Generative Art",
    year: "2025",
    client: "Future Architecture Lab",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Complex parametric architectural concepts synthesized via custom AI model pipelines and fine-tuned latent diffusion for spatial exhibitions.",
  },
  {
    id: "ai-2",
    type: "video",
    title: "Liquid Consciousness",
    subtitle: "Neural Fluid Dynamic Motion Synthesis",
    category: "Neural Motion",
    year: "2025",
    client: "Omni Digital Gallery",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "0:45",
    resolution: "4K Sora Render",
    description: "Fluid neural motion artwork simulating iridescent organic paints responding dynamically to audio frequency inputs.",
  },
  {
    id: "ai-3",
    type: "image",
    title: "Matrix Projections",
    subtitle: "Cyberspace Neural Synthesis & Data Light",
    category: "Synth Art",
    year: "2025",
    client: "CyberPulse Interactive",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Abstract futuristic visual worlds blending cybernetic light structures and data streams into immersive artwork.",
  },
  {
    id: "ai-4",
    type: "video",
    title: "Synthesized Minds",
    subtitle: "Virtual Persona & Voice-Synced Avatar",
    category: "Digital Avatars",
    year: "2025",
    client: "Synapse AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "0:30",
    resolution: "4K Realtime Avatar",
    description: "Photorealistic digital persona creation and neural voice-synchronization for interactive virtual brand ambassadors.",
  },
  {
    id: "ai-5",
    type: "video",
    title: "Flowing Prompts",
    subtitle: "Sora & Runway Camera Vector Motion",
    category: "Neural Motion",
    year: "2025",
    client: "Kinetics Media",
    image: "https://images.unsplash.com/photo-1618005198143-e52834643521?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "0:25",
    resolution: "Gen-3 Alpha 60FPS",
    description: "Cinematic video generation leveraging prompt engineering and camera control vectors for high-concept brand ads.",
  },
  {
    id: "ai-6",
    type: "image",
    title: "Synthetic Fashion Capsule",
    subtitle: "Hyper-Realistic Synthetic Model Shoot",
    category: "Generative Art",
    year: "2025",
    client: "Vogue AI Capsule",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Full synthetic fashion shoot with zero physical set builds, delivering studio-grade lighting and hyper-accurate textile textures.",
  },
];

const categories = ["All Showcase", "Generative Art", "Neural Motion", "Digital Avatars", "Synth Art"] as const;

export default function AICreationBentoGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Showcase");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Video player modal controls
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const filteredItems = selectedCategory === "All Showcase"
    ? aiCreativeItems
    : aiCreativeItems.filter((p) => p.category === selectedCategory);

  const currentItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  const handleItemClick = (index: number) => {
    const item = filteredItems[index];
    if (item && item.type === "video") {
      // Play inline directly without popup modal
      setPlayingVideoId((prev) => (prev === item.id ? null : item.id));
    } else {
      openModal(index);
    }
  };

  // Video time update listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentItem]);

  // Reset video state on item change
  useEffect(() => {
    setIsPlaying(true);
    setCurrentTime(0);
    setActiveGalleryIndex(0);
  }, [activeItemIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;

      if (e.key === "Escape") {
        setActiveItemIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " && currentItem?.type === "video") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, currentItem, activeGalleryIndex, filteredItems.length]);

  const openModal = (index: number) => {
    setActiveItemIndex(index);
    setActiveGalleryIndex(0);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (activeItemIndex === null) return;
    if (currentItem?.type === "image" && currentItem.gallery && activeGalleryIndex < currentItem.gallery.length - 1) {
      setActiveGalleryIndex((prev) => prev + 1);
    } else {
      setActiveItemIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      setActiveGalleryIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeItemIndex === null) return;
    if (currentItem?.type === "image" && activeGalleryIndex > 0) {
      setActiveGalleryIndex((prev) => prev - 1);
    } else {
      const nextIdx = activeItemIndex > 0 ? activeItemIndex - 1 : filteredItems.length - 1;
      setActiveItemIndex(nextIdx);
      const prevItem = filteredItems[nextIdx];
      setActiveGalleryIndex(prevItem.type === "image" && prevItem.gallery ? prevItem.gallery.length - 1 : 0);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full mt-2 sm:mt-4 bg-[#0A0A0B]/50 border border-white/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden backdrop-blur-lg"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FE4A03]/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#FE4A03]/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Gallery Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 border-b border-white/10 pb-4 mb-4 sm:pb-8 sm:mb-8">
        <div className="flex flex-col gap-1.5 sm:gap-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FE4A03] animate-pulse" />
            <span className="text-[#FE4A03] font-mono text-[11px] sm:text-xs tracking-widest uppercase font-semibold">
              AI CREATIVE & MOTION GALLERY
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none font-sans">
            Synthesizing Vision.<br />
            <span className="text-white/40">Generative Imagery & Neural Motion.</span>
          </h3>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 mb-4 sm:pb-4 sm:mb-8 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = cat === "All Showcase"
            ? aiCreativeItems.length
            : aiCreativeItems.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#FE4A03] text-white font-bold border border-[#FE4A03] shadow-[0_0_20px_rgba(254,74,3,0.4)]"
                  : "bg-white/5 text-white/60 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  isActive ? "bg-black/30 text-white" : "bg-white/10 text-white/50"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* GALLERY COMBINED GRID */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {filteredItems.map((item, idx) => {
            const isHovered = hoveredVideoId === item.id;
            const isVideo = item.type === "video";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onMouseEnter={() => setHoveredVideoId(item.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
                onClick={() => handleItemClick(idx)}
                className="group relative rounded-2xl bg-[#121214]/50 border border-white/10 hover:border-[#FE4A03]/80 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(254,74,3,0.25)] flex flex-col backdrop-blur-lg"
              >
                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold text-white/90">
                  {item.category}
                </div>

                {/* Top Right Media Type Indicator Badge */}
                <div className="absolute top-3 right-3 z-20">
                  {isVideo ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FE4A03] text-black text-[10px] font-mono font-extrabold shadow-[0_0_12px_#FE4A03]">
                      <Play className="w-3 h-3 fill-black" />
                      <span>{item.duration || "VIDEO"}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90">
                      <ImageIcon className="w-3 h-3 text-[#FE4A03]" />
                      <span>{item.gallery ? `${item.gallery.length} SHOTS` : "IMAGE"}</span>
                    </span>
                  )}
                </div>

                {/* Aspect-Ratio Visual Container */}
                <div className="w-full aspect-[16/10] relative overflow-hidden bg-neutral-950 flex items-center justify-center">
                  {isVideo && playingVideoId === item.id && item.videoUrl ? (
                    <div className="relative w-full h-full">
                      <video
                        src={item.videoUrl}
                        autoPlay
                        controls
                        playsInline
                        className="w-full h-full object-cover z-30"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(null);
                        }}
                        className="absolute top-2 right-2 z-40 px-2 py-1 rounded-md bg-black/85 hover:bg-[#FE4A03] text-white text-[10px] font-mono flex items-center gap-1 border border-white/20 transition-all duration-200 shadow-xl cursor-pointer"
                        title="Close video"
                      >
                        <X className="w-3 h-3" />
                        <span>Close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={
                          item.image.includes("images.unsplash.com")
                            ? item.image.replace(/w=\d+/, "w=600")
                            : item.image
                        }
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                          isHovered ? "scale-105 opacity-80" : "scale-100 opacity-90"
                        }`}
                        referrerPolicy="no-referrer"
                      />

                      {/* Muted Hover Video Preview if video */}
                      {isVideo && isHovered && item.videoUrl && (
                        <video
                          src={item.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover z-10"
                        />
                      )}

                      {/* Center Action Overlay Icon for Videos */}
                      {isVideo && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 rounded-full bg-[#FE4A03] text-white flex items-center justify-center shadow-[0_0_25px_#FE4A03] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-5 h-5 fill-white translate-x-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
                    </>
                  )}
                </div>

                {/* Footer Bar Info */}
                <div className="p-4 sm:p-5 flex items-center justify-between bg-[#121214]/50 backdrop-blur-lg">
                  <div className="flex flex-col min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FE4A03] transition-colors duration-300 truncate tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-white/50 text-xs font-light truncate">
                      {item.client} • {item.year}
                    </span>
                  </div>

                  {/* Icon Indicator */}
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#FE4A03] flex items-center justify-center text-white/70 group-hover:text-white transition-all duration-300 shrink-0 border border-white/10 group-hover:border-[#FE4A03]">
                    {isVideo ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* FULLSCREEN POPUP MODAL (HANDLES BOTH IMAGES & VIDEOS) */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
            onClick={() => setActiveItemIndex(null)}
          >
            {/* Top Bar Navigation & Info */}
            <div
              className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 sm:gap-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
                <span className="text-[11px] sm:text-xs font-mono text-[#FE4A03] font-bold uppercase">
                  {currentItem.category}
                </span>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[180px] sm:max-w-xs">
                  {currentItem.title}
                </span>
                {currentItem.type === "video" && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#FE4A03]/20 border border-[#FE4A03]/40 text-[#FE4A03] text-[10px] font-mono">
                    {currentItem.resolution || "AI VIDEO"}
                  </span>
                )}
              </div>

              <button
                onClick={() => setActiveItemIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FE4A03] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left / Right Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 z-50 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#FE4A03] hover:border-[#FE4A03] flex items-center justify-center transition-all cursor-pointer shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 z-50 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#FE4A03] hover:border-[#FE4A03] flex items-center justify-center transition-all cursor-pointer shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* MODAL DISPLAY STAGE */}
            <div
              className="relative max-w-5xl max-h-[82vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.type === "video" && currentItem.videoUrl ? (
                /* VIDEO PLAYER STAGE */
                <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl relative group/player flex flex-col">
                  <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                    <video
                      ref={videoRef}
                      src={currentItem.videoUrl}
                      poster={currentItem.image}
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                      onClick={togglePlayPause}
                    />

                    {/* Big Overlay Play Button when paused */}
                    {!isPlaying && (
                      <button
                        onClick={togglePlayPause}
                        className="absolute w-20 h-20 rounded-full bg-[#FE4A03] text-white flex items-center justify-center shadow-[0_0_40px_#FE4A03] cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Play className="w-8 h-8 fill-white translate-x-1" />
                      </button>
                    )}
                  </div>

                  {/* Video Custom Control Bar */}
                  <div className="bg-[#121214] p-4 border-t border-white/10 flex flex-col gap-3">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-white/50 w-10 text-right">
                        {formatTime(currentTime)}
                      </span>
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#FE4A03]"
                      />
                      <span className="text-[11px] font-mono text-white/50 w-10">
                        {formatTime(duration)}
                      </span>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlayPause}
                          className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FE4A03] text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-white" />
                          ) : (
                            <Play className="w-4 h-4 fill-white translate-x-0.5" />
                          )}
                        </button>

                        <button
                          onClick={toggleMute}
                          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 text-white/70" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-white/70" />
                          )}
                        </button>

                        <div className="text-xs text-white/70 font-mono">
                          {currentItem.title}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/40 hidden sm:inline">
                          {currentItem.resolution}
                        </span>
                        <button
                          onClick={toggleFullscreen}
                          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Maximize className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* IMAGE LIGHTBOX STAGE */
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${currentItem.id}-${activeGalleryIndex}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      src={
                        currentItem.gallery && currentItem.gallery[activeGalleryIndex]
                          ? currentItem.gallery[activeGalleryIndex]
                          : currentItem.image
                      }
                      alt={currentItem.title}
                      className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Gallery Thumbnail Strip if images */}
                  {currentItem.gallery && currentItem.gallery.length > 1 && (
                    <div className="flex items-center gap-2 mt-4 overflow-x-auto p-1.5 bg-black/60 rounded-full border border-white/10">
                      {currentItem.gallery.map((imgUrl, gIdx) => (
                        <button
                          key={`ai-thumb-${gIdx}-${imgUrl}`}
                          onClick={() => setActiveGalleryIndex(gIdx)}
                          className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                            activeGalleryIndex === gIdx
                              ? "border-[#FE4A03] scale-105"
                              : "border-transparent opacity-50 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
