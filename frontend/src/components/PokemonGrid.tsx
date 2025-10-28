
// COMPONENTE GRID DE POKÉMON - LAYOUT RESPONSIVO

import React from 'react';
import PokemonCard from './PokemonCard';
import type { Pokemon } from '../types/pokemon';

interface PokemonGridProps {
  pokemon: Pokemon[];
  loading: boolean;
  message?: string;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ 
  pokemon, 
  loading, 
  message 
}) => {
  // Si está cargando, no mostrar contenido
  if (loading) {
    return null;
  }

  // Si no hay datos
  if (pokemon.length === 0) {
    return (
      <div className="error-container">
        <div className="error-icon">?</div>
        <div className="error-title">No se encontraron Pokémon</div>
        <div className="error-message">
          No hay Pokémon que coincidan con el filtro seleccionado. Prueba con otro filtro o verifica que los datos estén cargados.
        </div>
      </div>
    );
  }

  // Calcular estadísticas
  const uniqueTypes = [...new Set(pokemon.flatMap(p => p.types || []))];
  const weights = pokemon.map(p => p.weight).filter(w => w != null);
  const minWeight = weights.length > 0 ? Math.min(...weights) : 0;
  const maxWeight = weights.length > 0 ? Math.max(...weights) : 0;

  return (
    <div>
      {/* Grid de Pokémon */}
      <div className="pokemon-grid">
        {pokemon.map((poke, index) => (
          <PokemonCard 
            key={poke.id || poke.pokemon_id} 
            pokemon={poke} 
            index={index}
          />
        ))}
      </div>

      {/* Estadísticas profesionales */}
      <div className="stats-section">
        <div className="stats-header">
          <h3>Estadísticas de la Consulta</h3>
          <p>Resumen de los datos analizados</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-icon">
              <div className="stat-icon-circle">
                <span>N</span>
              </div>
            </div>
            <div className="stat-content">
              <div className="stat-number">{pokemon.length}</div>
              <div className="stat-label">Pokémon Encontrados</div>
              <div className="stat-description">Total de registros que coinciden con el filtro</div>
            </div>
          </div>

          <div className="stat-card stat-secondary">
            <div className="stat-icon">
              <div className="stat-icon-circle">
                <span>T</span>
              </div>
            </div>
            <div className="stat-content">
              <div className="stat-number">{uniqueTypes.length}</div>
              <div className="stat-label">Tipos Diferentes</div>
              <div className="stat-description">Variedad de tipos de Pokémon encontrados</div>
            </div>
          </div>

          <div className="stat-card stat-accent">
            <div className="stat-icon">
              <div className="stat-icon-circle">
                <span>P</span>
              </div>
            </div>
            <div className="stat-content">
              <div className="stat-number">{minWeight} - {maxWeight}</div>
              <div className="stat-label">Rango de Peso</div>
              <div className="stat-description">Peso mínimo y máximo en unidades API</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonGrid;