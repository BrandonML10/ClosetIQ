import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioIdRaw = searchParams.get("usuarioId");

    if (!usuarioIdRaw) {
      return NextResponse.json({ error: "Falta usuarioId" }, { status: 400 });
    }

    const usuarioId = parseInt(usuarioIdRaw, 10);

    // 1. AUTO-LIMPIEZA: Buscar outfits fantasma 
    const outfitsVacios = await prisma.outfit.findMany({
      where: {
        usuarioId,
        prendas: { none: {} }
      }
    });

    // Destruir los fantasmas y sus registros en el calendario
    if (outfitsVacios.length > 0) {
      const idsVacios = outfitsVacios.map(o => o.id);
      
      await prisma.calendario.deleteMany({
        where: { outfitId: { in: idsVacios } }
      });
      
      await prisma.outfit.deleteMany({
        where: { id: { in: idsVacios } }
      });
    }

    // 2. Traer los outfits válidos despues de la limpieza
    const outfits = await prisma.outfit.findMany({
      where: { usuarioId },
      include: {
        prendas: {
          include: {
            prenda: {
              select: { imagen_url: true, categoria: true }
            }
          }
        }
      },
      orderBy: { fecha_creacion: "desc" }
    });

    return NextResponse.json(outfits);
  } catch (error) {
    console.error("Error obteniendo outfits:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}