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
  const [ocasion, setOcasion] = useState("");
  const [clima, setClima] = useState<{ temp: number; ciudad: string } | null>(null);
  

  const [historialExcluidos, setHistorialExcluidos] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) return;
    try {
      const u = JSON.parse(raw);
      if (typeof u?.id === "number") setUsuarioId(u.id);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=19.4208&longitude=-102.0628&current_weather=true")
      .then((res) => res.json())
      .then((data) => {
        setClima({ 
          temp: Math.round(data.current_weather.temperature), 
          ciudad: "Uruapan" 
        });
      })
      .catch(() => {
        setClima({ temp: 22, ciudad: "Uruapan" }); 
      });
  }, []);

  useEffect(() => {
    if (usuarioId == null || clima == null) return;
    cargarOutfit(usuarioId, false, [], "", clima.temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId, clima]);

  function cargarOutfit(uid: number, regenerar = false, excluirIds: number[] = [], ocasionTexto = "", tempActual?: number) {
    setCargando(true);
    setErr(null);

    const params = new URLSearchParams({ usuarioId: String(uid) });
    if (regenerar) params.set("regenerar", "true");
    if (excluirIds.length > 0) params.set("excluirIds", excluirIds.join(","));
    if (ocasionTexto.trim() !== "") params.set("ocasion", ocasionTexto);
    if (tempActual !== undefined) params.set("temp", String(tempActual));

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
    
  
    const prendasActuales = data?.outfit.prendas.map((p) => p.id) ?? [];
    const nuevaListaExcluidos = [...historialExcluidos, ...prendasActuales];
    
    setHistorialExcluidos(nuevaListaExcluidos); // Guardar en la memoria
    setRegenerando(true);
    setLikeActivo(false);
    cargarOutfit(usuarioId, true, nuevaListaExcluidos, ocasion, clima?.temp);
  }

  function handleLike() {
    setLikeActivo((v) => !v);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && usuarioId) {
      setRegenerando(true);
      setHistorialExcluidos([]); // Si cambias de ocasión, borrar la memoria para empezar de cero
      cargarOutfit(usuarioId, true, [], ocasion, clima?.temp);
    }
  }

  const porSlot: Partial<Record<Slot, PrendaResp>> = {};
  if (data) {
    for (const p of data.outfit.prendas) porSlot[p.slot] = p;
  }
  const tieneShoes = !!porSlot.shoes;

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <header className="grid grid-cols-3 items-center px-4 pt-12 pb-3">
        <button aria-label="Menu" className="flex flex-col gap-[5px] p-1 hover:opacity-70 transition-opacity justify-self-start">
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
        </button>
        <div className="flex items-center justify-center gap-1">
          <IconSun />
          <span className="font-family-erode-variable text-[#5a4900] text-[14px] tracking-[0.06em] whitespace-nowrap">
            {clima ? `${clima.temp}°, ${clima.ciudad}` : "Cargando..."}
          </span>
        </div>
        <span className="font-family-lostar text-[24px] text-black justify-self-end">CloGo</span>
      </header>

      <h1 className="font-family-coolvetica text-black text-[clamp(22px,6vw,28px)] text-center tracking-[0.1em] mt-6 px-6">
        Tu outfit para hoy
      </h1>

      <p className="font-family-erode-variable text-[#5a4900] text-[13px] text-center tracking-[0.08em] mt-5 px-6">
        ¿Vas a un lugar especial? Descríbelo
      </p>
      
      <input
        value={ocasion}
        onChange={(e) => setOcasion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Voy a una cita romantica lujosa"
        className="mx-auto mt-2 block w-[90%] max-w-[340px] h-[46px] rounded-full bg-[#ededed] text-center font-family-erode-variable text-[15px] text-black tracking-[0.06em] outline-none placeholder:text-[#929292] focus:bg-[#e0e0e0] transition-colors"
      />

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