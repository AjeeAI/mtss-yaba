'use client';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  onScroll?: boolean; 
}

export default function StaggerContainer({ 
  children, 
  className = "", 
  delay = 0.2, 
  stagger = 0.15,
  onScroll = false 
}: StaggerProps) {
  
  // GURU TWEAK: Added explicit 'Variants' typing here too
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  if (onScroll) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}