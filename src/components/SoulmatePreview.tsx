'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface SoulmatePreviewProps {
  name: string;
  onReveal?: () => void;
}

export const SoulmatePreview = ({ name, onReveal }: SoulmatePreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <Card className="relative overflow-hidden border-primary/30 bg-card/50 backdrop-blur-sm p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
            <h3 className="text-2xl font-bold text-gradient-gold">
              Complete Energetic Visualization
            </h3>
            <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
          </div>
          <p className="text-muted-foreground">
            {name}, I was able to create a visual representation based on your answers
          </p>
        </div>

        {/* Preview borrado */}
        <div className="relative max-w-md mx-auto mb-6">
          <div className="relative rounded-2xl overflow-hidden border-4 border-primary/40 shadow-2xl">
            <img
              src="/assets/soulmate-preview-blurred.jpg"
              alt="Soulmate preview"
              className="w-full h-auto blur-[20px] scale-110"
              style={{ filter: 'blur(20px) brightness(0.8)' }}
            />
            
            {/* Overlay com gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Efeitos de brilho */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-[80px] animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/30 rounded-full blur-[100px] animate-pulse-glow" />
            
            {/* Texto no centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-secondary animate-pulse" />
                <p className="text-white text-2xl font-bold drop-shadow-lg">
                  Your Soulmate
                </p>
                <p className="text-white/90 text-lg mt-2 drop-shadow-lg">
                  Awaiting revelation...
                </p>
              </div>
            </div>
          </div>

          {/* Badge "Seraphine working" */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-accent rounded-full px-4 py-2 shadow-lg border-2 border-white/20"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-sm font-semibold">Visualizing...</span>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            ✨ The high-definition image will be revealed with the complete analysis
          </p>
          <div className="flex items-center justify-center gap-2 text-secondary">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-medium">Based on your energetic responses</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
