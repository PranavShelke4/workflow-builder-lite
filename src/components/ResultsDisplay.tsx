import { StepOutput, STEP_TYPE_INFO, RunResult } from '@/lib/types';

interface ResultsDisplayProps {
    result: RunResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
    const formatDuration = (ms: number) => {
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(1)}s`;
    };

    return (
        <section className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl border border-black/10 relative overflow-hidden backdrop-blur">

                <h2 className="text-2xl font-semibold text-black mb-8 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-black text-white text-lg shadow-lg">📊</span>
                    <span className="font-display">Results</span>
                </h2>

                <div className="grid grid-cols-3 gap-6 mb-10 p-6 rounded-2xl border border-black/10 bg-white/80">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-4xl mb-2 drop-shadow-sm">{result.status === 'success' ? '✅' : '❌'}</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-black">{result.status}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-l border-black/10">
                        <div className="text-3xl font-bold text-black mb-1">{result.stepOutputs.length}</div>
                        <div className="text-xs font-bold text-black/50 uppercase tracking-wider">Steps Run</div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-l border-black/10">
                        <div className="text-3xl font-bold text-black mb-1">{formatDuration(result.totalDurationMs)}</div>
                        <div className="text-xs font-bold text-black/50 uppercase tracking-wider">Total Time</div>
                    </div>
                </div>

                {result.error && (
                    <div className="mb-10 p-5 bg-white border border-black/20 rounded-xl flex items-center gap-4 text-black text-sm font-medium shadow-sm">
                        <span className="text-2xl">⚠️</span> {result.error}
                    </div>
                )}

                <div className="flex flex-col gap-8 relative">
                    <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-black/10 -z-10" />

                    {result.stepOutputs.map((stepOutput: StepOutput, index: number) => (
                        <div
                            key={stepOutput.stepId}
                            className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-black/10">
                                <div className="flex items-center gap-4">
                                    <span className="w-8 h-8 rounded-xl bg-white border border-black/10 text-black flex items-center justify-center text-xs font-bold shadow-sm">
                                        {stepOutput.order}
                                    </span>
                                    <span className="text-xl bg-white p-1 rounded-md shadow-sm border border-black/10">{STEP_TYPE_INFO[stepOutput.stepType]?.icon}</span>
                                    <span className="font-bold text-black">{stepOutput.stepLabel}</span>
                                </div>
                                <span className="px-3 py-1 rounded-lg bg-white border border-black/10 text-xs font-mono text-black/60 font-medium">
                                    {formatDuration(stepOutput.durationMs)}
                                </span>
                            </div>
                            <div className="p-6 text-sm text-black/80 leading-relaxed font-mono whitespace-pre-wrap bg-white selection:bg-black/10">
                                {stepOutput.output}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
