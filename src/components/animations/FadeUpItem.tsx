'use client';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

export default function FadeUpItem({ children, className = "" }: { children: ReactNode, className?: string }) {
  
  // GURU TWEAK: Explicitly declare the type as 'Variants'
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 50, damping: 15 } 
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}