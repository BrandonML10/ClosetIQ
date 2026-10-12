import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idRaw } = await params;
    const id = parseInt(idRaw, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();
    const { estilo_preferido } = body;

    if (estilo_preferido === undefined) {
      return NextResponse.json({ error: "Falta estilo_preferido" }, { status: 400 });
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: { estilo_preferido: String(estilo_preferido) },
      select: { id: true, username: true, email: true, estilo_preferido: true },
    });

    return NextResponse.json(usuarioActualizado, { status: 200 });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
