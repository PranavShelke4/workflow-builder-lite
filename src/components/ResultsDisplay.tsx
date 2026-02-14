import { StepOutput, STEP_TYPE_INFO, RunResult } from '@/lib/types';
import { CheckCircle2, XCircle, Clock, Layers, BarChart3 } from 'lucide-react';

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
            <div className="bg-white/90 p-8 md:p-10 rounded-4xl shadow-2xl shadow-indigo-500/10 border border-slate-200/50 relative overflow-hidden backdrop-blur-xl">
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10" />

                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white shadow-lg">
                        <BarChart3 className="w-6 h-6" />
                    </span>
                    <span className="font-display">Execution Results</span>
                </h2>

                <div className="grid grid-cols-3 gap-6 mb-10 p-2 lg:p-6 rounded-3xl border border-slate-100 bg-white/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center py-2">
                        <div className={`mb-2 p-2 rounded-full ${result.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                             {result.status === 'success' ? <CheckCircle2 className="w-8 h-8"/> : <XCircle className="w-8 h-8"/>}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{result.status}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-l border-slate-200 py-2">
                        <div className="text-3xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                            {result.stepOutputs.length}
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Layers className="w-3 h-3" /> Steps Run
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-l border-slate-200 py-2">
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                            {formatDuration(result.totalDurationMs)}
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                             <Clock className="w-3 h-3" /> Total Time
                        </div>
                    </div>
                </div>

                {result.error && (
                    <div className="mb-10 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 text-red-700 text-sm font-medium shadow-sm">
                        <XCircle className="w-6 h-6 shrink-0" />
                        <span>{result.error}</span>
                    </div>
                )}

                <div className="flex flex-col gap-8 relative">
                    <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-100 -z-10" />

                    {result.stepOutputs.map((stepOutput: StepOutput, index: number) => (
                        <div
                            key={stepOutput.stepId}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-100 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 backdrop-blur-sm border-b border-slate-100">
                                <div className="flex items-center gap-4">
                                    <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shadow-sm z-10">
                                        {stepOutput.order}
                                    </span>
                                    <span className="text-xl bg-white p-1.5 rounded-lg shadow-sm border border-slate-100">
                                        {STEP_TYPE_INFO[stepOutput.stepType]?.icon}
                                    </span>
                                    <span className="font-bold text-slate-900">{stepOutput.stepLabel}</span>
                                </div>
                                <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-500 font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {formatDuration(stepOutput.durationMs)}
                                </span>
                            </div>
                            <div className="p-6 text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap bg-white selection:bg-indigo-100">
                                {stepOutput.output}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
