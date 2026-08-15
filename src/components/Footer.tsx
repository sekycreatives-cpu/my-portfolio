import { MessageCircle, Instagram, Linkedin } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="footer"
      className="w-full bg-black text-white pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-10 px-6 sm:px-12 md:px-16 lg:px-20 relative z-10 overflow-hidden flex flex-col justify-between min-h-[400px] sm:min-h-[480px] md:min-h-[560px]"
    >
      {/* ================= DESKTOP: Flowing/Floating Animated Ambient Aura (No dividers, pure fluid float) ================= */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Soft flowing upward dissipation */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[680px] pointer-events-none opacity-85"
          style={{
            background: "radial-gradient(ellipse 130% 90% at 50% 100%, rgba(254,74,3,0.58) 0%, rgba(255,100,0,0.35) 30%, rgba(180,35,0,0.18) 60%, rgba(254,74,3,0.04) 80%, transparent 100%)",
          }}
        />

        {/* Floating Organic Glowing Orbs */}
        <div 
          className="absolute -bottom-24 left-[15%] w-[540px] h-[360px] rounded-full blur-[90px] animate-float-orb-1 opacity-70 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,80,0,0.65) 0%, rgba(254,74,3,0.25) 60%, transparent 80%)",
          }}
        />

        <div 
          className="absolute -bottom-28 right-[15%] w-[600px] h-[380px] rounded-full blur-[95px] animate-float-orb-2 opacity-65 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,120,0,0.6) 0%, rgba(254,74,3,0.3) 55%, transparent 80%)",
          }}
        />

        <div 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[720px] h-[320px] rounded-full blur-[85px] animate-float-orb-3 opacity-75 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 90%, rgba(255,60,0,0.7) 0%, rgba(254,74,3,0.35) 50%, transparent 80%)",
          }}
        />
      </div>

      {/* ================= MOBILE: Lightweight Static Ambient Glow (Glitch-free) ================= */}
      <div 
        className="block md:hidden absolute inset-x-0 bottom-0 h-[380px] pointer-events-none overflow-hidden z-0"
        style={{
          background: "radial-gradient(ellipse 110% 80% at 50% 100%, rgba(254,74,3,0.55) 0%, rgba(255,75,0,0.3) 35%, rgba(254,74,3,0.08) 70%, transparent 100%)",
        }}
      >
        <div
          className="absolute -bottom-10 left-0 w-3/4 h-[300px] pointer-events-none opacity-60"
          style={{
            background: "radial-gradient(circle at 20% 90%, rgba(255,59,0,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-10 right-0 w-3/4 h-[300px] pointer-events-none opacity-60"
          style={{
            background: "radial-gradient(circle at 80% 90%, rgba(254,74,3,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-[1920px] mx-auto relative z-10 flex flex-col justify-between flex-1">
        {/* Top Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-start">
          
          {/* Left Column: Navigation Links */}
          <nav className="flex flex-col gap-3.5 sm:gap-4.5 items-start">
            <button
              onClick={() => scrollTo("top")}
              className="text-[#E0E0E0] hover:text-white font-sans font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight transition-all duration-300 hover:translate-x-2.5 cursor-pointer text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("services-section")}
              className="text-[#E0E0E0] hover:text-white font-sans font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight transition-all duration-300 hover:translate-x-2.5 cursor-pointer text-left"
            >
              Projects
            </button>
            <a
              href="tel:+918056672234"
              className="text-[#E0E0E0] hover:text-white font-sans font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight transition-all duration-300 hover:translate-x-2.5 cursor-pointer text-left"
            >
              Contact me
            </a>
          </nav>

          {/* Right Column: Social Icons + Contact Details */}
          <div className="flex flex-col items-start md:items-end gap-5 sm:gap-6 text-left md:text-right">
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.link/m4f65b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/90 hover:text-white hover:bg-[#FE4A03] hover:border-[#FE4A03] transition-all duration-300 shadow-lg cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/seky_011?igsh=MTJ1Y3dndzFqYzV5Yw==&igsi=MTJ1Y3dndzFqYzV5Yw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/90 hover:text-white hover:bg-[#FE4A03] hover:border-[#FE4A03] transition-all duration-300 shadow-lg cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/gnana-sekar-305a542a9/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/90 hover:text-white hover:bg-[#FE4A03] hover:border-[#FE4A03] transition-all duration-300 shadow-lg cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            </div>

            {/* Contact Info Lines */}
            <div className="flex flex-col gap-2 text-base sm:text-lg text-neutral-300 font-sans tracking-wide mt-1">
              <p className="hover:text-white transition-colors">
                E-mail: <a href="mailto:sekycreatives@gmail.com" className="text-white hover:underline font-medium">sekycreatives@gmail.com</a>
              </p>
              <p className="hover:text-white transition-colors">
                Phone: <a href="tel:+918056672234" className="text-white hover:underline font-medium">+91 8056672234</a>
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Giant Brand Watermark Typography */}
        <div className="relative z-10 mt-8 sm:mt-14 md:mt-18 overflow-visible pointer-events-none select-none flex items-end justify-center">
          <h1 
            style={{
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              WebkitBackgroundClip: "text",
            }}
            className="font-sans font-bold text-[64px] xs:text-[90px] sm:text-[170px] md:text-[240px] lg:text-[320px] xl:text-[390px] 2xl:text-[450px] leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white/50 via-white/25 to-[#FE4A03]/80 transform translate-y-[38%] text-center whitespace-nowrap"
          >
            Sekar
          </h1>
        </div>
      </div>
    </footer>
  );
}
