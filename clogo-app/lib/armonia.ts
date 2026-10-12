import type { Prenda } from "../prisma/generated/client";

export type Slot = "top" | "bottom" | "shoes";

export type PrendaConSlot = Prenda & { slot: Slot };

// 1. DICCIONARIO BILINGÜE Y AMPLIADO
const TOP_CATS = [
  "t-shirt", "shirt", "sweater", "jacket", "coat", "dress",
  "playera", "camisa", "vestido", "chamarra", "abrigo", "suéter", "sueter"
];
const BOTTOM_CATS = [
  "pants", "jeans", "skirt", 
  "pantalón deportivo", "pantalon deportivo", 
  "pantalón de vestir", "pantalon de vestir", 
  "short", "falda"
];
const SHOES_CATS = [
  "shoes", "sneakers", "boots", 
  "tenis", "zapatos formales", "botas", "sandalias"
];

function clasificarSlot(cat: string | null): Slot | null {
  if (!cat) return null;
  // 2. CONVERSIÓN A MINÚSCULAS PARA EVITAR ERRORES DE LECTURA
  const lowerCat = cat.toLowerCase();
  
  if (TOP_CATS.includes(lowerCat)) return "top";
  if (BOTTOM_CATS.includes(lowerCat)) return "bottom";
  if (SHOES_CATS.includes(lowerCat)) return "shoes";
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
    if (excluidos.size > 0) {
      const sinExcluir = prendas
        .map((p) => ({ p, slot: clasificarSlot(p.categoria) }))
        .filter((x) => x.slot !== null);
      const tSinExcluir = sinExcluir.filter((x) => x.slot === "top");
      const bSinExcluir = sinExcluir.filter((x) => x.slot === "bottom");
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