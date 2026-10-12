FROM python:3.10-slim

WORKDIR /app

# 1. Instalar herramientas del sistema (libgl1 y libglib2.0-0 son OBLIGATORIOS para procesar imágenes con rembg/OpenCV en Linux)
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 2. dependencias de Python
RUN pip install --no-cache-dir \
    fastapi \
    uvicorn \
    pillow \
    transformers \
    torch \
    python-multipart \
    scikit-learn \
    rembg \
    onnxruntime \
    numpy \
    opencv-python-headless

# 3. Copiar el código del modelo
COPY . .

# 4. Exponer puerto y encender
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]