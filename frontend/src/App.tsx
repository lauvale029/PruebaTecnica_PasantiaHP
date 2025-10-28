
import { usePokemon } from './hooks/usePokemon';
import ErrorBoundary from './components/ErrorBoundary';
import { InitialLoadingScreen } from './components/LoadingSpinner';
import PokemonGrid from './components/PokemonGrid';
import './App.css';

function App() {
  const {
    pokemon,
    loading,
    currentFilter,
    dataLoaded,
    error,
    loadPokemonData,
    fetchPokemon,
    resetError
  } = usePokemon();

  // Pantalla de carga inicial
  if (loading.isInitialLoad) {
    return <InitialLoadingScreen message={loading.message} />;
  }

  // Pantalla inicial: datos no cargados
  if (!dataLoaded && !error) {
    return (
      <div className="app">
        <div className="app-container">
          <div className="header">
            <h1>Análisis Pokedex</h1>
            <p>Base de datos para el análisis de la Pokedex</p>
          </div>
          
          <div className="navigation">
            <div className="nav-title">Inicializar Base de Datos</div>
            <p style={{textAlign: 'center', marginBottom: '2rem', color: 'var(--gray-600)'}}>
              Cargar los primeros 50 Pokémon desde PokéAPI para comenzar el análisis
            </p>
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button
                onClick={loadPokemonData}
                disabled={loading.isLoading}
                className="filter-option"
                style={{minWidth: '300px'}}
              >
                {loading.isLoading ? (
                  <div>
                    <div className="filter-title">Cargando Datos...</div>
                    <div className="filter-description">Por favor espere mientras obtenemos los datos</div>
                  </div>
                ) : (
                  <div>
                    <div className="filter-title">Cargar Base de Datos</div>
                    <div className="filter-description">Inicializar sistema con los primeros 50 Pokémon</div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="app-container">
          {/* Header */}
          <div className="header">
            <h1>Análisis Pokedex</h1>
            <p>Base de datos para el análisis de la Pokedex</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-container">
              <div className="error-icon">!</div>
              <div className="error-title">Error del Sistema</div>
              <div className="error-message">{error}</div>
              <button 
                onClick={resetError}
                className="filter-option"
                style={{marginTop: '1rem', minWidth: '200px'}}
              >
                <div className="filter-title">Reintentar</div>
                <div className="filter-description">Intentar nuevamente</div>
              </button>
            </div>
          )}

          {/* Main Navigation - Analysis Options */}
          {!error && (
            <div className="navigation">
              <div className="nav-title">Opciones de Consulta</div>
              <p style={{textAlign: 'center', marginBottom: '2rem', color: 'var(--gray-600)'}}>
                Seleccione el tipo de análisis que desea realizar sobre la base de datos Pokémon
              </p>
              
              <div className="filter-grid">
                {/* Consulta 1: Todos los Pokémon */}
                <div className="analysis-card">
                  <div className="analysis-header">
                    <h3 className="analysis-title">Base de Datos Completa</h3>
                    <p className="analysis-description">
                      Visualizar todos los primeros 50 Pokémon con información completa incluyendo nombres invertidos
                    </p>
                  </div>
                  <button
                    onClick={() => fetchPokemon('all')}
                    disabled={loading.isLoading}
                    className={`analysis-button ${currentFilter === 'all' ? 'active' : ''}`}
                  >
                    Ver Información Completa
                  </button>
                </div>

                {/* Consulta 2: Filtro por Peso */}
                <div className="analysis-card">
                  <div className="analysis-header">
                    <h3 className="analysis-title">Filtro por Peso</h3>
                    <p className="analysis-description">
                      Pokémon que pesen más de 30 y menos de 80 unidades de peso
                    </p>
                  </div>
                  <button
                    onClick={() => fetchPokemon('weight')}
                    disabled={loading.isLoading}
                    className={`analysis-button ${currentFilter === 'weight' ? 'active' : ''}`}
                  >
                    Aplicar Filtro de Peso
                  </button>
                </div>

                {/* Consulta 3: Tipo Grass */}
                <div className="analysis-card">
                  <div className="analysis-header">
                    <h3 className="analysis-title">Pokémon Tipo Grass</h3>
                    <p className="analysis-description">
                      Todos los Pokémon que tengan clasificación de tipo "Grass" (Planta)
                    </p>
                  </div>
                  <button
                    onClick={() => fetchPokemon('grass')}
                    disabled={loading.isLoading}
                    className={`analysis-button ${currentFilter === 'grass' ? 'active' : ''}`}
                  >
                    Ver Pokémon Tipo Grass
                  </button>
                </div>

                {/* Consulta 4: Tipo Flying con altura */}
                <div className="analysis-card">
                  <div className="analysis-header">
                    <h3 className="analysis-title">Pokémon Tipo Flying Altos</h3>
                    <p className="analysis-description">
                      Pokémon tipo "Flying" (Volador) que midan más de 10 unidades de altura
                    </p>
                  </div>
                  <button
                    onClick={() => fetchPokemon('flying')}
                    disabled={loading.isLoading}
                    className={`analysis-button ${currentFilter === 'flying' ? 'active' : ''}`}
                  >
                    Ver Pokémon Flying Altos
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading.isLoading && !loading.isInitialLoad && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Procesando consulta, por favor espere...</div>
            </div>
          )}

          {/* Results Display */}
          {!error && !loading.isLoading && pokemon.length > 0 && (
            <div style={{marginTop: '2rem'}}>
              <div style={{
                background: 'var(--white)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--gray-800)',
                  marginBottom: '0.5rem'
                }}>
                  Resultados del Análisis
                </h2>
                <p style={{color: 'var(--gray-600)'}}>
                  Se encontraron {pokemon.length} Pokémon que coinciden con los criterios seleccionados
                </p>
              </div>

              <PokemonGrid
                pokemon={pokemon}
                loading={loading.isLoading}
                message={loading.message}
              />
            </div>
          )}

          {/* No Results State */}
          {!error && !loading.isLoading && pokemon.length === 0 && currentFilter !== 'none' && (
            <div className="error-container">
              <div className="error-icon">?</div>
              <div className="error-title">No se Encontraron Resultados</div>
              <div className="error-message">
                No hay Pokémon que coincidan con los criterios seleccionados. Pruebe con un análisis diferente.
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
