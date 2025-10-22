
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, CheckCircle, Mail, Download } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';

export default function ThankYou() {
  const navigate = useNavigateWithParams();
  const { quizData } = useQuizStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!quizData.name) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData.name]);

  useEffect(() => {
    sendClarityEvent(namePages.thankYou)
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            Your Sketch Will Be Started Soon
          </h1>
          <p className="text-2xl text-muted-foreground">
            Seraphine will receive your energy and begin the process in the next few hours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-8 border-primary/30 bg-card/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 mx-auto text-secondary mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold mb-4">
                Congratulations, {quizData.name}! 🎉
              </h2>
              <p className="text-lg text-muted-foreground">
                You'll receive an email with the access link when the sketch is ready
              </p>
            </div>

            <div className="bg-background/50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-center">What Happens Now:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-secondary flex-shrink-0" />
                  <p className="text-sm">Seraphine is receiving your energy and preparing the sketch</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                  <p className="text-sm">📧 You'll receive an email when it's ready</p>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-secondary flex-shrink-0" />
                  <p className="text-sm">Access the dashboard to track your sketch status</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                console.log('Go to dashboard');
              }}
              size="lg"
              className="w-full h-auto gradient-mystical text-lg leading-tight py-2"
            >
              View My Sketch Status
              <Sparkles className="!w-5 !h-5" />
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="border-accent/50 bg-accent/10 p-6">
            <h3 className="font-semibold mb-4 text-center">Next Steps:</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="font-bold text-accent flex-shrink-0">1.</span>
                <span>Check your email and save the visualization in a safe place</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-accent flex-shrink-0">2.</span>
                <span>Read Seraphine's complete analysis carefully</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-accent flex-shrink-0">3.</span>
                <span>Practice the energetic ritual daily to strengthen the connection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-accent flex-shrink-0">4.</span>
                <span>Keep an open mind and trust the universe's timing</span>
              </li>
            </ol>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-primary/30 bg-card/50 backdrop-blur-sm p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto text-secondary mb-4" />
            <p className="text-lg italic text-muted-foreground mb-4">
              "The universe already knows who he is. Now you know too. Trust the process."
            </p>
            <p className="text-sm font-semibold text-secondary">
              - Seraphine ✨
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Questions or need help?{' '}
            <a href="mailto:support@seraphine.com" className="text-secondary hover:underline">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
