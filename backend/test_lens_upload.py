from app.services.lens import GoogleLensSearch


IMAGE_PATH = "uploads/verification.jpg"


lens = GoogleLensSearch()

print("\nUploading image to SerpApi...")

result = lens.search_uploaded_image(IMAGE_PATH)

print("\nImage ID:")
print(result["image_id"])

matches = result["visual_matches"]

print(f"\nFound {len(matches)} visual matches.\n")

for match in matches[:5]:
    print("=" * 70)

    print("Position:", match.get("position"))
    print("Title:", match.get("title"))
    print("Source:", match.get("source"))
    print("Link:", match.get("link"))
    print("Image:", match.get("image"))
    print("Exact Match:", match.get("exact_matches"))