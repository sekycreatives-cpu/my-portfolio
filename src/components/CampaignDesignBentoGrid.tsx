import { motion } from "motion/react";

export default function CampaignDesignBentoGrid() {
  const images = [
    {
      id: "campaign-gallery-1",
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=750&q=80",
      alt: "Vibrant Live Event & Presentation",
      title: "Interactive Experiences",
      tag: "Live & Event Production",
      colSpan: "col-span-12 md:col-span-5",
      aspectRatio: "aspect-[4/5] md:aspect-auto md:h-[400px]"
    },
    {
      id: "campaign-gallery-2",
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      alt: "Campaign Strategy & Creative Design",
      title: "Digital Ecosystems",
      tag: "Omnichannel Campaigns",
      colSpan: "col-span-12 md:col-span-7",
      aspectRatio: "aspect-[16/10] md:aspect-auto md:h-[400px]"
    },
    {
      id: "campaign-gallery-3",
      src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      alt: "Creative Print Design & Installations",
      title: "Tactile Brand Spaces",
      tag: "Print & Exhibition Design",
      colSpan: "col-span-12 md:col-span-7",
      aspectRatio: "aspect-[16/10] md:aspect-auto md:h-[400px]"
    },
    {
      id: "campaign-gallery-4",
      src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=650&q=80",
      alt: "Outdoor Street Campaign",
      title: "Street Takeovers",
      tag: "Guerrilla & Out Of Home",
      colSpan: "col-span-12 md:col-span-5",
      aspectRatio: "aspect-[4/5] md:aspect-auto md:h-[400px]"
    },
    {
      id: "campaign-gallery-5",
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
      alt: "Brand Exhibition Presentation",
      title: "Experiential Showcases",
      tag: "Cultural Engagement / Global Tour",
      colSpan: "col-span-12",
      aspectRatio: "aspect-[21/9] md:aspect-auto md:h-[320px]"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full mt-10 bg-[#050505] border border-neutral-900 rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col gap-10 md:gap-14 shadow-2xl relative overflow-hidden group/grid"
    >
      {/* Background ambient glow matching our style */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FE4A03]/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FE4A03]/3 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Bento Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-b border-neutral-900 pb-10">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
          <span className="text-[#FE4A03] font-mono text-xs sm:text-sm tracking-widest uppercase font-medium">
            // Campaign Design Portfolio
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight uppercase font-sans">
            Campaign Hub<br />
            <span className="text-neutral-500">Activations & Impact.</span>
          </h3>
        </div>
        <div className="col-span-12 md:col-span-5 md:pl-6">
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light md:mt-8">
            Orchestrating memorable brand movements across digital and physical touchpoints. From immersive live events to high-impact street poster series and unified public campaigns.
          </p>
        </div>
      </div>

      {/* Double-Stagger Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {images.map((img) => (
          <motion.div
            key={img.id}
            id={img.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`${img.colSpan} bg-[#0A0A0B] border border-neutral-900 hover:border-neutral-800 rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden cursor-pointer group shadow-lg`}
          >
            {/* Subtle warm hover border/glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FE4A03]/0 to-[#FE4A03]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image Container */}
            <div className={`w-full ${img.aspectRatio} rounded-2xl overflow-hidden relative mb-4`}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-50" />
            </div>

            {/* Info Footer */}
            <div className="relative z-10 px-2 pb-2 flex justify-between items-center">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight uppercase group-hover:text-[#FE4A03] transition-colors duration-300">
                  {img.title}
                </h4>
                <p className="text-neutral-500 text-[10px] sm:text-xs font-mono mt-0.5 uppercase tracking-wider">
                  {img.tag}
                </p>
              </div>
              <div className="w-6 h-6 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 group-hover:border-[#FE4A03] group-hover:text-[#FE4A03] transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
