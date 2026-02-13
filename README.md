# Workflow Builder Lite

A lightweight, AI-powered web application for building and running text processing workflows. Create visually stunning pipelines with customizable steps like cleaning, summarizing, extracting key points, and more—then run them on any input text and see instant results.

**Live Demo:** _(add your Vercel URL here)_

---

## Features

- **Modern SaaS UI** — Beautifully designed with rich gradients, glassmorphism, and smooth animations.
- **Workflow Builder** — Intuitive interface to compose workflows with 2-4 structured processing steps.
- **6 Intelligent Step Types** — Clean Text, Summarize, Extract Key Points, Tag Category, Sentiment Analysis, Translate.
- **Smart Templates** — Pre-built workflows (Quick Summary, Full Analysis, Content Tagger, Deep Insights) to get started instantly.
- **Real-time Execution** — Watch your workflow run step-by-step with detailed timing and status indicators.
- **Persistent History** — Your run history is saved locally, so you never lose track of your past experiments.
- **Responsive & Accessible** — Fully optimized for desktop, tablet, and mobile devices.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, TypeScript) |
| **Styling** | Tailwind CSS + Custom Animations |
| **Icons** | Lucide React |
| **LLM Integration** | Hugging Face Inference API (Mistral-7B) |
| **State Management** | React Hooks + LocalStorage |
| **Deployment** | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Hugging Face Access Token ([get one here](https://huggingface.co/settings/tokens))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd workflow-builder-lite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your HUGGINGFACE_API_KEY into it

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

1. **Dashboard** — View all your recent runs and comprehensive analytics at a glance.
2. **Create New** — Choose a template or start from scratch.
3. **Build** — Add steps (Clean, Summarize, etc.) to your customized pipeline.
4. **Run** — Enter your text, hit run, and watch the AI process each step in real-time.
5. **Review** — Expand results to see exactly how the AI transformed your data at every stage.

## Project Structure

```bash
src/
├── app/
│   ├── api/               # Next.js API Routes (Serverless)
│   ├── workflows/         # Dashboard & Builder Pages
│   │   ├── [id]/          # Run Detail Page
│   │   ├── new/           # Workflow Builder Page
│   │   └── page.tsx       # Dashboard Page
│   ├── globals.css        # Global Tailwind Directives
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Landing Page
├── components/            # Reusable UI Components
│   ├── Hero.tsx
│   ├── HistoryDetailModal.tsx
│   ├── HistoryList.tsx
│   ├── ResultsDisplay.tsx
│   ├── RunPanel.tsx
│   ├── TemplateGrid.tsx
│   └── WorkflowBuilder.tsx
├── lib/
│   ├── llm.ts             # Hugging Face Inference API Client
│   ├── localHistory.ts    # LocalStorage Utilities
│   ├── store.ts           # State Management
│   └── types.ts           # TypeScript Types
```
