/**
 * GK Nexergy Intelligent Conversational AI Engine
 * 
 * Provides:
 * 1. Natural, human-like dialogue with concise, intelligent, and context-aware responses.
 * 2. Multi-turn conversation context tracking across Enterprise Solutions, Academy, Case Studies, and Careers.
 * 3. Accurate GK Nexergy ground-truth facts (Vizag tech hub, 100% IP ownership, autonomous pods, contact channels).
 * 4. Graceful handling of casual greetings, follow-ups, and natural conversational shifts.
 * 5. Optional OpenAI API integration (GPT-4o) with instant conversational local fallback.
 */

import { FULL_SITE_CORPUS, searchSiteCorpus } from "./fullSiteKnowledgeCorpus";

export const GK_CONTACT_INFO = {
  phone: "+91 9704585960",
  phoneRaw: "+919704585960",
  email: "contact@gknexergy.com",
  whatsappUrl: "https://wa.me/919704585960?text=Hi%20GK%20Nexergy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
  consultationForm: "https://forms.gle/GCqvWiWqxwvDSzoZ6",
  headquarters: "Visakhapatnam (Vizag), Andhra Pradesh, India",
  hours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
};

export const GK_SYSTEM_PROMPT = `
You are the intelligent digital assistant for GK Nexergy (www.gknexergy.com), based in Visakhapatnam, India.

Persona:
- You speak naturally, warmly, and intelligently — like an experienced engineering colleague or tech consultant.
- Keep responses concise, clear, and conversational. Avoid walls of text or giant lists of bullet points unless specifically requested.
- Maintain immediate conversation context across multiple turns.
- When relevant, conclude with one friendly, natural follow-up question or suggest looking at a specific solution or course.
- Accurate Company Facts: GK Nexergy delivers Enterprise Solutions (Software, Mobile Apps, AI & Automation, Data Analytics, Digital Growth) and Nexergy Academy (Cyber Security, PostgreSQL, Foundation Program, AI Marketing). Contact: +91 9704585960 | contact@gknexergy.com | Visakhapatnam, India.
`;

/**
 * Knowledge Topics with Natural Conversational Responses
 */
