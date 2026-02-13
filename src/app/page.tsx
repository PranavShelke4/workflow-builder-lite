import Link from 'next/link';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            title: 'Design a 2-4 step workflow',
            body: 'Pick from clean, summarize, extract, tag, and more. Name it, order it, and hit run.',
          },
          {
            title: 'Run once, see every step',
            body: 'Each step output is captured with duration and formatting so you can compare quality fast.',
          },
          {
            title: 'Browse recent runs',
            body: 'Every run is stored in a quick history so you can revisit inputs and outputs any time.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white/80 rounded-3xl border border-black/10 p-6 shadow-sm backdrop-blur"
          >
            <h3 className="font-display text-xl text-black mb-3">{item.title}</h3>
            <p className="text-sm text-black/70 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="bg-white/80 rounded-3xl border border-black/10 p-8 md:p-10 shadow-sm backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Workflow Builder Lite</p>
            <h2 className="font-display text-3xl text-black mt-2">Your lightweight automation runner</h2>
            <p className="text-sm text-black/70 mt-3 max-w-2xl">
              Build quick text pipelines for cleaning, summarizing, extracting, tagging, or translating. Run them on any input,
              inspect each step, and share results with confidence.
            </p>
          </div>
          <Link
            href="/workflows"
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black/80"
          >
            View Workflows
          </Link>
        </div>
      </section>
    </div>
  );
}
