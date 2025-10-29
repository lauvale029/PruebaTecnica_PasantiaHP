# 🚀 **Pokédx - Prueba Técnica HP**

## 👨‍💻 **Desarrollado por Laura Valentina Pabón Cabezas**


### 🌟 **Perfil Profesional**

Estudiante de **Ingeniería de Sistemas** con experiencia sólida en análisis de datos y desarrollo de software, especializado en tecnologías modernas como **Python**, **SQL**, **React**, **FastAPI** y entornos cloud (**AWS**, **Azure**, **Docker**). 

Me caracterizo por ser una persona con **liderazgo**, **comunicación asertiva** y **capacidad para trabajar en equipo**, cualidades que me permiten aportar al logro de objetivos comunes y crear un ambiente de colaboración positivo. Me apasiona **aprender continuamente** y afrontar nuevos retos, por esto busco contribuir con **soluciones innovadoras** que generen impacto real.

### �️ **Competencias Técnicas**

<div align="center">

![Python](https://img.shields.io/badge/Python-Expert-3776AB?style=flat&logo=python&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-Advanced-336791?style=flat&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-Advanced-61DAFB?style=flat&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-Advanced-009688?style=flat&logo=fastapi&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-Intermediate-FF9900?style=flat&logo=amazon-aws&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-Intermediate-0078D4?style=flat&logo=microsoft-azure&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Intermediate-2496ED?style=flat&logo=docker&logoColor=white)

</div>

**🔧 Tecnologías**: Python, JavaScript, TypeScript, SQL, Django, React, FastAPI, Node.js  
**☁️ Cloud**: AWS (EC2, S3, RDS), Azure (App Service, SQL Database), Docker, CI/CD  
**📊 Datos**: Análisis de datos, ETL, Bases de datos relacionales, APIs REST  
**🎨 Frontend**: React, TypeScript, CSS3, Responsive Design, UI/UX  
**🤝 Soft Skills**: Liderazgo, Comunicación asertiva, Trabajo en equipo, Resolución de problemas

### �📞 **Contacto**
- 📧 **Email**: [lapabon@unal.edu.co](mailto:lapabon@unal.edu.co)
- 🐙 **GitHub**: [@lauvale029](https://github.com/lauvale029)
- 🎓 **Universidad**: Nacional de Colombia
- 💼 **LinkedIn**: [Laura Valentina Pabón Cabezas](https://www.linkedin.com/in/valentina-pab%C3%B3n-cabezas/)
- 📍 **Ubicación**: Colombia

---

## 📋 **Sobre Este Proyecto**

Una aplicación web fullstack para análisis y gestión de datos Pokémon, desarrollada como prueba técnica para la pasantía de HP, demostrando competencias en desarrollo completo, arquitectura de software y tecnologías modernas.


![Pokédx HP](https://img.shields.io/badge/HP-Pasant%C3%ADa-0096D6?style=for-the-badge&logo=hp&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📋 **Descripción del Proyecto**

Sistema de análisis de Pokédex que permite realizar consultas específicas sobre datos Pokémon obtenidos de la PokéAPI. La aplicación incluye funcionalidades de filtrado avanzado, sistema de favoritos persistente y una interfaz moderna con efectos 3D.

### 🎯 **Requisitos Técnicos Implementados**

✅ **Tabla con Pokémon que pesen más de 30 y menos de 80**  
✅ **Tabla con todos los Pokémon tipo 'grass'**  
✅ **Tabla con Pokémon tipo 'flying' que midan más de 10**  
✅ **Nueva columna con nombres de Pokémon invertidos**  
✅ **Sistema de favoritos con persistencia en base de datos**  
✅ **Interfaz profesional con efectos 3D**

---

## 🛠️ **Stack Tecnológico**

### **Backend**
- **Django 5.1.1** - Framework web principal
- **Django REST Framework 3.15.2** - API REST
- **SQLite** - Base de datos (desarrollo)
- **Django CORS Headers** - Gestión de CORS
- **Requests** - Integración con PokéAPI

### **Frontend**
- **React 19.1.1** - Biblioteca de interfaz
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **CSS3** - Estilos personalizados con efectos 3D
- **Axios** - Cliente HTTP

### **APIs Externas**
- **PokéAPI** - Fuente de datos Pokémon

---

## 🏗️ **Arquitectura del Sistema**

```
├── backend/                 # Servidor Django
│   └── pokemon_backend/
│       ├── pokemon_backend/ # Configuración principal
│       └── pokedex/        # App principal
│           ├── models.py   # Modelos (Pokemon, PokemonFavorite)
│           ├── views.py    # ViewSets y endpoints
│           ├── serializers.py # Serialización de datos
│           └── urls.py     # Configuración de rutas
│
├── frontend/               # Cliente React
│   └── src/
│       ├── components/     # Componentes reutilizables
│       ├── hooks/         # Custom hooks
│       ├── services/      # API services
│       └── types/         # Definiciones TypeScript
│
└── README.md              # Documentación
```

---

## 🚀 **Instalación y Configuración**

### **Prerrequisitos**
- Python 3.8+
- Node.js 18+
- Git

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/lauvale029/PruebaTecnica_PasantiaHP.git
cd PruebaTecnica_PasantiaHP
```

### **2. Configuración del Backend**

```bash
# Navegar al directorio del backend
cd backend/pokemon_backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones
python manage.py makemigrations
python manage.py migrate

# Ejecutar servidor
python manage.py runserver
```

El backend estará disponible en: `http://localhost:8000`

### **3. Configuración del Frontend**

```bash
# Nueva terminal - navegar al frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 📡 **Endpoints de la API**

### **Pokémon**
- `GET /api/pokemon/` - Lista de los primeros 50 Pokémon
- `POST /api/pokemon/load-pokemon-data/` - Cargar datos desde PokéAPI
- `GET /api/pokemon/weight-filter/` - Pokémon entre 30-80 de peso
- `GET /api/pokemon/grass-type/` - Pokémon tipo grass
- `GET /api/pokemon/flying-tall/` - Pokémon flying y altos

### **Favoritos**
- `GET /api/favorites/` - Lista de favoritos
- `POST /api/favorites/` - Agregar a favoritos
- `DELETE /api/favorites/{id}/` - Remover favorito
- `POST /api/favorites/toggle/` - **Toggle favorito** (agregar si no existe, quitar si existe)
- `GET /api/favorites/check/{pokemon_id}/` - Verificar si es favorito

---

## 🎮 **Cómo Usar la Aplicación**

### **1. Inicialización**
1. Accede a `http://localhost:5173`
2. Haz clic en **"Cargar Datos Pokémon"**
3. Espera a que se carguen los primeros 50 Pokémon desde PokéAPI

### **2. Consultas Disponibles**
- **"Peso entre 30-80"** - Filtra por criterios de peso
- **"Tipo Grass"** - Muestra solo Pokémon tipo planta
- **"Flying Altos"** - Pokémon voladores de gran altura
- **"Ver Favoritos"** - Lista tus Pokémon favoritos

### **3. Sistema de Favoritos**
- Haz clic en el ⭐ de cualquier Pokémon para agregarlo/quitarlo de favoritos
- Los favoritos se guardan automáticamente en la base de datos
- Accede a tu lista completa desde el botón **"Ver Favoritos"**

---

## 🎨 **Características Destacadas**

### **🌟 Efectos Visuales 3D**
- Tarjetas Pokémon con transformaciones 3D al hacer hover
- Pokéball girando en 3D como loading spinner
- Animaciones suaves y profesionales

### **💾 Persistencia de Datos**
- Sistema de favoritos guardado en base de datos SQLite
- Datos Pokémon almacenados localmente para mejor rendimiento
- API RESTful completa para todas las operaciones

### **🎯 Filtros Inteligentes**
- Filtrado por peso con rangos específicos
- Búsqueda por tipos usando datos JSON
- Combinación de múltiples criterios (tipo + altura)

### **📱 Diseño Responsivo**
- Interfaz adaptable a dispositivos móviles
- Grid responsivo para tarjetas Pokémon
- Tipografía y espaciado optimizados

---

## 🧪 **Testing**

### **Probar Endpoints Manualmente**
```bash
# Listar Pokémon
curl http://localhost:8000/api/pokemon/

# Cargar datos desde PokéAPI
curl -X POST http://localhost:8000/api/pokemon/load-pokemon-data/

# Verificar favoritos
curl http://localhost:8000/api/favorites/

# Toggle favorito (Pikachu - ID 25)
curl -X POST http://localhost:8000/api/favorites/toggle/ \
  -H "Content-Type: application/json" \
  -d '{"pokemon_id": 25}'
```

### **Verificar Base de Datos**
```bash
# Acceder a la shell de Django
python manage.py shell

# Consultas de ejemplo
>>> from pokedex.models import Pokemon, PokemonFavorite
>>> Pokemon.objects.count()  # Total de Pokémon
>>> PokemonFavorite.objects.all()  # Lista de favoritos
```

---

## 📁 **Estructura de Archivos Clave**

```
PruebaTecnica_PasantiaHP/
│
├── backend/pokemon_backend/
│   ├── pokedex/
│   │   ├── models.py           # Pokemon, PokemonFavorite
│   │   ├── views.py            # PokemonViewSet, PokemonFavoriteViewSet
│   │   ├── serializers.py      # Serialización de datos
│   │   └── urls.py             # Configuración de rutas
│   ├── requirements.txt        # Dependencias Python
│   └── manage.py              # Comando principal Django
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PokemonCard.tsx      # Tarjeta individual
│   │   │   ├── PokemonGrid.tsx      # Grid de tarjetas
│   │   │   ├── FavoriteButton.tsx   # Botón de favoritos
│   │   │   └── LoadingSpinner.tsx   # Pokéball 3D
│   │   ├── hooks/
│   │   │   ├── usePokemon.ts        # Lógica de Pokémon
│   │   │   └── useFavorites.ts      # Lógica de favoritos
│   │   ├── services/
│   │   │   └── favoritesApi.ts      # Cliente API favoritos
│   │   └── App.tsx                  # Componente principal
│   ├── package.json            # Dependencias Node.js
│   └── vite.config.ts         # Configuración Vite
│
├── .gitignore                 # Archivos ignorados
└── README.md                  # Esta documentación
```

---

## 🐛 **Solución de Problemas**

### **Backend no inicia**
```bash
# Verificar que el entorno virtual esté activo
which python  # debe mostrar la ruta del venv

# Reinstalar dependencias
pip install -r requirements.txt

# Verificar migraciones
python manage.py showmigrations
```

### **Frontend no carga**
```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar puerto
lsof -i :5173  # en macOS/Linux
netstat -ano | findstr :5173  # en Windows
```

### **CORS Issues**
Si ves errores de CORS, verifica que `django-cors-headers` esté instalado y configurado correctamente en `settings.py`.

### **API no responde**
Verifica que ambos servidores estén ejecutándose:
- Backend: `http://localhost:8000/api/`
- Frontend: `http://localhost:5173`

---

## 🔮 **Futuras Mejoras**

- [ ] Autenticación de usuarios
- [ ] Búsqueda avanzada con múltiples filtros
- [ ] Gráficos estadísticos con Chart.js
- [ ] Cache Redis para mejor rendimiento
- [ ] Tests automatizados (Jest + pytest)
- [ ] Deploy en AWS/Azure
- [ ] PWA (Progressive Web App)
- [ ] Dark mode

---

## 🙏 **Agradecimientos**

- **HP** - Por la oportunidad de demostrar habilidades técnicas
- **PokéAPI** - Por proporcionar datos Pokémon gratuitos
- **Django & React Communities** - Por la documentación y recursos

---

<div align="center">

**⭐ Si este proyecto te parece interesante, ¡dale una estrella! ⭐**

</div>