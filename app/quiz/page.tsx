
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QuizStep } from '@/components/quiz/QuizStep';
import { useQuizStore } from '@/hooks/useQuizStore';
import { quizSteps } from '@/data/quizSteps';
import { SeraphinaLiveChat } from '@/components/SeraphinaLiveChat';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';
import { toast } from "@/hooks/use-toast";
import { ResetQuizButton } from '@/components/ResetQuizButton';

export default function Quiz() {
  const navigate = useNavigateWithParams();
  const { currentStep, quizData, nextStep, prevStep, updateQuizData, reset, setCurrentStep } = useQuizStore();
  const [showChat, setShowChat] = useState(true);

  // CORREÇÃO: Se já tem nome do chat, pula apenas o step 0 (nome)
  const hasName = Boolean(quizData.name);
  const effectiveStep = hasName && currentStep === 0 ? 1 : currentStep;
  const currentStepData = quizSteps[effectiveStep];

  // GUARD: Se quiz foi completado, redirecionar para results
  useEffect(() => {
    const { isCompleted } = useQuizStore.getState();
    
    if (isCompleted) {
      console.log('🛡️ Quiz já completado - redirecionando para Recognition');
      navigate('/recognition', { replace: true });
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const hasSeenChat = sessionStorage.getItem('hasSeenChat') === 'true';

    console.log('🔍 Quiz - Verificando estado:', {
      hasName,
      currentStep,
      hasSeenChat,
    });

    // Se já tem nome, não mostra mais o chat
    if (quizData.name) {
      setShowChat(false);
    }

    // PROTEÇÃO: Se tem nome mas está no step 0, avançar para step 1
    if (quizData.name && currentStep === 0) {
      console.log('🔧 Ajustando step inicial após ter nome (proteção anti-repetição)');
      setCurrentStep(1);
    }

    // Se já viu chat em sessão anterior, pular para step 1
    if (hasSeenChat && currentStep === 0 && !quizData.name) {
      console.log('⏭️ Chat já foi visto anteriormente, pulando...');
      setCurrentStep(1);
    }
  }, [quizData.name, currentStep, setCurrentStep, navigate]);

  useEffect(() => {
    // Scroll to top when step changes - instant para evitar bugs em mobile
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  const handleNext = (value: any) => {
    console.log('📝 Quiz handleNext:', { 
      field: currentStepData.field, 
      value, 
      currentStep,
      isLastStep: currentStep === quizSteps.length - 1
    });

    // Atualiza os dados
    updateQuizData({ [currentStepData.field]: value });

    // Calcula signo se for data de nascimento
    if (currentStepData.field === 'birthDate') {
      const zodiac = calculateZodiacSign(value);
      updateQuizData({ zodiacSign: zodiac });
    }

    // Se for o último step, vai para preparação
    if (currentStep === quizSteps.length - 1) {
      // Validar dados essenciais (SEM 'gender' que não existe!)
      const currentData = useQuizStore.getState().quizData;
      const requiredFields = ['name', 'birthDate', 'zodiacSign'];
      const missingFields = requiredFields.filter(field => !currentData[field]);

      if (missingFields.length > 0) {
        console.error('❌ Erro: dados incompletos ao finalizar quiz:', missingFields);
        console.log('📊 Estado atual:', currentData);
        
        // Toast destrutivo mostrando campos faltantes
        toast({
          title: "Incomplete data",
          description: `Missing: ${missingFields.join(', ')}. Please restart the quiz.`,
          variant: "destructive"
        });
        return;
      }

      console.log('✅ Quiz completo, navegando para preparation');
      
      // Pequeno delay para garantir persistência do Zustand
      setTimeout(() => {
        navigate('/preparation');
      }, 100);
      return;
    }

    nextStep();
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/');
      return;
    }
    prevStep();
  };

  useEffect(() => {
    sendClarityEvent(namePages.front, `quiz-${currentStep + 1}`)
  }, [currentStep]);

  if (!currentStepData) {
    return null;
  }

  // Mostra o chat ao vivo primeiro (antes de ter o nome)
  if (!hasName && currentStep === 0) {
    return (
      <SeraphinaLiveChat
        userName=""
        onComplete={() => {
          console.log('🎬 Chat completado, indo para step 1 (birthDate)');
          setShowChat(false);
          setCurrentStep(1);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Reset Button */}
      <div className="fixed top-4 right-4 z-50">
        <ResetQuizButton />
      </div>

      {/* Background decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <AnimatePresence mode="wait">
        <QuizStep
          step={currentStepData}
          value={quizData[currentStepData.field]}
          onNext={handleNext}
          onBack={handleBack}
          totalSteps={quizSteps.length - 1}
          currentStepNumber={effectiveStep}
          allQuizData={quizData}
        />
      </AnimatePresence>
    </div>
  );
}

// Função auxiliar para calcular signo
function calculateZodiacSign(birthDate: string): string {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  return 'pisces';
}
