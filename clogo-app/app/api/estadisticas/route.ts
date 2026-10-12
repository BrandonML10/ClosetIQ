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

    // Consulta 1 y 2: Totales absolutos
    const totalPrendas = await prisma.prenda.count({ where: { usuarioId } });
    const totalOutfits = await prisma.outfit.count({ where: { usuarioId } });

    // Traemos las prendas para análisis en memoria (Reportes complejos)
    const prendas = await prisma.prenda.findMany({ where: { usuarioId } });

    // Variables para Consulta 3 (Categorías) y Consulta 4 (Color)
    let tops = 0, bottoms = 0, shoes = 0;
    const conteoColores: Record<string, number> = {};

    const TOP_CATS = ["t-shirt", "shirt", "sweater", "jacket", "coat", "dress", "playera", "camisa", "vestido", "chamarra", "abrigo", "suéter", "sueter"];
    const BOTTOM_CATS = ["pants", "jeans", "skirt", "pantalón deportivo", "pantalon deportivo", "pantalón de vestir", "pantalon de vestir", "short", "falda"];
    const SHOES_CATS = ["shoes", "sneakers", "boots", "tenis", "zapatos formales", "botas", "sandalias"];

    prendas.forEach((p) => {
      const cat = (p.categoria || "").toLowerCase();
      
      // Clasificar para el reporte de distribución
      if (TOP_CATS.includes(cat)) tops++;
      else if (BOTTOM_CATS.includes(cat)) bottoms++;
      else if (SHOES_CATS.includes(cat)) shoes++;

      // Agrupar colores para el reporte de color dominante
      const color = p.color_principal || "#888888";
      conteoColores[color] = (conteoColores[color] || 0) + 1;
    });

    // Encontrar el color más repetido
    let colorFavorito = "#888888";
    let maxRepeticiones = 0;

    for (const [color, cantidad] of Object.entries(conteoColores)) {
      if (cantidad > maxRepeticiones) {
        maxRepeticiones = cantidad;
        colorFavorito = color;
      }
    }

    // Devolvemos el reporte consolidado
    return NextResponse.json({
      totalPrendas,
      totalOutfits,
      distribucion: { tops, bottoms, shoes },
      colorFavorito
    });

  } catch (error) {
    console.error("Error generando estadísticas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar estadísticas" },
      { status: 500 }
    );
  }
}