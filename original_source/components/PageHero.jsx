import { Reveal, MaskedLines } from "./Reveal";

const PageHero = ({ eyebrow, titleLines, description, children, testId = "page-hero" }) => (
    <section className="relative overflow-hidden bg-grid-light" data-testid={testId}>
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-ice blur-3xl dark:bg-navy/40" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 sm:px-8 sm:pt-36 lg:pb-24">
            <div className={`grid items-center gap-12 ${children ? "lg:grid-cols-2" : ""}`}>
                <div>
                    {eyebrow && (
                        <Reveal>
                            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">
                                {eyebrow}
                            </p>
                        </Reveal>
                    )}
                    <MaskedLines
                        lines={titleLines}
                        className="font-display text-4xl font-extrabold leading-[1.08] tracking-tighter text-ink dark:text-white sm:text-5xl lg:text-6xl"
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
