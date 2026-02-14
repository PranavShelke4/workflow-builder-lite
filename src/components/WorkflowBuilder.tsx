import { StepType, STEP_TYPE_INFO } from '@/lib/types';
import { Wrench, Trash2, Plus, GripVertical, Settings2, Link as LinkIcon, AlertCircle } from 'lucide-react';

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
        <div className="lg:col-span-7 bg-white/80 p-6 md:p-8 rounded-4xl shadow-sm border border-slate-200/60 backdrop-blur transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md shadow-slate-900/20">
                        <Wrench className="w-5 h-5" />
                    </span>
                    <span className="font-display">Workflow Builder</span>
                </h2>
                <button
                    className="text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    onClick={onClear}
                >
                    <Trash2 className="w-3 h-3" />
                    Clear All
                </button>
            </div>

            <div className="relative mb-10 group">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block group-focus-within:text-indigo-600 transition-colors">
                    Workflow Name
                </label>
                <input
                    type="text"
                    className="w-full text-3xl font-bold text-slate-900 placeholder:text-slate-300 pb-2 border-b-2 border-slate-100 focus:border-indigo-600 focus:outline-none transition-all bg-transparent font-display"
                    placeholder="Name your workflow..."
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    maxLength={50}
                />
            </div>

            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Settings2 className="w-3 h-3" /> Pipeline Steps ({selectedSteps.length}/4)
                    </div>
                </div>

                {selectedSteps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-4xl bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300 transition-all group">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-100 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <LinkIcon className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div className="text-slate-900 font-bold text-lg mb-2">Start Building Pipeline</div>
                        <div className="text-sm text-slate-500 max-w-[240px] leading-relaxed">
                            Add steps from below to chain operations together
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-0 space-y-4">
                        {selectedSteps.map((step, index) => (
                            <div key={index} className="relative animate-in slide-in-from-bottom-2 fade-in duration-300">
                                {index > 0 && (
                                    <div className="absolute left-[1.65rem] -top-6 w-0.5 h-6 bg-indigo-100 -z-10" />
                                )}
                                <div className="flex items-center gap-5 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group z-10 relative">
                                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </div>
                                    <div className="text-2xl shrink-0 p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                        {STEP_TYPE_INFO[step].icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-base text-slate-900 mb-0.5">{STEP_TYPE_INFO[step].label}</div>
                                        <div className="text-xs text-slate-500 truncate">{STEP_TYPE_INFO[step].description}</div>
                                    </div>
                                    <button
                                        className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        onClick={() => onRemoveStep(index)}
                                        title="Remove step"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={`transition-all duration-300 ${selectedSteps.length >= 4 ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Plus className="w-3 h-3" /> Add Step
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableStepTypes.map((stepType) => (
                        <button
                            key={stepType}
                            className="group flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all text-slate-600 hover:text-indigo-600"
                            onClick={() => onAddStep(stepType)}
                            disabled={selectedSteps.length >= 4}
                        >
                            <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300 bg-slate-50 rounded-xl p-2 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100">
                                {STEP_TYPE_INFO[stepType].icon}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-center">{STEP_TYPE_INFO[stepType].label}</span>
                        </button>
                    ))}
                </div>
                {selectedSteps.length >= 4 && (
                    <div className="mt-3 text-center text-xs text-amber-600 font-medium flex items-center justify-center gap-1.5 animate-in fade-in">
                        <AlertCircle className="w-3 h-3" />
                         Max steps reached
                    </div>
                )}
            </div>
        </div>
    );
}
