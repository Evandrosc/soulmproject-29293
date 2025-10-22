
'use client';

import { SeraphinaLiveChat } from '@/components/SeraphinaLiveChat';
import { useQuizStore } from '@/hooks/useQuizStore';
import { useEffect } from 'react';
import { namePages, sendClarityEvent } from '@/helpers/send-clarity-event';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';

export default function Chat() {
  const navigate = useNavigateWithParams();
  const { quizData } = useQuizStore();

  console.log('🎭 Componente Chat montado');

  const handleComplete = () => {
    console.log('✅ Chat completo, navegando para o quiz');
    navigate('/quiz');
  };

  useEffect(() => {
    sendClarityEvent(namePages.front, 'chat')
  }, []);

  return (
    <div className="min-h-screen">
      <SeraphinaLiveChat
        userName={quizData.name || ''}
        onComplete={handleComplete}
      />
    </div>
  );
}
