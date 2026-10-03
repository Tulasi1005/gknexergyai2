import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ECOSYSTEM_NODES } from "../data/site";

const Ecosystem = ({ activeIndex = 0, onSelectNode }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [tooltipPlacement, setTooltipPlacement] = useState("top");
    const containerRef = useRef(null);
    const reduce = useReducedMotion();
    const navigate = useNavigate();
    const radius = 38.5; // percent - harmonious orbital clearance across all devices

    const handleNodeHover = (e, i) => {
        if (containerRef.current && e.currentTarget) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const nodeRect = e.currentTarget.getBoundingClientRect();
            const containerCenterY = containerRect.top + containerRect.height / 2;
            const nodeCenterY = nodeRect.top + nodeRect.height / 2;

            // Nodes in upper half open UPWARDS; nodes in lower half open DOWNWARDS
            const isAbove = nodeCenterY <= containerCenterY;
            setTooltipPlacement(isAbove ? "top" : "bottom");
        }
        setHoveredIndex(i);
        onSelectNode && onSelectNode(i);
    };

    const handleNodeClick = (e, node, i) => {
        e.stopPropagation();
        handleNodeHover(e, i);
        if (node?.to) {
            navigate(node.to);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative aspect-square w-full max-w-[240px] sm:max-w-[360px] lg:max-w-[440px] xl:max-w-[465px] mx-auto lg:ml-auto lg:mr-0 py-2 overflow-visible"
            data-testid="hero-ecosystem"
        >
            {/* orbital rings */}
            <div className="absolute inset-[11.5%] rounded-full border border-brand/20 dark:border-electric/20 pointer-events-none" />
            <div className="absolute inset-[23%] rounded-full border border-dashed border-brand/15 dark:border-electric/15 pointer-events-none" />
            <div className="absolute inset-[35%] rounded-full border border-brand/10 dark:border-electric/10 pointer-events-none" />

            {/* connecting lines */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" aria-hidden="true">
                {ECOSYSTEM_NODES.map((_, i) => {
                    const angle = (i / ECOSYSTEM_NODES.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1="50" y1="50" x2={x} y2={y}
                            stroke="currentColor"
                            strokeWidth="0.25"
                            className="text-brand/30 dark:text-electric/30 transition-colors"
                        />
                    );
                })}
            </svg>

            {/* center emblem */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{ zIndex: 10 }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="ecosystem-center-circle"
                >
                    <img
                        src="/images/globe1.gif"
                        alt="GK Nexergy Logo"
                        className="ecosystem-center-img"
                    />
                </motion.div>
            </div>

            {/* rotating node layer */}
            <motion.div
                className="absolute inset-0 z-50 pointer-events-none"
                style={{ zIndex: 50 }}
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
                {ECOSYSTEM_NODES.map((node, i) => {
                    const angle = (i / ECOSYSTEM_NODES.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    const Icon = node.icon;
                    const isActive = i === activeIndex;
                    return (
                        <div
                            key={node.label}
                            className="absolute pointer-events-auto cursor-pointer"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: "translate(-50%, -50%)",
                                zIndex: hoveredIndex === i ? 100 : 20,
                            }}
                            onClick={(e) => {
                                handleNodeClick(e, node, i);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleNodeClick(e, node, i);
                                }
                            }}
                            onMouseEnter={(e) => {
                                handleNodeHover(e, i);
                            }}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onFocus={(e) => {
                                handleNodeHover(e, i);
                            }}
                            onBlur={() => setHoveredIndex(null)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Open ${node.label}`}
                            title={`${node.label}`}
                        >
                            <motion.div
                                animate={reduce ? {} : { rotate: -360 }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                className="relative flex flex-col items-center"
                            >
                                <div className="ecosystem-node-stack">
                                    <div className={`relative ecosystem-node-box ${isActive ? "ecosystem-node-box-active" : ""}`}>
                                        <Icon className={`ecosystem-node-icon ${isActive ? "ecosystem-node-icon-active" : ""}`} strokeWidth={2.2} />
                                        {isActive && (
                                            <span className="absolute -inset-1 rounded-[14px] border-2 border-brand dark:border-electric animate-ping opacity-60 pointer-events-none" />
                                        )}
                                    </div>
                                    <span className={`ecosystem-node-pill ${isActive ? "ecosystem-node-pill-active" : ""}`}>
                                        {node.label}
                                    </span>
                                </div>

                                {/* Rich Responsive Interactive Floating Tooltip */}
                                <AnimatePresence>
                                    {hoveredIndex === i && (
                                        <motion.div
                                            initial={{ opacity: 0, y: tooltipPlacement === "top" ? 6 : -6, scale: 0.94 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: tooltipPlacement === "top" ? 4 : -4, scale: 0.96 }}
                                            transition={{ duration: 0.18, ease: "easeOut" }}
                                            className={`ecosystem-tooltip-wrapper ${tooltipPlacement === "top" ? "ecosystem-tooltip-wrapper-top" : "ecosystem-tooltip-wrapper-bottom"}`}
                                            style={{ zIndex: 9999 }}
                                        >
                                            <div
                                                className={`ecosystem-tooltip-card ${isActive ? "ecosystem-tooltip-card-active" : ""}`}
                                                onClick={(e) => handleNodeClick(e, node, i)}
                                            >
                                                {/* Node Name */}
                                                <div className="ecosystem-tooltip-title">
                                                    {node.label}
                                                </div>

                                                {/* Description */}
                                                <p className="ecosystem-tooltip-desc">
                                                    {node.desc}
                                                </p>

                                                {/* Small Triangle */}
                                                <div className="ecosystem-tooltip-arrow" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Ecosystem;