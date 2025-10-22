import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CosmicCardSelection } from '@/components/CosmicCardSelection';
import { SeraphinaIntro } from '@/components/SeraphinaIntro';
import { SeraphinaStatus } from '@/components/SeraphinaStatus';
import { Card } from '@/components/ui/card';
import { Sparkles, Star, Play, RotateCcw, Heart } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { quizSteps } from '@/data/quizSteps';
import cosmicLovers from '@/assets/tarot-lovers-mystical.jpg';
import cosmicSun from '@/assets/tarot-sun-mystical.jpg';
import cosmicStar from '@/assets/tarot-star-mystical.jpg';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { ResetQuizButton } from '@/components/ResetQuizButton';


export default function Landing() {
  const navigate = useNavigateWithParams();
  const { quizData, currentStep, reset, setSelectedCard, selectedCard, isCompleted, lastVisitedPage, chatMessages, chatPhase } = useQuizStore();

  const cosmicCards = [
    { 
      image: cosmicLovers, 
      name: 'The Lovers',
      meaning: 'Deep connections and choices of the heart'
    },
    { 
      image: cosmicSun, 
      name: 'The Sun',
      meaning: 'Joy, success and illumination in love'
    },
    { 
      image: cosmicStar, 
      name: 'The Star',
      meaning: 'Hope, divine guidance and renewal'
    },
  ];

  // Detecta se tem dados salvos
  const hasData = Boolean(quizData.name || currentStep > 0 || selectedCard);
  const hasProgress = currentStep > 0 || (quizData.name && currentStep === 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Log detalhado do estado para debug
    const storageData = sessionStorage.getItem('soulmate-quiz-storage') || localStorage.getItem('soulmate-quiz-storage');
    
    console.log('🔍 Landing - Estado da sessão:', {
      hasData,
      isCompleted,
      currentStep,
      hasName: Boolean(quizData.name),
      hasProgress,
      quizDataName: quizData.name,
      selectedCard: selectedCard?.name,
      storageRaw: storageData ? JSON.parse(storageData) : null
    });
  }, [hasData, isCompleted, currentStep, quizData.name, hasProgress, selectedCard]);

  const handleCardSelected = (cardIndex: number) => {
    const card = cosmicCards[cardIndex];
    setSelectedCard(card);
    console.log('🎴 Carta selecionada:', card.name);
    
    // Verificar se já passou pelo chat antes
    const hasSeenChat = sessionStorage.getItem('hasSeenChat') === 'true';
    console.log('🔍 [handleCardSelected] hasSeenChat:', hasSeenChat);
    
    if (hasSeenChat) {
      console.log('⏭️ Usuário já viu chat, indo direto para quiz');
      navigate('/quiz');
    } else {
      console.log('🎭 Primeira vez, indo para fila do chat');
      navigate('/queue');
    }
  };

  const handleContinue = () => {
    console.log('🔍 handleContinue - Estado completo:', {
      isCompleted,
      currentStep,
      totalSteps: quizSteps.length,
      lastVisitedPage,
      selectedCard: selectedCard?.name,
      hasMinimalData: Boolean(quizData.name && quizData.birthDate)
    });

    // ========================================
    // PRIORITY 1: Quiz em progresso (qualquer step 1-23)
    // ========================================
    if (currentStep > 0 && !isCompleted) {
      console.log(`📝 [P1] Quiz em progresso - navegando para step ${currentStep}/${quizSteps.length - 1}`);
      navigate('/quiz');
      return;
    }

    // ========================================
    // PRIORITY 2: Quiz completado
    // ========================================
    if (isCompleted) {
      console.log('✅ [P2] Quiz completado');
      
      if (lastVisitedPage && ['/packages', '/downsell1', '/downsell2', '/thank-you'].includes(lastVisitedPage)) {
        console.log(`➡️ Voltando para: ${lastVisitedPage}`);
        navigate(lastVisitedPage);
        return;
      }
      
      console.log('➡️ Indo para Recognition (que leva para packages)');
      navigate('/recognition');
      return;
    }

    // ========================================
    // PRIORITY 3: Estava no meio do chat
    // ========================================
    // Se tem nome e mensagens no chat, mas ainda não começou quiz
    // Volta direto para o chat, pula a fila
    if (quizData.name && currentStep === 0 && (chatMessages.length > 0 || chatPhase !== 'intro')) {
      console.log('💬 [P3] Estava no chat, voltando direto (pula fila)');
      navigate('/chat');
      return;
    }

    // ========================================
    // PRIORITY 4: Completou chat totalmente
    // ========================================
    // Se tem nome mas step 0 e não tem mensagens (chat completado)
    // Vai para o quiz
    if (quizData.name && currentStep === 0) {
      console.log('📝 [P4] Completou chat, iniciando quiz');
      navigate('/quiz');
      return;
    }

    // ========================================
    // PRIORITY 5: Última página visitada (exceto queue/chat)
    // ========================================
    // Não voltar para queue ou chat se já passou por eles
    if (lastVisitedPage && lastVisitedPage !== '/' && 
        lastVisitedPage !== '/queue' && lastVisitedPage !== '/chat') {
      console.log(`📍 [P5] Voltando para última página: ${lastVisitedPage}`);
      navigate(lastVisitedPage);
      return;
    }

    // ========================================
    // PRIORITY 6: Fallback - começar do início
    // ========================================
    console.log('🆕 [P6] Sem progresso, começando do início');
    navigate('/queue');
  };

  const handleStartNew = () => {
    console.log('🔄 Iniciando nova leitura...');
    
    // Marcar que já viu o chat (para pular na próxima vez)
    if (quizData.name) {
      sessionStorage.setItem('hasSeenChat', 'true');
      console.log('✅ Flag hasSeenChat marcada - próxima vez vai pular chat e fila');
    }
    
    // Reseta completamente
    reset();
    
    // Forçar reload para garantir estado limpo
    window.location.reload();
  };

  useEffect(() => {
    sendClarityEvent(namePages.front)
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
        {/* Reset Button */}
        <div className="fixed top-4 right-4 z-50">
          <ResetQuizButton />
        </div>

        {/* Background suave */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/95">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero simples */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
        >
          <div className="inline-block mb-4 md:mb-6">
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-primary" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Discover Who Your Soulmate Really Is
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
            Reveal the exact face and appearance of your one true love
          </p>

          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
            For over 15 years, I have been channeling energies to help thousands find their soulmates. Today, something very special brought you here...
          </p>
        </motion.div>

        {/* Apresentação da Seraphina */}
        <SeraphinaIntro />

        {/* Card de retorno quando tem progresso */}
        {hasData && !isCompleted && hasProgress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-8 px-4"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-12 h-12 mx-auto text-primary" />
                </motion.div>
                
                <h3 className="text-2xl md:text-3xl font-bold">
                  Welcome back, {quizData.name || 'dear'}! ✨
                </h3>
                
                <p className="text-muted-foreground">
                  I sensed your energy returning. Would you like to continue where you left off?
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button 
                    onClick={handleContinue} 
                    size="lg"
                    className="gradient-mystical"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Continue My Journey
                    <Heart className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={handleStartNew} 
                    variant="outline"
                    size="lg"
                    className="border-2"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Start New Reading
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Seraphina Status Online - Só mostra se não tem progresso */}
        {!hasData && !isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <SeraphinaStatus status="online" />
          </motion.div>
        )}

        {/* Copy sobre Chat ao Vivo - Só mostra se não tem progresso e não selecionou carta */}
        {!hasData && !isCompleted && !selectedCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mb-8 px-4"
          >
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <div className="text-center space-y-3">
                <Sparkles className="w-10 h-10 mx-auto text-primary" />
                <h3 className="text-xl md:text-2xl font-bold">
                  You will speak LIVE with Seraphine!
                </h3>
                <p className="text-muted-foreground">
                  After choosing your card, you will have an exclusive conversation where she will channel the image of your soulmate in real time.
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* CENÁRIO B: Já completou → Mensagem de boas-vindas */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8 px-4"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <h3 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-4 text-center">
                Welcome back, {quizData.name}! ✨
              </h3>
              <p className="text-muted-foreground mb-6 text-center">
                Your soulmate drawing is ready! Would you like to see it again?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    // Redireciona baseado na última página visitada
                    if (lastVisitedPage === '/packages') {
                      navigate('/packages');
                    } else {
                      navigate('/recognition');
                    }
                  }}
                  size="lg"
                  className="gradient-mystical"
                >
                  View My Drawing
                </Button>
                <Button
                  onClick={() => {
                    console.log('🔄 Iniciando nova leitura...');
                    reset();
                    window.location.reload();
                  }}
                  variant="outline"
                  className="border-primary/30"
                >
                  Start New Reading
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Call to Action antes das cartas - CENÁRIO A: Primeira vez */}
        {!hasData && !selectedCard && !isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-6 px-4"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                y: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/50 rounded-full px-8 py-4">
                <p className="text-xl md:text-2xl font-bold text-gradient-gold">
                  ✨ Choose your card to begin ✨
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Seleção de Cartas - CENÁRIO A: só mostra se NÃO tem progresso */}
        {!hasData && !isCompleted && <CosmicCardSelection onCardSelected={handleCardSelected} />}

        {/* Depoimentos simples */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }} 
          className="max-w-4xl mx-auto mb-8 md:mb-12 mt-8 md:mt-12 px-4"
        >
          <p className="text-center text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
            Join thousands of people who have already met their soulmate:
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 md:p-5 border-border/50 bg-card/30">
              <div className="flex items-center gap-1 mb-2 md:mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-primary/70 text-primary/70" />
                ))}
              </div>
              <p className="text-xs md:text-sm mb-2 md:mb-3 text-muted-foreground italic">
                "I could not believe when I met him. Every detail matched exactly what Seraphine showed me. It was magical!"
              </p>
              <p className="text-xs md:text-sm font-medium">
                Sarah M., 28
              </p>
            </Card>

            <Card className="p-4 md:p-5 border-border/50 bg-card/30">
              <div className="flex items-center gap-1 mb-2 md:mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-primary/70 text-primary/70" />
                ))}
              </div>
              <p className="text-xs md:text-sm mb-2 md:mb-3 text-muted-foreground italic">
                "The precision was frightening! The drawing helped me recognize him when we met. I am eternally grateful."
              </p>
              <p className="text-xs md:text-sm font-medium">
                Amanda L., 32
              </p>
            </Card>

            <Card className="p-4 md:p-5 border-border/50 bg-card/30">
              <div className="flex items-center gap-1 mb-2 md:mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-primary/70 text-primary/70" />
                ))}
              </div>
              <p className="text-xs md:text-sm mb-2 md:mb-3 text-muted-foreground italic">
                "After seeing the drawing, I recognized him in 3 months. Today we live together and plan to get married!"
              </p>
              <p className="text-xs md:text-sm font-medium">
                Julia K., 26
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Nota final */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }} 
          className="max-w-2xl mx-auto text-center mb-6 md:mb-8 px-4"
        >
          <Card className="p-4 md:p-6 border-border/50 bg-card/30">
            <p className="text-xs md:text-sm text-muted-foreground">
              ✨ This is not just a drawing. It is an energetic manifestation that will help you recognize your soulmate when the time comes. Trust the universe.
            </p>
          </Card>
        </motion.div>
        </div>
      </div>
  );
}