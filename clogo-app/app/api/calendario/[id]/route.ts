import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// PUT: Para modificar un evento (cambiar fecha, ocasión o el outfit elegido)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    const body = await request.json();
    const { fecha, ocasion, outfitId } = body;

    // Preparar los datos a actualizar
    // Si mandan una fecha nueva se convierte a objeto Date si no, indefinido.
    const datosActualizados: any = {};
    if (fecha) datosActualizados.fecha = new Date(fecha);
    if (ocasion !== undefined) datosActualizados.ocasion = ocasion;
    if (outfitId) datosActualizados.outfitId = outfitId;

    const eventoActualizado = await prisma.calendario.update({
      where: { id: id },
      data: datosActualizados,
      include: {
        outfit: true
      }
    });

    return NextResponse.json(eventoActualizado, { status: 200 });
  } catch (error) {
    console.error("Error actualizando evento en calendario:", error);
    return NextResponse.json({ error: "No se pudo actualizar el evento" }, { status: 500 });
  }
}

// DELETE: Para cancelar un evento del calendario
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.calendario.delete({
      where: { id: id }
    });

    return NextResponse.json({ mensaje: "Evento cancelado exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error cancelando evento:", error);
    return NextResponse.json({ error: "No se pudo cancelar el evento" }, { status: 500 });
  }
}