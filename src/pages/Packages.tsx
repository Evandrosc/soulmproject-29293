import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Heart, Star, Users, Shield, Clock, AlertCircle } from 'lucide-react';
import { UrgencyTimer } from '@/components/UrgencyTimer';
import { SocialProofIndicator } from '@/components/SocialProofIndicator';
import { SeraphinaStatus } from '@/components/SeraphinaStatus';
import { LiveFakeChat } from '@/components/LiveFakeChat';

import { hybridStorage } from '@/utils/hybridStorage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';
import { useQuizStore } from '@/hooks/useQuizStore';

export default function Packages() {
  const navigate = useNavigateWithParams();
  const [couponApplied, setCouponApplied] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const { setLastVisitedPage } = useQuizStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Salva que visitou esta página
    setLastVisitedPage('/packages');
    
    // Verifica se cupom já foi aplicado (híbrido)
    const appliedCoupon = hybridStorage.getItem('applied_coupon');
    if (appliedCoupon) {
      setCouponApplied(true);
    }

    // Verifica se já visitou a página de packages antes (híbrido)
    const hasVisited = hybridStorage.getItem('hasVisitedPackages');
    if (!hasVisited) {
      setShowLiveChat(true);
      hybridStorage.setItem('hasVisitedPackages', 'true');
    }

    // Listener para quando cupom for aplicado
    const handleCouponApplied = () => {
      setCouponApplied(true);
    };
    
    window.addEventListener('coupon-applied', handleCouponApplied);
    return () => window.removeEventListener('coupon-applied', handleCouponApplied);
  }, [setLastVisitedPage]);

  const frontOffer = {
    id: 'essential',
    name: 'Essential Vision',
    price: '$19.90',
    originalPrice: '$79',
    icon: Sparkles,
    description: 'Discover your soulmate',
    features: [
      'Intuitive Sketch of Your Soulmate',
      'Complete personality analysis',
      'Detailed astrological compatibility',
      'Complete physical characteristics',
      'Revealed personality traits',
      'Lifestyle and values',
    ],
  };

  useEffect(() => {
    sendClarityEvent(namePages.front, 'packages')
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        <div className="max-w-7xl w-full">
          <div className="fixed top-8 right-4 z-50 hidden sm:block">
            <SeraphinaStatus status="online" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
              Choose Your Vision
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Unlock the secrets of your love future with a complete and personalized analysis
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <SocialProofIndicator />
          </motion.div>

          {showLiveChat && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="mb-12 max-w-2xl mx-auto"
            >
              <LiveFakeChat />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <UrgencyTimer initialMinutes={20} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Card className="relative overflow-visible border-secondary/50 shadow-2xl bg-card/50 backdrop-blur-sm" data-price-section>
              {couponApplied ? (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg whitespace-nowrap flex items-center gap-2">
                    🎁 Code COSMICGIFT90 Applied - You save 90%!
                  </div>
                </div>
              ) : (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-secondary to-accent text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                    ✨ SPECIAL OFFER
                  </div>
                </div>
              )}

              <div className="p-10 space-y-8">
                <div className="text-center space-y-3">
                  <Sparkles className="w-16 h-16 mx-auto text-secondary" />
                  <h3 className="text-3xl font-bold">{frontOffer.name}</h3>
                  <p className="text-muted-foreground text-lg">{frontOffer.description}</p>
                </div>

                <div className="text-center">
                  {couponApplied ? (
                    <>
                      <div className="mb-2">
                        <span className="text-lg text-muted-foreground line-through opacity-40">
                          $199
                        </span>
                      </div>
                      <div className="mb-3">
                        <span className="text-2xl text-muted-foreground line-through opacity-60">
                          {frontOffer.originalPrice}
                        </span>
                      </div>
                      <div className="text-6xl font-bold text-gradient-gold mb-3">
                        {frontOffer.price}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        <span className="text-3xl text-muted-foreground line-through opacity-60">
                          {frontOffer.originalPrice}
                        </span>
                      </div>
                      <div className="text-6xl font-bold text-gradient-gold mb-3">
                        {frontOffer.price}
                      </div>
                    </>
                  )}
                  <p className="text-lg text-muted-foreground">one-time payment • instant access</p>
                </div>

                <ul className="space-y-4">
                  {frontOffer.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-6 h-6 flex-shrink-0 mt-0.5 text-secondary" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  data-event="front-offer-selected"
                  className="w-full gradient-gold h-auto text-xl py-4 hover:opacity-90 transition-opacity"
                >
                  <a href={process.env.NEXT_PUBLIC_OFFER_FRONT}>
                    🔥 Start Now • {frontOffer.price}
                  </a>
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 inline mr-2" />
                  100% secure payment • Protected data
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="mb-12"
          >
            <Card className="border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 shadow-xl">
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <Shield className="w-16 h-16 text-green-400 mx-auto" />
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-green-400">
                  ✅ Unconditional 30-Day Guarantee
                </h3>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  You <span className="font-bold text-green-400">won't want your money back</span> because <span className="font-bold">you'll meet this person before that</span>. And for less than the cost of a dinner, there's <span className="font-bold text-green-400">ZERO risk</span>.
                </p>
                <p className="text-base text-muted-foreground">
                  But if you want it for any reason, we refund <span className="font-semibold text-green-400">100% no questions asked</span>. Simple as that.
                </p>
                <div className="pt-4 border-t border-green-500/30 mt-6">
                  <p className="text-sm italic text-muted-foreground">
                    There's no reason NOT to try. <span className="font-semibold text-green-400">Zero risk. 100% guarantee.</span> More than 12,847 women trusted Seraphine.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mb-12"
          >
            <Card className="border-accent/50 bg-gradient-to-br from-accent/10 to-secondary/10 p-6 md:p-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <AlertCircle className="w-6 h-6 text-accent" />
                <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold text-center">
                  Why Choose Now?
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">High Energy</h3>
                  <p className="text-sm text-muted-foreground">
                    Cosmic energies are aligned for love revelations today
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Limited Spots</h3>
                  <p className="text-sm text-muted-foreground">
                    Seraphine can only do a few sketches per day to maintain quality
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Temporary Offer</h3>
                  <p className="text-sm text-muted-foreground">
                    Promotional prices valid for today only
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-secondary" />
                <h2 className="text-3xl font-bold text-gradient-gold">
                  What They Say
                </h2>
              </div>
              <p className="text-muted-foreground">
                Real stories of those who visualized and found
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur-sm h-full hover:border-secondary/50 transition-all">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <p className="text-sm mb-4 italic">{testimonial.text}</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.package}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="border-secondary/50 bg-secondary/10 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Users className="w-12 h-12 text-secondary" />
                  <div>
                    <p className="text-2xl font-bold text-gradient-gold">
                      +12,847 women
                    </p>
                    <p className="text-sm text-muted-foreground">
                      already united by destiny through Seraphine
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-3xl font-bold text-secondary">98%</p>
                  <p className="text-sm text-muted-foreground">
                    satisfaction rate
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <Card className="border-accent/50 bg-accent/10">
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Shield className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">100% Secure</h3>
                    <p className="text-sm text-muted-foreground">
                      Your data is protected
                    </p>
                  </div>
                  <div>
                    <Star className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Satisfaction Guaranteed</h3>
                    <p className="text-sm text-muted-foreground">
                      More than 12k satisfied women
                    </p>
                  </div>
                  <div>
                    <Clock className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Visualization in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Seraphine has already received the universe's message and is preparing to start your sketch
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient-gold mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know before choosing
              </p>
            </div>

            <Card className="border-primary/30 bg-card/50 backdrop-blur-sm p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">How does payment work?</AccordionTrigger>
                  <AccordionContent>
                    Payment is one-time and processed 100% securely. You choose the package, make the payment, and receive instant access to your complete profile.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">When do I receive my visualization?</AccordionTrigger>
                  <AccordionContent>
                    The sketch and complete analysis become available immediately after payment confirmation. For the VIP package, the live consultation is scheduled within 48 hours.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">Can I change plans later?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can upgrade to a higher plan anytime by paying only the difference. Contact us for this.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">Is there a guarantee?</AccordionTrigger>
                  <AccordionContent>
                    Yes! The VIP package has a 30-day satisfaction guarantee. If you're not satisfied, we refund 100% of your investment, no questions asked.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient-gold mb-2">
                They Visualized and Found
              </h2>
              <p className="text-muted-foreground">
                See real couples holding Seraphine's sketch
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {coupleImages.map((couple, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <Card className="overflow-hidden border-primary/30 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-all">
                    <img
                      src={couple.image}
                      alt={couple.caption}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground italic">
                        "{couple.caption}"
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/recognition')}
              className="text-muted-foreground hover:text-foreground"
            >
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>
  );
}

const testimonials = [
  {
    name: 'Jennifer M.',
    package: 'Essential Vision',
    text: 'When I saw the sketch, my heart raced. 3 months later, I met him at a party. It was IDENTICAL. Today we\'re engaged! 💍',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
  },
  {
    name: 'Patricia L.',
    package: 'Essential Vision',
    text: 'The energetic reading changed my life. I discovered blocks I didn\'t even know I had. Now I\'m in a dream relationship!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces'
  },
  {
    name: 'Michelle T.',
    package: 'Essential Vision',
    text: 'I was SHOCKED by the accuracy! I\'ve already recognized some traits in someone I just met... 😍',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces'
  },
  {
    name: 'Rebecca F.',
    package: 'Essential Vision',
    text: 'The meditation audio connected me in an inexplicable way. I felt his energy even before meeting him. Worth every penny!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
  },
  {
    name: 'Stephanie S.',
    package: 'Essential Vision',
    text: 'The consultation revealed things I needed to hear. Thank you so much! 🙏',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=faces'
  },
  {
    name: 'Christina P.',
    package: 'Essential Vision',
    text: 'I was skeptical, but the accuracy scared me. The style, the smile, even the beard! Everything matched who I met later. Amazing!',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=faces'
  },
];

const coupleImages = [
  {
    image: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=600&h=400&fit=crop',
    caption: 'We found love after the visualization ❤️'
  },
  {
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop',
    caption: 'The sketch was exactly him! 😍'
  },
  {
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop',
    caption: 'Seraphine revealed my future husband 💍'
  },
];
