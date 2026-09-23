import os
import requests
from dotenv import load_dotenv

load_dotenv()

SERPAPI_SEARCH_URL = "https://serpapi.com/search.json"
SERPAPI_IMAGE_URL = "https://serpapi.com/image"


class GoogleLensSearch:

    def __init__(self):
        self.api_key = os.getenv("SERPAPI_KEY")

        if not self.api_key:
            raise RuntimeError(
                "SERPAPI_KEY is missing from the .env file."
            )

    def upload_image(self, image_path: str):

        with open(image_path, "rb") as image_file:

            files = {
                "image": image_file
            }

            data = {
                "api_key": self.api_key
            }

            response = requests.post(
                SERPAPI_IMAGE_URL,
                files=files,
                data=data,
                timeout=30,
            )

        response.raise_for_status()

        result = response.json()

        if "error" in result:
            raise RuntimeError(
                f"SerpApi image upload failed: "
                f"{result['error']}"
            )

        image_id = result.get("image_id")

        if not image_id:
            raise RuntimeError(
                "SerpApi did not return an image_id."
            )

        return image_id

    def search_uploaded_image(self, image_path: str):

        image_id = self.upload_image(image_path)

        params = {
            "engine": "google_lens",
            "type": "visual_matches",
            "image_id": image_id,
            "hl": "en",
            "api_key": self.api_key,
        }

        response = requests.get(
            SERPAPI_SEARCH_URL,
            params=params,
            timeout=60,
        )

        response.raise_for_status()

        data = response.json()

        # SerpApi can return an error when Lens has
        # no visual matches. Treat this as an empty result.
        if "error" in data:

            error_message = data["error"]

            if (
                "hasn't returned any results"
                in error_message.lower()
            ):
                return {
                    "image_id": image_id,
                    "visual_matches": [],
                    "message": (
                        "Google Lens returned "
                        "no visual matches."
                    ),
                }

            raise RuntimeError(
                f"Google Lens search failed: "
                f"{error_message}"
            )

        return {
            "image_id": image_id,
            "visual_matches": data.get(
                "visual_matches",
                []
            ),
            "message": "Google Lens search completed.",
        }