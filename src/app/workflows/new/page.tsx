'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StepType, RunResult, WORKFLOW_TEMPLATES, STEP_TYPE_INFO } from '@/lib/types';
import { upsertLocalRun } from '@/lib/localHistory';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import RunPanel from '@/components/RunPanel';
import ResultsDisplay from '@/components/ResultsDisplay';

export default function NewWorkflowPage() {
    const searchParams = useSearchParams();
    const templateName = searchParams.get('template');
    const mode = searchParams.get('mode');
    const [workflowName, setWorkflowName] = useState('');
    const [selectedSteps, setSelectedSteps] = useState<StepType[]>([]);
    const [inputText, setInputText] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [runResult, setRunResult] = useState<RunResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (mode === 'blank') {
            setSelectedSteps([]);
            setWorkflowName('');
            setRunResult(null);
            setError(null);
            return;
        }

        if (!templateName) return;
        const template = WORKFLOW_TEMPLATES.find((item) => item.name === templateName);
        if (!template) return;
        setSelectedSteps([...template.steps]);
        setWorkflowName(template.name);
        setError(null);
    }, [mode, templateName]);

    const handleAddStep = (stepType: StepType) => {
        if (selectedSteps.length >= 4) return;
        setSelectedSteps((prev) => [...prev, stepType]);
        setError(null);
    };

    const handleRemoveStep = (index: number) => {
        setSelectedSteps((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClear = () => {
        setSelectedSteps([]);
        setWorkflowName('');
        setRunResult(null);
        setError(null);
    };

    const handleRun = async () => {
        if (!inputText.trim()) {
            setError('Please enter some text to process.');
            return;
        }
        if (inputText.trim().length < 10) {
            setError('Input text must be at least 10 characters long.');
            return;
        }
        if (selectedSteps.length < 2) {
            setError('Please add at least 2 steps to your workflow.');
            return;
        }

        setError(null);
        setIsRunning(true);
        setRunResult(null);
        setCurrentStepIndex(0);

        try {
            const res = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    workflowName: workflowName || 'Custom Workflow',
                    steps: selectedSteps,
                    inputText: inputText.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Workflow execution failed');
                if (data.partialResults) {
                    setRunResult(data.partialResults);
                    upsertLocalRun(data.partialResults);
                }
            } else {
                setRunResult(data.result);
                upsertLocalRun(data.result);
            }
        } catch (e) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsRunning(false);
            setCurrentStepIndex(-1);
        }
    };

    return (
        <div className="relative">
            <section id="workflow-builder" className="mb-12 scroll-mt-24">
                <WorkflowBuilder
                    workflowName={workflowName}
                    setWorkflowName={setWorkflowName}
                    selectedSteps={selectedSteps}
                    onAddStep={handleAddStep}
                    onRemoveStep={handleRemoveStep}
                    onClear={handleClear}
                />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-14">
                <div className="lg:col-span-3 bg-white/80 rounded-3xl border border-black/10 p-6 md:p-8 shadow-sm backdrop-blur">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Workflow Snapshot</p>
                            <h2 className="font-display text-2xl text-black mt-2">Review before running</h2>
                        </div>
                        <div className="text-xs font-semibold text-black/60 rounded-full border border-black/10 px-3 py-1">
                            {selectedSteps.length}/4 steps
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60 mb-2">Workflow Name</div>
                        <div className="text-lg font-semibold text-black">
                            {workflowName.trim() ? workflowName : 'Untitled Workflow'}
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60 mb-3">Steps</div>
                        {selectedSteps.length === 0 ? (
                            <div className="rounded-2xl border border-black/10 bg-white/70 p-6 text-sm text-black/60">
                                Add 2-4 steps to assemble your workflow.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {selectedSteps.map((step, index) => (
                                    <div
                                        key={`${step}-${index}`}
                                        className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 p-4"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs font-semibold">
                                            {index + 1}
                                        </span>
                                        <span className="text-xl">{STEP_TYPE_INFO[step].icon}</span>
                                        <div>
                                            <div className="text-sm font-semibold text-black">{STEP_TYPE_INFO[step].label}</div>
                                            <div className="text-xs text-black/60">{STEP_TYPE_INFO[step].description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <RunPanel
                        inputText={inputText}
                        setInputText={setInputText}
                        isRunning={isRunning}
                        selectedSteps={selectedSteps}
                        currentStepIndex={currentStepIndex}
                        onRun={handleRun}
                        error={error}
                    />
                </div>
            </section>

            {runResult && <ResultsDisplay result={runResult} />}
        </div>
    );
}
