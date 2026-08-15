import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Gamepad2, 
  Utensils, 
  Cpu, 
  GraduationCap, 
  Building2, 
  ShoppingBag, 
  HeartPulse, 
  Calendar, 
  ArrowRight, 
  CheckCircle2,
  X,
  Compass
} from "lucide-react";

interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  deliverables: string[];
  description: string;
  color: string; // Accent color hex
  // Initial Spherical polar offset angles (lat, lon)
  lat: number; 
  lon: number;
}

const industryData: IndustryItem[] = [
  {
    id: "gaming",
    name: "Gaming",
    tagline: "Esports, Web3 & Immersive UI",
    icon: Gamepad2,
    deliverables: ["HUD & Game UI", "Twitch & Stream Packages", "Esports Branding", "Game Trailers"],
    description: "High-octane visual identity, HUD interfaces, stream motion design, and branding for gaming studios and esports organizations.",
    color: "#FE4A03",
    lat: -0.6,
    lon: 0.1,
  },
  {
    id: "technology",
    name: "Technology",
    tagline: "SaaS, AI & Hardware",
    icon: Cpu,
    deliverables: ["Design Systems", "AI Product Visuals", "Pitch Decks", "Product Motion"],
    description: "Sleek dark-mode design systems, futuristic product renderings, and investor decks for frontier tech startups.",
    color: "#3B82F6",
    lat: -0.2,
    lon: 1.2,
  },
  {
    id: "hospitality",
    name: "Hospitality",
    tagline: "Bespoke Dining & Hotels",
    icon: Utensils,
    deliverables: ["Menu Systems", "Interior Signage", "Brand Storytelling", "Social Content"],
    description: "Tactile, luxury brand identity and digital collateral for Michelin-starred restaurants and boutique hotel chains.",
    color: "#F59E0B",
    lat: -0.3,
    lon: -1.2,
  },
  {
    id: "education",
    name: "Education",
    tagline: "EdTech & Academies",
    icon: GraduationCap,
    deliverables: ["E-Learning Portals", "Course Materials", "Academy Rebranding", "Student Kits"],
    description: "Accessible, high-impact learning interface design, course branding, and interactive educational graphics.",
    color: "#10B981",
    lat: 0.2,
    lon: -2.1,
  },
  {
    id: "government",
    name: "Government",
    tagline: "Civic & Public Sector",
    icon: Building2,
    deliverables: ["Public Awareness Campaigns", "Accessible Portals", "Reports & Guidelines", "Civic Branding"],
    description: "Highly accessible, trustworthy public sector branding, educational infographics, and official digital portals.",
    color: "#8B5CF6",
    lat: 0.1,
    lon: 2.1,
  },
  {
    id: "retail",
    name: "Retail",
    tagline: "D2C & E-Commerce",
    icon: ShoppingBag,
    deliverables: ["Packaging Systems", "Storefront Identity", "Unboxing Design", "Ad Creatives"],
    description: "Conversion-focused retail branding, tactile packaging boxes, and high-converting D2C marketing assets.",
    color: "#EC4899",
    lat: 0.6,
    lon: -1.0,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    tagline: "MedTech & Wellness",
    icon: HeartPulse,
    deliverables: ["Patient Apps", "Medical Hardware UI", "Wellness Branding", "Clinical Decks"],
    description: "Clean, human-centric UI/UX and visual identities for medical tech, biotech firms, and wellness centers.",
    color: "#06B6D4",
    lat: 0.5,
    lon: 1.0,
  },
  {
    id: "events",
    name: "Events",
    tagline: "Conferences & Festivals",
    icon: Calendar,
    deliverables: ["Stage Screen Loops", "Keynote Graphics", "Festival Badges", "Promo Trailers"],
    description: "Immersive event graphics, stage motion visuals, LED screen animations, and event identity systems.",
    color: "#F97316",
    lat: 0.8,
    lon: 0.0,
  },
];

