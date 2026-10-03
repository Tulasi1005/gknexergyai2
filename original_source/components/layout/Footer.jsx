import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";

const columns = [
    {
        title: "Company",
        links: [
            { label: "About", to: "/about" },
            { label: "Vision & Mission", to: "/vision" },
            { label: "Why GK Nexergy", to: "/why-gk-nexergy" },
            { label: "Industries", to: "/industries" },
        ],
    },
    {
        title: "Solutions",
        links: [
            { label: "Software Development", to: "/solutions/software-development" },
            { label: "Mobile Development", to: "/solutions/mobile-development" },
            { label: "Digital Transformation", to: "/solutions/digital-transformation" },
            { label: "AI & Automation", to: "/solutions/ai-automation" },
            { label: "Data & Analytics", to: "/solutions/data-analytics" },
            { label: "Digital Growth", to: "/solutions/digital-growth" },
        ],
    },
    {
        title: "Academy",
        links: [
            { label: "Nexergy Academy", to: "/academy" },
            { label: "Courses", to: "/academy/courses" },
            { label: "Cyber Security", to: "/academy/cyber-security" },
            { label: "AI & Digital Marketing", to: "/academy/ai-digital-marketing" },
            { label: "Databases In-Depth", to: "/academy/databases" },
            { label: "Foundation Program", to: "/academy/foundation-program" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Projects", to: "/projects" },
            { label: "Careers", to: "/careers" },
            { label: "Contact", to: "/contact" },
        ],
    },
];

const Footer = () => (
    <footer className="border-t border-slate-200 bg-mist dark:border-slate-800 dark:bg-ink" data-testid="main-footer">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-6">
                <div className="lg:col-span-2">
                    <Link to="/" className="flex items-baseline gap-1.5" data-testid="footer-logo">
                        <span className="font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white">GK</span>
                        <span className="font-display text-2xl font-extrabold tracking-[0.12em] text-brand dark:text-electric">NEXERGY</span>
                    </Link>
                    <p className="mt-3 font-display text-sm font-bold tracking-wide text-navy dark:text-slate-200">
                        Train • Build • Transform
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        Empowering People. Enabling Businesses. Transforming Communities.
                    </p>
                    <div className="mt-6 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                        <p className="flex items-center gap-2.5">
                            <Mail className="h-4 w-4 text-brand dark:text-electric" />
                            <span data-testid="footer-email">Email — to be announced</span>
                        </p>
                        <p className="flex items-center gap-2.5">
                            <Phone className="h-4 w-4 text-brand dark:text-electric" />
                            <span data-testid="footer-phone">Phone — to be announced</span>
                        </p>
                        <p className="flex items-center gap-2.5">
                            <MapPin className="h-4 w-4 text-brand dark:text-electric" />
                            <span data-testid="footer-address">Office address — to be announced</span>
                        </p>
                    </div>
                </div>
                {columns.map((col) => (
                    <div key={col.title}>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand dark:text-electric">
                            {col.title}
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {col.links.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-slate-600 transition-colors hover:text-brand dark:text-slate-400 dark:hover:text-electric"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-14 flex flex-col gap-6 border-t border-slate-200 pt-8 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                        © {new Date().getFullYear()} GK Nexergy. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                            <span
                                key={i}
                                data-testid={`footer-social-${i}`}
                                title="Social link — coming soon"
                                className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-slate-300 text-slate-400 dark:border-slate-700 dark:text-slate-500"
                            >
                                <Icon className="h-4 w-4" />
                            </span>
                        ))}
                    </div>
                </div>
                <p className="select-none text-center font-display text-[13vw] font-extrabold leading-none tracking-tight text-navy/5 dark:text-white/5 lg:text-[10rem]">
                    NEXERGY
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
