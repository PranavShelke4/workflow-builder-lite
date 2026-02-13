# Workflow Builder Lite

A lightweight, AI-powered web application for building and running simple text processing workflows. Create pipelines with 2–4 steps like cleaning, summarizing, extracting key points, and more — then run them on any input text and see per-step results.

**Live Demo:** _(add your Vercel URL here after deployment)_

---

## Features

- **Workflow Builder** — Visually compose workflows with 2-4 processing steps
- **6 Step Types** — Clean Text, Summarize, Extract Key Points, Tag Category, Sentiment Analysis, Translate
- **Quick Start Templates** — Pre-built workflows (Quick Summary, Full Analysis, Content Tagger, Deep Insights)
- **Per-Step Output** — See the result of each step in the pipeline
- **Run History** — View the last 5 workflow runs with full details
- **Error Handling** — Validates input, handles API errors, and shows partial results on failure
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Theme** — Modern glassmorphism UI with animations

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | Next.js 14 (App Router, TypeScript) |
| Styling    | Vanilla CSS with custom properties  |
| LLM        | OpenAI GPT-4o-mini                  |
| Data Store | In-memory (server-side)             |
| Deployment | Vercel                              |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd workflow-builder-lite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Usage

1. **Pick a template** or build a custom workflow by adding 2-4 steps
2. **Enter your text** in the input area
3. **Click "Run Workflow"** — each step processes sequentially
4. **View results** — see output from each step
5. **Check history** — click any past run to view its details

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── history/route.ts   # GET run history
│   │   ├── run/route.ts       # POST execute workflow
│   │   └── workflows/route.ts # CRUD workflows
│   ├── globals.css            # Design system
│   ├── layout.tsx             # Root layout with nav
│   └── page.tsx               # Home page (builder + runner)
└── lib/
    ├── llm.ts                 # OpenAI integration
    ├── store.ts               # In-memory data store
    └── types.ts               # TypeScript types & constants
```

## What's Done

- [x] Workflow creation with 2-4 steps
- [x] 6 step types with tailored LLM prompts
- [x] 4 pre-built templates
- [x] Sequential workflow execution via OpenAI
- [x] Per-step output display with timing
- [x] Run history (last 5 runs) with detail modal
- [x] Input validation and error handling
- [x] Responsive dark-theme UI
- [x] Environment variable configuration

## What's Not Done

- [ ] Persistent database (currently in-memory, resets on server restart)
- [ ] User authentication
- [ ] Workflow editing after creation
- [ ] Drag-and-drop step reordering
- [ ] Streaming LLM responses
- [ ] Export results to file
- [ ] Rate limiting

## Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Connect the repository in [Vercel](https://vercel.com)
3. Add `OPENAI_API_KEY` to Vercel environment variables
4. Deploy

## License

MIT