export default function IndustriesSphereSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0.15, y: 0.2 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);

  // Radius of the 3D sphere in pixels
  const [radius, setRadius] = useState(220);
  const sectionRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef<boolean>(true);

  // Adjust radius based on screen width
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(135);
      } else if (window.innerWidth < 1024) {
        setRadius(180);
      } else {
        setRadius(240);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius, { passive: true });
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Intersection observer to pause sphere rotation when offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth continuous rotation frame loop (only active when visible)
  useEffect(() => {
    let animFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      
      // Throttle update cadence on low-power devices (~30-60fps)
      if (isInViewRef.current && !isDragging && delta > 24) {
        lastTime = currentTime;
        setRotation((prev) => ({
          x: prev.x + 0.002,
          y: prev.y + 0.004,
        }));
      }
      
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId);
  }, [isDragging]);

  // Mouse drag handlers for rotating sphere manually
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setRotation((prev) => ({
      x: prev.x - dy * 0.005,
      y: prev.y + dx * 0.005,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;

    setRotation((prev) => ({
      x: prev.x - dy * 0.005,
      y: prev.y + dx * 0.005,
    }));

    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  // Compute 3D projected coordinates for each industry node
  const projectedNodes = industryData.map((item) => {
    // Spherical coordinates (x0, y0, z0)
    const x0 = radius * Math.cos(item.lat) * Math.sin(item.lon);
    const y0 = radius * Math.sin(item.lat);
    const z0 = radius * Math.cos(item.lat) * Math.cos(item.lon);

    // Rotate around Y axis
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);
    const x1 = x0 * cosY + z0 * sinY;
    const z1 = -x0 * sinY + z0 * cosY;

    // Rotate around X axis
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const y1 = y0 * cosX - z1 * sinX;
    const z2 = y0 * sinX + z1 * cosX;

    // Perspective factor
    const scale = (z2 + radius * 1.5) / (radius * 2.2);
    const opacity = Math.max(0.35, Math.min(1, (z2 + radius) / (radius * 1.8)));
    const zIndex = Math.round(z2 + radius);

    return {
      ...item,
      x: x1,
      y: y1,
      z: z2,
      scale,
      opacity,
      zIndex,
    };
  });

  return (
    <section
      ref={sectionRef}
      id="industries-section"
      className="w-full bg-black relative z-10 p-6 sm:p-10 md:p-16 lg:p-20 py-16 sm:py-24 flex flex-col items-center overflow-hidden select-none"
    >
      {/* Background Arch Radial Spotlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] pointer-events-none opacity-30 z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(254,74,3,0.2) 0%, rgba(254,74,3,0.04) 55%, transparent 75%)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6 relative z-10">
        


        {/* UNBOXED CLEAN 3D SPHERE CONTAINER */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing group"
        >
          {/* Spherical Concentric Orbital Rings */}
          <div className="absolute w-[320px] sm:w-[460px] md:w-[600px] h-[320px] sm:h-[460px] md:h-[600px] rounded-full border border-white/10 animate-[spin_40s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[240px] sm:w-[350px] md:w-[450px] h-[240px] sm:h-[350px] md:h-[450px] rounded-full border border-[#FE4A03]/20 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />

          {/* CORE CENTER NODE: ONE CREATIVE MINDSET */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Outer Pulsing Glow */}
            <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FE4A03]/30 filter blur-xl animate-pulse" />

            {/* Core Orb Badge */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#FE4A03] via-[#D03800] to-black p-[2px] shadow-[0_0_40px_rgba(254,74,3,0.6)]">
              <div className="w-full h-full rounded-full bg-[#0A0A0B] flex flex-col items-center justify-center p-2 text-center border border-white/20 backdrop-blur-md">
                <span className="text-[10px] sm:text-[11px] font-black text-white leading-tight uppercase tracking-wider drop-shadow-md">
                  ONE<br />
                  <span className="text-[#FE4A03]">CREATIVE</span><br />
                  MINDSET
                </span>
              </div>
            </div>
          </motion.div>

          {/* FLOATING INDUSTRY SPHERE NODES */}
          {projectedNodes.map((node) => {
            const Icon = node.icon;
            const isFront = node.z > 0;

            return (
              <motion.div
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndustry(node);
                }}
                style={{
                  transform: `translate3d(${node.x}px, ${node.y}px, 0px) scale(${node.scale})`,
                  opacity: node.opacity,
                  zIndex: node.zIndex,
                }}
                className="absolute transition-transform duration-75 ease-out cursor-pointer group/node"
              >
                <div
                  className={`flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl ${
                    isFront
                      ? "bg-[#121212]/90 border-white/20 hover:border-[#FE4A03] hover:bg-[#FE4A03]/20 hover:shadow-[0_0_30px_rgba(254,74,3,0.5)]"
                      : "bg-black/70 border-white/10 hover:border-white/30"
                  }`}
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border border-white/15 shadow-inner"
                    style={{ backgroundColor: `${node.color}25`, color: node.color }}
                  >
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>

                  <span className="text-xs sm:text-base font-bold text-white tracking-wide whitespace-nowrap group-hover/node:text-[#FE4A03] transition-colors">
                    {node.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CENTERED DRAG INSTRUCTION TAG BELOW SPHERE */}
        <div className="flex items-center justify-center -mt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-white/70 font-mono shadow-md">
            <Compass className="w-4 h-4 text-[#FE4A03]" />
            <span>Drag sphere to rotate • Click industry to inspect</span>
          </div>
        </div>

      </div>

      {/* LIGHTBOX MODAL FOR SELECTED INDUSTRY */}
      <AnimatePresence>
        {selectedIndustry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndustry(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#121212] border border-white/20 rounded-3xl p-6 sm:p-8 z-10 text-white shadow-2xl"
            >
              <button
                onClick={() => setSelectedIndustry(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-[#FE4A03] flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg"
                  style={{ backgroundColor: `${selectedIndustry.color}30`, color: selectedIndustry.color }}
                >
                  {React.createElement(selectedIndustry.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{selectedIndustry.name}</h3>
                  <p className="text-xs text-white/50 font-mono">{selectedIndustry.tagline}</p>
                </div>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                {selectedIndustry.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3 font-semibold">
                  Tailored Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedIndustry.deliverables.map((item, i) => (
                    <div
                      key={`ind-deliv-${i}-${item}`}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FE4A03] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/50 font-mono">Ready to elevate your {selectedIndustry.name} brand?</span>
                <a
                  href="#contact-section"
                  onClick={() => setSelectedIndustry(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FE4A03] hover:bg-[#D03800] text-white text-xs font-bold transition-all shadow-md"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
