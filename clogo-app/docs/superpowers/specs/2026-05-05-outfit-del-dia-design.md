# Outfit del día — Diseño

**Fecha:** 2026-05-05
**Alcance:** MVP "A" — flujo cámara → ML → algoritmo de armonía → pantalla "Hoy".

## Objetivo

El usuario sube ≥5 prendas con su cámara desde el onboarding. La app las clasifica
(categoría + colores) usando el servicio ML existente. La pantalla "Hoy" muestra un
outfit de 5 prendas seleccionadas por armonía de color, persistido por día.

## Decisiones de alcance

| Pieza | Decisión |
|---|---|
| Captura de foto | `<input type="file" capture="environment">` |
| Composición | 1 top + 1 bottom + 1 calzado + 2 accesorios; flexible si falta categoría |
| Ruta de "Hoy" | `app/(app)/hoy/page.tsx` (route group autenticado) |
| Algoritmo | Híbrido: ancla por chroma + ΔE Lab por slot + premio luminosidad |
| Estabilidad | Outfit estable por día, persistido en `Calendario` |
| Auth | Cliente lee `localStorage.usuario.id` (consistente con login/register actuales) |
| Clima, like/dislike, input ocasión, swipe regenerar | **Fuera de alcance** |

## Arquitectura

```
clogo-app/
├── app/
│   ├── (app)/                             [NUEVO]
│   │   ├── layout.tsx                     [NUEVO] verifica token + bottom nav
│   │   └── hoy/page.tsx                   [NUEVO] pantalla Hoy
│   ├── onboarding/camera/page.tsx         [MODIFICAR] conectar cámara real
│   └── api/outfits/sugerido/route.ts      [NUEVO] GET outfit del día
└── lib/armonia.ts                          [NUEVO] algoritmo
```

El servicio ML (`clogo-ml`) y `POST /api/prendas` se mantienen igual.

## Endpoint `GET /api/outfits/sugerido?usuarioId=X`

**Lógica:**

1. Validar `usuarioId`.
2. `fechaHoy` = inicio del día actual (00:00 hora local).
3. Buscar `Calendario` con `(usuarioId, fecha = fechaHoy)`:
   - Existe: cargar `Outfit + OutfitPrenda + Prenda` y devolver.
   - No existe: cargar prendas del usuario; si <5 → `422 { prendasFaltantes }`;
     si ≥5 → ejecutar `seleccionarOutfit(prendas)`, crear `Outfit + OutfitPrenda(×5) + Calendario`, devolver.

**Respuesta `200`:**

```json
{
  "outfit": {
    "id": 12,
    "nombre": "Outfit del 05/05",
    "fecha_creacion": "...",
    "prendas": [
      { "id": 1, "imagen_url": "...", "categoria": "jacket", "color_principal": "#362d2e", "slot": "top" },
      { "id": 2, "imagen_url": "...", "categoria": "...",     "color_principal": "#935544", "slot": "acc1" },
      { "id": 3, "imagen_url": "...", "categoria": "...",     "color_principal": "#e8dacf", "slot": "acc2" },
      { "id": 4, "imagen_url": "...", "categoria": "pants",   "color_principal": "#80573e", "slot": "bottom" },
      { "id": 5, "imagen_url": "...", "categoria": "boots",   "color_principal": "#754035", "slot": "shoes" }
    ]
  },
  "paleta": ["#362d2e","#935544","#e8dacf","#80573e","#754035"]
}
```

El `slot` se calcula al vuelo (no se persiste; tabla `OutfitPrenda` no se modifica).

**Códigos:** `400` falta `usuarioId`; `422` <5 prendas; `500` error interno.

## Algoritmo `seleccionarOutfit(prendas) → PrendaConSlot[]`

1. Convertir cada `color_principal` (hex) a Lab vía sRGB→XYZ→Lab D65.
2. Clasificar slot por categoría:
   - `top`: t-shirt, shirt, sweater, jacket, coat, dress
   - `bottom`: pants, jeans, skirt
   - `shoes`: shoes, sneakers, boots
   - `acc`: cualquier otra
