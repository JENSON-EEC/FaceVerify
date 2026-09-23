
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.face import FaceEncoder
from app.services.lens import GoogleLensSearch
from app.services.candidate_ranker import CandidateRanker
from app.services.evidence import create_evidence, hash_evidence
from app.services.blockchain import BlockchainService


router = APIRouter(
    prefix="/api",
    tags=["Verification"],
)


UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}


MAX_FILE_SIZE = 10 * 1024 * 1024


# Initialize services once when the API starts.
face_encoder = FaceEncoder()
lens_search = GoogleLensSearch()
candidate_ranker = CandidateRanker()


@router.post("/verify")
async def verify_image(
    file: UploadFile = File(...)
):

    # --------------------------------------------------
    # 1. Validate file type
    # --------------------------------------------------

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=(
                "Only JPG, PNG, and WEBP "
                "images are supported."
            ),
        )

    # --------------------------------------------------
    # 2. Read uploaded file
    # --------------------------------------------------

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Maximum file size is 10MB.",
        )

    # --------------------------------------------------
    # 3. Save image
    # --------------------------------------------------

    extension = ALLOWED_TYPES[file.content_type]

    filename = f"verification{extension}"

    file_path = UPLOAD_DIR / filename

    file_path.write_bytes(contents)

    # --------------------------------------------------
    # 4. Detect face
    # --------------------------------------------------

    try:
        face_result = face_encoder.analyze(
            str(file_path)
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=422,
            detail=str(exc),
        )

    # --------------------------------------------------
    # 5. Google Lens reverse image search
    # --------------------------------------------------

    try:
        lens_result = lens_search.search_uploaded_image(
            str(file_path)
        )

    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Google Lens search failed: {str(exc)}",
        )

    candidates = lens_result.get(
        "visual_matches",
        []
    )

    # --------------------------------------------------
    # 6. Compare candidate faces
    # --------------------------------------------------

    ranked_candidates = {
        "attempted": 0,
        "successful": 0,
        "results": [],
    }

    if candidates:
        ranked_candidates = candidate_ranker.rank_candidates(
            original_image_path=str(file_path),
            candidates=candidates,
            max_attempts=30,
            max_successful=5,
        )

    # --------------------------------------------------
    # 7. Create cryptographic evidence
    # --------------------------------------------------

    evidence = create_evidence(
        filename=filename,

        face_result={
            "detected": True,
            "detection_score": face_result["det_score"],
            "embedding_dimensions": len(
                face_result["embedding"]
            ),
        },

        reverse_search={
            "provider": "Google Lens",
            "image_id": lens_result["image_id"],
            "match_count": len(candidates),
            "attempted": ranked_candidates["attempted"],
            "successful": ranked_candidates["successful"],
            "matches": ranked_candidates["results"],
        },
    )

    # Generate SHA-256 evidence hash
    evidence_hash = hash_evidence(evidence)

    # --------------------------------------------------
    # 8. Record evidence hash on blockchain
    # --------------------------------------------------

    try:
        blockchain = BlockchainService()

        blockchain_result = blockchain.record_evidence(
            evidence_hash
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Blockchain recording failed: {str(exc)}",
        )

    # --------------------------------------------------
    # 9. Return complete verification result
    # --------------------------------------------------

    return {
        "success": True,

        "message": (
            "Image verification analysis "
            "completed successfully."
        ),

        "filename": filename,

        "size": len(contents),

        "content_type": file.content_type,

        "face": {
            "detected": True,

            "detection_score": (
                face_result["det_score"]
            ),

            "bounding_box": (
                face_result["bbox"]
            ),

            "embedding_dimensions": (
                len(face_result["embedding"])
            ),
        },

        "reverse_search": {
            "provider": "Google Lens",

            "image_id": (
                lens_result["image_id"]
            ),

            "match_count": len(candidates),

            "attempted": (
                ranked_candidates["attempted"]
            ),

            "successful": (
                ranked_candidates["successful"]
            ),

            "matches": (
                ranked_candidates["results"]
            ),
        },

        "evidence": {
            "hash_algorithm": "SHA-256",

            "hash": evidence_hash,

            "data": evidence,
        },

        "blockchain": {
            "transaction_hash": (
                blockchain_result["transaction_hash"]
            ),

            "block_number": (
                blockchain_result["block_number"]
            ),

            "contract_address": (
                blockchain_result["contract_address"]
            ),
        },
    }

