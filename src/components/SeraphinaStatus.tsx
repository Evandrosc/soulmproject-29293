'use client';

import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

interface SeraphinaStatusProps {
  status?: 'online' | 'working' | 'visualizing';
}

export const SeraphinaStatus = ({ status = 'online' }: SeraphinaStatusProps) => {
  const statusText = {
    online: 'Online now',
    working: 'Ready to start your drawing',
    visualizing: 'Visualizing details...',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-sm"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Circle className="w-3 h-3 fill-green-500 text-green-500" />
      </motion.div>
      <span className="text-muted-foreground font-medium">
        Seraphine is {statusText[status]}
      </span>
    </motion.div>
  );
};
