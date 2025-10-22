export function initStorageCheck(): void {
  if (typeof window === 'undefined') return;

  try {
    const testKey = '__storage_test__';

    try {
      sessionStorage.setItem(testKey, 'test');
      sessionStorage.removeItem(testKey);
    } catch (e) {
      console.warn('SessionStorage not available');
    }

    try {
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
    } catch (e) {
      console.warn('LocalStorage not available');
    }
  } catch (error) {
    console.warn('Storage check failed', error);
  }
}
