import base64

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse

from color_extractor import extract_colors
from classifier import classify_garment
from validator import validate_is_garment
from bg_remover import remove_background

app = FastAPI()


@app.post("/analyze")
async def analyze_garment(file: UploadFile = File(...)):
    image_bytes = await file.read()

    # 1. Validar que la imagen sea efectivamente una prenda.
    validation = validate_is_garment(image_bytes)
    if not validation["is_garment"]:
        return JSONResponse(
            status_code=422,
            content={
                "is_garment": False,
                "clothing_confidence": validation["clothing_confidence"],
                "error": "La imagen no parece una prenda",
            },
        )

    # 2. Quitar fondo (PNG con alpha).
    bg_removed_bytes = remove_background(image_bytes)

    # 3. Extraer colores ignorando los píxeles transparentes.
    colors = extract_colors(bg_removed_bytes)

    # 4. Clasificar (usamos la imagen original; CLIP tolera el fondo
    #    y a veces lo aprovecha como contexto).
    classification = classify_garment(image_bytes)

    # 5. Devolver la imagen sin fondo en base64 para que el backend
    #    Next la suba a Cloudinary.
    image_b64 = base64.b64encode(bg_removed_bytes).decode("ascii")

    return {
        "is_garment": True,
        "clothing_confidence": validation["clothing_confidence"],
        "colors": colors,
        "classification": classification,
        "image_no_bg_b64": image_b64,
    }


@app.get("/health")
def health():
    return {"status": "ok"}
