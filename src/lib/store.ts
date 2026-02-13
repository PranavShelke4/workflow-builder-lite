import { Workflow, RunResult } from './types';

// In-memory data store
const workflows: Map<string, Workflow> = new Map();
const runHistory: RunResult[] = [];

const MAX_HISTORY = 20; // Keep last 20 runs total

// --- Workflow Operations ---

export function getAllWorkflows(): Workflow[] {
    return Array.from(workflows.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function getWorkflow(id: string): Workflow | undefined {
    return workflows.get(id);
}

export function saveWorkflow(workflow: Workflow): Workflow {
    workflows.set(workflow.id, workflow);
    return workflow;
}

export function deleteWorkflow(id: string): boolean {
    return workflows.delete(id);
}

// --- Run History Operations ---

export function addRunResult(result: RunResult): RunResult {
    runHistory.unshift(result); // Add to beginning
    // Trim history to max
    if (runHistory.length > MAX_HISTORY) {
        runHistory.splice(MAX_HISTORY);
    }
    return result;
}

export function getRunHistory(limit: number = 5): RunResult[] {
    return runHistory.slice(0, limit);
}

export function getRunById(id: string): RunResult | undefined {
    return runHistory.find((r) => r.id === id);
}

// --- Health Check ---

export function checkStoreHealth(): { healthy: boolean; message: string } {
    try {
        // Verify store operations work
        const workflowCount = workflows.size;
        const historyCount = runHistory.length;
        return {
            healthy: true,
            message: `In-memory store active: ${workflowCount} workflows, ${historyCount} run records`,
        };
    } catch (error) {
        return {
            healthy: false,
            message: `Store error: ${error instanceof Error ? error.message : 'Unknown'}`,
        };
    }
}
