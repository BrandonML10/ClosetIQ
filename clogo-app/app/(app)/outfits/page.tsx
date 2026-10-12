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
