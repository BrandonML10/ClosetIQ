from rembg import remove, new_session


_session = new_session("u2netp")


def remove_background(image_bytes: bytes) -> bytes:
    """Devuelve PNG con canal alpha; el fondo queda transparente."""
    return remove(image_bytes, session=_session)
