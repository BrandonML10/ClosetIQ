"use client";

import { useEffect, useState } from "react";
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

  // Si el usuario ya tiene prendas, no debería estar en el onboarding lo mandamos a /hoy.
  //useEffect(() => {
    //const raw = localStorage.getItem("usuario");
    //if (!raw) return;
   // try {
    //  const u = JSON.parse(raw);
    //  if (typeof u?.id !== "number") return;
    //  fetch(`/api/prendas?usuarioId=${u.id}`)
     //   .then((r) => r.json())
     //   .then((data) => {
       //   if (Array.isArray(data) && data.length > 0) router.replace("/hoy");
     //   })
       // .catch(() => { /* permanecer aquí si falla */ });
  //  } catch { /* ignore */ }
 // }, [router]);

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

      {/* Spacer */}
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
