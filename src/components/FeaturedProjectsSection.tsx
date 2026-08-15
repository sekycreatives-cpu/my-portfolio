import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sparkles, Layers, Eye, Star, Filter, ChevronRight } from "lucide-react";
import CaseStudyModal, { CaseStudyProject } from "./CaseStudyModal";
import { getOptimizedCloudinaryUrl } from "../lib/imageOptimization";

export const FEATURED_PROJECTS: CaseStudyProject[] = [
  {
    id: "featured-1",
    title: "Flynet Technologies",
    subtitle: "Technology Rebranding & Visual Identity",
    category: "Branding",
    year: "2026",
    client: "Flynet Technologies",
    image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786220085/Flynet_Rebrand_copy_2_gqevmw.jpg",
    gallery: [
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786220085/Flynet_Rebrand_copy_4_nei34u.jpg",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786220086/Flynet_Rebrand_copy_6_qctizo.jpg",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786220140/Flynet_Rebrand_copy_7_qsyv4v.jpg",
    ],
    deliverables: [
      "Logo Rebranding",
      "Visual Identity System",
      "Typography & Color System",
      "Brand Guidelines",
    ],
    description: "Rebranded Flynet Technologies with a modern, future-focused visual identity. Redesigned logo and developed a complete brand system including typography, colors, visual language, guidelines, and brand applications.",
    highlight: "⚡ FLAGSHIP REBRAND 2026",
    layoutType: "cyber",
  },
  {
    id: "featured-2",
    title: "Aura Luxe Cosmetics",
    subtitle: "Sustainable Packaging & Monogram System",
    category: "Branding",
    year: "2026",
    client: "Aura Paris",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80",
    ],
    deliverables: ["Gold Foil Packaging", "Visual Identity System", "Minimalist Monogram", "Storefront Guidelines"],
    description: "Tactile luxury brand redesign featuring frosted glass bottles, embossed warm foil lettering, and organic geometric typography.",
    highlight: "✨ LUXURY BRANDING",
    layoutType: "editorial",
  },
  {
    id: "featured-3",
    title: "HyperDrive Electric Hypercar",
    subtitle: "4K Commercial & Motion Art Direction",
    category: "Video Production",
    year: "2026",
    client: "HyperDrive Motors",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    ],
    deliverables: ["4K Commercial Reel", "Motion Sound Design", "3D CGI Rendering", "Social Cutdowns"],
    description: "High-octane commercial launch highlighting aerodynamic body curves with real-time ray-traced neon light reflections.",
    highlight: "🎬 CINEMATIC REEL",
    layoutType: "cinematic",
  },
  {
    id: "featured-4",
    title: "NeoTokio Cyberpunk Campaign",
    subtitle: "Global Immersive Experience & 3D Billboard",
    category: "Campaigns",
    year: "2025",
    client: "Bandai Namco / CyberArts",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
    ],
    deliverables: ["3D Anamorphic Billboard", "Interactive Web Portal", "Key Art & Posters", "Merchandise Line"],
    description: "Full-scale marketing launch campaign spanning Shibuya 3D billboards, interactive web portals, and limited-edition holographic merchandise.",
    highlight: "🔥 GLOBAL CAMPAIGN",
    layoutType: "cyber",
  },
  {
    id: "featured-5",
    title: "Zenith Audio Systems",
    subtitle: "Acoustic Hardware Brand Identity & Packaging",
    category: "Branding",
    year: "2025",
    client: "Zenith Sound Labs",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    ],
    deliverables: ["Brand Identity", "Hardware Industrial Branding", "Unboxing Packaging", "Retail Display Kit"],
    description: "Minimalist acoustic identity emphasizing raw aluminum textures, tactile debossed typography, and soundwave-inspired graphic motifs.",
    highlight: "🎧 INDUSTRIAL DESIGN",
    layoutType: "minimal",
  },
];

const CATEGORIES = ["All", "Branding", "Video Production", "Campaigns"];

