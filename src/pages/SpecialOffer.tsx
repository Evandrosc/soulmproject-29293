import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Sparkles, Timer, Heart, CheckCircle2 } from 'lucide-react';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';
import { useQuizStore } from '@/hooks/useQuizStore';
import { hybridStorage } from '@/utils/hybridStorage';
import { toast } from '@/hooks/use-toast';

export default function SpecialOffer() {
  const navigate = useNavigateWithParams();
  const { quizData, setLastVisitedPage } = useQuizStore();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLastVisitedPage('/special-offer');

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setLastVisitedPage]);

  const handleApplyCoupon = () => {
    hybridStorage.setItem('applied_coupon', 'COSMICGIFT90');
    toast({ 
      title: "🎁 Gift Applied!", 
      description: "You save 90%! Redirecting..." 
    });
    
    setTimeout(() => {
      navigate('/packages');
    }, 1500);
  };

  const handleSkipCoupon = () => {
    console.log('⚠️ User declined coupon');
    navigate('/packages');
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-20">
      {/* Background místico */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-2xl w-full">
        {/* Título Principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Gift className="w-20 h-20 text-secondary mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            Wait, {quizData.name}!
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground">
            Before revealing the prices... we have a <span className="text-secondary font-bold">SPECIAL GIFT</span> for you
          </p>
        </motion.div>

        {/* Card Principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 border-accent/50 bg-gradient-to-br from-accent/20 to-secondary/20 backdrop-blur-sm">
            <div className="text-center space-y-8">
              {/* Timer de Urgência */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full"
              >
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  <span className="font-bold text-lg">
                    {minutes}:{seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </motion.div>

              {/* Cupom em Destaque */}
              <div className="space-y-4">
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-6 rounded-xl shadow-2xl">
                    <p className="text-sm font-semibold mb-2">EXCLUSIVE CODE</p>
                    <p className="text-4xl font-bold tracking-wider mb-2">COSMICGIFT90</p>
                    <p className="text-2xl font-bold">90% OFF</p>
                  </div>
                  
                  {/* Sparkles ao redor */}
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400" />
                  <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-yellow-400" />
                </motion.div>
              </div>

              {/* Copy Emocional */}
              <div className="space-y-4 max-w-xl mx-auto">
                <h3 className="text-2xl font-bold text-gradient-gold">
                  Why did you receive this gift?
                </h3>
                <ul className="text-left space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-base">
                      <span className="font-semibold text-secondary">Seraphina sensed</span> that you are ready for this revelation and deserve to access it
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-base">
                      Your energy showed <span className="font-semibold text-secondary">genuine dedication</span> throughout the quiz
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-base">
                      This is a <span className="font-semibold text-secondary">one-time opportunity</span> - the discount won't appear again
                    </span>
                  </li>
                </ul>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-4 pt-4">
                <Button
                  onClick={handleApplyCoupon}
                  size="lg"
                  className="w-full gradient-mystical text-xl py-6"
                >
                  <Heart className="w-6 h-6" />
                  Apply Gift & See Prices
                  <Sparkles className="w-6 h-6" />
                </Button>
                
                <Button
                  onClick={handleSkipCoupon}
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  No thanks, I prefer to see the full price
                </Button>
              </div>

              {/* Garantia */}
              <p className="text-sm text-muted-foreground italic">
                This offer is <span className="font-semibold text-secondary">exclusive</span> and won't be shown again. Make the most of this cosmic moment! ✨
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Mensagem Extra */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Card className="p-6 border-primary/30 bg-primary/10">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">12,847 women</span> have already applied this gift and found their soulmate. Don't miss this opportunity! 🌟
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
