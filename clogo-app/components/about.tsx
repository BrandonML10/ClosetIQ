import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="relative h-[285.92cqw] w-full overflow-hidden bg-[#fbf9da]">
      {/* "Organiza." */}
      <h2 className="absolute left-[5.1cqw] top-[8.25cqw] whitespace-nowrap font-family-coolvetica text-[15.53cqw] leading-none text-black">
        Organiza.
      </h2>

      {/* Sol amarillo (gradiente radial) */}
      <div
        aria-hidden="true"
        className="absolute left-[75.73cqw] top-[20.15cqw] h-[40.53cqw] w-[40.53cqw] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 38%, #FFF6AC 0%, #FFE246 35%, #FFC700 75%, #F6B200 100%)",
          boxShadow: "0 0 14.56cqw rgba(255, 200, 0, 0.35)",
        }}
      />

      {/* "Combina." */}
      <h2 className="absolute left-[4.85cqw] top-[31.07cqw] whitespace-nowrap font-family-romantic text-[15.53cqw] leading-none text-[#ff15dc]">
        Combina.
      </h2>

      {/* "Repite." */}
      <h2 className="absolute left-[4.85cqw] top-[50.49cqw] whitespace-nowrap font-family-coolvetica text-[15.53cqw] leading-none text-black">
        Repite.
      </h2>

      {/* Párrafo descriptivo */}
      <p className="absolute left-[5.1cqw] top-[78.88cqw] w-[83.01cqw] font-family-erode-variable text-[4.85cqw] leading-[1.3] text-black">
        Tu armario digital, organizado y listo para inspirarte cada mañana. Sube
        tus prendas, crea looks y descubre combinaciones que no sabías que
        tenías.
      </p>

      {/* Imagen de fondo (chica con lentes) */}
      <div className="absolute left-0 top-[107.28cqw] h-[178.64cqw] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512101903502-7eb0c9022c74?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Modelo con outfit moderno"
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          className="pointer-events-none object-cover"
        />
      </div>

      {/* Botón "Descubre mas" */}
      <Link
        href="#cada-prenda"
        className="absolute left-[1.94cqw] top-[112.86cqw] z-10 flex h-[14.32cqw] w-[55.58cqw] items-center justify-center rounded-[9.71cqw] bg-[#ffdf50] shadow-[-0.49cqw_1.46cqw_0.97cqw_0_rgba(0,0,0,0.33)] transition hover:brightness-95"
      >
        <span className="font-family-reggae-one text-[3.64cqw] text-black">
          Descubre mas
        </span>
      </Link>
    </section>
  );
}
