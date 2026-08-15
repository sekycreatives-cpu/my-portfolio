import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function FullScreenCTA() {
  return (
    <section
      id="full-screen-cta"
      className="w-full bg-black text-white relative z-10 overflow-hidden flex flex-col justify-center px-4 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20 md:py-28 select-none"
    >
      {/* Main Content Wrapper - Left Aligned & Bigger Typography */}
      <div className="relative z-10 w-full max-w-7xl mx-auto text-left flex flex-col items-start gap-4 sm:gap-8">
        
        {/* Eyebrow / Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FE4A03]/15 border border-[#FE4A03]/40 backdrop-blur-md shadow-[0_0_20px_rgba(254,74,3,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FE4A03] animate-pulse" />
          <span className="text-[#FE4A03] font-sans font-bold text-xs sm:text-sm tracking-widest uppercase">
            Have an idea?
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-sans font-extrabold text-[2.75rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[105px] 2xl:text-[120px] tracking-tight leading-[0.98] sm:leading-[1.02] text-white"
        >
          Let's make it
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0EB] to-[#FE4A03]">
            impossible to ignore.
          </span>
        </motion.h2>

      </div>
    </section>
  );
}
