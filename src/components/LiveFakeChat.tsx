'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: number;
  userName: string;
  message: string;
  timestamp: string;
  type: 'testimonial' | 'recent' | 'random';
}

const predefinedMessages: Omit<ChatMessage, 'id' | 'timestamp'>[] = [
  // Testimonials - Husbands/Boyfriends/Partners
  { userName: "Jennifer M.", message: "OMG!! I did it 6 months ago and TODAY I met him!! Exactly like the sketch 😱", type: "testimonial" },
  { userName: "Patricia R.", message: "Did it 3 months ago and met him at work! Now he's my husband 💕", type: "testimonial" },
  { userName: "Michelle S.", message: "The drawing was so accurate that when I saw him for the first time I knew it was him!", type: "testimonial" },
  { userName: "Rebecca L.", message: "Met him 2 weeks after the sketch. Today we live together ❤️", type: "testimonial" },
  { userName: "Stephanie F.", message: "The drawing was EXACTLY my current husband! We got married last year 💍", type: "testimonial" },
  { userName: "Christina M.", message: "Did it in January, met him in March... today he's my boyfriend! Living a dream ✨", type: "testimonial" },
  { userName: "Laura T.", message: "Guys, the sketch I received was my current husband! Met him 4 months later 😭💕", type: "testimonial" },
  { userName: "Jessica R.", message: "Couldn't believe it when I saw... it was him! Now he's right here beside me 🥰", type: "testimonial" },
  
  // Conversations between users
  { userName: "Jennifer M.", message: "@Patricia R. Yes!! It was exactly like that for me too! 💕", type: "testimonial" },
  { userName: "Sarah K.", message: "@Michelle S. You married him?! I want details!!", type: "random" },
  { userName: "Amanda B.", message: "@Stephanie F. This is too surreal!! Congrats on the wedding! 👰", type: "random" },
  { userName: "Melissa S.", message: "@Christina M. How long did it take to meet him?", type: "random" },
  
  // Recent - Emotional impact
  { userName: "Melissa S.", message: "Just did it and I'm in shock with the accuracy...", type: "recent" },
  { userName: "Nicole P.", message: "My God, how is this so exact?! I'm shaking", type: "recent" },
  { userName: "Heather M.", message: "Just received it and I'm already crying, it's perfect! 😭✨", type: "recent" },
  { userName: "Kimberly T.", message: "Just saw the result, I'm so impressed!!", type: "recent" },
  { userName: "Angela K.", message: "How can she see all of this?! Incredible!!", type: "recent" },
  { userName: "Rachel P.", message: "Just received it... I'm speechless! 💫", type: "recent" },
  
  // Random - Questions and curiosity
  { userName: "Sarah K.", message: "Anyone else seeing this? So surreal", type: "random" },
  { userName: "Amanda B.", message: "Never believed in anything like this but now...", type: "random" },
  { userName: "Elizabeth K.", message: "Does this really work? I'm scared to do it", type: "random" },
  { userName: "Jennifer F.", message: "I'm nervous to see the result! 💫", type: "random" },
  { userName: "Lisa N.", message: "The energy here is incredible!", type: "random" },
  { userName: "Karen V.", message: "Seraphine is truly amazing 🔮", type: "random" },
  { userName: "Deborah S.", message: "Has anyone here already met the person from the sketch?", type: "random" },
  { userName: "Susan A.", message: "How long does it usually take?", type: "random" },
  { userName: "Nancy L.", message: "Does this really work to find your soulmate? 💕", type: "random" },
];

export const LiveFakeChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [nextMessageId, setNextMessageId] = useState(1);
  const [userHasSent, setUserHasSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Adiciona mensagens automáticas - APENAS UMA VEZ
  useEffect(() => {
    // PROTEÇÃO: Impede execução múltipla mesmo com remontagens
    if (hasInitialized.current) {
      console.log('🚫 LiveFakeChat: useEffect bloqueado, já foi inicializado');
      return;
    }
    
    console.log('✅ LiveFakeChat: Inicializando pela primeira vez');
    hasInitialized.current = true;

    // Primeiras 3 mensagens aparecem logo (garantir que são diferentes)
    const initialMessages = predefinedMessages.slice(0, 3).map((msg, idx) => ({
      ...msg,
      id: idx + 1,
      timestamp: new Date(Date.now() - (3 - idx) * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }));
    
    setMessages(initialMessages);
    setNextMessageId(4);

    // Rastrear índices usados (começar com os 3 iniciais)
    const usedIndices = new Set([0, 1, 2]);

    // Depois adiciona mensagens aleatórias a cada 5-8s
    const intervalId = setInterval(() => {
      // Filtrar mensagens NÃO usadas
      const availableIndices = predefinedMessages
        .map((_, idx) => idx)
        .filter(idx => !usedIndices.has(idx));
      
      // Se todas foram usadas, resetar (mas manter as 3 mais recentes)
      if (availableIndices.length === 0) {
        console.log('🔄 LiveFakeChat: Resetando pool de mensagens');
        usedIndices.clear();
      }
      
      const indicesToUse = availableIndices.length > 0 ? availableIndices : predefinedMessages.map((_, idx) => idx);
      const randomIndex = indicesToUse[Math.floor(Math.random() * indicesToUse.length)];
      const randomMessage = predefinedMessages[randomIndex];
      
      console.log(`💬 LiveFakeChat: Nova mensagem #${randomIndex} - "${randomMessage.message.substring(0, 30)}..."`);
      
      const newMessage: ChatMessage = {
        ...randomMessage,
        id: Date.now() + Math.random(), // ID único
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      
      // Adicionar ao pool de usados
      usedIndices.add(randomIndex);
      
      // Manter apenas últimas 8 mensagens + nova
      setMessages(prev => [...prev.slice(-8), newMessage]);
    }, Math.random() * 3000 + 5000); // 5-8 segundos

    return () => {
      console.log('🧹 LiveFakeChat: Limpando interval');
      clearInterval(intervalId);
    };
  }, []);

  const handleSendMessage = () => {
    if (!userMessage.trim() || !canSendMessage || userHasSent) return;

    const newMessage: ChatMessage = {
      id: nextMessageId,
      userName: "You",
      message: userMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'random',
    };

    setMessages(prev => [...prev, newMessage]);
    setUserMessage('');
    setCanSendMessage(false);
    setUserHasSent(true);
    setNextMessageId(prev => prev + 1);
  };

  return (
    <Card className="border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-secondary" />
          <h3 className="font-semibold text-lg">Live Chat</h3>
          <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {messages.length} online
          </span>
        </div>
      </div>

      {/* Mensagens */}
      <div 
        ref={scrollRef}
        className="h-80 overflow-y-auto p-4 space-y-3 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`${msg.userName === 'You' ? 'ml-auto' : ''} max-w-[85%]`}
            >
              <div className={`${
                msg.userName === 'You'
                  ? 'bg-primary/20 ml-auto' 
                  : msg.type === 'testimonial'
                  ? 'bg-secondary/10'
                  : msg.type === 'recent'
                  ? 'bg-accent/10'
                  : 'bg-muted/50'
              } rounded-lg p-3 shadow-sm`}>
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary">
                    {msg.userName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-primary/20 bg-background/50">
        <div className="flex gap-2">
          <Input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={userHasSent ? "Only Seraphine's clients can send more messages" : "Type your message..."}
            disabled={userHasSent}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={userHasSent || !userMessage.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {userHasSent && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Only Seraphine's clients can send more messages
          </p>
        )}
      </div>
    </Card>
  );
};