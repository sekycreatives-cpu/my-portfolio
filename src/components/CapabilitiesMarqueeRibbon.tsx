import { useState } from "react";
import { motion } from "motion/react";

const capabilities = [
  "Web Design",
  "App Design",
  "Dashboard",
  "Wireframe",
  "Brand Identity",
  "Video Production",
  "AI Videos",
  "Motion Graphics",
  "3D Animation",
  "Creative Campaigns",
  "Explainer Videos",
  "UI/UX Design",
  "Visual Effects",
  "Art Direction",
  "AI Generated Content",
  "Packaging Design",
  "Visual Storytelling",
  "Event Visuals",
];

// Multi-spoke geometric Asterisk Star Icon matching the reference image
function AsteriskIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="2.5" x2="12" y2="21.5" />
      <line x1="2.5" y1="12" x2="21.5" y2="12" />
      <line x1="5.28" y1="5.28" x2="18.72" y2="18.72" />
      <line x1="18.72" y1="5.28" x2="5.28" y2="18.72" />
    </svg>
  );
}

export default function CapabilitiesMarqueeRibbon() {
  const [isHovered, setIsHovered] = useState(false);

  const repeatedCapabilities = [
    ...capabilities,
    ...capabilities,
  ];

  return (
    <div
      id="capabilities-ticker-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full relative z-20 overflow-hidden select-none bg-[#FE4A03] py-3.5 sm:py-5 border-0 outline-none cursor-default"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: isHovered ? 120 : 55,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
        className="flex items-center gap-8 sm:gap-14 whitespace-nowrap w-max transform-gpu"
      >
        {repeatedCapabilities.map((item, idx) => (
          <div
            key={`cap-${item}-${idx}`}
            className="flex items-center gap-8 sm:gap-14 transition-transform duration-300 hover:scale-105"
          >
            <span className="text-black font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight font-sans">
              {item}
            </span>
            <AsteriskIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
