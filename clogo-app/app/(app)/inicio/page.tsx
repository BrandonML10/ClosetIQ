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

  // NUEVO: Agregamos "Ver resumen de mi clóset" a tu lista de acciones
  const ACCIONES = [
    { label: "Ver outfit de hoy", href: "/hoy" },
    { label: "Añadir prenda al closet", href: "/onboarding/camera" },
    { label: "Crear un nuevo outfit", href: "/outfits/nuevo" },
    { label: "Planificar semana", href: "/calendario" },
    { label: "Ver resumen de mi clóset", href: "/estadisticas" }, 
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