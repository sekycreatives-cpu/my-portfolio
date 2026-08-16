import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ProgressiveImage from "./ProgressiveImage";

// High Quality 1:1 Square Images for Social Media Gallery (Exact 16 Selected Designs)
const socialImages: string[] = [
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786689786/Post_7_jabfgu.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441731/WhatsApp_Image_2026-08-11_at_3.17.19_PM_xbtram.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.19_PM_2_gdleni.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441728/WhatsApp_Image_2026-08-11_at_3.17.18_PM_yis2pt.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786689786/post_2-2_esq5k5.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441150/White_l5lhfx.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441150/Cycling_4_o74asg.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441151/Instagram_Mockup_fqokhi.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441147/Adventure_oimbth.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441145/WhatsApp_Image_2025-01-27_at_4.38.18_PM_2_vjctph.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441142/WhatsApp_Image_2025-01-27_at_4.38.17_PM_1_l5hzdz.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441142/Kaalisuwari_1_sm1k4g.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441143/WhatsApp_Image_2025-01-27_at_4.38.17_PM_ymxcb5.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441141/WhatsApp_Image_2025-01-27_at_4.38.19_PM_u21p5e.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441141/Just_Wear4_wl8idv.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/v1786441751/WhatsApp_Image_2026-08-11_at_3.17.17_PM_qetqug.jpg",
];

function useColumnCount() {
  const [cols, setCols] = useState<number>(4);

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCols(2);
      } else if (width < 1024) {
        setCols(3);
      } else {
        setCols(4);
      }
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
}

export default function SocialMediaBentoGrid() {
  const columnCount = useColumnCount();

  // Distribute all 16 images into column arrays for left-to-right top-aligned masonry
  const columns = Array.from({ length: columnCount }, () => [] as { url: string; index: number }[]);
  socialImages.forEach((url, idx) => {
    const colIndex = idx % columnCount;
    columns[colIndex].push({ url, index: idx });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full mt-2 sm:mt-4 bg-[#0A0A0B]/50 border border-white/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-lg"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FE4A03]/10 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6 sm:pb-6 sm:mb-8">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FE4A03] animate-pulse" />
            <span className="text-[#FE4A03] font-mono text-[11px] sm:text-xs tracking-widest uppercase font-semibold">
              CREATIVE CAMPAIGNS GALLERY
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
            Visual Feed & Campaign Grid
          </h3>
        </div>
        <div className="text-xs font-mono text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit">
          16 Featured Works
        </div>
      </div>

      {/* NATURAL ASPECT RATIO MASONRY IMAGE GRID (ALL 16 VISIBLE) */}
      <div className="flex gap-3 sm:gap-4 md:gap-5 items-start">
        {columns.map((colItems, colIdx) => (
          <div key={`social-col-${colIdx}`} className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 min-w-0">
            {colItems.map(({ url, index }) => (
              <motion.div
                key={`social-grid-item-${index}-${url}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 8) * 0.04,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#121214] border border-white/10 hover:border-[#FE4A03]/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(254,74,3,0.3)] shrink-0"
              >
                <ProgressiveImage
                  src={url}
                  alt={`Creative Campaign ${index + 1}`}
                  targetWidth={500}
                  imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}


