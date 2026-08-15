import { ElementType } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  BookOpen, 
  Target, 
  Palette, 
  Cpu, 
  Rocket, 
  ArrowRight
} from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ElementType;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "Exploration & Vision",
    description: "Uncovering core brand objectives, target audience insights, and project vision.",
    icon: Search,
  },
  {
    number: "02",
    title: "RESEARCH",
    subtitle: "Insights & Benchmarks",
    description: "Analyzing market trends, visual references, and creative directions.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "STRATEGY",
    subtitle: "Roadmap & Direction",
    description: "Mapping out a clear creative strategy, positioning, and storytelling framework.",
    icon: Target,
  },
  {
    number: "04",
    title: "DESIGN",
    subtitle: "Aesthetics & Systems",
    description: "Crafting bold visual identities, high-fidelity layouts, and brand systems.",
    icon: Palette,
  },
  {
    number: "05",
    title: "PRODUCTION",
    subtitle: "Execution & AI",
    description: "Bringing concepts to life through 3D motion, video, and AI generation.",
    icon: Cpu,
  },
  {
    number: "06",
    title: "DELIVERY",
    subtitle: "Launch & Assets",
    description: "Exporting pixel-perfect final assets and launching cohesive brand experiences.",
    icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process-section"
      className="w-full bg-black relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 flex flex-col items-center gap-4 sm:gap-6 overflow-hidden"
    >
      {/* Top Ambient Arch Spotlight Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[220px] pointer-events-none opacity-30 z-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(254,74,3,0.35) 0%, rgba(254,74,3,0.05) 50%, transparent 80%)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 relative z-10">
        {/* Header Section - Workflow Framework Badge */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FE4A03]/10 border border-[#FE4A03]/30 text-xs font-mono font-medium text-[#FE4A03] tracking-widest uppercase mb-1 shadow-[0_0_12px_rgba(254,74,3,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#FE4A03] animate-pulse shadow-[0_0_8px_#FE4A03]" />
            Workflow Framework
          </motion.div>
        </div>

        {/* Infographic Process Container */}
        <div className="relative w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 lg:gap-2.5 relative z-10 items-stretch">
            {steps.map((step, index) => {
              const StepIcon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -4,
                    zIndex: 20,
                    transition: { duration: 0.18, ease: "easeOut" },
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex flex-col items-center text-center p-3 sm:p-4 lg:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#180b05]/90 via-[#0e0503]/85 to-[#050201]/95 backdrop-blur-xl border border-[#FE4A03]/25 hover:border-[#FE4A03] transition-all duration-200 hover:shadow-[0_8px_25px_rgba(254,74,3,0.3)] overflow-hidden cursor-pointer h-full justify-between"
                >
                  {/* Light Sheen Sweep Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                  {/* Top Ambient Card Glow Reflection */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-12 rounded-full bg-[#FE4A03]/15 blur-lg group-hover:bg-[#FE4A03]/40 transition-all duration-300 pointer-events-none" />

                  {/* Top Gloss Highlight Line */}
                  <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-[#FE4A03]/40 to-transparent group-hover:via-[#FE4A03] transition-all duration-300" />

                  {/* Top Header: Step Number & Icon */}
                  <div className="relative flex flex-col items-center gap-1.5 pt-1 w-full">
                    <div className="flex items-center justify-between w-full px-0.5">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#FE4A03] px-1.5 py-0.5 rounded bg-[#FE4A03]/10 border border-[#FE4A03]/20">
                        {step.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FE4A03]/40 group-hover:bg-[#FE4A03] transition-colors" />
                    </div>

                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-[#FE4A03]/20 to-black/90 border border-[#FE4A03]/40 group-hover:border-[#FE4A03] flex items-center justify-center shadow-[0_0_12px_rgba(254,74,3,0.2)] group-hover:shadow-[0_0_20px_rgba(254,74,3,0.6)] group-hover:scale-105 transition-all duration-200 my-1">
                      <StepIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FE4A03] group-hover:text-white transition-colors duration-200" />
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="flex flex-col items-center gap-1 w-full my-1.5 flex-1 justify-start">
                    <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-[#FE4A03] transition-colors duration-200 uppercase truncate w-full">
                      {step.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-medium text-[#FE4A03]/80 group-hover:text-white transition-colors duration-200 truncate w-full">
                      {step.subtitle}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-white/50 group-hover:text-white/80 transition-colors duration-200 font-light leading-tight sm:leading-snug pt-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Desktop Step Link Indicator */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-[#FE4A03] z-20 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                      <ArrowRight className="w-3 h-3 drop-shadow-[0_0_4px_#FE4A03]" />
                    </div>
                  )}

                  {/* Subtle Bottom Glow Accent */}
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#FE4A03]/20 to-transparent group-hover:via-[#FE4A03]/60 transition-all duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
