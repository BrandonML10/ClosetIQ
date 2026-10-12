import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import {
  FaltanCategoriasError,
  seleccionarOutfit,
} from "../../../../lib/armonia";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioIdRaw = searchParams.get("usuarioId");
    const regenerar = searchParams.get("regenerar") === "true";
    const excluirIdsRaw = searchParams.get("excluirIds");
    
    // Capturamos las variables dinámicas del frontend
    const ocasionRaw = searchParams.get("ocasion")?.toLowerCase() || "";
    const tempRaw = searchParams.get("temp");
    const temperatura = tempRaw ? parseFloat(tempRaw) : null;

    if (!usuarioIdRaw) {
      return NextResponse.json(
        { error: "Se requiere el ID del usuario" },
        { status: 400 },
      );
    }

    const usuarioId = parseInt(usuarioIdRaw, 10);
    if (Number.isNaN(usuarioId)) {
      return NextResponse.json({ error: "usuarioId inválido" }, { status: 400 });
    }

    const excluirIds = excluirIdsRaw
      ? excluirIdsRaw.split(",").map(Number).filter((n) => !Number.isNaN(n))
      : [];

    const ahora = new Date();
    const inicioHoy = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      0, 0, 0, 0,
    );
    const inicioMañana = new Date(inicioHoy);
    inicioMañana.setDate(inicioHoy.getDate() + 1);

    if (regenerar) {
      const eventoHoy = await prisma.calendario.findFirst({
        where: { usuarioId, fecha: { gte: inicioHoy, lt: inicioMañana } },
      });
      if (eventoHoy) {
        await prisma.calendario.delete({ where: { id: eventoHoy.id } });
      }
    } else {
      const calendarioHoy = await prisma.calendario.findFirst({
        where: { usuarioId, fecha: { gte: inicioHoy, lt: inicioMañana } },
        include: {
          outfit: {
            include: { prendas: { include: { prenda: true } } },
          },
        },
      });

      if (calendarioHoy && calendarioHoy.outfit) {
        const prendasOutfit = calendarioHoy.outfit.prendas.map((op) => op.prenda);
        try {
          const prendasConSlot = seleccionarOutfit(prendasOutfit);
          return NextResponse.json({
            outfit: {
              id: calendarioHoy.outfit.id,
              nombre: calendarioHoy.outfit.nombre,
              fecha_creacion: calendarioHoy.outfit.fecha_creacion,
              prendas: prendasConSlot,
            },
            paleta: prendasConSlot.map((p) => p.color_principal ?? "#888888"),
          });
        } catch (e) {
          if (!(e instanceof FaltanCategoriasError)) throw e;
        }
      }
    }

    // Traemos TODA la ropa del usuario
    let prendas = await prisma.prenda.findMany({ where: { usuarioId } });

    // Motor de Reglas de Filtrado
    prendas = prendas.filter((p) => {
      const cat = p.categoria?.toLowerCase() || "";
      let mantenerPrenda = true;

      // REGLAS DE OCASIÓN
      if (ocasionRaw) {
        if (ocasionRaw.includes("boda") || ocasionRaw.includes("lujos") || ocasionRaw.includes("formal") || ocasionRaw.includes("elegante")) {
          // Bilingüe, sin la palabra "pants" para evitar choques con el modelo en inglés
          const prohibidasFormal = ["sudadera", "short", "bermuda", "chanclas", "deportivo", "playera", "sweatpants", "t-shirt", "hoodie", "sneakers"];
          if (prohibidasFormal.some(prohibida => cat.includes(prohibida))) mantenerPrenda = false;
        }
      }

      // REGLAS DE CLIMA AUTOMÁTICAS
      if (temperatura !== null) {
        if (temperatura >= 24) { 
          // Calor: Fuera abrigos
          const prohibidasCalor = ["abrigo", "chamarra", "suéter", "sueter", "bufanda", "botas", "coat", "jacket", "sweater", "boots"];
          if (prohibidasCalor.some(prohibida => cat.includes(prohibida))) mantenerPrenda = false;
        } 
        else if (temperatura <= 17) { 
          // Frío: Fuera ropa ligera
          const prohibidasFrio = ["short", "bermuda", "tirantes", "sandalia", "chancla", "falda corta", "sandals"];
          if (prohibidasFrio.some(prohibida => cat.includes(prohibida))) mantenerPrenda = false;
        }
      }

      return mantenerPrenda;
    });

    let seleccionadas;
    try {
      seleccionadas = seleccionarOutfit(prendas, { excluirIds });
    } catch (e) {
      if (e instanceof FaltanCategoriasError) {
        return NextResponse.json(
          { error: "No tienes ropa suficiente en tu clóset para este clima u ocasión.", falta: e.falta },
          { status: 422 },
        );
      }
      throw e;
    }

    const dd = String(inicioHoy.getDate()).padStart(2, "0");
    const mm = String(inicioHoy.getMonth() + 1).padStart(2, "0");
    const nombre = `Outfit del ${dd}/${mm}`;

    const nuevoOutfit = await prisma.outfit.create({
      data: {
        nombre,
        usuarioId,
        prendas: {
          create: seleccionadas.map((p) => ({
            prenda: { connect: { id: p.id } },
          })),
        },
      },
    });

    await prisma.calendario.create({
      data: { fecha: inicioHoy, usuarioId, outfitId: nuevoOutfit.id },
    });

    return NextResponse.json({
      outfit: {
        id: nuevoOutfit.id,
        nombre: nuevoOutfit.nombre,
        fecha_creacion: nuevoOutfit.fecha_creacion,
        prendas: seleccionadas,
      },
      paleta: seleccionadas.map((p) => p.color_principal ?? "#888888"),
    });
  } catch (error) {
    console.error("Error obteniendo outfit sugerido:", error);
    const detalle = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        detalle: process.env.NODE_ENV === "production" ? undefined : detalle,
      },
      { status: 500 },
    );
  }
}