export const CONVERSATIONAL_TOPICS = [
  // 1. GREETINGS & CASUAL INTROS
  {
    id: "greetings",
    intents: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "namaste", "sup", "yo", "hiya", "greetings"],
    handler: (query, context) => ({
      topic: "greetings",
      text: "Hi there! 👋\n\nI'm the GK Nexergy AI assistant. I can help you explore our technology solutions, academy courses, client projects, or answer any questions about the company.\n\nWhat are you curious about today?",
      routes: [],
    }),
  },

  // 2. COMPANY OVERVIEW / WHAT DO YOU DO
  {
    id: "company",
    intents: ["what is gk nexergy", "what does gk nexergy do", "what do you do", "about gk nexergy", "about the company", "tell me about gk nexergy", "company", "who are you", "what is this", "overview", "story", "vision", "mission"],
    handler: (query, context) => ({
      topic: "company",
      text: "GK Nexergy helps businesses build modern technology and AI solutions, while also training the next generation of engineers through Nexergy Academy.\n\nWe operate from **Visakhapatnam, India**, delivering custom software, mobile apps, AI automation, and cloud systems with 100% client code ownership.\n\nAre you looking to build a tech solution for your business, or interested in our academy training programs?",
      routes: [
        { label: "Explore Solutions", to: "/solutions" },
        { label: "Nexergy Academy", to: "/academy" },
      ],
    }),
  },

  // 3. AI & AUTOMATION (Key Highlight)
  {
    id: "solutions-ai",
    intents: ["ai", "artificial intelligence", "automation", "automate", "generative ai", "llm", "chatbots", "copilot", "smart workflows", "agent", "agents", "machine learning", "rag"],
    handler: (query, context) => {
      if (context?.activeTopic === "solutions-ai" || query.toLowerCase().includes("more") || query.toLowerCase().includes("business")) {
        return {
          topic: "solutions-ai",
          text: "In practice, our AI solutions focus on high-impact business workflows:\n\n• **Intelligent Agents & Copilots**: 24/7 conversational customer assistants and internal employee knowledge systems.\n• **Document Intelligence**: Automated PDF parsing, invoice processing, and contract extraction.\n• **Workflow Automation**: Eliminating repetitive manual data entry and multi-system handoffs.\n\nWhat kind of business or project are you looking to automate?",
          routes: [{ label: "View AI & Automation", to: "/solutions/ai-automation" }],
        };
      }
      return {
        topic: "solutions-ai",
        text: "GK Nexergy builds practical AI and automation solutions to help businesses eliminate repetitive manual work, streamline operations, and build smarter digital products.\n\nWe work with custom Generative AI copilots, intelligent document processing, predictive models, and autonomous workflow bots.\n\nWould you like to see how this can apply to your specific industry?",
        routes: [{ label: "Explore AI & Automation", to: "/solutions/ai-automation" }],
      };
    },
  },

  // 4. SOFTWARE & WEB DEVELOPMENT
  {
    id: "solutions-software",
    intents: ["software", "software development", "web development", "web app", "custom software", "react", "next.js", "node", "backend", "frontend", "full stack", "api", "microservices", "saas"],
    handler: (query, context) => ({
      topic: "solutions-software",
      text: "We engineer modern web applications, scalable SaaS platforms, and enterprise backend microservices using React, Next.js, Node.js, Python, and PostgreSQL.\n\nEvery project is delivered by dedicated agile pods in Vizag with full CI/CD automation and 100% IP ownership for you.\n\nDo you have a specific software project or architecture you'd like to discuss?",
      routes: [
        { label: "Software Solutions", to: "/solutions/software-development" },
        { label: "View Projects", to: "/projects" },
      ],
    }),
  },

  // 5. MOBILE APP DEVELOPMENT
  {
    id: "solutions-mobile",
    intents: ["mobile", "mobile app", "app development", "ios", "android", "react native", "flutter", "swift", "kotlin", "smartphone", "iphone app"],
    handler: (query, context) => ({
      topic: "solutions-mobile",
      text: "We build native and cross-platform mobile apps for iOS and Android using React Native, Flutter, Swift, and Kotlin.\n\nOur apps feature smooth 60fps UI, offline-first data caching, biometric authentication, and seamless App Store / Google Play publishing.\n\nAre you looking to build an iOS, Android, or cross-platform application?",
      routes: [{ label: "Mobile App Solutions", to: "/solutions/mobile-development" }],
    }),
  },

  // 6. DATA & ANALYTICS / DIGITAL TRANSFORMATION
  {
    id: "solutions-data",
    intents: ["data", "analytics", "database", "postgres", "sql", "bi", "reporting", "digital transformation", "modernization", "digital growth", "seo", "marketing"],
    handler: (query, context) => ({
      topic: "solutions-data",
      text: "We help companies modernize legacy systems into cloud-native architectures, optimize PostgreSQL databases, and build real-time BI analytics dashboards.\n\nWe also provide digital growth engineering — combining SEO, conversion architecture, and AI marketing tools.\n\nWould you like to explore our Data & Analytics or Digital Transformation solutions?",
      routes: [
        { label: "Data & Analytics", to: "/solutions/data-analytics" },
        { label: "Digital Transformation", to: "/solutions/digital-transformation" },
      ],
    }),
  },

  // 7. ALL SOLUTIONS GENERAL
  {
    id: "solutions-general",
    intents: ["solutions", "services", "what services", "what solutions", "what can you build", "capabilities", "tech stack"],
    handler: (query, context) => ({
      topic: "solutions-general",
      text: "We offer end-to-end technology engineering across five core domains:\n\n1. **Software & Web Applications** (React, Next.js, Python, Node.js)\n2. **Mobile Apps** (iOS, Android, React Native, Flutter)\n3. **AI & Process Automation** (LLM Copilots, Document Intelligence, RPA)\n4. **Data & Analytics** (PostgreSQL Architecture, BI Pipelines)\n5. **Digital Growth & Transformation**\n\nWhich of these areas interests you most?",
      routes: [{ label: "Browse Solutions", to: "/solutions" }],
    }),
  },

  // 8. NEXERGY ACADEMY (Overview & Courses)
  {
    id: "academy",
    intents: ["academy", "courses", "course", "training", "learn", "study", "bootcamp", "student", "syllabus", "admission", "batches", "classes"],
    handler: (query, context) => ({
      topic: "academy",
      text: "Nexergy Academy is our talent acceleration ecosystem in Visakhapatnam. We offer hands-on, mentor-led programs designed by working engineers:\n\n• **Cyber Security & Ethical Hacking** (16 weeks, hands-on CTF labs)\n• **PostgreSQL Database Mastery** (Deep SQL & indexing architecture)\n• **Foundation Program** (Python, SQL, Cloud & AI for beginners)\n• **AI Tools & Digital Marketing**\n\nWhich program would you like to explore?",
      routes: [
        { label: "Explore All Courses", to: "/academy/courses" },
        { label: "Foundation Program", to: "/academy/foundation-program" },
      ],
    }),
  },

  // 9. CYBER SECURITY COURSE
  {
    id: "academy-cyber",
    intents: ["cyber security", "ethical hacking", "hacking", "security course", "pentest", "penetration testing", "wireshark", "burp suite", "metasploit", "infosec", "kali linux"],
    handler: (query, context) => ({
      topic: "academy-cyber",
      text: "Our **Cyber Security & Ethical Hacking** program is a 16-week intensive bootcamp where you learn real attack & defense methodologies.\n\nYou'll get hands-on experience with Linux hardening, network scanning (Nmap, Wireshark), web app vulnerabilities (OWASP Top 10), Metasploit, and live CTF labs.\n\nWould you like details on the curriculum or upcoming batch schedule?",
      routes: [{ label: "Cyber Security Course", to: "/academy/cyber-security" }],
    }),
  },

  // 10. POSTGRESQL COURSE
  {
    id: "academy-postgres",
    intents: ["postgresql", "postgres", "sql course", "database course", "query optimization", "indexing", "dba"],
    handler: (query, context) => ({
      topic: "academy-postgres",
      text: "Our **PostgreSQL Database Mastery** program goes deep into enterprise database engineering.\n\nIt covers schema design, advanced window functions, query execution planning (EXPLAIN ANALYZE), index tuning (B-Tree, GIN, BRIN), MVCC concurrency, and high-availability replication.\n\nWould you like to see the course syllabus?",
      routes: [{ label: "PostgreSQL Program", to: "/academy/postgresql-mastery" }],
    }),
  },

  // 11. ACADEMY FEES & ADMISSIONS
  {
    id: "academy-fees",
    intents: ["fee", "fees", "cost", "price", "pricing", "how much", "batch", "schedule", "placement", "certificate", "duration"],
    handler: (query, context) => ({
      topic: "academy-fees",
      text: "Our academy programs run for **8 to 16 weeks** in hybrid and online formats with 1-on-1 engineering mentorship and direct placement opportunities into GK Nexergy pods.\n\nFees are competitive and vary by course with flexible payment options available.\n\nWould you like to connect with admissions on WhatsApp to get the exact fee schedule for the next cohort?",
      routes: [
        { label: "💬 Chat on WhatsApp", to: "https://wa.me/919704585960?text=Hi%2C%20I%20would%20like%20to%20know%20the%20fee%20structure%20and%20next%20batch%20dates.", external: true },
        { label: "Contact Admissions", to: "/contact" },
      ],
    }),
  },

  // 12. DELIVERED PROJECTS & CASE STUDIES
  {
    id: "projects",
    intents: ["project", "projects", "case study", "case studies", "portfolio", "clients", "work", "examples", "hospital", "real estate", "ecommerce"],
    handler: (query, context) => ({
      topic: "projects",
      text: "We've delivered several notable enterprise platforms, including:\n\n• **AI Hospital Management Platform**: Reduced clinical triage and patient wait times by 40% with HIPAA-compliant EHR.\n• **AI Real Estate Discovery**: Automated property valuation and spatial analytics with 3.2x lead conversion.\n• **NutriBest E-Commerce**: High-throughput global store with 99.98% flash-sale uptime.\n\nWould you like to look at our detailed case studies?",
      routes: [{ label: "View Case Studies", to: "/projects" }],
    }),
  },

  // 13. CAREERS & HIRING
  {
    id: "careers",
    intents: ["career", "careers", "job", "jobs", "hiring", "work with us", "openings", "vizag jobs", "visakhapatnam jobs", "apply", "internship", "internships", "developer job"],
    handler: (query, context) => ({
      topic: "careers",
      text: "We're always looking for talented engineers in **Visakhapatnam**!\n\nCurrent active roles include:\n• Full-Stack Developers (React & Node.js / Python)\n• AI & Machine Learning Engineers\n• PostgreSQL Database Engineers\n• Cyber Security Analysts\n\nWe offer direct product ownership in autonomous pods with transparent growth paths.",
      routes: [{ label: "View Careers & Apply", to: "/careers" }],
    }),
  },

  // 14. CONTACT & LIVE REACH
  {
    id: "contact",
    intents: ["contact", "phone", "call", "whatsapp", "email", "reach", "location", "address", "office", "talk to human", "book call", "consultation", "visakhapatnam", "vizag"],
    handler: (query, context) => ({
      topic: "contact",
      text: "You can reach our team directly at any time:\n\n• **Direct Phone**: [+91 9704585960](tel:+919704585960)\n• **WhatsApp**: [Chat with us directly](https://wa.me/919704585960?text=Hi%20GK%20Nexergy)\n• **Email**: [contact@gknexergy.com](mailto:contact@gknexergy.com)\n• **Office**: Visakhapatnam (Vizag), Andhra Pradesh, India\n• **Hours**: Mon – Sat: 9:00 AM – 7:00 PM IST\n\nInquiries receive an engineering response within **10 minutes**.",
      routes: [
        { label: "💬 Chat on WhatsApp", to: "https://wa.me/919704585960?text=Hi%20GK%20Nexergy", external: true },
        { label: "Book Consultation", to: "/contact" },
      ],
    }),
  },

  // 15. WHY GK NEXERGY / ADVANTAGES
  {
    id: "why-us",
    intents: ["why gk", "why choose", "why nexergy", "differentiators", "advantage", "ip ownership", "why should i hire", "guarantee"],
    handler: (query, context) => ({
      topic: "why-us",
      text: "Clients partner with GK Nexergy for three core reasons:\n\n1. **100% IP & Code Ownership**: You own every line of code and database schema from day one.\n2. **Autonomous Agile Pods**: Dedicated full-stack teams in Vizag that build fast without agency bureaucracy.\n3. **Talent Quality**: Direct integration with Nexergy Academy gives us a strong, continuously trained engineering bench.\n\nWould you like to schedule a quick 30-minute discovery call?",
      routes: [{ label: "Book Discovery Call", to: "/contact" }],
    }),
  },
];

