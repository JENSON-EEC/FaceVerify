from app.services.candidate import CandidateDownloader
from app.services.face import FaceEncoder
from app.services.similarity import cosine_similarity


class CandidateRanker:
    def __init__(self):
        self.downloader = CandidateDownloader()
        self.face_encoder = FaceEncoder()

    def rank_candidates(
        self,
        original_image_path: str,
        candidates: list,
        max_attempts: int = 30,
        max_successful: int = 5,
    ):
        original_face = self.face_encoder.analyze(
            original_image_path
        )

        results = []

        attempted = 0
        successful = 0

        for candidate in candidates:

            if attempted >= max_attempts:
                break

            if successful >= max_successful:
                break

            attempted += 1

            try:
                # Download candidate image
                candidate_path = self.downloader.download(
                    candidate
                )

                if not candidate_path:
                    continue

                # Analyze candidate face
                candidate_face = self.face_encoder.analyze(
                    candidate_path
                )

                # Calculate similarity
                similarity = cosine_similarity(
                    original_face["embedding"],
                    candidate_face["embedding"],
                )

                # Get filename
                candidate_filename = candidate_path.split("\\")[-1]

                results.append(
                    {
                        "title": candidate.get("title"),
                        "link": candidate.get("link"),

                        # IMPORTANT
                        "image_url": (
                            f"/candidate-images/"
                            f"{candidate_filename}"
                        ),

                        "similarity": similarity,
                    }
                )

                successful += 1

            except Exception as exc:
                print(
                    f"Skipping candidate: {exc}"
                )

        # Highest similarity first
        results.sort(
            key=lambda item: item["similarity"],
            reverse=True,
        )

        return {
            "attempted": attempted,
            "successful": successful,
            "results": results,
        }