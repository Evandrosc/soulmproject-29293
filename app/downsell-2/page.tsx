
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Crown, CheckCircle, Sparkles, Clock, Shield } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { Button } from '@/components/ui/button';

export default function Downsell2() {
  const { quizData } = useQuizStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    sendClarityEvent(namePages.dws2)
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <Card className="border-accent/50 bg-accent/10 p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-lg font-semibold text-accent">
                  💫 {quizData.name}, By A Matter of Seconds You Would Have Lost This...
                </p>
              </motion.div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 space-y-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gradient-gold">
              OK, I UNDERSTAND... BUT BEFORE...
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold">
              Let me make you ONE final proposal 🌟
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="border-accent/50 bg-gradient-to-br from-accent/10 to-primary/10 p-8 md:p-12 relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-4 right-4 bg-gradient-to-r from-accent to-secondary text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
              >
                ⚡ LAST OPPORTUNITY
              </motion.div>

              <div className="pt-8 text-center mb-8">
                <Crown className="w-16 h-16 mx-auto text-accent mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  The <span className="text-gradient-gold">Complete</span> VIP Experience
                </h2>
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/30 mb-4">
                  <p className="text-base md:text-lg italic leading-relaxed">
                    "{quizData.name}, you know what hurts me most? Seeing someone so close to having EVERYTHING — the sketch, the date, the location, my personal follow-up — and giving up for so little. This is the difference between <strong>passively waiting</strong> and <strong>actively co-creating</strong> your love destiny. You deserve more than just 'waiting for it to happen'. You deserve to be sure. To have support. To have ME by your side on this journey."
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    — Seraphine, from the bottom of my heart 💜
                  </p>
                </div>
              </div>

              <div className="bg-background/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-center">The COMPLETE VIP Experience Includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ Meeting Location Revealed</p>
                      <p className="text-sm text-muted-foreground">Type of place where the universe will conspire in your favor</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ Astrological Map of the Encounter</p>
                      <p className="text-sm text-muted-foreground">Complete analysis of cosmic energies at that moment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ 30min Live Consultation with Seraphine</p>
                      <p className="text-sm text-muted-foreground">Private session via video call</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ Personalized Energetic Ritual</p>
                      <p className="text-sm text-muted-foreground">Exclusive practices to attract your soulmate faster</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">✅ 30-Day Follow-Up (You Choose the Channel)</p>
                      <p className="text-sm text-muted-foreground">Via WhatsApp, Telegram, Email or Audio — your choice</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-green-500">✅ 100% Satisfaction Guarantee</p>
                      <p className="text-sm text-muted-foreground">Full refund within 30 days if not satisfied</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="bg-background/70 rounded-lg p-6 mb-4 border border-accent/30">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Original Value</p>
                      <p className="text-2xl text-muted-foreground line-through">$149</p>
                    </div>
                    <Sparkles className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Previous Offer</p>
                      <p className="text-2xl text-yellow-500 line-through">$47</p>
                    </div>
                  </div>
                  <div className="border-t border-accent/30 pt-4">
                    <p className="text-sm text-accent font-semibold mb-2">FINAL PROPOSAL (Only Now)</p>
                    <p className="text-5xl md:text-6xl font-bold text-gradient-gold mb-2">$19.90</p>
                    <div className="inline-block bg-green-500/20 border border-green-500/50 rounded-full px-4 py-2">
                      <p className="text-green-400 font-bold">
                        You Save $129.10 (86% OFF)
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center justify-center gap-2 text-sm text-red-400 font-semibold"
                >
                  <Clock className="w-4 h-4" />
                  <span>This is the last time you'll see this price</span>
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
                  If within 30 days you feel it wasn't worth it, just let me know and I'll refund every penny. No questions. No bureaucracy. No hard feelings.
                </p>
              </motion.div>

              <div className="space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full gradient-premium text-[1.0625rem] leading-tight md:text-xl py-7 hover:opacity-90 animate-pulse-glow"
                >
                  <a href={process.env.NEXT_PUBLIC_OFFER_DWS2_ACCEPTED_YES}>
                    <Crown className="!w-6 !h-6" />
                    YES! I Can't Miss This • $19.90 Now
                  </a>
                </Button>

                <a
                  href={process.env.NEXT_PUBLIC_OFFER_DWS2_ACCEPTED_NO}
                  className="block text-center text-sm text-muted-foreground hover:text-foreground underline"
                >
                  No, I give up all of this and will continue alone
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
            <Card className="border-primary/30 bg-primary/5 p-6">
              <p className="text-sm text-muted-foreground italic">
                "The difference between people who find their soulmate and those who wait forever isn't luck. It's preparation. It's intention. It's having someone by your side guiding the way. Let me be that person for you, {quizData.name}." 💫
              </p>
              <p className="text-xs text-primary font-semibold mt-3">— Seraphine</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
