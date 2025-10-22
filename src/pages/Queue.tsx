import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import seraphinaPortrait from '@/assets/seraphina-portrait.jpg';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';
import { useQuizStore } from '@/hooks/useQuizStore';

export default function Queue() {
  const navigate = useNavigateWithParams();
  const { setLastVisitedPage } = useQuizStore();
  const [queuePosition, setQueuePosition] = useState(1); // Começa com 1 pessoa
  const [timeLeft, setTimeLeft] = useState(12); // 12 segundos total
  const [phase, setPhase] = useState<'waiting' | 'ready'>('waiting');

  useEffect(() => {
    // Reduz a posição na fila
    if (queuePosition > 0) {
      const queueTimer = setTimeout(() => {
        setQueuePosition(prev => prev - 1);
      }, 7000); // 7s para a pessoa 1
      return () => clearTimeout(queueTimer);
    } else if (phase === 'waiting') {
      // Quando chegar a 0, muda para "ready" e fica 5s antes de avançar
      setPhase('ready');
    }
  }, [queuePosition, phase]);

  useEffect(() => {
    // Countdown de 12 segundos
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Após 12 segundos, redireciona para o chat
      console.log('⏱️ Tempo acabou, redirecionando para chat');
      setTimeout(() => {
        navigate('/chat', { replace: true });
      }, 200);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    console.log('🔍 [Queue] Montado');
    setLastVisitedPage('/queue');
    sendClarityEvent(namePages.front, 'queue');
  }, [setLastVisitedPage]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-2xl w-full space-y-8">
        {/* Foto da Seraphina */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                  '0 0 40px rgba(168, 85, 247, 0.6)',
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full overflow-hidden w-32 h-32"
            >
              <img
                src={seraphinaPortrait}
                alt="Seraphine"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Online indicator */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-background rounded-full"
            />
          </div>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary/30">
            <div className="text-center space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Sparkles className="w-12 h-12 text-primary" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Connecting with Seraphine...</h2>
                <div className="space-y-1">
                  <p className="text-secondary font-semibold flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Seraphine is ONLINE
                  </p>
                  <p className="text-muted-foreground text-sm">
                    You're about to speak with her live
                  </p>
                </div>
              </div>

              {/* Fila de espera */}
              {queuePosition > 0 ? (
                <motion.div
                  key={queuePosition}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-accent">
                      {queuePosition} {queuePosition === 1 ? 'person' : 'people'} ahead of you
                    </span>
                  </div>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="text-xl font-semibold text-primary">
                    ✨ You're next!
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block"
                  >
                    <div className="flex items-center justify-center gap-2 text-lg">
                      <Clock className="w-5 h-5 text-secondary" />
                      <span className="font-semibold text-secondary">
                        Starting in {timeLeft}s...
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Barra de progresso */}
              <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((12 - timeLeft) / 12) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <p className="text-sm text-muted-foreground">
                Please wait while we prepare your energetic connection...
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
