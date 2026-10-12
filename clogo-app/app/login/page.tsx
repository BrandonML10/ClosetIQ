"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCarousel from "@/components/auth-carousel";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Si el usuario ya tiene prendas, saltar onboarding y mandarlo a /hoy.
      try {
        const prendasRes = await fetch(`/api/prendas?usuarioId=${data.usuario.id}`);
        const prendas = await prendasRes.json();
        if (Array.isArray(prendas) && prendas.length > 0) {
          router.push("/hoy");
          return;
        }
      } catch {
        // si falla la consulta, caer al onboarding por defecto
      }
      router.push("/onboarding/style");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Navbar overlay */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-start justify-between px-4 py-6 sm:px-8 sm:py-8 pointer-events-none">
        <button
          className="flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity pointer-events-auto mt-1"
          aria-label="Menu"
        >
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
        </button>
        <span className="text-yellow-300 text-2xl font-family-lostar pointer-events-auto">
          CloGo
        </span>
      </nav>

      {/* Image carousel section */}
      <div className="relative w-full h-[55vh] sm:h-[50vh]">
        <AuthCarousel />

        {/* Social login overlay */}
        <div className="absolute bottom-10 right-6 z-20 flex items-center gap-3">
          <span className="font-family-erode-variable text-white text-sm tracking-[0.1em] drop-shadow-md">
            Continua con
          </span>
          <button
            className="w-13.75 h-13.75 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            aria-label="Continuar con Google"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </button>
          <button
            className="w-13.75 h-13.75 rounded-full bg-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            aria-label="Continuar con Apple"
          >
            <svg width="24" height="30" viewBox="0 0 24 30" fill="white">
              <path d="M20.94 10.06c-.12.09-2.24 1.29-2.24 3.95 0 3.08 2.7 4.17 2.78 4.2-.01.06-.43 1.49-1.43 2.95-.87 1.28-1.78 2.56-3.16 2.56s-1.74-.8-3.33-.8c-1.55 0-2.1.82-3.37.82s-2.14-1.18-3.16-2.63C5.66 19.15 4.5 16.37 4.5 13.73c0-4.24 2.75-6.49 5.46-6.49 1.44 0 2.64.95 3.54.95.86 0 2.21-1.01 3.85-1.01.62 0 2.86.06 4.33 2.17l-.74.71zM16.08 4.62c.63-.75 1.08-1.79 1.08-2.83 0-.14-.01-.29-.04-.41-1.03.04-2.25.69-2.99 1.53-.58.66-1.13 1.7-1.13 2.75 0 .16.03.32.04.37.07.01.18.03.29.03.92 0 2.09-.62 2.75-1.44z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Yellow card */}
      <div className="bg-[#FFDF50] rounded-t-[30px] px-6 sm:px-10 pt-8 pb-10 flex flex-col -mt-6 relative z-10 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <h1 className="font-family-coolvetica text-black text-2xl sm:text-3xl tracking-[0.1em]">
            Inicia sesion
          </h1>
          <Link
            href="/register"
            className="font-family-erode-variable text-[#5A4900] text-sm tracking-[0.1em] mt-1 hover:underline"
          >
            ¿No tienes cuenta?
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-100 border border-red-300 text-red-700 rounded-2xl text-sm font-family-erode-variable">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Correo */}
          <div>
            <label className="font-family-erode-variable text-black text-sm tracking-[0.1em] mb-1 block">
              Correo
            </label>
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full h-[50px] bg-white rounded-full pl-12 pr-4 font-family-erode-variable text-base text-black placeholder-[#929292] tracking-[0.1em] outline-none focus:ring-2 focus:ring-[#FFD000]"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="font-family-erode-variable text-black text-sm tracking-[0.1em] mb-1 block">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                minLength={6}
                required
                className="w-full h-[50px] bg-white rounded-full pl-4 pr-12 font-family-erode-variable text-base text-black placeholder-[#929292] tracking-[0.1em] outline-none focus:ring-2 focus:ring-[#FFD000]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF8C00] hover:opacity-70"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="#"
              className="font-family-erode-variable text-[#5A4900] text-sm tracking-[0.1em] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Submit button */}
          <div className="flex justify-center mt-2">
            <div className="w-[243px] h-[63px] rounded-full bg-gradient-to-r from-[#F9F023] via-[#D6006E] to-[#8C52FF] p-[2px] shadow-[-2px_6px_4px_0px_rgba(0,0,0,0.33)]">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-full bg-black border-2 border-[#FFD000] text-white rounded-full flex items-center justify-center font-family-reggae-one text-base hover:bg-black/80 transition-all disabled:opacity-60"
              >
                {loading ? "Entrando..." : "Continuar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
