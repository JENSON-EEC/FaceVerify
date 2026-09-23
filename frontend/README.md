This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


ABOUT THE PROJECT

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
