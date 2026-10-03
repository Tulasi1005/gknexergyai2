import { motion, useReducedMotion } from "framer-motion";
import { ECOSYSTEM_NODES } from "../data/site";

const Ecosystem = () => {
    const reduce = useReducedMotion();
    const radius = 42; // percent

    return (
        <div
            className="relative aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] mx-auto"
            data-testid="hero-ecosystem"
        >
            {/* orbital rings */}
            <div className="absolute inset-[8%] rounded-full border border-brand/20 dark:border-electric/20" />
            <div className="absolute inset-[22%] rounded-full border border-dashed border-brand/15 dark:border-electric/15" />
            <div className="absolute inset-[36%] rounded-full border border-brand/10 dark:border-electric/10" />

            {/* connecting lines */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                {ECOSYSTEM_NODES.map((_, i) => {
                    const angle = (i / ECOSYSTEM_NODES.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1="50" y1="50" x2={x} y2={y}
                            stroke="currentColor"
                            strokeWidth="0.2"
                            className="text-brand/30 dark:text-electric/30"
                        />
                    );
                })}
            </svg>

            {/* rotating node layer */}
            <motion.div
                className="absolute inset-0"
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
                {ECOSYSTEM_NODES.map((node, i) => {
                    const angle = (i / ECOSYSTEM_NODES.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    const Icon = node.icon;
                    return (
                        <div
                            key={node.label}
                            className="absolute"
                            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                        >
                            <motion.div
                                animate={reduce ? {} : { rotate: -360 }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                                    <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border border-brand/30 bg-white dark:bg-ink dark:border-electric/40 glow-blue">
                                        <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                                    </div>
                                    <span className="whitespace-nowrap rounded-full border border-slate-200 bg-white/90 px-2 py-0.5 text-[9px] sm:text-[11px] font-semibold tracking-wide text-navy dark:border-electric/30 dark:bg-abyss/90 dark:text-slate-200">
                                        {node.label}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>

            {/* center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-28 w-28 sm:h-40 sm:w-40 flex-col items-center justify-center rounded-full border-2 border-brand/50 bg-white text-center dark:border-electric/60 dark:bg-ink glow-blue"
                >
                    <span className="font-display text-lg sm:text-2xl font-extrabold tracking-tight text-navy dark:text-white">
                        GK
                    </span>
                    <span className="font-display text-sm sm:text-lg font-bold tracking-[0.18em] text-brand dark:text-electric">
                        NEXERGY
                    </span>
                    <span className="mt-1 text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                        Train • Build • Transform
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default Ecosystem;
