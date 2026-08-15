import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RollingFooterItemProps {
  key?: string;
  item: {
    number: string;
    label: string;
    subItems: string[];
    delay: number;
  };
  index: number;
}

export default function RollingFooterItem({ item, index }: RollingFooterItemProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Initial offset timeout so columns roll rhythmically
    const timer = setTimeout(() => {
      setCurrentIndex(1 % item.subItems.length);

      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % item.subItems.length);
      }, 3000);

      return () => clearInterval(interval);
    }, item.delay * 1000);

    return () => clearTimeout(timer);
  }, [item.delay, item.subItems.length]);

  const scrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id={`footer-item-${index + 1}`}
      onClick={scrollToServices}
      className="flex flex-col gap-1.5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 p-2.5 sm:p-3 rounded-2xl hover:bg-white/[0.04] border border-transparent hover:border-[#FE4A03]/30 hover:shadow-[0_0_20px_rgba(254,74,3,0.12)] relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold tracking-wider text-[#FE4A03] group-hover:text-[#FE4A03] transition-colors duration-300">
          {item.number}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FE4A03]/50 group-hover:bg-[#FE4A03] group-hover:shadow-[0_0_8px_#FE4A03] transition-all duration-300" />
      </div>

      {/* Rolling Text Container */}
      <div className="relative h-6 sm:h-7 md:h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center text-sm sm:text-base md:text-lg font-medium text-white group-hover:text-[#FE4A03] transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {item.subItems[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rhythmic Item Progress Indicator */}
      <div className="flex items-center gap-1.5 mt-0.5">
        {item.subItems.map((_, i) => (
          <span
            key={`dot-${item.number}-${i}`}
            className={`h-0.5 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "w-4 bg-[#FE4A03]"
                : "w-1 bg-white/20 group-hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
