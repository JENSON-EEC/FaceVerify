"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 -z-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5">
              <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
            </div>

            <span className="text-sm font-semibold tracking-tight">
              FaceVerify
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#technology"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Technology
            </a>

            <a
              href="#security"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Security
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              GitHub ↗
            </a>

            <Link
              href="/verify"
              className="rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Start Verification
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 md:hidden"
          >
            Menu
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#how-it-works" className="text-sm text-zinc-400">
                How it works
              </a>

              <a href="#technology" className="text-sm text-zinc-400">
                Technology
              </a>

              <a href="#security" className="text-sm text-zinc-400">
                Security
              </a>

              <Link
                href="/verify"
                className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Start Verification
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Status badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            AI verification infrastructure
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-8xl">
            Verify.
            <br />
            <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Prove.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            AI-powered image verification with facial similarity analysis,
            reverse-image discovery, and cryptographically verifiable
            evidence.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/verify"
              className="group flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Start Verification
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#how-it-works"
              className="flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              Explore the technology
            </a>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black">
            {/* Window header */}
            <div className="flex h-12 items-center border-b border-white/10 px-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>

              <div className="mx-auto rounded-md border border-white/10 bg-white/[0.03] px-12 py-1 text-[10px] text-zinc-600">
                faceverify.local
              </div>

              <div className="w-10" />
            </div>

            {/* Dashboard preview */}
            <div className="grid min-h-[380px] grid-cols-1 lg:grid-cols-3">
              {/* Upload panel */}
              <div className="border-b border-white/10 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-zinc-500">
                      VERIFICATION
                    </p>
                    <h2 className="mt-1 text-lg font-medium">
                      Image analysis
                    </h2>
                  </div>

                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[10px] text-emerald-400">
                    READY
                  </div>
                </div>

                <div className="mt-8 flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02]">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-zinc-400"
                    >
                      <path d="M12 16V4" />
                      <path d="M8 8l4-4 4 4" />
                      <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
                    </svg>
                  </div>

                  <p className="text-sm text-zinc-300">
                    Upload an image to verify
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    JPG, PNG or WEBP · Max 10MB
                  </p>
                </div>
              </div>

              {/* Pipeline */}
              <div className="p-8">
                <p className="text-xs font-medium text-zinc-500">
                  PIPELINE
                </p>

                <div className="mt-6 space-y-6">
                  {[
                    ["01", "Face Detection", "InsightFace"],
                    ["02", "Web Discovery", "Google Lens"],
                    ["03", "Similarity", "Cosine Score"],
                    ["04", "Evidence", "SHA-256"],
                    ["05", "Blockchain", "Polygon"],
                  ].map(([number, title, technology], index) => (
                    <div key={number} className="flex items-start gap-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-[9px] text-zinc-500">
                        {number}
                      </div>

                      <div>
                        <p className="text-xs text-zinc-300">{title}</p>
                        <p className="mt-1 text-[10px] text-zinc-600">
                          {technology}
                        </p>
                      </div>

                      {index < 4 && (
                        <div className="ml-auto mt-2 h-1.5 w-1.5 rounded-full bg-zinc-700" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative z-10 border-t border-white/10"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              From image to verifiable evidence.
            </h2>

            <p className="mt-5 text-sm leading-6 text-zinc-500 sm:text-base">
              FaceVerify combines computer vision, visual search, similarity
              analysis, and blockchain evidence into a single verification
              pipeline.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Detect",
                description:
                  "Detect a face and generate a normalized facial embedding using an AI vision model.",
                tech: "InsightFace · ONNX Runtime",
              },
              {
                number: "02",
                title: "Discover",
                description:
                  "Perform a runtime reverse-image search to discover visually related public image sources.",
                tech: "Google Lens · SerpApi",
              },
              {
                number: "03",
                title: "Verify",
                description:
                  "Compare facial embeddings and create tamper-evident cryptographic evidence.",
                tech: "Cosine Similarity · SHA-256",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="bg-black p-8 transition hover:bg-zinc-950"
              >
                <span className="text-xs text-zinc-700">{item.number}</span>

                <h3 className="mt-8 text-xl font-medium">{item.title}</h3>

                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  {item.description}
                </p>

                <p className="mt-8 text-xs text-zinc-700">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section
        id="technology"
        className="relative z-10 border-t border-white/10"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
                Technology
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Built as a real verification pipeline.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                Every stage is designed as an independent service so the
                platform can evolve from a local development environment into
                a production-ready architecture.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {[
                "Next.js",
                "FastAPI",
                "InsightFace",
                "ONNX Runtime",
                "SerpApi",
                "Solidity",
                "Web3.py",
                "Polygon",
              ].map((technology) => (
                <div
                  key={technology}
                  className="bg-black px-5 py-6 text-sm text-zinc-400 transition hover:bg-zinc-950 hover:text-white"
                >
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section
        id="security"
        className="relative z-10 border-t border-white/10"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-3">
              <div>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10">
                  <span className="text-sm">#</span>
                </div>

                <h3 className="text-lg font-medium">Cryptographic evidence</h3>
              </div>

              <div className="lg:col-span-2">
                <p className="text-sm leading-7 text-zinc-500">
                  Verification evidence can be hashed using SHA-256 and
                  recorded through a Solidity smart contract. The blockchain
                  stores the evidence fingerprint rather than raw biometric
                  data.
                </p>

                <div className="mt-6 rounded-lg border border-white/10 bg-black p-4 font-mono text-xs text-zinc-600">
                  SHA256(evidence.json)
                  <br />
                  <span className="text-zinc-400">
                    → 0x7f3a...91bc
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Ready to verify?
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-500">
            Upload an image and run the complete FaceVerify analysis pipeline.
          </p>

          <Link
            href="/verify"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Start Verification →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 FaceVerify</p>

          <div className="flex gap-6">
            <span>AI Verification</span>
            <span>Blockchain Evidence</span>
            <span>Built with Next.js</span>
          </div>
        </div>
      </footer>
    </main>
  );
}