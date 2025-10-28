
import React from 'react';
import Pokeball3D from './Pokeball3D';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Cargando datos...', 
  size = 'medium' 
}) => {
  return (
    <div className="loading-container">
      <Pokeball3D size={size} speed="normal" />
      <div className="loading-text">
        {message}
      </div>
    </div>
  );
};

// Variante para carga inicial con más estilo
export const InitialLoadingScreen: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="app">
      <div className="app-container" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
          {/* Header Principal */}
          <div className="header" style={{ marginBottom: '3rem' }}>
            <h1>Sistema de Análisis Pokémon</h1>
            <p>Inicializando base de datos profesional</p>
          </div>

          {/* Card de Carga */}
          <div style={{
            background: 'var(--white)',
            borderRadius: '16px',
            padding: '3rem 2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid var(--gray-200)',
            marginBottom: '2rem'
          }}>
            {/* Pokéball 3D Personalizada */}
            <div className="loading-container" style={{ padding: '2rem 0' }}>
              <div style={{ marginBottom: '2rem' }}>
                <Pokeball3D size="large" speed="slow" />
              </div>
              <div className="loading-text" style={{
                fontSize: '1.25rem',
                marginBottom: '1rem'
              }}>
                {message}
              </div>
            </div>

            {/* Información del Proceso */}
            <div style={{
              background: 'linear-gradient(135deg, var(--color-50), var(--color-100))',
              borderRadius: '12px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--color-800)',
                marginBottom: '0.75rem'
              }}>
                Preparando el Análisis
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--color-700)',
                lineHeight: '1.5',
                margin: '0'
              }}>
                Conectando con la PokéAPI para obtener los datos de los primeros 50 Pokémon. 
                Este proceso puede tomar unos momentos mientras se inicializa la base de datos.
              </p>
            </div>
          </div>

          {/* Información Técnica */}
          <div style={{
            color: 'var(--gray-500)',
            fontSize: '0.9rem'
          }}>
            <p>Fuente de datos: PokéAPI • Almacenamiento: SQLite • Framework: Django + React</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;