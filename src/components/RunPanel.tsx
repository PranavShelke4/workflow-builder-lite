
import { StepType } from '@/lib/types';
import { Play, Loader2, AlertCircle } from 'lucide-react';

interface RunPanelProps {
    inputText: string;
    setInputText: (text: string) => void;
    isRunning: boolean;
    selectedSteps: StepType[];
    currentStepIndex: number;
    onRun: () => void;
    error: string | null;
}

export default function RunPanel({
    inputText,
    setInputText,
    isRunning,
    selectedSteps,
    currentStepIndex,
    onRun,
    error,
}: RunPanelProps) {
    const isRunDisabled = isRunning || selectedSteps.length < 2 || inputText.trim().length === 0;

    return (
        <div className="bg-white/80 rounded-[1.5rem] border border-slate-200/60 p-6 md:p-8 shadow-sm backdrop-blur transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100">
                    <Play className="w-5 h-5 ml-0.5" />
                </span>
                <span className="font-display">Run Workflow</span>
            </h2>

            <div className="space-y-6">
                <div>
                    <label
                        htmlFor="input-text"
                        className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3"
                    >
                        Input Text
                    </label>
                    <textarea
                        id="input-text"
                        className="w-full h-48 p-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-400"
                        placeholder="Paste the text you want to process here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isRunning}
                    />
                    <div className="flex justify-between mt-2 text-xs font-medium text-slate-400">
                        <span>{inputText.length} characters</span>
                        <span>Min 10 chars</span>
                    </div>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                <button
                    onClick={onRun}
                    disabled={isRunDisabled}
                    className={`
            w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98]
            flex items-center justify-center gap-2
            ${isRunDisabled
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            : 'bg-slate-900 hover:bg-slate-800 shadow-indigo-500/20 hover:shadow-indigo-500/30'
                        }
          `}
                >
                    {isRunning ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                            <span>Processing Step {currentStepIndex + 1}/{selectedSteps.length}...</span>
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4 fill-current" />
                            Run Workflow
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
