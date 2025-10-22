/**
 * Detecção silenciosa de disponibilidade de storage
 * Não exibe alertas ao usuário, apenas logs para debug
 */

export function checkStorageAvailability(): {
  sessionStorage: boolean;
  localStorage: boolean;
  anyAvailable: boolean;
} {
  const result = {
    sessionStorage: false,
    localStorage: false,
    anyAvailable: false
  };

  // Testa sessionStorage
  try {
    const test = '__storage_test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    result.sessionStorage = true;
  } catch (e) {
    console.warn('⚠️ sessionStorage indisponível');
  }

  // Testa localStorage
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    result.localStorage = true;
  } catch (e) {
    console.warn('⚠️ localStorage indisponível');
  }

  result.anyAvailable = result.sessionStorage || result.localStorage;

  if (!result.anyAvailable) {
    console.error('❌ Nenhum storage disponível - navegador pode estar em modo privado ou com restrições');
  }

  return result;
}

/**
 * Verifica storage ao iniciar o app (silencioso)
 */
export function initStorageCheck(): boolean {
  const status = checkStorageAvailability();
  
  if (status.anyAvailable) {
    console.log('✅ Storage disponível:', {
      session: status.sessionStorage,
      local: status.localStorage
    });
    return true;
  } else {
    console.error('❌ Storage indisponível - funcionalidade limitada');
    return false;
  }
}
