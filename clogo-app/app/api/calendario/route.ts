import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// 1. POST: Para agendar un outfit en una fecha específica
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fecha, ocasion, usuarioId, outfitId } = body;

    // Validación de que vengan los campos obligatorios del schema
    if (!fecha || !usuarioId || !outfitId) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // Convertir el text a un objeto de Fecha real
    const fechaConvertida = new Date(fecha);

    const nuevoEvento = await prisma.calendario.create({
      data: {
        fecha: fechaConvertida,
        ocasion: ocasion, // Es opcional 
        usuarioId: usuarioId,
        outfitId: outfitId,
      },
      // Traer el outfit
      include: {
        outfit: true 
      }
    });

    return NextResponse.json(nuevoEvento, { status: 201 });
  } catch (error) {
    console.error("Error agendando outfit:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// 2. GET: Para obtener la agenda completa del usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get("usuarioId");

    if (!usuarioId) {
      return NextResponse.json({ error: "Se requiere el ID del usuario" }, { status: 400 });
    }

    const agenda = await prisma.calendario.findMany({
      where: { usuarioId: parseInt(usuarioId) },
      // Traemos toda la ramificación Evento -> Outfit -> Prendas 
      include: {
        outfit: {
          include: {
            prendas: {
              include: { prenda: true }
            }
          }
        }
      },
      // Ordenamos del evento más próximo al más lejano en el tiempo
      orderBy: { fecha: 'asc' } 
    });

    return NextResponse.json(agenda);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener agenda" }, { status: 500 });
  }
}