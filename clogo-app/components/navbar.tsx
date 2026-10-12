export default function Navbar() {
    return (
        <nav className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-[29.13cqw]">
            {/* Menu Hamburguesa (Izquierda) */}
            <button
                className="pointer-events-auto absolute left-[4.37cqw] top-[13.35cqw] flex h-[9.71cqw] w-[9.71cqw] flex-col items-center justify-center gap-[1.21cqw] transition-opacity hover:opacity-80"
                aria-label="Menú"
            >
                <span className="block h-[0.73cqw] w-[6.31cqw] rounded bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"></span>
                <span className="block h-[0.73cqw] w-[6.31cqw] rounded bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"></span>
                <span className="block h-[0.73cqw] w-[6.31cqw] rounded bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"></span>
            </button>

            {/* Logo "CloGo" (Esquina Superior Derecha) */}
            <span className="absolute left-[79.37cqw] top-[14.08cqw] font-family-lostar text-[5.83cqw] leading-none text-[#ffd000] [text-shadow:0px_2px_4px_rgba(0,0,0,0.5)]">
                CloGo
            </span>
        </nav>
    );
}
