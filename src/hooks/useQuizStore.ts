'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizData } from '@/types/quiz';
import { hybridStorage } from '@/utils/hybridStorage';

interface ChatMessage {
  text: string;
  fromUser: boolean;
  timestamp?: number;
}

type ChatPhase = 'intro' | 'waitingForName' | 'afterNameMessages' | 'waitingForReady' | 'complete';

interface QuizStore {
  currentStep: number;
  quizData: Partial<QuizData>;
  isLoading: boolean;
  generatedImage?: string;
  audioUrl?: string;
  selectedCard?: { name: string; meaning: string; image: string };
  isCompleted: boolean;
  lastVisitedPage: string;
  chatMessages: ChatMessage[];
  chatPhase: ChatPhase;
  
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateQuizData: (data: Partial<QuizData>) => void;
  setGeneratedImage: (image: string) => void;
  setAudioUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  setSelectedCard: (card: { name: string; meaning: string; image: string }) => void;
  setCompleted: (value: boolean) => void;
  setLastVisitedPage: (page: string) => void;
  setChatMessages: (messages: ChatMessage[]) => void;
  setChatPhase: (phase: ChatPhase) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  quizData: {},
  isLoading: false,
  generatedImage: undefined,
  audioUrl: undefined,
  selectedCard: undefined,
  isCompleted: false,
  lastVisitedPage: '',
  chatMessages: [] as ChatMessage[],
  chatPhase: 'intro' as ChatPhase,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(0, state.currentStep - 1) 
      })),
      
      updateQuizData: (data) => set((state) => {
        // VALIDAÇÃO: Não permitir apagar campos críticos
        const newData = { ...state.quizData, ...data };
        
        // Se tinha nome e está tentando apagar, manter o antigo
        if (state.quizData.name && !newData.name) {
          console.error('⚠️ Tentativa de apagar nome detectada - bloqueado');
          newData.name = state.quizData.name;
        }

        console.log('📝 [useQuizStore] updateQuizData chamado:', { 
          before: state.quizData, 
          update: data, 
          after: newData 
        });

        // Forçar persistência imediata no hybridStorage
        const storageKey = 'soulmate-quiz-storage';
        const currentStorage = hybridStorage.getItem(storageKey);
        const parsedStorage = currentStorage ? JSON.parse(currentStorage) : {};
        const updatedStorage = {
          ...parsedStorage,
          state: {
            ...parsedStorage.state,
            quizData: newData
          }
        };
        hybridStorage.setItem(storageKey, JSON.stringify(updatedStorage));
        console.log('💾 [useQuizStore] Storage atualizado diretamente:', updatedStorage);

        return { quizData: newData };
      }),
      
      setGeneratedImage: (image) => set({ generatedImage: image }),
      
      setAudioUrl: (url) => set({ audioUrl: url }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setSelectedCard: (card) => set({ selectedCard: card }),
      
      setCompleted: (value) => set({ isCompleted: value }),
      
      setLastVisitedPage: (page) => set({ lastVisitedPage: page }),
      
      setChatMessages: (messages) => set({ chatMessages: messages }),
      
      setChatPhase: (phase) => set({ chatPhase: phase }),
      
      reset: () => {
        console.log('🧹 Limpando quiz store...');
        
        // Limpa ambos os storages
        hybridStorage.removeItem('soulmate-quiz-storage');
        
        // Reseta o estado
        set(initialState);
        
        console.log('✅ Quiz resetado!');
      },
    }),
    {
      name: 'soulmate-quiz-storage',
      storage: {
        getItem: (name) => {
          const str = hybridStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          hybridStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          hybridStorage.removeItem(name);
        },
      },
      // 🛡️ PROTEÇÃO ANTI-CACHE QUEBRADO
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // Import quizSteps para validação
        const MAX_STEPS = 24; // Total de steps do quiz

        // Verifica se currentStep está dentro dos limites
        if (state.currentStep < 0 || state.currentStep > MAX_STEPS) {
          console.error('❌ currentStep fora dos limites:', state.currentStep);
          hybridStorage.removeItem('soulmate-quiz-storage');
          Object.assign(state, initialState);
          return;
        }

        // Verifica integridade: se tem currentStep > 0 mas não tem nome
        if (state.currentStep > 0 && !state.quizData.name) {
          console.error('❌ Estado inconsistente: currentStep > 0 mas sem nome');
          hybridStorage.removeItem('soulmate-quiz-storage');
          Object.assign(state, initialState);
          return;
        }

        // Se completou mas não tem dados essenciais, limpar
        if (state.isCompleted && (!state.quizData.name || !state.quizData.birthDate)) {
          console.error('❌ isCompleted=true mas faltam dados essenciais');
          hybridStorage.removeItem('soulmate-quiz-storage');
          Object.assign(state, initialState);
          return;
        }

        // ⚠️ NOVO: Limpar lastVisitedPage se estiver no meio do quiz
        // Evita bug de pular o quiz
        if (state.currentStep > 0 && 
            state.currentStep < MAX_STEPS - 1 && 
            !state.isCompleted &&
            state.lastVisitedPage && 
            state.lastVisitedPage !== '/quiz') {
          console.warn('⚠️ Limpando lastVisitedPage conflitante (quiz em progresso)');
          state.lastVisitedPage = '';
        }

        console.log('✅ Estado carregado com sucesso:', {
          currentStep: state.currentStep,
          hasName: Boolean(state.quizData.name),
          isCompleted: state.isCompleted,
          lastVisitedPage: state.lastVisitedPage,
          chatMessagesCount: state.chatMessages?.length || 0
        });
      }
    }
  )
);
