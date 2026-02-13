import Link from 'next/link';
import { ArrowRight, Zap, Clock, Database, Layers, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-50/50 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/30 rounded-[100%] blur-[120px] -z-10 mix-blend-multiply" />
      <div className="absolute top-[200px] right-0 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
      <div className="absolute top-[100px] left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -z-10 mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32 lg:pt-32 lg:pb-40 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 shadow-sm backdrop-blur mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Workflow Builder Lite
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 max-w-5xl mx-auto leading-[1.1]">
            Automate text with
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600">
                precision & speed
            </span>
        </h1>

        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Build 2-4 step processing pipelines in seconds. Clean, summarize, and extract data from any text with our modern, lightweight builder.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link 
                href="/workflows" 
                className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full bg-slate-900 px-8 text-base font-semibold text-white shadow-xl shadow-indigo-500/20 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95"
            >
                Start Building Free
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
                href="#features" 
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full bg-white border border-slate-200 px-8 text-base font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors hover:border-slate-300"
            >
                See How It Works
            </Link>
        </div>
      </section>

      {/* Value Pillars */}
      <section id="features" className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                {
                    title: 'Smart Execution',
                    desc: 'Chain multiple AI operations to process text intelligently in a specified order.',
                    icon: <Zap className="w-6 h-6 text-white" />,
                    color: 'from-amber-400 to-orange-500',
                    bg: 'bg-orange-50'
                },
                {
                    title: 'Real-time History',
                    desc: 'Every run is saved locally. Revisit inputs and outputs instantly.',
                    icon: <Clock className="w-6 h-6 text-white" />,
                    color: 'from-blue-400 to-cyan-500',
                    bg: 'bg-blue-50'
                },
                {
                    title: 'Clean Outputs',
                    desc: 'Get structured, formatted results ready for your next destination.',
                    icon: <Layers className="w-6 h-6 text-white" />,
                    color: 'from-violet-400 to-purple-500',
                    bg: 'bg-indigo-50'
                }
            ].map((item, i) => (
                <div key={i} className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-1">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-md transform rotate-3 group-hover:rotate-6 transition-transform`}>
                        {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Feature Showcase (Bento Grid) */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 lg:p-24 relative overflow-hidden">
            {/* Dark background effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300 mb-6">
                        Powerful & Local
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Built for modern<br />content workflows
                    </h2>
                    <p className="text-lg text-slate-400 mb-10 max-w-lg">
                        Forget complex enterprise software. Workflow Builder Lite gives you just the right amount of power to automate your daily text tasks.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                        {[
                            'Zero server latency (Client-side runs)',
                            'Up to 4 concurrent steps',
                            'Exportable JSON results',
                            'Persisted local storage'
                        ].map((feat, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                <span>{feat}</span>
                            </li>
                        ))}
                    </ul>

                    <Link href="/workflows" className="inline-flex h-12 items-center gap-2 text-white font-semibold border-b border-indigo-500 pb-0.5 hover:text-indigo-400 transition-colors">
                        Explore the library <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Right side Grid/Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4 mt-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <div className="text-3xl font-bold text-white mb-1">High</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Performance</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5">
                            <div className="text-3xl font-bold text-white mb-1">100%</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Secure</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 shadow-xl shadow-indigo-900/50">
                            <div className="text-3xl font-bold text-white mb-1">Instant</div>
                            <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Results</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <div className="text-3xl font-bold text-white mb-1">Local</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Storage</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 pb-32 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to streamline your text?</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Join thousands of users who save time by automating their routine reading and writing tasks with Workflow Builder Lite.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link 
                href="/workflows" 
                className="w-full sm:w-auto h-14 px-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20"
            >
                Launch App
            </Link>
             <Link 
                href="https://github.com/PranavShelke4/workflow-builder-lite" 
                target="_blank"
                className="w-full sm:w-auto h-14 px-10 rounded-full bg-white border border-slate-200 text-slate-900 font-bold flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-105"
            >
                View on GitHub
            </Link>
        </div>
      </section>

    </div>
  );
}
