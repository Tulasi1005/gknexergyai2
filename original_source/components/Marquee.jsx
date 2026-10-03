import Marquee from "react-fast-marquee";

const items = ["TRAIN", "BUILD", "TRANSFORM", "PEOPLE", "TECHNOLOGY", "OPPORTUNITY"];

const EditorialMarquee = ({ className = "" }) => (
    <div className={`overflow-hidden border-y border-slate-200/80 py-6 dark:border-slate-800/80 ${className}`} data-testid="editorial-marquee">
        <Marquee speed={28} gradient={false} pauseOnHover={false}>
            {items.map((word, i) => (
                <span key={i} className="mx-6 flex items-center gap-12">
                    <span className={`font-display text-4xl sm:text-6xl font-extrabold tracking-tight ${i % 2 === 0 ? "text-navy/90 dark:text-white/90" : "text-outline"}`}>
                        {word}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-brand dark:bg-electric" aria-hidden="true" />
                </span>
            ))}
        </Marquee>
    </div>
);

export default EditorialMarquee;
