import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

// Subtle fade-in-up animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const iconFadeInVariant = {
  hidden: { opacity: 0, scale: 0.6, rotate: -25 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AboutStudioStatement() {
  return (
    <section 
      id="intro-section"
      className="w-full bg-transparent relative z-10 px-4 sm:px-10 md:px-16 lg:px-24 pt-8 sm:pt-20 md:pt-28 pb-4 sm:pb-8 md:pb-10 flex flex-col items-start overflow-hidden select-none"
    >
      {/* Strong Top Black Fade for seamless transition from hero section */}
      <div className="absolute inset-x-0 top-0 h-64 sm:h-96 md:h-[450px] bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none z-0" />

      {/* Background Subtle Orange Ambient Radial Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(254,74,3,0.25) 0%, rgba(254,74,3,0.03) 55%, transparent 75%)",
        }}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="w-full max-w-7xl mx-auto flex flex-col items-start relative z-10 gap-6 sm:gap-8"
      >
        
        {/* Eyebrow Tag: Orange Dot + INTRO */}
        <motion.div
          variants={fadeInUpVariant}
          className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#FE4A03] uppercase select-none w-full"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FE4A03] animate-pulse shadow-[0_0_10px_#FE4A03]" />
          <span>INTRO</span>
        </motion.div>

        {/* Statement Content Container - Left Aligned */}
        <div className="w-full flex flex-col items-start gap-6 sm:gap-8 text-left">
          
          {/* Main Statement Layout with Left Starburst + Display Text + Animated Gradient Pills */}
          <div className="relative w-full flex items-start justify-start gap-3 sm:gap-5 md:gap-6">
            
            {/* Orange Starburst / Sparkle Decorative Icon on Left */}
            <motion.div
              variants={iconFadeInVariant}
              className="shrink-0 mt-2 sm:mt-3 md:mt-4 text-[#FE4A03] drop-shadow-[0_0_25px_rgba(254,74,3,0.9)]"
            >
              <motion.svg 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </motion.svg>
            </motion.div>

            {/* Large Typographic Display Statement */}
            <motion.div
              variants={fadeInUpVariant}
              className="flex flex-col gap-8 w-full"
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[62px] font-bold tracking-tight leading-[1.25] sm:leading-[1.18] text-white">
                I'm a creative lead{" "}
                
                {/* ANIMATED GRADIENT MOTION PILL 1 */}
                <span className="inline-flex align-middle mx-1 sm:mx-2 -translate-y-0.5 sm:-translate-y-1.5">
                  <motion.span 
                    animate={{ 
                      boxShadow: [
                        "0 0 15px rgba(254,74,3,0.5)",
                        "0 0 35px rgba(254,74,3,0.9)",
                        "0 0 15px rgba(254,74,3,0.5)"
                      ],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative inline-flex items-center justify-center w-16 xs:w-20 sm:w-28 md:w-32 lg:w-36 h-7 xs:h-8 sm:h-11 md:h-13 rounded-full overflow-hidden border border-[#FE4A03] bg-black p-[1.5px]"
                  >
                    <span className="w-full h-full rounded-full bg-gradient-to-r from-[#900000] via-[#FE4A03] to-[#FF8A00] flex items-center justify-center relative overflow-hidden">
                      <motion.span
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                        className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 mix-blend-overlay"
                      />
                    </span>
                  </motion.span>
                </span>{" "}

                helping <span className="text-[#FE4A03]">businesses, organizations, and creators</span> transform ideas into{" "}

                {/* ANIMATED GRADIENT MOTION PILL 2 */}
                <span className="inline-flex align-middle mx-1 sm:mx-2 -translate-y-0.5 sm:-translate-y-1.5">
                  <motion.span 
                    animate={{ 
                      boxShadow: [
                        "0 0 15px rgba(255,122,0,0.5)",
                        "0 0 35px rgba(254,74,3,0.9)",
                        "0 0 15px rgba(255,122,0,0.5)"
                      ],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="relative inline-flex items-center justify-center w-14 xs:w-18 sm:w-24 md:w-28 lg:w-32 h-7 xs:h-8 sm:h-11 md:h-13 rounded-full overflow-hidden border border-[#FE4A03] bg-black p-[1.5px]"
                  >
                    <span className="w-full h-full rounded-full bg-gradient-to-r from-[#FF8A00] via-[#FE4A03] to-[#800000] flex items-center justify-center relative overflow-hidden">
                      <motion.span
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8, delay: 0.6 }}
                        className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 mix-blend-overlay"
                      />
                    </span>
                  </motion.span>
                </span>{" "}

                <span className="text-white/45 font-normal">compelling visual experiences</span>
              </h2>

              {/* Subtext and See My Work Button */}
              <motion.div 
                variants={fadeInUpVariant}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4 border-t border-white/10"
              >
                <p className="text-white/50 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
                  Whether it's a brand identity, campaign, commercial video, or AI-generated content, I transform concepts into engaging visual experiences.
                </p>

                <motion.a
                  href="#services-section"
                  whileHover={{ scale: 1.04, borderColor: "#FE4A03", color: "#FE4A03", boxShadow: "0 0 20px rgba(254,74,3,0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  className="shrink-0 border border-white/20 text-white text-sm font-medium py-3 px-7 rounded-full transition-all duration-300 flex items-center gap-2.5 cursor-pointer backdrop-blur-md group"
                >
                  <span>See my Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </motion.div>

            </motion.div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
