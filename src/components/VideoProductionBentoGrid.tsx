import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  ArrowUpRight,
  X,
  Video,
  Smartphone,
  Tv,
  Film,
  Sparkles
} from "lucide-react";

export type AspectRatio = "16:9" | "9:16";

export interface VideoProject {
  id: string;
  title: string;
  subtitle: string;
  category: "Promo" | "Trailer" | "Explainer" | "Intro" | "Social Reel" | "Event Visuals" | "3D Motion";
  aspectRatio: AspectRatio;
  duration: string;
  resolution: string;
  videoUrl: string;
  description: string;
  tags: string[];
}

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Promos, Trailers, Explainers & Intros
const widescreenVideos: VideoProject[] = [
  {
    id: "wide-1",
    title: "Asian Hockey — Projection Mapping",
    subtitle: "Immersive Projection Mapping & Dynamic Visuals",
    category: "Event Visuals",
    aspectRatio: "16:9",
    duration: "4K Master",
    resolution: "4K UHD • Promo",
    videoUrl: "https://youtu.be/N6dn3veKVLE",
    description: "A high-impact projection mapping experience created for Asian Hockey, blending immersive visuals, dynamic motion graphics, and synchronized content to transform the event space and bring the energy of the sport to life.",
    tags: ["Projection Mapping", "Asian Hockey", "Motion Graphics", "Event Visuals"]
  },
  {
    id: "wide-2",
    title: "Avarae 2.0 — Teaser",
    subtitle: "Cinematic Teaser & Visual Effects",
    category: "Trailer",
    aspectRatio: "16:9",
    duration: "4K Master",
    resolution: "4K UHD • Trailer",
    videoUrl: "https://youtu.be/vTCkiLbOE4w",
    description: "A cinematic teaser created for Avarae II, combining dynamic editing, visual effects, motion graphics, and atmospheric visuals to build anticipation and set the tone for the project.",
    tags: ["Cinematic Teaser", "Avarae II", "Visual Effects", "Atmospheric"]
  },
  {
    id: "wide-3",
    title: "Shriram Finance — AI Video Promo",
    subtitle: "AI-Generated Visuals & Brand Storytelling",
    category: "Promo",
    aspectRatio: "16:9",
    duration: "4K Master",
    resolution: "4K UHD • Promo",
    videoUrl: "https://youtu.be/yo9EqfcS-Vg",
    description: "An AI-powered promotional video created for Shriram Finance, combining AI-generated visuals, cinematic editing, motion graphics, and visual effects to create an engaging and impactful brand story.",
    tags: ["Shriram Finance", "AI Video", "AI Visuals", "Motion Graphics", "Promo"]
  },
  {
    id: "wide-4",
    title: "Switch Esports — 3D Roster Reveal",
    subtitle: "Cinematic 3D Esports Roster Reveal",
    category: "Intro",
    aspectRatio: "16:9",
    duration: "Full HD",
    resolution: "1080p • Intro",
    videoUrl: "https://youtu.be/yveSgVsBaEw",
    description: "A high-energy 3D roster reveal video for Switch Esports, featuring cinematic 3D animation, dynamic camera movements, lighting, and motion graphics to introduce the team’s players with an immersive esports aesthetic.",
    tags: ["3D Animation", "Switch Esports", "Roster Reveal", "Motion Graphics"]
  },
  {
    id: "wide-5",
    title: "IASG Academy — Hospitality Management",
    subtitle: "Professional Video Editing & Motion Graphics",
    category: "Explainer",
    aspectRatio: "16:9",
    duration: "Full HD",
    resolution: "1080p • Explainer",
    videoUrl: "https://youtu.be/Tc7_hJxfYA8",
    description: "This video was created for IASG Academy – Hospitality Management, featuring professional video editing, motion graphics, and visual effects. The project was edited using Adobe Premiere Pro and After Effects, with custom animations, transitions, and motion graphics to create an engaging and polished visual experience.",
    tags: ["IASG Academy", "Hospitality Management", "Premiere Pro", "After Effects", "Explainer"]
  },
  {
    id: "wide-6",
    title: "Milar — Intro Animation",
    subtitle: "Brand Intro & Dynamic Motion Graphics",
    category: "Intro",
    aspectRatio: "16:9",
    duration: "4K Master",
    resolution: "4K UHD • Intro",
    videoUrl: "https://youtu.be/3N1PBolGt2Y",
    description: "A sleek intro animation created for Milar, combining clean motion graphics, dynamic transitions, and visual effects to introduce the brand with a modern and engaging visual style.",
    tags: ["Intro Animation", "Milar", "Motion Graphics", "Brand Identity"]
  },
  {
    id: "wide-7",
    title: "Prime Kitchen — Brand Promo",
    subtitle: "Culinary Experience & Promotional Story",
    category: "Promo",
    aspectRatio: "16:9",
    duration: "4K Master",
    resolution: "4K UHD • Promo",
    videoUrl: "https://youtu.be/6yaqzu-tOlY",
    description: "A vibrant promotional video created for Prime Kitchen, combining engaging visuals, dynamic editing, and motion graphics to showcase the brand and its culinary experience.",
    tags: ["Brand Promo", "Prime Kitchen", "Culinary Experience", "Dynamic Cut"]
  },
  {
    id: "wide-8",
    title: "Switch Esports — Tournament Trailer",
    subtitle: "High-Energy Esports Competition Trailer",
    category: "Trailer",
    aspectRatio: "16:9",
    duration: "4K Master",
    resolution: "4K UHD • Trailer",
    videoUrl: "https://youtu.be/iW61lbCQe3c",
    description: "A high-energy tournament trailer created for Switch Esports, combining cinematic editing, dynamic motion graphics, visual effects, and intense esports visuals to build excitement and anticipation for the competition.",
    tags: ["Tournament Trailer", "Esports", "Cinematic VFX", "Trailer"]
  },
  {
    id: "wide-9",
    title: "Avarae 2.0 — Recap Promo",
    subtitle: "Event Highlight & Motion Graphics",
    category: "Promo",
    aspectRatio: "16:9",
    duration: "Full HD",
    resolution: "1080p • Promo",
    videoUrl: "https://youtu.be/A9Tdd-ocRro",
    description: "A dynamic recap promo for Avarae 2.0, bringing together energetic editing, cinematic visuals, motion graphics, and key moments from the event to create an engaging visual highlight.",
    tags: ["Recap Promo", "Event Highlights", "Motion Design", "Editing"]
  }
];

