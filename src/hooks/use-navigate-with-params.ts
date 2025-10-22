import { useNavigate, useLocation } from "react-router-dom";

/**
 * Hook para navegar preservando query params e hash
 */
export function useNavigateWithParams() {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Redireciona para o caminho desejado preservando query params e hash
   * @param {string} path - destino da navegação (ex: '/')
   * @param {object} options - opções extras de navigate
   */
  const navigateWithParams = (path: string, options: object = {}) => {
    navigate(
      {
        pathname: path,
        search: location.search,
        hash: location.hash
      },
      options
    );
  };

  return navigateWithParams;
}
