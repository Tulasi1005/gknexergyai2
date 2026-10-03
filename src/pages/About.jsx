import { Link } from "react-router-dom";
import { ArrowRight, Users, Cpu, Factory, DoorOpen, Compass, FlaskConical, Briefcase, HeartHandshake, Sparkles, MapPin, Building, TrendingUp } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/site";

const sections = [
    {
        id: "story",
        title: "Our Story",
        text: "GK Nexergy was founded by professionals with over 25 years of IT industry experience — spanning software development, project delivery, and enterprise architecture. That experience shapes everything we do: how we teach, how we build and how we help organisations adopt technology with confidence.",
        items: [],
    },
    {
        id: "what-we-do",
        title: "What We Do",
        text: "We operate across software solutions, academy programs, and digital transformation — one connected ecosystem of technology capability.",
        items: ["Technology", "Software solutions", "Digital transformation", "AI", "Data", "Digital growth"],
        icons: [Users, Cpu, Sparkles, Compass, Factory, TrendingUp],
    },
    {
        id: "ecosystem",
        title: "Our Ecosystem",
        text: "Everything we do connects four forces — because technology only matters when it creates opportunity for people and value for industry.",
        items: ["People", "Technology", "Industry", "Opportunity"],
        icons: [Users, Cpu, Factory, DoorOpen],
    },
    {
        id: "approach",
        title: "Our Approach",
        text: "We work the way experienced technology teams work — practically, honestly and focused on outcomes.",
        items: ["Industry expertise", "Practical learning", "Real-world projects", "Mentorship", "Emerging technologies"],
        icons: [Compass, FlaskConical, Briefcase, HeartHandshake, Sparkles],
    },
    {
        id: "impact",
        title: "Our Impact",
        text: "We are committed to building a future-ready workforce — especially where opportunity is needed most.",
        items: ["Local talent", "Rural communities", "Semi-urban communities", "Underserved communities", "Future-ready workforce"],
        icons: [Users, MapPin, Building, HeartHandshake, TrendingUp],
    },
];

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About GK Nexergy",
    "url": "https://gknexergy.com/about",
    "description": "GK Nexergy is an enterprise AI and digital transformation solutions company founded by industry veterans with 25+ years of IT experience.",
    "mainEntity": {
        "@type": "Organization",
        "name": "GK Nexergy",
        "url": "https://gknexergy.com",
        "logo": "https://gknexergy.com/images/center.png",
        "knowsAbout": [
            "AI Solutions",
            "Business Process Automation",
            "Digital Transformation",
            "Data Analytics",
            "Cloud Platforms",
            "Workforce Development"
        ]
    }
};

const About = () => (
    <>
        <SEO
            title="About Us | AI & Digital Transformation Partner | GK Nexergy"
            description="Learn how GK Nexergy empowers enterprises through cutting-edge AI solutions, digital transformation, and business automation backed by 25+ years of IT leadership."
            keywords="AI technology company, digital transformation company, AI solutions provider, business automation company, technology partner, enterprise IT solutions"
            canonical="https://gknexergy.com/about"
            schema={aboutSchema}
        />
        <PageHero
            eyebrow="About GK Nexergy"
            titleLines={["Technology Built Around People.", "Solutions Built Around Purpose."]}
            description="GK Nexergy is a technology, skill development, and software solutions company founded by professionals with over 25 years of IT industry experience and extensive expertise in software development, project delivery, and workforce development."
            testId="about-hero"
        >
            <div className="relative overflow-hidden rounded-2xl" data-testid="about-hero-image">
                <video
            src="/images/GKpromo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="ecosystem-center-img"
        />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                
            </div>
        </PageHero>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
            <div className="space-y-20">
                {sections.map((sec, idx) => (
                    <Reveal key={sec.id}>
                        <div className="grid gap-8 lg:grid-cols-12" data-testid={`about-section-${sec.id}`}>
                            <div className="lg:col-span-4">
                                <p className="font-grotesk text-sm font-semibold tracking-[0.3em] text-brand/60 dark:text-electric/60">
                                    {String(idx + 1).padStart(2, "0")}
                                </p>
                                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
                                    {sec.title}
                                </h2>
                            </div>
                            <div className="lg:col-span-8">
                                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">{sec.text}</p>
                                {sec.items.length > 0 && (
                                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {sec.items.map((item, i) => {
                                            const Icon = sec.icons[i];
                                            return (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:border-brand/40 dark:border-slate-800 dark:bg-card dark:hover:border-electric/40"
                                                >
                                                    <Icon className="h-5 w-5 shrink-0 text-brand dark:text-electric" strokeWidth={1.6} />
                                                    <span className="text-sm font-semibold text-ink dark:text-slate-100">{item}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
            <Reveal>
                <div className="mt-20">
                    <Link
                        to="/vision"
                        data-testid="about-vision-cta"
                        className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
                    >
                        Explore Our Vision
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </Reveal>
        </section>
        <CTABand />
    </>
);

export default About;
