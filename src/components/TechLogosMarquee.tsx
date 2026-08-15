import { motion } from "motion/react";
import { getOptimizedCloudinaryUrl } from "../lib/imageOptimization";

interface TechTool {
  name: string;
  category: string;
  icon: string;
}

const tools: TechTool[] = [
  {
    name: "Adobe Photoshop",
    category: "Design & Photo",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440701/Photoshop_bifxzw.png",
  },
  {
    name: "Adobe Illustrator",
    category: "Vector & Logos",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440701/Ai_tjk7aq.png",
  },
  {
    name: "Premiere Pro",
    category: "Video Editing",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440701/premerier_pro_maegsq.png",
  },
  {
    name: "After Effects",
    category: "Motion Graphics",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440701/after_effects_jyniyl.png",
  },
  {
    name: "Figma",
    category: "UI & Prototype",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440700/Figma_de4lfp.png",
  },
  {
    name: "Blender",
    category: "3D & VFX",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440701/blender_ccdgr5.png",
  },
  {
    name: "ChatGPT",
    category: "OpenAI Intelligence",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440701/chatgpt_b99832.png",
  },
  {
    name: "Claude",
    category: "Anthropic AI",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440702/claude_hqemhf.png",
  },
  {
    name: "Midjourney",
    category: "AI Concept Art",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440700/midjoury_tzeqpz.png",
  },
  {
    name: "Kling AI",
    category: "AI Video Generation",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440700/kling_ipnlz0.png",
  },
  {
    name: "Veo",
    category: "Google Generative AI",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440700/veo_xn5edk.png",
  },
  {
    name: "Runway",
    category: "Gen-2 / Gen-3 AI",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440701/runway_bgup8j.png",
  },
  {
    name: "Seedance",
    category: "AI Motion & Generation",
    icon: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786440700/seedance_l4riot.png",
  },
];

export default function TechLogosMarquee() {
  const marqueeTools = [...tools, ...tools];

  return (
    <section 
      id="tech-tools-section"
      className="w-full bg-transparent relative z-10 py-6 sm:py-16 overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(254,74,3,0.25) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {/* Header Bar Content */}
        <div className="w-full max-w-7xl mx-auto px-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FE4A03] animate-pulse shadow-[0_0_10px_#FE4A03]" />
            <h3 className="text-xs sm:text-sm font-bold tracking-widest text-white/60 uppercase">
              CREATIVE TOOLKIT & AI STACK
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-white/50 font-light max-w-md">
            Industry-standard software & state-of-the-art AI engines driving every piece of content.
          </p>
        </div>

        {/* Infinite Scrolling Ticker Track */}
        <div className="relative w-full overflow-hidden flex items-center py-4 select-none">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 32,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
            className="flex items-center gap-5 sm:gap-7 whitespace-nowrap w-max transform-gpu"
          >
            {marqueeTools.map((tool, idx) => (
              <div
                key={`${tool.name}-${idx}`}
                className="group flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-[#121212]/90 border border-white/10 hover:border-[#FE4A03] hover:bg-[#FE4A03]/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(254,74,3,0.35)] hover:-translate-y-1 cursor-pointer"
              >
                {/* Logo Container */}
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <img
                    src={getOptimizedCloudinaryUrl(tool.icon, {
                      width: 80,
                      height: 80,
                      crop: "fit",
                      quality: "auto:good",
                    })}
                    alt={tool.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Tool Title & Category */}
                <div className="flex flex-col text-left">
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#FE4A03] transition-colors duration-200 tracking-wide">
                    {tool.name}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/40 group-hover:text-white/80 transition-colors duration-200 font-light">
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
