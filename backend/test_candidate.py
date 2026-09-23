from app.services.candidate import download_candidate_image


IMAGE_URL = (
    "https://media.licdn.com/dms/image/v2/"
    "D4D03AQF-VIDJ52rCRw/profile-displayphoto-shrink_200_200/"
    "profile-displayphoto-shrink_200_200/0/1667808495028"
    "?e=2147483647&v=beta&t=0OoFi9qvtpsrTOFgcgfeCakl1hvTaoERT8bS4EKIjG8"
)


path = download_candidate_image(
    IMAGE_URL,
    1,
)

print("\nCandidate image downloaded successfully!")
print("Saved to:", path)