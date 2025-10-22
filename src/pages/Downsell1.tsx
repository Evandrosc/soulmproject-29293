import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, CheckCircle, AlertTriangle, Sparkles, Heart, Lock, Shield } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { Button } from '@/components/ui/button';

export default function Downsell1() {
  const { quizData } = useQuizStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    sendClarityEvent(namePages.dws1)
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="mb-6"
          >
            <Card className="border-red-500/50 bg-red-500/10 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-red-400 font-bold">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
                <span>WAIT! Before you leave this page...</span>
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 space-y-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gradient-gold">
              OK {quizData.name}, I DON'T NORMALLY DO THIS...
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-semibold">
              But I feel you NEED this information 🔮
            </p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Lock className="w-12 h-12 text-accent mx-auto" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="border-secondary/50 bg-gradient-to-br from-secondary/10 to-accent/10 p-8 md:p-12 relative overflow-hidden">
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold"
              >
                ⚠️ LAST CHANCE
              </motion.div>

              <div className="pt-8 text-center mb-6">
                <Calendar className="w-16 h-16 mx-auto text-secondary mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  You Can Still Discover <span className="text-gradient-gold">WHEN</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  But with a discount I shouldn't be offering...
                </p>
              </div>

              <div className="bg-accent/10 rounded-lg p-6 mb-6 border border-accent/30">
                <p className="text-center italic text-base md:text-lg leading-relaxed">
                  "{quizData.name}, in 15 years channeling soulmates, I've learned one thing: people who <strong>know WHEN</strong> they'll meet their love have <strong>3x more chances of recognizing the moment</strong> when it arrives. They don't miss it. They're ready. I don't want you spending the rest of your life wondering 'what if I had accepted?'..."
                </p>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  — Seraphine ✨
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-center">You STILL Get All This:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ Exact Temporal Prediction</p>
                      <p className="text-sm text-muted-foreground">Month and year when the universe will align your meeting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ Personalized Audio from Seraphine (10min)</p>
                      <p className="text-sm text-muted-foreground">Guided meditation to prepare your energy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ Preparation Guide</p>
                      <p className="text-sm text-muted-foreground">How to be energetically ready for the right moment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ 3 First Meeting Scenarios</p>
                      <p className="text-sm text-muted-foreground">Visualize the most probable possibilities</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="bg-background/70 rounded-lg p-6 mb-4 border border-primary/20">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Original Price</p>
                      <p className="text-2xl text-muted-foreground line-through">$79</p>
                    </div>
                    <Sparkles className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Previous Offer</p>
                      <p className="text-2xl text-yellow-500 line-through">$27</p>
                    </div>
                  </div>
                  <div className="border-t border-accent/30 pt-4">
                    <p className="text-sm text-accent font-semibold mb-2">FINAL DISCOUNT (Exclusive to this page)</p>
                    <p className="text-5xl md:text-6xl font-bold text-gradient-gold mb-2">$19.90</p>
                    <div className="inline-block bg-green-500/20 border border-green-500/50 rounded-full px-4 py-2">
                      <p className="text-green-400 font-bold">
                        You Save $59.10 (74% OFF)
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm text-red-400 font-semibold"
                >
                  ⚠️ This discount will NOT be available after this page
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-green-500/10 rounded-lg p-5 mb-6 text-center border-2 border-green-500/30"
              >
                <Shield className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <p className="text-base font-bold text-green-500 mb-1">Zero Risk For You</p>
                <p className="text-sm text-muted-foreground">
                  If you don't feel more prepared and confident within 30 days,
                  we refund 100% of your investment. No questions, no bureaucracy.
                </p>
              </motion.div>

              <div className="space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-auto gradient-gold text-[1.0625rem] leading-tight md:text-xl py-2 hover:opacity-90 animate-pulse-glow"
                >
                  <a href={import.meta.env.VITE_OFFER_DWS1_ACCEPTED_YES}>
                    <Heart className="!w-6 !h-6" />
                    YES! I Accept This Last Offer • Only $19.90
                  </a>
                </Button>

                <a
                  href={import.meta.env.VITE_OFFER_DWS1_ACCEPTED_NO}
                  className="block text-center text-sm text-muted-foreground hover:text-foreground underline"
                >
                  No, I'll give up this information and continue in the dark
                </a>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Card className="border-red-500/30 bg-red-500/5 p-4 inline-block">
              <p className="text-sm text-red-400">
                ⏰ Only <strong>3 people per day</strong> receive this special discount
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
