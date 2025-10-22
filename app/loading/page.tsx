
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Sparkles, Loader2 } from 'lucide-react';
import { SeraphinaStatus } from '@/components/SeraphinaStatus';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';

const loadingMessages = [
  '🔮 Connecting with Seraphine...',
  '✨ Seraphine is ONLINE and preparing your session...',
  '💫 She is waiting to reveal something very special beyond the card...',
  '🌟 You are about to speak with her live...',
  '⚡ Preparing direct energetic connection...',
];

export default function Loading() {
  const navigate = useNavigateWithParams();
  const { quizData, setLoading, setLastVisitedPage } = useQuizStore();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    console.log('🔍 [Loading] Montado');
    setLastVisitedPage('/loading');

    if (!quizData.name) {
      navigate('/');
      return;
    }

    // Atualizar mensagens a cada 4.5 segundos
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 4500);

    // Atualizar progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 150);

    // Simular tempo de "processamento" e navegar para Recognition
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/recognition');
    }, 8000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData.name, setLoading]);

  useEffect(() => {
    sendClarityEvent(namePages.front, 'loading')
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      {/* Status no topo */}
      <div className="absolute top-6 right-6 z-10">
        <SeraphinaStatus status="visualizing" />
      </div>

      <div className="text-center max-w-2xl w-full pt-16 md:pt-20">
        {/* Ícone animado */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8 flex justify-center"
        >
          <Sparkles className="w-20 h-20 text-secondary" />
        </motion.div>

        {/* Nome personalizado */}
        <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-6">
          {quizData.name}...
        </h1>

        {/* Mensagem dinâmica */}
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12"
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Barra de progresso */}
        <div className="max-w-md mx-auto">
          <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full gradient-mystical"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>

        {/* Loading spinner */}
        <div className="mt-12 flex justify-center">
          <Loader2 className="w-8 h-8 text-secondary animate-spin" />
        </div>

        {/* Texto motivacional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-20 text-lg text-primary font-semibold"
        >
          I'm visualizing something very special... ✨
        </motion.p>
      </div>
    </div>
  );
}

function AnimatePresence({
  mode,
  children,
}: {
  mode: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
