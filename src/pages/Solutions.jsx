import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { SOLUTIONS } from "../data/site";

const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Enterprise AI & Technology Solutions",
    "url": "https://gknexergy.com/solutions",
    "description": "GK Nexergy delivers enterprise AI solutions, business process automation, digital transformation, and advanced analytics.",
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": SOLUTIONS.map((s, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": s.title,
            "url": `https://gknexergy.com/solutions/${s.slug}`,
            "description": s.description
        }))
    }
};

const Solutions = () => (
    <>
        <SEO
            title="Enterprise AI & Digital Transformation Solutions | GK Nexergy"
            description="Explore GK Nexergy's end-to-end solutions: AI automation, digital transformation, data analytics, custom software engineering, and intelligent business workflows."
            keywords="AI solutions for businesses, AI automation services, digital transformation services, business automation solutions, data analytics solutions, custom software development, enterprise AI"
            canonical="https://gknexergy.com/solutions"
            schema={solutionsSchema}
        />
        <PageHero
            eyebrow="Solutions"
            titleLines={["Technology Solutions Built", "Around Your Business."]}
            description="Right Technology. Right Problem. Right Time. We design and deliver solutions that fit your business — not the other way around."
            testId="solutions-hero"
        />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28" data-testid="solutions-grid">
            <div className="featured-capabilities-grid">
                {SOLUTIONS.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 0.1} className="grid-cell-stretch">
                        <Link
                            to={`/solutions/${s.slug}`}
                            data-testid={`solutions-card-${s.slug}`}
                            className="group pro-card"
                        >
                            {/* Card Image Banner */}
                            <div className="pro-card-img-wrap">
                                <img
                                    src={s.image}
                                    alt={s.title}
                                    className="pro-card-img"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                
                                {/* Floating Category Icon */}
                                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-brand shadow-md backdrop-blur dark:bg-ink/90 dark:text-electric">
                                        <s.icon className="h-5 w-5" strokeWidth={1.8} />
                                    </div>
                                </div>

                                {/* Step / Card Number */}
                                <span className="absolute top-3 right-3 rounded-full bg-slate-900/70 px-2.5 py-0.5 font-grotesk text-xs font-semibold text-white/90 backdrop-blur">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="pro-card-body">
                                <p className="pro-card-eyebrow">
                                    {s.tagline}
                                </p>
                                <h2 className="pro-card-title">
                                    {s.title}
                                </h2>
                                <p className="pro-card-desc">
                                    {s.description}
                                </p>

                                {/* Features pill tags */}
                                {s.features && (
                                    <div className="pro-card-tags">
                                        {s.features.slice(0, 3).map((feat) => (
                                            <span
                                                key={feat}
                                                className="pro-card-tag"
                                            >
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="pro-card-footer">
                                    <span className="pro-card-action">
                                        Explore Solution
                                        <ArrowRight className="pro-card-arrow h-4 w-4" />
                                    </span>
                                </div>
                            </div>
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
