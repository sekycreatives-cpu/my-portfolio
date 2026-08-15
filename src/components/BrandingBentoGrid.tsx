import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import CaseStudyModal from "./CaseStudyModal";
import { getOptimizedCloudinaryUrl } from "../lib/imageOptimization";

interface BrandingProject {
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
}

const brandingProjects: BrandingProject[] = [
  {
    id: "project-1",
    title: "Flynet Technologies",
    subtitle: "Technology Rebranding & Visual Identity",
    category: "Brand Identity",
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
    description: "I rebranded Flynet Technologies with a modern, future-focused visual identity. I redesigned the logo and developed a complete brand system including typography, colors, visual language, guidelines, and brand applications.",
    highlight: "⚡ FUTURISTIC TECHNOLOGY",
  },
  {
    id: "project-2",
    title: "Milar Brand Identity",
    subtitle: "Brand Guidelines & Visual System",
    category: "Brand Identity",
    year: "2025-2026",
    client: "Milar",
    image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786721231/Milar_banner_hcckde.jpg",
    gallery: [
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786721828/Milar_Logo_Brand_Guidelines_Updated_pages-to-jpg-0004_yqsxur.jpg",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786723290/Gallery_image_cdf1fc.png",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786721354/outdoor_advertising_billboard_mockup_copy_ezfddq.jpg",
    ],
    deliverables: [
      "Brand Identity & Logo",
      "Brand Guidelines System",
      "Typography & Color Palette",
      "Visual Identity Applications",
    ],
    description: "Developed a comprehensive brand identity and updated brand guidelines system for Milar, featuring precision logo construction, typography rules, color specifications, and visual applications.",
    highlight: "✨ BRAND GUIDELINES & IDENTITY",
  },
  {
    id: "project-3",
    title: "JOYNT Restaurant",
    subtitle: "Brand Identity & Restaurant Experience",
    category: "Food & Beverage",
    year: "2025",
    client: "JOYNT",
    image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785870642/Brand03_1.1_yxuvw2.png",
    gallery: [
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785909837/Brand03_7_smj7jm.png",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785871287/WhatsApp_Image_2026-08-05_at_12.12.55_AM_2_lpqtxg.jpg",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785870823/Brand03_2.1_sg0vhy.png",
    ],
    deliverables: ["Brand Identity", "Mascot Design", "Menu System", "Packaging & Marketing"],
    description: "Designed a complete visual identity for JOYNT, creating a playful and memorable fast-food brand that stands out across every customer touchpoint. The project included logo design, mascot development, menu systems, restaurant branding, packaging, promotional creatives, and marketing assets, delivering a cohesive identity from storefront to takeaway.",
    highlight: "🍔 Fast Food Brand Identity",
  },
  {
    id: "project-4",
    title: "Switch Esports Identity",
    subtitle: "Elite Gaming Brand & Merchandise System",
    category: "Brand Identity",
    year: "2025",
    client: "Switch Esports",
    image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785846217/Brand01_01_gq8k9g.png",
    gallery: [
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785858983/Brand01_04_uxobti.png",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785858027/Brand01_2_oayh4i.png",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785846220/Brand01_3_c2irra.png",
    ],
    deliverables: ["Brand Identity", "Jersey Design", "Social Media Assets", "Merchandise System"],
    description: "Designed a complete visual identity system for SWITCH Esports, including logo refinement, team jerseys, merchandise, social media creatives, and brand assets. The identity was built to establish a bold, competitive presence while maintaining consistency across digital and physical touchpoints.",
    highlight: "🏆 Tamil Nadu Esports",
  },
  {
    id: "project-5",
    title: "Robinson Homes Identity",
    subtitle: "Corporate Branding & Visual Identity System",
    category: "Architecture & Real Estate",
    year: "2023-2024",
    client: "Robinson Homes",
    image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786724030/Robinson_main_2_psjqgv.png",
    gallery: [
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785867490/Brand02_2_r9zk6i.png",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785867490/Brand02_4_sjfwfx.png",
      "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785867489/Brand02_3_hrazvp.png",
    ],
    deliverables: ["Brand Identity", "Stationery System", "Marketing Collateral", "Construction Signage"],
    description: "Designed a complete brand identity for Robinson Homes, creating a refined visual system that reflects trust, architectural excellence, and premium residential living. The project included logo development, stationery, marketing collateral, construction branding, and digital assets, ensuring a consistent brand presence across every customer touchpoint.",
    highlight: "🏡 Premium Residential Developer",
  },
];

const categories = ["All Cases", "Brand Identity", "Food & Beverage", "Architecture & Real Estate"] as const;

export default function BrandingBentoGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Cases");
  const [activeModalProject, setActiveModalProject] = useState<BrandingProject | null>(null);

  const filteredProjects = selectedCategory === "All Cases"
    ? brandingProjects
    : brandingProjects.filter((p) => p.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full mt-2 sm:mt-4 bg-[#0A0A0B]/50 border border-white/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-lg"
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
              BRANDING SHOWCASE GALLERY
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none font-sans">
            Crafting Identities.<br />
            <span className="text-white/40">Defining Cultures.</span>
          </h3>
          <p className="text-white/60 text-xs sm:text-sm md:text-base font-light tracking-wide mt-1 sm:mt-2">
            More brands. More ideas. Just the highlights here.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 mb-4 sm:pb-4 sm:mb-8 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = cat === "All Cases" 
            ? brandingProjects.length 
            : brandingProjects.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
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

      {/* GALLERY GRID - SINGLE ROW ON DESKTOP */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => setActiveModalProject(project)}
              className="group relative rounded-2xl bg-[#121212]/50 border border-white/10 hover:border-[#FE4A03]/80 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(254,74,3,0.25)] flex flex-col backdrop-blur-lg"
            >
              {/* Category Pill Tag */}
              <div className="absolute top-2.5 left-2.5 z-20 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-mono font-semibold text-white/90">
                {project.category}
              </div>

              {/* Clean Visual Image Container */}
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-neutral-950">
                <img
                  src={getOptimizedCloudinaryUrl(project.image, {
                    width: 650,
                    quality: "auto:good",
                    format: "auto",
                  })}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Fade Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
              </div>

              {/* Clean Footer Bar */}
              <div className="p-3.5 sm:p-4 flex items-center justify-between bg-[#121212]/50 backdrop-blur-lg">
                <div className="flex flex-col min-w-0 pr-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#FE4A03] transition-colors duration-300 truncate tracking-tight">
                    {project.title}
                  </h4>
                  <span className="text-white/50 text-[11px] font-light truncate mt-0.5">
                    {project.client} • {project.year}
                  </span>
                </div>

                {/* Minimal Arrow Icon */}
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#FE4A03] flex items-center justify-center text-white/70 group-hover:text-white transition-all duration-300 shrink-0 border border-white/10 group-hover:border-[#FE4A03]">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* FULL-SCREEN INTERACTIVE LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeModalProject && (
          <CaseStudyModal
            key={`branding-modal-${activeModalProject.id}`}
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
            overrideLayout="editorial"
            index={brandingProjects.findIndex((p) => p.id === activeModalProject.id)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
