from rest_framework import serializers
from .models import Pokemon, PokemonFavorite


class PokemonSerializer(serializers.ModelSerializer):
    """
    Serializer para convertir objetos Pokemon a JSON y viceversa
    
    Este serializer se encarga de:
    1. Convertir objetos Pokemon de Python a JSON para la API
    2. Incluir campos calculados como reversed_name
    3. Usar valores directos de la PokéAPI sin conversiones
    """
    
    # Campos calculados (solo lectura)
    reversed_name = serializers.CharField(read_only=True)
    types_display = serializers.CharField(read_only=True)
    
    # Campos de métodos útiles
    matches_weight_filter = serializers.SerializerMethodField()
    is_grass_type = serializers.SerializerMethodField()
    is_flying_and_tall = serializers.SerializerMethodField()
    
    class Meta:
        model = Pokemon
        fields = [
            # Campos básicos del modelo
            'id',
            'pokemon_id', 
            'name',
            'types',
            'height',        # Valores directos de la PokéAPI
            'weight',        # Valores directos de la PokéAPI
            'sprite_url',
            'created_at',
            'updated_at',
            
            # Campos calculados (propiedades)
            'reversed_name',
            'types_display',
            
            # Métodos de filtro
            'matches_weight_filter',
            'is_grass_type',
            'is_flying_and_tall',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    # MÉTODOS PARA CAMPOS CALCULADOS

    
    def get_matches_weight_filter(self, obj):
        """Indica si el Pokémon cumple el filtro de peso (30-80 kg)"""
        return obj.matches_weight_filter()
    
    def get_is_grass_type(self, obj):
        """Indica si el Pokémon es tipo grass"""
        return obj.is_grass_type()
    
    def get_is_flying_and_tall(self, obj):
        """Indica si el Pokémon es tipo flying y alto"""
        return obj.is_flying_and_tall()


class PokemonBasicSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listados rápidos
    Solo incluye los campos esenciales que pide el profesor Oak
    Con valores directos de la PokéAPI (sin conversiones)
    """
    
    reversed_name = serializers.CharField(read_only=True)
    types_display = serializers.CharField(read_only=True)
    
    class Meta:
        model = Pokemon
        fields = [
            'pokemon_id',
            'name', 
            'types',         # CAMPO AGREGADO - necesario para el frontend
            'reversed_name',
            'types_display',
            'height',        # Valor directo de PokéAPI
            'weight',        # Valor directo de PokéAPI
            'sprite_url',
        ]


class PokemonLoadStatusSerializer(serializers.Serializer):
    """
    Serializer para respuestas de carga de datos
    No está conectado a un modelo, solo maneja respuestas de estado
    """
    
    message = serializers.CharField()
    total_loaded = serializers.IntegerField(required=False)
    errors = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )


class PokemonFavoriteSerializer(serializers.ModelSerializer):
    """
    Serializer para gestionar favoritos simples (sin usuarios)
    Sistema personal de una sola persona
    """
    
    # Información completa del Pokémon (nested)
    pokemon = PokemonBasicSerializer(read_only=True)
    
    # Campo para recibir solo el ID del Pokémon al crear
    pokemon_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = PokemonFavorite
        fields = [
            'id',
            'pokemon',        # Información completa (lectura)
            'pokemon_id',     # Solo ID (escritura)
            'created_at',     # Cuándo se agregó
        ]
        read_only_fields = ['id', 'created_at']
    
    def create(self, validated_data):
        """
        Crear un nuevo favorito
        - Busca el Pokémon por ID
        - Crea el favorito (manejando duplicados)
        """
        pokemon_id = validated_data['pokemon_id']
        
        try:
            pokemon = Pokemon.objects.get(pokemon_id=pokemon_id)
        except Pokemon.DoesNotExist:
            raise serializers.ValidationError({
                'pokemon_id': f'No se encontró un Pokémon con ID {pokemon_id}'
            })
        
        # Crear o obtener el favorito (evita duplicados)
        favorite, created = PokemonFavorite.objects.get_or_create(
            pokemon=pokemon
        )
        
        if not created:
            raise serializers.ValidationError({
                'pokemon_id': f'{pokemon.name} ya está en favoritos'
            })
        
        return favorite