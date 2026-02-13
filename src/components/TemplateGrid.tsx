
import { WorkflowTemplate, WORKFLOW_TEMPLATES } from '@/lib/types';

export default function TemplateGrid({
    onSelect,
    selectedTemplateName,
}: {
    onSelect: (template: WorkflowTemplate) => void;
    selectedTemplateName: string | null;
}) {
    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Templates</p>
                    <h2 className="font-display text-2xl md:text-3xl text-black">Pick a starting point</h2>
                </div>
                <div className="hidden md:block text-xs text-black/60">Click to preload a workflow</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {WORKFLOW_TEMPLATES.map((template) => {
                    const isSelected = selectedTemplateName === template.name;
                    return (
                        <button
                            key={template.name}
                            onClick={() => onSelect(template)}
                            className={`
                group flex flex-col items-start text-left p-6 rounded-2xl border transition-all backdrop-blur
                ${isSelected
                                    ? 'border-black/30 bg-white shadow-lg'
                                    : 'border-black/10 bg-white/70 hover:border-black/30 hover:shadow-lg hover:-translate-y-0.5'
                                }
              `}
                        >
                            <span className="text-3xl mb-4 block" role="img" aria-label={template.name}>
                                {template.icon}
                            </span>
                            <h3 className="font-semibold text-lg mb-2 text-black">
                                {template.name}
                            </h3>
                            <p className="text-sm text-black/70">
                                {template.description}
                            </p>
                            <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                                Use template
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
