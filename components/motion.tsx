"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

export function fadeUp(delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: easeOut },
    },
  };
}

/** Fades and lifts children into view when scrolled into the viewport. */
export function Reveal({
  delay = 0,
  once = true,
  className,
  children,
}: {
  delay?: number;
  once?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={fadeUp(delay)}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct StaggerItem children as they scroll into view. */
export function Stagger({
  className,
  children,
  gap = 0.08,
}: {
  className?: string;
  children: ReactNode;
  gap?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: gap }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div className={className} variants={fadeUp()}>
      {children}
    </motion.div>
  );
}
