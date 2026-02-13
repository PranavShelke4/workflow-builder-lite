import { StepType, STEP_TYPE_INFO } from '@/lib/types';

interface WorkflowBuilderProps {
    workflowName: string;
    setWorkflowName: (name: string) => void;
    selectedSteps: StepType[];
    onAddStep: (step: StepType) => void;
    onRemoveStep: (index: number) => void;
    onClear: () => void;
}

export default function WorkflowBuilder({
    workflowName,
    setWorkflowName,
    selectedSteps,
    onAddStep,
    onRemoveStep,
    onClear,
}: WorkflowBuilderProps) {
    const availableStepTypes = Object.values(StepType);

    return (
        <div className="lg:col-span-7 bg-white/80 p-6 md:p-8 rounded-3xl shadow-xl border border-black/10 backdrop-blur">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-black flex items-center gap-3">
                    <span className="p-2 bg-black/5 rounded-lg text-black">🔧</span>
                    <span className="font-display">Workflow Builder</span>
                </h2>
                <button
                    className="text-xs font-semibold text-black/60 hover:text-black hover:bg-black/5 px-3 py-1.5 rounded-lg transition-all"
                    onClick={onClear}
                >
                    Clear All
                </button>
            </div>

            <div className="relative mb-8">
                <label className="text-xs font-bold text-black/60 uppercase tracking-[0.2em] mb-2 block">Workflow Name</label>
                <input
                    type="text"
                    className="w-full text-2xl font-semibold text-black placeholder:text-black/40 pb-2 border-b-2 border-black/10 focus:border-black focus:outline-none transition-colors bg-transparent"
                    placeholder="Name your workflow..."
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    maxLength={50}
                />
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold text-black/60 uppercase tracking-[0.2em]">
                        Pipeline Steps ({selectedSteps.length}/4)
                    </div>
                </div>

                {selectedSteps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-black/10 rounded-2xl bg-white/60">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-3xl">
                            🔗
                        </div>
                        <div className="text-black/60 font-medium mb-1">Build your pipeline</div>
                        <div className="text-xs text-black/50 max-w-[220px]">
                            Add steps below to start processing text
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-0">
                        {selectedSteps.map((step, index) => (
                            <div key={index} className="relative">
                                {index > 0 && (
                                    <div className="absolute left-8 -top-4 w-0.5 h-4 bg-black/10 -z-10" />
                                )}
                                <div className="flex items-center gap-4 p-4 bg-white border border-black/10 rounded-2xl shadow-sm hover:shadow-md hover:border-black/30 transition-all group z-10 relative">
                                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg transition-all">
                                        {index + 1}
                                    </div>
                                    <div className="text-2xl shrink-0 p-2 bg-black/5 rounded-lg">{STEP_TYPE_INFO[step].icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-sm text-black">{STEP_TYPE_INFO[step].label}</div>
                                        <div className="text-xs text-black/60 truncate">{STEP_TYPE_INFO[step].description}</div>
                                    </div>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-full text-black/30 hover:text-black hover:bg-black/5 transition-all"
                                        onClick={() => onRemoveStep(index)}
                                        title="Remove step"
                                    >
                                        ✕
                                    </button>
                                </div>
                                {index < selectedSteps.length - 1 && (
                                    <div className="h-4 ml-8 border-l-2 border-dashed border-black/10" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={`transition-all duration-300 ${selectedSteps.length >= 4 ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                <div className="text-xs font-bold text-black/60 uppercase tracking-[0.2em] mb-4">Add a Step</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableStepTypes.map((stepType) => (
                        <button
                            key={stepType}
                            className="group flex flex-col items-center justify-center p-4 bg-white border border-black/10 rounded-xl hover:border-black/30 hover:shadow-lg hover:-translate-y-0.5 transition-all text-black/60 hover:text-black"
                            onClick={() => onAddStep(stepType)}
                            disabled={selectedSteps.length >= 4}
                        >
                            <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300">{STEP_TYPE_INFO[stepType].icon}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wide">{STEP_TYPE_INFO[stepType].label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
