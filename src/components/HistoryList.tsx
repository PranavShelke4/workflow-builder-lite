import { RunResult } from '@/lib/types';

interface HistoryListProps {
    history: RunResult[];
    onRefresh: () => void;
    onSelectRun: (run: RunResult) => void;
}

export default function HistoryList({ history, onRefresh, onSelectRun }: HistoryListProps) {
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
        <div className="bg-white/80 p-6 md:p-8 rounded-3xl shadow-sm border border-black/10 h-fit backdrop-blur">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/5 text-black">📜</span>
                    <span className="font-display">Run History</span>
                </h2>
                <button
                    className="text-xs font-semibold text-black/60 hover:text-black px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors"
                    onClick={onRefresh}
                >
                    Refresh
                </button>
            </div>

            {history.length === 0 ? (
                <div className="py-12 text-center text-black/50 bg-white/60 rounded-2xl border-2 border-dashed border-black/10">
                    <div className="text-3xl mb-3 opacity-30 grayscale">📭</div>
                    <div className="text-sm font-medium">No runs yet</div>
                    <div className="text-xs opacity-60 mt-1">Run a workflow to see it here</div>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {history.map((run) => (
                        <div
                            key={run.id}
                            className="group p-4 bg-white border border-black/10 rounded-2xl hover:border-black/30 hover:shadow-md cursor-pointer transition-all duration-200 relative overflow-hidden"
                            onClick={() => onSelectRun(run)}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-3xl -z-10" />

                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-sm text-black truncate max-w-[150px]">{run.workflowName}</span>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${run.status === 'success'
                                    ? 'bg-white text-black border-black/20'
                                    : 'bg-white text-black border-black/20'
                                    }`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                                    {run.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-[10px] font-medium text-black/50 mb-2.5">
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

                            <div className="text-xs text-black/70 truncate group-hover:text-black font-mono bg-white/70 p-2 rounded-lg border border-black/10 group-hover:border-black/30 transition-colors">
                                {run.inputText.substring(0, 80)}
                                {run.inputText.length > 80 ? '...' : ''}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
