from app.services.verification import VerificationService


ORIGINAL_IMAGE = "uploads/verification.jpg"

CANDIDATE_IMAGE_URL = (
    "https://media.licdn.com/dms/image/v2/"
    "D4D03AQF-VIDJ52rCRw/profile-displayphoto-shrink_200_200/"
    "profile-displayphoto-shrink_200_200/0/1667808495028"
    "?e=2147483647&v=beta&t=0OoFi9qvtpsrTOFgcgfeCakl1hvTaoERT8bS4EKIjG8"
)


service = VerificationService()

result = service.compare(
    ORIGINAL_IMAGE,
    CANDIDATE_IMAGE_URL,
    1,
)

print("\nFace comparison completed!")
print("Similarity:", result["similarity"])
print(
    "Similarity percentage:",
    f"{result['similarity'] * 100:.2f}%"
)
print(
    "Original detection:",
    result["original_detection_score"]
)
print(
    "Candidate detection:",
    result["candidate_detection_score"]
)
print(
    "Candidate saved:",
    result["candidate_image"]
)