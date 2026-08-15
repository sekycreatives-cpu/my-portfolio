import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Only run canvas particles on desktop / tablet to keep mobile scroll 120fps buttery smooth
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Micro ember & dust particles - scaled for performance
    const PARTICLE_COUNT = 45;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vy: number;
      vx: number;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
      color: string;
    }> = [];

    const colors = ["#FE4A03", "#FF6D33", "#FFA066", "#FFC299", "#E63900"];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.5 + 0.1,
        maxAlpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.01 + 0.004,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time + p.y * 0.008) * 0.25;
        p.y += p.vy;
        p.alpha += p.pulseSpeed;

        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMobile]);

  return (
    <div 
      id="animated-background-wrapper" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black transform-gpu"
    >
      {/* Mobile-optimized pure radial background gradients (zero GPU blur filters, zero jitter) */}
      {isMobile ? (
        <>
          <div
            className="absolute top-0 right-0 w-[320px] h-[320px] pointer-events-none opacity-60"
            style={{
              background: "radial-gradient(circle at 80% 20%, rgba(254, 74, 3, 0.3) 0%, rgba(254, 74, 3, 0.08) 45%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-10 left-0 w-[300px] h-[300px] pointer-events-none opacity-50"
            style={{
              background: "radial-gradient(circle at 20% 80%, rgba(254, 74, 3, 0.25) 0%, rgba(254, 74, 3, 0.06) 45%, transparent 70%)",
            }}
          />
        </>
      ) : (
        <>
          {/* Desktop Flare 1: Top-Right Luminous Warm Orb */}
          <motion.div
            animate={{
              x: [0, -35, 20, 0],
              y: [0, 30, -20, 0],
              scale: [1, 1.1, 0.95, 1],
              opacity: [0.6, 0.85, 0.55, 0.6],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-16 -right-16 w-[650px] h-[650px] rounded-full pointer-events-none transform-gpu"
            style={{
              background: "radial-gradient(circle at 70% 30%, rgba(255, 180, 100, 0.4) 0%, rgba(254, 74, 3, 0.3) 35%, rgba(200, 40, 0, 0.1) 65%, transparent 80%)",
              filter: "blur(50px)",
            }}
          />

          {/* Desktop Flare 2: Top Edge Horizontal Luminous Bar */}
          <motion.div
            animate={{
              x: [0, 40, -30, 0],
              y: [0, 20, -15, 0],
              opacity: [0.45, 0.75, 0.4, 0.45],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-0 left-1/4 right-10 h-[220px] pointer-events-none transform-gpu"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(255, 160, 60, 0.32) 0%, rgba(254, 74, 3, 0.18) 50%, transparent 80%)",
              filter: "blur(40px)",
            }}
          />

          {/* Desktop Flare 3: Bottom-Left Intense Warm Accent Flare */}
          <motion.div
            animate={{
              x: [0, 40, -25, 0],
              y: [0, -35, 20, 0],
              scale: [1, 1.15, 0.92, 1],
              opacity: [0.65, 0.88, 0.58, 0.65],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-16 -left-16 w-[620px] h-[620px] rounded-full pointer-events-none transform-gpu"
            style={{
              background: "radial-gradient(circle at 30% 70%, rgba(255, 190, 110, 0.4) 0%, rgba(254, 74, 3, 0.32) 35%, rgba(180, 30, 0, 0.1) 65%, transparent 80%)",
              filter: "blur(50px)",
            }}
          />

          {/* Micro Ember & Dust Motes Canvas Particle Overlay */}
          <canvas
            ref={canvasRef}
            id="animated-bg-canvas"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />
        </>
      )}

      {/* Dark Vignette Overlay to keep center crisp, deep black & high contrast */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}
