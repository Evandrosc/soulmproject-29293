
'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';

export default function CardReaction() {
  const navigate = useNavigateWithParams();
  const { selectedCard } = useQuizStore();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Se não tem carta selecionada, volta para home
    if (!selectedCard) {
      console.log('⚠️ No card selected, redirecting to home');
      navigate('/', { replace: true });
      return;
    }

    // Após 6 segundos, vai para o chat
    const timer = setTimeout(() => {
      console.log('🎯 Redirecting to chat with Seraphine');
      navigate('/chat', { replace: true });
    }, 6000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCard]);

  useEffect(() => {
    sendClarityEvent(namePages.front, 'card-reaction')
  }, []);

  if (!selectedCard) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background via-purple-950/20 to-background">
      <div className="max-w-2xl w-full space-y-8">
        {/* Carta selecionada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.img
            src={selectedCard.image}
            alt={selectedCard.name}
            className="w-48 h-72 object-cover rounded-lg mx-auto shadow-2xl border-2 border-primary/50 mb-6"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          />
          <h3 className="text-2xl font-bold text-primary mb-2">
            {selectedCard.name}
          </h3>
          <p className="text-muted-foreground">
            {selectedCard.meaning}
          </p>
        </motion.div>

        {/* Reação da Seraphina */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="space-y-4"
          >
            <p className="text-2xl text-foreground">
              Perfect! This will help me understand you better ✨
            </p>
            <p className="text-lg text-muted-foreground">
              Let's talk a little about this...
            </p>
          </motion.div>

          {/* Indicador de carregamento */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="flex justify-center gap-2 pt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-primary rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
