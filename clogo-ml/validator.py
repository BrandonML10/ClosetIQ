from PIL import Image
import torch
import io

from classifier import model, processor

# Reusamos el CLIP ya cargado en classifier.py para no duplicar memoria.
# El primer prompt es siempre el de "prenda"; los demás son distractores.
VALIDATION_PROMPTS = [
    "a photo of a piece of clothing",
    "a photo of a person",
    "a photo of food",
    "a photo of an animal",
    "a photo of a vehicle",
    "a photo of a landscape",
    "a photo of a household object",
    "a screenshot of text",
    "a blurry random photo",
]

# Si la probabilidad del prompt de "clothing" no llega a esto, rechazamos.
CLOTHING_THRESHOLD = 0.35


def validate_is_garment(image_bytes: bytes) -> dict:
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    inputs = processor(
        text=VALIDATION_PROMPTS,
        images=image,
        return_tensors="pt",
        padding=True,
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probs = outputs.logits_per_image.softmax(dim=1)[0]
    clothing_prob = float(probs[0])

    return {
        "is_garment": clothing_prob >= CLOTHING_THRESHOLD,
        "clothing_confidence": round(clothing_prob, 3),
        "threshold": CLOTHING_THRESHOLD,
    }
