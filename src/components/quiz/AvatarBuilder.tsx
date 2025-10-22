'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export interface AvatarBuilderProps {
  hairType?: string;
  hairColor?: string;
  eyeColor?: string;
  skinTone?: string;
  hasBeard?: boolean;
  bodyType?: string;
  height?: string;
  currentFocus?: 'hair' | 'eyes' | 'skin' | 'beard' | 'body' | 'height' | null;
}

export const AvatarBuilder = ({
  hairType,
  hairColor,
  eyeColor,
  skinTone,
  hasBeard,
  bodyType,
  height,
  currentFocus
}: AvatarBuilderProps) => {
  
  // Mapeamento de cores para visualização
  const getSkinColor = () => {
    switch(skinTone) {
      case 'fair': return '#fde2d8';
      case 'light': return '#e8b89a';
      case 'medium': return '#b57e5a';
      case 'dark': return '#6d4230';
      default: return '#e8b89a';
    }
  };

  const getHairColor = () => {
    switch(hairColor) {
      case 'black': return '#1a1a1a';
      case 'darkBrown': return '#3d2817';
      case 'brown': return '#5c4033';
      case 'blonde': return '#f4d47c';
      case 'red': return '#a8453c';
      case 'gray': return '#9ca3af';
      default: return '#3d2817';
    }
  };

  const getEyeColor = () => {
    switch(eyeColor) {
      case 'brown': return '#5c3317';
      case 'blue': return '#4a90e2';
      case 'green': return '#6b9b37';
      case 'hazel': return '#8b7355';
      default: return '#5c3317';
    }
  };

  const getHeightScale = () => {
    if (!height) return 1;
    switch (height) {
      case 'Short': return 0.85;
      case 'Average': return 1;
      case 'Tall': return 1.15;
      default: return 1;
    }
  };

  const getBodyWidth = () => {
    if (!bodyType) return 40;
    switch (bodyType) {
      case 'Slim': return 35;
      case 'Athletic': return 45;
      case 'Average': return 40;
      case 'Plus Size': return 50;
      default: return 40;
    }
  };

  const getFocusLabel = () => {
    switch (currentFocus) {
      case 'hair': return '✨ Setting hair';
      case 'eyes': return '👁️ Setting eyes';
      case 'skin': return '🎨 Setting skin tone';
      case 'beard': return '🧔 Setting beard';
      case 'body': return '💪 Setting body type';
      case 'height': return '📏 Setting height';
      default: return 'Building avatar...';
    }
  };

  return (
    <div className="sticky top-8 hidden md:block">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative w-64 mx-auto"
      >
        {/* Background circular */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
        
        {/* Container do avatar */}
        <div className="relative w-full flex items-center justify-center">
          <motion.svg 
            viewBox="0 0 200 300" 
            className="w-full h-auto"
            animate={{ scale: getHeightScale() }}
            transition={{ duration: 0.5 }}
          >
            {/* Cabeça */}
            <motion.ellipse
              cx="100"
              cy="100"
              rx="60"
              ry="70"
              fill={getSkinColor()}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              animate={currentFocus === 'skin' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
            
            {/* Cabelo */}
            {hairType !== 'bald' && (
              <motion.g
                animate={currentFocus === 'hair' ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {hairType === 'curly' && (
                  <>
                    <ellipse cx="70" cy="50" rx="15" ry="20" fill={getHairColor()} />
                    <ellipse cx="90" cy="45" rx="15" ry="20" fill={getHairColor()} />
                    <ellipse cx="110" cy="45" rx="15" ry="20" fill={getHairColor()} />
                    <ellipse cx="130" cy="50" rx="15" ry="20" fill={getHairColor()} />
                  </>
                )}
                {hairType === 'wavy' && (
                  <path
                    d="M 50 60 Q 60 45, 70 50 T 90 50 T 110 50 T 130 50 Q 140 45, 150 60"
                    fill={getHairColor()}
                    stroke={getHairColor()}
                    strokeWidth="15"
                  />
                )}
                {hairType === 'straight' && (
                  <rect x="50" y="40" width="100" height="25" fill={getHairColor()} rx="5" />
                )}
              </motion.g>
            )}
            
            {/* Olhos */}
            <motion.g
              animate={currentFocus === 'eyes' ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <ellipse cx="80" cy="90" rx="8" ry="10" fill="white" />
              <ellipse cx="120" cy="90" rx="8" ry="10" fill="white" />
              <circle cx="80" cy="92" r="5" fill={getEyeColor()} />
              <circle cx="120" cy="92" r="5" fill={getEyeColor()} />
            </motion.g>
            
            {/* Nariz */}
            <line x1="100" y1="95" x2="100" y2="110" stroke={getSkinColor()} strokeWidth="2" filter="brightness(0.8)" />
            
            {/* Boca */}
            <path
              d="M 85 120 Q 100 128, 115 120"
              stroke={getSkinColor()}
              strokeWidth="2"
              fill="none"
              filter="brightness(0.7)"
            />
            
            {/* Barba */}
            {hasBeard && (
              <motion.g
                animate={currentFocus === 'beard' ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <ellipse cx="100" cy="135" rx="35" ry="25" fill={getHairColor()} opacity="0.8" />
              </motion.g>
            )}

            {/* Pescoço */}
            <motion.rect
              x="85"
              y="160"
              width="30"
              height="25"
              fill={getSkinColor()}
              rx="5"
              animate={currentFocus === 'body' || currentFocus === 'height' ? {
                filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />

            {/* Ombros e Torso */}
            <motion.g
              animate={currentFocus === 'body' || currentFocus === 'height' ? {
                scale: [1, 1.05, 1],
                filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {/* Ombros */}
              <path
                d={`M 85 185 L ${100 - getBodyWidth() / 2} 195 L ${100 + getBodyWidth() / 2} 195 L 115 185`}
                fill={getSkinColor()}
                opacity="0.95"
              />
              
              {/* Corpo */}
              <rect
                x={100 - getBodyWidth() / 2}
                y="195"
                width={getBodyWidth()}
                height="95"
                fill={getSkinColor()}
                rx="10"
              />
              
              {/* Roupa (indicação simples) */}
              <rect
                x={100 - getBodyWidth() / 2 + 2}
                y="200"
                width={getBodyWidth() - 4}
                height="85"
                fill="hsl(var(--primary))"
                opacity="0.3"
                rx="8"
              />
            </motion.g>
          </motion.svg>
        </div>

        {/* Indicador de foco */}
        {currentFocus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-secondary/90 text-background px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
          >
            {getFocusLabel()}
          </motion.div>
        )}
      </motion.div>

      <p className="text-center text-muted-foreground text-sm mt-16">
        Building your soulmate...
      </p>
    </div>
  );
};
