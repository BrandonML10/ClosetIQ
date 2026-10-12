from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import torch
import io

# Cargar modelo una sola vez al iniciar
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# EL CEREBRO MEJORADO: 
# Clave en inglés (para máxima precisión de la IA) -> Valor en español (para tu BD y filtros)
# Agregar "a photo of..." mejora drásticamente la puntería de CLIP.
CATEGORY_MAP = {
    "a photo of a casual t-shirt": "Playera",
    "a photo of a formal button down shirt": "Camisa",
    "a photo of sweatpants, trackpants or joggers": "Pantalón Deportivo",
    "a photo of formal dress pants": "Pantalón de Vestir",
    "a photo of denim jeans": "Jeans",
    "a photo of casual shorts": "Short",
    "a photo of a dress": "Vestido",
    "a photo of a skirt": "Falda",
    "a photo of a light casual jacket": "Chamarra",
    "a photo of a heavy winter coat": "Abrigo",
    "a photo of a warm winter sweater": "Suéter",
    "a photo of casual sneakers": "Tenis",
    "a photo of formal leather shoes": "Zapatos Formales",
    "a photo of boots": "Botas",
    "a photo of sandals": "Sandalias"
}

# Extraemos solo las frases en inglés para dárselas a la IA
CLIP_PROMPTS = list(CATEGORY_MAP.keys())

def classify_garment(image_bytes: bytes) -> dict:
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # CLIP compara la imagen contra las descripciones largas en inglés
    inputs = processor(
        text=CLIP_PROMPTS,
        images=image,
        return_tensors="pt",
        padding=True
    )
    
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Obtener probabilidades
    probs = outputs.logits_per_image.softmax(dim=1)[0]
    
    # Top 3 predicciones
    top3 = torch.topk(probs, 3)
    results = []
    
    for prob, idx in zip(top3.values, top3.indices):
        # Tomamos la frase en inglés ganadora
        english_prompt = CLIP_PROMPTS[idx]
        # La traducimos al español usando nuestro diccionario
        spanish_category = CATEGORY_MAP[english_prompt]
        
        results.append({
            "category": spanish_category,
            "confidence": round(float(prob), 3)
        })
    
    return {
        "prediction": results[0]["category"],
        "confidence": results[0]["confidence"],
        "top3": results
    }