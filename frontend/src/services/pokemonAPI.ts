
// SERVICIO API PARA POKÉMON


import axios from 'axios';
import type { PokemonResponse, LoadResponse } from '../types/pokemon';

// Configuración base de Axios
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos para carga de datos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en API:', error);
    if (error.code === 'ECONNREFUSED') {
      throw new Error('No se puede conectar al servidor. ¿Está corriendo Django?');
    }
    throw error;
  }
);


// SERVICIOS DE LA POKÉDEX


export const pokemonAPI = {
  /**
   *  Obtener todos los Pokémon (primeros 50)
   */
  getAllPokemon: async (): Promise<PokemonResponse> => {
    const response = await api.get<PokemonResponse>('/pokemon/');
    return response.data;
  },

  /**
   *  FILTRO 1: Pokémon que pesen más de 30 y menos de 80
   */
  getWeightFiltered: async (): Promise<PokemonResponse> => {
    const response = await api.get<PokemonResponse>('/pokemon/weight-filter/');
    return response.data;
  },

  /**
   *  FILTRO 2: Pokémon tipo grass
   */
  getGrassType: async (): Promise<PokemonResponse> => {
    const response = await api.get<PokemonResponse>('/pokemon/grass-type/');
    return response.data;
  },

  /**
   *  FILTRO 3: Pokémon tipo flying que midan más de 10
   */
  getFlyingTall: async (): Promise<PokemonResponse> => {
    const response = await api.get<PokemonResponse>('/pokemon/flying-tall/');
    return response.data;
  },

  /**
   *  Cargar datos desde la PokéAPI
   */
  loadPokemonData: async (): Promise<LoadResponse> => {
    const response = await api.post<LoadResponse>('/pokemon/load-pokemon-data/');
    return response.data;
  },

  /**
   *  Obtener estadísticas generales
   */
  getStats: async () => {
    const response = await api.get('/pokemon/stats/');
    return response.data;
  },
};


// UTILIDADES


export const API_ENDPOINTS = {
  ALL: '/pokemon/',
  WEIGHT_FILTER: '/pokemon/weight-filter/',
  GRASS_TYPE: '/pokemon/grass-type/',
  FLYING_TALL: '/pokemon/flying-tall/',
  LOAD_DATA: '/pokemon/load-pokemon-data/',
  STATS: '/pokemon/stats/',
} as const;

export const isServerRunning = async (): Promise<boolean> => {
  try {
    await api.get('/pokemon/');
    return true;
  } catch {
    return false;
  }
};