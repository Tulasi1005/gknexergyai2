import { Reveal } from "./Reveal";
import { ArrowRight } from "lucide-react";

const FlowSteps = ({ steps, testId = "flow-steps" }) => (
    <div className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-0" data-testid={testId}>
        {steps.map((step, i) => (
            <Reveal key={step} delay={i * 0.08} className="flex items-center">
                <div className="flex items-center">
                    <div className="rounded-xl border border-brand/30 bg-white px-4 py-3 text-center dark:border-electric/40 dark:bg-ink sm:px-6">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand/70 dark:text-electric/70">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="block font-display text-sm font-bold text-ink dark:text-white sm:text-base">
                            {step}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <ArrowRight className="mx-1.5 h-4 w-4 shrink-0 text-brand dark:text-electric sm:mx-3" aria-hidden="true" />
                    )}
                </div>
            </Reveal>
        ))}
    </div>
);

export default FlowSteps;
