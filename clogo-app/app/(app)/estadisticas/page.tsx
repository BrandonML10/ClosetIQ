"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type StatsResp = {
  totalPrendas: number;
  totalOutfits: number;
  distribucion: { tops: number; bottoms: number; shoes: number };
  colorFavorito: string;
};

export default function EstadisticasPage() {
  const [stats, setStats] = useState<StatsResp | null>(null);
  const [cargando, setCargando] = useState(true);
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
    fetch(`/api/estadisticas?usuarioId=${usuarioId}`)
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => console.error("Error cargando estadísticas"))
      .finally(() => setCargando(false));
  }, [usuarioId]);

  return (
    <div className="bg-[#f8f8f8] w-full min-h-screen flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full px-6 pt-12 pb-6 flex items-center justify-between">
        <Link href="/hoy" className="p-2 -ml-2" aria-label="Volver">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Link>
        <span className="font-family-lostar text-[24px] text-black">CloGo</span>
        <div className="w-8" /> {/* Espaciador */}
      </header>

      <h1 className="font-family-coolvetica text-black text-[32px] tracking-[0.05em] mb-8">
        Tu clóset en datos
      </h1>

      {cargando || !stats ? (
        <div className="flex-1 flex flex-col gap-4 w-full max-w-[340px] px-4 animate-pulse">
          <div className="h-[100px] bg-[#e0e0e0] rounded-2xl w-full" />
          <div className="h-[100px] bg-[#e0e0e0] rounded-2xl w-full" />
          <div className="h-[160px] bg-[#e0e0e0] rounded-2xl w-full" />
        </div>
      ) : (
        <div className="flex-1 w-full max-w-[360px] px-4 flex flex-col gap-5">
          
          {/* Tarjetas Superiores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center">
              <span className="font-family-coolvetica text-[42px] text-black leading-none mb-1">
                {stats.totalPrendas}
              </span>
              <span className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-wide font-bold">
                PRENDAS TOTALES
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center">
              <span className="font-family-coolvetica text-[42px] text-black leading-none mb-1">
                {stats.totalOutfits}
              </span>
              <span className="font-family-erode-variable text-[#5a4900] text-[13px] tracking-wide font-bold">
                OUTFITS ARMADOS
              </span>
            </div>
          </div>

          {/* Tarjeta de Color Favorito */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div>
              <h2 className="font-family-erode-variable text-black text-[15px] font-bold tracking-wide mb-1">
                Color Dominante
              </h2>
              <p className="font-family-erode-variable text-[#888] text-[12px]">
                El tono más repetido en tu ropa
              </p>
            </div>
            <div 
              className="w-14 h-14 rounded-full shadow-inner border border-gray-100 flex-shrink-0" 
              style={{ backgroundColor: stats.colorFavorito }}
            />
          </div>

          {/* Tarjeta de Distribución */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <h2 className="font-family-erode-variable text-black text-[15px] font-bold tracking-wide mb-4 text-center">
              Distribución de tu estilo
            </h2>
            
            <div className="space-y-4">
              {/* Tops */}
              <div>
                <div className="flex justify-between font-family-erode-variable text-[13px] text-black mb-1">
                  <span>Partes Superiores (Tops)</span>
                  <span className="font-bold">{stats.distribucion.tops}</span>
                </div>
                <div className="w-full bg-[#f0f0f0] rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full" 
                    style={{ width: `${stats.totalPrendas > 0 ? (stats.distribucion.tops / stats.totalPrendas) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Bottoms */}
              <div>
                <div className="flex justify-between font-family-erode-variable text-[13px] text-black mb-1">
                  <span>Partes Inferiores (Bottoms)</span>
                  <span className="font-bold">{stats.distribucion.bottoms}</span>
                </div>
                <div className="w-full bg-[#f0f0f0] rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full" 
                    style={{ width: `${stats.totalPrendas > 0 ? (stats.distribucion.bottoms / stats.totalPrendas) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Zapatos */}
              <div>
                <div className="flex justify-between font-family-erode-variable text-[13px] text-black mb-1">
                  <span>Calzado</span>
                  <span className="font-bold">{stats.distribucion.shoes}</span>
                </div>
                <div className="w-full bg-[#f0f0f0] rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full" 
                    style={{ width: `${stats.totalPrendas > 0 ? (stats.distribucion.shoes / stats.totalPrendas) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
      <div className="pb-10" />
    </div>
  );
}