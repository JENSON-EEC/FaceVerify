import numpy as np


def cosine_similarity(
    embedding_a: list[float],
    embedding_b: list[float],
) -> float:

    a = np.asarray(embedding_a, dtype=np.float32)
    b = np.asarray(embedding_b, dtype=np.float32)

    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)

    if norm_a == 0 or norm_b == 0:
        raise ValueError("Cannot compare zero-length embeddings.")

    similarity = np.dot(a, b) / (norm_a * norm_b)

    return float(similarity)