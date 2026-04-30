"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// -- Button Variants (Gemstone Palette) --
const variants = {
  primary:
    "bg-neon text-void hover:bg-void hover:text-neon border-2 border-neon focus-visible:ring-neon",
  secondary:
    "bg-panel text-pure hover:bg-grid focus-visible:ring-grid border-2 border-grid",
  outline:
    "border-2 border-neon text-neon hover:bg-neon hover:text-void focus-visible:ring-neon",
  ghost:
    "text-muted hover:bg-panel hover:text-pure focus-visible:ring-grid",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Render as a link-styled button */
  href?: string;
}

/**
 * Animated button component with Gemstone design system.
 * Supports primary, secondary, outline, and ghost styles.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-mono font-semibold tracking-wider uppercase",
      "transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
      "disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      className
    );

    // If href is provided, render as an anchor tag
    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...(props as HTMLMotionProps<"button">)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
