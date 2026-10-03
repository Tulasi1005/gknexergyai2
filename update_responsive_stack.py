import os

nav_stack_code = '''import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Check, Home, Building2, Code2, GraduationCap, FolderGit2, Users, PhoneCall } from 'lucide-react';

export const NavPagesStack = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollTabsRef = useRef(null);

  const pagesData = [
    {
      id: 'home',
      to: '/',
      tabLabel: 'HOME',
      icon: Home,
      category: 'CORE PLATFORM',
      title: 'GK Nexergy Home',
      tagline: 'AI & Digital Business Transformation Partner.',
      badge: 'MAIN HUB',
      bullets: [
        'End-to-end enterprise digital transformation',
        'AI workflow automation & custom LLM systems',
        'Visakhapatnam agile pods & engineering excellence',
        'Unified enterprise technology & workforce ecosystem',
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'company',
      to: '/company',
      tabLabel: 'COMPANY',
      icon: Building2,
      category: 'STRATEGIC ADVISORY',
      title: 'Company & Vision',
      tagline: 'Technology built to move your enterprise forward.',
      badge: 'ABOUT US',
      bullets: [
        'Visakhapatnam engineering center of excellence',
        'Dedicated practicing engineering delivery pods',
        '100% intellectual property & data ownership',
        'Executive technology advisory & modernization',
      ],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'solutions',
      to: '/solutions',
      tabLabel: 'SOLUTIONS',
      icon: Code2,
      category: 'ENTERPRISE ENGINEERING',
      title: 'Enterprise Solutions',
      tagline: 'Scalable software, mobile apps & cloud platforms.',
      badge: 'SERVICES',
      bullets: [
        'High-performance web applications & microservices',
        'Cross-platform iOS & Android mobile architectures',
        'Enterprise RAG, document intelligence & automation',
        'PostgreSQL specialization, security & scaling',
      ],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'academy',
      to: '/academy',
      tabLabel: 'ACADEMY',
      icon: GraduationCap,
      category: 'NEXERGY ACADEMY',
      title: 'Nexergy Academy',
      tagline: 'Train. Build. Transform. Industry readiness.',
      badge: 'LEARNING',
      bullets: [
        '16-Week Cyber Security & Ethical Hacking',
        'PostgreSQL database internals & performance tuning',
        'Practical AI tools, growth engineering & web apps',
        'Direct live-repository apprenticeships with mentors',
      ],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'projects',
      to: '/projects',
      tabLabel: 'PROJECTS',
      icon: FolderGit2,
      category: 'CLIENT SUCCESS',
      title: 'Delivered Projects',
      tagline: 'Real-world digital products delivering proven ROI.',
      badge: 'PORTFOLIO',
      bullets: [
        'AI-Integrated Hospital Management Platform',
        'AI Real Estate Discovery & Lead Analytics',
        'NutriBest Health & Wellness Global E-Commerce',
        'High-throughput commercial SaaS & customer portals',
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'hiring',
      to: '/careers',
      tabLabel: 'HIRING',
      icon: Users,
      category: 'CAREERS & TALENT',
      title: 'Careers & Hiring',
      tagline: "Build what's next with GK Nexergy engineering.",
      badge: 'JOIN TEAM',
      bullets: [
        'Autonomous agile pods in Visakhapatnam',
        'Modern stack: React, Node.js, Python, Postgres & AI',
        'Direct ownership of real-world client solutions',
        'Accelerated career progression & continuous learning',
      ],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'contact',
      to: '/contact',
      tabLabel: 'CONTACT',
      icon: PhoneCall,
      category: 'GET IN TOUCH',
      title: 'Contact & Connect',
      tagline: 'Start your transformation consultation today.',
      badge: 'DIRECT ACCESS',
      bullets: [
        '30-minute architectural discovery session',
        'Rapid feasibility scope & technology blueprint',
        'Direct WhatsApp, telephone & email consultation',
        'Visakhapatnam, Andhra Pradesh, India',
      ],
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const total = pagesData.length;
  const currentIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const currentCard = pagesData[currentIndex];

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    setActiveIndex(nextIdx);
    setHoveredIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + total) % total;
    setActiveIndex(prevIdx);
    setHoveredIndex(prevIdx);
  };

  // Auto-scroll active tab into view in mobile horizontal bar
  useEffect(() => {
    if (scrollTabsRef.current) {
      const activeBtn = scrollTabsRef.current.children[currentIndex];
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#060913] via-[#091122] to-[#070D1B] border-t border-white/[0.08]" id="pages-stack-section">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-blue-600/[0.07] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-cyan-600/[0.06] rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid-light opacity-10" />
      </div>

      <div className="container-max max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Section Title, Explainer & Interactive Directory (Desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left w-full">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 mb-4 sm:mb-6 shadow-sm shadow-blue-500/10">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span style={{ fontFamily: "'Outfit', sans-serif" }} className="text-xs font-bold text-blue-300 tracking-[0.16em] uppercase">
                MAIN NAVIGATION HUBS
              </span>
            </div>

            {/* Section Heading */}
            <h2
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-bold text-white tracking-tight leading-[1.15] mb-3 sm:mb-5"
            >
              Explore Every Dimension of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                GK Nexergy.
              </span>
            </h2>

            {/* Subtitle */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-7 max-w-xl"
            >
              Hover or tap any card in the stack to preview our core ecosystem destinations. Click on any card to immediately open that section.
            </p>

            {/* Interactive Page Links List - Visible on Desktop */}
            <div className="hidden lg:block w-full space-y-2 mb-8">
              {pagesData.map((p, idx) => {
                const isCurrent = currentIndex === idx;
                const IconComponent = p.icon;
                return (
                  <div
                    key={p.id}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onClick={() => {
                      setActiveIndex(idx);
                      setHoveredIndex(idx);
                    }}
                    className={`group flex items-center justify-between p-2.5 sm:p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                      isCurrent
                        ? 'bg-blue-600/20 border-blue-500/60 shadow-[0_0_20px_rgba(37,99,235,0.25)] translate-x-1.5'
                        : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold transition-colors ${
                        isCurrent ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}>
                        0{idx + 1}
                      </span>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isCurrent ? 'bg-blue-500 text-white' : 'bg-white/[0.05] text-slate-400 group-hover:text-white'
                      }`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span style={{ fontFamily: "'Outfit', sans-serif" }} className={`text-sm sm:text-base font-bold transition-colors ${
                        isCurrent ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {p.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded transition-colors ${
                        isCurrent ? 'bg-blue-400/20 text-blue-300 font-bold' : 'text-slate-500'
                      }`}>
                        {p.tabLabel}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(p.to);
                        }}
                        className="p-1 rounded-md hover:bg-blue-500/20 text-slate-400 hover:text-blue-300 transition-colors"
                        title={`Go to ${p.title}`}
                      >
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                          isCurrent ? 'text-blue-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                        }`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Launch CTA for current selected card (Desktop) */}
            <div className="hidden lg:flex flex-wrap items-center gap-4 w-full">
              <button
                onClick={() => navigate(currentCard.to)}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="btn-primary flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Visit {currentCard.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">
                Destination: <code className="text-blue-400 font-mono bg-white/[0.06] px-2 py-0.5 rounded">{currentCard.to}</code>
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Responsive Card Deck */}
          <div className="lg:col-span-7 w-full flex flex-col items-center lg:items-end">

            {/* ======================================================== */}
            {/* 1. MOBILE & TABLET TOUCH DECK (< 1024px)                 */}
            {/* ======================================================== */}
            <div className="block lg:hidden w-full max-w-[440px] mx-auto">
              
              {/* Horizontal Scrollable Tabs Bar */}
              <div
                ref={scrollTabsRef}
                className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {pagesData.map((p, idx) => {
                  const isCurrent = currentIndex === idx;
                  const IconComp = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveIndex(idx);
                        setHoveredIndex(idx);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 shrink-0 cursor-pointer border ${
                        isCurrent
                          ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/40 scale-105'
                          : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{p.tabLabel}</span>
                      <span className={`text-[10px] font-mono ml-0.5 px-1 rounded ${
                        isCurrent ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                      }`}>
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Deck Header / Arrow Controls */}
              <div className="flex items-center justify-between px-2 mb-3">
                <span className="text-xs font-mono text-slate-400">
                  <strong className="text-white">0{currentIndex + 1}</strong> / 0{total} &mdash; {currentCard.badge}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/[0.1] text-white flex items-center justify-center active:scale-95"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/[0.1] text-white flex items-center justify-center active:scale-95"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Active Card */}
              <div
                onClick={() => navigate(currentCard.to)}
                className="w-full rounded-2xl bg-[#0B1528] border-2 border-blue-500/80 p-5 flex flex-col justify-between shadow-2xl cursor-pointer active:scale-[0.99] transition-all"
                role="link"
                tabIndex={0}
              >
                <div>
                  {/* Visual Banner */}
                  <div className="relative w-full h-[145px] rounded-xl overflow-hidden mb-3.5 shrink-0 bg-slate-900 border border-white/10">
                    <img
                      src={currentCard.image}
                      alt={currentCard.title}
                      className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/30 to-black/60" />

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-[10px] shadow border border-blue-400/50">
                          GK
                        </div>
                        <span className="text-[9px] font-bold text-blue-300 uppercase tracking-wider bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                          {currentCard.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                        0{currentIndex + 1} / 0{total}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[9px] font-mono uppercase text-slate-300 font-semibold">
                        Page Destination
                      </span>
                      <span className="text-[10px] text-blue-300 flex items-center gap-0.5 font-semibold">
                        Tap to Open <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight"
                  >
                    {currentCard.title}
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-slate-300 text-xs font-medium mb-3 leading-snug"
                  >
                    {currentCard.tagline}
                  </p>

                  {/* Bullets */}
                  <div className="space-y-1.5 mb-3 bg-black/30 p-2.5 rounded-xl border border-white/[0.06]">
                    {currentCard.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <div className="w-3 h-3 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                          <Check className="w-2 h-2" />
                        </div>
                        <span className="text-[11px] leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Bottom Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(currentCard.to);
                  }}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
                >
                  <span>Open {currentCard.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mobile Dot Nav */}
              <div className="flex justify-center items-center gap-1.5 mt-3.5">
                {pagesData.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveIndex(i);
                      setHoveredIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === i ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/20'
                    }`}
                    aria-label={`Jump to ${c.title}`}
                  />
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* 2. DESKTOP FANNED PHYSICAL STACK (>= 1024px)              */}
            {/* ======================================================== */}
            <div
              className="hidden lg:block w-full max-w-[620px] xl:max-w-[640px] select-none"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Top Header & Deck Controls */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.1] pr-1">
                <div>
                  <span
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-[11px] tracking-[0.2em] text-blue-400 uppercase font-bold block"
                  >
                    GK NEXERGY DESTINATIONS STACK
                  </span>
                  <span
                    style={{ fontFamily: "'Space Grotesk', monospace" }}
                    className="text-xs text-slate-400"
                  >
                    Hover any card tab to neatly present its content
                  </span>
                </div>

                {/* Counter & Controls */}
                <div className="flex items-center gap-3">
                  <span
                    style={{ fontFamily: "'Space Grotesk', monospace" }}
                    className="text-xs text-slate-400"
                  >
                    <strong className="text-white text-sm">0{currentIndex + 1}</strong> / 0{total}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.18] border border-white/[0.15] text-slate-200 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-md cursor-pointer"
                      aria-label="Previous card"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.18] border border-white/[0.15] text-slate-200 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-md cursor-pointer"
                      aria-label="Next card"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Whiteboard-Matched Fanning Stack Container */}
              <div className="relative w-full h-[520px] sm:h-[530px] overflow-visible">
                
                {/* 1. BACKGROUND FANNED CARDS (Slots 1..6 stepped to the right) */}
                {pagesData.slice(1).map((card, offsetIdx) => {
                  const cardIdx = offsetIdx + 1; // 1 to 6
                  const isSelected = currentIndex === cardIdx;

                  const xOffset = cardIdx * 40; // 40px right step per card
                  const yOffset = isSelected ? -12 : cardIdx * -4;
                  const zIndex = 20 - cardIdx;

                  return (
                    <div
                      key={card.id}
                      onMouseEnter={() => setHoveredIndex(cardIdx)}
                      onClick={() => navigate(card.to)}
                      style={{
                        transform: `translateX(${xOffset}px) translateY(${yOffset}px)`,
                        zIndex: zIndex,
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s',
                      }}
                      className={`absolute top-0 left-0 w-[300px] sm:w-[340px] md:w-[360px] h-[490px] sm:h-[510px] rounded-2xl cursor-pointer overflow-hidden transition-all ${
                        isSelected
                          ? 'bg-[#0E1E3B] border-2 border-blue-400 shadow-[0_20px_45px_rgba(37,99,235,0.4)] ring-1 ring-blue-400/50'
                          : 'bg-[#091122] hover:bg-[#0D1A33] border border-white/[0.14] hover:border-blue-400/60 shadow-[-10px_10px_30px_rgba(0,0,0,0.65)] group'
                      }`}
                    >
                      {/* Full-Bleed Image Background */}
                      <div className="absolute inset-0 pointer-events-none">
                        <img
                          src={card.image}
                          alt={card.title}
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            isSelected ? 'opacity-40 scale-105 brightness-90' : 'opacity-20 brightness-75'
                          }`}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#091122]/85 to-[#091122]/70" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#091122]/90" />
                      </div>

                      {/* Background Card Peek Content (visible in the space when hovered) */}
                      <div className="relative z-10 h-full p-5 pr-14 flex flex-col justify-between pointer-events-none">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                              {card.category}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-white mb-1 line-clamp-1 drop-shadow-md">
                            {card.title}
                          </h4>
                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                            {card.tagline}
                          </p>
                        </div>

                        {/* Visual Thumbnail in the peek space */}
                        <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-blue-400/40">
                            <img src={card.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-semibold text-blue-400 block uppercase tracking-wider">
                              Page Destination
                            </span>
                            <span className="text-xs text-slate-200 font-medium truncate block">
                              {card.title}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* THE PHYSICAL RIGHT TAB (Permanently Visible in Fanned Stack) */}
                      <div
                        className={`absolute top-0 right-0 w-[42px] h-full flex flex-col items-center justify-between py-6 z-20 border-l transition-colors ${
                          isSelected
                            ? 'bg-[#0E1E3B]/95 border-blue-400/60'
                            : 'bg-[#091122]/90 group-hover:bg-[#0E1E3B]/90 border-white/[0.1]'
                        }`}
                      >
                        {/* Number Index */}
                        <span
                          style={{ fontFamily: "'Space Grotesk', monospace" }}
                          className={`text-xs font-bold transition-colors ${
                            isSelected ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-300'
                          }`}
                        >
                          0{cardIdx + 1}
                        </span>

                        {/* Vertical Title Tab Label */}
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                          }}
                          className={`text-[11px] font-bold tracking-widest uppercase whitespace-nowrap transition-colors ${
                            isSelected
                              ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                              : 'text-slate-400 group-hover:text-blue-300'
                          }`}
                        >
                          {card.tabLabel}
                        </span>

                        {/* Bottom Dot */}
                        <div
                          className={`w-2 h-2 rounded-full transition-all ${
                            isSelected
                              ? 'bg-blue-400 scale-125 shadow-[0_0_8px_#60A5FA]'
                              : 'bg-slate-600 group-hover:bg-blue-400'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* 2. FRONT MAIN CARD (Positioned at left: 0, zIndex: 30) */}
                <div
                  onMouseEnter={() => setHoveredIndex(0)}
                  onClick={() => navigate(currentCard.to)}
                  style={{
                    zIndex: currentIndex === 0 ? 35 : 30,
                    transform: currentIndex === 0 ? 'translateY(-4px)' : 'translateY(0px)',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, border-color 0.3s',
                  }}
                  className={`absolute top-0 left-0 w-[300px] sm:w-[340px] md:w-[360px] h-[490px] sm:h-[510px] rounded-2xl bg-[#0B1528] border-2 transition-all p-5 sm:p-6 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer group hover:border-blue-400 hover:shadow-[0_30px_70px_rgba(37,99,235,0.35)] ${
                    currentIndex === 0
                      ? 'border-blue-500 ring-1 ring-blue-500/40'
                      : 'border-blue-500/80 ring-1 ring-blue-500/30'
                  }`}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(currentCard.to);
                    }
                  }}
                  aria-label={`Explore ${currentCard.title}`}
                >
                  <div key={currentCard.id} className="h-full flex flex-col justify-between animate-card-fade">
                    <div>
                      {/* TOP VISUAL BANNER with Image, Monogram & Badges */}
                      <div className="relative w-full h-[155px] sm:h-[165px] rounded-xl overflow-hidden mb-4 shrink-0 bg-slate-900 border border-white/[0.1] shadow-inner">
                        <img
                          src={currentCard.image}
                          alt={currentCard.title}
                          className="w-full h-full object-cover brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/30 to-black/60" />

                        {/* Floating Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                          <div className="flex items-center gap-2">
                            <div
                              style={{ fontFamily: "'Outfit', sans-serif" }}
                              className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-lg border border-blue-400/50 tracking-wider"
                            >
                              GK
                            </div>
                            <span
                              style={{ fontFamily: "'Outfit', sans-serif" }}
                              className="text-[10px] font-bold text-blue-300 uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10"
                            >
                              {currentCard.category}
                            </span>
                          </div>

                          <span
                            style={{ fontFamily: "'Space Grotesk', monospace" }}
                            className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10"
                          >
                            0{currentIndex + 1} / 0{total}
                          </span>
                        </div>

                        {/* Bottom Overlay Label */}
                        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between z-10">
                          <span
                            style={{ fontFamily: "'Space Grotesk', monospace" }}
                            className="text-[10px] tracking-wider uppercase text-slate-300 font-semibold drop-shadow"
                          >
                            Page Destination
                          </span>
                          <span className="text-[10px] text-blue-300 flex items-center gap-1 font-semibold group-hover:text-white transition-colors drop-shadow">
                            Click to Open <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="text-xl sm:text-[1.4rem] font-bold text-white mb-1 tracking-tight leading-tight group-hover:text-blue-200 transition-colors"
                      >
                        {currentCard.title}
                      </h3>
                      <p
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="text-slate-300 text-xs sm:text-[13px] font-medium mb-3.5 leading-snug line-clamp-2"
                      >
                        {currentCard.tagline}
                      </p>

                      {/* 4 Feature Deliverable Bullets */}
                      <div className="space-y-2 mb-3 bg-black/30 p-3 rounded-xl border border-white/[0.06]">
                        {currentCard.bullets.map((b, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                            <div className="w-3.5 h-3.5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <span style={{ fontFamily: "'Inter', sans-serif" }} className="leading-snug text-[11px] sm:text-xs">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Integrated Click Action */}
                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-300 transition-colors">
                      <span className="font-medium text-[11px] sm:text-xs">Click to visit page</span>
                      <div className="flex items-center gap-1.5 font-bold text-blue-400 group-hover:translate-x-1.5 transition-transform duration-300">
                        <span className="uppercase text-[11px] tracking-wider">OPEN PAGE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Dot Nav Indicators */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {pagesData.map((c, i) => (
                  <button
                    key={c.id}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onClick={() => {
                      setActiveIndex(i);
                      setHoveredIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Jump to ${c.title}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default NavPagesStack;
'''

# 1. Update in main repository
main_comp_file = r"c:\Users\ravir\Downloads\GK_Nexergy_Website_HTP-main\GK_Nexergy_Website_HTP-main\GK_Nexergy_Website_HTP-main\src\components\NavPagesStack\NavPagesStack.jsx"
os.makedirs(os.path.dirname(main_comp_file), exist_ok=True)
with open(main_comp_file, "w", encoding="utf-8") as f:
    f.write(nav_stack_code)
print(f"Updated main: {main_comp_file}")

# 2. Update in scratch docs
scratch_comp_file = r"c:\Users\ravir\.gemini\antigravity\scratch\docs\gk-nexergy\src\components\NavPagesStack\NavPagesStack.jsx"
os.makedirs(os.path.dirname(scratch_comp_file), exist_ok=True)
with open(scratch_comp_file, "w", encoding="utf-8") as f:
    f.write(nav_stack_code)
print(f"Updated scratch: {scratch_comp_file}")