const reelVideos: VideoProject[] = [
  {
    id: "reel-1",
    title: "OneCode — App Feature Showcase",
    subtitle: "UI/UX Motion & Feature Showcase",
    category: "Social Reel",
    aspectRatio: "9:16",
    duration: "Shorts",
    resolution: "1080x1920 • Reel",
    videoUrl: "https://youtube.com/shorts/n3uquH_Z_TQ?feature=share",
    description: "A feature showcase video for the OneCode app, highlighting its key functionalities through clean motion graphics, smooth transitions, and engaging visual storytelling to present the app experience in a simple and intuitive way.",
    tags: ["OneCode", "App Showcase", "Feature Demo", "UI Motion"]
  },
  {
    id: "reel-2",
    title: "Avarae — 3D Social Media Post",
    subtitle: "3D Design, Lighting & Animation",
    category: "Social Reel",
    aspectRatio: "9:16",
    duration: "Shorts",
    resolution: "1080x1920 • Short",
    videoUrl: "https://youtube.com/shorts/-HJxMLplZhE?feature=share",
    description: "A 3D social media visual created for Avarae, combining 3D design, animation, lighting, and motion graphics to create a bold and engaging brand-focused post.",
    tags: ["Avarae", "3D Design", "Lighting", "Social Post"]
  },
  {
    id: "reel-3",
    title: "Credit Score — Explainer Video",
    subtitle: "Financial Literacy & Motion Storytelling",
    category: "Social Reel",
    aspectRatio: "9:16",
    duration: "Shorts",
    resolution: "1080x1920 • Reel",
    videoUrl: "https://youtube.com/shorts/ep_jzZz0GGo?feature=share",
    description: "An engaging explainer video created to simplify the concept of credit scores, combining clear visual storytelling, motion graphics, animation, and smooth transitions to make complex financial information easy to understand.",
    tags: ["Credit Score", "Finance", "Explainer Video", "Animation"]
  },
  {
    id: "reel-4",
    title: "Adam & Weave — Brand Promo",
    subtitle: "Apparel Showcase & Clean Editing",
    category: "Social Reel",
    aspectRatio: "9:16",
    duration: "Shorts",
    resolution: "1080x1920 • Short",
    videoUrl: "https://youtube.com/shorts/0CWG9q8GdbI?feature=share",
    description: "A short promotional video for Adam & Weave, a contemporary T-shirt brand, featuring dynamic visuals, clean editing, and engaging motion graphics to showcase the brand and its apparel.",
    tags: ["Adam & Weave", "Brand Promo", "Apparel", "Dynamic Visuals"]
  },
  {
    id: "reel-5",
    title: "YES BANK — VKYC Explainer Video",
    subtitle: "Financial Motion Graphics & Animation",
    category: "Social Reel",
    aspectRatio: "9:16",
    duration: "Shorts",
    resolution: "1080x1920 • Reel",
    videoUrl: "https://youtube.com/shorts/dFKQi8hpa14?feature=share",
    description: "An informative explainer video created for YES BANK, simplifying the VKYC process through engaging motion graphics, clear visual storytelling, animation, and smooth transitions to make the process easy to understand.",
    tags: ["YES BANK", "VKYC", "Explainer", "Motion Graphics"]
  }
];