/**
 * Intelligent Navigation Intent Detector
 */
export function detectNavigationIntent(query) {
  const q = query.toLowerCase().trim();

  const navPatterns = [
    { match: ["home", "homepage"], to: "/home", label: "Home" },
    { match: ["about", "story", "leadership", "vision", "mission"], to: "/about", label: "About Us" },
    { match: ["why gk", "why nexergy", "why choose"], to: "/why-gk-nexergy", label: "Why GK Nexergy" },
    { match: ["solutions", "all solutions", "services"], to: "/solutions", label: "Enterprise Solutions" },
    { match: ["software development", "web development"], to: "/solutions/software-development", label: "Software Solutions" },
    { match: ["mobile app", "ios", "android"], to: "/solutions/mobile-development", label: "Mobile Solutions" },
    { match: ["ai automation", "ai solutions"], to: "/solutions/ai-automation", label: "AI & Automation" },
    { match: ["data analytics"], to: "/solutions/data-analytics", label: "Data & Analytics" },
    { match: ["digital transformation"], to: "/solutions/digital-transformation", label: "Digital Transformation" },
    { match: ["digital growth"], to: "/solutions/digital-growth", label: "Digital Growth" },
    { match: ["academy", "courses", "all courses"], to: "/academy/courses", label: "Academy Courses" },
    { match: ["cyber security", "ethical hacking"], to: "/academy/cyber-security", label: "Cyber Security Course" },
    { match: ["postgresql", "postgres"], to: "/academy/postgresql-mastery", label: "PostgreSQL Mastery" },
    { match: ["foundation program"], to: "/academy/foundation-program", label: "Foundation Program" },
    { match: ["projects", "case studies", "portfolio"], to: "/projects", label: "Client Projects" },
    { match: ["careers", "jobs", "hiring"], to: "/careers", label: "Careers" },
    { match: ["contact", "book consultation", "consultation"], to: "/contact", label: "Contact Us" },
  ];

  for (const item of navPatterns) {
    for (const kw of item.match) {
      if (q.includes(kw)) {
        if (
          q.startsWith("go to") ||
          q.startsWith("navigate") ||
          q.startsWith("open") ||
          q.startsWith("take me") ||
          q.startsWith("show me") ||
          q === kw
        ) {
          return { isDirectNav: true, ...item };
        }
      }
    }
  }

  return null;
}

