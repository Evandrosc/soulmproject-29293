'use client';

export const hybridStorage = {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;

    try {
      return sessionStorage.getItem(key) || localStorage.getItem(key);
    } catch (error) {
      console.warn('Storage not available', error);
      return null;
    }
  },

  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      try {
        localStorage.setItem(key, value);
      } catch (fallbackError) {
        console.warn('Storage not available', fallbackError);
      }
    }
  },

  removeItem(key: string): void {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Storage not available', error);
    }
  },

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch (error) {
      console.warn('Storage not available', error);
    }
  },
};
