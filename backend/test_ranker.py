from app.services.lens import GoogleLensSearch
from app.services.candidate_ranker import CandidateRanker


IMAGE_PATH = "uploads/verification.jpg"


lens = GoogleLensSearch()

print("\nSearching Google Lens...")

lens_result = lens.search_uploaded_image(IMAGE_PATH)

candidates = lens_result["visual_matches"]

print(f"Found {len(candidates)} visual matches.")

ranker = CandidateRanker()

print("\nComparing candidate faces...\n")

results = ranker.rank_candidates(
    original_image_path=IMAGE_PATH,
    candidates=candidates,
)

for index, result in enumerate(results, start=1):

    print(f"#{index}")

    print("Title:", result.get("title"))
    print("Source:", result.get("source"))
    print("Similarity:", result.get("similarity_percentage"))

    if result.get("error"):
        print("Error:", result["error"])

    print("-" * 60)