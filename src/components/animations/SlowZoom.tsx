'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function SlowZoom({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div 
      className={className}
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.4 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}