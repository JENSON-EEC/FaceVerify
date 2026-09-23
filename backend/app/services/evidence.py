import hashlib
import json
from datetime import datetime, timezone


def create_evidence(
    filename: str,
    face_result: dict,
    reverse_search: dict,
) -> dict:

    evidence = {
        "version": "1.0",
        "timestamp": datetime.now(
            timezone.utc
        ).isoformat(),

        "filename": filename,

        "face": {
            "detected": face_result["detected"],
            "detection_score": face_result["detection_score"],
            "embedding_dimensions": (
                face_result["embedding_dimensions"]
            ),
        },

        "reverse_search": {
            "provider": reverse_search["provider"],
            "image_id": reverse_search["image_id"],
            "match_count": reverse_search["match_count"],
            "attempted": reverse_search["attempted"],
            "successful": reverse_search["successful"],
            "matches": reverse_search["matches"],
        },
    }

    return evidence


def canonicalize_evidence(evidence: dict) -> str:

    return json.dumps(
        evidence,
        sort_keys=True,
        separators=(",", ":"),
        ensure_ascii=False,
    )


def hash_evidence(evidence: dict) -> str:

    canonical_json = canonicalize_evidence(
        evidence
    )

    evidence_hash = hashlib.sha256(
        canonical_json.encode("utf-8")
    ).hexdigest()

    return evidence_hash