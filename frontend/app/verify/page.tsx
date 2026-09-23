"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function copyToClipboard(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }

  function handleFile(selectedFile: File | undefined) {
    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("Maximum file size is 10MB.");
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setError(null);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    handleFile(droppedFile);
  }

  async function handleAnalyze() {
    if (!file) return;

    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/api/verify",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Verification failed."
        );
      }

      console.log("FaceVerify result:", data);

      setResult(data);
    } catch (err) {
      console.error("Verification error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while verifying the image."
      );
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5">
              <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
            </div>

            <span className="text-sm font-semibold">
              FaceVerify
            </span>
          </Link>

          <div className="flex items-center gap-6">

            <Link
              href="/"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Home
            </Link>

            <span className="text-sm text-white">
              Verify
            </span>

          </div>
        </div>
      </nav>

      {/* Main */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Verification workspace
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Verify an image
          </h1>

          <p className="mt-5 text-sm leading-6 text-zinc-500 sm:text-base">
            Upload an image to detect a face, discover matching public
            sources, compare facial similarity, and generate verifiable
            evidence.
          </p>

        </div>

        {/* Upload card */}
        <div className="mx-auto mt-12 max-w-3xl">

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">

            {/* Card header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">

              <div>
                <p className="text-xs text-zinc-600">
                  STEP 01
                </p>

                <p className="mt-1 text-sm font-medium text-zinc-300">
                  Upload source image
                </p>
              </div>

              <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-zinc-500">
                JPG · PNG · WEBP
              </div>

            </div>

            {/* Dropzone */}
            <div className="p-6">

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex min-h-[360px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed transition ${
                  dragging
                    ? "border-white bg-white/[0.06]"
                    : "border-white/10 bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.025]"
                }`}
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(event) =>
                    handleFile(event.target.files?.[0])
                  }
                />

                {!file ? (
                  <>
                    {/* Upload icon */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">

                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        className="text-zinc-400"
                      >
                        <path d="M12 16V4" />
                        <path d="M8 8l4-4 4 4" />
                        <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
                      </svg>

                    </div>

                    <p className="mt-6 text-sm text-zinc-300">
                      Drop your image here
                    </p>

                    <p className="mt-2 text-xs text-zinc-600">
                      or click to browse your files
                    </p>

                    <p className="mt-6 text-[10px] text-zinc-700">
                      Maximum file size: 10MB
                    </p>
                  </>
                ) : (
                  <>
                    {/* Selected file */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5">

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-emerald-400"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>

                    </div>

                    <p className="mt-6 max-w-sm truncate text-sm text-white">
                      {file.name}
                    </p>

                    <p className="mt-2 text-xs text-zinc-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setFile(null);
                        setResult(null);
                        setError(null);
                      }}
                      className="mt-6 rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400 transition hover:bg-white/5 hover:text-white"
                    >
                      Choose another image
                    </button>
                  </>
                )}

              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs text-zinc-500">
                  Your image will be analyzed by the verification pipeline.
                </p>

                <p className="mt-1 text-[10px] text-zinc-700">
                  No biometric data is written directly to the blockchain.
                </p>

              </div>

              <button
                type="button"
                disabled={!file || analyzing}
                onClick={handleAnalyze}
                className={`h-11 rounded-full px-6 text-sm font-medium transition ${
                  file && !analyzing
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "cursor-not-allowed bg-white/10 text-zinc-600"
                }`}
              >
                {analyzing
                  ? "Analyzing..."
                  : "Analyze Image →"}
              </button>

            </div>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-red-500/20 bg-red-500/5 p-5">

            <p className="text-sm font-medium text-red-400">
              Verification failed
            </p>

            <p className="mt-2 text-xs leading-5 text-red-300/70">
              {error}
            </p>

          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

            {/* Result header */}
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-emerald-400">
                  VERIFICATION COMPLETE
                </p>

                <p className="mt-1 text-sm text-zinc-200">
                  Analysis completed successfully.
                </p>
              </div>

              <div className="h-2 w-2 rounded-full bg-emerald-400" />

            </div>

            {/* Result cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {/* Face */}
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">

                <p className="text-xs text-zinc-600">
                  FACE DETECTION
                </p>

                <p className="mt-2 text-sm text-zinc-200">
                  {result.face?.detected
                    ? "Face detected"
                    : "No face detected"}
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Embedding:{" "}
                  {result.face?.embedding_dimensions ?? "—"} dimensions
                </p>

                {result.face?.detection_score !== undefined && (
                  <p className="mt-1 text-xs text-zinc-600">
                    Detection score:{" "}
                    {Number(
                      result.face.detection_score
                    ).toFixed(4)}
                  </p>
                )}

              </div>

              {/* Reverse search */}
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">

                <p className="text-xs text-zinc-600">
                  REVERSE SEARCH
                </p>

                <p className="mt-2 text-sm text-zinc-200">
                  {result.reverse_search?.match_count ?? 0} matches
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Successfully analyzed:{" "}
                  {result.reverse_search?.successful ?? 0}
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Attempted:{" "}
                  {result.reverse_search?.attempted ?? 0}
                </p>

              </div>

              {/* Evidence */}
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">

                <p className="text-xs text-zinc-600">
                  EVIDENCE HASH
                </p>

                <p className="mt-2 break-all font-mono text-[10px] leading-5 text-zinc-300">
                  {result.evidence?.hash ?? "—"}
                </p>

                {result.evidence?.hash && (
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(result.evidence.hash, "evidence")
                    }
                    className="mt-3 rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-zinc-500 transition hover:border-white/20 hover:text-white"
                  >
                    {copied === "evidence" ? "Copied ✓" : "Copy hash"}
                  </button>
                )}

                <p className="mt-2 text-[10px] text-zinc-600">
                  Algorithm: SHA-256
                </p>

              </div>

              {/* Blockchain */}
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">

                <p className="text-xs text-zinc-600">
                  BLOCKCHAIN
                </p>

                <p className="mt-2 text-sm text-emerald-400">
                  Recorded
                </p>

                <p className="mt-2 break-all font-mono text-[10px] leading-5 text-zinc-300">
                  {result.blockchain?.transaction_hash ?? "—"}
                </p>

                {result.blockchain?.transaction_hash && (
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        result.blockchain.transaction_hash,
                        "transaction",
                      )
                    }
                    className="mt-3 rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-zinc-500 transition hover:border-white/20 hover:text-white"
                  >
                    {copied === "transaction" ? "Copied ✓" : "Copy transaction"}
                  </button>
                )}

                <p className="mt-2 text-[10px] text-zinc-600">
                  Block #
                  {result.blockchain?.block_number ?? "—"}
                </p>

                <p className="mt-1 break-all font-mono text-[10px] text-zinc-700">
                  Contract:{" "}
                  {result.blockchain?.contract_address ?? "—"}
                </p>

              </div>

            </div>

            {/* Evidence note */}
            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-zinc-600">WHAT THE RESULT MEANS</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Reverse-image results identify public sources that may be visually
                related to the uploaded image. Cosine similarity measures the
                distance between detected face embeddings; it is not an identity
                probability or proof of identity.
              </p>
            </div>

            {/* Candidate matches */}
            {result.reverse_search?.matches?.length > 0 && (
              <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-zinc-600">
                      FACE SIMILARITY RESULTS
                    </p>

                    <p className="mt-1 text-xs text-zinc-700">
                      Potential matching public sources · not identity confirmation
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-zinc-600">
                    {result.reverse_search.matches.length} analyzed
                  </span>

                </div>

                {/* Candidate image grid */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {result.reverse_search.matches.map(
                    (match: any, index: number) => {

                      const similarity =
                        match.similarity !== undefined
                          ? Number(match.similarity)
                          : null;

                      const imageUrl =
                        match.image_url
                          ? `http://127.0.0.1:8000${match.image_url}`
                          : null;

                      return (
                        <div
                          key={index}
                          className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.04]"
                        >

                          {/* Candidate image */}
                          <div className="relative h-52 w-full overflow-hidden bg-zinc-900">

                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={
                                  match.title ||
                                  "Candidate image"
                                }
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-zinc-700">
                                Candidate image unavailable
                              </div>
                            )}

                            {/* Similarity badge */}
                            {similarity !== null && (
                              <div className="absolute right-3 top-3 rounded-full border border-emerald-400/20 bg-black/80 px-3 py-1.5 backdrop-blur">
                                <span className="text-xs font-medium text-emerald-400">
                                  {similarity.toFixed(4)}
                                </span>
                              </div>
                            )}

                          </div>

                          {/* Candidate information */}
                          <div className="p-4">

                            <p className="line-clamp-2 text-sm font-medium leading-5 text-zinc-300">
                              {match.title ||
                                match.source ||
                                `Candidate ${index + 1}`}
                            </p>

                            {match.link && (
                              <a
                                href={match.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 block truncate text-[10px] text-zinc-600 transition hover:text-zinc-300"
                              >
                                Open public source →
                              </a>
                            )}

                            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">

                              <span className="text-[10px] uppercase tracking-wider text-zinc-700">
                                Cosine similarity
                              </span>

                              {similarity !== null ? (
                                <span className="text-xs text-zinc-400">
                                  {similarity.toFixed(4)}
                                </span>
                              ) : (
                                <span className="text-xs text-zinc-700">
                                  —
                                </span>
                              )}

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>
            )}

            {/* No candidate matches */}
            {result.reverse_search?.matches?.length === 0 && (
              <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-6 text-center">

                <p className="text-sm text-zinc-400">
                  No candidate images could be analyzed.
                </p>

                <p className="mt-2 text-xs text-zinc-700">
                  Google Lens did not provide usable candidate images
                  with detectable faces.
                </p>

              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 border-t border-white/5 pt-4">

              <p className="text-[10px] leading-5 text-zinc-600">
                Face similarity and reverse-image matches are investigative
                signals. They do not independently establish or verify a
                person's identity.
              </p>

            </div>

          </div>
        )}

        {/* Pipeline */}
        <div className="mx-auto mt-12 max-w-3xl">

          <div className="rounded-2xl border border-white/10 bg-zinc-950">

            <div className="border-b border-white/10 px-6 py-5">

              <p className="text-xs text-zinc-600">
                VERIFICATION PIPELINE
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                Analysis stages
              </p>

            </div>

            <div className="divide-y divide-white/5">

              {[
                {
                  number: "01",
                  title: "Face Detection",
                  description:
                    "Detect and encode the primary face.",
                  technology: "InsightFace",
                },
                {
                  number: "02",
                  title: "Reverse Search",
                  description:
                    "Discover visually matching public sources.",
                  technology: "Google Lens",
                },
                {
                  number: "03",
                  title: "Face Similarity",
                  description:
                    "Compare facial embeddings.",
                  technology: "Cosine Similarity",
                },
                {
                  number: "04",
                  title: "Evidence Hash",
                  description:
                    "Create a cryptographic evidence fingerprint.",
                  technology: "SHA-256",
                },
                {
                  number: "05",
                  title: "Blockchain Record",
                  description:
                    "Record the evidence hash on-chain.",
                  technology: "Hardhat Local",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex items-center gap-4 px-6 py-5"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[10px] text-zinc-600">
                    {step.number}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm text-zinc-300">
                      {step.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {step.description}
                    </p>

                  </div>

                  <span className="hidden text-[10px] text-zinc-700 sm:block">
                    {step.technology}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}