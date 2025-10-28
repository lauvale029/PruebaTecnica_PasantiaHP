// ========================================
// UTILIDADES PARA MANEJO DE ERRORES
// ========================================

import React from 'react';

// Hook para manejo de errores asíncronos
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error | string) => {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    setError(errorObj);
    console.error('Error manejado:', errorObj);
  }, []);

  // Si hay error, lanzarlo para que lo capture el ErrorBoundary
  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { handleError, resetError };
};