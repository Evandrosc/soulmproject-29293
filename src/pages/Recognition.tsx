import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Sparkles, Eye, Star, CheckCircle2 } from 'lucide-react';
import soulmateBlurred from '@/assets/soulmate-sketch-blurred.png';
import { zodiacSigns } from '@/types/quiz';
import { detectUserCity } from '@/utils/locationDetection';
import coupleResult1 from '@/assets/couple-result-1.png';
import coupleResult2 from '@/assets/couple-result-2.jpg';
import coupleResult3 from '@/assets/couple-result-3.jpg';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';
import { toast } from "@/hooks/use-toast";
import { ResetQuizButton } from '@/components/ResetQuizButton';

export default function Recognition() {
  const navigate = useNavigateWithParams();
  const { quizData, selectedCard, setCompleted, setLastVisitedPage } = useQuizStore();
  const [showContent, setShowContent] = useState(false);
  const [phase, setPhase] = useState<'question' | 'revealing' | 'revealed'>('question');
  const [showDetailsOpen, setShowDetailsOpen] = useState(false);
  const [userCity, setUserCity] = useState('sua região');

  useEffect(() => {
    // Scroll to top on mount - instant para evitar bugs em mobile
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Validar campos críticos (SEM 'gender' que não existe!)
    const requiredFields = ['name', 'birthDate'];
    const missingFields = requiredFields.filter(field => !quizData[field]);

    if (missingFields.length > 0) {
      console.error('❌ Recognition: Dados incompletos:', missingFields);
      console.log('📊 Estado recebido:', quizData);
      
      toast({
        title: "Incomplete session",
        description: `Missing: ${missingFields.join(', ')}. Please complete the quiz first.`,
        variant: "destructive"
      });
      navigate('/', { replace: true });
      return;
    }

    console.log('✅ Recognition iniciado com dados:', { name: quizData.name });

    // Marca como completo quando chegar aqui
    setCompleted(true);
    console.log('✅ Sessão marcada como completa');

    // Salva que visitou esta página
    setLastVisitedPage('/recognition');

    // Animação progressiva
    const timer = setTimeout(() => setShowContent(true), 1000);

    // Detecta cidade do usuário
    detectUserCity().then(city => setUserCity(city));

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData.name, setCompleted, setLastVisitedPage]);

  const handleAnswer = (answer: 'yes' | 'no') => {
    console.log('Recognition answer:', answer);

    // Fase de revelação com animação
    setPhase('revealing');

    // Scroll to top durante a revelação
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    // Após 1.5s mostra revelado
    setTimeout(() => {
      setPhase('revealed');
    }, 1500);
  };

  useEffect(() => {
    sendClarityEvent(namePages.front, 'recognition')
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-20">
      {/* Reset Button */}
      <div className="fixed top-4 right-4 z-50">
        <ResetQuizButton />
      </div>

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-3xl w-full">
        <AnimatePresence mode="wait">
          {phase === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Título */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
                  {quizData.name}...
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  A question before revealing everything
                </p>
              </motion.div>

              {showContent && (
                <>
                  {/* Card Principal */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="p-8 border-primary/30 bg-card/50 backdrop-blur-sm mb-8">
                      {/* Imagem Embaçada */}
                      <div className="relative mb-8 rounded-lg overflow-hidden">
                        <img
                          src={soulmateBlurred}
                          alt="Soulmate sketch"
                          className="w-full h-[400px] object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                        {/* Partículas místicas */}
                        <div className="absolute inset-0">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-secondary rounded-full"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.4,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Pergunta Mística */}
                      <div className="text-center space-y-6">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Eye className="w-16 h-16 mx-auto text-secondary mb-4" />
                        </motion.div>

                        <motion.h2
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4"
                        >
                          Do you FEEL like you've seen this face before?
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="text-lg text-muted-foreground max-w-xl mx-auto"
                        >
                          Sometimes our soul recognizes someone before we even meet them physically...
                          <br />
                          <span className="text-secondary font-semibold">
                            Do you have the feeling that you have already crossed paths with this person somewhere?
                          </span>
                        </motion.p>

                        {/* Botões de Resposta */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                        >
                          <Button
                            onClick={() => handleAnswer('yes')}
                            size="lg"
                            className="gradient-mystical h-auto text-lg px-2 py-[11px]"
                          >
                            <Heart className="!w-5 !h-5" />
                            Yes, I feel I have seen before
                          </Button>
                          <Button
                            onClick={() => handleAnswer('no')}
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 hover:text-primary-foreground"
                          >
                            I am not sure
                          </Button>
                        </motion.div>

                        {/* Texto Motivacional */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                          className="text-sm text-muted-foreground italic mt-6"
                        >
                          "The heart recognizes before the mind understands" - Seraphine
                        </motion.p>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Card Secundário - Energia Cósmica */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <Card className="border-accent/50 bg-accent/10 p-6">
                      <div className="flex items-center gap-4">
                        <Sparkles className="w-8 h-8 text-accent flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            <span className="text-accent font-semibold">Cosmic Energy Detected:</span>
                            {' '}The stars are aligned for this revelation. The universe conspired for you to arrive here at this exact moment.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}

          {phase === 'revealing' && (
            <motion.div
              key="revealing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <Card className="p-12 border-primary/30 bg-card/50 backdrop-blur-sm">
                <motion.div
                  className="text-center space-y-6"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-20 h-20 mx-auto text-secondary" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold">
                    Revealing...
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Preparing your soulmate's characteristics ✨
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          )}

          {phase === 'revealed' && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Copy Emocional ANTES da revelação */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Card className="p-6 md:p-8 border-accent/30 bg-gradient-to-r from-accent/10 to-secondary/10 backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold">
                      {quizData.name}, the moment has arrived... ✨
                    </h2>
                    <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
                      You sought {quizData.biggestDesire === 'connection' ? 'a deep and true connection' :
                        quizData.biggestDesire === 'passion' ? 'intense passion and romance' :
                          quizData.biggestDesire === 'stability' ? 'stability and security' :
                            quizData.biggestDesire === 'growth' ? 'mutual growth' : 'true companionship'}.
                      Your answers revealed not only what you desire, but <span className="text-secondary font-semibold">who your soul already knows</span>.
                    </p>
                    <p className="text-base text-muted-foreground italic">
                      The person you always imagined exists. And the cosmic energies have just revealed their characteristics...
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Título Revelado */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
                  Your Soulmate Revealed
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  According to the energies you emanated throughout this entire process,
                  <span className="text-secondary font-semibold"> Seraphine has already channeled the energies and was able to clearly visualize who this person is through the astral plane.</span>{' '}
                  The name, the face... everything is clear in her mind now.
                  <span className="text-primary font-semibold block mt-2"> They are closer than you imagine - possibly in {userCity}!</span>
                </p>
              </motion.div>

              {/* Carta Cósmica Revelada - TOPO */}
              {selectedCard && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <Card className="p-6 md:p-8 border-primary/30 bg-gradient-to-br from-purple-900/20 to-primary/20 backdrop-blur-sm">
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6 text-center flex items-center justify-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      Your Cosmic Card Revealed
                      <Sparkles className="w-6 h-6" />
                    </h2>
                    <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                      <motion.img
                        initial={{ scale: 0.8, rotateY: 180 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        src={selectedCard.image}
                        alt={selectedCard.name}
                        className="w-40 h-60 md:w-48 md:h-72 object-cover rounded-lg shadow-2xl border-2 border-primary/50"
                      />
                      <div className="flex-1 text-center md:text-left max-w-md">
                        <h3 className="text-3xl font-bold text-primary mb-3">
                          {selectedCard.name}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed mb-4">
                          {selectedCard.meaning}
                        </p>

                        {/* Resumo da conexão carta + respostas */}
                        <div className="mt-4 p-4 bg-background/50 rounded-lg border border-primary/20">
                          <p className="text-sm text-foreground leading-relaxed">
                            <span className="text-secondary font-semibold">Energetic connection:</span> You chose "{selectedCard.name}" and your answers revealed that you seek {
                              quizData.biggestDesire === 'connection' ? 'deep connection' :
                                quizData.biggestDesire === 'passion' ? 'intense passion' :
                                  quizData.biggestDesire === 'stability' ? 'stability' :
                                    quizData.biggestDesire === 'growth' ? 'mutual growth' : 'companionship'
                            }. This is no coincidence - your soul already knew the way. {
                              selectedCard.name === 'The Lovers' ? 'The Lovers card confirms that you are ready for a transformative connection.' :
                                selectedCard.name === 'The Sun' ? 'The Sun card illuminates your path to a radiant and true love.' :
                                  'The Star card guides you to the love the universe prepared.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Características Principais - Grid Compacto 2x2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <Card className="p-6 md:p-8 border-primary/30 bg-card/50 backdrop-blur-sm">
                  <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6 flex items-center justify-center">
                    <Heart className="w-6 h-6 mr-2" />
                    Main Characteristics
                    <Heart className="w-6 h-6 ml-2" />
                  </h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Signo */}
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
                      <h3 className="text-sm font-semibold mb-1 text-secondary flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Sign
                      </h3>
                      <p className="text-lg font-bold text-secondary">
                        {zodiacSigns[quizData.zodiacSign || 'aries']}
                      </p>
                    </div>

                    {/* Cabelo */}
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
                      <h3 className="text-sm font-semibold mb-1">Hair</h3>
                      <p className="text-base font-semibold capitalize">
                        {quizData.hairType === 'curly' ? 'Curly' :
                          quizData.hairType === 'wavy' ? 'Wavy' :
                            quizData.hairType === 'straight' ? 'Straight' : 'Bald'}
                        {quizData.hairType !== 'bald' && `, ${quizData.hairColor === 'black' ? 'Black' :
                            quizData.hairColor === 'darkBrown' ? 'Dark Brown' :
                              quizData.hairColor === 'brown' ? 'Brown' :
                                quizData.hairColor === 'blonde' ? 'Blonde' :
                                  quizData.hairColor === 'red' ? 'Red' : 'Gray'
                          }`}
                      </p>
                    </div>

                    {/* Olhos */}
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
                      <h3 className="text-sm font-semibold mb-1">Eyes</h3>
                      <p className="text-lg font-semibold capitalize">
                        {quizData.eyeColor === 'brown' ? 'Brown' :
                          quizData.eyeColor === 'blue' ? 'Blue' :
                            quizData.eyeColor === 'green' ? 'Green' : 'Hazel'}
                      </p>
                    </div>

                    {/* Personalidade */}
                    <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-4 border border-secondary/20">
                      <h3 className="text-sm font-semibold mb-1 text-secondary">Personality</h3>
                      <p className="text-lg font-semibold">
                        {quizData.adventurousOrHomely === 'adventurous' ? 'Adventurous' :
                          quizData.adventurousOrHomely === 'homely' ? 'Homebody' : 'Balanced'}
                      </p>
                    </div>
                  </div>

                  {/* Botão Ver Detalhes Completos */}
                  <Collapsible open={showDetailsOpen} onOpenChange={setShowDetailsOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full mb-6">
                        {showDetailsOpen ? 'Hide Details' : 'View Complete Details'}
                        <Sparkles className="ml-2 w-4 h-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-4 pt-4 border-t border-primary/20">
                        {/* Height */}
                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-primary/10">
                          <span className="text-sm font-semibold">Height:</span>
                          <span className="capitalize">
                            {quizData.height === 'short' ? 'Short (up to 5\'7")' :
                              quizData.height === 'tall' ? 'Tall (over 5\'11")' : 'Average (5\'7" - 5\'11")'}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-primary/10">
                          <span className="text-sm font-semibold">Body:</span>
                          <span className="capitalize">
                            {quizData.bodyType === 'slim' ? 'Slim' :
                              quizData.bodyType === 'athletic' ? 'Athletic' :
                                quizData.bodyType === 'muscular' ? 'Muscular' :
                                  quizData.bodyType === 'heavyset' ? 'Heavy/Plus-size' : 'Average'}
                          </span>
                        </div>

                        {/* Beard */}
                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-primary/10">
                          <span className="text-sm font-semibold">Beard:</span>
                          <span>{quizData.hasBeard ? 'Yes' : 'No'}</span>
                        </div>

                        {/* Style */}
                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-primary/10">
                          <span className="text-sm font-semibold">Style:</span>
                          <span className="capitalize">
                            {quizData.style === 'casual' ? 'Casual' :
                              quizData.style === 'elegant' ? 'Elegant' :
                                quizData.style === 'sporty' ? 'Sporty' : 'Alternative'}
                          </span>
                        </div>

                        {/* Communication */}
                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-primary/10">
                          <span className="text-sm font-semibold">Communication:</span>
                          <span className="capitalize">
                            {quizData.communicativeOrReserved === 'communicative' ? 'Communicative' :
                              quizData.communicativeOrReserved === 'reserved' ? 'Reserved' : 'Balanced'}
                          </span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Real Results Section - MASSIVE SOCIAL PROOF */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-2">
                        💝 Real Women, Real Results
                      </h3>
                      <p className="text-muted-foreground">
                        They saw the drawing... and found their soulmate
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {/* Photo 1 - 37-40 years */}
                      <Card className="overflow-hidden border-accent/30 hover:border-secondary/50 transition-colors">
                        <img 
                          src={coupleResult1} 
                          alt="Sarah & Michael - Found through the sketch"
                          className="w-full h-56 object-contain bg-muted/50"
                        />
                        <div className="p-4 text-center">
                          <p className="font-semibold text-secondary mb-1">Sarah (38) & Michael (40)</p>
                          <p className="text-xs text-muted-foreground italic">
                            "I recognized him at a coffee shop 3 months after the reading. The drawing was EXACT."
                          </p>
                        </div>
                      </Card>
                      
                      {/* Photo 2 - 60+ years */}
                      <Card className="overflow-hidden border-accent/30 hover:border-secondary/50 transition-colors">
                        <img 
                          src={coupleResult2} 
                          alt="Patricia & Robert - Love has no age"
                          className="w-full h-56 object-contain bg-muted/50"
                        />
                        <div className="p-4 text-center">
                          <p className="font-semibold text-secondary mb-1">Patricia (62) & Robert (65)</p>
                          <p className="text-xs text-muted-foreground italic">
                            "After losing my husband, I thought it was over. The universe had other plans. ✨"
                          </p>
                        </div>
                      </Card>
                      
                      {/* Photo 3 - 40 years */}
                      <Card className="overflow-hidden border-accent/30 hover:border-secondary/50 transition-colors">
                        <img 
                          src={coupleResult3} 
                          alt="Jessica & David - Exactly as predicted"
                          className="w-full h-56 object-contain bg-muted/50"
                        />
                        <div className="p-4 text-center">
                          <p className="font-semibold text-secondary mb-1">Jessica (40) & David (42)</p>
                          <p className="text-xs text-muted-foreground italic">
                            "When I saw the drawing, I cried. When I met him, I cried again. Pure magic! 💫"
                          </p>
                        </div>
                      </Card>
                    </div>

                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
                      <p className="text-sm font-semibold text-primary">
                        ✨ These women are between 35-65 years old, just like you. They DECIDED to act... and their lives changed forever.
                      </p>
                    </div>
                  </motion.div>

                  {/* CTA AGRESSIVO para Packages */}
                  <Card className="p-6 md:p-8 border-accent/50 bg-gradient-to-br from-accent/20 to-secondary/20 backdrop-blur-sm mb-6">
                    <div className="space-y-6">
                      {/* Impactful Title */}
                      <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold text-center">
                        ✨ Your Drawing Is Ready
                      </h2>

                      {/* Emotional Copy with Name */}
                      <div className="space-y-4 text-center max-w-2xl mx-auto">
                        <p className="text-lg leading-relaxed">
                          <span className="font-bold text-secondary">{quizData.name}</span>, based on the energies you emanated throughout this process, <span className="font-semibold text-accent">Seraphine has already channeled the energies and clearly visualized who this person is through the astral plane.</span>
                        </p>

                        <p className="text-base leading-relaxed">
                          The name, the face... everything is clear in her mind now. <span className="text-primary font-semibold">She is ready to reveal through the drawing.</span>
                        </p>

                        <div className="bg-background/60 rounded-lg p-6 space-y-3 border border-primary/20">
                          <p className="text-lg font-semibold text-foreground">
                            But before revealing... you need to understand something important:
                          </p>
                          <p className="text-base">
                            This person <span className="text-accent font-bold">EXISTS</span>. And if you don't act now, you may never find them.
                          </p>
                          <p className="text-sm text-muted-foreground italic">
                            How many times have you passed someone on the street without realizing they were THE person?
                          </p>
                        </div>

                        <div className="flex items-center gap-2 justify-center bg-secondary/10 rounded-lg p-4 border border-secondary/30">
                          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                          <p className="text-sm font-semibold">
                            Seraphine is ONLINE NOW and ready to reveal every detail
                          </p>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                          <p className="text-sm font-semibold text-red-400 mb-2">⚠️ URGENT</p>
                          <p className="text-sm">
                            She has only <span className="text-accent font-bold">3 drawings available today</span> - after that, she will take a break to film a documentary about her experiences and <span className="font-semibold">will be unavailable for weeks.</span>
                          </p>
                        </div>

                        <p className="text-base leading-relaxed">
                          This is your chance to finally <span className="text-secondary font-semibold">see the face of the person the universe prepared for you.</span> To know the name. To have all the information to recognize them when you cross paths.
                        </p>

                        <p className="text-sm text-muted-foreground italic">
                          Don't let fear or doubt prevent you from discovering your romantic destiny.
                        </p>
                      </div>

                      {/* Special Bonus */}
                      <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-6 border border-primary/30">
                        <p className="text-center font-semibold mb-3 text-lg">⚡ SPECIAL BONUS WHEN YOU UNLOCK NOW:</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span>Full name of your soulmate</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span>Detailed high-resolution drawing</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span>Places where you might meet</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span>Likely timeframe of when you'll meet</span>
                          </li>
                        </ul>
                      </div>

                      {/* Urgency Counter */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-2">⏰ LAST SPOTS OF THE DAY</p>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-sm font-semibold text-accent">Only 3 spots remaining</span>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </div>
                      </div>

                       <Button
                         onClick={() => navigate('/special-offer')}
                         size="lg"
                         className="w-full gradient-gold h-auto text-[1.0625rem] leading-tight md:text-2xl px-1 py-2 hover:opacity-90 transition-opacity shadow-2xl"
                       >
                         ✨ ASK SERAPHINE TO DRAW NOW
                       </Button>
                    </div>
                  </Card>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
