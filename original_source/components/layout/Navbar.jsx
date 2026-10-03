import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { NAV } from "../../data/site";

const Dropdown = ({ label, items, testId }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                data-testid={testId}
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-brand dark:text-slate-200 dark:hover:text-electric"
                aria-expanded={open}
            >
                {label}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3"
                    >
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-navy/5 dark:border-slate-800 dark:bg-ink dark:shadow-black/40">
                            {items.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    data-testid={`nav-${item.to.replaceAll("/", "-").slice(1)}`}
                                    className="group block rounded-xl px-4 py-3 transition-colors hover:bg-ice dark:hover:bg-navy/30"
                                >
                                    <span className="block text-sm font-bold text-ink group-hover:text-brand dark:text-white dark:group-hover:text-electric">
                                        {item.label}
                                    </span>
                                    <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                                        {item.desc}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileSection = ({ label, items, onNavigate }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 dark:border-slate-800">
            <button
                data-testid={`mobile-nav-${label.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between px-2 py-4 font-display text-base font-bold text-ink dark:text-white"
            >
                {label}
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-3">
                            {items.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={onNavigate}
                                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-ice hover:text-brand dark:text-slate-300 dark:hover:bg-navy/30"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Navbar = ({ theme, onToggleTheme }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const linkCls = ({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            isActive
                ? "text-brand dark:text-electric"
                : "text-slate-700 hover:text-brand dark:text-slate-200 dark:hover:text-electric"
        }`;

    return (
        <header className="glass-header fixed inset-x-0 top-0 z-50" data-testid="main-navbar">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-8">
                <Link to="/" data-testid="nav-logo" className="flex items-baseline gap-1.5">
                    <span className="font-display text-xl font-extrabold tracking-tight text-ink dark:text-white">GK</span>
                    <span className="font-display text-xl font-extrabold tracking-[0.12em] text-brand dark:text-electric">
                        NEXERGY
                    </span>
                </Link>

                <nav className="hidden items-center lg:flex" aria-label="Primary">
                    <Dropdown label="Company" items={NAV.company} testId="nav-company-dropdown" />
                    <Dropdown label="Solutions" items={NAV.solutions} testId="nav-solutions-dropdown" />
                    <Dropdown label="Academy" items={NAV.academy} testId="nav-academy-dropdown" />
                    <NavLink to="/projects" data-testid="nav-projects" className={linkCls}>Projects</NavLink>
                    <NavLink to="/careers" data-testid="nav-careers" className={linkCls}>Careers</NavLink>
                    <NavLink to="/contact" data-testid="nav-contact" className={linkCls}>Contact</NavLink>
                </nav>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        data-testid="theme-toggle"
                        onClick={onToggleTheme}
                        aria-label="Toggle light and dark theme"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300 dark:hover:border-electric dark:hover:text-electric"
                    >
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <Link
                        to="/contact"
                        data-testid="nav-cta"
                        className="group hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink sm:inline-flex"
                    >
                        Start a Conversation
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <button
                        data-testid="mobile-menu-toggle"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Open menu"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200 lg:hidden"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-abyss lg:hidden"
                        data-testid="mobile-menu"
                    >
                        <MobileSection label="Company" items={NAV.company} onNavigate={() => setMobileOpen(false)} />
                        <MobileSection label="Solutions" items={NAV.solutions} onNavigate={() => setMobileOpen(false)} />
                        <MobileSection label="Academy" items={NAV.academy} onNavigate={() => setMobileOpen(false)} />
                        <div className="flex flex-col py-3">
                            {[
                                { label: "Projects", to: "/projects" },
                                { label: "Careers", to: "/careers" },
                                { label: "Contact", to: "/contact" },
                            ].map((l) => (
                                <Link
                                    key={l.to}
                                    to={l.to}
                                    data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                                    className="border-b border-slate-100 px-2 py-4 font-display text-base font-bold text-ink dark:border-slate-800 dark:text-white"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                        <Link
                            to="/contact"
                            data-testid="mobile-nav-cta"
                            className="mb-4 mt-2 flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-display text-sm font-bold text-white"
                        >
                            Start a Conversation <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
