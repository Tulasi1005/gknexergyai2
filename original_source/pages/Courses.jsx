import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { COURSES } from "../data/site";

const Courses = () => (
    <>
        <SEO
            title="Courses | Nexergy Academy"
            description="Learn technology that moves with the industry — Cyber Security, AI Tools & Digital Marketing, Databases In-Depth and the Foundation Program."
        />
        <PageHero
            eyebrow="Nexergy Academy — Courses"
            titleLines={["Learn Technology That Moves", "With the Industry."]}
            description="Practical programs designed by industry professionals — built around current tools, real projects and honest skill development."
            testId="courses-hero"
        />
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="courses-grid">
            <div className="grid gap-6 sm:grid-cols-2">
                {COURSES.map((c, i) => (
                    <Reveal key={c.slug} delay={(i % 2) * 0.1}>
                        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5 dark:border-slate-800 dark:bg-card dark:hover:border-electric/50" data-testid={`course-card-${c.slug}`}>
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={c.image}
                                    alt={c.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                                <span className="absolute left-5 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy dark:bg-ink/80 dark:text-electric">
                                    {c.category}
                                </span>
                                <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                                    <c.icon className="h-5 w-5 text-electric" strokeWidth={1.6} />
                                    <span className="font-display text-lg font-extrabold text-white">{c.title}</span>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-7">
                                <p className="text-sm font-semibold text-brand dark:text-electric">{c.subtitle}</p>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{c.description}</p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {c.topics.slice(0, 4).map((t) => (
                                        <span key={t} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Who it's for: </span>
                                    {c.audience}
                                </p>
                                <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                                    <Link
                                        to={`/academy/${c.slug}`}
                                        data-testid={`course-explore-${c.slug}`}
                                        className="group/link inline-flex items-center gap-2 font-display text-sm font-bold text-brand dark:text-electric"
                                    >
                                        View Course
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        data-testid={`course-enquire-${c.slug}`}
                                        className="ml-auto inline-flex items-center gap-2 rounded-full border border-brand/40 px-5 py-2 text-xs font-bold text-brand transition-colors hover:bg-brand hover:text-white dark:border-electric/40 dark:text-electric dark:hover:bg-electric dark:hover:text-ink"
                                    >
                                        Enquire About This Course
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
        <CTABand
            title="Not Sure Which Course Fits You?"
            text="Tell us where you are and where you want to go — we'll help you choose the right starting point."
            primary={{ label: "Talk to Us", to: "/contact" }}
            secondary={{ label: "About the Academy", to: "/academy" }}
        />
    </>
);

export default Courses;
