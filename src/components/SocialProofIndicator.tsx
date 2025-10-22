'use client';

import { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const SocialProofIndicator = () => {
  const [viewersCount] = useState(Math.floor(Math.random() * 5) + 3); // 3-7 pessoas
  const [recentSales, setRecentSales] = useState(Math.floor(Math.random() * 3) + 2); // 2-4 vendas

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentSales(Math.floor(Math.random() * 3) + 2);
    }, 30000); // Update a cada 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <Users className="w-5 h-5 text-secondary" />
        <span className="text-muted-foreground">
          <span className="font-bold text-secondary">{viewersCount} people</span> viewing now
        </span>
      </motion.div>
      <span className="hidden sm:block text-muted-foreground">•</span>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <TrendingUp className="w-5 h-5 text-accent" />
        <span className="text-muted-foreground">
          <span className="font-bold text-accent">{recentSales} packages</span> sold in the last hour
        </span>
      </motion.div>
    </div>
  );
};
