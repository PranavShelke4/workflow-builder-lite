'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { RunResult, StepOutput, STEP_TYPE_INFO } from '@/lib/types';
import { getLocalHistory, saveLocalHistory } from '@/lib/localHistory';
import { ArrowLeft, Clock, CheckCircle2, XCircle, FileText, Layers, Calendar, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function WorkflowDetailPage() {
  const params = useParams();
  const runId = useMemo(() => (Array.isArray(params?.id) ? params.id[0] : params?.id), [params]);
  const [run, setRun] = useState<RunResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!runId) return;

    const loadRun = async () => {
      setIsLoading(true);
      try {
        const local = getLocalHistory();
        const localMatch = local.find((item) => item.id === runId) || null;
        if (localMatch) {
          setRun(localMatch);
        }

        const res = await fetch('/api/history?limit=20');
        const data = await res.json();
        if (data.history) {
          saveLocalHistory(data.history);
        }
        const match = data.history?.find((item: RunResult) => item.id === runId) || localMatch;
        setRun(match || null);
      } catch (_) {
        const localFallback = getLocalHistory().find((item) => item.id === runId) || null;
        setRun(localFallback);
      } finally {
        setIsLoading(false);
      }
    };

    loadRun();
  }, [runId]);

  if (isLoading) {
    return (
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading execution details...</p>
      </div>
    );
  }

  if (!run) {
    return (
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-8 h-8 text-slate-300" />
         </div>
        <h1 className="font-display text-3xl text-slate-900 mb-2">Run not found</h1>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          This execution trace may have been cleared from your local history or expired from the server.
        </p>
        <div className="flex gap-4">
          <Link
            href="/workflows"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
          </Link>
          <Link
            href="/workflows/new"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-slate-800"
          >
            Start New Run
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative animate-fade-in-up">
       {/* Background */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] -z-10" />

      <section className="mb-8">
        <Link href="/workflows" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to History
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
             <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                    run.status === 'success'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                    {run.status === 'success' ? <CheckCircle2 className="w-3 h-3"/> : <XCircle className="w-3 h-3"/>}
                    {run.status}
                </span>
                <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(run.createdAt)}
                </span>
             </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900">{run.workflowName}</h1>
          </div>
          
           <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                <div className="px-4 py-2 border-r border-slate-100">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Time</div>
                    <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        {formatDuration(run.totalDurationMs)}
                    </div>
                </div>
                 <div className="px-4 py-2">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Steps</div>
                    <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-violet-500" />
                        {run.stepOutputs.length}
                    </div>
                </div>
           </div>
        </div>
      </section>

      {run.error && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 text-red-700 border border-red-100 flex items-start gap-3">
            <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
                <p className="font-bold">Execution Error</p>
                <p className="text-sm opacity-90">{run.error}</p>
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Steps */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-widest">
                <Layers className="w-4 h-4 text-indigo-500" /> Execution Pipeline
            </div>
            
            <div className="space-y-4">
                {run.stepOutputs.map((stepOutput: StepOutput, index) => (
                <div
                    key={stepOutput.stepId}
                    className="relative pl-8 before:absolute before:left-3 before:top-8 before:bottom-[-20px] before:w-0.5 before:bg-slate-100 last:before:hidden"
                >
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-white border-2 border-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shadow-sm z-10">
                        {index + 1}
                    </div>

                    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
                        <div className="flex items-center justify-between px-5 py-3 bg-slate-50/50 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <span className="text-lg bg-white p-1.5 rounded-lg border border-slate-100 shadow-sm text-indigo-600">
                                    {STEP_TYPE_INFO[stepOutput.stepType]?.icon}
                                </span>
                                <span className="font-bold text-sm text-slate-900">{stepOutput.stepLabel}</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 font-mono bg-white px-2 py-1 rounded-md border border-slate-100 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {formatDuration(stepOutput.durationMs)}
                            </span>
                        </div>
                        <div className="p-5 overflow-x-auto">
                           <pre className="text-sm text-slate-600 font-mono whitespace-pre-wrap leading-relaxed">
                            {stepOutput.output}
                           </pre>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>

        {/* Right Col: Input */}
        <div className="space-y-6">
             <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-widest">
                <FileText className="w-4 h-4 text-indigo-500" /> Original Input
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm sticky top-6">
                <div className="text-xs font-bold text-slate-400 uppercase mb-3">
                    Input Data
                </div>
                <div className="text-sm text-slate-600 font-mono whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto custom-scrollbar">
                    {run.inputText}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
