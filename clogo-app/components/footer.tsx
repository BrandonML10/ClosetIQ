import Link from "next/link";

export default function Footer() {
    return (
        <section className="relative h-[121.6cqw] w-full overflow-hidden bg-black">
            {/* Título */}
            <h2 className="absolute left-1/2 top-[25.73cqw] -translate-x-1/2 whitespace-nowrap text-center font-family-coolvetica text-[9.71cqw] leading-none text-white">
                La moda es tuya.
            </h2>

            {/* Botón "Empieza gratis" */}
            <Link
                href="/register"
                className="absolute left-[27.91cqw] top-[50cqw] flex h-[10.92cqw] w-[42.48cqw] items-center justify-center rounded-[9.71cqw] bg-[#ffdf50] shadow-[-0.49cqw_1.46cqw_0.97cqw_0_rgba(0,0,0,0.33)] transition hover:brightness-95"
            >
                <span className="font-family-reggae-one text-[2.67cqw] text-black">
                    Empieza gratis
                </span>
            </Link>

            {/* Logo "CloGo" */}
            <span className="absolute left-1/2 top-[76.21cqw] -translate-x-1/2 whitespace-nowrap font-family-lostar text-[5.83cqw] leading-none text-[#ffd000]">
                CloGo
            </span>

            {/* Eslogan */}
            <p className="absolute left-1/2 top-[88.59cqw] -translate-x-1/2 whitespace-nowrap text-center font-family-erode-variable text-[3.88cqw] tracking-[0.39cqw] text-white">
                Tu armario reinventado
            </p>
        </section>
    );
}
