import { ReactNode } from "react";
import { motion } from "motion/react";

interface SectionRevealWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  yOffset?: number;
  blur?: boolean;
}

export default function SectionRevealWrapper({
  children,
  className = "",
  id,
  delay = 0,
  yOffset = 20,
}: SectionRevealWrapperProps) {
  return (
    <motion.div
      id={id}
      initial={{
        opacity: 0,
        y: yOffset,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "transform, opacity" }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
