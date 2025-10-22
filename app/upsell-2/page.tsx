'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Crown, Sparkles, Shield } from 'lucide-react';
import { UrgencyTimer } from '@/components/UrgencyTimer';
import { useQuizStore } from '@/hooks/useQuizStore';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { Button } from '@/components/ui/button';

export default function Upsell2() {
  const { quizData } = useQuizStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    sendClarityEvent(namePages.upsell2)
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        <div className="max-w-4xl w-full">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <UrgencyTimer initialMinutes={5} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
              LAST OFFER, {quizData.name}!
            </h1>
            <p className="text-2xl text-accent font-semibold">
              ✨ Complete VIP Experience ✨
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <Card className="border-accent/50 bg-gradient-to-br from-accent/10 to-primary/10 p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-accent via-secondary to-primary text-white px-6 py-2 rounded-full text-sm font-bold">
                  👑 EXCLUSIVE VIP ACCESS
                </div>
              </div>

              <div className="text-center mb-8">
                <Crown className="w-20 h-20 mx-auto text-accent mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Discover <span className="text-gradient-gold">WHERE</span> You'll Meet Him
                </h2>
                <p className="text-xl text-muted-foreground">
                  + Private consultation with Seraphine and 30-day follow-up
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-center">VIP Upgrade Includes:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Meeting Location Revealed</p>
                      <p className="text-sm text-muted-foreground">Type of place where the universe will conspire (café, event, app, work, etc)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Astrological Map of the Encounter</p>
                      <p className="text-sm text-muted-foreground">Complete analysis of cosmic energies at that moment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">30min Live Consultation</p>
                      <p className="text-sm text-muted-foreground">Private session with Seraphine via video call</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Personalized Energetic Ritual</p>
                      <p className="text-sm text-muted-foreground">Exclusive practices to attract your soulmate faster</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">30-Day Follow-Up (You Choose the Channel)</p>
                      <p className="text-sm text-muted-foreground">Direct support from Seraphine via WhatsApp, Telegram, Email, iMessage or Audio — your choice</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="mb-2">
                  <span className="text-2xl text-muted-foreground line-through opacity-60">$149</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold text-gradient-gold">$47</span>
                  <span className="text-xl text-muted-foreground">one-time investment</span>
                </div>
                <p className="text-sm text-accent font-semibold">
                  68% OFF - You save $102 • Offer expires in 5min
                </p>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-green-500/10 rounded-lg p-5 mb-6 text-center border-2 border-green-500/30">
                <Shield className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <p className="text-base font-bold text-green-500 mb-1">You're 100% Protected</p>
                <p className="text-sm text-muted-foreground">
                  Test everything for 30 days. If you don't feel it was worth every penny, we refund your entire
                  investment. Simple as that. No bureaucracy.
                </p>
              </motion.div>

              <div className="space-y-4">
                <Button asChild size="lg" className="w-full gradient-premium text-[1.0625rem] leading-tight md:text-xl py-7 hover:opacity-90">
                  <a href={process.env.NEXT_PUBLIC_OFFER_UP2_ACCEPTED_YES}>
                    <Crown className="!w-6 !h-6 flex-shrink-0" />
                    YES! I Want Complete VIP Experience • $47
                  </a>
                </Button>

                <a href={process.env.NEXT_PUBLIC_OFFER_UP2_ACCEPTED_NO} className="block text-center text-sm text-muted-foreground hover:text-foreground underline">
                  No, I'll continue without knowing where or having the follow-up
                </a>
              </div>

              <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-3 text-primary">Think Carefully Before Declining...</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      You've already invested in the sketch and the date. But without knowing WHERE and without my personal follow-up:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• You'll continue without direction, not knowing where to start looking</li>
                      <li>• You won't have anyone to guide you when doubts and fears arise</li>
                      <li>• You might make energetic mistakes that push your soulmate away</li>
                      <li>• You'll miss 30 days of direct support from me (invaluable)</li>
                      <li>• You'll be alone on this journey when you could have a mentor by your side</li>
                    </ul>
                    <p className="text-sm text-accent font-semibold mt-4 text-center">
                      💫 This is your only chance for complete VIP access
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Card className="border-accent/30 bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-start gap-4">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces" alt="VIP Testimonial" className="w-12 h-12 rounded-full object-cover border-2 border-accent/20" />
                <div>
                  <p className="text-sm italic mb-2">
                    "VIP was the best investment of my life. The consultation with Seraphine transformed me. The follow-up gave me confidence. I met him exactly where she said. Magical! ✨"
                  </p>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Nancy R. - Complete VIP Package
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
