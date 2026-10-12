from rembg import remove, new_session

# Sesión global con el modelo u2netp (más liviano que u2net, ~5MB vs ~170MB).
# La primera ejecución descarga el modelo a ~/.u2net/.
_session = new_session("u2netp")


def remove_background(image_bytes: bytes) -> bytes:
    """Devuelve PNG con canal alpha; el fondo queda transparente."""
    return remove(image_bytes, session=_session)
