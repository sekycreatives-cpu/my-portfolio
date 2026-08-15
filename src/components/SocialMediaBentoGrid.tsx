import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProgressiveImage from "./ProgressiveImage";

// High Quality 1:1 Square Images for Social Media Gallery
const socialImages: string[] = [
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786689786/post_4_copy_s0dnc9.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786689786/post_2-2_esq5k5.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786689786/Post_7_jabfgu.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786689786/Construction_Post_2_u476tl.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441150/White_l5lhfx.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441150/Cycling_4_o74asg.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441149/Artboard_83_wprr8i.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441149/square_post_2_jkffyx.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441148/3_ek624q.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441148/WhatsApp_Image_2025-01-27_at_4.38.20_PM_ctv0yg.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441148/Artboard_84_xa8qvj.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441147/Post_25_piwmcr.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441147/Adventure_oimbth.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441147/WhatsApp_Image_2025-01-27_at_4.38.16_PM_1_wpd6z4.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441146/Post_22_mf6nbo.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441146/post_34_white_399_o3i7ek.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441146/Square_n3mugi.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441145/Square_size_hg1vkl.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441145/WhatsApp_Image_2025-01-27_at_4.38.18_PM_2_vjctph.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441144/WhatsApp_Image_2025-01-27_at_4.38.21_PM_2_kcohqb.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441145/WhatsApp_Image_2025-01-27_at_4.38.21_PM_b6sdih.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441144/WhatsApp_Image_2025-01-27_at_4.38.21_PM_1_xxljeq.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441143/WhatsApp_Image_2025-01-27_at_4.38.17_PM_2_kost83.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441143/post2_2_jq7jk7.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441143/WhatsApp_Image_2025-01-27_at_4.38.17_PM_ymxcb5.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441143/WhatsApp_Image_2025-01-27_at_4.38.16_PM_djdmhy.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441142/WhatsApp_Image_2025-01-27_at_4.38.17_PM_1_l5hzdz.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441142/Post_11_eg6vqw.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441142/7_n6r7ka.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441142/WhatsApp_Image_2025-01-27_at_4.38.18_PM_1_qlcbop.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441141/Hiring1_zltqzt.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441142/nov_post_13_fjwpkv.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441142/Kaalisuwari_1_sm1k4g.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441141/WhatsApp_Image_2025-01-27_at_4.38.20_PM_1_lwo84b.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441141/WhatsApp_Image_2025-01-27_at_4.38.19_PM_u21p5e.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441141/Just_Wear4_wl8idv.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441141/WhatsApp_Image_2025-01-27_at_4.38.18_PM_vdux1t.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441728/WhatsApp_Image_2026-08-11_at_3.17.18_PM_3_kswl4c.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.19_PM_2_gdleni.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.19_PM_3_xwt7uo.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.19_PM_1_tfkxjd.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441728/WhatsApp_Image_2026-08-11_at_3.17.18_PM_yis2pt.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.20_PM_1_aanvxy.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441730/WhatsApp_Image_2026-08-11_at_3.17.20_PM_2_eznpfu.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441730/WhatsApp_Image_2026-08-11_at_3.17.18_PM_1_mtdfdq.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.20_PM_3_g7srik.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441751/WhatsApp_Image_2026-08-11_at_3.17.17_PM_qetqug.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441731/WhatsApp_Image_2026-08-11_at_3.17.19_PM_xbtram.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441730/WhatsApp_Image_2026-08-11_at_3.17.18_PM_2_qaqiig.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441751/WhatsApp_Image_2026-08-11_at_3.17.17_PM_2_dlg3db.jpg",
  "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441751/WhatsApp_Image_2026-08-11_at_3.17.17_PM_1_fgryuh.jpg",
];

const INITIAL_VISIBLE_COUNT = 12;

function useColumnCount() {
  const [cols, setCols] = useState<number>(6);

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCols(2);
      } else if (width < 768) {
        setCols(3);
      } else if (width < 1280) {
        setCols(4);
      } else {
        setCols(6);
      }
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
}

export default function SocialMediaBentoGrid() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const columnCount = useColumnCount();

  // Distribute all images into column arrays for left-to-right top-aligned masonry
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
              SOCIAL MEDIA GALLERY
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
            Visual Feed & Social Grid
          </h3>
        </div>
      </div>

      {/* NATURAL ASPECT RATIO MASONRY IMAGE GRID WITH ANIMATED EXPANSION */}
      <motion.div 
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-3 sm:gap-4 md:gap-5 items-start"
      >
        {columns.map((colItems, colIdx) => (
          <div key={`social-col-${colIdx}`} className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 min-w-0">
            {colItems.map(({ url, index }) => {
              const isExtra = index >= INITIAL_VISIBLE_COUNT;
              return (
                <AnimatePresence key={`social-grid-item-${index}-${url}`} mode="popLayout">
                  {(!isExtra || isExpanded) && (
                    <motion.div
                      layout
                      initial={isExtra ? { opacity: 0, y: 50, scale: 0.95 } : false}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ 
                        opacity: 0, 
                        y: 50, 
                        scale: 0.95,
                        transition: { duration: 0.25, ease: "easeIn" } 
                      }}
                      transition={{
                        duration: 0.45,
                        delay: isExtra ? ((index - INITIAL_VISIBLE_COUNT) % 12) * 0.025 : 0,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#121214] border border-white/10 hover:border-[#FE4A03]/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(254,74,3,0.3)] shrink-0"
                    >
                      <ProgressiveImage
                        src={url}
                        alt={`Social Shot ${index + 1}`}
                        targetWidth={420}
                        imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>
        ))}
      </motion.div>

      {/* SEE MORE / SHOW LESS EXPANSION BUTTON */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center relative">
        {!isExpanded && (
          <div className="absolute -top-16 inset-x-0 h-20 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />
        )}
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FE4A03] hover:bg-[#ff5b1a] text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(254,74,3,0.4)] hover:shadow-[0_0_35px_rgba(254,74,3,0.7)] cursor-pointer hover:scale-105 active:scale-95"
        >
          <span>{isExpanded ? "Show Less" : "See More"}</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          ) : (
            <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
          )}
        </button>
      </div>
    </motion.div>
  );
}


