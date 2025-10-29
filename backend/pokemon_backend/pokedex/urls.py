from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


# CONFIGURACIÓN DE RUTAS PARA LA API


# Router automático de DRF para ViewSets
router = DefaultRouter()
router.register(r'pokemon', views.PokemonViewSet, basename='pokemon')
router.register(r'favorites', views.PokemonFavoriteViewSet, basename='favorites')

# Todas las URLs de la app pokedex
urlpatterns = [
    # Incluir todas las rutas del router
    path('api/', include(router.urls)),
]


# RUTAS GENERADAS AUTOMÁTICAMENTE:

# 🔍 POKÉMON ENDPOINTS
# GET    /api/pokemon/                    -> Lista primeros 50 Pokémon
# POST   /api/pokemon/load-pokemon-data/ -> Carga datos desde PokéAPI
# GET    /api/pokemon/weight-filter/     -> Pokémon con peso entre 30-80 
# GET    /api/pokemon/grass-type/        -> Pokémon tipo grass  
# GET    /api/pokemon/flying-tall/       -> Pokémon flying con altura > 10
# GET    /api/pokemon/{id}/              -> Detalle de un Pokémon específico

# ⭐ FAVORITOS ENDPOINTS
# GET    /api/favorites/                 -> Lista favoritos del usuario
# POST   /api/favorites/                 -> Agregar Pokémon a favoritos  
# DELETE /api/favorites/{id}/           -> Remover de favoritos
# POST   /api/favorites/toggle/          -> Toggle favorito (agregar/quitar)
# GET    /api/favorites/check/{pokemon_id}/ -> Verificar si es favorito
#