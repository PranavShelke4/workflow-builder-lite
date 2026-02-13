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

> Plan the architecture for this project. Include API routes, data models, component structure, and LLM integration approach. Use OpenAI GPT-4o-mini.

**Purpose:** Generated the implementation plan with type definitions, API route structure, component hierarchy, and service layer design.

---

## 3. LLM Step Prompts

**Prompt:**

> Create system prompts for each workflow step type: Clean Text, Summarize, Extract Key Points, Tag Category, Sentiment Analysis, Translate. Each prompt should instruct the LLM to return structured, consistent output.

**Purpose:** Crafted tailored system prompts for each step type to ensure high-quality, structured output from the LLM.

---

## 4. UI Design System

**Prompt:**

> Create a dark-theme CSS design system with glassmorphism, gradients, micro-animations, and responsive layouts. Include styles for cards, buttons, forms, status indicators, and modals.

**Purpose:** Generated the comprehensive CSS design system in `globals.css`.

---

## 5. Error Handling

**Prompt:**

> Add proper input validation and error handling: validate empty text, text too short, wrong number of steps, LLM API errors. Show user-friendly error messages and handle partial failures.

**Purpose:** Implemented validation in API routes and client-side error display.

---

_Note: API keys, authentication tokens, and full agent responses are excluded from this document._
