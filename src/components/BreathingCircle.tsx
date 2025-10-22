'use client';

import { motion } from 'framer-motion';

export const BreathingCircle = () => {
  return (
    <div className="relative flex items-center justify-center mb-20">
      {/* Outer expanding circle */}
      <motion.div
        className="absolute w-32 h-32 rounded-full border-2 border-secondary/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Middle expanding circle */}
      <motion.div
        className="absolute w-24 h-24 rounded-full border-2 border-secondary/50"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      
      {/* Inner pulsing circle */}
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent shadow-[0_0_30px_hsl(45_95%_60%/0.6)]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Breathing text - Removido para evitar sobreposição */}
    </div>
  );
};
