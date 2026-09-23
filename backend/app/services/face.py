import cv2
import numpy as np
from insightface.app import FaceAnalysis


class FaceEncoder:
    def __init__(self):
        self.app = FaceAnalysis(
            name="buffalo_l",
            providers=["CPUExecutionProvider"],
        )

        self.app.prepare(
            ctx_id=0,
            det_size=(640, 640),
        )

    def analyze(self, image_path: str):
        image = cv2.imread(image_path)

        if image is None:
            raise ValueError(f"Could not read image: {image_path}")

        faces = self.app.get(image)

        if not faces:
            raise ValueError("No face detected in the image.")

        # Select the largest detected face
        face = max(
            faces,
            key=lambda f: (
                (f.bbox[2] - f.bbox[0])
                * (f.bbox[3] - f.bbox[1])
            ),
        )

        embedding = face.embedding.astype(np.float32)

        # Normalize embedding
        norm = np.linalg.norm(embedding)

        if norm == 0:
            raise ValueError("Invalid face embedding.")

        embedding = embedding / norm

        return {
            "embedding": embedding.tolist(),
            "bbox": face.bbox.tolist(),
            "det_score": float(face.det_score),
        }