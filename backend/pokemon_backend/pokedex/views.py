from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
import requests
import logging
from .models import Pokemon
from .serializers import PokemonSerializer, PokemonBasicSerializer, PokemonLoadStatusSerializer

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
    

    # ENDPOINT DE ESTADÍSTICAS 
    
    @action(detail=False, methods=['get'], url_path='stats')
    def get_stats(self, request):
        """
         Estadísticas generales de la Pokédex (bonus para el profesor Oak)
        """
        total_pokemon = self.queryset.count()
        weight_filtered = self.queryset.filter(weight__gt=30, weight__lt=80).count()
        grass_types = self.queryset.filter(types__contains=['grass']).count()
        flying_tall = self.queryset.filter(types__contains=['flying'], height__gt=10).count()
        
        return Response({
            'total_pokemon': total_pokemon,
            'filters_stats': {
                'weight_30_80_kg': weight_filtered,
                'grass_type': grass_types,
                'flying_tall': flying_tall,
            },
            'message': ' Estadísticas de la Pokédex del Profesor Oak'
        })
