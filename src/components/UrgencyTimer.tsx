import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface UrgencyTimerProps {
  initialMinutes?: number;
}

export const UrgencyTimer = ({ initialMinutes = 20 }: UrgencyTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) return prev - 1;
        return initialMinutes * 60; // Reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [initialMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card className="border-accent/50 bg-accent/10 backdrop-blur-sm animate-pulse">
      <div className="p-4 flex items-center justify-center gap-3">
        <Clock className="w-6 h-6 text-accent animate-pulse" />
        <div className="text-center">
          <p className="text-sm font-semibold text-accent">
            ⏰ Special offer expires in: {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
          <p className="text-xs text-muted-foreground">
            This promotion is valid for today only
          </p>
        </div>
      </div>
    </Card>
  );
};
