# Login Funcional con Prisma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conectar los formularios de login y registro a la base de datos PostgreSQL vía Prisma, emitiendo JWT tokens y redirigiendo al usuario tras autenticarse.

**Architecture:** El backend ya tiene el endpoint de registro funcional; se necesita crear el endpoint de login, conectar ambos formularios con estado React y fetch, y persistir el token en localStorage. No se implementa middleware de rutas protegidas en este plan.

**Tech Stack:** Next.js 15 App Router, TypeScript, Prisma (PostgreSQL), bcryptjs, jsonwebtoken, localStorage

---

## File Map

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `.env` | Crear | Variables de entorno DATABASE_URL y JWT_SECRET |
| `app/api/auth/login/route.ts` | Crear | Endpoint POST /api/auth/login |
| `app/login/page.tsx` | Modificar | Formulario con estado, fetch y manejo de errores |
| `app/register/page.tsx` | Modificar | Formulario con estado, fetch y manejo de errores |

---

### Task 1: Crear el archivo .env

**Files:**
- Create: `.env`

- [ ] **Step 1: Crear el archivo .env en la raíz del proyecto**

Crea el archivo `.env` en `C:\CLOGO\clogo-app\.env` con este contenido (reemplaza los valores reales):

```env
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/clogo_db"
JWT_SECRET="clogo-super-secret-jwt-key-2026"
```

> Reemplaza `USUARIO`, `PASSWORD` y `clogo_db` con los datos reales de tu instancia PostgreSQL.

- [ ] **Step 2: Verificar que .env está en .gitignore**

Revisa que `.gitignore` contenga la línea `.env`. Si no está, agrégala para no subir credenciales al repositorio.

- [ ] **Step 3: Reiniciar el servidor de desarrollo**

Si el servidor Next.js (`npm run dev`) está corriendo, detenerlo y volverlo a iniciar para que cargue las variables nuevas.

```bash
# Ctrl+C para detener, luego:
npm run dev
```

---

### Task 2: Crear el endpoint de login

**Files:**
- Create: `app/api/auth/login/route.ts`

- [ ] **Step 1: Crear el archivo del endpoint**

Crea `app/api/auth/login/route.ts` con el siguiente contenido:

```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Correo y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { usuarioId: usuario.id, email: usuario.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      mensaje: "Sesión iniciada exitosamente",
      token: token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Probar el endpoint con curl o Postman**

Con el servidor corriendo, ejecuta:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrongpass"}'
```

Respuesta esperada: `{"error":"Correo o contraseña incorrectos"}` con status 401.

Si no tienes un usuario de prueba, primero registra uno llamando al endpoint de registro:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456","username":"testuser"}'
```

Luego intenta el login con las mismas credenciales. Debe devolver `token` y `usuario`.

- [ ] **Step 3: Commit**

```bash
git add app/api/auth/login/route.ts
git commit -m "feat: agregar endpoint POST /api/auth/login"
```

---

### Task 3: Conectar el formulario de login

**Files:**
- Modify: `app/login/page.tsx`

- [ ] **Step 1: Reemplazar la página de login con la versión conectada**

Reemplaza todo el contenido de `app/login/page.tsx`:

```tsx
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
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      router.push("/onboarding/style");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
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
```

- [ ] **Step 2: Probar el formulario en el navegador**

1. Abre `http://localhost:3000/login`
2. Ingresa un correo que NO existe → debe aparecer el mensaje de error rojo "Correo o contraseña incorrectos"
3. Ingresa las credenciales de un usuario registrado → debe redirigir a `/onboarding/style`
4. Verifica en DevTools > Application > localStorage que existan las claves `token` y `usuario`

- [ ] **Step 3: Commit**

```bash
git add app/login/page.tsx
git commit -m "feat: conectar formulario de login a API con manejo de errores"
```

---

### Task 4: Conectar el formulario de registro

**Files:**
- Modify: `app/register/page.tsx`

- [ ] **Step 1: Reemplazar la página de registro con la versión conectada**

Reemplaza todo el contenido de `app/register/page.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCarousel from "@/components/auth-carousel";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrarse");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      router.push("/onboarding/style");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
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
      <div className="relative w-full h-[50vh] sm:h-[45vh]">
        <AuthCarousel />

        {/* Social login overlay */}
        <div className="absolute bottom-10 right-6 z-20 flex items-center gap-3">
          <span className="font-family-erode-variable text-white text-sm tracking-[0.1em]">
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
            Registrate
          </h1>
          <Link
            href="/login"
            className="font-family-erode-variable text-[#5A4900] text-sm tracking-[0.1em] mt-1 hover:underline"
          >
            ¿Ya tienes cuenta?
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
          {/* Nombre de Usuario */}
          <div>
            <label className="font-family-erode-variable text-black text-sm tracking-[0.1em] mb-1 block">
              Nombre de Usuario
            </label>
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-[50px] bg-white rounded-full pl-12 pr-4 font-family-erode-variable text-base text-black placeholder-[#929292] tracking-[0.1em] outline-none focus:ring-2 focus:ring-[#FFD000]"
              />
            </div>
          </div>

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

          {/* Confirmar Contraseña */}
          <div>
            <label className="font-family-erode-variable text-black text-sm tracking-[0.1em] mb-1 block">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="*******"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full h-[50px] bg-white rounded-full pl-4 pr-12 font-family-erode-variable text-base text-black placeholder-[#929292] tracking-[0.1em] outline-none focus:ring-2 focus:ring-[#FFD000]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF8C00] hover:opacity-70"
                aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirm ? (
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

          {/* Submit button */}
          <div className="flex justify-center mt-4">
            <div className="w-[243px] h-[63px] rounded-full bg-gradient-to-r from-[#F9F023] via-[#D6006E] to-[#8C52FF] p-[2px] shadow-[-2px_6px_4px_0px_rgba(0,0,0,0.33)]">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-full bg-black border-2 border-[#FFD000] text-white rounded-full flex items-center justify-center font-family-reggae-one text-base hover:bg-black/80 transition-all disabled:opacity-60"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Probar el formulario en el navegador**

1. Abre `http://localhost:3000/register`
2. Escribe contraseñas que no coincidan → debe aparecer "Las contraseñas no coinciden"
3. Intenta registrar un correo ya existente → debe aparecer "Este correo ya está registrado"
4. Registra un usuario nuevo con datos válidos → debe redirigir a `/onboarding/style`
5. Verifica en DevTools > Application > localStorage que existan `token` y `usuario`

- [ ] **Step 3: Commit**

```bash
git add app/register/page.tsx
git commit -m "feat: conectar formulario de registro a API con validación y manejo de errores"
```

---

## Resumen de cambios

| Tarea | Archivos | Estado |
|-------|----------|--------|
| Task 1 | `.env` | Requiere datos reales de la BD |
| Task 2 | `app/api/auth/login/route.ts` | Nuevo endpoint |
| Task 3 | `app/login/page.tsx` | Formulario conectado |
| Task 4 | `app/register/page.tsx` | Formulario conectado |
