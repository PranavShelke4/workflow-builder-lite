'use client';

import { StepOutput, STEP_TYPE_INFO, RunResult } from '@/lib/types';

interface HistoryDetailModalProps {
    run: RunResult;
    onClose: () => void;
}

export default function HistoryDetailModal({ run, onClose }: HistoryDetailModalProps) {
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

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
            <div
                className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-black/10 max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 slide-in-from-bottom-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-black/10 px-8 py-5 flex items-center justify-between z-10 shrink-0">
                    <div>
                        <div className="text-xs font-bold text-black/60 uppercase tracking-[0.2em] mb-1">Run Details</div>
                        <div className="font-semibold text-xl text-black font-display">{run.workflowName}</div>
                    </div>
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-black/60 hover:bg-black/10 hover:text-black transition-all"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    {/* Status Card */}
                    <div className="flex items-center justify-between p-6 rounded-2xl border border-black/10 bg-white/80 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl bg-white p-2 rounded-xl shadow-sm">{run.status === 'success' ? '✅' : '❌'}</div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold uppercase tracking-wide text-black">{run.status}</span>
                                <span className="text-xs text-black/60 font-medium">{formatDate(run.createdAt)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-end">
                                <span className="text-2xl font-bold text-black">{run.stepOutputs.length}</span>
                                <span className="text-xs font-bold text-black/50 uppercase tracking-wider">Steps</span>
                            </div>
                            <div className="w-px h-10 bg-black/5" />
                            <div className="flex flex-col items-end">
                                <span className="text-2xl font-bold text-black">{formatDuration(run.totalDurationMs)}</span>
                                <span className="text-xs font-bold text-black/50 uppercase tracking-wider">Duration</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        {/* Input Section */}
                        <div>
                            <div className="text-xs font-bold text-black/60 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-black/30" /> Input Text
                            </div>
                            <div className="p-5 bg-white/80 border border-black/10 rounded-2xl text-sm text-black/80 whitespace-pre-wrap font-mono leading-relaxed shadow-inner">
                                {run.inputText}
                            </div>
                        </div>

                        {/* Output Section */}
                        <div>
                            <div className="text-xs font-bold text-black/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-black/60" /> Execution Steps
                            </div>
                            <div className="flex flex-col gap-4">
                                {run.stepOutputs.map((stepOutput: StepOutput) => (
                                    <div key={stepOutput.stepId} className="border border-black/10 rounded-2xl overflow-hidden shadow-sm">
                                        <div className="flex items-center justify-between px-5 py-3 bg-white/70 border-b border-black/10">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg bg-white p-1 rounded-md border border-black/10 shadow-sm">{STEP_TYPE_INFO[stepOutput.stepType]?.icon}</span>
                                                <span className="font-bold text-sm text-black">{stepOutput.stepLabel}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-black/50 font-mono bg-white px-2 py-1 rounded-md border border-black/10">
                                                {formatDuration(stepOutput.durationMs)}
                                            </span>
                                        </div>
                                        <div className="p-5 text-sm text-black/80 font-mono whitespace-pre-wrap bg-white leading-relaxed">
                                            {stepOutput.output}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
