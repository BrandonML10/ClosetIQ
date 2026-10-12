"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import imgCamara from "@/app/assets/imagen_camara.png";

export default function CameraPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);
  const [subiendo, setSubiendo] = useState(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<{
    tipo: "ok" | "error";
    texto: string;
  } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) {
      router.replace("/login");
      return;
    }
    try {
      const u = JSON.parse(raw);
      if (typeof u?.id === "number") {
        setUsuarioId(u.id);
      } else {
        router.replace("/login");
      }
    } catch {
      router.replace("/login");
    }
  }, [router]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // permitir misma foto otra vez si hace falta
    if (!file || usuarioId == null) return;

    setSubiendo(true);
    setMensaje(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("usuarioId", String(usuarioId));

      // NOTA: Si vas a usar el "engaño" sin la IA prendida, recuerda que este fetch 
      // llama a la API de prendas. Asegúrate de tener tu parche aplicado en el route.ts
      const res = await fetch("/api/prendas", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (res.status === 422 && data?.is_garment === false) {
        setMensaje({
          tipo: "error",
          texto:
            "Esto no parece una prenda. Toma la foto con la prenda completa visible y un fondo claro.",
        });
        return;
      }

      if (!res.ok) {
        setMensaje({
          tipo: "error",
          texto: data?.error || "No se pudo subir la prenda. Intenta de nuevo.",
        });
        return;
      }

      setCount((c) => c + 1);
      setMensaje({ tipo: "ok", texto: "¡Prenda añadida con éxito!" });
    } catch (err) {
      console.error(err);
      setMensaje({
        tipo: "error",
        texto: "No se pudo subir la prenda. Intenta de nuevo.",
      });
    } finally {
      setSubiendo(false);
    }
  }

  // MAGIA AQUÍ: Ahora se completa con tan solo 1 prenda en lugar de 5
  const completo = count >= 1;

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

      <div className="flex flex-col items-center px-6 sm:px-8 flex-1">
        {/* Title */}
        <h1 className="font-family-coolvetica text-black text-2xl sm:text-3xl text-center leading-tight mb-6 max-w-xs">
          ¡Sube tu primera prenda para comenzar a armar tu clóset!
        </h1>

        {/* Image */}
        <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-xl overflow-hidden mb-6">
          <Image
            src={imgCamara}
            alt="Toma fotos de tus prendas"
            fill
            className="object-cover"
          />
        </div>

        {/* Instructions */}
        <div className="w-full max-w-[320px] mb-8">
          <p className="font-family-erode-variable text-black text-sm mb-2 tracking-wide font-bold">
            Asegúrate que:
          </p>
          <ul className="font-family-erode-variable text-black text-sm space-y-1">
            <li>· En la foto se vea toda la prenda.</li>
            <li>· La imagen sea lo más nítida posible.</li>
            <li>· La foto tenga un fondo claro.</li>
          </ul>
        </div>

        {/* Camera button */}
        <div className="w-[160px] h-[63px] rounded-full bg-gradient-to-r from-[#F9F023] via-[#D6006E] to-[#8C52FF] p-[2px] shadow-[-2px_6px_4px_0px_rgba(0,0,0,0.33)] mb-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={subiendo || usuarioId == null}
            className="w-full h-full bg-black border-2 border-[#FFD000] text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all disabled:opacity-60"
            aria-label="Tomar foto"
          >
            {subiendo ? (
              <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            )}
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={handleFile}
        />

        {/* Mensaje validación */}
        {mensaje && (
          <p
            className={`font-family-erode-variable text-sm mb-2 tracking-wide text-center max-w-[300px] font-bold ${
              mensaje.tipo === "error" ? "text-[#c0182e]" : "text-[#1a7a3a]"
            }`}
          >
            {mensaje.texto}
          </p>
        )}

        {/* Counter Dinámico */}
        <p className="font-family-erode-variable text-black text-sm mb-2 tracking-wide">
          Has subido {count} prenda{count !== 1 ? 's' : ''} en esta sesión
        </p>

        {/* Continuar - Aparecerá mágicamente al subir la primera prenda */}
        {completo && (
          <div className="flex justify-center pt-6">
            <div className="w-[243px] h-[63px] rounded-full bg-gradient-to-r from-[#F9F023] via-[#D6006E] to-[#8C52FF] p-[2px] shadow-[-2px_6px_4px_0px_rgba(0,0,0,0.33)]">
              <button
                type="button"
                onClick={() => router.push("/hoy")}
                className="w-full h-full bg-black border-2 border-[#FFD000] text-white rounded-full flex items-center justify-center font-family-reggae-one text-base hover:bg-black/80 transition-all"
              >
                Continuar al Clóset
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pb-10" />
    </main>
  );
}