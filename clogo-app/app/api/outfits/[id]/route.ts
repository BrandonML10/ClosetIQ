import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function DELETE(
  request: Request,
  // 1. Ejecutar la promesa
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // 2. Extraemos el ID esperando a que la promesa se resuelva
    const resolvedParams = await params; 
    const outfitId = parseInt(resolvedParams.id, 10);
    
    if (Number.isNaN(outfitId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // Limpiar relaciones primero para evitar errores de llave foránea en Prisma
    await prisma.calendario.deleteMany({ 
      where: { outfitId } 
    });
    
    await prisma.outfitPrenda.deleteMany({ 
      where: { outfitId } 
    });

    // Eliminar la carpeta madre (El Outfit)
    await prisma.outfit.delete({ 
      where: { id: outfitId } 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando outfit:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al eliminar" },
      { status: 500 }
    );
  }
}