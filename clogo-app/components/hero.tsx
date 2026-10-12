import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[189.32cqw] w-full overflow-hidden">
      {/* Imagen de fondo (486x729 en Figma, desbordando ligeramente a la izquierda) */}
      <Image
        src="https://images.unsplash.com/photo-1686491730848-0c86413833e5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Modelos con outfit"
        width={486}
        height={729}
        priority
        className="pointer-events-none absolute left-[-3.4cqw] top-0 h-[176.94cqw] w-[117.96cqw] max-w-none object-cover"
      />

      {/* Capa oscura sobre la imagen */}
      <div className="absolute left-0 top-0 h-[178.64cqw] w-full bg-black/40" />

      {/* Título principal */}
      <h1 className="absolute left-[17.23cqw] top-[59.71cqw] whitespace-nowrap font-family-romantic text-[11.65cqw] leading-none text-white [text-shadow:0px_4px_8px_rgba(0,0,0,0.55)]">
        Tu siguiente outfit
      </h1>

      {/* Subtítulo */}
      <p className="absolute left-1/2 top-[77.91cqw] -translate-x-1/2 whitespace-nowrap text-center font-family-erode-variable text-[3.88cqw] tracking-[0.39cqw] text-white [text-shadow:0px_2px_4px_rgba(0,0,0,0.6)]">
        Ya esta en tu closet.
      </p>

      {/* Botón "Empieza gratis" */}
      <Link
        href="/register"
        className="absolute left-[28.16cqw] top-[96.6cqw] flex h-[10.92cqw] w-[42.48cqw] items-center justify-center rounded-[9.71cqw] bg-[#ffdf50] shadow-[-0.49cqw_1.46cqw_0.97cqw_0_rgba(0,0,0,0.33)] transition hover:brightness-95"
      >
        <span className="font-family-reggae-one text-[2.67cqw] text-black">
          Empieza gratis
        </span>
      </Link>

      {/* Flecha hacia abajo */}
      <div className="absolute left-[43.93cqw] top-[151.21cqw] animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-[12.14cqw] w-[12.14cqw] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          aria-hidden="true"
        >
          <path d="M12 17.5 4 9.5l1.4-1.4L12 14.7l6.6-6.6L20 9.5z" />
        </svg>
      </div>
    </section>
  );
}
