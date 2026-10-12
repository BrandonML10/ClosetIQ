# CloGo — Plan de Implementación Completa (100%)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completar las 4 páginas faltantes de la barra de navegación (/closet, /inicio, /calendario, /outfits), corregir el guardado del estilo en el onboarding, arreglar el bug de borrado de prendas, y conectar el like/dislike de la pantalla Hoy.

**Architecture:** Next.js 16 App Router, React 19, Tailwind CSS 4. Auth via JWT en localStorage. Prisma 6 + PostgreSQL (cliente generado en `prisma/generated/client`). API routes en `app/api/`. Páginas autenticadas en `app/(app)/`. El servicio ML corre en `localhost:8000`.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Prisma 6, bcryptjs, jsonwebtoken, Cloudinary, Python FastAPI (servicio ML separado).

---

## Estado actual vs. lo que falta

### YA IMPLEMENTADO ✅
- Landing (`/`), Login (`/login`), Register (`/register`)
- Onboarding estilo (`/onboarding/style`) y cámara (`/onboarding/camera`)
- Pantalla Hoy (`/hoy`) con algoritmo de armonía Lab
- App layout con nav inferior (5 tabs, autenticado)
- TODOS los endpoints API: auth, prendas CRUD, outfits CRUD, calendario CRUD, outfits/sugerido
- Servicio ML: FastAPI + CLIP clasificador + extractor de colores + quitado de fondo
- `lib/armonia.ts` — algoritmo de selección de outfit

### FALTA IMPLEMENTAR ❌
1. `app/(app)/closet/page.tsx` — grid de prendas con filtro y borrado
2. `app/(app)/inicio/page.tsx` — dashboard con estadísticas
3. `app/(app)/calendario/page.tsx` — planificador de 14 días
4. `app/(app)/outfits/page.tsx` — listado de outfits guardados
5. `app/(app)/outfits/nuevo/page.tsx` — outfit builder (selección de prendas)
6. `app/api/usuarios/[id]/route.ts` — PATCH para actualizar `estilo_preferido`
7. Fix: `DELETE /api/prendas/[id]` no borra `OutfitPrenda` antes, causa FK violation
8. Fix: `onboarding/style` no guarda estilos en la BD
9. Fix: Like/dislike en `/hoy` son decorativos — deben regenerar el outfit

---

## Mapa de archivos

```
Crear:
  app/(app)/closet/page.tsx
  app/(app)/inicio/page.tsx
  app/(app)/calendario/page.tsx
  app/(app)/outfits/page.tsx
  app/(app)/outfits/nuevo/page.tsx
  app/api/usuarios/[id]/route.ts

Modificar:
  app/api/prendas/[id]/route.ts          (cascada OutfitPrenda antes de borrar)
  app/onboarding/style/page.tsx          (llamar PATCH antes de navegar)
  lib/armonia.ts                          (aceptar opciones.excluirIds)
  app/api/outfits/sugerido/route.ts      (soportar ?regenerar=true)
  app/(app)/hoy/page.tsx                 (conectar like/dislike)
  app/(app)/layout.tsx                   (activo con startsWith para subrutas)
```

---

## Task 1: Fix DELETE /api/prendas/[id] — borrar OutfitPrenda en cascada

**Files:**
- Modify: `clogo-app/app/api/prendas/[id]/route.ts`

El DELETE actual hace `prisma.prenda.delete` directamente. Si la prenda está en algún `OutfitPrenda`, PostgreSQL lanza FK violation. Hay que borrar las relaciones primero.

- [ ] **Step 1: Editar el DELETE para borrar OutfitPrenda antes**

Reemplazar en `app/api/prendas/[id]/route.ts` el bloque DELETE:

```typescript
// ANTES (líneas 31-44):
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.prenda.delete({
      where: { id: id },
    });

    return NextResponse.json({ mensaje: "Prenda eliminada exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error eliminando prenda:", error);
    return NextResponse.json({ error: "No se pudo eliminar la prenda" }, { status: 500 });
  }
}
```

```typescript
// DESPUÉS:
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.outfitPrenda.deleteMany({ where: { prendaId: id } });
    await prisma.prenda.delete({ where: { id } });

    return NextResponse.json({ mensaje: "Prenda eliminada exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error eliminando prenda:", error);
    return NextResponse.json({ error: "No se pudo eliminar la prenda" }, { status: 500 });
  }
}
```

Para aplicar, editar `app/api/prendas/[id]/route.ts` — reemplazar las líneas 31–44.

- [ ] **Step 2: Verificar manualmente**

Con la app corriendo (`npm run dev` en `clogo-app/`):
1. Sube una prenda y añádela a un outfit manualmente via Prisma Studio (`npx prisma studio`)
2. Borra la prenda desde `/closet` (o via `curl -X DELETE http://localhost:3000/api/prendas/ID`)
3. Esperado: `{ "mensaje": "Prenda eliminada exitosamente" }` con status 200
4. Verificar en Prisma Studio que la prenda y sus `OutfitPrenda` desaparecieron

- [ ] **Step 3: Commit**

```bash
cd clogo-app
git add app/api/prendas/[id]/route.ts
git commit -m "fix: cascade delete OutfitPrenda before deleting Prenda"
```

---

## Task 2: PATCH /api/usuarios/[id] — endpoint para actualizar estilo preferido

**Files:**
- Create: `clogo-app/app/api/usuarios/[id]/route.ts`

- [ ] **Step 1: Crear el archivo**

