import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import seraphinaPortrait from '@/assets/seraphina-portrait.jpg';
export const SeraphinaIntro = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="max-w-4xl mx-auto mb-16"
    >
      <Card className="p-8 md:p-12 border-primary/30 bg-card/80 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
            <img
              src={seraphinaPortrait}
              alt="Seraphine - Mystical Seer"
              className="relative rounded-2xl w-full h-auto shadow-2xl border-2 border-primary/30"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
              <h3 className="text-2xl font-bold text-gradient-gold">
                Seraphine
              </h3>
            </div>

            <p className="text-lg leading-relaxed">
              For over 15 years, I've been channeling energies to help thousands find their soulmates. Today, something very special brought you here...
            </p>

            <p className="text-muted-foreground">
              Through deep energetic connection and the Tarot, I can visualize and channel the exact image of your soulmate—every detail, from their smile to their essence.
            </p>

            <div className="pt-4 border-t border-primary/20">
              <p className="text-sm italic text-primary">
                "The universe conspires for those who truly seek their destiny. Let me guide you to yours."
              </p>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
