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

      {/* Detail panel */}
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

            <button
              onClick={usarSugerido}
              disabled={asignando}
              className="w-full h-[48px] mb-3 rounded-2xl bg-[#FFC17A] flex items-center justify-center font-family-erode-variable text-black text-[14px] tracking-[0.04em] disabled:opacity-50"
            >
              {asignando ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : "Sugerir uno automáticamente"}
            </button>

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
