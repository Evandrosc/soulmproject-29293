import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { QuizStep as QuizStepType } from '@/types/quiz';
import { Sparkles, Heart } from 'lucide-react';
import heightIllustration from '@/assets/heights-comparison.jpg';
import bodyTypesIllustration from '@/assets/body-types.jpg';
import hairTypesIllustration from '@/assets/hair-types.jpg';
import hairColorsIllustration from '@/assets/hair-colors.jpg';
import eyeColorsIllustration from '@/assets/eye-colors.jpg';
import skinTonesIllustration from '@/assets/skin-tones.jpg';
import personalityIllustration from '@/assets/personality-types.jpg';
import personalityIntroIllustration from '@/assets/personality-intro.jpg';
import adventureIllustration from '@/assets/personality-adventure.jpg';
import communicationIllustration from '@/assets/communication-styles.jpg';
import { SoulmateInterlude } from '@/components/quiz/SoulmateInterlude';
import { AvatarBuilder } from '@/components/quiz/AvatarBuilder';
import { CardConnectionMoment } from '@/components/quiz/CardConnectionMoment';
import { DopamineCoupleInterlude } from '@/components/quiz/DopamineCoupleInterlude';
import { DatePickerQuiz } from '@/components/quiz/DatePickerQuiz';

interface QuizStepProps {
  step: QuizStepType;
  value: any;
  onNext: (value: any) => void;
  onBack?: () => void;
  totalSteps: number;
  currentStepNumber: number;
  allQuizData?: any;
}

export const QuizStep = ({
  step,
  value,
  onNext,
  onBack,
  totalSteps,
  currentStepNumber,
  allQuizData = {},
}: QuizStepProps) => {
  // Para o campo specialDetails, SEMPRE começar vazio (fix bug pré-preenchimento)
  const [inputValue, setInputValue] = useState(() => {
    if (step.id === 'specialDetails') {
      return '';
    }
    return value || '';
  });

  // CRÍTICO: Limpar campo quando mudar para specialDetails
  useEffect(() => {
    if (step.id === 'specialDetails') {
      setInputValue('');
    } else {
      setInputValue(value || '');
    }
  }, [step.id, value]);

  const handleNext = () => {
    if (step.validation && !step.validation(inputValue)) {
      return;
    }
    onNext(inputValue);
  };

  // Mostrar interlúdio no meio do quiz (após características de personalidade, antes de aparência física)
  if (step.id === 'appearance-intro') {
    return <DopamineCoupleInterlude onContinue={() => onNext(true)} />;
  }

  // Momento especial da carta (card-connection)
  if (step.type === 'cardConnection') {
    return <CardConnectionMoment onContinue={() => onNext(true)} />;
  }

  // Determinar foco do avatar
  const getAvatarFocus = (): 'hair' | 'eyes' | 'skin' | 'beard' | 'body' | 'height' | null => {
    switch (step.id) {
      case 'hairType':
      case 'hairColor':
        return 'hair';
      case 'eyeColor':
        return 'eyes';
      case 'skinTone':
        return 'skin';
      case 'hasBeard':
        return 'beard';
      case 'bodyType':
        return 'body';
      case 'height':
        return 'height';
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
        <div className="w-full max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-foreground">
                  Question {currentStepNumber} of {totalSteps}
                </span>
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Sparkles className="w-5 h-5 text-secondary" />
                </motion.div>
              </div>
              {/* Hearts indicator */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.ceil((currentStepNumber / totalSteps) * 5)
                        ? 'fill-secondary text-secondary'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full gradient-mystical shadow-lg"
                initial={{ width: 0 }}
                animate={{
                  width: `${(currentStepNumber / totalSteps) * 100}%`,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-secondary text-center mt-2 font-semibold">
              ✨ Cosmic energies are aligning with your answers • {Math.round((currentStepNumber / totalSteps) * 100)}% complete
            </p>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient-gold">
              {step.title}
            </h2>
            {step.description && (
              <p className="text-muted-foreground text-lg">{step.description}</p>
            )}
          </div>

          {/* Conteúdo */}
          <div className="mb-8">
            {step.type === 'input' && (
              <div className="space-y-4">
                {step.field === 'birthDate' ? (
                  <DatePickerQuiz
                    value={inputValue}
                    onChange={(date) => setInputValue(date)}
                    placeholder={step.description || "Selecione sua data de nascimento"}
                  />
                ) : (
                  <Input
                    type={step.field === 'birthTime' ? 'time' : 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={step.description}
                    className="text-lg py-8 px-4 text-center bg-card border-primary/30 focus:border-primary min-h-[64px]"
                  />
                )}
                <Button
                  onClick={handleNext}
                  className="w-full py-6 text-lg gradient-mystical hover:opacity-90 transition-opacity"
                  disabled={step.validation ? !step.validation(inputValue) : false}
                >
                  Continue <Heart className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}

        {step.type === 'textarea' && (
          <div className="space-y-4">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type here..."
              className="min-h-[120px] text-lg bg-card border-primary/30 focus:border-primary"
              autoFocus
            />
            <Button
              onClick={handleNext}
              className="w-full py-6 text-lg gradient-mystical hover:opacity-90 transition-opacity"
            >
              Continue <Heart className="ml-2 !w-5 !h-5" />
            </Button>
          </div>
        )}

            {step.type === 'multiButton' && step.options && step.options.length > 0 && (
              <div className={`grid gap-4 ${step.id === 'bodyType' ? 'grid-cols-2 md:grid-cols-3' : ''}`}>
                {step.options.map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ willChange: 'transform' }}
                  >
                    <Card
                      className={`p-6 cursor-pointer border-2 transition-all hover:border-primary ${
                        inputValue === option.value
                          ? 'border-primary bg-primary/10 glow-purple'
                          : 'border-border hover:bg-card/80'
                      }`}
                      onClick={() => {
                        setInputValue(option.value);
                        setTimeout(() => onNext(option.value), 150);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">
                            {option.label}
                          </h3>
                          {option.description && (
                            <p className="text-muted-foreground text-sm">
                              {option.description}
                            </p>
                          )}
                        </div>
                        {inputValue === option.value && (
                          <Sparkles className="w-6 h-6 text-secondary ml-4" />
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Tela informativa (sem inputs) */}
            {(step.type === 'select' && (!step.options || step.options.length === 0)) && (
              <div className="space-y-4">
                <Button
                  onClick={() => onNext(true)}
                  className="w-full py-6 text-lg gradient-mystical hover:opacity-90 transition-opacity"
                >
                  Continue <Heart className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Mensagens motivacionais de dopamina - melhoradas */}
          {currentStepNumber % 5 === 0 && currentStepNumber > 5 && step.id !== 'cosmic-card-selection' && step.id !== 'card-connection' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="text-center mb-4"
            >
              <Card className="p-4 bg-gradient-to-r from-secondary/20 to-accent/20 border-secondary/30">
                <p className="text-secondary text-base font-bold flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ✨
                  </motion.span>
                  {currentStepNumber < totalSteps / 2 
                    ? 'You are doing great! Keep going...'
                    : 'Almost there... your soulmate is being revealed by the universe!'
                  }
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                  >
                    💫
                  </motion.span>
                </p>
              </Card>
            </motion.div>
          )}

          {/* Botão Voltar */}
          {step.id !== 'cosmic-card-selection' && onBack && currentStepNumber > 1 && (
            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Back
            </Button>
          )}
        </div>
    </motion.div>
  );
};
