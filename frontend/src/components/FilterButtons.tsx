
// COMPONENTE FILTROS 


import React from 'react';
import { FILTER_OPTIONS } from '../types/pokemon';
import type { FilterOption } from '../types/pokemon';

interface FilterButtonsProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  loading: boolean;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  currentFilter, 
  onFilterChange, 
  loading 
}) => {
  return (
    <div className="mb-8">
      {/* Título de sección */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
           Filtros de Análisis
        </h2>
        <p className="text-gray-600">
          Selecciona un filtro para analizar los datos de la Pokédex
        </p>
      </div>

      {/* Grid de botones de filtro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {FILTER_OPTIONS.map((option: FilterOption, index) => {
          const isActive = currentFilter === option.id;
          const isDisabled = loading;

          return (
            <button
              key={option.id}
              onClick={() => !isDisabled && onFilterChange(option.id)}
              disabled={isDisabled}
              className={`
                relative group p-6 rounded-2xl transition-all duration-300 transform
                ${isActive 
                  ? `bg-gradient-to-br ${option.color} text-white shadow-xl scale-105 border-2 border-white/20` 
                  : 'bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 hover:border-gray-300/50 hover:scale-102 hover:bg-white'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
                focus:outline-none focus:ring-4 focus:ring-blue-500/20
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'slideInUp 0.5s ease-out forwards'
              }}
            >
              {/* Indicador activo */}
              {isActive && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}

              {/* Emoji grande */}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {option.emoji}
              </div>

              {/* Título del filtro */}
              <h3 className={`
                text-lg font-bold mb-2 transition-colors duration-300
                ${isActive ? 'text-white drop-shadow-sm' : 'text-slate-800 group-hover:text-slate-900'}
              `}>
                {option.label}
              </h3>

              {/* Descripción */}
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isActive ? 'text-white/90' : 'text-slate-600'
              }`}>
                {option.description}
              </p>

              {/* Barra decorativa */}
              <div className={`
                absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-300
                ${isActive 
                  ? 'w-3/4 bg-blue-500' 
                  : 'w-0 bg-gray-300 group-hover:w-1/2'
                }
              `} />

              {/* Efecto de carga */}
              {loading && isActive && (
                <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}

              {/* Efecto hover brillante */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-700 group-hover:translate-x-full rounded-2xl overflow-hidden" />
            </button>
          );
        })}
      </div>

      {/* Información adicional */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full">
          <span className="text-blue-600 text-sm"></span>
          <span className="text-blue-800 text-sm font-medium">
            Haz clic en cualquier filtro para ver los resultados
          </span>
        </div>
      </div>
    </div>
  );
};

// Estilos CSS para animaciones
const styles = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Agregar estilos dinámicamente
if (typeof document !== 'undefined' && !document.getElementById('filter-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'filter-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default FilterButtons;