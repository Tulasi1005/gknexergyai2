import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

const INTERESTS = [
    "Software Development",
    "Mobile Development",
    "AI & Automation",
    "Data & Analytics",
    "Digital Transformation",
    "Digital Growth",
    "Training",
    "Partnership",
    "Other",
];

const inputCls =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-ink dark:text-white dark:focus:border-electric dark:focus:ring-electric/20";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", interest: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <SEO
                title="Contact | GK Nexergy"
                description="Start a conversation with GK Nexergy — tell us what you're trying to build, transform or learn."
            />
            <PageHero
                eyebrow="Contact"
                titleLines={["Start a Conversation."]}
                description="Tell us what you're trying to build, transform or learn."
                testId="contact-hero"
            />

            <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
                <div className="grid gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        {submitted ? (
                            <Reveal>
                                <div className="rounded-2xl border border-brand/30 bg-ice/60 p-10 text-center dark:border-electric/40 dark:bg-navy/20 sm:p-14" data-testid="contact-success">
                                    <CheckCircle2 className="mx-auto h-10 w-10 text-brand dark:text-electric" strokeWidth={1.5} />
                                    <h2 className="mt-5 font-display text-2xl font-extrabold text-ink dark:text-white">
                                        Thank You, {form.name.split(" ")[0] || "Friend"}.
                                    </h2>
                                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                                        Your message about <span className="font-semibold">{form.interest || "your enquiry"}</span> has been noted. Our team will be in touch soon.
                                    </p>
                                    <button
                                        data-testid="contact-send-another"
                                        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", company: "", interest: "", message: "" }); }}
                                        className="mt-7 rounded-full border border-brand/40 px-6 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white dark:border-electric/40 dark:text-electric dark:hover:bg-electric dark:hover:text-ink"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            </Reveal>
                        ) : (
                            <Reveal>
                                <form onSubmit={onSubmit} className="space-y-5" data-testid="contact-form">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Name *</label>
                                            <input id="contact-name" data-testid="contact-name" required value={form.name} onChange={update("name")} placeholder="Your full name" className={inputCls} />
                                        </div>
                                        <div>
                                            <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Email *</label>
                                            <input id="contact-email" data-testid="contact-email" type="email" required value={form.email} onChange={update("email")} placeholder="you@example.com" className={inputCls} />
                                        </div>
                                        <div>
                                            <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Phone</label>
                                            <input id="contact-phone" data-testid="contact-phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="Your phone number" className={inputCls} />
                                        </div>
                                        <div>
                                            <label htmlFor="contact-company" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Company / Organization</label>
                                            <input id="contact-company" data-testid="contact-company" value={form.company} onChange={update("company")} placeholder="Where you work" className={inputCls} />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="contact-interest" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Interest *</label>
                                        <select id="contact-interest" data-testid="contact-interest" required value={form.interest} onChange={update("interest")} className={inputCls}>
                                            <option value="" disabled>Select an area of interest</option>
                                            {INTERESTS.map((i) => (
                                                <option key={i} value={i}>{i}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Message *</label>
                                        <textarea id="contact-message" data-testid="contact-message" required rows={6} value={form.message} onChange={update("message")} placeholder="Tell us what you're trying to build, transform or learn…" className={inputCls} />
                                    </div>
                                    <button
                                        type="submit"
                                        data-testid="contact-submit"
                                        className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
                                    >
                                        Let's Connect
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </form>
                            </Reveal>
                        )}
                    </div>
                    <div className="lg:col-span-5">
                        <Reveal delay={0.15}>
                            <div className="rounded-2xl bg-mist p-8 dark:bg-ink sm:p-10" data-testid="contact-details">
                                <h2 className="font-display text-xl font-extrabold text-ink dark:text-white">Reach Us Directly</h2>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Our official contact channels are being finalised. Details will be published here soon.
                                </p>
                                <div className="mt-8 space-y-5">
                                    {[
                                        { icon: Mail, label: "Email", value: "To be announced", testId: "contact-email-placeholder" },
                                        { icon: Phone, label: "Phone", value: "To be announced", testId: "contact-phone-placeholder" },
                                        { icon: MapPin, label: "Office Address", value: "To be announced", testId: "contact-address-placeholder" },
                                        { icon: Linkedin, label: "LinkedIn", value: "To be announced", testId: "contact-linkedin-placeholder" },
                                    ].map((d) => (
                                        <div key={d.label} className="flex items-center gap-4" data-testid={d.testId}>
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-card">
                                                <d.icon className="h-5 w-5 text-brand dark:text-electric" strokeWidth={1.6} />
                                            </span>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{d.label}</p>
                                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{d.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 rounded-xl border border-brand/25 bg-white p-5 dark:border-electric/30 dark:bg-card">
                                    <p className="font-display text-sm font-bold text-navy dark:text-white">Train • Build • Transform</p>
                                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                        Empowering People. Enabling Businesses. Transforming Communities.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
