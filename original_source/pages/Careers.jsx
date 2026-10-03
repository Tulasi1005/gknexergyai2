import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, GraduationCap, Cpu, BookOpen, BellRing } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";

const paths = [
    { icon: Briefcase, title: "Current Opportunities", text: "Roles across our solutions and academy teams as the ecosystem grows." },
    { icon: BookOpen, title: "Learning Opportunities", text: "Programs that build industry-relevant skills through Nexergy Academy." },
    { icon: Cpu, title: "Technology Roles", text: "Work across software engineering, AI, data, cloud and digital growth." },
    { icon: GraduationCap, title: "Training Opportunities", text: "Mentored pathways for students, graduates and career returnees." },
];

const Careers = () => (
    <>
        <SEO
            title="Careers | GK Nexergy"
            description="Build your future with GK Nexergy — contributing to future-ready technology talent."
        />
        <PageHero
            eyebrow="Careers"
            titleLines={["Build Your Future", "With GK Nexergy."]}
            description="GK Nexergy aims to contribute to future-ready technology talent — people who can build, deliver and transform. As our ecosystem grows, so will the opportunities within it."
            testId="careers-hero"
        />
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="careers-paths">
            <div className="grid gap-5 sm:grid-cols-2">
                {paths.map((p, i) => (
                    <Reveal key={p.title} delay={(i % 2) * 0.1}>
                        <div className="flex h-full gap-5 rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 dark:border-slate-800 dark:bg-card dark:hover:border-electric/40 sm:p-8">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ice dark:bg-navy/40">
                                <p.icon className="h-5 w-5 text-brand dark:text-electric" strokeWidth={1.6} />
                            </div>
                            <div>
                                <h2 className="font-display text-lg font-bold text-ink dark:text-white sm:text-xl">{p.title}</h2>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.text}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
            <Reveal delay={0.15}>
                <div className="mt-14 rounded-2xl border border-dashed border-brand/40 bg-ice/50 p-10 text-center dark:border-electric/40 dark:bg-navy/20 sm:p-14" data-testid="careers-vacancies">
                    <BellRing className="mx-auto h-8 w-8 text-brand dark:text-electric" strokeWidth={1.5} />
                    <h2 className="mt-5 font-display text-2xl font-extrabold text-ink dark:text-white">
                        We're growing our ecosystem.
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                        Check back for upcoming opportunities — or introduce yourself now, and we'll keep you in mind as roles open.
                    </p>
                    <Link
                        to="/contact"
                        data-testid="careers-intro-cta"
                        className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
                    >
                        Introduce Yourself
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </Reveal>
        </section>
        <CTABand
            title="Grow Where Technology Meets Purpose."
            text="Join an ecosystem built on training people, building technology and transforming communities."
            primary={{ label: "Get in Touch", to: "/contact" }}
            secondary={{ label: "Explore Academy", to: "/academy" }}
        />
    </>
);

export default Careers;
