"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WORKFLOW_TEMPLATES, RunResult } from "@/lib/types";
import { getLocalHistory, saveLocalHistory } from "@/lib/localHistory";
import { Clock, CheckCircle2, XCircle, Layout, Plus, ArrowRight, Activity, Calendar } from 'lucide-react';

const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
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
        <div className="relative min-h-[calc(100vh-80px)]">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-[80px] -z-10 mix-blend-multiply animate-pulse" />

            <section className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Everything you've running
                        </h1>
                        <p className="text-lg text-slate-600 mt-4 max-w-2xl">
                            Track your recent text automation pipelines. Revisit any input or output instantly.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95"
                            onClick={() => setIsModalOpen(true)}
                            type="button"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create New
                        </button>
                    </div>
                </div>
            </section>

            {history.length === 0 ? (
                <div className="bg-white/60 rounded-3xl border border-slate-200/50 p-12 text-center shadow-lg shadow-slate-200/50 backdrop-blur-md">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm">
                        <Activity className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="text-xl font-bold text-slate-900">No workflows yet</div>
                    <p className="text-slate-500 mt-2">Run a workflow to see it here.</p>
                    <button
                        className="mt-6 inline-flex items-center justify-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                        onClick={() => setIsModalOpen(true)}
                        type="button"
                    >
                        Start your first run <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {history.map((run) => (
                        <Link
                            key={run.id}
                            href={`/workflows/${run.id}`}
                            className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 block h-full flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${run.status === 'success'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    {run.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {run.status}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
                                    <Calendar className="w-3 h-3" /> {formatDate(run.createdAt)}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-slate-900 mb-1 truncate">
                                {run.workflowName}
                            </h3>

                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                <span className="flex items-center gap-1">
                                    <Layout className="w-3 h-3" /> {run.stepOutputs.length} Steps
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {formatDuration(run.totalDurationMs)}
                                </span>
                            </div>

                            <div className="mt-auto">
                                <div className="text-xs text-slate-600 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:border-indigo-100 transition-colors line-clamp-3 leading-relaxed">
                                    {run.inputText}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="w-full max-w-4xl rounded-[2rem] border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -z-10" />

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Templates</p>
                                <h2 className="font-display text-3xl font-bold text-slate-900">Pick a starting point</h2>
                            </div>
                            <button
                                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
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
                                    className="group flex flex-col items-start text-left rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all"
                                    onClick={() => handleSelectTemplate(template.name)}
                                    type="button"
                                >
                                    <span className="text-3xl mb-4 p-3 bg-indigo-50 rounded-xl block" role="img" aria-label={template.name}>
                                        {template.icon}
                                    </span>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{template.name}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{template.description}</p>
                                    <span className="mt-auto text-xs font-bold uppercase tracking-wider text-indigo-600 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                        Use template <ArrowRight className="w-3 h-3" />
                                    </span>
                                </button>
                            ))}

                            <button
                                className="group flex flex-col items-start justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-6 hover:bg-white hover:border-indigo-500/50 hover:shadow-lg transition-all"
                                onClick={handleCreateBlank}
                                type="button"
                            >
                                <div>
                                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-2xl text-slate-400 mb-4 group-hover:text-indigo-500 group-hover:border-indigo-200 transition-colors">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">Create Blank</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">Start from scratch and add your own steps.</p>
                                </div>
                                <span className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-600 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                                    Start empty <ArrowRight className="w-3 h-3" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
