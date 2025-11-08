"use client";

import AgentWorkspace from "./components/AgentWorkspace";

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-slate-900/40 backdrop-blur">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium uppercase tracking-wide text-emerald-300">
              Reel Crater Agent
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Build scroll-stopping reels with an autonomous creative strategist.
            </h1>
            <p className="text-lg text-slate-300 sm:text-xl">
              Drop your brand context and the agent reverse-engineers a high-impact reel concept, beat-by-beat script, production checklist, and distribution plan designed for virality on any short-form platform.
            </p>
          </div>
        </section>
        <AgentWorkspace />
      </div>
    </main>
  );
}
