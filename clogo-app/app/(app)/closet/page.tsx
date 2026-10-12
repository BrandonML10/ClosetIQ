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
