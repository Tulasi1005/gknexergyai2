import os

card_stack_code = '''import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export const CardStack = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlCard = searchParams.get('card');
  const defaultIdx = urlCard !== null && !isNaN(parseInt(urlCard, 10)) ? parseInt(urlCard, 10) : 0;
  const [activeIndex, setActiveIndex] = useState(defaultIdx);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollTabsRef = useRef(null);

  const cardsData = [
    {
      id: 'ai-automation',
      to: '/ai-hub',
      tabLabel: 'AI',
      category: 'AI & AUTOMATION',
      title: 'AI Integration',
      tagline: 'Make your business work smarter.',
      bullets: [
        'Context-aware conversational AI assistants',
        'Document intelligence & invoice OCR',
        'Zero-touch workflow API orchestration',
        'Enterprise RAG & private knowledge search',
      ],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'data-analytics',
      to: '/solutions',
      tabLabel: 'DATA',
      category: 'DATA & ANALYTICS',
      title: 'Data Intelligence',
      tagline: 'From raw records to confident decisions.',
      bullets: [
        'PostgreSQL ACID relational data storage',
        'Real-time executive performance dashboards',
        'Cohort retention & customer LTV modeling',
        'Automated operational telemetry alerts',
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'digital-solutions',
      to: '/solutions',
      tabLabel: 'PLATFORM',
      category: 'DIGITAL SOLUTIONS',
      title: 'Modern Platforms',
      tagline: 'Resilient web, cloud & mobile architectures.',
      bullets: [
        'High-speed cloud-native web applications',
        'Cross-platform iOS & Android mobile apps',
        'Microservices with zero vendor lock-in',
        'Enterprise role-based security (RBAC)',
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'industries',
      to: '/industries',
      tabLabel: 'SECTORS',
      category: 'INDUSTRY SOLUTIONS',
      title: 'Industry Systems',
      tagline: 'Engineered for sector operating realities.',
      bullets: [
        'HIPAA-ready encrypted clinical care platforms',
        'Interactive LMS & automated code evaluation',
        'Financial ledger & automated reconciliation',
        'Omnichannel retail & inventory synchronization',
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'company',
      to: '/company',
      tabLabel: 'PARTNER',
      category: 'STRATEGIC ADVISORY',
      title: 'Enterprise Partner',
      tagline: 'Technology that moves business forward.',
      bullets: [
        'Visakhapatnam engineering center of excellence',
        'Dedicated practicing engineering pods',
        '100% intellectual property ownership',
        'Measurable business outcomes & ROI',
      ],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'academy',
      to: '/academy',
      tabLabel: 'ACADEMY',
      category: 'NEXERGY ACADEMY',
      title: 'Skills Acceleration',
      tagline: 'Train. Build. Transform.',
      bullets: [
        '16-Week Cyber Security & Ethical Hacking',
        'PostgreSQL database internals & tuning',
        'Practical AI tools & modern web engineering',
        'Direct live-repository apprenticeships',
      ],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'careers',
      to: '/careers',
      tabLabel: 'CAREERS',
      category: 'ENGINEERING PODS',
      title: 'Join Our Team',
      tagline: "Build what's next with GK Nexergy.",
      bullets: [
        'High-autonomy agile engineering pods',
        'Modern stack: React, Node, Python, Postgres',
        'Real-world client digital transformation',
        'Continuous mentorship & career progression',
      ],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const total = cardsData.length;
  const currentIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const currentCard = cardsData[currentIndex];

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

  useEffect(() => {
    if (scrollTabsRef.current) {
      const activeBtn = scrollTabsRef.current.children[currentIndex];
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  return (
    <div className="w-full select-none" onMouseLeave={() => setHoveredIndex(null)}>
      
      {/* ======================================================== */}
      {/* 1. MOBILE & TABLET VIEW (< 1024px)                       */}
      {/* ======================================================== */}
      <div className="block lg:hidden w-full max-w-[440px] mx-auto">
        {/* Horizontal Tabs Bar */}
        <div
          ref={scrollTabsRef}
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cardsData.map((c, idx) => {
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={c.id}
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
                <span>{c.tabLabel}</span>
                <span className={`text-[10px] font-mono ml-0.5 px-1 rounded ${
                  isCurrent ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Header / Controls */}
        <div className="flex items-center justify-between px-2 mb-3">
          <span className="text-xs font-mono text-slate-400">
            <strong className="text-white">0{currentIndex + 1}</strong> / 0{total} &mdash; {currentCard.category}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/[0.1] text-white flex items-center justify-center active:scale-95"
              aria-label="Previous capability"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/[0.1] text-white flex items-center justify-center active:scale-95"
              aria-label="Next capability"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Card */}
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
                  Capability Spotlight
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(currentCard.to);
            }}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
          >
            <span>Explore {currentCard.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Dot Nav */}
        <div className="flex justify-center items-center gap-1.5 mt-3.5">
          {cardsData.map((c, i) => (
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
      {/* 2. DESKTOP PHYSICAL STACK (>= 1024px)                    */}
      {/* ======================================================== */}
      <div className="hidden lg:block w-full max-w-[620px] xl:max-w-[640px] select-none">
        {/* Top Header & Deck Controls */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.1] pr-1">
          <div>
            <span
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-[11px] tracking-[0.2em] text-blue-400 uppercase font-bold block"
            >
              GK NEXERGY CAPABILITY STACK
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
          {cardsData.slice(1).map((card, offsetIdx) => {
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

                {/* Background Card Peek Content */}
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

                  <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-blue-400/40">
                      <img src={card.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-blue-400 block uppercase tracking-wider">
                        Capability
                      </span>
                      <span className="text-xs text-slate-200 font-medium truncate block">
                        {card.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Physical Right Tab */}
                <div
                  className={`absolute top-0 right-0 w-[42px] h-full flex flex-col items-center justify-between py-6 z-20 border-l transition-colors ${
                    isSelected
                      ? 'bg-[#0E1E3B]/95 border-blue-400/60'
                      : 'bg-[#091122]/90 group-hover:bg-[#0E1E3B]/90 border-white/[0.1]'
                  }`}
                >
                  <span
                    style={{ fontFamily: "'Space Grotesk', monospace" }}
                    className={`text-xs font-bold transition-colors ${
                      isSelected ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-300'
                    }`}
                  >
                    0{cardIdx + 1}
                  </span>

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

          {/* 2. FRONT MAIN CARD */}
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
                <div className="relative w-full h-[155px] sm:h-[165px] rounded-xl overflow-hidden mb-4 shrink-0 bg-slate-900 border border-white/[0.1] shadow-inner">
                  <img
                    src={currentCard.image}
                    alt={currentCard.title}
                    className="w-full h-full object-cover brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/30 to-black/60" />

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

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between z-10">
                    <span
                      style={{ fontFamily: "'Space Grotesk', monospace" }}
                      className="text-[10px] tracking-wider uppercase text-slate-300 font-semibold drop-shadow"
                    >
                      Capability Spotlight
                    </span>
                    <span className="text-[10px] text-blue-300 flex items-center gap-1 font-semibold group-hover:text-white transition-colors drop-shadow">
                      Click to Open <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

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

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-300 transition-colors">
                <span className="font-medium text-[11px] sm:text-xs">Click card to explore details</span>
                <div className="flex items-center gap-1.5 font-bold text-blue-400 group-hover:translate-x-1.5 transition-transform duration-300">
                  <span className="uppercase text-[11px] tracking-wider">Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Dot Nav Indicators */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {cardsData.map((c, i) => (
            <button
              key={c.id}
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={() => {
                setActiveIndex(i);
                setHoveredIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Jump to ${c.title}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
'''

scratch_card_stack = r"c:\Users\ravir\.gemini\antigravity\scratch\docs\gk-nexergy\src\components\CardStack\CardStack.jsx"
with open(scratch_card_stack, "w", encoding="utf-8") as f:
    f.write(card_stack_code)
print(f"Updated scratch CardStack.jsx: {scratch_card_stack}")
