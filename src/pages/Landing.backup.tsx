import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Heart, Star, Users, Clock, TrendingUp } from 'lucide-react';
import { SeraphinaIntro } from '@/components/SeraphinaIntro';
import { useQuizStore } from '@/hooks/useQuizStore';
import { useState, useEffect } from 'react';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';
export default function Landing() {
  const navigate = useNavigateWithParams();
  const { quizData, currentStep, reset } = useQuizStore();
  const [timeLeft, setTimeLeft] = useState(847); // ~14 minutos em segundos
  const [drawingsToday] = useState(Math.floor(Math.random() * 12) + 23); // 23-34 desenhos
  const [peopleOnline] = useState(Math.floor(Math.random() * 8) + 15); // 15-22 pessoas

  // Countdown timer com reset para +10 min
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) return prev - 1;
        // Quando chegar a 0, resetar para 10 minutos (637 segundos - número quebrado)
        return 637;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const handleStartQuiz = () => {
    // Se já começou o quiz, continua de onde parou
    if (quizData.name || currentStep > 0) {
      navigate('/quiz');
    } else {
      console.log('🚀 Iniciando novo quiz...');
      // Limpa qualquer dado anterior
      reset();
      // Vai para a fila de espera primeiro
      setTimeout(() => {
        navigate('/queue');
      }, 100);
    }
  };
  return <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <Sparkles className="w-16 h-16 text-secondary animate-pulse" />
          </div>

          {/* Badge 100% Gratuito - DESTAQUE MÁXIMO */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/30 blur-xl rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-r from-secondary to-accent border-2 border-secondary px-8 py-3 rounded-full shadow-[0_0_30px_hsl(45_95%_60%/0.5)]">
                <span className="text-xl font-bold text-background">🎁 100% GRATUITO</span>
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Descubra o Rosto da Sua{' '}
            <span className="text-gradient-gold">Alma Gêmea</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Não foi por acaso que você chegou até aqui ✨
          </p>

          <p className="text-lg text-muted-foreground mb-6">
            Eu sou <span className="text-primary font-semibold">Seraphina</span>, e em 2024 fiquei conhecida por uma coisa:{' '}
            <span className="text-secondary font-semibold">visualizar o rosto da alma gêmea</span>{' '}
            de milhares de mulheres... em menos de 3 minutos.
          </p>

          {/* Badges adicionais */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/50 px-4 py-2 rounded-full animate-pulse">
              <span className="text-sm font-bold text-accent">🔥 Última Chance Hoje</span>
            </div>
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 px-4 py-2 rounded-full">
              <span className="text-sm font-bold text-secondary">⚡ Vagas Limitadas</span>
            </div>
          </div>
        </motion.div>

        {/* Apresentação da Seraphina */}
        <SeraphinaIntro />

        {/* Urgency Banner */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="max-w-4xl mx-auto mb-4 mt-12">
          <Card className="border-accent/50 bg-accent/10 backdrop-blur-sm">
            <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-accent">
                    ⚠️ Seraphina ficará offline em: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Após esse tempo, novas leituras só amanhã
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-muted-foreground">
                  <span className="font-bold text-secondary">{drawingsToday} desenhos</span> nas últimas 24h
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Fila de Espera */}
        <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="max-w-4xl mx-auto mb-8">
          <Card className="border-secondary/50 bg-secondary/10 backdrop-blur-sm">
            <div className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-secondary">Disponível agora</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-accent">2 desenhos</span> restantes
                </span>
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">
                {peopleOnline} online
              </span>
            </div>
          </Card>
        </motion.div>

        {/* CTA Button */}
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="text-center max-w-4xl mx-auto mb-16">
          <Button onClick={handleStartQuiz} size="lg" className="gradient-mystical text-lg px-12 py-7 hover:opacity-90 transition-opacity duration-300">
            {quizData.name || currentStep > 0 ? 'Continuar Meu Desenho' : 'Quero Ver Minha Alma Gêmea'} <Heart className="ml-2 w-6 h-6" />
          </Button>
        </motion.div>

        {/* Social Proof */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-secondary" />
              <span className="text-2xl font-bold text-gradient-gold">
                +12.847 mulheres já visualizaram
              </span>
            </div>
            <p className="text-muted-foreground">
              E muitas delas encontraram esse rosto logo depois...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3 + index * 0.1
          }}>
                <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary transition-all">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-sm font-semibold text-primary">
                    {testimonial.name}
                  </p>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 0.5
      }} className="max-w-2xl mx-auto text-center mb-8">
          <Button onClick={handleStartQuiz} size="lg" className="gradient-mystical text-lg px-12 py-7 hover:opacity-90 transition-opacity duration-300 mb-8">
            Quero Ver Minha Alma Gêmea <Heart className="ml-2 w-6 h-6" />
          </Button>

          <Card className="p-8 border-accent/50 bg-accent/10">
            <h3 className="text-2xl font-bold mb-4 text-accent">
              ⚠️ Aviso Importante
            </h3>
            <p className="text-lg mb-2">
              Algumas choram 😢 Outras se arrepiam 🫣
            </p>
            <p className="text-muted-foreground">
              Mas todas dizem a mesma coisa:{' '}
              <span className="text-foreground font-semibold">
                "Era como se eu já conhecesse aquela pessoa."
              </span>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>;
}
const testimonials = [{
  name: 'Mayara S.',
  text: 'Eu não acreditava... mas quando vi o desenho, chorei. Era EXATAMENTE como eu sempre imaginei. E conheci ele 2 semanas depois!'
}, {
  name: 'Carolina M.',
  text: 'A precisão é assustadora! Os olhos, o sorriso... tudo bateu. Agora estou num relacionamento incrível.'
}, {
  name: 'Juliana P.',
  text: 'Achei que fosse coincidência, mas quando mostrei pro meu namorado ele ficou em choque. Era literalmente ele há 5 anos atrás.'
}];