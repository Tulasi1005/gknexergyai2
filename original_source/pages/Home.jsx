import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Building2, BookOpen, Wrench, Globe2, Award } from "lucide-react";
import SEO from "../components/SEO";
import Ecosystem from "../components/Ecosystem";
import EditorialMarquee from "../components/Marquee";
import CTABand from "../components/CTABand";
import FlowSteps from "../components/FlowSteps";
import { Reveal, MaskedLines } from "../components/Reveal";
import { SOLUTIONS } from "../data/site";

const pillars = [
    { icon: BookOpen, title: "TRAIN", text: "Industry-ready skills." },
    { icon: Wrench, title: "BUILD", text: "Real-world technology." },
    { icon: Globe2, title: "TRANSFORM", text: "Business and community impact." },
];

const Home = () => (
    <>
        <SEO
            title="GK Nexergy | Technology, Training & Digital Solutions"
            description="GK Nexergy empowers local talent, builds technology solutions and helps businesses transform for the digital future. Train. Build. Transform."
        />

        {/* HERO */}
        <section className="relative overflow-hidden bg-grid-light" data-testid="home-hero">
            <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-ice blur-3xl dark:bg-navy/40" />
            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-2 lg:pb-28">
                <div>
                    <Reveal>
                        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-ice px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand dark:border-electric/40 dark:bg-navy/30 dark:text-electric">
                            Technology • Talent • Transformation
                        </p>
                    </Reveal>
                    <MaskedLines
                        lines={[
                            <span key="a">Train. <span className="text-brand dark:text-electric">Build.</span></span>,
                            <span key="b">Transform.</span>,
                        ]}
                        className="font-display text-5xl font-extrabold leading-[1.04] tracking-tighter text-ink dark:text-white sm:text-6xl lg:text-7xl"
                    />
                    <Reveal delay={0.4}>
                        <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-slate-700 dark:text-slate-200 sm:text-lg">
                            We empower local talent, build technology solutions, and help businesses transform for the digital future.
                        </p>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
                            GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.
                        </p>
                    </Reveal>
                    <Reveal delay={0.55}>
                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                data-testid="hero-build-cta"
                                className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
                            >
                                Build With Us
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link
                                to="/academy"
                                data-testid="hero-academy-cta"
                                className="inline-flex items-center gap-2 rounded-full border border-navy/25 px-7 py-3.5 font-display text-sm font-bold text-navy transition-colors duration-300 hover:border-brand hover:text-brand dark:border-slate-600 dark:text-white dark:hover:border-electric dark:hover:text-electric"
                            >
                                Explore Nexergy Academy
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                    <Reveal delay={0.7}>
                        <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400" data-testid="hero-credibility">
                            <Award className="h-4 w-4 text-brand dark:text-electric" />
                            25+ Years of IT Industry Experience
                        </p>
                    </Reveal>
                </div>
                <Reveal delay={0.3} y={0}>
                    <Ecosystem />
                </Reveal>
            </div>
        </section>

        <EditorialMarquee />

        {/* TWO ECOSYSTEMS */}
        <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32" data-testid="home-ecosystems">
            <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">The Ecosystem</p>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
                    One Company. Two Powerful Ecosystems.
                </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
                <Reveal delay={0.1}>
                    <Link
                        to="/academy"
                        data-testid="ecosystem-academy-card"
                        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5 dark:border-slate-800 dark:bg-card dark:hover:border-electric/50 sm:p-10"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice dark:bg-navy/40">
                            <GraduationCap className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                        </div>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-brand dark:text-electric">Empower People</p>
                        <h3 className="mt-2 font-display text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Nexergy Academy</h3>
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                            Industry-relevant learning, practical projects, mentorship and workforce development.
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 pt-8 font-display text-sm font-bold text-brand transition-colors group-hover:text-electric dark:text-electric">
                            Explore Academy
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </Link>
                </Reveal>
                <Reveal delay={0.2}>
                    <Link
                        to="/solutions"
                        data-testid="ecosystem-solutions-card"
                        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5 dark:border-slate-800 dark:bg-card dark:hover:border-electric/50 sm:p-10"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice dark:bg-navy/40">
                            <Building2 className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                        </div>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-brand dark:text-electric">Enable Businesses</p>
                        <h3 className="mt-2 font-display text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">GK Nexergy Solutions</h3>
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                            Software engineering, AI, data, digital transformation and technology consulting.
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 pt-8 font-display text-sm font-bold text-brand transition-colors group-hover:text-electric dark:text-electric">
                            Explore Solutions
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </Link>
                </Reveal>
            </div>
            <Reveal delay={0.15}>
                <div className="mt-12">
                    <FlowSteps steps={["Learning", "Skills", "Technology", "Industry", "Opportunity"]} testId="home-connect-flow" />
                </div>
            </Reveal>
        </section>

        {/* THREE PILLARS */}
        <section className="bg-mist py-24 dark:bg-ink sm:py-32" data-testid="home-pillars">
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
                <Reveal>
                    <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
                        We Are More Than a Technology Provider.
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                        GK Nexergy combines technology expertise with human capital development.
                    </p>
                </Reveal>
                <div className="mt-14 grid gap-6 sm:grid-cols-3">
                    {pillars.map((p, i) => (
                        <Reveal key={p.title} delay={i * 0.12}>
                            <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5 dark:border-slate-800 dark:bg-card sm:p-10" data-testid={`pillar-${p.title.toLowerCase()}`}>
                                <p.icon className="h-7 w-7 text-brand dark:text-electric" strokeWidth={1.5} />
                                <p className="mt-6 font-grotesk text-xs font-semibold tracking-[0.3em] text-slate-400 dark:text-slate-500">
                                    0{i + 1}
                                </p>
                                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white">{p.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{p.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>

        {/* SOLUTIONS GRID */}
        <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32" data-testid="home-solutions">
            <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">Solutions</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
                    What We Help You Build
                </h2>
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {SOLUTIONS.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 0.1}>
                        <Link
                            to={`/solutions/${s.slug}`}
                            data-testid={`solution-card-${s.slug}`}
                            className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5 dark:border-slate-800 dark:bg-card dark:hover:border-electric/50"
                        >
                            <s.icon className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                            <h3 className="mt-5 font-display text-lg font-bold text-ink dark:text-white">{s.shortTitle}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.tagline}</p>
                            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand dark:text-electric">
                                Explore
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* VISION TEASER */}
        <section className="relative overflow-hidden bg-navy py-24 dark:bg-abyss sm:py-32" data-testid="home-vision-teaser">
            <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-electric">Our Vision</p>
                    <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Building the Future Through People and Technology
                    </h2>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
                        A future-ready technology ecosystem where quality education, real-world experience and industry collaboration create opportunity — for people, for businesses and for communities.
                    </p>
                </Reveal>
                <Reveal delay={0.15}>
                    <Link
                        to="/vision"
                        data-testid="vision-teaser-cta"
                        className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-sm font-bold text-navy transition-colors duration-300 hover:bg-electric hover:text-ink"
                    >
                        Discover Our Vision
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Reveal>
            </div>
        </section>

        <CTABand />
    </>
);

export default Home;
