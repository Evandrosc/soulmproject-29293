'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Card } from '@/components/ui/card';
import { Sparkles, Wand2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';
import { toast } from "@/hooks/use-toast";

export default function ArtisticChanneling() {
  const navigate = useNavigateWithParams();
  const { quizData } = useQuizStore();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    { text: "Seraphine is receiving the energies you emanated...", emoji: "🌌", duration: 3000 },
    { text: "She is channeling the visualization of your soulmate...", emoji: "✨", duration: 3000 },
    { text: "The energies are flowing through her...", emoji: "💫", duration: 3000 },
    { text: "Seraphine is seeing traits and characteristics now...", emoji: "🎨", duration: 3000 },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    console.log('🔍 [ArtisticChanneling] Montado com estado:', {
      currentStep: 0,
      hasName: Boolean(quizData.name),
      lastVisitedPage: ''
    });

    // Salva a página atual
    const { setLastVisitedPage } = useQuizStore.getState();
    setLastVisitedPage('/artistic-channeling');

    if (!quizData.name) {
      console.error('❌ ArtisticChanneling: Dados ausentes, redirecionando');
      toast({
        title: "Session incomplete",
        description: "Please complete the quiz first",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    console.log('✅ ArtisticChanneling iniciado com dados:', { name: quizData.name });

    // Timer total: 12 segundos (4 mensagens x 3s) - ACELERADO
    const totalDuration = 12000;
    const messageInterval = 3000;

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (totalDuration / 100));
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 100);

    // Message rotation
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => {
        const next = prev + 1;
        if (next >= messages.length) {
          clearInterval(messageTimer);
          return messages.length - 1;
        }
        return next;
      });
    }, messageInterval);

    // Navigate after 12s
    const navTimer = setTimeout(() => {
      navigate('/recognition');
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageTimer);
      clearTimeout(navTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData.name]);

  useEffect(() => {
    sendClarityEvent(namePages.front, 'artistic-channeling')
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-3xl w-full">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            Seraphine Is Channeling...
          </h1>
          <p className="text-xl text-muted-foreground">
            She is receiving the energies and visualizing your soulmate
          </p>
        </motion.div>

        {/* Card Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 border-primary/30 bg-card/50 backdrop-blur-sm">
            {/* Animação de desenho */}
            <div className="relative mb-12">
              {/* Mão com lápis animado */}
              <motion.div
                className="relative w-64 h-64 mx-auto"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Círculo central pulsante */}
                <motion.div
                  className="absolute inset-0 border-4 border-secondary/30 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Wand (representando lápis místico) */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Wand2 className="w-24 h-24 text-secondary" />
                </motion.div>

                {/* Traços aparecendo progressivamente */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-12 bg-primary/40 rounded-full"
                    style={{
                      left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 40}%`,
                      top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 40}%`,
                      transformOrigin: 'center',
                      transform: `rotate(${(i / 8) * 360}deg)`,
                    }}
                    animate={{
                      scaleY: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  />
                ))}

                {/* Partículas douradas flutuando */}
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1.5 h-1.5 bg-secondary rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
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
              </motion.div>
            </div>

            {/* Mensagens progressivas */}
            <div className="text-center space-y-6">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3"
              >
                <motion.span
                  className="text-4xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {messages[currentMessage].emoji}
                </motion.span>
                <p className="text-xl md:text-2xl font-semibold text-gradient-gold">
                  {messages[currentMessage].text}
                </p>
              </motion.div>

              {/* Progress bar */}
              <div className="space-y-3">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(progress)}% complete
                </p>
              </div>

              {/* Texto motivacional */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-base text-muted-foreground italic max-w-md mx-auto"
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                Seraphine is using her artistic intuition to channel the essence of your soulmate
                <Sparkles className="w-4 h-4 inline ml-2" />
              </motion.p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
