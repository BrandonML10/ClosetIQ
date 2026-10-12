

# 🎨 ClosetIQ - Tu Armario Digital Inteligente

ClosetIQ es una plataforma *Full-Stack* impulsada por Machine Learning que te ayuda a digitalizar tu ropa, planificar tus outfits semanales y recibir recomendaciones inteligentes basadas en el clima y tus hábitos de uso. 

Despídete del clásico *"no tengo qué ponerme"* y optimiza tu estilo de vida.

---

## ✨ Características Principales

### 🆓 Plan Básico (Free)
* **Closet Digital:** Sube hasta 50 prendas.
* **Clasificación por IA:** Detección automática de la paleta de colores y categoría de la prenda al subir la foto.
* **Outfit Builder:** Combina prendas en un lienzo interactivo para guardar tus looks favoritos (hasta 10).
* **Calendario:** Planifica qué te pondrás en las próximas 2 semanas.
* **Clima en Tiempo Real:** Recomendaciones básicas de outfits según la temperatura de tu ciudad.

### ⭐ Plan Premium (Pro)
* **Todo Ilimitado:** Prendas, outfits y planificación sin restricciones.
* **Planificador Automático Semanal:** La IA te sugiere 7 outfits diferentes para la semana sin repetir prendas.
* **Analítica Avanzada:** Descubre tu "coste por uso", prendas más/menos usadas y combinaciones favoritas.
* **Planificador de Viajes:** "Arma mi maleta" con checklists y outfits según el clima de tu destino.

---

## 🏗️ Arquitectura y Tecnologías (Tech Stack)

El proyecto está dividido en una arquitectura de microservicios / frontend-backend separado:

| Capa | Tecnologías | Descripción |
|------|-------------|-------------|
| **Frontend** | React / Next.js, Tailwind CSS | Interfaz de usuario responsiva y "mobile-first". |
| **Backend API** | Node.js, Express (o NestJS) | API RESTful principal, lógica de negocio y autenticación (JWT). |
| **Machine Learning** | Python, FastAPI, Scikit-learn | Microservicio que procesa imágenes para extraer colores y predecir categorías. |
| **Base de Datos** | PostgreSQL + Prisma / TypeORM | Almacenamiento relacional de usuarios, prendas, outfits y calendario. |
| **Almacenamiento** | Cloudinary / AWS S3 | Alojamiento en la nube para las imágenes de las prendas. |

---

## 📁 Estructura del Repositorio (Monorepo)

```text
closetiq/
├── frontend/           # Aplicación web (React/Next.js)
│   ├── src/components/ # Componentes UI (Tailwind)
│   ├── src/pages/      # Vistas (Closet, Outfits, Calendario)
│   └── ...
├── backend/            # API REST principal (Node.js)
│   ├── src/controllers/# Lógica de endpoints
│   ├── src/models/     # Esquemas de Base de Datos
│   └── src/routes/     # Rutas (/api/v1/...)
├── ml-service/         # Microservicio de IA (Python)
│   ├── models/         # Modelos pre-entrenados
│   └── main.py         # Endpoints de predicción
└── docs/               # Documentación (Historias de Usuario, UI/UX, Diagramas)
```

---

## 🚀 Instalación y Despliegue Local

### Requisitos Previos
* [Node.js](https://nodejs.org/) (v16+)
* [Python](https://www.python.org/) (3.9+)
* [PostgreSQL](https://www.postgresql.org/) (Corriendo localmente o en contenedor)
* *(Opcional)* [Docker](https://www.docker.com/) y Docker Compose

### Opción 1: Usando Docker (Recomendado)

Si hemos configurado `docker-compose`, levantar el proyecto completo es muy sencillo:

```bash
git clone https://github.com/tu-usuario/closetiq.git
cd closetiq
docker-compose up --build
```
* Frontend: `http://localhost:3000`
* Backend API: `http://localhost:8000`
* ML Service: `http://localhost:5000`

### Opción 2: Configuración Manual por Servicios

**1. Configurar la Base de Datos y Backend:**
```bash
cd backend
npm install
cp .env.example .env # Configura tu cadena de conexión a PostgreSQL
npm run db:migrate   # Ejecuta las migraciones
npm run dev
```

**2. Configurar el Servicio de Machine Learning:**
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**3. Configurar el Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

---

## ⚙️ Variables de Entorno

Cada subproyecto tiene su propio archivo `.env`. Aquí están las variables clave necesarias:

**`backend/.env`**
```env
PORT=8000
DATABASE_URL=postgresql://user:password@localhost:5432/closetiq
JWT_SECRET=tu_secreto_super_seguro
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
ML_SERVICE_URL=http://localhost:5000
```

**`frontend/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WEATHER_API_KEY=tu_api_key_openweathermap
```

---

## 📖 Documentación de la API

La documentación interactiva de la API (Swagger/OpenAPI) está disponible una vez que el backend está corriendo en:
* **Backend Core:** `http://localhost:8000/api-docs`
* **ML Service:** `http://localhost:5000/docs`

---

## 🛠️ Roadmap y Próximos Pasos

- [x] Autenticación de usuarios y JWT.
- [x] CRUD de prendas y subida de imágenes a Cloudinary.
- [x] Integración de IA para extracción de colores dominantes.
- [ ] Construcción del Outfit Builder (Drag & Drop).
- [ ] Implementación del calendario y reglas anti-repetición.
- [ ] Pasarela de pago (Stripe) para el plan Premium.
- [ ] Modo offline para la app móvil/PWA.

---

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---
*Diseñado y desarrollado por Zabdiel Cervantes / Brandon Lucatero* 🚀
