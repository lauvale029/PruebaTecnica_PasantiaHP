from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


# CONFIGURACIÓN DE RUTAS PARA LA API


# Router automático de DRF para ViewSets
router = DefaultRouter()
router.register(r'pokemon', views.PokemonViewSet, basename='pokemon')

# Todas las URLs de la app pokedex
urlpatterns = [
    # Incluir todas las rutas del router
    path('api/', include(router.urls)),
]


# RUTAS GENERADAS AUTOMÁTICAMENTE:

# 
# GET    /api/pokemon/                    -> Lista primeros 50 Pokémon
# POST   /api/pokemon/load-pokemon-data/ -> Carga datos desde PokéAPI
# GET    /api/pokemon/weight-filter/     -> Pokémon 30-80 kg
# GET    /api/pokemon/grass-type/        -> Pokémon tipo grass  
# GET    /api/pokemon/flying-tall/       -> Pokémon flying > 1m
# GET    /api/pokemon/stats/             -> Estadísticas generales
# GET    /api/pokemon/{id}/              -> Detalle de un Pokémon específico
#