import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Store, GraduationCap, Briefcase, ShoppingBag, HeartPulse, Landmark, Cpu, Building2 } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { INDUSTRIES } from "../data/site";
import "./Industries.css";

const icons = [Rocket, Store, GraduationCap, Briefcase, ShoppingBag, HeartPulse, Landmark, Cpu, Building2];

const industriesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Industry-Specific AI & Digital Solutions",
    "url": "https://gknexergy.com/industries",
    "description": "GK Nexergy delivers AI automation, data analytics, and digital transformation solutions tailored across key industry verticals.",
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": INDUSTRIES.map((ind, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": ind.name,
            "description": ind.detail
        }))
    }
};

const Industries = () => {
    const [activeCard, setActiveCard] = useState(null);

    const handleCardClick = (index) => {
        setActiveCard((prev) => (prev === index ? null : index));
    };

    return (
        <>
            <SEO
                title="Industry-Specific AI & Digital Solutions | GK Nexergy"
                description="Tailored AI solutions, business process automation, and digital transformation for healthcare, finance, retail, education, and enterprises."
                keywords="AI solutions for healthcare, AI solutions for finance, AI solutions for education, AI solutions for retail, industry digital transformation, enterprise automation"
                canonical="https://gknexergy.com/industries"
                schema={industriesSchema}
            />
            <PageHero
                eyebrow="Industries"
                titleLines={["Technology That Understands", "Your Industry."]}
                description="Every organisation is different. We adapt technology to your industry's realities, your organisation's requirements and your stage of growth."
                testId="industries-hero"
            />
            <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="industries-grid">
                <div className="industries-grid">
                    {INDUSTRIES.map((ind, i) => {
                        const Icon = icons[i] || Building2;
                        const isActive = activeCard === i;
                        return (
                            <Reveal key={ind.name} delay={(i % 3) * 0.08}>
                                <div
                                    className={`industry-card group ${isActive ? "is-active" : ""}`}
                                    data-testid={`industry-card-${i}`}
                                    onClick={() => handleCardClick(i)}
                                >
                                    {/* Image Wrapper: Initially 100% full height, shrinks on hover */}
                                    <div className="industry-card-img-wrap">
                                        <img
                                            src={ind.image}
                                            alt={ind.name}
                                            loading="lazy"
                                            className="industry-card-img"
                                        />
                                        <div className="industry-card-img-overlay" />
                                        
                                        {/* Category Badge */}
                                        <span className="industry-card-badge">
                                            {ind.category}
                                        </span>

                                        {/* Initial state title preview (fades out on hover) */}
                                        <div className="industry-card-preview-bar">
                                            <div className="industry-preview-pill">
                                                <Icon className="h-4 w-4 text-brand dark:text-electric" strokeWidth={2} />
                                                <span className="industry-preview-title">{ind.name}</span>
                                            </div>
                                            <span className="industry-preview-hint">
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Wrapper: Revealed below the image upon hover */}
                                    <div className="industry-card-content">
                                        <div className="industry-content-inner">
                                            <div className="industry-content-top">
                                                <div className="industry-content-header">
                                                    <div className="industry-icon-wrap">
                                                        <Icon className="h-5 w-5" strokeWidth={2} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand dark:text-electric">
                                                            {ind.category}
                                                        </span>
                                                        <h3 className="industry-content-title">
                                                            {ind.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <p className="industry-content-desc">
                                                    {ind.text}
                                                </p>

                                                {/* Highlights Tags */}
                                                {ind.highlights && (
                                                    <div className="industry-tags">
                                                        {ind.highlights.map((tag) => (
                                                            <span key={tag} className="industry-tag">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Link */}
                                            <Link
                                                to="/contact"
                                                className="industry-card-action"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <span>Discuss Your Challenge</span>
                                                <ArrowRight className="industry-action-arrow h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal>
                    <div className="mt-14 flex justify-center">
                        <Link
                            to="/contact"
                            data-testid="industries-cta"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink w-full sm:w-auto shadow-md hover:shadow-xl"
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
};

export default Industries;
