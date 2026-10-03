import { Link } from "react-router-dom";
import { ChevronLeft, Layers } from "lucide-react";
import { Reveal, MaskedLines } from "./Reveal";

const PageHero = ({ eyebrow, titleLines, description, children, showBackToStack = true, testId = "page-hero" }) => (
    <section className="relative overflow-hidden bg-grid-light" data-testid={testId}>
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-ice blur-3xl dark:bg-navy/40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-36 lg:px-8 lg:pb-24">
            <div className={`grid items-center gap-10 sm:gap-12 ${children ? "lg:grid-cols-2" : ""}`}>
                <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                        {showBackToStack && (
                            <Reveal>
                                <Link
                                    to="/home#pages-stack-section"
                                    data-testid="back-to-stack-link"
                                    className="group inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 sm:px-3.5 py-1.5 text-xs font-bold text-brand hover:border-brand/40 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300 transition-all hover:scale-105"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                                    <Layers className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                                    <span>Back to Stack of Cards</span>
                                </Link>
                            </Reveal>
                        )}
                        {eyebrow && (
                            <Reveal>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">
                                    {eyebrow}
                                </p>
                            </Reveal>
                        )}
                    </div>
                    <MaskedLines
                        lines={titleLines}
                        className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-ink dark:text-white"
                    />
                    {description && (
                        <Reveal delay={0.35}>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                                {description}
                            </p>
                        </Reveal>
                    )}
                </div>
                {children && <Reveal delay={0.25}>{children}</Reveal>}
            </div>
        </div>
    </section>
);

export default PageHero;
