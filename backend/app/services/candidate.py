from pathlib import Path
import requests
import uuid


class CandidateDownloader:

    def __init__(self):
        self.output_dir = Path(
            "uploads/candidates"
        )

        self.output_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

    def download(self, candidate):

        image_url = (
            candidate.get("thumbnail")
            or candidate.get("image")
            or candidate.get("original")
        )

        if not image_url:
            return None

        try:

            response = requests.get(
                image_url,
                timeout=15,
                headers={
                    "User-Agent": (
                        "Mozilla/5.0 "
                        "(Windows NT 10.0; Win64; x64) "
                        "AppleWebKit/537.36 "
                        "(KHTML, like Gecko) "
                        "Chrome/140 Safari/537.36"
                    )
                },
            )

            response.raise_for_status()

            content_type = response.headers.get(
                "content-type",
                ""
            ).lower()

            if not content_type.startswith("image/"):
                print(
                    f"Not an image: {image_url}"
                )
                return None

            extension = ".jpg"

            if "png" in content_type:
                extension = ".png"
            elif "webp" in content_type:
                extension = ".webp"
            elif "jpeg" in content_type:
                extension = ".jpg"

            filename = (
                f"{uuid.uuid4().hex}"
                f"{extension}"
            )

            output_path = (
                self.output_dir / filename
            )

            output_path.write_bytes(
                response.content
            )

            print(
                f"Candidate saved: {output_path}"
            )

            return str(output_path)

        except Exception as exc:

            print(
                f"Candidate download failed: "
                f"{exc}"
            )

            return None