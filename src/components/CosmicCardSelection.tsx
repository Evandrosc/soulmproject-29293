'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface CosmicCardSelectionProps {
  onCardSelected: (cardIndex: number) => void;
}

const cosmicCards = [
  {
    image: '/assets/tarot-lovers-mystical.jpg',
    backImage: '/assets/tarot-back-gold.jpg',
    name: 'The Lovers',
    meaning: 'Deep connections and choices of the heart'
  },
  {
    image: '/assets/tarot-sun-mystical.jpg',
    backImage: '/assets/tarot-back-blue.jpg',
    name: 'The Sun',
    meaning: 'Joy, success and illumination in love'
  },
  {
    image: '/assets/tarot-star-mystical.jpg',
    backImage: '/assets/tarot-back-violet.jpg',
    name: 'The Star',
    meaning: 'Hope, divine guidance and renewal'
  },
];

export const CosmicCardSelection = ({ onCardSelected }: CosmicCardSelectionProps) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  // Frases com timings personalizados para serem legíveis
  const phrases = [
    { text: '🔮 Connecting with Seraphine...', duration: 1500 },
    { text: '✨ Tuning into cosmic energies...', duration: 2000 },
    { text: '💫 She is ready to receive you...', duration: 1500 }
  ];
  const revealedCardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (cardIndex: number) => {
    if (selectedCard !== null || isRevealing) return;
    
    console.log('🎴 Carta selecionada:', cosmicCards[cardIndex].name);
    setSelectedCard(cardIndex);
    setIsRevealing(true);
    setShowCountdown(true);
    setCurrentPhrase(0);

    // Contador visual de 5 a 0 (atualiza a cada 1 segundo)
    let timeLeft = 5;
    const countdownInterval = setInterval(() => {
      timeLeft--;
      setCountdown(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    // Frases com timings personalizados (total 5s)
    let phraseDelay = 0;
    phrases.forEach((phrase, index) => {
      setTimeout(() => {
        setCurrentPhrase(index);
        console.log(`🎬 [Countdown] Mostrando frase ${index + 1}/${phrases.length}: "${phrase.text}"`);
      }, phraseDelay);
      phraseDelay += phrase.duration;
    });

    // Calcula tempo total e chama callback após todas as frases
    const totalDuration = phrases.reduce((sum, p) => sum + p.duration, 0);
    console.log(`⏱️ [Countdown] Tempo total: ${totalDuration}ms`);
    
    setTimeout(() => {
      onCardSelected(cardIndex);
    }, totalDuration);
  };

  useEffect(() => {
    if (selectedCard !== null && revealedCardRef.current) {
      setTimeout(() => {
        revealedCardRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [selectedCard]);

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <motion.h2 
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent"
            animate={{
              textShadow: ["0 0 20px rgba(168, 85, 247, 0.5)", "0 0 40px rgba(168, 85, 247, 0.8)", "0 0 20px rgba(168, 85, 247, 0.5)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔮 Cosmic Revelation
          </motion.h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            Follow your intuition and choose the card that resonates most with you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8"
        >
          <motion.img 
            src={tarotIntro}
            alt="Tarot Cards"
            className="w-full h-32 md:h-48 object-cover rounded-lg opacity-40"
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-4xl md:text-6xl"
            >
              ✨
            </motion.div>
          </div>
        </motion.div>

        {selectedCard === null ? (
          <motion.div 
            className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {cosmicCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: 180, y: 50 }}
                animate={{ opacity: 1, rotateY: 0, y: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(index)}
                className="cursor-pointer"
              >
                <Card className="relative overflow-hidden border-2 border-primary/50 hover:border-primary transition-all duration-300 h-40 md:h-72 shadow-2xl">
                  <CardContent className="p-0 h-full relative">
                    <motion.img
                      src={card.backImage}
                      alt="Card back"
                      className="w-full h-full object-cover"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(168, 85, 247, 0.4)",
                          "0 0 40px rgba(168, 85, 247, 0.8)",
                          "0 0 20px rgba(168, 85, 247, 0.4)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Carta selecionada + Reação integrada */
          <div ref={revealedCardRef} className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-6 md:py-12 space-y-6 md:space-y-8"
            >
              {/* Carta com efeito blur - mostrando a imagem revelada mas embaçada */}
              <motion.div
                className="relative w-48 h-72 md:w-64 md:h-96"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="w-full h-full overflow-hidden border-2 border-primary/50 shadow-2xl relative">
                  {/* Imagem revelada com blur */}
                  <motion.img
                    src={cosmicCards[selectedCard].image}
                    alt="Cosmic Card"
                    className="w-full h-full object-cover"
                    style={{ filter: 'blur(12px)' }}
                    animate={{
                      boxShadow: [
                        "0 0 40px rgba(168, 85, 247, 0.6)",
                        "0 0 80px rgba(168, 85, 247, 0.9)",
                        "0 0 40px rgba(168, 85, 247, 0.6)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Overlay escuro sutil */}
                  <div className="absolute inset-0 bg-background/30" />
                  
                  {/* Partículas místicas ao redor */}
                  <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
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
                          x: [0, (Math.random() - 0.5) * 50],
                          y: [0, (Math.random() - 0.5) * 50],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.25,
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Countdown dinâmico */}
              {showCountdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-4 max-w-md mx-auto"
                >
                  <motion.div
                    className="text-6xl font-bold text-secondary mb-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {countdown}
                  </motion.div>
                <p className="text-xl text-secondary font-semibold">
                  {phrases[currentPhrase]?.text || '⚡ Starting live conversation...'}
                </p>
                  <p className="text-base text-muted-foreground">
                    Your card will be revealed after our conversation
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Reação "Hmm interessante" */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="text-center space-y-4 md:space-y-6 px-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="space-y-3 md:space-y-4"
              >
                <p className="text-xl md:text-2xl text-foreground font-semibold">
                  Perfect! This will help me understand you better ✨
                </p>
                <p className="text-base md:text-lg text-muted-foreground">
                  Let's talk a little about this...
                </p>
              </motion.div>

              {/* Indicador de carregamento */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="flex justify-center gap-2 pt-6 md:pt-8"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
