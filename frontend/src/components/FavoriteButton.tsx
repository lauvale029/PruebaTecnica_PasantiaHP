// 
// COMPONENTE BOTÓN FAVORITO
// 

import React, { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  pokemonId: number;
  pokemonName: string;
  className?: string;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  pokemonId,
  pokemonName,
  className = '',
  showText = false,
  size = 'medium'
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const isCurrentlyFavorite = isFavorite(pokemonId);

  const handleToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setMessage('');

    try {
      const response = await toggleFavorite(pokemonId);
      
      // Mostrar mensaje temporal
      setMessage(response.message);
      setTimeout(() => setMessage(''), 2000);
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setMessage('Error al modificar favorito');
      setTimeout(() => setMessage(''), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`favorite-button-container ${className}`}>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`favorite-button ${size} ${isCurrentlyFavorite ? 'is-favorite' : 'not-favorite'} ${isLoading ? 'loading' : ''}`}
        title={isCurrentlyFavorite ? `Remover ${pokemonName} de favoritos` : `Agregar ${pokemonName} a favoritos`}
        aria-label={isCurrentlyFavorite ? `Remover ${pokemonName} de favoritos` : `Agregar ${pokemonName} a favoritos`}
      >
        <span className="favorite-icon">
          {isLoading ? (
            <span className="loading-spinner">⏳</span>
          ) : isCurrentlyFavorite ? (
            <span className="filled-star">⭐</span>
          ) : (
            <span className="empty-star">☆</span>
          )}
        </span>
        
        {showText && (
          <span className="favorite-text">
            {isCurrentlyFavorite ? 'Favorito' : 'Agregar'}
          </span>
        )}
      </button>
      
      {message && (
        <div className="favorite-message">
          {message}
        </div>
      )}
    </div>
  );
};