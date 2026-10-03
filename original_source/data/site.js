import {
    Code2, Smartphone, RefreshCw, BrainCircuit, BarChart3, TrendingUp,
    ShieldCheck, Megaphone, Database, Layers, Cloud, GraduationCap,
} from "lucide-react";

export const SOLUTIONS = [
    {
        slug: "software-development",
        icon: Code2,
        title: "Software Development",
        shortTitle: "Software & Application Engineering",
        tagline: "Software Built Around Your Business.",
        description:
            "We design and engineer web applications, custom software and business platforms that fit the way your organisation actually works — scalable, maintainable and built for real users.",
        features: [
            "Web applications",
            "Custom software",
            "Business platforms",
            "API development",
            "Workflow systems",
            "Scalable architecture",
        ],
        flow: ["Discover", "Design", "Develop", "Deploy", "Improve"],
        cta: "Discuss Your Software Project",
        image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1600&auto=format&fit=crop",
        visual: "architecture",
    },
    {
        slug: "mobile-development",
        icon: Smartphone,
        title: "Mobile Application Development",
        shortTitle: "Mobile Applications",
        tagline: "Mobile Experiences Designed for Real Users.",
        description:
            "From customer-facing apps to internal business tools, we build mobile experiences that are fast, reliable and designed around the people who use them every day.",
        features: [
            "Android applications",
            "iOS applications",
            "Cross-platform applications",
            "Business applications",
            "Customer applications",
            "Scalable mobile architecture",
        ],
        flow: ["Discover", "Design", "Develop", "Deploy", "Improve"],
        cta: "Build a Mobile Solution",
        image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1600&auto=format&fit=crop",
        visual: "mobile",
    },
    {
        slug: "digital-transformation",
        icon: RefreshCw,
        title: "Digital Transformation",
        shortTitle: "Digital Transformation",
        tagline: "From Manual Processes to Digital Possibilities.",
        description:
            "We enable businesses to transition from traditional and manual processes toward scalable, technology-enabled operating models — at the pace your organisation can absorb.",
        features: [
            "Process digitisation",
            "Workflow automation readiness",
            "Technology roadmapping",
            "Systems integration",
            "Change enablement",
            "Scalable operating models",
        ],
        flow: ["Manual", "Connected", "Automated", "Intelligent"],
        cta: "Start Your Transformation",
        image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1600&auto=format&fit=crop",
        visual: "transformation",
    },
    {
        slug: "ai-automation",
        icon: BrainCircuit,
        title: "AI & Automation",
        shortTitle: "AI & Automation",
        tagline: "Turn Data and Workflows Into Intelligent Systems.",
        description:
            "We help organisations apply AI and automation where it genuinely adds value — intelligent workflows, decision support and process automation grounded in your real operations.",
        features: [
            "AI automation",
            "Intelligent workflows",
            "Generative AI",
            "Predictive capabilities",
            "Decision support",
            "Process automation",
            "Personalization",
        ],
        flow: ["Data", "Model", "Automate", "Assist", "Learn"],
        cta: "Explore AI for Your Business",
        image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1600&auto=format&fit=crop",
        visual: "ai",
    },
    {
        slug: "data-analytics",
        icon: BarChart3,
        title: "Data & Analytics",
        shortTitle: "Data & Analytics",
        tagline: "Turn Business Data Into Better Decisions.",
        description:
            "We transform fragmented business information into actionable intelligence — from databases and reporting to business intelligence and data engineering.",
        features: [
            "Data analytics",
            "Database solutions",
            "Reporting",
            "Business intelligence",
            "Data engineering",
        ],
        flow: ["Data", "Insight", "Decision", "Action"],
        cta: "Unlock Your Data",
        image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1600&auto=format&fit=crop",
        visual: "data",
    },
    {
        slug: "digital-growth",
        icon: TrendingUp,
        title: "Digital Growth",
        shortTitle: "Digital Growth",
        tagline: "Build a Stronger Digital Presence.",
        description:
            "We help organisations strengthen their digital presence — combining digital strategy, brand visibility and AI-powered marketing tools to reach and engage the right audiences.",
        features: [
            "Digital marketing",
            "Brand visibility",
            "Customer reach",
            "Digital strategy",
            "AI-powered marketing tools",
            "Market engagement",
        ],
        flow: ["Presence", "Reach", "Engage", "Convert", "Grow"],
        cta: "Grow With Us",
        image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1600&auto=format&fit=crop",
        visual: "growth",
    },
];

