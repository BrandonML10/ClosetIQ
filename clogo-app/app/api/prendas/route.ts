import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import cloudinary from "../../../lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const usuarioId = formData.get("usuarioId") as string;

    if (!usuarioId) {
      return NextResponse.json(
        { error: "Se requiere el ID del usuario" },
        { status: 400 },
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: "Se requiere una imagen" },
        { status: 400 },
      );
    }

    // 1. Buffer de la imagen original.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Mandar al ML para validar + quitar fondo + clasificar.
    const mlFormData = new FormData();
    const blob = new Blob([buffer], { type: file.type });
    mlFormData.append("file", blob, file.name);

    const mlResponse = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      body: mlFormData,
    });

    const mlResult = await mlResponse.json();

    // 3. Si no es una prenda, propagar 422 al cliente.
    if (mlResponse.status === 422 || mlResult?.is_garment === false) {
      return NextResponse.json(
        {
          error: "La imagen no parece una prenda. Toma una foto más clara con la prenda completa visible.",
          is_garment: false,
          clothing_confidence: mlResult?.clothing_confidence,
        },
        { status: 422 },
      );
    }

    if (!mlResponse.ok) {
      return NextResponse.json(
        { error: "Error al analizar la imagen" },
        { status: 502 },
      );
    }

    // 4. Subir a Cloudinary la imagen sin fondo (PNG con transparencia).
    const cleanBuffer = Buffer.from(mlResult.image_no_bg_b64, "base64");

    const cloudinaryResult = (await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "clogo/prendas", format: "png" },
          (error, result) => {
            if (error) reject(error);
            else if (!result) reject(new Error("No result from Cloudinary"));
            else resolve(result);
          },
        )
        .end(cleanBuffer);
    })) as { secure_url: string };

    // 5. Guardar en DB con datos del ML.
    const nuevaPrenda = await prisma.prenda.create({
      data: {
        imagen_url: cloudinaryResult.secure_url,
        categoria: mlResult.classification.prediction,
        color_principal: mlResult.colors[0],
        usuarioId: parseInt(usuarioId),
      },
    });

    return NextResponse.json(
      {
        prenda: nuevaPrenda,
        ml_resultado: {
          colors: mlResult.colors,
          classification: mlResult.classification,
          clothing_confidence: mlResult.clothing_confidence,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creando prenda:", error);
    const detalle =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      {
        error: "Error interno",
        detalle:
          process.env.NODE_ENV === "production" ? undefined : detalle,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get("usuarioId");

    if (!usuarioId) {
      return NextResponse.json(
        { error: "Se requiere el ID del usuario" },
        { status: 400 },
      );
    }

    const prendas = await prisma.prenda.findMany({
      where: {
        usuarioId: parseInt(usuarioId),
      },
      orderBy: {
        fecha_creacion: "desc",
      },
    });

    return NextResponse.json(prendas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener prendas" },
      { status: 500 },
    );
  }
}