```typescript
// app/api/usuarios/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idRaw } = await params;
    const id = parseInt(idRaw, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();
    const { estilo_preferido } = body;

    if (estilo_preferido === undefined) {
      return NextResponse.json({ error: "Falta estilo_preferido" }, { status: 400 });
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: { estilo_preferido: String(estilo_preferido) },
      select: { id: true, username: true, email: true, estilo_preferido: true },
    });

    return NextResponse.json(usuarioActualizado, { status: 200 });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Probar el endpoint**

```bash
# Con la app corriendo en localhost:3000 y un usuario con ID=1:
curl -X PATCH http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"estilo_preferido": "[\"casual\",\"elegante\"]"}'
```

Esperado: `{ "id": 1, "username": "...", "email": "...", "estilo_preferido": "[\"casual\",\"elegante\"]" }`

- [ ] **Step 3: Commit**

```bash
git add app/api/usuarios
git commit -m "feat: PATCH /api/usuarios/[id] to update estilo_preferido"
```

---

## Task 3: Guardar estilos en onboarding/style antes de navegar

**Files:**
- Modify: `clogo-app/app/onboarding/style/page.tsx`

Actualmente el botón "Continuar" hace `router.push("/onboarding/camera")` sin guardar los estilos. Necesitamos leer `usuarioId` de localStorage, llamar al PATCH y luego navegar.

- [ ] **Step 1: Editar `onboarding/style/page.tsx`**

Reemplazar la función del componente. El archivo completo queda así:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const STYLES = [
  {
    id: "elegante",
    label: "Elegante",
    img: "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "casual",
    label: "Casual",
    img: "https://images.unsplash.com/photo-1588117260148-b47818741c74?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "deportivo",
    label: "Deportivo",
    img: "https://images.unsplash.com/photo-1593431763017-c689a61b729a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "bohemio",
    label: "Bohemio",
    img: "https://images.unsplash.com/photo-1599746146388-a7ec2004b67a?q=80&w=696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "minimalista",
    label: "Minimalista",
    img: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "streetwear",
    label: "Streetwear",
    img: "https://images.unsplash.com/photo-1572251337078-1063752b2a35?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "vintage",
    label: "Vintage",
    img: "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "formal",
    label: "Formal",
    img: "https://images.unsplash.com/photo-1612215327100-60fc5c4d7938?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "romantico",
    label: "Romántico",
    img: "https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function StyleSelectionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [guardando, setGuardando] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  async function handleContinuar() {
    setGuardando(true);
    try {
      const raw = localStorage.getItem("usuario");
      if (raw && selected.length > 0) {
        const u = JSON.parse(raw);
        if (typeof u?.id === "number") {
          await fetch(`/api/usuarios/${u.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estilo_preferido: JSON.stringify(selected) }),
          });
        }
      }
    } catch {
      // guardar estilos es opcional — si falla, continuamos igual
    } finally {
      setGuardando(false);
      router.push("/onboarding/camera");
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-start justify-between px-4 py-6 sm:px-8 sm:py-8">
        <button
          className="flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity mt-1"
          aria-label="Menu"
        >
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
        </button>
        <span className="text-black text-2xl font-family-lostar">CloGo</span>
      </nav>

      {/* Title */}
      <h1 className="font-family-coolvetica text-black text-2xl sm:text-3xl text-center tracking-[0.1em] leading-tight px-6 mt-2">
        ¿Como describirias
        <br />
        tu estilo?
      </h1>

      {/* Subtitle row */}
      <div className="px-6 sm:px-8 mt-4 mb-4 relative">
        <p className="font-family-erode-variable text-[#5a4900] text-sm tracking-[0.1em] text-center">
          Puedes elegir mas de uno
        </p>
        <span className="font-family-erode-variable text-[#5a4900] text-[11px] tracking-[0.1em] absolute right-6 sm:right-8 top-5">
          Desliza →
        </span>
      </div>

      {/* Horizontal scroll cards */}
      <div
        className="overflow-x-auto flex gap-1 px-4 sm:px-6 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {STYLES.map((style) => {
          const isSelected = selected.includes(style.id);
          return (
            <button
              key={style.id}
              onClick={() => toggle(style.id)}
              className={`relative flex-shrink-0 w-[170px] h-[376px] overflow-hidden focus:outline-none transition-all ${
                isSelected ? "ring-4 ring-[#FFC17A]" : ""
              }`}
            >
              <Image
                src={style.img}
                alt={style.label}
                fill
                className="object-cover"
              />
              <span
                className="absolute left-0 right-0 text-center font-family-coolvetica text-2xl tracking-[0.1em] leading-none top-[39%]"
                style={{ color: "yellow" }}
              >
                {style.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected pills */}
      <div className="px-6 sm:px-8 mt-4 min-h-11">
        {selected.length > 0 && (
          <>
            <p className="font-family-erode-variable text-[#5a4900] text-sm tracking-[0.1em] mb-2">
              Elegiste:
            </p>
            <div className="flex flex-row flex-wrap gap-2">
              {selected.map((id) => {
                const style = STYLES.find((s) => s.id === id)!;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-2 bg-[#ffc17a] text-black rounded-full h-9 px-4 font-family-erode-variable text-sm tracking-widest whitespace-nowrap"
                  >
                    {style.label}
                    <button
                      onClick={() => toggle(id)}
                      aria-label={`Quitar ${style.label}`}
                      className="hover:opacity-70 transition-opacity shrink-0"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="flex-1" />

      {/* Continuar button */}
      <div className="flex justify-center px-6 pb-10 pt-4">
        <div className="w-[243px] h-[63px] rounded-full bg-gradient-to-r from-[#F9F023] via-[#D6006E] to-[#8C52FF] p-[2px] shadow-[-2px_6px_4px_0px_rgba(0,0,0,0.33)]">
          <button
            onClick={handleContinuar}
            disabled={guardando}
            className="w-full h-full bg-black border-2 border-[#FFD000] text-white rounded-full flex items-center justify-center font-family-reggae-one text-base hover:bg-black/80 transition-all disabled:opacity-60"
          >
            {guardando ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Continuar"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verificar manualmente**

1. Registrar un usuario nuevo
2. Navegar a `/onboarding/style`
3. Seleccionar 2-3 estilos y presionar "Continuar"
4. Verificar en Prisma Studio que `usuario.estilo_preferido` tiene el valor JSON

- [ ] **Step 3: Commit**

```bash
git add app/onboarding/style/page.tsx
git commit -m "feat: save estilo_preferido to DB during onboarding"
```

---

## Task 4: Actualizar lib/armonia.ts con soporte de excluirIds

**Files:**
- Modify: `clogo-app/lib/armonia.ts`

El algoritmo actual siempre devuelve la combinación óptima. Para el botón "dislike", necesitamos excluir las prendas del outfit actual y buscar la siguiente mejor.

- [ ] **Step 1: Actualizar la firma de `seleccionarOutfit`**

Reemplazar el archivo `lib/armonia.ts` completo:

```typescript
import type { Prenda } from "../prisma/generated/client";

export type Slot = "top" | "bottom" | "shoes";

export type PrendaConSlot = Prenda & { slot: Slot };

const TOP_CATS = ["t-shirt", "shirt", "sweater", "jacket", "coat", "dress"];
const BOTTOM_CATS = ["pants", "jeans", "skirt"];
const SHOES_CATS = ["shoes", "sneakers", "boots"];

function clasificarSlot(cat: string | null): Slot | null {
  if (!cat) return null;
  if (TOP_CATS.includes(cat)) return "top";
  if (BOTTOM_CATS.includes(cat)) return "bottom";
  if (SHOES_CATS.includes(cat)) return "shoes";
  return null;
}

function hexToLab(hex: string): [number, number, number] {
  const h = (hex || "#888888").replace("#", "");
  const safe = /^[0-9a-fA-F]{6}$/.test(h) ? h : "888888";
  let r = parseInt(safe.slice(0, 2), 16) / 255;
  let g = parseInt(safe.slice(2, 4), 16) / 255;
  let b = parseInt(safe.slice(4, 6), 16) / 255;

  const lin = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  r = lin(r);
  g = lin(g);
  b = lin(b);

  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  const Xn = 0.95047;
  const Yn = 1.0;
  const Zn = 1.08883;
  const f = (t: number) =>
    t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116;
  const L = 116 * f(y / Yn) - 16;
  const a = 500 * (f(x / Xn) - f(y / Yn));
  const bb = 200 * (f(y / Yn) - f(z / Zn));
  return [L, a, bb];
}

function deltaE(a: [number, number, number], b: [number, number, number]) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
  );
}

type Enriquecida = Prenda & {
  slot: Slot;
  lab: [number, number, number];
};

export class FaltanCategoriasError extends Error {
  constructor(public falta: { tops: number; bottoms: number }) {
    super("Faltan categorías para armar el outfit");
    this.name = "FaltanCategoriasError";
  }
}

export interface OpcionesOutfit {
  excluirIds?: number[];
}

/**
 * Selecciona un outfit pequeño y armónico:
 *   - 1 top
 *   - 1 bottom
 *   - 1 calzado (si existe en el clóset; opcional)
 *
 * Pasar `opciones.excluirIds` para evitar repetir prendas de un outfit previo.
 */
export function seleccionarOutfit(
  prendas: Prenda[],
  opciones: OpcionesOutfit = {},
): PrendaConSlot[] {
  const excluidos = new Set(opciones.excluirIds ?? []);
  const prendasDisponibles = excluidos.size > 0
    ? prendas.filter((p) => !excluidos.has(p.id))
    : prendas;

  const enriquecidas: Enriquecida[] = prendasDisponibles
    .map((p) => {
      const slot = clasificarSlot(p.categoria);
      if (!slot) return null;
      return {
        ...p,
        slot,
        lab: hexToLab(p.color_principal ?? "#888888"),
      } satisfies Enriquecida;
    })
    .filter((x): x is Enriquecida => x !== null);

  const tops = enriquecidas.filter((p) => p.slot === "top");
  const bottoms = enriquecidas.filter((p) => p.slot === "bottom");
  const shoes = enriquecidas.filter((p) => p.slot === "shoes");

  if (tops.length === 0 || bottoms.length === 0) {
    // Si fallamos con exclusión, intentar sin exclusión para dar mejor mensaje
    if (excluidos.size > 0) {
      const sinExcluir = prendas
        .map((p) => {
          const slot = clasificarSlot(p.categoria);
          if (!slot) return null;
          return { ...p, slot } as Enriquecida & { lab: [number, number, number] };
        })
        .filter(Boolean);
      const tSinExcluir = sinExcluir.filter((p) => p?.slot === "top");
      const bSinExcluir = sinExcluir.filter((p) => p?.slot === "bottom");
      throw new FaltanCategoriasError({
        tops: tSinExcluir.length === 0 ? 1 : 0,
        bottoms: bSinExcluir.length === 0 ? 1 : 0,
      });
    }
    throw new FaltanCategoriasError({
      tops: tops.length === 0 ? 1 : 0,
      bottoms: bottoms.length === 0 ? 1 : 0,
    });
  }

  let mejorTop = tops[0];
  let mejorBottom = bottoms[0];
  let mejorScore = Infinity;

  for (const t of tops) {
    for (const b of bottoms) {
      const dE = deltaE(t.lab, b.lab);
      const Lt = t.lab[0];
      const Lobjetivo = Lt < 50 ? 75 : 30;
      const penalizacionLum = 0.25 * Math.abs(Lobjetivo - b.lab[0]);
      const score = dE + penalizacionLum;
      if (score < mejorScore) {
        mejorScore = score;
        mejorTop = t;
        mejorBottom = b;
      }
    }
  }

  const resultado: PrendaConSlot[] = [
    { ...stripExtras(mejorTop), slot: "top" },
    { ...stripExtras(mejorBottom), slot: "bottom" },
  ];

  if (shoes.length > 0) {
    const avg: [number, number, number] = [
      (mejorTop.lab[0] + mejorBottom.lab[0]) / 2,
      (mejorTop.lab[1] + mejorBottom.lab[1]) / 2,
      (mejorTop.lab[2] + mejorBottom.lab[2]) / 2,
    ];
    const mejorShoe = shoes.reduce((min, s) =>
      deltaE(s.lab, avg) < deltaE(min.lab, avg) ? s : min,
    );
    resultado.push({ ...stripExtras(mejorShoe), slot: "shoes" });
  }

  return resultado;
}

function stripExtras(e: Enriquecida): Prenda {
  const { lab: _lab, slot: _slot, ...rest } = e;
  return rest as Prenda;
}
```

- [ ] **Step 2: Verificar que el código TypeScript compila**

```bash
cd clogo-app
npx tsc --noEmit
```

Esperado: sin errores

- [ ] **Step 3: Commit**

```bash
git add lib/armonia.ts
git commit -m "feat: add excluirIds option to seleccionarOutfit for regeneration"
```

---

## Task 5: Soporte ?regenerar=true en GET /api/outfits/sugerido

**Files:**
- Modify: `clogo-app/app/api/outfits/sugerido/route.ts`

- [ ] **Step 1: Actualizar el endpoint para aceptar `regenerar` y `excluirIds`**

Reemplazar el archivo completo `app/api/outfits/sugerido/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import {
  FaltanCategoriasError,
  seleccionarOutfit,
} from "../../../../lib/armonia";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioIdRaw = searchParams.get("usuarioId");
    const regenerar = searchParams.get("regenerar") === "true";
    const excluirIdsRaw = searchParams.get("excluirIds");

    if (!usuarioIdRaw) {
      return NextResponse.json(
        { error: "Se requiere el ID del usuario" },
        { status: 400 },
      );
    }

    const usuarioId = parseInt(usuarioIdRaw, 10);
    if (Number.isNaN(usuarioId)) {
      return NextResponse.json({ error: "usuarioId inválido" }, { status: 400 });
    }

    const excluirIds = excluirIdsRaw
      ? excluirIdsRaw.split(",").map(Number).filter((n) => !Number.isNaN(n))
      : [];

    const ahora = new Date();
    const inicioHoy = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      0, 0, 0, 0,
    );
    const inicioMañana = new Date(inicioHoy);
    inicioMañana.setDate(inicioHoy.getDate() + 1);

    // Si piden regenerar, borrar el outfit de hoy del calendario
    if (regenerar) {
      const eventoHoy = await prisma.calendario.findFirst({
        where: { usuarioId, fecha: { gte: inicioHoy, lt: inicioMañana } },
      });
      if (eventoHoy) {
        await prisma.calendario.delete({ where: { id: eventoHoy.id } });
      }
    } else {
      // Sin regenerar: devolver el outfit del día si existe
      const calendarioHoy = await prisma.calendario.findFirst({
        where: { usuarioId, fecha: { gte: inicioHoy, lt: inicioMañana } },
        include: {
          outfit: {
            include: { prendas: { include: { prenda: true } } },
          },
        },
      });

      if (calendarioHoy && calendarioHoy.outfit) {
        const prendasOutfit = calendarioHoy.outfit.prendas.map((op) => op.prenda);
        try {
          const prendasConSlot = seleccionarOutfit(prendasOutfit);
          return NextResponse.json({
            outfit: {
              id: calendarioHoy.outfit.id,
              nombre: calendarioHoy.outfit.nombre,
              fecha_creacion: calendarioHoy.outfit.fecha_creacion,
              prendas: prendasConSlot,
            },
            paleta: prendasConSlot.map((p) => p.color_principal ?? "#888888"),
          });
        } catch (e) {
          if (!(e instanceof FaltanCategoriasError)) throw e;
        }
      }
    }

    // Calcular nuevo outfit (con o sin exclusiones)
    const prendas = await prisma.prenda.findMany({ where: { usuarioId } });

    let seleccionadas;
    try {
      seleccionadas = seleccionarOutfit(prendas, { excluirIds });
    } catch (e) {
      if (e instanceof FaltanCategoriasError) {
        return NextResponse.json(
          { error: "Te faltan prendas para armar un outfit", falta: e.falta },
          { status: 422 },
        );
      }
      throw e;
    }

    const dd = String(inicioHoy.getDate()).padStart(2, "0");
    const mm = String(inicioHoy.getMonth() + 1).padStart(2, "0");
    const nombre = `Outfit del ${dd}/${mm}`;

    const nuevoOutfit = await prisma.outfit.create({
      data: {
        nombre,
        usuarioId,
        prendas: {
          create: seleccionadas.map((p) => ({
            prenda: { connect: { id: p.id } },
          })),
        },
      },
    });

    await prisma.calendario.create({
      data: { fecha: inicioHoy, usuarioId, outfitId: nuevoOutfit.id },
    });

    return NextResponse.json({
      outfit: {
        id: nuevoOutfit.id,
        nombre: nuevoOutfit.nombre,
        fecha_creacion: nuevoOutfit.fecha_creacion,
        prendas: seleccionadas,
      },
      paleta: seleccionadas.map((p) => p.color_principal ?? "#888888"),
    });
  } catch (error) {
    console.error("Error obteniendo outfit sugerido:", error);
    const detalle = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        detalle: process.env.NODE_ENV === "production" ? undefined : detalle,
      },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Probar regeneración**

```bash
# Primero obtener outfit normal:
curl "http://localhost:3000/api/outfits/sugerido?usuarioId=1"
# Notar los IDs de prendas devueltos

# Regenerar excluyendo esas prendas (ej: ids 1,2,3):
curl "http://localhost:3000/api/outfits/sugerido?usuarioId=1&regenerar=true&excluirIds=1,2,3"
# Esperado: outfit diferente (o el mismo si no hay alternativas suficientes)
```

- [ ] **Step 3: Commit**

```bash
git add app/api/outfits/sugerido/route.ts
git commit -m "feat: add ?regenerar=true&excluirIds support to sugerido endpoint"
```

---

## Task 6: Conectar like/dislike en la pantalla /hoy

**Files:**
- Modify: `clogo-app/app/(app)/hoy/page.tsx`

- [ ] **Step 1: Actualizar hoy/page.tsx completo**

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Slot = "top" | "bottom" | "shoes";

type PrendaResp = {
  id: number;
  imagen_url: string | null;
  categoria: string | null;
  color_principal: string | null;
  slot: Slot;
};

type SugeridoResp = {
  outfit: {
    id: number;
    nombre: string;
    fecha_creacion: string;
    prendas: PrendaResp[];
  };
  paleta: string[];
};

type ErrorResp = {
  error: string;
  detalle?: string;
  falta?: { tops: number; bottoms: number };
};

function IconHeart({ activo }: { activo?: boolean }) {
  return (
    <svg width="20" height="18" viewBox="0 0 24 24" fill={activo ? "black" : "none"} stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconDislike() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 14V2" />
      <path d="M9 18.5l1-3.5h6.5a2 2 0 0 0 2-2.3l-1.4-7A2 2 0 0 0 15.1 4H6.5a2 2 0 0 0-2 1.4l-2.3 6.6A2 2 0 0 0 4.1 14.7H8a1 1 0 0 1 1 1.2z" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a4900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PrendaCard({ prenda }: { prenda: PrendaResp | undefined }) {
  if (!prenda?.imagen_url) {
    return <div className="w-full h-full bg-[#f0f0f0]" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={prenda.imagen_url} alt={prenda.categoria ?? "prenda"} className="w-full h-full object-cover" />
  );
}

export default function HoyPage() {
  const [data, setData] = useState<SugeridoResp | null>(null);
  const [err, setErr] = useState<ErrorResp | null>(null);
  const [cargando, setCargando] = useState(true);
  const [likeActivo, setLikeActivo] = useState(false);
  const [regenerando, setRegenerando] = useState(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) return;
    try {
      const u = JSON.parse(raw);
      if (typeof u?.id === "number") setUsuarioId(u.id);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (usuarioId == null) return;
    cargarOutfit(usuarioId);
  }, [usuarioId]);

  function cargarOutfit(uid: number, regenerar = false, excluirIds: number[] = []) {
    setCargando(true);
    setErr(null);

    const params = new URLSearchParams({ usuarioId: String(uid) });
    if (regenerar) params.set("regenerar", "true");
    if (excluirIds.length > 0) params.set("excluirIds", excluirIds.join(","));

    fetch(`/api/outfits/sugerido?${params}`)
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) setErr(json as ErrorResp);
        else setData(json as SugeridoResp);
      })
      .catch(() => setErr({ error: "No se pudo conectar con el servidor" }))
      .finally(() => { setCargando(false); setRegenerando(false); });
  }

  function handleDislike() {
    if (!usuarioId || cargando || regenerando) return;
    const excluirIds = data?.outfit.prendas.map((p) => p.id) ?? [];
    setRegenerando(true);
    setLikeActivo(false);
    cargarOutfit(usuarioId, true, excluirIds);
  }

  function handleLike() {
    setLikeActivo((v) => !v);
  }

  const porSlot: Partial<Record<Slot, PrendaResp>> = {};
  if (data) {
    for (const p of data.outfit.prendas) porSlot[p.slot] = p;
  }
  const tieneShoes = !!porSlot.shoes;

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="grid grid-cols-3 items-center px-4 pt-12 pb-3">
        <button aria-label="Menu" className="flex flex-col gap-[5px] p-1 hover:opacity-70 transition-opacity justify-self-start">
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
        </button>
        <div className="flex items-center justify-center gap-1">
          <IconSun />
          <span className="font-family-erode-variable text-[#5a4900] text-[14px] tracking-[0.06em] whitespace-nowrap">
            16°, Uruapan
          </span>
        </div>
        <span className="font-family-lostar text-[24px] text-black justify-self-end">CloGo</span>
      </header>

      <h1 className="font-family-coolvetica text-black text-[clamp(22px,6vw,28px)] text-center tracking-[0.1em] mt-6 px-6">
        Tu outfit para hoy
      </h1>

      <p className="font-family-erode-variable text-[#5a4900] text-[13px] text-center tracking-[0.08em] mt-5 px-6">
        ¿Vas a un lugar especial? Describelo
      </p>
      <input
        disabled
        placeholder="Voy a una cita romantica lujosa"
        className="mx-auto mt-2 block w-[90%] max-w-[340px] h-[46px] rounded-full bg-[#ededed] text-center font-family-erode-variable text-[15px] text-[#929292] tracking-[0.06em] outline-none placeholder:text-[#929292]"
      />

      {/* Collage with like/dislike */}
      <div className="px-3 mt-6 flex items-center gap-2 max-w-[440px] mx-auto w-full">
        <button
          onClick={handleLike}
          className="w-[44px] h-[44px] rounded-full bg-white shadow-[0_3px_6px_0_rgba(0,0,0,0.18)] flex items-center justify-center shrink-0 hover:scale-110 transition-transform active:scale-95"
          aria-label="Me gusta"
        >
          <IconHeart activo={likeActivo} />
        </button>

        <div className="flex-1 flex flex-col gap-2">
          {cargando || regenerando ? (
            <>
              <div className="aspect-[3/4] bg-[#f0f0f0] animate-pulse" />
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-[3/4] bg-[#f0f0f0] animate-pulse" />
                <div className="aspect-[3/4] bg-[#f0f0f0] animate-pulse" />
              </div>
            </>
          ) : err ? (
            <div className="aspect-[3/4] bg-[#fafafa] rounded-md flex items-center justify-center px-6 text-center">
              {err.falta ? (
                <div>
                  <p className="font-family-erode-variable text-black text-sm mb-3">
                    {err.falta.tops > 0 && err.falta.bottoms > 0
                      ? "Necesitas al menos 1 prenda superior y 1 inferior"
                      : err.falta.tops > 0
                        ? "Necesitas al menos 1 prenda superior (camisa, sudadera, etc.)"
                        : "Necesitas al menos 1 prenda inferior (pantalón, falda, etc.)"}
                  </p>
                  <Link href="/onboarding/camera" className="inline-block px-5 py-2 rounded-full bg-black text-white text-sm font-family-reggae-one">
                    Tomar más fotos
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="font-family-erode-variable text-black text-sm">{err.error}</p>
                  {err.detalle && (
                    <p className="font-family-erode-variable text-[#888] text-[11px] mt-2">{err.detalle}</p>
                  )}
                </div>
              )}
            </div>
          ) : data ? (
            <>
              <div className="aspect-[3/4] overflow-hidden">
                <PrendaCard prenda={porSlot.top} />
              </div>
              <div className={`grid gap-2 ${tieneShoes ? "grid-cols-2" : "grid-cols-1"}`}>
                <div className="aspect-[3/4] overflow-hidden">
                  <PrendaCard prenda={porSlot.bottom} />
                </div>
                {tieneShoes && (
                  <div className="aspect-[3/4] overflow-hidden">
                    <PrendaCard prenda={porSlot.shoes} />
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>

        <button
          onClick={handleDislike}
          disabled={cargando || regenerando}
          className="w-[44px] h-[44px] rounded-full bg-white shadow-[0_3px_6px_0_rgba(0,0,0,0.18)] flex items-center justify-center shrink-0 hover:scale-110 transition-transform active:scale-95 disabled:opacity-40"
          aria-label="No me gusta, generar otro"
        >
          <IconDislike />
        </button>
      </div>

      {/* Paleta */}
      {!cargando && !regenerando && data && (
        <div className="px-4 mt-5 max-w-[440px] mx-auto w-full flex items-center justify-between">
          <div className="flex">
            {data.paleta.slice(0, 5).map((c, i) => (
              <div key={i} className="w-[22px] h-[22px]" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-family-erode-variable text-[#5a4900] text-[11px] tracking-[0.08em] whitespace-nowrap">
              Presiona ↙ para generar otro outfit
            </span>
            <IconArrowRight />
          </div>
        </div>
      )}

      <div className="flex-1" />
    </div>
  );
}
```

- [ ] **Step 2: Verificar manualmente**

1. Ir a `/hoy` con al menos 3 prendas (1 top + 1 bottom + opcional zapatos)
2. El outfit se muestra normalmente
3. Click en el botón dislike (↙): spinner aparece, después se muestra un outfit diferente (si hay suficientes alternativas) o el mismo outfit (si solo hay 1 top y 1 bottom)
4. Click en el corazón: se rellena de negro (like activo)

- [ ] **Step 3: Commit**

```bash
git add app/(app)/hoy/page.tsx
git commit -m "feat: connect like/dislike buttons to regenerate outfit"
```

---

## Task 7: Página /closet — Grid de prendas con filtro y borrado

**Files:**
- Create: `clogo-app/app/(app)/closet/page.tsx`

- [ ] **Step 1: Crear el archivo**

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Prenda = {
  id: number;
  imagen_url: string | null;
  categoria: string | null;
  color_principal: string | null;
  estado: string;
};

type Filtro = "todo" | "top" | "bottom" | "shoes" | "otro";

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "top", label: "Tops" },
  { id: "bottom", label: "Bottoms" },
  { id: "shoes", label: "Zapatos" },
  { id: "otro", label: "Otros" },
];

const TOP_CATS = ["t-shirt", "shirt", "sweater", "jacket", "coat", "dress"];
const BOTTOM_CATS = ["pants", "jeans", "skirt"];
const SHOES_CATS = ["shoes", "sneakers", "boots"];

function filtrarPrendas(prendas: Prenda[], filtro: Filtro): Prenda[] {
  if (filtro === "todo") return prendas;
  if (filtro === "top") return prendas.filter((p) => p.categoria && TOP_CATS.includes(p.categoria));
  if (filtro === "bottom") return prendas.filter((p) => p.categoria && BOTTOM_CATS.includes(p.categoria));
  if (filtro === "shoes") return prendas.filter((p) => p.categoria && SHOES_CATS.includes(p.categoria));
  if (filtro === "otro") return prendas.filter((p) => !p.categoria || (
    !TOP_CATS.includes(p.categoria) && !BOTTOM_CATS.includes(p.categoria) && !SHOES_CATS.includes(p.categoria)
  ));
  return prendas;
}

export default function ClosetPage() {
  const [prendas, setPrendas] = useState<Prenda[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState<Filtro>("todo");
  const [eliminando, setEliminando] = useState<number | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) return;
    try {
      const u = JSON.parse(raw);
      if (typeof u?.id === "number") setUsuarioId(u.id);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (usuarioId == null) return;
    setCargando(true);
    fetch(`/api/prendas?usuarioId=${usuarioId}`)
      .then((r) => r.json())
      .then((data) => setPrendas(Array.isArray(data) ? data : []))
      .catch(() => setPrendas([]))
      .finally(() => setCargando(false));
  }, [usuarioId]);

  async function eliminarPrenda(id: number) {
    setEliminando(id);
    try {
      const res = await fetch(`/api/prendas/${id}`, { method: "DELETE" });
      if (res.ok) setPrendas((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setEliminando(null);
    }
  }

  const prendasFiltradas = filtrarPrendas(prendas, filtro);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 pt-12 pb-3">
        <div className="flex items-center justify-between">
          <h1 className="font-family-coolvetica text-black text-[28px] tracking-[0.1em]">
            Mi Clóset
          </h1>
          <span className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-[0.06em]">
            {prendas.length} prendas
          </span>
        </div>
      </header>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`flex-shrink-0 px-4 h-[34px] rounded-full font-family-erode-variable text-[13px] tracking-[0.06em] transition-colors ${
              filtro === f.id ? "bg-black text-white" : "bg-[#f0f0f0] text-black"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 px-4 pb-4">
        {cargando ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#f0f0f0] animate-pulse rounded-lg" />
            ))}
          </div>
        ) : prendasFiltradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="font-family-erode-variable text-[#929292] text-[14px] tracking-[0.06em] max-w-[220px]">
              {filtro === "todo"
                ? "Aún no tienes prendas. Empieza tomando fotos."
                : "No tienes prendas de esta categoría."}
            </p>
            {filtro === "todo" && (
              <Link
                href="/onboarding/camera"
                className="px-6 py-2 rounded-full bg-black text-white font-family-reggae-one text-sm"
              >
                Añadir prendas
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {prendasFiltradas.map((prenda) => (
              <div key={prenda.id} className="relative">
                <div className="aspect-[3/4] bg-[#f8f8f8] rounded-lg overflow-hidden">
                  {prenda.imagen_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={prenda.imagen_url}
                      alt={prenda.categoria ?? "prenda"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f0f0f0]" />
                  )}
                </div>
                <button
                  onClick={() => eliminarPrenda(prenda.id)}
                  disabled={eliminando === prenda.id}
                  className="absolute top-2 right-2 w-[28px] h-[28px] rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#fee2e2] transition-colors disabled:opacity-50"
                  aria-label="Eliminar prenda"
                >
                  {eliminando === prenda.id ? (
                    <span className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  )}
                </button>
                {prenda.categoria && (
                  <p className="mt-1 font-family-erode-variable text-[11px] text-[#5a4900] tracking-[0.06em] text-center capitalize">
                    {prenda.categoria}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB añadir más */}
      {!cargando && (
        <div className="fixed bottom-[100px] right-4">
          <Link
            href="/onboarding/camera"
            className="w-[52px] h-[52px] rounded-full bg-black flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            aria-label="Añadir prenda"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verificar manualmente**

1. Navegar a `/closet` desde la app (tab "closet" en el nav)
2. Las prendas del usuario aparecen en un grid de 2 columnas
3. Los tabs de filtro funcionan (Top, Bottom, Zapatos, Otros)
4. El botón X elimina la prenda (desaparece del grid sin recargar)
5. El FAB (+) lleva a `/onboarding/camera`
6. Estado vacío muestra el mensaje y el botón "Añadir prendas"

- [ ] **Step 3: Commit**

```bash
git add "app/(app)/closet/page.tsx"
git commit -m "feat: add /closet page with garment grid, filter tabs, and delete"
```

---

## Task 8: Página /inicio — Dashboard con estadísticas

**Files:**
- Create: `clogo-app/app/(app)/inicio/page.tsx`

- [ ] **Step 1: Crear el archivo**

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Stats = {
  prendas: number;
  outfits: number;
  eventosProximos: number;
};

type Evento = { fecha: string };

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a4900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function InicioPage() {
  const [usuario, setUsuario] = useState<{ id: number; username: string } | null>(null);
  const [stats, setStats] = useState<Stats>({ prendas: 0, outfits: 0, eventosProximos: 0 });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) return;
    try { setUsuario(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!usuario?.id) return;
    const uid = usuario.id;
    Promise.all([
      fetch(`/api/prendas?usuarioId=${uid}`).then((r) => r.json()).catch(() => []),
      fetch(`/api/outfits?usuarioId=${uid}`).then((r) => r.json()).catch(() => []),
      fetch(`/api/calendario?usuarioId=${uid}`).then((r) => r.json()).catch(() => []),
    ]).then(([prendas, outfits, calendario]) => {
      const hoy = new Date();
      const en7dias = new Date();
      en7dias.setDate(hoy.getDate() + 7);
      const eventosProximos = Array.isArray(calendario)
        ? calendario.filter((e: Evento) => {
            const f = new Date(e.fecha);
            return f >= hoy && f <= en7dias;
          }).length
        : 0;
      setStats({
        prendas: Array.isArray(prendas) ? prendas.length : 0,
        outfits: Array.isArray(outfits) ? outfits.length : 0,
        eventosProximos,
      });
    }).finally(() => setCargando(false));
  }, [usuario]);

  const hora = new Date().getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 18 ? "Buenas tardes" : "Buenas noches";

  const ACCIONES = [
    { label: "Ver outfit de hoy", href: "/hoy" },
    { label: "Añadir prenda al closet", href: "/onboarding/camera" },
    { label: "Crear un nuevo outfit", href: "/outfits/nuevo" },
    { label: "Planificar semana", href: "/calendario" },
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 pt-12 pb-6">
        <h1 className="font-family-coolvetica text-black text-[26px] tracking-[0.08em]">
          {saludo}{usuario?.username ? `, ${usuario.username}` : ""}
        </h1>
        <p className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-[0.06em] mt-1">
          ¿Qué te vas a poner hoy?
        </p>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 px-4 mb-8">
        {[
          { label: "Prendas", value: stats.prendas, href: "/closet" },
          { label: "Outfits", value: stats.outfits, href: "/outfits" },
          { label: "Esta semana", value: stats.eventosProximos, href: "/calendario" },
        ].map(({ label, value, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center justify-center h-[80px] rounded-2xl bg-[#f8f8f8] hover:bg-[#f0f0f0] transition-colors gap-1"
          >
            {cargando ? (
              <div className="w-8 h-6 bg-[#e0e0e0] rounded animate-pulse" />
            ) : (
              <span className="font-family-coolvetica text-black text-[26px] tracking-[0.05em] leading-none">
                {value}
              </span>
            )}
            <span className="font-family-erode-variable text-[#5a4900] text-[11px] tracking-[0.06em] text-center leading-none">
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="px-4">
        <p className="font-family-erode-variable text-black text-[13px] tracking-[0.06em] mb-3 font-semibold">
          Acciones rápidas
        </p>
        <div className="flex flex-col gap-2">
          {ACCIONES.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-4 h-[52px] rounded-2xl bg-[#f8f8f8] hover:bg-[#f0f0f0] transition-colors"
            >
              <span className="font-family-erode-variable text-black text-[14px] tracking-[0.04em]">
                {label}
              </span>
              <IconArrow />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar manualmente**

1. Navegar a `/inicio`
2. El saludo muestra el nombre del usuario
3. Los 3 stats se cargan desde la API (contadores correctos)
4. Cada stat card lleva a la página correspondiente
5. Las acciones rápidas funcionan como enlaces

- [ ] **Step 3: Commit**

```bash
git add "app/(app)/inicio/page.tsx"
git commit -m "feat: add /inicio dashboard page with stats and quick actions"
```

---

## Task 9: Página /calendario — Planificador de 14 días

**Files:**
- Create: `clogo-app/app/(app)/calendario/page.tsx`

La página muestra las próximas 2 semanas. El usuario puede seleccionar un día y asignarle un outfit de su lista o pedir uno sugerido.

- [ ] **Step 1: Crear el archivo**

```typescript
"use client";

import { useEffect, useState, useCallback } from "react";

type PrendaMini = { imagen_url: string | null; categoria: string | null };
type OutfitMini = { id: number; nombre: string; prendas: Array<{ prenda: PrendaMini }> };
type CalendarioEvento = { id: number; fecha: string; ocasion: string | null; outfit: OutfitMini };

const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const DIAS_SEMANA = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

function formatFechaKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function generarDias(): Date[] {
  const dias: Date[] = [];
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + i);
    dias.push(d);
  }
  return dias;
}

export default function CalendarioPage() {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [eventos, setEventos] = useState<CalendarioEvento[]>([]);
  const [outfits, setOutfits] = useState<OutfitMini[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);
  const [cargando, setCargando] = useState(true);
  const [asignando, setAsignando] = useState(false);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const dias = generarDias();
  const eventosPorFecha = new Map<string, CalendarioEvento>(
    eventos.map((e) => [formatFechaKey(new Date(e.fecha)), e])
  );

  useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) return;
    try {
      const u = JSON.parse(raw);
      if (typeof u?.id === "number") setUsuarioId(u.id);
    } catch { /* ignore */ }
  }, []);

  const cargarDatos = useCallback(async (uid: number) => {
    setCargando(true);
    try {
      const [calendarioRes, outfitsRes] = await Promise.all([
        fetch(`/api/calendario?usuarioId=${uid}`).then((r) => r.json()),
        fetch(`/api/outfits?usuarioId=${uid}`).then((r) => r.json()),
      ]);
      setEventos(Array.isArray(calendarioRes) ? calendarioRes : []);
      setOutfits(Array.isArray(outfitsRes) ? outfitsRes : []);
    } catch { /* silent */ }
    finally { setCargando(false); }
  }, []);

  useEffect(() => {
    if (usuarioId != null) cargarDatos(usuarioId);
  }, [usuarioId, cargarDatos]);

  async function asignarOutfit(outfitId: number) {
    if (!diaSeleccionado || usuarioId == null) return;
    setAsignando(true);
    const claveHoy = formatFechaKey(diaSeleccionado);
    const eventoExistente = eventosPorFecha.get(claveHoy);

    try {
      if (eventoExistente) {
        await fetch(`/api/calendario/${eventoExistente.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ outfitId }),
        });
      } else {
        await fetch("/api/calendario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fecha: diaSeleccionado.toISOString(),
            usuarioId,
            outfitId,
          }),
        });
      }
      await cargarDatos(usuarioId);
      setMostrarSelector(false);
      setDiaSeleccionado(null);
    } catch { /* silent */ }
    finally { setAsignando(false); }
  }

  async function usarSugerido() {
    if (!diaSeleccionado || usuarioId == null) return;
    setAsignando(true);
    try {
      const claveHoy = formatFechaKey(diaSeleccionado);
      const eventoExistente = eventosPorFecha.get(claveHoy);

      // Si hay uno existente y es hoy, regenerar; si es futuro, crear nuevo
      const hoy = formatFechaKey(new Date());
      const params = new URLSearchParams({ usuarioId: String(usuarioId) });
      if (eventoExistente && claveHoy === hoy) params.set("regenerar", "true");

      const res = await fetch(`/api/outfits/sugerido?${params}`);
      if (res.ok) {
        await cargarDatos(usuarioId);
        setMostrarSelector(false);
        setDiaSeleccionado(null);
      }
    } catch { /* silent */ }
    finally { setAsignando(false); }
  }

  const hoyKey = formatFechaKey(new Date());

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 pt-12 pb-4">
        <h1 className="font-family-coolvetica text-black text-[28px] tracking-[0.1em]">
          Calendario
        </h1>
        <p className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-[0.06em] mt-1">
          Próximas 2 semanas
        </p>
      </header>

      {/* Day strip */}
      {cargando ? (
        <div className="px-4 flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[80px] h-[120px] bg-[#f0f0f0] animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="px-4 flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {dias.map((dia) => {
            const clave = formatFechaKey(dia);
            const evento = eventosPorFecha.get(clave);
            const esHoy = clave === hoyKey;
            const seleccionado = diaSeleccionado ? formatFechaKey(diaSeleccionado) === clave : false;

            return (
              <button
                key={clave}
                onClick={() => {
                  setDiaSeleccionado(dia);
                  setMostrarSelector(true);
                }}
                className={`flex-shrink-0 w-[80px] flex flex-col items-center rounded-xl overflow-hidden border transition-all ${
                  seleccionado
                    ? "border-black"
                    : esHoy
                      ? "border-[#FFC17A]"
                      : "border-[#f0f0f0]"
                }`}
              >
                {/* Date header */}
                <div className={`w-full py-2 flex flex-col items-center ${esHoy ? "bg-[#FFC17A]" : "bg-[#f8f8f8]"}`}>
                  <span className="font-family-erode-variable text-[11px] text-[#5a4900] tracking-[0.06em]">
                    {DIAS_SEMANA[dia.getDay()]}
                  </span>
                  <span className="font-family-coolvetica text-black text-[20px] leading-none">
                    {dia.getDate()}
                  </span>
                  <span className="font-family-erode-variable text-[10px] text-[#5a4900]">
                    {MESES[dia.getMonth()]}
                  </span>
                </div>
                {/* Outfit preview */}
                <div className="w-full flex-1 min-h-[60px] bg-white flex items-center justify-center p-1">
                  {evento ? (
                    <div className="w-full h-[60px] grid grid-cols-2 gap-[2px] overflow-hidden">
                      {evento.outfit.prendas.slice(0, 2).map((op, i) =>
                        op.prenda.imagen_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={op.prenda.imagen_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div key={i} className="w-full h-full bg-[#f0f0f0]" />
                        )
                      )}
                      {evento.outfit.prendas.length === 1 && (
                        <div className="w-full h-full bg-[#f0f0f0]" />
                      )}
                    </div>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d0d0d0" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail panel: día seleccionado */}
      {diaSeleccionado && !mostrarSelector && (
        <div className="px-4 mt-4">
          {(() => {
            const ev = eventosPorFecha.get(formatFechaKey(diaSeleccionado));
            return ev ? (
              <div className="rounded-2xl bg-[#f8f8f8] p-4">
                <p className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-[0.06em] mb-2">
                  {DIAS_SEMANA[diaSeleccionado.getDay()]} {diaSeleccionado.getDate()} — {ev.outfit.nombre}
                </p>
                <div className="flex gap-2 overflow-x-auto">
                  {ev.outfit.prendas.map((op, i) =>
                    op.prenda.imagen_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={op.prenda.imagen_url} alt="" className="w-[60px] h-[80px] object-cover rounded-lg flex-shrink-0" />
                    ) : null
                  )}
                </div>
                <button
                  onClick={() => setMostrarSelector(true)}
                  className="mt-3 font-family-erode-variable text-[13px] text-[#5a4900] tracking-[0.06em] underline"
                >
                  Cambiar outfit
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#f8f8f8] p-4 flex flex-col items-center gap-3">
                <p className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-[0.06em]">
                  {DIAS_SEMANA[diaSeleccionado.getDay()]} {diaSeleccionado.getDate()} — Sin outfit
                </p>
                <button
                  onClick={() => setMostrarSelector(true)}
                  className="px-5 py-2 rounded-full bg-black text-white font-family-reggae-one text-sm"
                >
                  Asignar outfit
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* Outfit selector bottom sheet */}
      {mostrarSelector && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => { setMostrarSelector(false); setDiaSeleccionado(null); }} />
          <div className="relative bg-white rounded-t-3xl px-4 pt-5 pb-10 max-h-[70vh] flex flex-col">
            <div className="w-10 h-1 bg-[#e0e0e0] rounded-full mx-auto mb-4" />
            <p className="font-family-coolvetica text-black text-[20px] tracking-[0.08em] mb-1">
              Elige un outfit
            </p>
            {diaSeleccionado && (
              <p className="font-family-erode-variable text-[#5a4900] text-[12px] tracking-[0.06em] mb-4">
                Para el {DIAS_SEMANA[diaSeleccionado.getDay()]} {diaSeleccionado.getDate()} de {MESES[diaSeleccionado.getMonth()]}
              </p>
            )}

            {/* Sugerir automático */}
            <button
              onClick={usarSugerido}
              disabled={asignando}
              className="w-full h-[48px] mb-3 rounded-2xl bg-[#FFC17A] flex items-center justify-center font-family-erode-variable text-black text-[14px] tracking-[0.04em] disabled:opacity-50"
            >
              {asignando ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : "✨ Sugerir uno automáticamente"}
            </button>

            {/* Lista de outfits guardados */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
              {outfits.length === 0 ? (
                <p className="font-family-erode-variable text-[#929292] text-[13px] text-center py-4">
                  No tienes outfits guardados aún
                </p>
              ) : (
                outfits.map((outfit) => (
                  <button
                    key={outfit.id}
                    onClick={() => asignarOutfit(outfit.id)}
                    disabled={asignando}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#f8f8f8] hover:bg-[#f0f0f0] transition-colors disabled:opacity-50 text-left"
                  >
                    <div className="flex gap-1 flex-shrink-0">
                      {outfit.prendas.slice(0, 2).map((op, i) =>
                        op.prenda.imagen_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={i} src={op.prenda.imagen_url} alt="" className="w-[36px] h-[48px] object-cover rounded-md" />
                        ) : (
                          <div key={i} className="w-[36px] h-[48px] bg-[#e0e0e0] rounded-md" />
                        )
                      )}
                    </div>
                    <span className="font-family-erode-variable text-black text-[14px] tracking-[0.04em]">
                      {outfit.nombre}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verificar manualmente**

1. Navegar a `/calendario`
2. Las 14 tarjetas de días se muestran en scroll horizontal
3. El día de hoy aparece con borde naranja (#FFC17A)
4. Los días con outfit muestran thumbnail de 2 prendas
5. Click en un día: aparece el panel de detalle (si tiene outfit) o "Sin outfit"
6. Click en "Asignar outfit": aparece el bottom sheet con "Sugerir uno" y la lista de outfits
7. Seleccionar un outfit: se guarda y el día muestra el thumbnail

- [ ] **Step 3: Commit**

```bash
git add "app/(app)/calendario/page.tsx"
git commit -m "feat: add /calendario page with 14-day planner and outfit assignment"
```

---

## Task 10: Página /outfits — Listado de outfits guardados

**Files:**
- Create: `clogo-app/app/(app)/outfits/page.tsx`
- Modify: `clogo-app/app/(app)/layout.tsx` (fix activo con startsWith para subrutas)

- [ ] **Step 1: Crear la página de listado de outfits**

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PrendaMini = { imagen_url: string | null; categoria: string | null };
type OutfitResp = {
  id: number;
  nombre: string;
  fecha_creacion: string;
  prendas: Array<{ prenda: PrendaMini }>;
};

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<OutfitResp[]>([]);
  const [cargando, setCargando] = useState(true);
  const [eliminando, setEliminando] = useState<number | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) return;
    try {
      const u = JSON.parse(raw);
      if (typeof u?.id === "number") setUsuarioId(u.id);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (usuarioId == null) return;
    setCargando(true);
    fetch(`/api/outfits?usuarioId=${usuarioId}`)
      .then((r) => r.json())
      .then((data) => setOutfits(Array.isArray(data) ? data : []))
      .catch(() => setOutfits([]))
      .finally(() => setCargando(false));
  }, [usuarioId]);

  async function eliminarOutfit(id: number) {
    setEliminando(id);
    try {
      const res = await fetch(`/api/outfits/${id}`, { method: "DELETE" });
      if (res.ok) setOutfits((prev) => prev.filter((o) => o.id !== id));
    } finally {
      setEliminando(null);
    }
  }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="font-family-coolvetica text-black text-[28px] tracking-[0.1em]">
            Mis Outfits
          </h1>
          <span className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-[0.06em]">
            {outfits.length} guardados
          </span>
        </div>
      </header>

      {/* Grid */}
      <div className="flex-1 px-4 pb-4">
        {cargando ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#f0f0f0] animate-pulse rounded-xl" />
            ))}
          </div>
        ) : outfits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="font-family-erode-variable text-[#929292] text-[14px] tracking-[0.06em] max-w-[220px]">
              Aún no tienes outfits guardados. Crea uno combinando tus prendas.
            </p>
            <Link
              href="/outfits/nuevo"
              className="px-6 py-2 rounded-full bg-black text-white font-family-reggae-one text-sm"
            >
              Crear outfit
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {outfits.map((outfit) => (
              <div key={outfit.id} className="relative">
                <Link href={`/outfits`} className="block">
                  {/* Collage 2x2 de hasta 4 prendas */}
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#f8f8f8]">
                    {outfit.prendas.length === 0 ? (
                      <div className="w-full h-full bg-[#f0f0f0]" />
                    ) : outfit.prendas.length === 1 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={outfit.prendas[0].prenda.imagen_url ?? ""}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="grid grid-cols-2 grid-rows-2 h-full gap-[2px]">
                        {outfit.prendas.slice(0, 4).map((op, i) =>
                          op.prenda.imagen_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} src={op.prenda.imagen_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div key={i} className="w-full h-full bg-[#f0f0f0]" />
                          )
                        )}
                        {Array.from({ length: Math.max(0, 4 - outfit.prendas.length) }).map((_, i) => (
                          <div key={`empty-${i}`} className="w-full h-full bg-[#f0f0f0]" />
                        ))}
                      </div>
                    )}
                  </div>
                </Link>

                {/* Nombre y delete */}
                <div className="flex items-center justify-between mt-1 px-1">
                  <p className="font-family-erode-variable text-[12px] text-[#5a4900] tracking-[0.04em] truncate max-w-[80%]">
                    {outfit.nombre}
                  </p>
                  <button
                    onClick={() => eliminarOutfit(outfit.id)}
                    disabled={eliminando === outfit.id}
                    className="w-[22px] h-[22px] flex items-center justify-center hover:opacity-70 disabled:opacity-40"
                    aria-label="Eliminar outfit"
                  >
                    {eliminando === outfit.id ? (
                      <span className="w-3 h-3 border border-[#5a4900] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5a4900" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB crear nuevo */}
      {!cargando && (
        <div className="fixed bottom-[100px] right-4">
          <Link
            href="/outfits/nuevo"
            className="w-[52px] h-[52px] rounded-full bg-black flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            aria-label="Crear outfit"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Arreglar el `activo` del layout para subrutas de /outfits**

En `app/(app)/layout.tsx`, cambiar la línea:
```typescript
// ANTES:
const activo = pathname === tab.href;
```
```typescript
// DESPUÉS:
const activo = pathname === tab.href || pathname.startsWith(tab.href + "/");
```

- [ ] **Step 3: Verificar manualmente**

1. Navegar a `/outfits`
2. Los outfits se muestran en grid 2 columnas con collage de prendas
3. El nombre de cada outfit aparece abajo
4. El botón X elimina el outfit
5. El FAB (+) lleva a `/outfits/nuevo`
6. Al estar en `/outfits/nuevo`, el tab "Outfits" sigue iluminado en el nav

- [ ] **Step 4: Commit**

```bash
git add "app/(app)/outfits/page.tsx" "app/(app)/layout.tsx"
git commit -m "feat: add /outfits list page; fix active tab for subroutes"
```

---

## Task 11: Página /outfits/nuevo — Outfit Builder

**Files:**
- Create: `clogo-app/app/(app)/outfits/nuevo/page.tsx`

- [ ] **Step 1: Crear el archivo**

```typescript
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Prenda = {
  id: number;
  imagen_url: string | null;
  categoria: string | null;
  color_principal: string | null;
};

export default function NuevoOutfitPage() {
  const router = useRouter();
  const [prendas, setPrendas] = useState<Prenda[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<Set<number>>(new Set());
  const [nombre, setNombre] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) return;
    try {
      const u = JSON.parse(raw);
      if (typeof u?.id === "number") setUsuarioId(u.id);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (usuarioId == null) return;
    fetch(`/api/prendas?usuarioId=${usuarioId}`)
      .then((r) => r.json())
      .then((data) => setPrendas(Array.isArray(data) ? data : []))
      .catch(() => setPrendas([]))
      .finally(() => setCargando(false));
  }, [usuarioId]);

  function togglePrenda(id: number) {
    setSeleccionadas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function guardarOutfit() {
    if (seleccionadas.size < 2 || !nombre.trim() || usuarioId == null) return;
    setGuardando(true);
    try {
      const res = await fetch("/api/outfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          usuarioId,
          prendasIds: Array.from(seleccionadas),
        }),
      });
      if (res.ok) router.push("/outfits");
    } catch { /* silent */ }
    finally { setGuardando(false); }
  }

  const puedeGuardar = seleccionadas.size >= 2 && nombre.trim().length > 0;

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="hover:opacity-70 transition-opacity" aria-label="Volver">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="font-family-coolvetica text-black text-[24px] tracking-[0.1em]">
            Nuevo Outfit
          </h1>
        </div>
      </header>

      {/* Nombre del outfit */}
      <div className="px-4 mb-5">
        <input
          type="text"
          placeholder="Nombre del outfit (ej: Look casual viernes)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          maxLength={60}
          className="w-full h-[48px] px-4 rounded-full bg-[#f0f0f0] font-family-erode-variable text-[14px] text-black tracking-[0.04em] outline-none placeholder:text-[#929292]"
        />
      </div>

      {/* Instrucción */}
      <div className="px-4 mb-3 flex items-center justify-between">
        <p className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-[0.06em]">
          Selecciona tus prendas (mín. 2)
        </p>
        {seleccionadas.size > 0 && (
          <span className="font-family-erode-variable text-[13px] text-black font-semibold tracking-[0.06em]">
            {seleccionadas.size} elegidas
          </span>
        )}
      </div>

      {/* Grid de prendas seleccionables */}
      <div className="flex-1 px-4 pb-4">
        {cargando ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-[#f0f0f0] animate-pulse rounded-lg" />
            ))}
          </div>
        ) : prendas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="font-family-erode-variable text-[#929292] text-[14px] tracking-[0.06em] max-w-[220px]">
              No tienes prendas. Añade algunas primero desde el closet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {prendas.map((prenda) => {
              const estaSeleccionada = seleccionadas.has(prenda.id);
              return (
                <button
                  key={prenda.id}
                  onClick={() => togglePrenda(prenda.id)}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                    estaSeleccionada ? "ring-3 ring-black ring-offset-1" : ""
                  }`}
                >
                  {prenda.imagen_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={prenda.imagen_url}
                      alt={prenda.categoria ?? "prenda"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f0f0f0]" />
                  )}
                  {/* Check overlay */}
                  {estaSeleccionada && (
                    <div className="absolute inset-0 bg-black/20 flex items-start justify-end p-1">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Botón guardar */}
      <div className="px-4 pb-[110px] pt-4">
        <div className={`w-full h-[63px] rounded-full p-[2px] shadow-[-2px_6px_4px_0px_rgba(0,0,0,0.33)] transition-opacity ${
          puedeGuardar ? "bg-gradient-to-r from-[#F9F023] via-[#D6006E] to-[#8C52FF]" : "bg-[#e0e0e0]"
        }`}>
          <button
            onClick={guardarOutfit}
            disabled={!puedeGuardar || guardando}
            className="w-full h-full bg-black border-2 border-[#FFD000] text-white rounded-full flex items-center justify-center font-family-reggae-one text-base hover:bg-black/80 transition-all disabled:bg-[#555] disabled:border-[#555] disabled:cursor-not-allowed"
          >
            {guardando ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              `Guardar outfit${seleccionadas.size >= 2 ? ` (${seleccionadas.size} prendas)` : ""}`
            )}
          </button>
        </div>
        {seleccionadas.size < 2 && prendas.length > 0 && (
          <p className="font-family-erode-variable text-[#929292] text-[12px] text-center mt-2 tracking-[0.04em]">
            Selecciona al menos 2 prendas
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar manualmente**

1. Navegar a `/outfits/nuevo`
2. Las prendas aparecen en grid de 3 columnas
3. Tocar una prenda la selecciona (aparece check overlay negro)
4. Tocar de nuevo la deselecciona
5. Escribir un nombre en el input
6. Con 2+ prendas Y nombre, el botón "Guardar outfit" se activa (gradiente)
7. Al guardar, redirige a `/outfits` y el nuevo outfit aparece en la lista

- [ ] **Step 3: Commit**

```bash
git add "app/(app)/outfits/nuevo/page.tsx"
git commit -m "feat: add /outfits/nuevo outfit builder page"
```

---

## Verificación Final — End-to-End

- [ ] **Flujo completo como usuario nuevo:**

1. Ir a `/` (landing) → click "Empieza gratis" → `/register`
2. Registrarse → redirige a `/onboarding/style`
3. Seleccionar 2 estilos → "Continuar" → `/onboarding/camera`
4. Tomar 5 fotos (con el ML corriendo en `localhost:8000`) → "Continuar" → `/hoy`
5. La pantalla Hoy muestra el outfit del día
6. Click dislike → el outfit se regenera
7. Click corazón → se activa
8. Nav → `/closet`: ver las 5 prendas en el grid, probar filtros, borrar una
9. Nav → `/inicio`: ver estadísticas (prendas, outfits, semana)
10. Nav → `/outfits`: grid vacío de outfits personalizados
11. FAB + → `/outfits/nuevo`: seleccionar 3 prendas, nombrar "Look prueba", guardar
12. Volver a `/outfits`: el nuevo outfit aparece
13. Nav → `/calendario`: las 14 tarjetas se muestran
14. Click en mañana → "Asignar outfit" → seleccionar "Look prueba"
15. La tarjeta de mañana muestra thumbnail del outfit

- [ ] **Verificar que el ML corre correctamente:**

```bash
cd clogo-ml
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Luego en browser: `http://localhost:8000/health` → `{"status": "ok"}`

- [ ] **Commit final de integración:**

```bash
git add .
git commit -m "chore: complete MVP — all 5 nav tabs functional"
```

---

## Self-Review — Cobertura del Spec

| Requisito | Tarea | ¿Cubierto? |
|---|---|---|
| Auth (login/register) | Existente | ✅ |
| Onboarding estilo guarda en BD | Task 2+3 | ✅ |
| Cámara → ML → Cloudinary → DB | Existente | ✅ |
| Pantalla Hoy con outfit del día | Existente + Task 4+5+6 | ✅ |
| Like/Dislike regenera outfit | Task 4+5+6 | ✅ |
| /closet con grid, filtros, borrar | Task 7 | ✅ |
| /inicio con estadísticas | Task 8 | ✅ |
| /calendario 14 días planificador | Task 9 | ✅ |
| /outfits lista de outfits guardados | Task 10 | ✅ |
| Outfit Builder (selección prendas) | Task 11 | ✅ |
| Fix DELETE prenda (FK constraint) | Task 1 | ✅ |
| Nav tab activo en subrutas | Task 10 | ✅ |
| Stripe Premium | ❌ Fuera de alcance (Phase 2) |
| PWA/Offline | ❌ Fuera de alcance (Phase 2) |
| API de clima real | ❌ Fuera de alcance (hardcoded) |
