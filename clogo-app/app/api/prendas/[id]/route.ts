import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// PUT: Para ACTUALIZAR una prenda
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Esperamos a que Next.js desempaque los parámetros de la URL
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    const body = await request.json();
    const { categoria, color_principal, estado } = body;

    const prendaActualizada = await prisma.prenda.update({
      where: { id: id },
      data: {
        categoria,
        color_principal,
        estado, 
      },
    });

    return NextResponse.json(prendaActualizada, { status: 200 });
  } catch (error) {
    console.error("Error actualizando prenda:", error);
    return NextResponse.json({ error: "No se pudo actualizar la prenda" }, { status: 500 });
  }
}

// DELETE: Para BORRAR una prenda del clóset
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.outfitPrenda.deleteMany({ where: { prendaId: id } });
    await prisma.prenda.delete({ where: { id } });

    return NextResponse.json({ mensaje: "Prenda eliminada exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error eliminando prenda:", error);
    return NextResponse.json({ error: "No se pudo eliminar la prenda" }, { status: 500 });
  }
}