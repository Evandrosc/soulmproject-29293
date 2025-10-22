import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Calendar, CheckCircle, XCircle, Heart, Shield } from 'lucide-react';
import { UrgencyTimer } from '@/components/UrgencyTimer';
import { useQuizStore } from '@/hooks/useQuizStore';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { Button } from '@/components/ui/button';

export default function Upsell1() {
  const { quizData } = useQuizStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    sendClarityEvent(namePages.upsell1)
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <UrgencyTimer initialMinutes={5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
              WAIT, {quizData.name}!
            </h1>
            <p className="text-2xl text-secondary font-semibold">
              ⚡ Unique Offer Just Appeared ⚡
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="border-secondary/50 bg-gradient-to-br from-secondary/10 to-accent/10 p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <div className="w-full bg-gradient-to-r from-secondary to-accent text-white px-2 py-3.5 rounded-full text-sm font-bold text-center">
                  🔥 EXCLUSIVE POST-PURCHASE OFFER
                </div>
              </div>

              <div className="text-center mb-8">
                <Calendar className="w-20 h-20 mx-auto text-secondary mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Discover <span className="text-gradient-gold">WHEN</span> You'll Meet Him
                </h2>
                <p className="text-xl text-muted-foreground">
                  Exact month and year of your encounter revealed by Seraphine
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-center">Premium Upgrade Includes:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Exact Temporal Prediction</p>
                      <p className="text-sm text-muted-foreground">Month and year when the universe will align your meeting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Personalized Audio from Seraphine</p>
                      <p className="text-sm text-muted-foreground">Guided meditation to prepare your energy (10min)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Preparation Guide</p>
                      <p className="text-sm text-muted-foreground">How to be energetically ready for the right moment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">3 First Meeting Scenarios</p>
                      <p className="text-sm text-muted-foreground">Visualize the most probable possibilities</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-3 text-center text-red-400">⚠️ Why This Is CRITICAL For You</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>✓ <strong>Without the date</strong>, you'll spend the next months/years anxious, pressuring yourself, forcing meetings at the wrong time</p>
                  <p>✓ <strong>Without the audio</strong>, your energy won't be aligned when the moment comes (and you might not even recognize him)</p>
                  <p>✓ <strong>Without the scenarios</strong>, you won't be mentally prepared and might miss it</p>
                  <p>✓ <strong>Without the guide</strong>, you'll make the same mistakes that push your soulmate away</p>
                  <p className="text-center pt-3 text-base font-semibold text-accent">
                    This information is the difference between WAITING and PREPARING ⏰
                  </p>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="mb-2">
                  <span className="text-2xl text-muted-foreground line-through opacity-60">$79</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-gradient-gold">$27</span>
                  <span className="text-xl text-muted-foreground">today only</span>
                </div>
                <div className="inline-block bg-green-500/20 border border-green-500/50 rounded-full px-6 py-2 mb-3">
                  <p className="text-green-400 font-bold text-lg">
                    YOU SAVE: $52
                  </p>
                </div>
                <p className="text-sm text-accent font-semibold">
                  65% OFF - This offer expires in 5 minutes
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-green-500/10 rounded-lg p-5 mb-6 text-center border-2 border-green-500/30"
              >
                <Shield className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <p className="text-base font-bold text-green-500 mb-1">Total Satisfaction Guarantee</p>
                <p className="text-sm text-muted-foreground">
                  You have 30 days to test. If you don't feel more prepared and confident on your path,
                  we refund 100% of your investment. No questions.
                </p>
              </motion.div>

              <div className="space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full gradient-gold text-lg md:text-xl py-7 hover:opacity-90 leading-tight"
                >
                  <a href={import.meta.env.VITE_OFFER_UP1_ACCEPTED_YES}>
                    <Heart className="!w-6 !h-6 flex-shrink-0" />
                    YES! I Want to Know WHEN • $27
                  </a>
                </Button>

                <a
                  href={import.meta.env.VITE_OFFER_UP1_ACCEPTED_NO}
                  className="block text-center text-sm text-muted-foreground hover:text-foreground underline"
                >
                  No, I prefer not to know when I'll meet him
                </a>
              </div>

              <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-red-400">If You Decline This Offer...</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• You'll be anxious not knowing when it will happen</li>
                      <li>• You might force meetings at the wrong time and push your soulmate away</li>
                      <li>• You won't be energetically prepared for the moment</li>
                      <li>• You'll miss the chance to work your energy with the personalized audio</li>
                      <li>• After this page, this offer won't appear again</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="border-accent/50 bg-accent/10 p-6">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Why This Matters?</h3>
                  <p className="text-sm text-muted-foreground">
                    Knowing WHEN will give you the peace necessary to enjoy your life while the universe works behind the scenes. You'll stop pressuring yourself and start trusting the perfect timing. Plus, you'll be able to prepare energetically and emotionally for this sacred moment.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gradient-gold mb-2">
                What Changed For Them
              </h3>
              <p className="text-muted-foreground">
                Women who chose to know WHEN
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-primary/30 bg-card/50 backdrop-blur-sm p-6">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces"
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full object-cover border-2 border-secondary/20"
                  />
                  <div>
                    <p className="text-sm italic mb-2">
                      "Knowing I'd meet him in March gave me PEACE. I stopped forcing and when the month came, it happened exactly as Seraphine predicted. Now we're together! 💍"
                    </p>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Linda K. - Premium Upgrade
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-primary/30 bg-card/50 backdrop-blur-sm p-6">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full object-cover border-2 border-secondary/20"
                  />
                  <div>
                    <p className="text-sm italic mb-2">
                      "Before I was anxious, pressuring myself. When I found out it would be in July, I relaxed. The preparation audio helped me work my energy. SO worth it!"
                    </p>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Barbara H. - Premium Upgrade
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-primary/30 bg-card/50 backdrop-blur-sm p-6">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full object-cover border-2 border-secondary/20"
                  />
                  <div>
                    <p className="text-sm italic mb-2">
                      "Knowing the 3 possible scenarios left me prepared! When it happened at a café (scenario 2), I recognized it instantly. I was energetically ready thanks to the guide."
                    </p>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Karen W. - Premium Upgrade
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
