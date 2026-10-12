"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Tab = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

function IconShirt({ size = 33 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7l4-3h8l4 3-3 3-1-1v12H8V9l-1 1z" />
    </svg>
  );
}

function IconCloset({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <circle cx="9.5" cy="12" r="0.6" fill="black" />
      <circle cx="14.5" cy="12" r="0.6" fill="black" />
    </svg>
  );
}

function IconHome({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function IconCalendar({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  );
}

function IconHanger({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7a2 2 0 1 1 2-2" />
      <path d="M12 7v2l-9 7c-1 0.8-0.5 2 0.7 2h16.6c1.2 0 1.7-1.2 0.7-2L12 9z" />
    </svg>
  );
}

const TABS: Tab[] = [
  { href: "/hoy", label: "Hoy", icon: <IconShirt size={26} /> },
  { href: "/closet", label: "closet", icon: <IconCloset size={28} /> },
  { href: "/inicio", label: "Inicio", icon: <IconHome size={28} /> },
  { href: "/calendario", label: "Calendario", icon: <IconCalendar size={26} /> },
  { href: "/outfits", label: "Outfits", icon: <IconHanger size={26} /> },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");
    if (!token || !usuario) {
      router.replace("/login");
    } else {
      setAutorizado(true);
    }
  }, [router]);

  if (!autorizado) return null;

  return (
    <main className="flex min-h-screen w-full justify-center bg-white">
      <div
        className="relative w-full max-w-[480px] bg-white pb-[100px] min-h-screen"
        style={{ containerType: "inline-size" }}
      >
        {children}

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-black/5 h-[88px] flex items-stretch justify-around px-1 sm:px-2 z-50">
          {TABS.map((tab) => {
            const activo = pathname === tab.href || pathname.startsWith(tab.href + "/");
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center gap-1 min-w-0"
              >
                <div
                  className={`flex items-center justify-center w-[48px] h-[48px] rounded-full ${
                    activo
                      ? "bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.18)]"
                      : ""
                  }`}
                >
                  {tab.icon}
                </div>
                <span className="font-family-erode-variable text-[11px] tracking-[0.06em] text-black truncate max-w-full">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
