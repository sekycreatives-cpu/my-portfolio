import { useState } from "react";
import { motion } from "motion/react";
import { Award, Users, Layers, Sparkles } from "lucide-react";

export default function KeyValueGlowCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const cards = [
    {
      id: "stat-card-1",
      tag: "01 // EXPERIENCE",
      sideVol: "8+ YEARS EXP",
      label: "8+ Years",
      subLabel: "Creative Direction",
      description: "Delivering creative solutions across branding, video production, motion graphics, AI creation, and digital campaigns.",
      icon: Award,
    },
    {
      id: "stat-card-2",
      tag: "02 // REACH",
      sideVol: "25+ GLOBAL CLIENTS",
      label: "25+ Clients",
      subLabel: "Global Partnerships",
      description: "Partnered with startups, businesses, government organizations, agencies, and international clients across diverse industries.",
      icon: Users,
    },
    {
      id: "stat-card-3",
      tag: "03 // DELIVERIES",
      sideVol: "150+ COMPLETED",
      label: "150+ Projects",
      subLabel: "Executed Assets",
      description: "Successfully delivered branding, commercials, social media campaigns, event visuals, product launches, and AI-powered content.",
      icon: Layers,
    },
    {
      id: "stat-card-4",
      tag: "04 // LEADERSHIP",
      sideVol: "CREATIVE LEAD",
      label: "Leadership",
      subLabel: "Team & Strategy",
      description: "Built and led a multidisciplinary creative team, managing projects from concept to execution while maintaining quality and consistency.",
      icon: Sparkles,
    },
  ];

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6 md:gap-8 w-full max-w-full min-w-0 box-border select-none"
      onMouseLeave={() => setHoveredIndex(0)}
    >
      {cards.map((card, index) => {
        const isHovered = hoveredIndex === index;
        const IconComponent = card.icon;

        return (
          <motion.div
            key={card.id}
            id={card.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => setHoveredIndex(index)}
            className={`relative rounded-[18px] sm:rounded-[26px] md:rounded-[32px] p-4 sm:p-6 md:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden w-full max-w-full min-w-0 box-border border-2 ${
              isHovered
                ? "bg-gradient-to-b from-[#140804] via-[#0D0502] to-[#050505] border-[#FE4A03] shadow-[0_0_35px_rgba(254,74,3,0.35),inset_0_0_25px_rgba(254,74,3,0.25)]"
                : "bg-gradient-to-b from-[#0C0B0E] to-[#040405] border-[#FE4A03]/30 hover:border-[#FE4A03]/70 shadow-[0_0_15px_rgba(254,74,3,0.1),inset_0_0_15px_rgba(254,74,3,0.08)]"
            }`}
          >
            {/* Ambient Background Radial Bloom */}
            <div 
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none rounded-[18px] sm:rounded-[26px] md:rounded-[32px] ${
                isHovered ? "opacity-100" : "opacity-40"
              }`}
              style={{
                background: isHovered
                  ? "radial-gradient(circle at 20% 20%, rgba(254,74,3,0.35) 0%, rgba(254,74,3,0.08) 50%, transparent 80%)"
                  : "radial-gradient(circle at 20% 20%, rgba(254,74,3,0.18) 0%, rgba(254,74,3,0.03) 50%, transparent 80%)",
              }}
            />

            {/* Glowing Inner Perimeter Frame Ring */}
            <div 
              className={`absolute inset-[2px] sm:inset-[3px] rounded-[16px] sm:rounded-[23px] md:rounded-[29px] border transition-all duration-500 pointer-events-none ${
                isHovered
                  ? "border-[#FE4A03]/60 shadow-[inset_0_0_20px_rgba(254,74,3,0.3)]"
                  : "border-[#FE4A03]/15 shadow-[inset_0_0_10px_rgba(254,74,3,0.06)]"
              }`}
            />

            {/* Continuous Pulse Glow Light */}
            <motion.div
              animate={{
                opacity: isHovered ? [0.6, 1, 0.6] : [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FE4A03] to-transparent pointer-events-none"
            />

            {/* Vertical Volume/Stat Marker along the left edge (Visible on larger screens) */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none z-10">
              <span 
                className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-500 whitespace-nowrap opacity-60 ${
                  isHovered ? "text-[#FE4A03]" : "text-white/40"
                }`}
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {card.sideVol}
              </span>
            </div>

            {/* Top Card Header */}
            <div className="relative z-10 flex items-center justify-between gap-2 pl-0 md:pl-5 w-full min-w-0">
              {/* Icon Container with Luminescent Ring */}
              <div 
                className={`p-2 sm:p-2.5 md:p-3.5 rounded-xl md:rounded-2xl border transition-all duration-500 shrink-0 ${
                  isHovered
                    ? "bg-[#FE4A03] border-white/30 text-white shadow-[0_0_20px_rgba(254,74,3,0.6)]"
                    : "bg-[#FE4A03]/15 border-[#FE4A03]/30 text-[#FE4A03]"
                }`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2]" />
              </div>

              {/* Tag Marker */}
              <span 
                className={`font-mono text-[9px] xs:text-[10px] sm:text-xs tracking-wider uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border transition-all duration-500 shrink-0 text-right whitespace-nowrap ${
                  isHovered
                    ? "bg-[#FE4A03]/20 border-[#FE4A03] text-white font-semibold shadow-[0_0_10px_rgba(254,74,3,0.3)]"
                    : "bg-white/5 border-white/10 text-neutral-400"
                }`}
              >
                {card.tag}
              </span>
            </div>

            {/* Card Content Description */}
            <div className="relative z-10 my-3 sm:my-5 md:my-6 pl-0 md:pl-5 pr-0 sm:pr-2 w-full min-w-0">
              <p 
                className={`text-xs sm:text-sm md:text-[15px] leading-relaxed break-words font-light transition-colors duration-500 ${
                  isHovered ? "text-white/95 font-normal" : "text-neutral-300/85"
                }`}
              >
                {card.description}
              </p>
            </div>

            {/* Card Footer: Stat Label & Glowing Indicator */}
            <div className="relative z-10 pt-3 sm:pt-4 border-t border-white/10 pl-0 md:pl-5 flex items-end justify-between gap-2 w-full min-w-0">
              <div className="min-w-0 flex-1 overflow-hidden">
                <span 
                  className={`text-[9px] xs:text-[10px] sm:text-xs font-mono uppercase tracking-widest block mb-0.5 transition-colors duration-500 truncate ${
                    isHovered ? "text-[#FE4A03]" : "text-neutral-500"
                  }`}
                >
                  {card.subLabel}
                </span>
                <h3 
                  className={`text-lg xs:text-xl sm:text-2xl font-sans font-bold tracking-tight transition-colors duration-500 truncate ${
                    isHovered ? "text-[#FFFFFF] drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" : "text-white/90"
                  }`}
                >
                  {card.label}
                </h3>
              </div>

              {/* Arrow Indicator with Glow */}
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                  isHovered
                    ? "bg-[#FE4A03] border-white/40 text-white shadow-[0_0_15px_rgba(254,74,3,0.8)]"
                    : "border-neutral-800 text-neutral-500"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
