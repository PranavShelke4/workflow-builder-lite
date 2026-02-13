'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { RunResult, StepOutput, STEP_TYPE_INFO } from '@/lib/types';
import { getLocalHistory, saveLocalHistory } from '@/lib/localHistory';

export const dynamic = 'force-dynamic';

const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function WorkflowDetailPage() {
  const params = useParams();
  const runId = useMemo(() => (Array.isArray(params?.id) ? params.id[0] : params?.id), [params]);
  const [run, setRun] = useState<RunResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!runId) return;

    const loadRun = async () => {
      setIsLoading(true);
      try {
        const local = getLocalHistory();
        const localMatch = local.find((item) => item.id === runId) || null;
        if (localMatch) {
          setRun(localMatch);
        }

        const res = await fetch('/api/history?limit=20');
        const data = await res.json();
        if (data.history) {
          saveLocalHistory(data.history);
        }
        const match = data.history?.find((item: RunResult) => item.id === runId) || localMatch;
        setRun(match || null);
      } catch (_) {
        const localFallback = getLocalHistory().find((item) => item.id === runId) || null;
        setRun(localFallback);
      } finally {
        setIsLoading(false);
      }
    };

    loadRun();
  }, [runId]);

  if (isLoading) {
    return (
      <div className="relative">
        <section className="bg-white/80 rounded-3xl border border-black/10 p-10 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Run Details</p>
          <h1 className="font-display text-3xl md:text-4xl text-black mt-3">Loading run...</h1>
          <p className="text-sm text-black/70 mt-3">Fetching the workflow run details.</p>
        </section>
      </div>
    );
  }

  if (!run) {
    return (
      <div className="relative">
        <section className="bg-white/80 rounded-3xl border border-black/10 p-10 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Run Details</p>
          <h1 className="font-display text-3xl md:text-4xl text-black mt-3">Run not found</h1>
          <p className="text-sm text-black/70 mt-3">
            This run may have expired or the history was cleared. Try selecting another run.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/workflows"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-2 text-xs font-semibold text-black/60 transition hover:border-black/30 hover:text-black"
            >
              Back to History
            </Link>
            <Link
              href="/workflows/new"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black/80"
            >
              Create New
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative">
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Run Details</p>
            <h1 className="font-display text-3xl md:text-4xl text-black mt-2">{run.workflowName}</h1>
            <p className="text-sm text-black/70 mt-3">{formatDate(run.createdAt)}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/workflows"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-2 text-xs font-semibold text-black/60 transition hover:border-black/30 hover:text-black"
            >
              Back to History
            </Link>
            <Link
              href="/workflows/new"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black/80"
            >
              Create New
            </Link>
          </div>
        </div>
      </section>

      <div className="mb-8 rounded-3xl border border-black/10 p-6 bg-white/80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-3xl bg-white p-2 rounded-xl shadow-sm">
              {run.status === 'success' ? '✅' : '❌'}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-black">{run.status}</div>
              <div className="text-sm text-black/70">
                {run.stepOutputs.length} steps • {formatDuration(run.totalDurationMs)}
              </div>
            </div>
          </div>
          {run.error && <div className="text-sm text-black">{run.error}</div>}
        </div>
      </div>

      <section className="bg-white/80 rounded-3xl border border-black/10 p-6 md:p-8 shadow-sm backdrop-blur mb-10">
        <div className="text-xs font-bold text-black/60 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black/30" /> Input Text
        </div>
        <div className="p-5 bg-white border border-black/10 rounded-2xl text-sm text-black/80 whitespace-pre-wrap font-mono leading-relaxed shadow-inner">
          {run.inputText}
        </div>
      </section>

      <section className="space-y-5">
        <div className="text-xs font-bold text-black/60 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black/60" /> Execution Steps
        </div>
        {run.stepOutputs.map((stepOutput: StepOutput) => (
          <div
            key={stepOutput.stepId}
            className="border border-black/10 rounded-3xl overflow-hidden bg-white/90 shadow-sm"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-white/70 border-b border-black/10">
              <div className="flex items-center gap-3">
                <span className="text-lg bg-white p-1 rounded-md border border-black/10 shadow-sm">
                  {STEP_TYPE_INFO[stepOutput.stepType]?.icon}
                </span>
                <span className="font-semibold text-sm text-black">{stepOutput.stepLabel}</span>
              </div>
              <span className="text-[10px] font-bold text-black/50 font-mono bg-white px-2 py-1 rounded-md border border-black/10">
                {formatDuration(stepOutput.durationMs)}
              </span>
            </div>
            <div className="p-6 text-sm text-black/80 font-mono whitespace-pre-wrap bg-white leading-relaxed">
              {stepOutput.output}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
