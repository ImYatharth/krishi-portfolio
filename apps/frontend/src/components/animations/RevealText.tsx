"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.3em" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
