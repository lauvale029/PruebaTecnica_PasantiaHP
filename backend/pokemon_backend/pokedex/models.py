from django.db import models
from django.contrib.auth.models import User

class Pokemon(models.Model):
    """
    Modelo para almacenar información de Pokémon obtenida de la PokéAPI
    
    Campos requeridos por el profesor Oak:
    - ID
    - Nombre  
    - Tipo(s)
    - Altura
    - Peso
    """
    
    # Campo único para el ID del Pokémon en la PokéAPI
    pokemon_id = models.IntegerField(unique=True, help_text="ID único del Pokémon en la PokéAPI")
    
    # Información básica
    name = models.CharField(max_length=100, help_text="Nombre del Pokémon")
    
    # Los tipos se almacenan como JSON porque un Pokémon puede tener múltiples tipos
    types = models.JSONField(help_text="Lista de tipos del Pokémon (ej: ['grass', 'poison'])")
    
    # Medidas físicas (valores directos de la PokéAPI, sin conversiones)
    height = models.IntegerField(help_text="Altura en unidades de la PokéAPI")
    weight = models.IntegerField(help_text="Peso en unidades de la PokéAPI")
    
    # URL del sprite para mostrar la imagen
    sprite_url = models.URLField(blank=True, null=True, help_text="URL de la imagen del Pokémon")
    
    # Timestamps para saber cuándo se creó/actualizó
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['pokemon_id']  # Ordenar por ID de Pokémon
        verbose_name = "Pokémon"
        verbose_name_plural = "Pokémon"
    
    def __str__(self):
        return f"#{self.pokemon_id:03d} - {self.name.title()}"


    # PROPIEDADES CALCULADAS

    
    @property
    def reversed_name(self):
        """
        Requisito 4: Devuelve el nombre invertido
        Ejemplo: 'bulbasaur' → 'ruasablub'
        """
        return self.name[::-1]
    
    @property
    def types_display(self):
        """Convierte la lista de tipos en texto legible"""
        if not self.types:
            return "Unknown"
        return " / ".join([t.title() for t in self.types])
    

    # MÉTODOS PARA LOS FILTROS DEL PROFESOR OAK

    
    def matches_weight_filter(self):
        """Requisito 1: Verifica si pesa más de 30 y menos de 80 (valores directos API)"""
        return 30 < self.weight < 80
    
    def is_grass_type(self):
        """Requisito 2: Verifica si es tipo grass"""
        return 'grass' in self.types if self.types else False
    
    def is_flying_and_tall(self):
        """Requisito 3: Verifica si es tipo flying y mide más de 10 (valores directos API)"""
        is_flying = 'flying' in self.types if self.types else False
        is_tall = self.height > 10
        return is_flying and is_tall


class PokemonFavorite(models.Model):
    """
    Modelo simple para gestionar Pokémon favoritos generales
    Sin usuarios - es una aplicación personal de una sola persona
    """
    
    # Relación con el Pokémon (único - no puede haber duplicados)
    pokemon = models.OneToOneField(Pokemon, on_delete=models.CASCADE, related_name='is_favorite')
    
    # Timestamp de cuándo se agregó a favoritos
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']  # Los más recientes primero
        verbose_name = "Pokémon Favorito"
        verbose_name_plural = "Pokémon Favoritos"
    
    def __str__(self):
        return f"⭐ {self.pokemon.name.title()}"
