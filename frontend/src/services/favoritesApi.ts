
// API SERVICE PARA FAVORITOS


const API_BASE_URL = 'http://localhost:8000/api';

// Tipos para TypeScript
export interface Pokemon {
  pokemon_id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  sprite_url: string;
  reversed_name: string;
  types_display: string;
}

export interface PokemonFavorite {
  id: number;
  pokemon: Pokemon;
  created_at: string;
}

export interface FavoriteToggleResponse {
  action: 'added' | 'removed';
  message: string;
  is_favorite: boolean;
  favorite?: PokemonFavorite;
}

export interface FavoriteCheckResponse {
  pokemon_id: number;
  pokemon_name: string;
  is_favorite: boolean;
}


// FUNCIONES DE API PARA FAVORITOS


/**
 * Obtener todos los favoritos
 */
export const getFavorites = async (): Promise<PokemonFavorite[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error obteniendo favoritos:', error);
    throw error;
  }
};

/**
 * Toggle favorito (agregar/quitar)
 */
export const toggleFavorite = async (pokemonId: number): Promise<FavoriteToggleResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/toggle/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pokemon_id: pokemonId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error toggling favorito:', error);
    throw error;
  }
};

/**
 * Verificar si un Pokémon es favorito
 */
export const checkIsFavorite = async (pokemonId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/check/${pokemonId}/`);
    
    if (!response.ok) {
      return false; // Si hay error, asumir que no es favorito
    }
    
    const data: FavoriteCheckResponse = await response.json();
    return data.is_favorite;
  } catch (error) {
    console.error('Error verificando favorito:', error);
    return false;
  }
};

/**
 * Agregar a favoritos
 */
export const addToFavorites = async (pokemonId: number): Promise<PokemonFavorite> => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pokemon_id: pokemonId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }
    
    const data = await response.json();
    return data.favorite;
  } catch (error) {
    console.error('Error agregando favorito:', error);
    throw error;
  }
};

/**
 * Remover de favoritos
 */
export const removeFromFavorites = async (favoriteId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/${favoriteId}/`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }
  } catch (error) {
    console.error('Error removiendo favorito:', error);
    throw error;
  }
};