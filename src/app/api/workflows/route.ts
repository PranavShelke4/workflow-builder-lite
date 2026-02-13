import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Workflow, WorkflowStep, StepType } from '@/lib/types';
import { getAllWorkflows, saveWorkflow, deleteWorkflow } from '@/lib/store';

// GET /api/workflows - List all workflows
export async function GET() {
    try {
        const workflows = getAllWorkflows();
        return NextResponse.json({ workflows });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch workflows' },
            { status: 500 }
        );
    }
}

// POST /api/workflows - Create a new workflow
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, steps } = body;

        // Validation
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json(
                { error: 'Workflow name is required' },
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

        const workflow: Workflow = {
            id: uuidv4(),
            name: name.trim(),
            steps: steps.map((stepType: StepType, index: number): WorkflowStep => ({
                id: uuidv4(),
                type: stepType,
                order: index + 1,
            })),
            createdAt: new Date().toISOString(),
        };

        saveWorkflow(workflow);

        return NextResponse.json({ workflow }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create workflow' },
            { status: 500 }
        );
    }
}

// DELETE /api/workflows - Delete a workflow
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Workflow ID is required' },
                { status: 400 }
            );
        }

        const deleted = deleteWorkflow(id);
        if (!deleted) {
            return NextResponse.json(
                { error: 'Workflow not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete workflow' },
            { status: 500 }
        );
    }
}
