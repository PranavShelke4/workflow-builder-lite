
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="text-center py-16 md:py-24 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-sm">
                Workflow Builder Lite
            </div>
            <h1 className="font-display text-4xl md:text-7xl font-semibold tracking-tight text-black">
                Build a
                <span className="relative mx-3 inline-flex items-center">
                    <span className="relative text-black">
                        2-4 step
                    </span>
                </span>
                text automation
            </h1>
            <p className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
                Create compact workflows for cleaning, summarizing, extracting key points, and tagging.
                Run them on any text, then review each step with precision.
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-black/60">
                    <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1">2-4 steps</span>
                    <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1">Run history</span>
                    <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1">LLM powered</span>
                </div>

                 <Link
                    href="/workflows"
                    className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black/80"
                >
                    Create Workflow
                </Link>
            </div>
        </section>
    );
}