3. **Ancla** = prenda con mayor `chroma = √(a²+b²)`.
4. Para cada slot primario (`top`, `bottom`, `shoes`) no cubierto por el ancla:
   - Filtrar candidatos del slot.
   - Elegir el de menor `score = ΔE(c, ancla) + 0.3·|L_objetivo − L(c)|`.
   - `L_objetivo`: para `top`/`shoes` = L del ancla; para `bottom` = invertido (`L_ancla<50 ? 80 : 30`).
5. Llenar accesorios: ordenar restantes por ΔE al promedio Lab actual del outfit, tomar 2.
6. Si tras el paso 4 algún slot primario no tiene candidato, queda sin llenar y los
   accesorios se completan con cualquier sobrante.
7. Devolver 5 prendas con su `slot`. Si después del paso 4 hay slots primarios vacíos,
   el orden de devolución sigue siendo `[top, acc1, acc2, bottom, shoes]` con `null` o
   placeholder en vacíos — el frontend renderiza placeholder gris.

## UI

### `/onboarding/camera` (modificada)

- Mantener visual existente.
- Botón obturador envuelve `<input type="file" accept="image/*" capture="environment" hidden>`.
- Al seleccionar archivo → `POST /api/prendas` con `FormData(file, usuarioId)`.
- Mientras sube: spinner sobre el botón.
- Texto dinámico bajo botón: `"N / 5 prendas listas"`.
- Cuando `N >= 5`: aparece botón "Continuar" (mismo estilo gradient) → `/(app)/hoy`.
- Errores: `alert("No se pudo subir la prenda")`, contador no avanza.

### `/(app)/layout.tsx`

- Verifica `localStorage.token` en cliente; sin token → `router.replace("/login")`.
- Bottom nav fijo (5 tabs: Hoy, closet, Inicio, Calendario, Outfits) basado en Figma.
- Solo "Hoy" tiene estado activo (círculo blanco con sombra). Otros `<Link>` apuntan a
  rutas pendientes (404 está OK por ahora).

### `/(app)/hoy/page.tsx`

Replicación del Figma `86:75`:

1. **Status bar superior** con hora/wifi/signal/batería: omitida (es chrome del SO en Figma).
2. **Header**: menú hamburguesa (izq), sun icon + "16°, Uruapan Mich." (centro hardcoded), "CloGo" (der).
3. **Título**: "Tu outfit para hoy".
4. **Subtítulo**: "¿Vas a un lugar especial? Describelo".
5. **Input pill** placeholder "Voy a una cita romantica lujosa", **`disabled`**.
6. **Like (corazón) y dislike** decorativos a izq/der del collage.
7. **Collage** de 5 imágenes posicionadas absolutamente como en el Figma:
   - top-izq (142×212): slot `top`
   - top-centro (142×212): slot `acc1`
   - top-der (105×157): slot `acc2`
   - bottom-izq (120×180): slot `bottom`
   - bottom-centro (116×174): slot `shoes`
   - Slot vacío → placeholder `bg-[#f0f0f0]` del mismo tamaño.
8. **Paleta**: 5 swatches 23×22 con `color_principal` en orden del array `paleta`.
9. **Texto** "Desliza para generar otro outfit →" decorativo.
10. **Estados**:
    - Cargando: skeleton de los 5 rectángulos con `animate-pulse`.
    - 422 `prendasFaltantes`: mensaje "Te faltan N prendas" + botón → `/onboarding/camera`.
    - error genérico: mensaje + botón "Reintentar".

## Casos límite

- Sin token al entrar a `(app)`: redirección cliente a `/login`.
- <5 prendas: `422` + UI de "faltan N prendas".
- Subida fallida: `alert`, sin avance del contador.
- Color inválido/null en BD: tratado como `#888888`.
- Outfit del día ya creado: una sola query con `include`, sin recalcular.

## Out of scope (explícito)

- Like/dislike con efecto.
- Swipe para regenerar outfit.
- Input "ocasión" funcional.
- API de clima.
- Tabs closet/inicio/calendario/outfits funcionales (renderizadas pero sin destino).
- Subida en paralelo / retry automático.
- Tests automatizados (verificación manual end-to-end).