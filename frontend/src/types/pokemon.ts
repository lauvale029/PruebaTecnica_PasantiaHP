
// TIPOS TYPESCRIPT PARA LA POKÉDEX


export interface Pokemon {
  id: number;
  pokemon_id: number;
  name: string;
  types: string[];
  height: number;          
  weight: number;          
  sprite_url: string | null;
  reversed_name: string;
  types_display: string;
  created_at: string;
  updated_at: string;
}

export interface PokemonResponse {
  count: number;
  results: Pokemon[];
  message: string;
  filter_applied?: string;
}

export interface LoadResponse {
  message: string;
  total_loaded: number;
  errors: string[];
}

// Opciones de filtro para la UI
export interface FilterOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

// Estado de carga
export interface LoadingState {
  isLoading: boolean;
  isInitialLoad: boolean;
  message: string;
}

// Traducciones de tipos de Pokémon al español
export const TYPE_TRANSLATIONS: Record<string, string> = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

// Colores profesionales para los tipos de Pokémon
export const TYPE_COLORS: Record<string, string> = {
  normal: '#8B7355',
  fire: '#E74C3C',
  water: '#3498DB',
  electric: '#F1C40F',
  grass: '#27AE60',
  ice: '#5DADE2',
  fighting: '#C0392B',
  poison: '#8E44AD',
  ground: '#D68910',
  flying: '#7D3C98',
  psychic: '#E91E63',
  bug: '#7CB342',
  rock: '#8D6E63',
  ghost: '#5B2C87',
  dragon: '#5E35B1',
  dark: '#37474F',
  steel: '#607D8B',
  fairy: '#EC407A',
};

export const FILTER_OPTIONS: FilterOption[] = [
  {
    id: 'all',
    label: 'Todos los Pokémon',
    emoji: '',
    description: 'Lista completa de los primeros 50 Pokémon',
    color: 'from-slate-600 to-slate-700'
  },
  {
    id: 'weight',
    label: 'Filtro por Peso',
    emoji: '',
    description: 'Pokémon que pesen más de 30 y menos de 80',
    color: 'from-amber-600 to-orange-600'
  },
  {
    id: 'grass',
    label: 'Tipo Planta',
    emoji: '',
    description: 'Todos los Pokémon tipo Planta',
    color: 'from-emerald-600 to-green-600'
  },
  {
    id: 'flying',
    label: 'Tipo Volador Alto',
    emoji: '',
    description: 'Pokémon tipo Volador que midan más de 10',
    color: 'from-violet-600 to-purple-600'
  }
];