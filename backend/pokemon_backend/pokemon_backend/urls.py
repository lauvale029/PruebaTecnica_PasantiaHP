"""
URL configuration for pokemon_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Panel de administración de Django
    path('admin/', admin.site.urls),
    
    # API de Pokémon - Todas las rutas de nuestra app
    path('', include('pokedex.urls')),
]

# ========================================
# RUTAS COMPLETAS DISPONIBLES:
# ========================================
# 
# http://localhost:8000/admin/                         -> Panel admin Django
# http://localhost:8000/api/pokemon/                   -> Lista 50 Pokémon
# http://localhost:8000/api/pokemon/load-pokemon-data/ -> Cargar datos PokéAPI
# http://localhost:8000/api/pokemon/weight-filter/     -> Filtro peso 30-80kg
# http://localhost:8000/api/pokemon/grass-type/        -> Filtro tipo grass
# http://localhost:8000/api/pokemon/flying-tall/       -> Filtro flying > 1m
# http://localhost:8000/api/pokemon/stats/             -> Estadísticas
#
