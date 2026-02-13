
import { StepType } from '@/lib/types';

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
        <div className="bg-white/80 rounded-2xl border border-black/10 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-black">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/5 text-black">▶️</span>
                <span className="font-display">Run Workflow</span>
            </h2>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="input-text"
                        className="block text-sm font-medium text-black/60 mb-2"
                    >
                        Input Text
                    </label>
                    <textarea
                        id="input-text"
                        className="w-full h-40 p-3 rounded-xl border border-black/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20 resize-none placeholder:text-black/40"
                        placeholder="Paste the text you want to process here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isRunning}
                    />
                    <div className="flex justify-between mt-1 text-xs text-black/50">
                        <span>{inputText.length} chars</span>
                        <span>Min 10 chars</span>
                    </div>
                </div>

                {error && (
                    <div className="p-3 rounded-md bg-white text-black text-sm border border-black/20 animate-in fade-in slide-in-from-top-1">
                        ⚠️ {error}
                    </div>
                )}

                <button
                    onClick={onRun}
                    disabled={isRunDisabled}
                    className={`
            w-full py-3 px-4 rounded-lg font-medium text-white transition-all transform active:scale-[0.98]
            ${isRunDisabled
                            ? 'bg-black/20 text-black/50 cursor-not-allowed opacity-50'
                            : 'bg-black hover:bg-black/80 shadow-lg'
                        }
          `}
                >
                    {isRunning ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing Step {currentStepIndex + 1}/{selectedSteps.length}...
                        </span>
                    ) : (
                        'Run Workflow'
                    )}
                </button>
            </div>
        </div>
    );
}
