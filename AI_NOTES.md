# AI Notes

## AI Tools Used

This project was built with assistance from **Gemini (Antigravity Agent)** — an AI coding assistant by Google DeepMind.

## LLM Provider & Model

**Provider:** OpenAI  
**Model:** GPT-4o-mini

### Why OpenAI GPT-4o-mini?

1. **Cost-effective** — GPT-4o-mini offers strong performance at a fraction of the cost of larger models, making it ideal for a pipeline that may call the LLM multiple times per workflow run.
2. **Fast response times** — Low latency is critical since each step in the workflow runs sequentially. GPT-4o-mini responds quickly enough for a smooth user experience.
3. **Reliable structured output** — The step types (summarize, extract key points, tag category, etc.) require consistent, well-formatted responses. GPT-4o-mini follows instructions reliably.
4. **Wide availability** — OpenAI's API is well-documented, stable, and widely accessible.
5. **Easy deployment** — Works seamlessly on Vercel with just an API key — no additional infrastructure needed.

## What I Used AI For

- **Architecture planning** — Discussed project structure, API design, and component hierarchy
- **Boilerplate generation** — Generated initial file structures, TypeScript types, and API route handlers
- **LLM prompt engineering** — Crafted system prompts for each step type (clean text, summarize, extract key points, etc.)
- **CSS design system** — Generated the dark-theme design system with custom properties, glassmorphism, and animations
- **Error handling patterns** — Generated validation logic and error response structures

## What I Checked / Verified Myself

- **API route correctness** — Tested each endpoint manually to verify input validation, error handling, and response format
- **Workflow execution flow** — Verified that steps chain correctly (output of step N becomes input of step N+1)
- **UI responsiveness** — Tested the interface on different screen sizes
- **LLM prompt quality** — Reviewed and iterated on each step type's system prompt to ensure high-quality outputs
- **History and state management** — Verified the run history captures all necessary data and displays correctly
- **Build and lint** — Verified the project builds without errors and passes lint checks
- **Edge cases** — Tested empty inputs, very long texts, and workflows with the minimum/maximum number of steps
