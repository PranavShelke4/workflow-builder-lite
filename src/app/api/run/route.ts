import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { StepType, StepOutput, RunResult, STEP_TYPE_INFO } from '@/lib/types';
import { processStep } from '@/lib/llm';
import { addRunResult } from '@/lib/store';

// POST /api/run - Run a workflow on input text
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { workflowName, steps, inputText } = body;

        // Validation
        if (!inputText || typeof inputText !== 'string' || inputText.trim().length === 0) {
            return NextResponse.json(
                { error: 'Input text is required and cannot be empty' },
                { status: 400 }
            );
        }

        if (inputText.trim().length < 10) {
            return NextResponse.json(
                { error: 'Input text must be at least 10 characters long' },
                { status: 400 }
            );
        }

        if (!steps || !Array.isArray(steps) || steps.length < 2 || steps.length > 4) {
            return NextResponse.json(
                { error: 'Workflow must have between 2 and 4 steps' },
                { status: 400 }
            );
        }

        const validStepTypes = Object.values(StepType);
        for (const step of steps) {
            if (!validStepTypes.includes(step)) {
                return NextResponse.json(
                    { error: `Invalid step type: ${step}` },
                    { status: 400 }
                );
            }
        }

        const runId = uuidv4();
        const stepOutputs: StepOutput[] = [];
        let currentInput = inputText.trim();
        const startTime = Date.now();

        // Execute each step sequentially
        for (let i = 0; i < steps.length; i++) {
            const stepType: StepType = steps[i];
            const stepStart = Date.now();

            try {
                const output = await processStep(stepType, currentInput);
                const stepOutput: StepOutput = {
                    stepId: uuidv4(),
                    stepType,
                    stepLabel: STEP_TYPE_INFO[stepType].label,
                    order: i + 1,
                    input: currentInput,
                    output,
                    durationMs: Date.now() - stepStart,
                };
                stepOutputs.push(stepOutput);
                currentInput = output; // Chain output to next step's input
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : 'Step execution failed';

                // Save partial results as error
                const runResult: RunResult = {
                    id: runId,
                    workflowId: '',
                    workflowName: workflowName || 'Custom Workflow',
                    inputText: inputText.trim(),
                    stepOutputs,
                    status: 'error',
                    error: `Step ${i + 1} (${STEP_TYPE_INFO[stepType].label}) failed: ${errorMsg}`,
                    totalDurationMs: Date.now() - startTime,
                    createdAt: new Date().toISOString(),
                };
                addRunResult(runResult);

                return NextResponse.json(
                    {
                        error: `Step ${i + 1} failed: ${errorMsg}`,
                        partialResults: runResult
                    },
                    { status: 500 }
                );
            }
        }

        // Save successful run
        const runResult: RunResult = {
            id: runId,
            workflowId: '',
            workflowName: workflowName || 'Custom Workflow',
            inputText: inputText.trim(),
            stepOutputs,
            status: 'success',
            totalDurationMs: Date.now() - startTime,
            createdAt: new Date().toISOString(),
        };
        addRunResult(runResult);

        return NextResponse.json({ result: runResult });
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: `Workflow execution failed: ${msg}` },
            { status: 500 }
        );
    }
}
