from app.services.lens import GoogleLensSearch


lens = GoogleLensSearch()

image_url = (
    "https://www.lifestylesports.com/dw/image/v2/"
    "BCDN_PRD/on/demandware.static/-/Sites-LSS_eCommerce_Master/"
    "default/dwbafe2f64/images/12526430xlarge.jpg?sw=500"
)

matches = lens.search(image_url)

print(f"\nFound {len(matches)} visual matches.\n")

for match in matches[:5]:
    print("Position:", match.get("position"))
    print("Title:", match.get("title"))
    print("Source:", match.get("source"))
    print("Link:", match.get("link"))
    print("Image:", match.get("image"))
    print("Exact match:", match.get("exact_matches"))
    print("-" * 60)