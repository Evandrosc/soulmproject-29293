import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';
import happyCoupleImage from '@/assets/happy-couple-dopamine.jpg';

interface DopamineCoupleInterludeProps {
  onContinue: () => void;
}

export const DopamineCoupleInterlude = ({ onContinue }: DopamineCoupleInterludeProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background místico */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="w-16 h-16 text-secondary mx-auto fill-secondary" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            ✨ Perfect! Now about physical appearance
          </h1>
          <p className="text-xl text-muted-foreground">
            I will channel the energies to manifest the image of your soulmate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden border-primary/30 bg-card/50 backdrop-blur-sm">
            {/* Imagem dopaminérgica */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              {!imageLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <motion.img
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                src={happyCoupleImage}
                alt="Happy couple"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {/* Partículas flutuantes */}
              <div className="absolute inset-0">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-secondary rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Texto motivacional */}
            <div className="p-8 md:p-12 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-4"
              >
                <p className="text-2xl md:text-3xl font-bold text-gradient-gold">
                  Almost there... your soulmate is being revealed by the universe! 💫
                </p>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  The cosmic energies are aligned. Now we will detail the physical characteristics so that Seraphine can channel the complete visualization.
                </p>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    <p className="text-base font-semibold text-secondary">
                      What Happens Now
                    </p>
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your next answers will allow Seraphine to visualize every detail of your soulmate's face, body, and style. The more precise, the clearer the final drawing will be.
                  </p>
                </div>
              </motion.div>

              {/* Botão Continuar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={onContinue}
                  size="lg"
                  className="w-full gradient-mystical h-auto text-base p-2 hover:opacity-90 transition-opacity"
                >
                  Continue with <br /> Physical Characteristics ✨
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};