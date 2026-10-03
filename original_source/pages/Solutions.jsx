import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { SOLUTIONS } from "../data/site";

const Solutions = () => (
    <>
        <SEO
            title="Technology Solutions | GK Nexergy"
            description="Technology solutions built around your business — software development, mobile apps, digital transformation, AI & automation, data & analytics and digital growth."
        />
        <PageHero
            eyebrow="Solutions"
            titleLines={["Technology Solutions Built", "Around Your Business."]}
            description="Right Technology. Right Problem. Right Time. We design and deliver solutions that fit your business — not the other way around."
            testId="solutions-hero"
        />
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="solutions-grid">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SOLUTIONS.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 0.1}>
                        <Link
                            to={`/solutions/${s.slug}`}
                            data-testid={`solutions-card-${s.slug}`}
                            className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5 dark:border-slate-800 dark:bg-card dark:hover:border-electric/50"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice dark:bg-navy/40">
                                    <s.icon className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                                </div>
                                <span className="font-grotesk text-sm font-semibold tracking-[0.25em] text-slate-300 dark:text-slate-600">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <h2 className="mt-6 font-display text-xl font-extrabold text-ink dark:text-white">{s.title}</h2>
                            <p className="mt-2 text-sm font-semibold text-brand dark:text-electric">{s.tagline}</p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.description}</p>
                            <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-sm font-bold text-brand group-hover:text-electric dark:text-electric">
                                Explore Solution
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
        <CTABand
            title="Not Sure Where to Start?"
            text="Tell us the problem you're trying to solve — we'll help you identify the right technology for it."
            primary={{ label: "Talk to Us", to: "/contact" }}
            secondary={{ label: "View Industries", to: "/industries" }}
        />
    </>
);

export default Solutions;
