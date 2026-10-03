import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Store, GraduationCap, Briefcase, ShoppingBag, HeartPulse, Landmark, Cpu, Building2 } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { INDUSTRIES } from "../data/site";

const icons = [Rocket, Store, GraduationCap, Briefcase, ShoppingBag, HeartPulse, Landmark, Cpu, Building2];

const Industries = () => (
    <>
        <SEO
            title="Industries We Serve | GK Nexergy"
            description="Technology that understands your industry — from startups and SMBs to education, healthcare, finance and beyond."
        />
        <PageHero
            eyebrow="Industries"
            titleLines={["Technology That Understands", "Your Industry."]}
            description="Every organisation is different. We adapt technology to your industry's realities, your organisation's requirements and your stage of growth."
            testId="industries-hero"
        />
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="industries-grid">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {INDUSTRIES.map((ind, i) => {
                    const Icon = icons[i];
                    return (
                        <Reveal key={ind.name} delay={(i % 3) * 0.08}>
                            <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 dark:border-slate-800 dark:bg-card dark:hover:border-electric/40" data-testid={`industry-card-${i}`}>
                                <Icon className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                                <h2 className="mt-4 font-display text-lg font-bold text-ink dark:text-white">{ind.name}</h2>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{ind.text}</p>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
            <Reveal>
                <div className="mt-14">
                    <Link
                        to="/contact"
                        data-testid="industries-cta"
                        className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
                    >
                        Discuss Your Business Challenge
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </Reveal>
        </section>
        <CTABand />
    </>
);

export default Industries;
