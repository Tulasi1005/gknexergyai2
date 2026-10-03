import { FolderKanban, Building2, AlertCircle, Wrench, Cpu, Target, Clock } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";

const frameworkFields = [
    { icon: FolderKanban, label: "Project Name", desc: "What the engagement was" },
    { icon: Building2, label: "Industry", desc: "The sector it served" },
    { icon: AlertCircle, label: "Problem", desc: "The challenge we were solving" },
    { icon: Wrench, label: "Solution", desc: "What we designed and built" },
    { icon: Cpu, label: "Technology", desc: "The stack behind the solution" },
    { icon: Target, label: "Outcome", desc: "The difference it made" },
];

const Projects = () => (
    <>
        <SEO
            title="Projects & Case Studies | GK Nexergy"
            description="Case studies from GK Nexergy — real problems, real solutions, real outcomes. Case studies coming soon."
        />
        <PageHero
            eyebrow="Projects & Case Studies"
            titleLines={["Real Problems.", "Real Solutions."]}
            description="Every engagement tells a story: a business challenge, a technology response and a measurable direction. Our case study library is being prepared — here's the framework each story will follow."
            testId="projects-hero"
        />

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="projects-framework">
            <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">The Framework</p>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
                    How We'll Tell Each Story
                </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {frameworkFields.map((f, i) => (
                    <Reveal key={f.label} delay={(i % 3) * 0.08}>
                        <div className={`h-full rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-card ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                            <f.icon className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                            <h3 className="mt-4 font-display text-lg font-bold text-ink dark:text-white">{f.label}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal delay={0.15}>
                <div className="mt-14 rounded-2xl border border-dashed border-brand/40 bg-ice/50 p-10 text-center dark:border-electric/40 dark:bg-navy/20 sm:p-16" data-testid="projects-coming-soon">
                    <Clock className="mx-auto h-8 w-8 text-brand dark:text-electric" strokeWidth={1.5} />
                    <h3 className="mt-5 font-display text-2xl font-extrabold text-ink dark:text-white">
                        Case Studies Coming Soon
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                        We're documenting our engagements carefully — real problems, honest solutions and outcomes we can stand behind. Check back soon.
                    </p>
                </div>
            </Reveal>
        </section>
        <CTABand
            title="Have a Project in Mind?"
            text="Your challenge could be our next case study. Let's start the conversation."
            primary={{ label: "Discuss Your Project", to: "/contact" }}
            secondary={{ label: "Explore Solutions", to: "/solutions" }}
        />
    </>
);

export default Projects;
