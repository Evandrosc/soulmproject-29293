/**
 * Sistema de logging centralizado para debug
 * Logs aparecem apenas no console, nunca para o usuário
 */

export const debugLog = {
  navigation: (from: string, to: string, data?: any) => {
    console.log(`🧭 [NAV] ${from} → ${to}`, data || '');
  },
  
  state: (component: string, state: any) => {
    console.log(`📊 [STATE] ${component}:`, state);
  },
  
  error: (component: string, error: string, data?: any) => {
    console.error(`❌ [ERROR] ${component}: ${error}`, data || '');
  },
  
  warning: (component: string, message: string, data?: any) => {
    console.warn(`⚠️ [WARNING] ${component}: ${message}`, data || '');
  },

  storage: (action: string, key: string, success: boolean) => {
    if (success) {
      console.log(`💾 [STORAGE] ${action}: ${key}`);
    } else {
      console.warn(`⚠️ [STORAGE] ${action} falhou: ${key}`);
    }
  },

  flow: (step: string, details?: any) => {
    console.log(`🔄 [FLOW] ${step}`, details || '');
  }
};
