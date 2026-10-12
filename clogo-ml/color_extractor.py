import numpy as np
from PIL import Image
from sklearn.cluster import KMeans
import io


def extract_colors(image_bytes: bytes, n_colors: int = 5) -> list[str]:
    image = Image.open(io.BytesIO(image_bytes))
    image = image.resize((150, 150))

    if image.mode == "RGBA":
        arr = np.array(image)
        mask = arr[..., 3] > 128
        pixels = arr[mask][:, :3]

       
        if len(pixels) < n_colors * 4:
            pixels = np.array(image.convert("RGB")).reshape(-1, 3)
    else:
        pixels = np.array(image.convert("RGB")).reshape(-1, 3)

    actual_clusters = min(n_colors, len(pixels))
    if actual_clusters < 2:
        return ["#888888"] * n_colors

    kmeans = KMeans(n_clusters=actual_clusters, random_state=42, n_init=10)
    kmeans.fit(pixels)

    colors = []
    for center in kmeans.cluster_centers_:
        r, g, b = [int(x) for x in center]
        colors.append(f"#{r:02x}{g:02x}{b:02x}")

    # Asegurar siempre n_colors elementos.
    while len(colors) < n_colors:
        colors.append(colors[-1])

    return colors
