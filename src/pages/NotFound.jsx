import { Link } from "react-router-dom";
import { ArrowRight, Home, BrainCircuit, Building2, GraduationCap, Phone } from "lucide-react";
import SEO from "../components/SEO";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
            <SEO
                title="404 — Page Not Found | GK Nexergy"
                description="The page you are looking for does not exist. Explore GK Nexergy's enterprise AI solutions, digital transformation services, and academy programs."
                noindex={true}
            />

            {/* Background Gradients */}
            <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />
            <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[140px]" />

            <div className="relative z-10 max-w-2xl w-full text-center">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 inline-block mb-4">
                    404 Error
                </span>

                <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
                    Page Not Found
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                    The link you followed may be broken or the page may have been moved. Let us help you find what you are looking for.
                </p>

                {/* Helpful navigation grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
                    <Link
                        to="/home"
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 group"
                    >
                        <div className="h-9 w-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                            <Home className="h-4 w-4" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-white group-hover:text-cyan-400 block transition-colors">
                                Homepage
                            </span>
                            <span className="text-[11px] text-slate-400">Discover our digital ecosystem</span>
                        </div>
                    </Link>

                    <Link
                        to="/solutions"
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 group"
                    >
                        <div className="h-9 w-9 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                            <BrainCircuit className="h-4 w-4" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-white group-hover:text-cyan-400 block transition-colors">
                                AI & Solutions
                            </span>
                            <span className="text-[11px] text-slate-400">Explore enterprise solutions</span>
                        </div>
                    </Link>

                    <Link
                        to="/industries"
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 group"
                    >
                        <div className="h-9 w-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                            <Building2 className="h-4 w-4" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-white group-hover:text-cyan-400 block transition-colors">
                                Industries
                            </span>
                            <span className="text-[11px] text-slate-400">Sector-specific solutions</span>
                        </div>
                    </Link>

                    <Link
                        to="/contact"
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 group"
                    >
                        <div className="h-9 w-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                            <Phone className="h-4 w-4" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-white group-hover:text-cyan-400 block transition-colors">
                                Contact Us
                            </span>
                            <span className="text-[11px] text-slate-400">Get in touch with our team</span>
                        </div>
                    </Link>
                </div>

                <Link
                    to="/home"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 transition-colors shadow-lg shadow-blue-600/25"
                >
                    <span>Back to Homepage</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
