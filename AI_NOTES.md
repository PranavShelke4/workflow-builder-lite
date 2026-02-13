# AI Notes

## AI Tools Used

This project was built with assistance from **GitHub Copilot** — an expert AI programming assistant.

## LLM Provider & Model

**Provider:** Hugging Face Inference API
**Model:** mistralai/Mistral-7B-Instruct-v0.2

### Why Hugging Face & Mistral?

1.  **Open Source & Accessible** — Mistral 7B is a high-performance open weights model that punches above its weight class, often outperforming larger proprietary models on reasoning tasks.
2.  **Cost-Effective** — The Hugging Face Inference API provides a generous free tier and affordable pro plans, making it ideal for experimental workflows without high upfront costs.
3.  **Low Latency** — For text processing tasks like summarization and key point extraction, Mistral 7B offers excellent speed, ensuring the workflow steps feel responsive.
4.  **Privacy Friendly** — Using open models gives more control and transparency over the AI processing pipeline compared to closed ecosystem providers.

## What I Used AI For

- **Visual Redesign** — Transformed the initial wireframe UI into a modern, polished aesthetic using Tailwind CSS.
- **Icon Integration** — Suggested and implemented `lucide-react` to replace text labels with meaningful iconography.
- **Component Refactoring** — Broke down monolithic code into smaller, reusable components (`WorkflowBuilder`, `RunPanel`, `ResultsDisplay`) to improve maintainability.
- **Bug Fixes** — Identified and resolved compilation errors caused by missing imports during the rapid iteration phase.
- **Tailwind Configuration** — Generated custom animations (`fade-in-up`, `pulse`) and extended the theme with specific color palettes.
- **Architecture Planning** — Structured the Next.js App Router for optimal performance.

## What I Checked / Verified Myself

- **Design Consistency** — Manually verified that the new color scheme and glassmorphism effects are consistent across all pages.
- **Navigation Flow** — Tested the flow from the Landing Page -> Dashboard -> Builder -> Result to ensure no broken links.
- **API Response Handling** — Ensured that the frontend correctly parses and displays the JSON output from the AI API.
- **Responsiveness** — Checked that the complex grid layouts stack correctly on smaller screens.
- **Functionality** — Verified that the "Create New" button properly triggers the template modal after the refactor.
