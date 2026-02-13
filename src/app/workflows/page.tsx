"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WORKFLOW_TEMPLATES, RunResult } from "@/lib/types";
import { getLocalHistory, saveLocalHistory } from "@/lib/localHistory";

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

export default function WorkflowsPage() {
    const router = useRouter();
    const [history, setHistory] = useState<RunResult[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const local = getLocalHistory();
        if (local.length > 0) {
            setHistory(local);
        }

        const loadHistory = async () => {
            try {
                const res = await fetch("/api/history?limit=20");
                const data = await res.json();
                if (data.history) {
                    setHistory(data.history);
                    saveLocalHistory(data.history);
                }
            } catch (_) {
                if (local.length === 0) {
                    setHistory([]);
                }
            }
        };

        loadHistory();
    }, []);

    const handleSelectTemplate = (templateName: string) => {
        setIsModalOpen(false);
        router.push(`/workflows/new?template=${encodeURIComponent(templateName)}`);
    };

    const handleCreateBlank = () => {
        setIsModalOpen(false);
        router.push("/workflows/new?mode=blank");
    };

    return (
        <div className="relative">
            <section className="mb-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Workflows</p>
                        <h1 className="font-display text-3xl md:text-4xl text-black mt-2">Past runs and outputs</h1>
                        <p className="text-sm text-black/70 mt-3 max-w-2xl">
                            Browse the latest workflow runs. Click any item to open the full input and every step output.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black/80"
                            onClick={() => setIsModalOpen(true)}
                            type="button"
                        >
                            Create New
                        </button>
                    </div>
                </div>
            </section>

            {history.length === 0 ? (
                <div className="bg-white/80 rounded-3xl border border-black/10 p-10 text-center text-black/60 shadow-sm backdrop-blur">
                    <div className="text-4xl mb-4 opacity-40">📭</div>
                    <div className="text-lg font-semibold text-black">No workflows yet</div>
                    <p className="text-sm mt-2">Run a workflow to see it here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {history.map((run) => (
                        <Link
                            key={run.id}
                            href={`/workflows/${run.id}`}
                            className="group rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-black/30 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-semibold text-black truncate max-w-[70%]">
                                    {run.workflowName}
                                </span>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${run.status === 'success'
                                            ? 'bg-white text-black border-black/20'
                                            : 'bg-white text-black border-black/20'
                                        }`}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-black/60"
                                    />
                                    {run.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-medium text-black/60 mb-3">
                                <span className="flex items-center gap-1">
                                    <span className="text-xs">🪜</span> {run.stepOutputs.length}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-black/20" />
                                <span className="flex items-center gap-1">
                                    <span className="text-xs">⏱️</span> {formatDuration(run.totalDurationMs)}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-black/20" />
                                <span>{formatDate(run.createdAt)}</span>
                            </div>
                            <div className="text-xs text-black/70 font-mono bg-white/70 p-3 rounded-2xl border border-black/10 group-hover:border-black/30 transition-colors">
                                {run.inputText.substring(0, 140)}
                                {run.inputText.length > 140 ? '...' : ''}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white/90 p-8 shadow-2xl backdrop-blur">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Templates</p>
                                <h2 className="font-display text-2xl text-black mt-2">Pick a starting point</h2>
                            </div>
                            <button
                                className="h-10 w-10 rounded-full border border-black/10 text-black/60 hover:text-black hover:border-black/30 transition"
                                onClick={() => setIsModalOpen(false)}
                                type="button"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {WORKFLOW_TEMPLATES.map((template) => (
                                <button
                                    key={template.name}
                                    className="group flex flex-col items-start text-left rounded-2xl border border-black/10 bg-white/80 p-5 backdrop-blur transition hover:border-black/30 hover:shadow-lg"
                                    onClick={() => handleSelectTemplate(template.name)}
                                    type="button"
                                >
                                    <span className="text-3xl mb-4 block" role="img" aria-label={template.name}>
                                        {template.icon}
                                    </span>
                                    <h3 className="font-semibold text-lg text-black mb-2">{template.name}</h3>
                                    <p className="text-sm text-black/70">{template.description}</p>
                                    <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Use template
                                    </span>
                                </button>
                            ))}

                            <button
                                className="group flex flex-col items-start justify-between rounded-2xl border border-black/10 bg-white/80 p-5 backdrop-blur transition hover:border-black/30 hover:shadow-lg"
                                onClick={handleCreateBlank}
                                type="button"
                            >
                                <div>
                                    <span className="text-3xl mb-4 block">＋</span>
                                    <h3 className="font-semibold text-lg text-black mb-2">Create New Blank</h3>
                                    <p className="text-sm text-black/70">Start from scratch and add your own steps.</p>
                                </div>
                                <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Blank workflow
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
