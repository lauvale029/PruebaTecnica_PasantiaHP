
// COMPONENTE ERROR BOUNDARY 

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

// Componente de fallback por defecto
const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = ({ 
  error, 
  resetError 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icono de error */}
          <div className="text-6xl mb-4">⚠️</div>
          
          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Oops! Algo salió mal
          </h2>
          
          {/* Descripción */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Ocurrió un error inesperado en el laboratorio del Profesor Oak. 
            No te preocupes, podemos intentar de nuevo.
          </p>

          {/* Detalles del error (en desarrollo) */}
          {import.meta.env.DEV && error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <h4 className="font-semibold text-red-800 mb-2">
                Detalles del error:
              </h4>
              <code className="text-sm text-red-700 break-all">
                {error.message}
              </code>
            </div>
          )}

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={resetError}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            >
               Intentar de nuevo
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/20"
            >
               Recargar página
            </button>
          </div>

          {/* Información de contacto */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Si el problema persiste, contacta al administrador del laboratorio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



// Componente de error para casos específicos
export const ErrorMessage: React.FC<{ 
  error: string; 
  onRetry?: () => void;
  showDetails?: boolean;
}> = ({ error, onRetry, showDetails = false }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">❌</span>
        <h3 className="text-lg font-semibold text-red-800">
          Error en el laboratorio
        </h3>
      </div>
      
      <p className="text-red-700 mb-4">
        {error}
      </p>

      {showDetails && (
        <div className="mb-4 p-3 bg-red-100 rounded-lg">
          <p className="text-sm text-red-600">
            Verifica que el servidor de Django esté ejecutándose en el puerto 8000.
          </p>
        </div>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-500/20"
        >
           Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorBoundary;