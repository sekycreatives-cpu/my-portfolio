/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUp, Plus, Minus, Menu, X } from "lucide-react";
import BrandingBentoGrid from "./components/BrandingBentoGrid";
import VideoProductionBentoGrid from "./components/VideoProductionBentoGrid";
import SocialMediaBentoGrid from "./components/SocialMediaBentoGrid";
import AnimatedBackground from "./components/AnimatedBackground";
import KeyValueGlowCards from "./components/KeyValueGlowCards";
import RollingFooterItem from "./components/RollingFooterItem";
import ProcessSection from "./components/ProcessSection";
import FullScreenCTA from "./components/FullScreenCTA";
import Footer from "./components/Footer";
import TechLogosMarquee from "./components/TechLogosMarquee";
import AboutStudioStatement from "./components/AboutStudioStatement";
import ShowcaseMarqueeGridSection from "./components/ShowcaseMarqueeGridSection";
import CapabilitiesMarqueeRibbon from "./components/CapabilitiesMarqueeRibbon";
import Preloader from "./components/Preloader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openServices, setOpenServices] = useState<Record<string, boolean>>({
    "Branding": false,
    "Video Production": false,
    "Creative Campaigns": false,
  });

  const toggleService = (title: string) => {
    setOpenServices((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const navLinks = [
    { name: "Home", href: "#hero-section" },
    { name: "About", href: "#intro-section" },
    { name: "Why Me", href: "#stats-section" },
    { name: "Services", href: "#services-section" },
    { name: "Process", href: "#process-section" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past 400px (safely past the primary hero folds)
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image & Content Security Protection
  useEffect(() => {
    // Prevent right-click context menu on images, videos, and media containers
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "IMG" || target.tagName === "VIDEO" || target.closest("img") || target.closest("video") || target.closest(".group"))) {
        e.preventDefault();
      }
    };

    // Prevent dragging images or videos to new tabs, desktop, or address bar
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "IMG" || target.tagName === "VIDEO")) {
        e.preventDefault();
      }
    };

    // Prevent browser shortcuts like Ctrl+S / Cmd+S (Save page) or Ctrl+U / Cmd+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S" || e.key === "u" || e.key === "U")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mouseInWindow, setMouseInWindow] = useState(false);

  useEffect(() => {
    // Detect mobile or touch capability
    const isTouch = typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);
    setIsMobile(isTouch);

    if (isTouch) {
      // Completely bypass mouse cursor tracking on mobile to eliminate root component re-renders during touch scroll
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setMouseInWindow(true);
    };

    const handleMouseLeave = () => {
      setMouseInWindow(false);
    };

    const handleMouseEnter = () => {
      setMouseInWindow(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      // Interactive elements include buttons, links, inputs, cards, and elements with interactive properties
      const isInteractive = target.closest('button, a, [role="button"], input, select, textarea, .cursor-pointer, [data-hover-expand], p.pills, span.pills, .stat-card, [id^="stat-card-"]');
      setIsHoveringInteractive(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation configurations
  const serviceVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const bottomItems = [
    { 
      number: "#01", 
      label: "Branding",
      subItems: ["Branding", "Visual Identity", "Brand Strategy", "Design Systems"],
      delay: 0,
    },
    { 
      number: "#02", 
      label: "Video Production",
      subItems: ["Video Production", "Motion Graphics", "3D Animation", "Post-Production"],
      delay: 0.8,
    },
    { 
      number: "#03", 
      label: "Featured Work",
      subItems: ["Featured Work", "Flagship Rebrands", "Promo Videos", "Global Campaigns"],
      delay: 1.6,
    },
    { 
      number: "#04", 
      label: "Creative Campaigns",
      subItems: ["Creative Campaigns", "Marketing Creatives", "Digital Portfolios", "Engagement Posts"],
      delay: 2.4,
    },
  ];

  const services = [
    {
      number: "01.",
      title: "Branding",
      pills: [
        "Logo Design",
        "Brand Identity",
        "Rebranding",
        "Guidelines",
        "Packaging",
        "Stationery",
      ],
    },
    {
      number: "02.",
      title: "Video Production",
      pills: [
        "Concepts & Ideation",
        "Video Editing",
        "Promotional Ads",
        "Infographic Videos",
      ],
    },
    {
      number: "03.",
      title: "Creative Campaigns",
      pills: [
        "Digital Portfolios",
        "Marketing Creatives",
        "Engagement Posts",
        "Awareness & Print Media",
      ],
    },
  ];

  return (
    <div 
      id="app-container"
      className={`bg-black text-white select-none overflow-x-hidden flex flex-col font-sans relative ${!isMobile ? "cursor-none" : ""}`}
    >
      {/* Interactive Cinematic Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="site-preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Animated Ambient Orange Cloud Background */}
      <AnimatedBackground />
      {/* SECTION 1: HERO BANNER FOLD */}
      <motion.section 
        id="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20 relative bg-black z-10 snap-start snap-always overflow-hidden"
      >
        {/* Hero Background Image - Full High-Resolution Uncompressed Asset */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="https://res.cloudinary.com/eupac3wd/image/upload/v1786710737/2k_copy_igj9rp.jpg"
            alt="Hero Background"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Smooth Dark Black Gradient Overlay at 35% Opacity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/35 pointer-events-none" />
          {/* Bottom Black Fade to seamlessly transition into intro section */}
          <div className="absolute inset-x-0 bottom-0 h-64 sm:h-96 md:h-[500px] bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content Wrapper for Auto-Alignment across Monitor Sizes (position: relative, z-index: 5) */}
        <div className="w-full max-w-[1700px] mx-auto flex flex-col justify-between h-full flex-1 relative z-[5] gap-4 sm:gap-8">
          {/* Top Header */}
          <header 
            id="banner-header"
            className="w-full flex justify-between items-center relative z-20"
          >
            {/* Brand Logo */}
            <a
              id="brand-logo"
              href="#hero-section"
              className="text-xl sm:text-2xl font-bold tracking-tight cursor-pointer text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              MyPortfolio
            </a>

            {/* Right Nav Options & CTA */}
            <div id="header-nav" className="flex items-center gap-3 sm:gap-6 md:gap-10">
              <nav id="nav-links" className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
                {navLinks.map((link) => (
                  <a
                    id={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    key={link.name}
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 relative group py-1"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FE4A03] transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </nav>

              {/* Pill CTA Button */}
              <a
                id="cta-get-in-touch"
                href="#footer"
                className="bg-white text-black text-xs sm:text-sm font-semibold py-2 pl-3.5 pr-1.5 sm:py-2.5 sm:pl-5 sm:pr-2.5 rounded-full flex items-center gap-2 sm:gap-3 transition-all duration-300 group cursor-pointer hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="hidden xs:inline">Get in touch</span>
                <span className="xs:hidden">Contact</span>
                <div className="bg-black text-white rounded-full p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
              </a>

              {/* Mobile Menu Hamburger Button */}
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#FE4A03] hover:border-[#FE4A03] transition-all duration-300 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </header>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="md:hidden absolute top-20 left-0 right-0 z-50 bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(254,74,3,0.25)] flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={`mobile-${link.name}`}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-semibold text-white/90 hover:text-[#FE4A03] hover:bg-white/5 py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#FE4A03]" />
                    </a>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <span>Portfolio 2026</span>
                  <span className="text-[#FE4A03] font-mono">Available for projects</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Hero Grid */}
          <motion.main 
            id="banner-main"
            initial="hidden"
            animate="visible"
            variants={heroContainerVariants}
            className="w-full flex-1 flex flex-col justify-between lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-center py-2 sm:py-8 lg:py-20 relative z-10 my-auto"
          >
            {/* Left Side: Leading Creativity from Concept to Completion (Desktop) / Visualize. Create. Deliver. (Mobile) */}
            <div id="hero-left-section" className="col-span-12 lg:col-span-8 flex flex-col justify-center my-auto lg:my-0 pt-4 sm:pt-0">
              {/* Desktop / Tablet Title */}
              <h1 
                id="hero-title"
                className="hidden sm:flex text-5xl md:text-6xl lg:text-[72px] xl:text-[84px] font-bold tracking-tighter leading-[1.08] flex-col gap-1 sm:gap-2 text-white max-w-none"
              >
                <motion.span variants={heroItemVariants} className="block whitespace-nowrap">Leading Creativity</motion.span>
                <motion.span variants={heroItemVariants} className="block whitespace-nowrap">from Concept</motion.span>
                <motion.span variants={heroItemVariants} className="block whitespace-nowrap">to Completion</motion.span>
              </h1>

              {/* Mobile Title: Visualize. Create. Deliver. */}
              <h1 
                id="hero-title-mobile"
                className="sm:hidden text-[32px] xs:text-[36px] font-extrabold tracking-tight leading-[1.1] flex flex-col gap-1 text-white max-w-none"
              >
                <motion.span variants={heroItemVariants} className="block">Visualize.</motion.span>
                <motion.span variants={heroItemVariants} className="block">Create.</motion.span>
                <motion.span variants={heroItemVariants} className="block">Deliver.</motion.span>
              </h1>
            </div>

            {/* Right Side: I help businesses transform ideas... & CTA Buttons */}
            <div id="hero-right-section" className="col-span-12 lg:col-span-4 flex flex-col justify-end lg:justify-center lg:pl-6 pb-2 sm:pb-4 lg:pb-0 mt-auto lg:mt-0">
              <div className="max-w-xl lg:ml-auto flex flex-col gap-4 sm:gap-8">
                <motion.p 
                  id="hero-right-description"
                  variants={heroItemVariants}
                  className="hidden sm:block text-white/80 text-sm sm:text-lg md:text-[19px] leading-relaxed font-light"
                >
                  Every project begins with an idea. I shape it into a cohesive visual experience through strategy, design, motion, and emerging AI technologies—from concept to final delivery.
                </motion.p>

                {/* Interactive CTA Buttons */}
                <motion.div 
                  id="hero-ctas"
                  variants={heroItemVariants}
                  className="flex flex-wrap gap-2.5 sm:gap-4 items-center"
                >
                  {/* Primary CTA */}
                  <a
                    id="primary-cta-view-work"
                    href="#services-section"
                    className="bg-white text-black text-xs sm:text-base font-semibold px-4.5 py-2.5 sm:px-6 sm:py-3.5 rounded-full flex items-center gap-2 sm:gap-2.5 transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>View My Work</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                  </a>

                  {/* Secondary CTA */}
                  <a
                    id="secondary-cta-build"
                    href="#footer"
                    className="border border-white/20 text-white text-xs sm:text-base font-medium px-4.5 py-2.5 sm:px-6 sm:py-3.5 rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Let's Build Something
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.main>

          {/* Bottom Features Footer */}
          <footer 
            id="banner-footer"
            className="w-full border-t border-white/15 pt-6 sm:pt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10"
          >
            {bottomItems.map((item, index) => (
              <RollingFooterItem
                key={item.number}
                item={item}
                index={index}
              />
            ))}
          </footer>
        </div>
      </motion.section>

      {/* SECTION 1.5: INTRO STATEMENT SECTION */}
      <AboutStudioStatement />

      {/* TECH & AI LOGOS MARQUEE (CREATIVE TOOLKIT) */}
      <TechLogosMarquee />

      {/* SECTION 1.6: WHY WORK WITH ME (STATS & VALUES SECTION) */}
      <section 
        id="stats-section"
        className="w-full max-w-full bg-transparent relative z-10 px-4 sm:px-10 md:px-16 lg:px-20 pt-4 sm:pt-10 md:pt-12 pb-8 sm:pb-28 md:pb-36 flex flex-col gap-6 sm:gap-10 overflow-hidden box-border"
      >
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-12 min-w-0"
        >
          
          {/* Deck Header: Key Value matching Creative Toolkit Dot Style */}
          <div className="flex items-center gap-3 border-b border-neutral-900 pb-6 w-full min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FE4A03] animate-pulse shadow-[0_0_10px_#FE4A03]" />
            <h3 className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white/60 uppercase">
              KEY VALUE
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-4 w-full max-w-full min-w-0">
            
            {/* Left Side: Large Title & Description */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between h-full w-full min-w-0 max-w-full">
              <div className="flex flex-col gap-4 sm:gap-6 w-full min-w-0">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-sans text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-none break-words"
                >
                  Why Work<br />
                  <span className="text-[#FE4A03] drop-shadow-[0_0_25px_rgba(254,74,3,0.4)]">With Me</span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-neutral-400 text-xs sm:text-base lg:text-lg max-w-md leading-relaxed font-light mt-1 sm:mt-4"
                >
                  Combining creativity, leadership, and technology to deliver impactful visual experiences across every project.
                </motion.p>
              </div>
            </div>

            {/* Right Side: Interactive 2x2 Luminescent Glow Grid */}
            <div className="col-span-12 lg:col-span-7 w-full max-w-full min-w-0">
              <KeyValueGlowCards />
            </div>

          </div>
        </motion.div>
      </section>

      {/* CONTINUOUS MULTI-ROW MARQUEE WALL SHOWCASE */}
      <ShowcaseMarqueeGridSection />

      {/* SECTION 2: SERVICES SECTION (RECREATED FROM REFERENCE IMAGE) */}
      <section 
        id="services-section"
        className="w-full bg-transparent relative z-10 px-4 sm:px-10 md:px-16 lg:px-20 pt-6 sm:pt-10 md:pt-12 pb-4 sm:pb-6 flex flex-col"
      >
        <div className="w-full max-w-[1700px] mx-auto flex flex-col gap-10 sm:gap-16 md:gap-20">
          {services.map((service, index) => {
            return (
              <motion.div
                id={`service-row-${index + 1}`}
                key={service.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={serviceVariants}
                className="w-full pb-12 md:pb-16 relative flex flex-col gap-6 md:gap-8 group transition-all duration-300 ease-out scroll-mt-12"
              >
                {/* Number and Title Flex Row */}
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6 transition-transform duration-500 ease-out group-hover:translate-x-4">
                  <div 
                    className="flex flex-wrap sm:flex-nowrap items-baseline gap-3 sm:gap-8 md:gap-12 lg:gap-16 cursor-pointer select-none"
                    onClick={() => toggleService(service.title)}
                  >
                    {/* Vibrant Orange Number */}
                    <span 
                      id={`service-num-${index + 1}`}
                      className="text-[#FE4A03] font-bold text-4xl sm:text-6xl md:text-8xl lg:text-[96px] xl:text-[112px] tracking-tighter leading-none select-none flex-shrink-0"
                    >
                      {service.number}
                    </span>

                    {/* Muted Grey Title - lights up when parent is hovered */}
                    <h2 
                      id={`service-title-${index + 1}`}
                      className="font-bold text-3xl sm:text-6xl md:text-8xl lg:text-[96px] xl:text-[112px] tracking-tighter leading-none cursor-pointer text-[#8C8C8C] group-hover:text-white transition-colors duration-500 break-words sm:break-normal"
                    >
                      {service.title}
                    </h2>
                  </div>

                  {/* Plus / Minus Expand Button aligned with the title */}
                  <motion.button
                    id={`service-${index + 1}-toggle-btn`}
                    onClick={() => toggleService(service.title)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`shrink-0 self-start md:self-center flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                      openServices[service.title]
                        ? "bg-[#FE4A03] text-white border-[#FE4A03] shadow-[0_0_20px_rgba(254,74,3,0.4)]"
                        : "bg-[#1C1C1E] text-[#8E8E93] border-[#2C2C2E] hover:border-[#FE4A03] hover:text-white hover:bg-[#FE4A03]/20"
                    }`}
                  >
                    {openServices[service.title] ? (
                      <>
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        <span>Hide Showcase</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FE4A03]" />
                        <span>Show Showcase</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Clean looking sub-headings directly below */}
                <div className="flex items-center gap-4 pl-0 sm:pl-[110px] md:pl-[170px] lg:pl-[210px] xl:pl-[240px] transition-transform duration-500 ease-out group-hover:translate-x-4">
                  <div 
                    id={`service-${index + 1}-pills-container`}
                    className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 max-w-full py-1 overflow-x-auto no-scrollbar"
                  >
                    {service.pills.map((pill, pillIdx) => (
                      <motion.span
                        id={`service-${index + 1}-pill-${pillIdx + 1}`}
                        key={`srv-${service.number}-pill-${pillIdx}-${pill}`}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="border border-[#2C2C2E]/60 bg-[#1C1C1E]/30 text-[#8E8E93] hover:text-[#FE4A03] hover:border-[#FE4A03] transition-all duration-300 text-xs sm:text-sm font-normal py-1.5 px-3.5 sm:py-2 sm:px-5 rounded-full select-none tracking-normal cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <span>{pill}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Bento Grid Showcase Section */}
                <AnimatePresence>
                  {openServices[service.title] && (
                    <motion.div
                      key={`bento-wrapper-${service.number}-${service.title}`}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex justify-center px-0 overflow-hidden"
                    >
                      <div className="w-full max-w-[1700px] mx-auto">
                        {service.title === "Branding" && <BrandingBentoGrid />}
                        {service.title === "Video Production" && <VideoProductionBentoGrid />}
                        {service.title === "Creative Campaigns" && <SocialMediaBentoGrid />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Divider Line with Dots at both Left and Right Ends */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-900/60 flex items-center">
                  {/* Left End Dot */}
                  <div className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-[#48484A] z-10" />
                  {/* Divider Line */}
                  <div className="w-full h-full bg-[#1C1C1E]" />
                  {/* Right End Dot */}
                  <div className="absolute -right-1 w-1.5 h-1.5 rounded-full bg-[#48484A] z-10" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CONTINUOUS CAPABILITIES MARQUEE RIBBON (WHAT I DO) */}
      <CapabilitiesMarqueeRibbon />

      {/* SECTION 3: PROCESS SECTION (WORKFLOW) */}
      <ProcessSection />

      {/* FULL-SCREEN CTA SECTION */}
      <FullScreenCTA />

      {/* FOOTER SECTION */}
      <Footer />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="back-to-top-button"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "#FE4A03",
              borderColor: "#FE4A03",
              boxShadow: "0 10px 25px rgba(254, 74, 3, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1C1C1E] border border-neutral-800 text-white flex items-center justify-center cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-300"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Custom Circular Cursor */}
      {!isMobile && mouseInWindow && (
        <>
          {/* Smooth lagging outer ring */}
          <motion.div
            id="custom-cursor-outer"
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#FE4A03]/60 pointer-events-none z-[9999] mix-blend-screen"
            animate={{
              x: mousePos.x - 16,
              y: mousePos.y - 16,
              scale: isHoveringInteractive ? (isClicked ? 1.6 : 2.0) : (isClicked ? 0.8 : 1),
              backgroundColor: isHoveringInteractive ? "rgba(254, 74, 3, 0.15)" : "rgba(254, 74, 3, 0)",
              borderColor: isHoveringInteractive ? "#FE4A03" : "rgba(254, 74, 3, 0.6)",
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 24,
              mass: 0.6
            }}
          />
          {/* Quick-responding core dot */}
          <motion.div
            id="custom-cursor-inner"
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FE4A03] pointer-events-none z-[9999]"
            animate={{
              x: mousePos.x - 4,
              y: mousePos.y - 4,
              scale: isHoveringInteractive ? (isClicked ? 0.5 : 1.2) : (isClicked ? 0.7 : 1),
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 35
            }}
          />
        </>
      )}
    </div>
  );
}
