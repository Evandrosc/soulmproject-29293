import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SeraphinaStatus } from '@/components/SeraphinaStatus';
import { useQuizStore } from '@/hooks/useQuizStore';
import seraphinaPortrait from '@/assets/seraphina-portrait.jpg';

interface ChatMessage {
  text: string;
  fromUser: boolean;
}

interface SeraphinaLiveChatProps {
  userName: string;
  onComplete: () => void;
}

type ChatPhase = 'intro' | 'waitingForName' | 'afterNameMessages' | 'waitingForReady' | 'complete';

export const SeraphinaLiveChat = ({ userName, onComplete }: SeraphinaLiveChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>('intro');
  const [nameInput, setNameInput] = useState('');
  const [savedName, setSavedName] = useState('');
  const hasInitializedRef = useRef(false); // Flag para evitar repetição
  const isSubmittingNameRef = useRef(false); // Previne duplo clique no input do nome
  const isSubmittingReadyRef = useRef(false); // Previne duplo clique no botão pronto

  const { updateQuizData, chatMessages, chatPhase, setChatMessages, setChatPhase } = useQuizStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const introMessages = [
    "Hello! ✨ I am Seraphine, and I am here to help you visualize your soulmate.",
    "Before we continue... I have something VERY important to show you beyond the card you chose. 🔮",
    "Please, do not leave yet, okay? What I am about to reveal could change your love life forever.",
    "Perfect! This card will help me understand you better.",
    "You know, each card reveals something unique about the love the universe has prepared for you.",
    "But before we continue, I need to know...",
    "Who am I speaking with? What is your name? 💫",
  ];

  // Limpa todos os timeouts quando o componente é desmontado
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  // Restaurar chat salvo ao carregar
  useEffect(() => {
    const { quizData } = useQuizStore.getState();
    
    // ✅ Restaurar nome salvo se existir
    if (quizData.name) {
      console.log('💾 Restaurando nome do store:', quizData.name);
      setSavedName(quizData.name);
    }
    
    // Se tem mensagens salvas, restaurar
    if (chatMessages.length > 0) {
      console.log('💬 Restaurando chat de onde parou');
      setMessages(chatMessages);
      setPhase(chatPhase);
      hasInitializedRef.current = true;
      return;
    }
    
    console.log('💬 Iniciando novo chat');
  }, []);

  // Salvar mensagens sempre que mudar
  useEffect(() => {
    if (messages.length > 0) {
      setChatMessages(messages);
    }
  }, [messages, setChatMessages]);

  // Salvar fase sempre que mudar
  useEffect(() => {
    setChatPhase(phase);
  }, [phase, setChatPhase]);

  // Lógica de exibição de mensagens da intro
  useEffect(() => {
    if (phase !== 'intro') return;
    if (messages.length >= introMessages.length) return;
    if (hasInitializedRef.current && messages.length === 0) return; // Evita reinicialização

    // Marca como inicializado na primeira execução
    if (messages.length === 0) {
      hasInitializedRef.current = true;
    }

    const currentMessage = introMessages[messages.length];
    // Delay mais natural: 1.5-2.5 segundos
    const typingDelay = 1500 + Math.random() * 1000;
    const initialDelay = messages.length === 0 ? 1500 : 800;

    const timeout = setTimeout(() => {
      setIsTyping(true);

      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => {
          // Evita duplicação - só adiciona se não existir
          if (prev.find(m => m.text === currentMessage)) return prev;
          return [...prev, { text: currentMessage, fromUser: false }];
        });

        // Se foi a última mensagem (pergunta do nome), transicionar automaticamente
        if (messages.length + 1 === introMessages.length) {
          const transitionTimeout = setTimeout(() => {
            setPhase('waitingForName');
          }, 1000);
          timeoutsRef.current.push(transitionTimeout);
        }
      }, typingDelay);

      timeoutsRef.current.push(typingTimeout);
    }, initialDelay);

    timeoutsRef.current.push(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [phase, messages.length]);

  const handleNameSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const trimmedName = nameInput.trim();

    // Validação mais robusta
    if (!trimmedName || trimmedName.length === 0) {
      console.log('⚠️ Nome vazio, ignorando submissão');
      return;
    }

    if (isSubmittingNameRef.current) {
      console.log('⚠️ Já está processando, ignorando');
      return;
    }

    isSubmittingNameRef.current = true;
    console.log('📝 [handleNameSubmit] Nome recebido:', trimmedName);

    setSavedName(trimmedName);
    
    // ✅ Salvar nome IMEDIATAMENTE no store
    updateQuizData({ name: trimmedName });
    console.log('💾 [handleNameSubmit] Nome salvo no store:', trimmedName);
    console.log('🔍 [handleNameSubmit] Phase atual:', phase, '→ afterNameMessages');
    
    setPhase('afterNameMessages');
    setMessages(prev => [...prev, { text: trimmedName, fromUser: true }]);
    setNameInput('');

    // Reseta a flag após 500ms
    setTimeout(() => {
      isSubmittingNameRef.current = false;
    }, 500);

    // Message sequence com delays naturais
    const messagesSequence = [
      { delay: 1200, text: `${trimmedName}! ✨ What a special energy I sense coming from you...`, typingTime: 1500 + Math.random() * 500 },
      { delay: 4000, text: "I will need some answers to channel the image of your soulmate 💫", typingTime: 1200 + Math.random() * 500 },
      { delay: 7000, text: 'Are you ready to begin? 🔮', typingTime: 1200 + Math.random() * 500, isFinal: true },
    ];

    console.log('⏱️ [handleNameSubmit] Agendando sequência de 3 mensagens');

    messagesSequence.forEach((msg) => {
      const timeout = setTimeout(() => {
        setIsTyping(true);
        const typingTimeout = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { text: msg.text, fromUser: false }]);

          if (msg.isFinal) {
            setPhase('waitingForReady');
            console.log('✅ [handleNameSubmit] Fase mudou para waitingForReady - botão deve aparecer');
          }
        }, msg.typingTime);
        timeoutsRef.current.push(typingTimeout);
      }, msg.delay);
      timeoutsRef.current.push(timeout);
    });
  };

  const handleReadyClick = () => {
    if (isSubmittingReadyRef.current) {
      console.log('⚠️ [handleReadyClick] Já está processando, ignorando');
      return;
    }

    isSubmittingReadyRef.current = true;
    console.log('🚀 [handleReadyClick] Usuário clicou em Ready');
    console.log('🔍 [handleReadyClick] savedName:', savedName);

    // ✅ CRITICAL: Salvar o nome com verificação explícita
    if (!savedName || savedName.trim().length === 0) {
      console.error('❌ [handleReadyClick] Nome vazio ou inválido!', savedName);
      isSubmittingReadyRef.current = false;
      return;
    }

    // Salvar nome no store
    updateQuizData({ name: savedName });
    console.log('💾 [handleReadyClick] Nome salvo:', savedName);

    // Marcar que completou o chat
    sessionStorage.setItem('hasSeenChat', 'true');
    console.log('✅ [handleReadyClick] Flag hasSeenChat marcada');

    // ⏱️ Pequeno delay para garantir persistência do storage
    setTimeout(() => {
      // Verificar se o nome foi mesmo salvo antes de navegar
      const storageData = sessionStorage.getItem('soulmate-quiz-storage') || localStorage.getItem('soulmate-quiz-storage');
      console.log('🔍 [handleReadyClick] Storage antes de navegar:', storageData);
      
      console.log('🎯 [handleReadyClick] Navegando para quiz');
      onComplete();
    }, 200);
  };

  // Determina se deve mostrar o input do nome
  const showNameInput = phase === 'waitingForName' && !isTyping;

  // Determina se deve mostrar o botão "Estou pronta"
  const showReadyButton = phase === 'waitingForReady' && !isTyping;

  // Debug logs detalhados
  useEffect(() => {
    console.log('📊 [Debug] Estado SeraphinaLiveChat:', {
      phase,
      messagesCount: messages.length,
      introMessagesCount: introMessages.length,
      isTyping,
      showNameInput,
      showReadyButton,
      savedName,
      nameInput
    });
  }, [phase, messages.length, isTyping, showNameInput, showReadyButton, savedName, nameInput]);

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-2xl w-full">
        <div className='flex flex-col gap-4'>
          {/* Status Online */}
          <div className='flex justify-end'>
            <SeraphinaStatus status="online" />
          </div>

          {/* Foto da Seraphina */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.4)',
                    '0 0 40px rgba(168, 85, 247, 0.6)',
                    '0 0 20px rgba(168, 85, 247, 0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full overflow-hidden w-32 h-32"
              >
                <img
                  src={seraphinaPortrait}
                  alt="Seraphine"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Online indicator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-background rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Chat messages */}
        <div className="space-y-3 mb-8 h-[50vh] overflow-y-auto px-4">
          <AnimatePresence mode="sync">
            {messages.map((message, index) => (
              <motion.div
                layout
                key={index}
                initial={{ opacity: 0, x: message.fromUser ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] backdrop-blur-sm border rounded-2xl p-4 shadow-lg whitespace-pre-line ${message.fromUser
                  ? 'bg-secondary/20 border-secondary/30 rounded-tr-none'
                  : 'bg-card/90 border-primary/20 rounded-tl-none'
                  }`}>
                  <p className="text-base">{message.text}</p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[85%] bg-card/90 backdrop-blur-sm border border-primary/20 rounded-2xl rounded-tl-none p-4 shadow-lg">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Inputs e botões */}
        <div className="px-4">
          {showNameInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              <form onSubmit={handleNameSubmit} className="flex gap-2 flex-1">
                <Input
                  type="text"
                  name="given-name"
                  autoComplete="given-name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNameSubmit(e);
                    }
                  }}
                  placeholder="Enter your name..."
                  className="flex-1 py-6 text-lg bg-background/50 rounded-xl"
                  autoFocus
                  disabled={isSubmittingNameRef.current}
                />
                <Button
                  type="submit"
                  disabled={!nameInput.trim() || isSubmittingNameRef.current}
                  className="gradient-mystical rounded-xl px-8"
                >
                  Send
                </Button>
              </form>
            </motion.div>
          )}

          {showReadyButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={handleReadyClick}
                className="w-full py-6 text-lg gradient-mystical rounded-2xl shadow-lg"
              >
                Yes! Let's begin! ✨
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
