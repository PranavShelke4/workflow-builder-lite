'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { StepType, RunResult, WORKFLOW_TEMPLATES } from '@/lib/types';
import { upsertLocalRun } from '@/lib/localHistory';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import RunPanel from '@/components/RunPanel';
import ResultsDisplay from '@/components/ResultsDisplay';
import { ArrowLeft, Rocket } from 'lucide-react';

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
        <div className="relative animate-fade-in-up">
             {/* Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse" />
{/* 
            <div className="mb-8">
                <Link href="/workflows" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-4 uppercase tracking-wider group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                         <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-600 shadow-sm backdrop-blur mb-4">
                            Workflow Designer
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                           {mode === 'blank' ? 'New Workflow' : 'Configure Workflow'}
                        </h1>
                    </div>
                </div>
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <WorkflowBuilder
                    workflowName={workflowName}
                    setWorkflowName={setWorkflowName}
                    selectedSteps={selectedSteps}
                    onAddStep={handleAddStep}
                    onRemoveStep={handleRemoveStep}
                    onClear={handleClear}
                />
                
                <div className="lg:col-span-5 sticky top-6 space-y-6">
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
            </div>

            {runResult && <ResultsDisplay result={runResult} />}
        </div>
    );
}
