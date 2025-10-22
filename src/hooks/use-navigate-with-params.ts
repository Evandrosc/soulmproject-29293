'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";

/**
 * Hook para navegar preservando query params e hash
 */
export function useNavigateWithParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /**
   * Redireciona para o caminho desejado preservando query params e hash
   * @param {string} path - destino da navegação (ex: '/')
   * @param {object} options - opções extras (não usado no Next.js router)
   */
  const navigateWithParams = (path: string, options: object = {}) => {
    const search = searchParams.toString();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    const fullPath = search ? `${path}?${search}${hash}` : `${path}${hash}`;

    router.push(fullPath);
  };

  return navigateWithParams;
}
