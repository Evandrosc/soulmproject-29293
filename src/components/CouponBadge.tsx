'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { hybridStorage } from '@/utils/hybridStorage';
import { debugLog } from '@/utils/debugLogger';

interface CouponBadgeProps {
  couponCode?: string;
  discount?: number;
  delaySeconds?: number;
}

export const CouponBadge = ({ 
  couponCode = 'COSMICGIFT90', 
  discount = 90,
  delaySeconds = 7
}: CouponBadgeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Verifica se cupom já foi aplicado
    const hasApplied = hybridStorage.getItem('applied_coupon');
    
    if (hasApplied) {
      debugLog.flow('CouponBadge: cupom já aplicado anteriormente');
      return;
    }

    // Aguarda delay e mostra badge
    const timer = setTimeout(() => {
      debugLog.flow('CouponBadge: exibindo badge');
      setIsVisible(true);
      
      // Auto-expande após 1s para chamar atenção
      setTimeout(() => setIsExpanded(true), 1000);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  const handleApply = () => {
    debugLog.flow('CouponBadge: aplicando cupom', { code: couponCode });
    
    hybridStorage.setItem('applied_coupon', couponCode);
    
    // Dispara evento para atualizar página
    window.dispatchEvent(new CustomEvent('coupon-applied', { detail: { code: couponCode } }));
    
    setIsVisible(false);
  };

  const handleDismiss = () => {
    debugLog.flow('CouponBadge: usuário dispensou cupom');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md"
        >
          <div className="bg-gradient-to-r from-accent via-primary to-accent border-2 border-accent/50 rounded-full shadow-2xl p-3">
            <div className="flex items-center justify-between gap-3">
              {/* Ícone Gift */}
              <motion.div
                animate={{ 
                  rotate: isExpanded ? [0, -10, 10, -10, 0] : 0,
                  scale: isExpanded ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <Gift className="w-6 h-6 text-white" />
              </motion.div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  {!isExpanded ? (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white font-bold text-sm truncate"
                    >
                      🎁 Special Gift Available!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-white"
                    >
                      <div className="text-xs font-semibold">
                        {discount}% OFF • Code: {couponCode}
                      </div>
                      <div className="text-[10px] opacity-90">
                        Tap to apply automatically
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botão Fechar */}
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                aria-label="Dismiss coupon"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Botão de aplicar (visível quando expandido) */}
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleApply}
                className="w-full mt-2 bg-white text-primary font-bold py-2 px-4 rounded-full text-sm hover:bg-white/90 transition-colors"
              >
                Apply {discount}% OFF Now
              </motion.button>
            )}
          </div>

          {/* Indicador de pulsação */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-accent/30 rounded-full -z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
