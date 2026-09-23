# FaceVerify

### AI-Powered Face Verification Analysis & Blockchain Evidence Platform

FaceVerify is an AI-powered verification platform that combines **face detection, facial embeddings, reverse image search, similarity analysis, and blockchain-based evidence integrity** into a single workflow.

The system analyzes an uploaded image, detects a face using InsightFace, searches for visually similar public images through Google Lens via SerpApi, compares detected faces using cosine similarity, generates structured verification evidence, and records a cryptographic hash of that evidence on a blockchain.

> **Important:** FaceVerify provides investigative signals and evidence integrity. Face similarity and reverse-image matches do **not** independently establish or verify a person's identity.

---

## ✨ Features

- 🧠 **AI Face Detection**
  - Uses InsightFace for face detection and embedding generation.
  - Generates 512-dimensional facial embeddings.
  - Selects the largest detected face for analysis.

- 🔎 **Reverse Image Search**
  - Uploads the submitted image to SerpApi.
  - Uses Google Lens visual matching to discover potentially related public images.

- 📊 **Face Similarity Analysis**
  - Extracts face embeddings from candidate images.
  - Calculates cosine similarity between the submitted face and candidate faces.
  - Ranks successfully analyzed candidates.

- 🔗 **Blockchain Evidence Integrity**
  - Generates structured verification evidence.
  - Canonicalizes the evidence JSON.
  - Creates a SHA-256 cryptographic hash.
  - Records the hash on a Solidity smart contract.

- ⚡ **FastAPI Backend**
  - REST API for image verification.
  - File validation and upload handling.
  - Modular service architecture.

- 💻 **Next.js Frontend**
  - Modern verification interface.
  - Image upload and validation.
  - Candidate result visualization.
  - Similarity scores and source links.
  - Blockchain transaction information.

- 🛡️ **Privacy-Conscious Architecture**
  - Raw face embeddings are not stored on-chain.
  - Only the evidence hash is recorded on the blockchain.
  - API secrets are excluded from version control.
  - Runtime candidate images are excluded from Git.

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │    Next.js Frontend  │
                         │                     │
                         │ Image Upload / UI   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    FastAPI Backend  │
                         └──────────┬──────────┘
                                    │
                   ┌────────────────┼────────────────┐
                   │                │                │
                   ▼                ▼                ▼
          ┌────────────────┐ ┌──────────────┐ ┌───────────────┐
          │   InsightFace  │ │  Google Lens │ │   Candidate   │
          │ Face Detection │ │ SerpApi      │ │   Downloading │
          │ + Embeddings   │ │              │ │               │
          └───────┬────────┘ └──────┬───────┘ └───────┬───────┘
                  │                 │                  │
                  └─────────────────┼──────────────────┘
                                    ▼
                         ┌─────────────────────┐
                         │ Cosine Similarity   │
                         │ Candidate Ranking   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Evidence Generator  │
                         │                     │
                         │ SHA-256 Hash        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Solidity Contract   │
                         │ VerificationRegistry│
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Transaction Hash    │
                         │ Evidence Integrity  │
                         └─────────────────────┘