export default function FeaturedProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState<CaseStudyProject | null>(null);

  const filteredProjects = FEATURED_PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <section
      id="featured-projects-section"
      className="w-full bg-black relative z-10 px-4 sm:px-10 md:px-16 lg:px-20 py-20 sm:py-32 flex flex-col snap-start overflow-hidden"
    >
      {/* Ambient Radial Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FE4A03]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1700px] mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b border-neutral-800/80 pb-8 sm:pb-12">
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FE4A03]/10 border border-[#FE4A03]/30 text-[#FE4A03] text-xs font-semibold uppercase tracking-widest self-start"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Showcase</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tighter leading-none text-white"
            >
              Featured <span className="text-[#FE4A03] italic font-serif font-normal">Projects</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-400 text-sm sm:text-base max-w-xl font-light leading-relaxed mt-1"
            >
              A curated selection of flagship client projects combining strategic identity, high-fidelity motion graphics, and full-spectrum brand design.
            </motion.p>
          </div>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-2 bg-[#121214] p-1.5 rounded-full border border-neutral-800 self-start md:self-end"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={`filter-${cat}`}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFeaturedFilter"
                      className="absolute inset-0 bg-[#FE4A03] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* BENTO / CARDS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`featured-grid-${activeFilter}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8"
          >
            {filteredProjects.map((project, idx) => {
              // Highlight first project as a large Hero Card if showing "All" or if it's Flynet
              const isHeroCard = idx === 0 && activeFilter === "All";
              const colSpan = isHeroCard
                ? "md:col-span-12 lg:col-span-8"
                : idx === 1 && activeFilter === "All"
                ? "md:col-span-12 lg:col-span-4"
                : "md:col-span-6 lg:col-span-4";

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveModalProject(project)}
                  className={`group relative bg-[#0D0D0F] border border-neutral-800/80 hover:border-[#FE4A03]/60 rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(254,74,3,0.2)] ${colSpan} ${
                    isHeroCard ? "min-h-[460px] sm:min-h-[540px]" : "min-h-[420px]"
                  }`}
                >
                  {/* Card Background Image with Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={getOptimizedCloudinaryUrl(project.image, { width: 750, quality: "auto:good" })}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:via-black/50 transition-colors duration-500" />
                  </div>

                  {/* Card Top Bar */}
                  <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between gap-4">
                    {/* Badge */}
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FE4A03] animate-pulse" />
                      {project.highlight}
                    </span>

                    {/* Arrow Action Icon */}
                    <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FE4A03] group-hover:border-[#FE4A03] group-hover:rotate-45 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Bottom Details */}
                  <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4 bg-gradient-to-t from-black via-black/90 to-transparent pt-16">
                    <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium">
                      <span className="text-[#FE4A03] font-semibold">{project.client}</span>
                      <span>•</span>
                      <span>{project.category}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className={`font-bold tracking-tight text-white group-hover:text-[#FE4A03] transition-colors duration-300 ${
                      isHeroCard ? "text-2xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-2xl"
                    }`}>
                      {project.title}
                    </h3>

                    <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Deliverable Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.deliverables.slice(0, 3).map((item, dIdx) => (
                        <span
                          key={`deliv-${project.id}-${dIdx}`}
                          className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-[11px] text-neutral-300 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                      {project.deliverables.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-neutral-400 font-medium">
                          +{project.deliverables.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Banner Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-gradient-to-r from-[#121214] via-[#1A1A1E] to-[#121214] border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FE4A03]/20 border border-[#FE4A03]/40 flex items-center justify-center text-[#FE4A03] shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">Have a vision for your next project?</h4>
              <p className="text-neutral-400 text-xs sm:text-sm font-light">Let's craft an extraordinary brand experience together.</p>
            </div>
          </div>

          <a
            href="#footer"
            className="px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0"
          >
            <span>Start a Project</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>

      {/* CASE STUDY MODAL LIGHTBOX */}
      {activeModalProject && (
        <CaseStudyModal
          key={`featured-modal-${activeModalProject.id}`}
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          overrideLayout={activeModalProject.layoutType}
        />
      )}
    </section>
  );
}
