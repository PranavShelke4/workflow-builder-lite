export enum StepType {
    CLEAN_TEXT = 'CLEAN_TEXT',
    SUMMARIZE = 'SUMMARIZE',
    EXTRACT_KEY_POINTS = 'EXTRACT_KEY_POINTS',
    TAG_CATEGORY = 'TAG_CATEGORY',
    SENTIMENT_ANALYSIS = 'SENTIMENT_ANALYSIS',
    TRANSLATE = 'TRANSLATE',
}

export const STEP_TYPE_INFO: Record<StepType, { label: string; description: string; icon: string }> = {
    [StepType.CLEAN_TEXT]: {
        label: 'Clean Text',
        description: 'Remove extra whitespace, fix formatting, and normalize text',
        icon: '🧹',
    },
    [StepType.SUMMARIZE]: {
        label: 'Summarize',
        description: 'Generate a concise summary of the text',
        icon: '📝',
    },
    [StepType.EXTRACT_KEY_POINTS]: {
        label: 'Extract Key Points',
        description: 'Pull out the main ideas and key takeaways',
        icon: '🎯',
    },
    [StepType.TAG_CATEGORY]: {
        label: 'Tag Category',
        description: 'Classify the text into relevant categories',
        icon: '🏷️',
    },
    [StepType.SENTIMENT_ANALYSIS]: {
        label: 'Sentiment Analysis',
        description: 'Analyze the emotional tone and sentiment',
        icon: '💭',
    },
    [StepType.TRANSLATE]: {
        label: 'Translate',
        description: 'Translate the text to English (if not already)',
        icon: '🌐',
    },
};

export interface WorkflowStep {
    id: string;
    type: StepType;
    order: number;
}

export interface Workflow {
    id: string;
    name: string;
    steps: WorkflowStep[];
    createdAt: string;
}

export interface StepOutput {
    stepId: string;
    stepType: StepType;
    stepLabel: string;
    order: number;
    input: string;
    output: string;
    durationMs: number;
}

export interface RunResult {
    id: string;
    workflowId: string;
    workflowName: string;
    inputText: string;
    stepOutputs: StepOutput[];
    status: 'success' | 'error' | 'running';
    error?: string;
    totalDurationMs: number;
    createdAt: string;
}

export interface WorkflowTemplate {
    name: string;
    description: string;
    steps: StepType[];
    icon: string;
}

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
    {
        name: 'Quick Summary',
        description: 'Clean and summarize any text quickly',
        steps: [StepType.CLEAN_TEXT, StepType.SUMMARIZE],
        icon: '⚡',
    },
    {
        name: 'Full Analysis',
        description: 'Complete text analysis with summary and key points',
        steps: [StepType.CLEAN_TEXT, StepType.SUMMARIZE, StepType.EXTRACT_KEY_POINTS],
        icon: '🔬',
    },
    {
        name: 'Content Tagger',
        description: 'Clean, summarize, and categorize content',
        steps: [StepType.CLEAN_TEXT, StepType.SUMMARIZE, StepType.TAG_CATEGORY],
        icon: '📋',
    },
    {
        name: 'Deep Insights',
        description: 'Extract key points and analyze sentiment',
        steps: [StepType.CLEAN_TEXT, StepType.EXTRACT_KEY_POINTS, StepType.SENTIMENT_ANALYSIS, StepType.TAG_CATEGORY],
        icon: '🧠',
    },
];

