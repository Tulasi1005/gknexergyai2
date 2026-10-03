import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const CTABand = ({
    title = "Let's Build What Comes Next.",
    text = "Whether you want to build technology, develop talent or transform your business — let's start the conversation.",
    primary = { label: "Talk to Us", to: "/contact" },
    secondary = { label: "Explore Academy", to: "/academy" },
}) => (
    <section className="relative overflow-hidden bg-ink dark:bg-abyss" data-testid="cta-band">
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-navy blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
            <Reveal>
                <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {title}
                </h2>
            </Reveal>
            <Reveal delay={0.12}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{text}</p>
            </Reveal>
            <Reveal delay={0.22}>
                <div className="mt-9 flex flex-wrap gap-4">
                    <Link
                        to={primary.to}
                        data-testid="cta-band-primary"
                        className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
                    >
                        {primary.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    {secondary && (
                        <Link
                            to={secondary.to}
                            data-testid="cta-band-secondary"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:border-electric hover:text-electric"
                        >
                            {secondary.label}
                        </Link>
                    )}
                </div>
            </Reveal>
        </div>
    </section>
);

export default CTABand;