const allVideos: VideoProject[] = [...widescreenVideos, ...reelVideos];

export default function VideoProductionBentoGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "promos" | "reels">("all");
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const handleVideoSelect = (project: VideoProject) => {
    // Play video directly inline in place without popup modal on both desktop & mobile
    setPlayingVideoId((prev) => (prev === project.id ? null : project.id));
  };

  const displayVideos = 
    activeTab === "promos"
      ? widescreenVideos
      : activeTab === "reels"
      ? reelVideos
      : allVideos;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mt-4 bg-[#0A0A0B]/60 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl"
    >
      {/* Ambient Accent Glows */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#FE4A03]/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-[#FE4A03]/5 rounded-full filter blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 border-b border-white/10 pb-4 mb-6 sm:pb-8 sm:mb-8">
        <div className="flex flex-col gap-1.5 sm:gap-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FE4A03] animate-pulse" />
            <span className="text-[#FE4A03] font-mono text-[11px] sm:text-xs tracking-widest uppercase font-semibold">
              VIDEO PRODUCTION & MOTION
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none font-sans">
            SHAPING STORIES.<br />
            <span className="text-white/40">CREATING EXPERIENCES.</span>
          </h3>
          <p className="text-white/60 text-xs sm:text-sm md:text-base font-light tracking-wide mt-1 sm:mt-2">
            A glimpse of the work. Plenty more to show.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-[#121214]/80 p-1.5 rounded-full border border-white/10 self-start sm:self-end shrink-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#FE4A03] text-white shadow-[0_0_15px_rgba(254,74,3,0.3)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All ({allVideos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("promos")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "promos"
                ? "bg-[#FE4A03] text-white shadow-[0_0_15px_rgba(254,74,3,0.3)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Promos & Trailers ({widescreenVideos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reels")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "reels"
                ? "bg-[#FE4A03] text-white shadow-[0_0_15px_rgba(254,74,3,0.3)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Reels & Shorts ({reelVideos.length})</span>
          </button>
        </div>
      </div>

      {/* When "ALL" is selected: Render Promos & Trailers + Reels & Shorts */}
      {activeTab === "all" ? (
        <div className="space-y-12">
          {/* Section 1: Promos, Trailers, Explainers & Intros */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#FE4A03]" />
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Promos & Trailers
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-mono">
                  Promos & Trailers
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {widescreenVideos.map((project, idx) => (
                <WidescreenCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  isHovered={hoveredVideoId === project.id}
                  isPlayingInline={playingVideoId === project.id}
                  onHover={setHoveredVideoId}
                  onSelect={handleVideoSelect}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Vertical Reels & Shorts */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#FE4A03]" />
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Reels & Shorts
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FE4A03]/20 border border-[#FE4A03]/40 text-[#FE4A03] text-[10px] font-mono font-bold">
                  Reels & Shorts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {reelVideos.map((project, idx) => (
                <ReelCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  isHovered={hoveredVideoId === project.id}
                  isPlayingInline={playingVideoId === project.id}
                  onHover={setHoveredVideoId}
                  onSelect={handleVideoSelect}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Filtered View */
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "promos" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayVideos.map((project, idx) => (
                  <WidescreenCard
                    key={project.id}
                    project={project}
                    idx={idx}
                    isHovered={hoveredVideoId === project.id}
                    isPlayingInline={playingVideoId === project.id}
                    onHover={setHoveredVideoId}
                    onSelect={handleVideoSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                {displayVideos.map((project, idx) => (
                  <ReelCard
                    key={project.id}
                    project={project}
                    idx={idx}
                    isHovered={hoveredVideoId === project.id}
                    isPlayingInline={playingVideoId === project.id}
                    onHover={setHoveredVideoId}
                    onSelect={handleVideoSelect}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}

interface CardProps {
  key?: string;
  project: VideoProject;
  idx: number;
  isHovered: boolean;
  isPlayingInline: boolean;
  onHover: (id: string | null) => void;
  onSelect: (p: VideoProject) => void;
}

// Sub-component: 16:9 Widescreen Card
function WidescreenCard({
  project,
  idx,
  isHovered,
  isPlayingInline,
  onHover,
  onSelect
}: CardProps) {
  const ytId = getYouTubeId(project.videoUrl);
  const thumbnailUrl = ytId
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.04 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(project)}
      className="group relative rounded-xl sm:rounded-2xl bg-[#121214]/60 border border-white/10 hover:border-[#FE4A03]/70 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(254,74,3,0.25)] flex flex-col backdrop-blur-md"
    >
      {/* 16:9 Video Poster or Inline Player */}
      <div className="w-full aspect-video relative overflow-hidden bg-black flex items-center justify-center">
        {isPlayingInline && ytId ? (
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={project.title}
              className="w-full h-full border-0 z-30"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              className="absolute top-2 right-2 z-40 px-2.5 py-1 rounded-md bg-black/85 hover:bg-[#FE4A03] text-white text-[11px] font-mono flex items-center gap-1 border border-white/20 transition-all duration-200 shadow-xl cursor-pointer"
              title="Close video"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </button>
          </div>
        ) : (
          <>
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isHovered ? "scale-105 opacity-60" : "scale-100 opacity-90"
                }`}
                referrerPolicy="no-referrer"
              />
            )}

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90">
                {project.category}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FE4A03] text-black text-[10px] font-mono font-bold">
                PROMO
              </span>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-[#FE4A03] text-white flex items-center justify-center shadow-[0_0_25px_#FE4A03] transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-5 h-5 fill-white translate-x-0.5" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-1.5 bg-[#121214]/60 backdrop-blur-md flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-1">
            <span>{project.resolution}</span>
            <span className="text-[#FE4A03]">{isPlayingInline ? "PLAYING INLINE" : "WATCH HD"}</span>
          </div>

          <h4 className="text-base font-bold text-white group-hover:text-[#FE4A03] transition-colors duration-200 line-clamp-1">
            {project.title}
          </h4>

          <p className="text-white/60 text-xs line-clamp-1 mt-0.5">
            {project.subtitle}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-white/40 font-mono text-[10px]">YouTube 4K</span>
          <span className="text-[#FE4A03] font-semibold flex items-center gap-1 group-hover:underline">
            <span>{isPlayingInline ? "Stop Video" : "Play Video"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Sub-component: 9:16 Reel Card (Vertical Smartphone Aspect Ratio)
function ReelCard({
  project,
  idx,
  isHovered,
  isPlayingInline,
  onHover,
  onSelect
}: CardProps) {
  const ytId = getYouTubeId(project.videoUrl);
  const thumbnailUrl = ytId
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.03 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(project)}
      className="group relative rounded-xl sm:rounded-2xl bg-[#121214]/60 border border-white/10 hover:border-[#FE4A03] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(254,74,3,0.3)] flex flex-col backdrop-blur-md"
    >
      {/* 9:16 Vertical Video Poster Frame or Inline Player */}
      <div className="w-full aspect-[9/16] relative overflow-hidden bg-black flex items-center justify-center">
        {isPlayingInline && ytId ? (
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={project.title}
              className="w-full h-full border-0 z-30"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              className="absolute top-2 right-2 z-40 px-2 py-0.5 rounded-md bg-black/85 hover:bg-[#FE4A03] text-white text-[10px] font-mono flex items-center gap-1 border border-white/20 transition-all duration-200 shadow-xl cursor-pointer"
              title="Close reel"
            >
              <X className="w-3 h-3" />
              <span>Close</span>
            </button>
          </div>
        ) : (
          <>
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isHovered ? "scale-108 opacity-60" : "scale-100 opacity-90"
                }`}
                referrerPolicy="no-referrer"
              />
            )}

            {/* Gradient shadow for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/90">
                <Smartphone className="w-2.5 h-2.5 text-[#FE4A03]" />
                <span>REEL</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FE4A03] text-black text-[9px] font-mono font-bold">
                SHORT
              </span>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-11 h-11 rounded-full bg-[#FE4A03] text-white flex items-center justify-center shadow-[0_0_20px_#FE4A03] transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Content Inside Vertical Frame */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-20 pointer-events-none">
              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FE4A03] transition-colors duration-200 line-clamp-1">
                {project.title}
              </h4>
              <p className="text-white/60 text-[10px] line-clamp-1 mt-0.5 font-mono">
                {project.resolution}
              </p>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#FE4A03] font-semibold">
                <span>Play Reel</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