/**
 * Advanced Multi-Turn Conversational Intent Matcher
 */
export function queryLocalKnowledgeBase(query, context = {}) {
  const q = query.toLowerCase().trim();
  const activeTopic = context?.activeTopic || "";
  const words = q.replace(/[^\w\s]/gi, " ").split(/\s+/).filter((w) => w.length > 1);

  // 1. Contextual Follow-up Detection
  // If user says "yes", "tell me more", "explain more", "how so?", "what else?"
  if (
    q === "yes" ||
    q === "yeah" ||
    q === "sure" ||
    q === "yep" ||
    q.includes("tell me more") ||
    q.includes("more details") ||
    q.includes("explain more") ||
    q.includes("how does it work")
  ) {
    if (activeTopic === "solutions-ai") {
      return {
        topic: "solutions-ai",
        text: "Sure! For AI workflows, we typically start with a 30-minute discovery call to map out where your team spends manual time.\n\nFrom there, we build custom copilots, RAG document search systems, or automated triage bots that connect to your existing tools.\n\nWould you like to schedule a free 30-minute architectural consultation?",
        routes: [{ label: "Book Free Consultation", to: "/contact" }],
        confidence: "high",
      };
    }
    if (activeTopic === "academy" || activeTopic.startsWith("academy-")) {
      return {
        topic: "academy",
        text: "Our academy cohorts are mentor-led with live project sprints and real-world code reviews.\n\nStudents work on actual production scenarios (like writing database migrations or conducting penetration testing in isolated sandbox labs).\n\nWould you like to see all current course syllabi or talk to our admissions team on WhatsApp?",
        routes: [
          { label: "💬 Inquire on WhatsApp", to: "https://wa.me/919704585960?text=Hi%2C%20I%20would%20like%20more%20details%20about%20Nexergy%20Academy", external: true },
          { label: "View All Courses", to: "/academy/courses" },
        ],
        confidence: "high",
      };
    }
    if (activeTopic === "solutions-software" || activeTopic === "solutions-mobile") {
      return {
        topic: activeTopic,
        text: "Our delivery pods work in 2-week agile sprints. You receive staging preview links after every sprint with full access to the Git repository.\n\nWe also provide continuous QA testing, automated deployment pipelines, and post-launch SLA support.\n\nWould you like to discuss your project requirements with an engineering lead?",
        routes: [{ label: "Discuss Your Project", to: "/contact" }],
        confidence: "high",
      };
    }
  }

  // 2. Score Matcher
  let bestMatch = null;
  let highestScore = 0;

  // Stop-words that should not inflate generic matches
  const STOP_WORDS = new Set(["about", "tell", "more", "what", "does", "you", "your", "can", "how", "with", "this", "that", "the", "and", "for", "are"]);
  const domainWords = words.filter(w => !STOP_WORDS.has(w));

  for (const item of CONVERSATIONAL_TOPICS) {
    let score = 0;

    for (const intent of item.intents) {
      const intentLower = intent.toLowerCase();
      if (q === intentLower) {
        score += 40;
      } else if (q.includes(intentLower) && intentLower.length > 2) {
        score += 20 + Math.min(intentLower.length, 10);
      } else {
        for (const word of domainWords) {
          if (intentLower === word) {
            score += 10;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 5) {
    const result = bestMatch.handler(query, context);
    return {
      ...result,
      confidence: "high",
    };
  }

  // 3. Fallback to Full Site Indexed Corpus
  const corpusMatches = searchSiteCorpus(q, 1);
  if (corpusMatches && corpusMatches.length > 0) {
    const top = corpusMatches[0];
    return {
      topic: "corpus",
      text: top.content.split("\n\n").slice(0, 2).join("\n\n"),
      routes: [{ label: `Explore ${top.title.split(":")[0]}`, to: top.route }],
      confidence: "corpus",
    };
  }

  // 4. Natural Contextual Fallback
  return {
    topic: "fallback",
    text: "I want to make sure I give you the best answer. GK Nexergy specializes in **Enterprise Technology Solutions** (Software, Mobile Apps, AI & Automation, Data) and **Nexergy Academy** (Cyber Security, PostgreSQL, Foundation Program).\n\nCould you clarify if you're interested in building a solution, training at the academy, or exploring careers?",
    routes: [
      { label: "Explore Solutions", to: "/solutions" },
      { label: "Nexergy Academy", to: "/academy" },
    ],
    confidence: "fallback",
  };
}

/**
 * Hybrid AI Query Dispatcher (OpenAI real-time API with Instant Natural Fallback)
 */
export async function askGKChatbot(queryText, customApiKey = "", context = {}) {
  const trimmed = queryText.trim();
  if (!trimmed) return null;

  // 1. Direct navigation check
  const navIntent = detectNavigationIntent(trimmed);
  if (navIntent && navIntent.isDirectNav) {
    return {
      topic: "nav",
      text: `Taking you directly to **${navIntent.label}**...`,
      routes: [{ label: `Open ${navIntent.label}`, to: navIntent.to, primary: true }],
      navTarget: navIntent.to,
      isNavigation: true,
    };
  }

  // 2. OpenAI API Integration (if configured)
  const apiKey = customApiKey || (typeof import.meta !== "undefined" && import.meta.env?.VITE_OPENAI_API_KEY) || "";

  if (apiKey && apiKey.startsWith("sk-")) {
    try {
      const topDocs = searchSiteCorpus(trimmed, 3);
      const corpusContextStr = topDocs.map(d => `[${d.title}]\n${d.content}`).join("\n\n");

      const conversationHistory = (context.history || []).slice(-6).map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `${GK_SYSTEM_PROMPT}\n\nSite Ground Truth:\n${corpusContextStr}`,
            },
            ...conversationHistory,
            { role: "user", content: trimmed },
          ],
          temperature: 0.6,
          max_tokens: 300,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content || "";
        const localMatch = queryLocalKnowledgeBase(trimmed, context);

        return {
          topic: localMatch.topic || "general",
          text: aiReply,
          routes: (localMatch.routes || []).slice(0, 2),
          source: "openai",
        };
      }
    } catch (err) {
      console.warn("OpenAI fallback to local knowledge:", err);
    }
  }

  // 3. Local conversational engine
  const localMatch = queryLocalKnowledgeBase(trimmed, context);
  return {
    ...localMatch,
    source: "local-engine",
  };
}
