/**
 * Sistema de Storage Híbrido para navegadores in-app do Facebook/Instagram
 * Prioriza sessionStorage (mais confiável) e fallback para localStorage
 */

export const hybridStorage = {
  /**
   * Salva um item em ambos os storages
   */
  setItem(key: string, value: string): boolean {
    try {
      sessionStorage.setItem(key, value);
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('⚠️ localStorage falhou, usando apenas sessionStorage');
      }
      return true;
    } catch (e) {
      console.error('❌ Ambos storages falharam:', e);
      return false;
    }
  },

  /**
   * Busca um item priorizando sessionStorage
   */
  getItem(key: string): string | null {
    try {
      const sessionValue = sessionStorage.getItem(key);
      if (sessionValue !== null) return sessionValue;
      
      // Fallback para localStorage
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('⚠️ localStorage inacessível');
        return null;
      }
    } catch (e) {
      console.error('❌ Storage inacessível:', e);
      return null;
    }
  },

  /**
   * Remove um item de ambos os storages
   */
  removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      console.warn('⚠️ Falha ao remover de sessionStorage');
    }
    
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('⚠️ Falha ao remover de localStorage');
    }
  },

  /**
   * Limpa ambos os storages
   */
  clear(): void {
    try {
      sessionStorage.clear();
    } catch (e) {
      console.warn('⚠️ Falha ao limpar sessionStorage');
    }
    
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('⚠️ Falha ao limpar localStorage');
    }
  },

  /**
   * Verifica se algum storage está disponível
   */
  isAvailable(): boolean {
    try {
      const test = '__test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e2) {
        return false;
      }
    }
  }
};
