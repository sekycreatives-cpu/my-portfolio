import { motion } from "motion/react";
import { getOptimizedCloudinaryUrl } from "../lib/imageOptimization";

interface ShowcaseItem {
  id: string;
  title?: string;
  image: string;
}

// ROW 1: Right -> Left (Branding & Social Media mix)
const ROW_1: ShowcaseItem[] = [
  { id: "r1-new-1", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786689786/post_4_copy_s0dnc9.jpg" },
  { id: "r1-1", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785846217/Brand01_01_gq8k9g.png" },
  { id: "r1-2", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441150/Cycling_4_o74asg.jpg" },
  { id: "r1-3", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786220085/Flynet_Rebrand_copy_2_gqevmw.jpg" },
  { id: "r1-4", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441149/square_post_2_jkffyx.jpg" },
  { id: "r1-5", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786724030/Robinson_main_2_psjqgv.png" },
  { id: "r1-6", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441148/3_ek624q.jpg" },
  { id: "r1-7", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785870642/Brand03_1.1_yxuvw2.png" },
  { id: "r1-8", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441147/Adventure_oimbth.jpg" },
  { id: "r1-9", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785858983/Brand01_04_uxobti.png" },
  { id: "r1-10", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441146/Post_22_mf6nbo.jpg" },
];

// ROW 2: Left -> Right (Branding & Social Media mix)
const ROW_2: ShowcaseItem[] = [
  { id: "r2-new-1", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786689786/post_2-2_esq5k5.jpg" },
  { id: "r2-1", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441150/White_l5lhfx.jpg" },
  { id: "r2-2", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785909837/Brand03_7_smj7jm.png" },
  { id: "r2-3", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441148/Artboard_84_xa8qvj.jpg" },
  { id: "r2-4", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785867490/Brand02_2_r9zk6i.png" },
  { id: "r2-5", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441146/Square_n3mugi.jpg" },
  { id: "r2-6", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786220086/Flynet_Rebrand_copy_6_qctizo.jpg" },
  { id: "r2-7", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441145/Square_size_hg1vkl.jpg" },
  { id: "r2-8", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785858027/Brand01_2_oayh4i.png" },
  { id: "r2-9", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441142/Kaalisuwari_1_sm1k4g.jpg" },
  { id: "r2-10", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786220140/Flynet_Rebrand_copy_7_qsyv4v.jpg" },
];

// ROW 3: Right -> Left (Branding & Social Media mix)
const ROW_3: ShowcaseItem[] = [
  { id: "r3-new-1", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786689786/Post_7_jabfgu.jpg" },
  { id: "r3-1", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786220085/Flynet_Rebrand_copy_4_nei34u.jpg" },
  { id: "r3-2", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441141/Just_Wear4_wl8idv.jpg" },
  { id: "r3-3", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785871287/WhatsApp_Image_2026-08-05_at_12.12.55_AM_2_lpqtxg.jpg" },
  { id: "r3-4", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441728/WhatsApp_Image_2026-08-11_at_3.17.18_PM_3_kswl4c.jpg" },
  { id: "r3-5", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785867489/Brand02_3_hrazvp.png" },
  { id: "r3-6", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.19_PM_2_gdleni.jpg" },
  { id: "r3-7", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785846220/Brand01_3_c2irra.png" },
  { id: "r3-8", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441730/WhatsApp_Image_2026-08-11_at_3.17.20_PM_2_eznpfu.jpg" },
  { id: "r3-9", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441147/Post_25_piwmcr.jpg" },
  { id: "r3-10", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441731/WhatsApp_Image_2026-08-11_at_3.17.19_PM_xbtram.jpg" },
];

// ROW 4: Left -> Right (Branding & Social Media mix)
const ROW_4: ShowcaseItem[] = [
  { id: "r4-new-1", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786689786/Construction_Post_2_u476tl.jpg" },
  { id: "r4-1", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.19_PM_1_tfkxjd.jpg" },
  { id: "r4-2", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785870823/Brand03_2.1_sg0vhy.png" },
  { id: "r4-3", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441728/WhatsApp_Image_2026-08-11_at_3.17.18_PM_yis2pt.jpg" },
  { id: "r4-4", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1785867490/Brand02_4_sjfwfx.png" },
  { id: "r4-5", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441729/WhatsApp_Image_2026-08-11_at_3.17.20_PM_1_aanvxy.jpg" },
  { id: "r4-6", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441751/WhatsApp_Image_2026-08-11_at_3.17.17_PM_qetqug.jpg" },
  { id: "r4-7", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441141/Hiring1_zltqzt.jpg" },
  { id: "r4-8", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441751/WhatsApp_Image_2026-08-11_at_3.17.17_PM_1_fgryuh.jpg" },
  { id: "r4-9", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441149/Artboard_83_wprr8i.jpg" },
  { id: "r4-10", image: "https://res.cloudinary.com/eupac3wd/image/upload/f_auto,q_auto/v1786441730/WhatsApp_Image_2026-08-11_at_3.17.18_PM_2_qaqiig.jpg" },
];

export default function ShowcaseMarqueeGridSection() {
  return (
    <section
      id="marquee-showcase-section"
      className="w-full bg-transparent text-white relative z-10 pt-4 sm:pt-8 pb-4 sm:pb-6 overflow-hidden"
    >
      {/* SECTION HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1700px] mx-auto px-4 sm:px-10 md:px-16 lg:px-20 mb-6 sm:mb-10 flex flex-col gap-2"
      >
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#FE4A03] uppercase select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FE4A03] animate-pulse shadow-[0_0_10px_#FE4A03]" />
          <span>DESIGN WALL SHOWCASE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-white mt-1">
          Works <span className="text-[#FE4A03] italic font-serif font-normal">Worth Remembering</span>
        </h2>
      </motion.div>

      {/* CONTINUOUS MULTI-ROW MARQUEE WALL */}
      <div className="w-full flex flex-col gap-0 relative">
        {/* ROW 1: RIGHT TO LEFT */}
        <MarqueeRow
          items={ROW_1}
          direction="left"
          speed={55}
        />

        {/* ROW 2: LEFT TO RIGHT */}
        <MarqueeRow
          items={ROW_2}
          direction="right"
          speed={48}
        />

        {/* ROW 3: RIGHT TO LEFT (Desktop & Tablet) */}
        <div className="hidden sm:block">
          <MarqueeRow
            items={ROW_3}
            direction="left"
            speed={58}
          />
        </div>

        {/* ROW 4: LEFT TO RIGHT (Desktop & Tablet) */}
        <div className="hidden sm:block">
          <MarqueeRow
            items={ROW_4}
            direction="right"
            speed={52}
          />
        </div>
      </div>
    </section>
  );
}

// Single Infinite Marquee Row Component
interface MarqueeRowProps {
  items: ShowcaseItem[];
  direction: "left" | "right";
  speed: number;
}

function MarqueeRow({ items, direction, speed }: MarqueeRowProps) {
  // Duplicate items 2 times for seamless 50% translation loop with reduced memory footprint
  const duplicatedItems = [...items, ...items];

  const animateX =
    direction === "left"
      ? ["0%", "-50%"]
      : ["-50%", "0%"];

  return (
    <div className="w-full overflow-hidden flex select-none pointer-events-none">
      <motion.div
        className="flex gap-0 shrink-0 transform-gpu"
        style={{ willChange: "transform" }}
        animate={{ x: animateX }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {duplicatedItems.map((item, idx) => {
          const optimizedImage = getOptimizedCloudinaryUrl(item.image, {
            width: 420,
            quality: "auto:good",
            format: "auto",
          });

          return (
            <div
              key={`marquee-${item.id}-${idx}`}
              className="relative h-28 xs:h-32 sm:h-44 md:h-52 shrink-0 rounded-none overflow-hidden bg-[#121214] border-0"
            >
              <img
                src={optimizedImage}
                alt={item.title || "Showcase Item"}
                className="h-full w-auto max-w-[420px] object-cover object-center"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

