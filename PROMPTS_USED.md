# Prompts Used During Development

This document records the key prompts used during AI-assisted development of Workflow Builder Lite.

---

## 1. Initial Project Setup

**Prompt:**

> Build a web app where I can create a simple "workflow" with 2–4 steps (example steps: "clean text", "summarize", "extract key points", "tag category"), run the workflow on an input text, see the output of each step, and see a simple run history (last 5 runs). Make it with Next.js. Include a status page, README, AI_NOTES, ABOUTME, and handle empty/wrong input.

**Purpose:** Full project spec and kick-off.

---

## 2. Architecture Planning

**Prompt:**

> Plan the architecture for this project. Include API routes, data models, component structure, and LLM integration approach. Use Hugging Face Inference API.

**Purpose:** Generated the implementation plan with type definitions, API route structure, component hierarchy, and service layer design.

---

## 3. LLM Step Prompts

**Prompt:**

> Create system prompts for each workflow step type: Clean Text, Summarize, Extract Key Points, Tag Category, Sentiment Analysis, Translate using Mistral 7B instruct format. Each prompt should instruct the LLM to return structured, consistent output.

**Purpose:** Crafted tailored system prompts for each step type to ensure high-quality, structured output from the LLM.

---

## 4. UI Design System

**Prompt:**

> Create a dark-theme CSS design system with glassmorphism, gradients, micro-animations, and responsive layouts. Include styles for cards, buttons, forms, status indicators, and modals.

**Purpose:** Generated the comprehensive CSS design system in `globals.css`.

---

## 6. Visual Redesign & Modernization

**Prompt:**

> "now full update this landing page that look best and modern use best color combination"
> "update to tailwind css, add gradients, glassmorphism, and animations"

**Purpose:** Transformed the basic dark theme into a high-end SaaS product design using Tailwind CSS, featuring indigo/violet gradients, animated background blobs, and a clean card-based layout.

---

## 7. Component Refactoring & Consistency

**Prompt:**

> "now also update this pages designe that look best that match index page designe"
> "fix this file error" (referring to missing imports after a large refactor)

**Purpose:** Propagated the new design language to the internal application pages (`/workflows`, `/workflows/new`). This involved:
- installing `lucide-react` for consistent iconography.
- updating the `WorkflowBuilder` and `RunPanel` components to use the new glassmorphism styles.
- Fixing compilation errors introduced during the rapid style migration.

---
