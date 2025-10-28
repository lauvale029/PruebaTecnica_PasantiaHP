
import React from 'react';
import type { Pokemon } from '../types/pokemon';
import { TYPE_TRANSLATIONS } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, index }) => {
  const formatId = (id: number) => `#${id.toString().padStart(3, '0')}`;
  const animationDelay = `${index * 0.1}s`;

  // Validación de datos
  if (!pokemon) {
    return (
      <div className="pokemon-card fade-in" style={{ animationDelay }}>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-500)' }}>
          Error: Datos del Pokémon no disponibles
        </div>
      </div>
    );
  }

  return (
    <div 
      className="pokemon-card fade-in"
      style={{ animationDelay }}
    >
      {/* Pokemon Header */}
      <div className="pokemon-header">
        {pokemon.sprite_url ? (
          <img
            src={pokemon.sprite_url}
            alt={pokemon.name}
            className="pokemon-image"
            loading="lazy"
          />
        ) : (
          <div className="pokemon-image" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'var(--gray-400)'
          }}>
            ?
          </div>
        )}
        
        <div className="pokemon-info">
          <h3>{pokemon.name || 'Nombre desconocido'}</h3>
          <div className="pokemon-id">{formatId(pokemon.pokemon_id || 0)}</div>
        </div>
      </div>

      {/* Pokemon Types */}
      <div className="pokemon-types">
        {pokemon.types && Array.isArray(pokemon.types) ? pokemon.types.map((type) => (
          <span
            key={type}
            className={`type-badge type-${type}`}
          >
            {TYPE_TRANSLATIONS[type] || type}
          </span>
        )) : (
          <span className="type-badge type-normal">
            Desconocido
          </span>
        )}
      </div>

      {/* Pokemon Stats */}
      <div className="pokemon-stats">
        <div className="stat-item">
          <div className="stat-label">Altura</div>
          <div className="stat-value">{pokemon.height || 'N/A'}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Peso</div>
          <div className="stat-value">{pokemon.weight || 'N/A'}</div>
        </div>
      </div>

      {/* Reversed Name */}
      <div className="reversed-name">
        <div className="reversed-name-label">Nombre Invertido</div>
        <div className="reversed-name-value">{pokemon.reversed_name || 'N/A'}</div>
      </div>
    </div>
  );
};

export default PokemonCard;