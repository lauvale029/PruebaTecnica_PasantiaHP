from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
import requests
import logging
from .models import Pokemon, PokemonFavorite
from .serializers import (
    PokemonSerializer, 
    PokemonBasicSerializer, 
    PokemonLoadStatusSerializer,
    PokemonFavoriteSerializer
)

# Configurar logging para debug
logger = logging.getLogger(__name__)


class PokemonViewSet(viewsets.ModelViewSet):
    """
    ViewSet principal para manejar todas las operaciones con Pokémon
    
    Endpoints disponibles:
    - GET /pokemon/ : Lista los primeros 50 Pokémon
    - POST /pokemon/load_pokemon_data/ : Carga datos desde PokéAPI
    - GET /pokemon/weight_filter/ : Pokémon que pesen entre 30-80 kg
    - GET /pokemon/grass_type/ : Pokémon tipo grass
    - GET /pokemon/flying_tall/ : Pokémon tipo flying > 1 metro
    """
    
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    
    def get_serializer_class(self):
        """
        Usa serializer básico para listados, completo para detalles
        """
        if self.action == 'list':
            return PokemonBasicSerializer
        return PokemonSerializer
    
    def list(self, request):
        """
        TABLA PRINCIPAL: Lista los primeros 50 Pokémon
        
        Esta es la tabla base que pide el profesor Oak con:
        - ID, Nombre, Tipo(s), Altura, Peso
        - Plus: Nombres invertidos (columna adicional)
        """
        queryset = self.queryset.order_by('pokemon_id')[:50]
        serializer = self.get_serializer(queryset, many=True)
        
        return Response({
            'count': queryset.count(),
            'results': serializer.data,
            'message': 'Primeros 50 Pokémon - Tabla Principal'
        })
    

    # FILTROS REQUERIDOS POR EL PROFESOR OAK

    
    @action(detail=False, methods=['get'], url_path='weight-filter')
    def weight_filter(self, request):
        """
         REQUISITO 1: Pokémon que pesen más de 30 y menos de 80
        
        Usando valores directos de la PokéAPI (sin conversiones)
        Condición: 30 < peso < 80
        """
        queryset = self.queryset.filter(
            weight__gt=30,   # > 30 (mayor que)
            weight__lt=80    # < 80 (menor que)
        ).order_by('pokemon_id')
        
        serializer = PokemonBasicSerializer(queryset, many=True)
        
        return Response({
            'count': queryset.count(),
            'results': serializer.data,
            'filter_applied': 'Peso más de 30 y menos de 80',
            'message': f'Encontrados {queryset.count()} Pokémon con peso entre 30-80'
        })
    
    @action(detail=False, methods=['get'], url_path='grass-type')
    def grass_type(self, request):
        """
         REQUISITO 2: Pokémon tipo "grass"
        
        Usa el método del modelo para filtrar por tipo grass
        """
        # Obtener todos los Pokémon y filtrar usando el método del modelo
        all_pokemon = self.queryset.all()
        grass_pokemon = [p for p in all_pokemon if p.is_grass_type()]
        
        serializer = PokemonBasicSerializer(grass_pokemon, many=True)
        
        return Response({
            'count': len(grass_pokemon),
            'results': serializer.data,
            'filter_applied': 'Tipo: Grass',
            'message': f'Encontrados {len(grass_pokemon)} Pokémon tipo Grass'
        })
    
    @action(detail=False, methods=['get'], url_path='flying-tall')
    def flying_tall(self, request):
        """
         REQUISITO 3: Pokémon tipo "flying" que midan más de 10
        
        Usa el método del modelo para filtrar por tipo flying alto
        """
        # Obtener todos los Pokémon y filtrar usando el método del modelo
        all_pokemon = self.queryset.all()
        flying_tall_pokemon = [p for p in all_pokemon if p.is_flying_and_tall()]
        
        serializer = PokemonBasicSerializer(flying_tall_pokemon, many=True)
        
        return Response({
            'count': len(flying_tall_pokemon),
            'results': serializer.data,
            'filter_applied': 'Tipo Flying y altura > 10',
            'message': f'Encontrados {len(flying_tall_pokemon)} Pokémon tipo Flying altos'
        })
    

    # CARGA DE DATOS DESDE POKÉAPI

    
    @action(detail=False, methods=['post'], url_path='load-pokemon-data')
    def load_pokemon_data(self, request):
        """
         Carga los primeros 50 Pokémon desde la PokéAPI
        
        Este endpoint:
        1. Consulta la PokéAPI para cada Pokémon (1-50)
        2. Extrae la información necesaria
        3. Guarda en nuestra base de datos
        4. Maneja errores si la API no responde
        """
        try:
            loaded_count = 0
            errors = []
            
            logger.info("Iniciando carga de datos desde PokéAPI...")
            
            for pokemon_id in range(1, 51):  # Primeros 50 Pokémon
                try:
                    # Consultar PokéAPI
                    response = requests.get(
                        f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}',
                        timeout=10  # Timeout de 10 segundos
                    )
                    
                    if response.status_code == 200:
                        data = response.json()
                        
                        # Extraer tipos del JSON de la PokéAPI
                        types = [type_info['type']['name'] for type_info in data['types']]
                        
                        # Crear o actualizar Pokémon en nuestra DB
                        pokemon, created = Pokemon.objects.get_or_create(
                            pokemon_id=data['id'],
                            defaults={
                                'name': data['name'],
                                'types': types,
                                'height': data['height'],
                                'weight': data['weight'],
                                'sprite_url': data['sprites']['front_default']
                            }
                        )
                        
                        # Si ya existía, actualizar datos
                        if not created:
                            pokemon.name = data['name']
                            pokemon.types = types
                            pokemon.height = data['height']
                            pokemon.weight = data['weight']
                            pokemon.sprite_url = data['sprites']['front_default']
                            pokemon.save()
                        
                        loaded_count += 1
                        logger.info(f"Pokémon #{pokemon_id} - {data['name']} cargado correctamente")
                        
                    else:
                        error_msg = f"Error HTTP {response.status_code} para Pokémon #{pokemon_id}"
                        errors.append(error_msg)
                        logger.warning(error_msg)
                        
                except requests.RequestException as e:
                    error_msg = f"Error de conexión para Pokémon #{pokemon_id}: {str(e)}"
                    errors.append(error_msg)
                    logger.error(error_msg)
                
                except Exception as e:
                    error_msg = f"Error inesperado para Pokémon #{pokemon_id}: {str(e)}"
                    errors.append(error_msg)
                    logger.error(error_msg)
            
            # Preparar respuesta
            response_data = {
                'message': f'Carga completada: {loaded_count}/50 Pokémon cargados',
                'total_loaded': loaded_count,
                'errors': errors[:5] if errors else []  # Solo primeros 5 errores
            }
            
            logger.info(f"Carga finalizada: {loaded_count} Pokémon cargados")
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error crítico en carga de datos: {str(e)}")
            return Response({
                'message': f'Error crítico: {str(e)}',
                'total_loaded': 0,
                'errors': [str(e)]
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PokemonFavoriteViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar favoritos simples (sin usuarios)
    Sistema personal - cualquiera puede agregar/quitar favoritos
    
    Endpoints disponibles:
    - GET /favorites/ : Lista todos los favoritos
    - POST /favorites/ : Agregar Pokémon a favoritos
    - DELETE /favorites/{id}/ : Remover de favoritos
    - POST /favorites/toggle/ : Toggle favorito (agregar/quitar)
    """
    
    queryset = PokemonFavorite.objects.all()
    serializer_class = PokemonFavoriteSerializer
    
    def list(self, request):
        """
        Lista todos los Pokémon favoritos
        """
        queryset = self.queryset.order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        
        return Response({
            'count': queryset.count(),
            'results': serializer.data,
            'message': f'{queryset.count()} Pokémon favoritos'
        })
    
    def create(self, request):
        """
        Agregar un Pokémon a favoritos
        Requiere: { "pokemon_id": 123 }
        """
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            try:
                favorite = serializer.save()
                return Response({
                    'message': f'{favorite.pokemon.name} agregado a favoritos',
                    'favorite': PokemonFavoriteSerializer(favorite).data
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                return Response({
                    'error': f'Error al agregar favorito: {str(e)}'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        """
        Remover un Pokémon de favoritos
        """
        try:
            favorite = self.queryset.get(pk=pk)
            pokemon_name = favorite.pokemon.name
            favorite.delete()
            
            return Response({
                'message': f'{pokemon_name} removido de favoritos'
            }, status=status.HTTP_200_OK)
            
        except PokemonFavorite.DoesNotExist:
            return Response({
                'error': 'Favorito no encontrado'
            }, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['post'], url_path='toggle')
    def toggle_favorite(self, request):
        """
        Toggle favorito: agregar si no existe, quitar si existe
        Requiere: { "pokemon_id": 123 }
        """
        pokemon_id = request.data.get('pokemon_id')
        
        if not pokemon_id:
            return Response({
                'error': 'pokemon_id es requerido'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            pokemon = Pokemon.objects.get(pokemon_id=pokemon_id)
        except Pokemon.DoesNotExist:
            return Response({
                'error': f'Pokémon con ID {pokemon_id} no encontrado'
            }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            # Intentar encontrar favorito existente
            favorite = PokemonFavorite.objects.get(pokemon=pokemon)
            # Si existe, removerlo
            favorite.delete()
            
            return Response({
                'action': 'removed',
                'message': f'{pokemon.name} removido de favoritos',
                'is_favorite': False
            })
            
        except PokemonFavorite.DoesNotExist:
            # Si no existe, agregarlo
            favorite = PokemonFavorite.objects.create(pokemon=pokemon)
            
            return Response({
                'action': 'added',
                'message': f'{pokemon.name} agregado a favoritos',
                'is_favorite': True,
                'favorite': PokemonFavoriteSerializer(favorite).data
            })
    
    @action(detail=False, methods=['get'], url_path='check/(?P<pokemon_id>[^/.]+)')
    def check_favorite(self, request, pokemon_id=None):
        """
        Verificar si un Pokémon específico está en favoritos
        GET /favorites/check/25/ -> Verifica si Pikachu es favorito
        """
        try:
            pokemon = Pokemon.objects.get(pokemon_id=pokemon_id)
            is_favorite = PokemonFavorite.objects.filter(pokemon=pokemon).exists()
            
            return Response({
                'pokemon_id': int(pokemon_id),
                'pokemon_name': pokemon.name,
                'is_favorite': is_favorite
            })
            
        except Pokemon.DoesNotExist:
            return Response({
                'error': f'Pokémon con ID {pokemon_id} no encontrado'
            }, status=status.HTTP_404_NOT_FOUND)
