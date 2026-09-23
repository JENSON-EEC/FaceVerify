from app.services.face import FaceEncoder
from app.services.candidate import download_candidate_image
from app.services.similarity import cosine_similarity


class VerificationService:

    def __init__(self):
        self.face_encoder = FaceEncoder()

    def compare(
        self,
        original_image_path: str,
        candidate_image_url: str,
        candidate_position: int,
    ):

        # Analyze original image
        original = self.face_encoder.analyze(
            original_image_path
        )

        # Download candidate
        candidate_path = download_candidate_image(
            candidate_image_url,
            candidate_position,
        )

        # Analyze candidate image
        candidate = self.face_encoder.analyze(
            candidate_path
        )

        # Compare embeddings
        similarity = cosine_similarity(
            original["embedding"],
            candidate["embedding"],
        )

        return {
            "similarity": similarity,
            "original_detection_score": original["det_score"],
            "candidate_detection_score": candidate["det_score"],
            "candidate_image": candidate_path,
        }