export const COURSES = [
    {
        slug: "cyber-security",
        icon: ShieldCheck,
        category: "Security",
        title: "Cyber Security",
        subtitle: "Ethical Hacking",
        tagline: "Learn to Think Like an Attacker. Defend Like a Professional.",
        description:
            "A practical cyber security program covering security fundamentals and ethical hacking — built around hands-on labs, real attack surfaces and defensive thinking.",
        topics: [
            "Cyber security fundamentals",
            "Ethical hacking methodology",
            "Network & system security",
            "Vulnerability assessment",
            "Web application security",
            "Security tooling & labs",
        ],
        outcomes: [
            "Understand how attacks are planned and executed",
            "Assess systems for common vulnerabilities",
            "Apply defensive and hardening practices",
            "Work confidently with industry security tools",
        ],
        audience: "Students, graduates and professionals who want to enter or move into cyber security.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    },
    {
        slug: "ai-digital-marketing",
        icon: Megaphone,
        category: "AI & Growth",
        title: "AI Tools & Digital Marketing",
        subtitle: "AI-Assisted Growth",
        tagline: "Market Smarter With AI at Your Side.",
        description:
            "A practical program on using modern AI tools across digital marketing — from AI-assisted content and productivity to digital growth strategy and real campaign applications.",
        topics: [
            "AI tools for marketing",
            "Digital marketing fundamentals",
            "AI-assisted content creation",
            "Productivity with AI",
            "Digital growth strategy",
            "Practical campaign applications",
        ],
        outcomes: [
            "Use AI tools confidently in daily marketing work",
            "Plan and execute digital campaigns",
            "Create AI-assisted content responsibly",
            "Measure and improve digital growth efforts",
        ],
        audience: "Students, marketers, entrepreneurs and professionals looking to combine AI with digital marketing.",
        image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1600&auto=format&fit=crop",
    },
    {
        slug: "databases",
        icon: Database,
        category: "Data",
        title: "Databases In-Depth",
        subtitle: "SQL & PostgreSQL",
        tagline: "Master the Layer Every Application Depends On.",
        description:
            "A deep, practical program on databases — from fundamentals and SQL to PostgreSQL, data modelling and the querying skills real software teams expect.",
        topics: [
            "Database fundamentals",
            "SQL in depth",
            "PostgreSQL",
            "Data modelling",
            "Querying & optimisation",
            "Practical database concepts",
        ],
        outcomes: [
            "Design clean, well-modelled databases",
            "Write confident, efficient SQL",
            "Work with PostgreSQL in real projects",
            "Understand how data powers applications",
        ],
        audience: "Students, graduates and developers who want strong, practical database skills.",
        image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1600&auto=format&fit=crop",
    },
    {
        slug: "foundation-program",
        icon: Layers,
        category: "Foundation",
        title: "Foundation Program",
        subtitle: "Python • PostgreSQL • Cloud • AI",
        tagline: "Build Your Technology Foundation.",
        description:
            "A structured learning journey across the core technologies of modern software — Python, PostgreSQL, AWS / Azure and AI Fundamentals — designed to take learners from basics to industry readiness.",
        topics: [
            "Python programming",
            "PostgreSQL databases",
            "AWS / Azure cloud fundamentals",
            "AI fundamentals",
            "Practical projects",
            "Mentored learning",
        ],
        journey: [
            { step: "Python", text: "Programming fundamentals and problem solving with Python." },
            { step: "PostgreSQL", text: "Data modelling, SQL and real database work." },
            { step: "AWS / Azure", text: "Cloud fundamentals and deploying real workloads." },
            { step: "AI Fundamentals", text: "How modern AI works and where it is applied." },
        ],
        audience: "Students, graduates, career returnees and anyone starting a serious technology journey.",
        image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1600&auto=format&fit=crop",
    },
];

export const INDUSTRIES = [
    { name: "Startups", text: "Move from idea to working product with technology that scales as you grow." },
    { name: "Small & Medium Businesses", text: "Practical systems and automation that remove manual effort without enterprise complexity." },
    { name: "Education", text: "Learning platforms, digital operations and technology-enabled delivery for education providers." },
    { name: "Professional Services", text: "Workflow systems, client platforms and data visibility for service-driven organisations." },
    { name: "Retail", text: "Digital presence, customer engagement and back-office technology for modern retail." },
    { name: "Healthcare", text: "Reliable, secure systems that support care delivery and administrative efficiency." },
    { name: "Finance", text: "Data integrity, reporting and secure application development for finance operations." },
    { name: "Technology", text: "Engineering capacity, specialist skills and delivery support for technology teams." },
    { name: "Other Growing Organizations", text: "Whatever your sector, we adapt technology to your organisation's requirements and stage of growth." },
];

export const NAV = {
    company: [
        { label: "About", to: "/about", desc: "Who we are and what drives us" },
        { label: "Vision & Mission", to: "/vision", desc: "The future we are building toward" },
        { label: "Why GK Nexergy", to: "/why-gk-nexergy", desc: "What makes us different" },
        { label: "Industries", to: "/industries", desc: "Sectors we work with" },
    ],
    solutions: SOLUTIONS.map((s) => ({
        label: s.title,
        to: `/solutions/${s.slug}`,
        desc: s.tagline,
    })),
    academy: [
        { label: "Nexergy Academy", to: "/academy", desc: "Beyond technology. Building human capital." },
        { label: "Courses", to: "/academy/courses", desc: "Industry-relevant programs" },
        ...COURSES.map((c) => ({
            label: c.title,
            to: `/academy/${c.slug}`,
            desc: c.subtitle,
        })),
    ],
};

export const ECOSYSTEM_NODES = [
    { label: "Software Engineering", icon: Code2 },
    { label: "AI", icon: BrainCircuit },
    { label: "Cloud", icon: Cloud },
    { label: "Data", icon: Database },
    { label: "Cyber Security", icon: ShieldCheck },
    { label: "Digital Transformation", icon: RefreshCw },
    { label: "Digital Growth", icon: TrendingUp },
    { label: "Nexergy Academy", icon: GraduationCap },
];

export const IMAGES = {
    team: "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&w=1600",
};
