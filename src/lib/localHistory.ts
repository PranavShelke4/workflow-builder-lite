import { RunResult } from "@/lib/types";

const STORAGE_KEY = "workflowBuilderLite.history";
const MAX_ITEMS = 20;

const safeParse = (raw: string | null): RunResult[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as RunResult[];
  } catch {
    return [];
  }
};

export const getLocalHistory = (): RunResult[] => {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

export const saveLocalHistory = (items: RunResult[]): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
};

export const upsertLocalRun = (run: RunResult): RunResult[] => {
  const existing = getLocalHistory().filter((item) => item.id !== run.id);
  const next = [run, ...existing].slice(0, MAX_ITEMS);
  saveLocalHistory(next);
  return next;
};
