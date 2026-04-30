"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Enable hover lift animation */
  hover?: boolean;
}

/**
 * Flexible card component with Gemstone dark theme.
 * Use for feature cards, gallery items, or any boxed content.
 */
export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        "border border-grid bg-panel/50 p-6",
        "transition-all duration-300",
        hover && "hover:bg-panel hover:border-grid",
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
