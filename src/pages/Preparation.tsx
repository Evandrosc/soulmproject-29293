import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "@/hooks/useQuizStore";
import { SeraphinaStatus } from "@/components/SeraphinaStatus";
import { ResetQuizButton } from "@/components/ResetQuizButton";
import { BreathingCircle } from "@/components/BreathingCircle";
import { Progress } from "@/components/ui/progress";
import { namePages, sendClarityEvent } from "@/helpers/send-clarity-event";
import { useNavigateWithParams } from "@/hooks/use-navigate-with-params";
import { toast } from "@/hooks/use-toast";

export default function Preparation() {
  const navigate = useNavigateWithParams();
  const { quizData } = useQuizStore();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    console.log('🔍 [Preparation] Montado com estado:', {
      currentStep: 0,
      hasName: Boolean(quizData.name),
      lastVisitedPage: ''
    });

    // Salva a página atual
    const { setLastVisitedPage } = useQuizStore.getState();
    setLastVisitedPage('/preparation');

    // Verifica se tem os dados necessários
    if (!quizData.name) {
      console.error('❌ Preparation: Dados ausentes, redirecionando');
      toast({
        title: "Session incomplete",
        description: "Please complete the quiz first",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    console.log('✅ Preparation iniciado com dados:', { name: quizData.name });

    const tick = 500;      // intervalo de atualização (ms)
    const steps = 17;      // total de etapas até 100%

    // progresso por tick
    const increment = 100 / steps;
    const totalDuration = steps * tick; // duração total em ms

    // intervalo para atualizar progresso
    const countdownInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + increment, 100));
    }, tick);

    // proporções baseadas na duração total
    const timer1 = setTimeout(() => setStep(1), totalDuration * (3 / 17));  // ~18%
    const timer2 = setTimeout(() => setStep(2), totalDuration * (8 / 17));  // ~47%
    const timer3 = setTimeout(() => setStep(3), totalDuration * (12 / 17)); // ~70%
    const timer4 = setTimeout(() => navigate("/artistic-channeling"), totalDuration);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData.name]);

  const messages = [
    `${quizData.name}...`,
    'The universe is aligning the energies...',
    'Take a deep breath... feel the connection forming...',
    'Uncross your legs and arms to open your energy field.',
  ];

  useEffect(() => {
    sendClarityEvent(namePages.front, 'preparation')
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[80px]" />
      </div>

      {/* Seraphina Status */}
      <div className="fixed top-4 right-4 z-50">
        <SeraphinaStatus status="working" />
      </div>

      {/* Reset Button */}
      <div className="fixed top-4 left-4 z-50">
        <ResetQuizButton />
      </div>

      <div className="max-w-2xl w-full text-center space-y-8">
        <BreathingCircle />

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center space-y-8 max-w-2xl mx-auto px-4"
        >
          <motion.p
            className="text-2xl md:text-3xl font-light tracking-wide"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {messages[step]}
          </motion.p>

        </motion.div>

        <div className="space-y-4 mt-8">
          <Progress value={progress} className="w-64 mx-auto" />

          <p className="text-sm text-muted-foreground">
            Preparing your revelation...
          </p>
        </div>
      </div>
    </div>
  );
}
