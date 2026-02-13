import { HfInference } from "@huggingface/inference";
import { StepType, STEP_TYPE_INFO } from "./types";

let hfClient: HfInference | null = null;

function getClient(): HfInference {
    if (!hfClient) {
        const apiKey = process.env.HUGGINGFACE_API_KEY;
        if (!apiKey) {
            throw new Error("HUGGINGFACE_API_KEY environment variable is not set");
        }
        hfClient = new HfInference(apiKey);
    }
    return hfClient;
}

const STEP_PROMPTS: Record<StepType, string> = {
    [StepType.CLEAN_TEXT]: `You are a text cleaning assistant. Clean the following text by:
- Removing extra whitespace and blank lines
- Fixing obvious typos and formatting issues
- Normalizing punctuation and capitalization
- Removing any irrelevant artifacts (e.g., HTML tags, special characters)
Return ONLY the cleaned text, nothing else.`,

    [StepType.SUMMARIZE]: `You are a summarization assistant. Provide a clear, concise summary of the following text.
The summary should capture the main ideas and be roughly 2-4 sentences.
Return ONLY the summary, nothing else.`,

    [StepType.EXTRACT_KEY_POINTS]: `You are a key points extraction assistant. Extract the main key points from the following text.
Return them as a numbered list (1., 2., 3., etc).
Focus on the most important ideas, facts, or arguments.
Return between 3-7 key points. Return ONLY the numbered list, nothing else.`,

    [StepType.TAG_CATEGORY]: `You are a text classification assistant. Analyze the following text and assign relevant category tags.
Return 2-5 tags that best describe the content.
Format: Return tags as a comma-separated list, e.g., "Technology, AI, Business"
Return ONLY the tags, nothing else.`,

    [StepType.SENTIMENT_ANALYSIS]: `You are a sentiment analysis assistant. Analyze the emotional tone of the following text.
Provide:
- Overall sentiment: Positive / Negative / Neutral / Mixed
- Confidence: High / Medium / Low
- Brief explanation (1-2 sentences)
Format your response exactly as:
Sentiment: [sentiment]
Confidence: [confidence]
Explanation: [explanation]`,

    [StepType.TRANSLATE]: `You are a translation assistant. If the following text is not in English, translate it to English.
If it is already in English, return it as-is with a note "(Already in English)".
Return ONLY the translated text (or original with the note), nothing else.`,
};

export async function processStep(
    stepType: StepType,
    inputText: string,
): Promise<string> {
    const client = getClient();
    const systemPrompt = STEP_PROMPTS[stepType];

    try {
        const response = await client.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: inputText },
            ],
            temperature: 0.3,
            max_tokens: 1024,
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error("Empty response from LLM");
        }
        return content.trim();
    } catch (error) {
        throw new Error(`LLM Error: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function checkLLMHealth(): Promise<{
    healthy: boolean;
    message: string;
}> {
    try {
        const apiKey = process.env.HUGGINGFACE_API_KEY;
        if (!apiKey) {
            return { healthy: false, message: "HUGGINGFACE_API_KEY not configured" };
        }

        const client = getClient();
        const response = await client.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [{ role: "user", content: 'Say "ok"' }],
            max_tokens: 5,
        });

        if (response.choices[0]?.message?.content) {
            return {
                healthy: true,
                message: "Hugging Face API connected and responding",
            };
        }
        return { healthy: false, message: "LLM returned empty response" };
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        console.error("LLM Health Check Failed:", error);
        return { healthy: false, message: `LLM connection failed: ${msg}` };
    }
}

export function getStepLabel(stepType: StepType): string {
    return STEP_TYPE_INFO[stepType]?.label || stepType;
}
