import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';

interface CardConnectionMomentProps {
  onContinue: () => void;
}

const cosmicCards = [
  { 
    name: 'The Lovers',
    meaning: 'Deep connections and choices of the heart'
  },
  { 
    name: 'The Sun',
    meaning: 'Joy, success and illumination in love'
  },
  { 
    name: 'The Star',
    meaning: 'Hope, divine guidance and renewal'
  },
];

export const CardConnectionMoment = ({ onContinue }: CardConnectionMomentProps) => {
  const { selectedCard } = useQuizStore();
  // selectedCard já é o objeto completo com name, meaning, image
  const currentCard = selectedCard || cosmicCards[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background místico */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            🔮 Special Moment
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 border-primary/30 bg-card/50 backdrop-blur-sm relative overflow-hidden">
            {/* Carta embaçada girando */}
            <div className="relative mb-8">
              <motion.div
                className="w-40 h-60 mx-auto relative"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {selectedCard && (
                  <img 
                    src={selectedCard.image}
                    alt="Cosmic Card"
                    className="w-full h-full object-cover rounded-lg shadow-2xl border-2 border-primary/50"
                    style={{ filter: 'blur(8px)' }}
                  />
                )}
              </motion.div>

              {/* Partículas conectando */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-secondary rounded-full"
                    style={{
                      left: `${50 + Math.cos((i / 12) * Math.PI * 2) * 45}%`,
                      top: `${50 + Math.sin((i / 12) * Math.PI * 2) * 45}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      x: [(Math.random() - 0.5) * 40, 0],
                      y: [(Math.random() - 0.5) * 40, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>

              {/* Pulsação */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 60px rgba(168, 85, 247, 0.6)',
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Textos místicos */}
            <div className="text-center space-y-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl font-semibold"
              >
                Your answers are aligning perfectly with the card you chose...
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-secondary font-semibold flex items-center justify-center gap-2 flex-wrap"
              >
                <Sparkles className="w-5 h-5" />
                <span>The card you chose is resonating strongly with your answers...</span>
                <Sparkles className="w-5 h-5" />
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-base text-accent font-semibold"
              >
                I sense a powerful energy... something about {
                  currentCard.name === 'The Lovers' ? 'deep connections and choices of the heart' :
                  currentCard.name === 'The Sun' ? 'joy, success and illumination' :
                  'hope and divine renewal'
                } 💫
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="text-lg text-accent font-semibold"
              >
                This is no coincidence! Continue, as it will be revealed at the end 💫
              </motion.p>

              {/* Botão continuar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
              >
                <Button
                  onClick={onContinue}
                  size="lg"
                  className="gradient-mystical text-lg px-12 py-6 mt-4 hover:opacity-90 transition-opacity"
                >
                  Continue ✨
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
