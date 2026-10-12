import Image from "next/image";
import phoneImg from "@/app/assets/celu.png";

function ShirtIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[6.31cqw] w-[6.31cqw] flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[6.55cqw] w-[6.55cqw] flex-shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function WandIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[5.83cqw] w-[5.83cqw] flex-shrink-0"
      aria-hidden="true"
    >
      <path d="m3 21 9-9" />
      <path d="M15 3v4" />
      <path d="M19 5h-4" />
      <path d="M18 13v4" />
      <path d="M22 15h-4" />
    </svg>
  );
}

export default function Pro() {
  return (
    <section
      id="cada-prenda"
      className="relative h-[252.67cqw] w-full overflow-hidden bg-[#fbf9da]"
    >
      {/* "Tu armario, reinventado" (rosa) */}
      <p className="absolute left-[18.69cqw] top-5 whitespace-nowrap font-family-romantic text-[8.74cqw] leading-none text-[#ff15dc]">
        Tu armario, reinventado
      </p>

      {/* Título principal */}
      <div className="absolute left-1/2 top-[19.66cqw] -translate-x-1/2 whitespace-nowrap text-center font-family-coolvetica text-[9.71cqw] leading-[1.15] text-black">
        <p className="m-0">Cada prenda</p>
        <p className="m-0">tiene su momento</p>
      </div>

      {/* Descripción */}
      <p className="absolute left-1/2 top-[49.76cqw] w-[81.31cqw] -translate-x-1/2 text-center font-family-erode-variable text-[5.83cqw] leading-[1.25] text-black">
        CLOGO aprende tu estilo, sugiere combinaciones y te ayuda a sacar el
        máximo de cada pieza. Sin complicaciones.
      </p>

      {/* Mockup del teléfono (desborda a la izquierda como en Figma) */}
      <div className="absolute left-[-13.59cqw] top-[78.88cqw] h-[142.23cqw] w-[127.18cqw]">
        <Image
          src={phoneImg}
          alt="CLOGO en tu teléfono"
          fill
          sizes="(max-width: 480px) 127vw, 610px"
          className="pointer-events-none object-contain"
        />
      </div>

      {/* Pill "Organiza" */}
      <div className="absolute left-[6.07cqw] top-[223.54cqw] flex h-[10.19cqw] w-[40.78cqw] items-center justify-center gap-[2.43cqw] rounded-[7.28cqw] border border-[#ff15dc] bg-[#fbf9da]">
        <ShirtIcon />
        <span className="font-family-erode-variable text-[4.85cqw] leading-none text-black">
          Organiza
        </span>
      </div>

      {/* Pill "Looks con IA" */}
      <div className="absolute left-[52.91cqw] top-[223.54cqw] flex h-[10.19cqw] w-[40.78cqw] items-center justify-center gap-[1.94cqw] rounded-[7.28cqw] border border-[#ff15dc] bg-[#fbf9da]">
        <WandIcon />
        <span className="font-family-erode-variable text-[4.85cqw] leading-none text-black">
          Looks con IA
        </span>
      </div>

      {/* Pill "planifica" (centrada y desfasada abajo) */}
      <div className="absolute left-[27.91cqw] top-[238.11cqw] flex h-[10.19cqw] w-[40.78cqw] items-center justify-center gap-[2.43cqw] rounded-[7.28cqw] border border-[#ff15dc] bg-[#fbf9da]">
        <CalendarIcon />
        <span className="font-family-erode-variable text-[4.85cqw] leading-none text-black">
          planifica
        </span>
      </div>
    </section>
  );
}
