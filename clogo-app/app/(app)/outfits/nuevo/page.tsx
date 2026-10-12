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
