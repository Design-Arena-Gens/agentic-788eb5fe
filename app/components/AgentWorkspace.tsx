"use client";

import { useState } from "react";
import type { AgentRequest, AgentResponse } from "@/lib/agent";

type AgentStatus = "idle" | "running" | "error";

const initialForm: AgentRequest = {
  topic: "Launch-ready workout app growth",
  goal: "Triple top-of-funnel signups this month",
  audience: "busy professionals reclaiming their time",
  tone: "bold",
  offer: "14-day results accelerator",
  platform: "Instagram Reels"
};

export default function AgentWorkspace() {
  const [form, setForm] = useState<AgentRequest>(initialForm);
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgentResponse | null>(null);

  const handleChange = (field: keyof AgentRequest, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const runAgent = async () => {
    setStatus("running");
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? "Failed to synthesize strategy.");
      }

      const payload = (await response.json()) as AgentResponse;
      setResult(payload);
      setStatus("idle");
    } catch (agentError) {
      console.error(agentError);
      setError(agentError instanceof Error ? agentError.message : "Unknown failure.");
      setStatus("error");
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <article className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-slate-900/40 backdrop-blur lg:grid-cols-[1fr,1.4fr]">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Agent Control Deck</h2>
            <p className="text-sm text-slate-300">
              Feed the agent your brand signal and campaign intent. It will orchestrate every beat of a high-retention reel tailored to your audience.
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <ControlField
              label="Topic Signal"
              description="What space are you creating in? Tools, offers, signature frameworks, POVs."
              value={form.topic}
              onChange={value => handleChange("topic", value)}
            />
            <ControlField
              label="North Star Goal"
              description="Define the metric or transformation the reel must deliver."
              value={form.goal}
              onChange={value => handleChange("goal", value)}
            />
            <ControlField
              label="Audience Persona"
              description="Who must stop scrolling? Use vivid language to anchor the voice."
              value={form.audience}
              onChange={value => handleChange("audience", value)}
            />
            <SelectField
              label="Energy Mode"
              description="Choose the creative energy you want to transmit."
              value={form.tone}
              onChange={value => handleChange("tone", value)}
              options={[
                { value: "bold", label: "Bold & High-Energy" },
                { value: "educational", label: "Educational Authority" },
                { value: "playful", label: "Playful & Meme-Ready" },
                { value: "chill", label: "Chill & Relatable" },
                { value: "cinematic", label: "Cinematic & Dramatic" }
              ]}
            />
            <ControlField
              label="Offer or Moment"
              description="Program, drop, incentive, or transformation you're spotlighting."
              value={form.offer}
              onChange={value => handleChange("offer", value)}
            />
            <SelectField
              label="Distribution Channel"
              description="Where the reel ships first. The agent adapts the playbook."
              value={form.platform}
              onChange={value => handleChange("platform", value)}
              options={[
                { value: "Instagram Reels", label: "Instagram Reels" },
                { value: "TikTok", label: "TikTok" },
                { value: "YouTube Shorts", label: "YouTube Shorts" },
                { value: "Facebook Reels", label: "Facebook Reels" },
                { value: "LinkedIn Video", label: "LinkedIn Video" }
              ]}
            />
          </div>

          <button
            type="button"
            onClick={runAgent}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:cursor-wait disabled:bg-emerald-700/60 disabled:text-slate-200"
            disabled={status === "running"}
          >
            {status === "running" ? (
              <>
                <span className="h-2 w-2 animate-pulse rounded-full bg-slate-900" />
                Synthesizing Reel Intelligence…
              </>
            ) : (
              <>Run Agent</>
            )}
          </button>
          {error && <p className="text-sm text-rose-400">{error}</p>}
        </div>

        <div className="flex min-h-[26rem] flex-col gap-4">
          {status === "running" && (
            <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-center text-sm text-slate-300">
              Generating your reel blueprint… calibrating hook, visuals, and metric stack.
            </div>
          )}
          {!result && status !== "running" && (
            <div className="flex flex-1 flex-col justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-slate-900/30 p-6 text-sm text-slate-300">
              <p className="text-base font-medium text-slate-200">Output Console</p>
              <p>
                Your blueprint will appear here with hook, beat-by-beat script, production checklist, launch metrics,
                and distribution repurposing stack.
              </p>
            </div>
          )}
          {result && status !== "running" && (
            <div className="flex flex-col gap-4 overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <OutputSection title="Mission Overview">{result.summary}</OutputSection>

              <OutputSection title="Hook">
                <p className="text-lg font-semibold text-emerald-300">{result.hook}</p>
              </OutputSection>

              <OutputSection title="Script Beats">
                <ol className="flex list-decimal flex-col gap-2 pl-6">
                  {result.scriptBeats.map(beat => (
                    <li key={beat.title}>
                      <p className="font-semibold text-slate-100">{beat.title}</p>
                      <p className="text-sm text-slate-300">{beat.content}</p>
                    </li>
                  ))}
                </ol>
              </OutputSection>

              <OutputSection title="Call To Action">
                <p>{result.callToAction}</p>
              </OutputSection>

              <OutputSection title="Caption Draft">
                <p className="text-sm text-slate-300">{result.caption}</p>
              </OutputSection>

              <OutputSection title="Hashtag Stack">
                <div className="flex flex-wrap gap-2">
                  {result.hashtags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-slate-800 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </OutputSection>

              <OutputSection title="Production Checklist">
                <ul className="flex list-disc flex-col gap-2 pl-6 text-sm text-slate-300">
                  {result.productionChecklist.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </OutputSection>

              <OutputSection title="Launch Metrics">
                <ul className="flex list-disc flex-col gap-2 pl-6 text-sm text-slate-300">
                  {result.metricsDashboard.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </OutputSection>

              <OutputSection title="Distribution Plan">
                <ul className="flex list-disc flex-col gap-2 pl-6 text-sm text-slate-300">
                  {result.distributionPlan.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </OutputSection>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

type ControlFieldProps = {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
};

function ControlField({ label, description, value, onChange }: ControlFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <span className="text-xs uppercase tracking-wide text-slate-400">{description}</span>
      <textarea
        value={value}
        onChange={event => onChange(event.target.value)}
        className="min-h-[90px] rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

function SelectField({ label, description, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <span className="text-xs uppercase tracking-wide text-slate-400">{description}</span>
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type OutputSectionProps = {
  title: string;
  children: React.ReactNode;
};

function OutputSection({ title, children }: OutputSectionProps) {
  return (
    <section className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">{title}</h3>
      <div className="text-sm leading-relaxed text-slate-200">{children}</div>
    </section>
  );
}
