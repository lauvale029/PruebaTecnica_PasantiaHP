
// HOOK PARA MANEJAR FAVORITOS


import { useState, useEffect, useCallback } from 'react';
import {
  getFavorites,
  toggleFavorite,
  checkIsFavorite
} from '../services/favoritesApi';
import type { PokemonFavorite, FavoriteToggleResponse } from '../services/favoritesApi';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<PokemonFavorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar favoritos iniciales
  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando favoritos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle favorito
  const handleToggleFavorite = useCallback(async (pokemonId: number) => {
    try {
      setError(null);
      const response: FavoriteToggleResponse = await toggleFavorite(pokemonId);
      
      if (response.action === 'added' && response.favorite) {
        // Agregar a la lista local
        setFavorites(prev => [response.favorite!, ...prev]);
      } else if (response.action === 'removed') {
        // Remover de la lista local
        setFavorites(prev => prev.filter(fav => fav.pokemon.pokemon_id !== pokemonId));
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error modificando favorito';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Verificar si un Pokémon es favorito
  const isFavorite = useCallback((pokemonId: number): boolean => {
    return favorites.some(fav => fav.pokemon.pokemon_id === pokemonId);
  }, [favorites]);

  // Verificar favorito desde servidor (para casos específicos)
  const checkFavoriteFromServer = useCallback(async (pokemonId: number): Promise<boolean> => {
    try {
      return await checkIsFavorite(pokemonId);
    } catch (err) {
      console.error('Error verificando favorito desde servidor:', err);
      return false;
    }
  }, []);

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    error,
    loadFavorites,
    toggleFavorite: handleToggleFavorite,
    isFavorite,
    checkFavoriteFromServer,
    favoritesCount: favorites.length
  };
};