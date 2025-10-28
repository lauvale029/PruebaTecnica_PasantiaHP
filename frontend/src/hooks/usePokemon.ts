
// HOOK PERSONALIZADO PARA POKÉMON


import { useState, useCallback } from 'react';
import { pokemonAPI } from '../services/pokemonAPI';
import { FILTER_OPTIONS } from '../types/pokemon';
import type { Pokemon, LoadingState, FilterOption } from '../types/pokemon';

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    isInitialLoad: false,
    message: ''
  });
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  
  // FUNCIONES DE FILTRADO
  

  const fetchPokemon = useCallback(async (filter: string) => {
    setLoading(prev => ({
      ...prev,
      isLoading: true,
      message: ' Aplicando filtro...'
    }));
    setError(null);

    try {
      let response;
      
      switch (filter) {
        case 'all':
          response = await pokemonAPI.getAllPokemon();
          break;
        case 'weight':
          response = await pokemonAPI.getWeightFiltered();
          break;
        case 'grass':
          response = await pokemonAPI.getGrassType();
          break;
        case 'flying':
          response = await pokemonAPI.getFlyingTall();
          break;
        default:
          throw new Error(`Filtro desconocido: ${filter}`);
      }

      setPokemon(response.results);
      setCurrentFilter(filter);
      
      setLoading(prev => ({
        ...prev,
        isLoading: false,
        message: response.message
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error aplicando filtro: ${errorMessage}`);
      setLoading(prev => ({
        ...prev,
        isLoading: false,
        message: ''
      }));
    }
  }, []);


  // FUNCIONES DE CARGA DE DATOS


  const loadPokemonData = useCallback(async () => {
    setLoading({
      isLoading: true,
      isInitialLoad: true,
      message: ' Cargando datos desde PokéAPI...'
    });
    setError(null);

    try {
      const response = await pokemonAPI.loadPokemonData();
      setDataLoaded(true);
      
      // Después de cargar, obtener la lista principal
      await fetchPokemon('all');
      
      setLoading({
        isLoading: false,
        isInitialLoad: false,
        message: response.message
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error cargando datos: ${errorMessage}`);
      setLoading({
        isLoading: false,
        isInitialLoad: false,
        message: ''
      });
    }
  }, [fetchPokemon]);

  
  // UTILIDADES


  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const getCurrentFilterInfo = useCallback((): FilterOption | null => {
    return FILTER_OPTIONS.find((f: FilterOption) => f.id === currentFilter) || null;
  }, [currentFilter]);

  
  // ESTADÍSTICAS CALCULADAS
  

  const stats = {
    totalCount: pokemon.length,
    hasData: pokemon.length > 0,
    isFiltered: currentFilter !== 'all',
    currentFilter: getCurrentFilterInfo(),
  };

  return {
    // Estado
    pokemon,
    loading,
    currentFilter,
    dataLoaded,
    error,
    stats,
    
    // Acciones
    loadPokemonData,
    fetchPokemon,
    resetError,
  };
};