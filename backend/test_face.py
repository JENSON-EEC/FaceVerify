from app.services.face import FaceEncoder


IMAGE_PATH = "uploads/test_face.jpg"

encoder = FaceEncoder()

result = encoder.analyze(IMAGE_PATH)

print("\nFace detected successfully!")
print("Detection score:", result["det_score"])
print("Bounding box:", result["bbox"])
print("Embedding dimensions:", len(result["embedding"]))
print("First 5 embedding values:", result["embedding"][:5])