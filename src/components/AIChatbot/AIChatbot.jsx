import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  X,
  Send,
  ArrowUp,
  Key,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
  Check,
  ChevronDown,
  ArrowDown,
} from "lucide-react";
import { askGKChatbot } from "../../utils/aiKnowledgeEngine";

// Minimal, elegant conversation starter pills
const STARTER_SUGGESTIONS = [
  "Explore AI & Automation",
  "What does GK Nexergy do?",
  "Nexergy Academy courses",
  "Talk about a project",
  "How can I contact the team?",
];

// GK Letter Logo Avatar Mark for Chatbot
const AIAvatarMark = ({ size = 36, isResponding = false, className = "" }) => (
  <div
    className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden ${className}`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      background: "#ffffff",
      padding: "4px",
      boxShadow: isResponding
        ? "0 0 16px rgba(56, 189, 248, 0.8), 0 0 6px rgba(37, 99, 235, 0.9)"
        : "0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(37, 99, 235, 0.2)",
      border: "1px solid rgba(59, 130, 246, 0.35)",
      transition: "all 0.3s ease",
    }}
  >
    <img
      src="/images/gk-letter-logo.png"
      alt="GK Letter Logo"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
      className={isResponding ? "animate-pulse" : ""}
    />
    {isResponding && (
      <span className="absolute inset-0 rounded-full border-2 border-blue-500 animate-ping opacity-40" />
    )}
  </div>
);

export const AIChatbot = ({ theme = "light" }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTopic, setActiveTopic] = useState("general");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gk_openai_key") || "");
  const [keyInput, setKeyInput] = useState(() => localStorage.getItem("gk_openai_key") || "");
  const [keySaved, setKeySaved] = useState(false);
  const [hasNewMessageBelow, setHasNewMessageBelow] = useState(false);

  const initialWelcomeText = `Hi 👋
I'm the **GK Nexergy AI assistant**.

I can help you explore our enterprise solutions, academy courses, client projects, careers, or answer any questions about the company.

What would you like to know?`;

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("gk_chat_history_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: "welcome-1",
        sender: "bot",
        text: initialWelcomeText,
        time: "Just now",
        routes: [],
      },
    ];
  });

  const chatFeedRef = useRef(null);
  const inputRef = useRef(null);
  const userScrolledUpRef = useRef(false);
  const isDark = theme === "dark";

  // Check if feed is near bottom
  const isNearBottom = useCallback(() => {
    const feed = chatFeedRef.current;
    if (!feed) return true;
    const isOverflowing = feed.scrollHeight > feed.clientHeight + 20;
    if (!isOverflowing) return true;
    return !userScrolledUpRef.current;
  }, []);

  // Smoothly scroll feed to bottom without affecting window scroll
  const scrollToBottom = useCallback((behavior = "smooth") => {
    const feed = chatFeedRef.current;
    if (feed) {
      feed.scrollTo({
        top: feed.scrollHeight,
        behavior,
      });
      userScrolledUpRef.current = false;
      setHasNewMessageBelow(false);
    }
  }, []);

  // Track scroll position in feed
  const handleFeedScroll = useCallback(() => {
    const feed = chatFeedRef.current;
    if (!feed) return;
    const distanceToBottom = feed.scrollHeight - feed.scrollTop - feed.clientHeight;
    if (distanceToBottom > 40) {
      userScrolledUpRef.current = true;
    } else {
      userScrolledUpRef.current = false;
      setHasNewMessageBelow(false);
    }
  }, []);

  // Global event listener for opening chatbot from anywhere
  useEffect(() => {
    const handleGlobalOpen = (e) => {
      setIsOpen(true);
      if (e?.detail?.query) {
        handleSend(e.detail.query);
      }
    };
    window.addEventListener("open-gk-chatbot", handleGlobalOpen);
    return () => window.removeEventListener("open-gk-chatbot", handleGlobalOpen);
  }, []);

  // Save messages to session
  useEffect(() => {
    try {
      sessionStorage.setItem("gk_chat_history_v2", JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages]);

  // Handle new message arrival: only auto-scroll if user has not scrolled up
  useEffect(() => {
    if (!isOpen) return;

    if (!userScrolledUpRef.current) {
      requestAnimationFrame(() => {
        scrollToBottom("smooth");
      });
    } else {
      setHasNewMessageBelow(true);
    }
  }, [messages, isOpen, scrollToBottom]);

  // Focus input when opened & handle Escape key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleSend = async (customText = null) => {
    const query = (customText || chatInput).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    if (isNearBottom()) {
      requestAnimationFrame(() => {
        scrollToBottom("smooth");
      });
    }

    try {
      const response = await askGKChatbot(query, apiKey, {
        activeTopic,
        history: messages,
      });

      setIsTyping(false);
      if (!response) return;

      if (response.topic) {
        setActiveTopic(response.topic);
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        routes: response.routes || [],
        source: response.source,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "I'm here to help. You can ask anything about GK Nexergy solutions, academy courses, or get in touch with our team.",
          routes: [{ label: "Contact Us", to: "/contact" }],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveKey = () => {
    const trimmed = keyInput.trim();
    setApiKey(trimmed);
    localStorage.setItem("gk_openai_key", trimmed);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyModal(false);
    }, 1000);
  };

  const handleClearHistory = () => {
    sessionStorage.removeItem("gk_chat_history_v2");
    setActiveTopic("general");
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: `Conversation cleared.\n\nHow can I help you explore GK Nexergy today?`,
        time: "Just now",
        routes: [],
      },
    ]);
  };

  const chatbotJSX = (
    <>
      <div
        className="select-none"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 99999999,
          pointerEvents: "auto",
        }}
      >
        <button
          data-testid="floating-chatbot-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close GK Nexergy AI Assistant" : "Open GK Nexergy AI Assistant"}
          className={`group relative flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl hover:scale-105 active:scale-95 ${
            isOpen
              ? "h-10 w-10 sm:h-11 sm:w-11 rounded-full p-2"
              : "rounded-full px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium gap-2 max-w-[calc(100vw-24px)]"
          }`}
          style={{
            background: isOpen
              ? isDark
                ? "rgba(15, 23, 42, 0.95)"
                : "rgba(255, 255, 255, 0.98)"
              : "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #0284c7 100%)",
            color: isOpen ? (isDark ? "#f8fafc" : "#0f172a") : "#ffffff",
            border: isOpen
              ? isDark
                ? "1px solid rgba(255, 255, 255, 0.16)"
                : "1px solid rgba(0, 0, 0, 0.1)"
              : "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: isOpen
              ? isDark
                ? "0 10px 30px rgba(0, 0, 0, 0.7)"
                : "0 10px 30px rgba(15, 23, 42, 0.14)"
              : "0 10px 25px rgba(37, 99, 235, 0.45), 0 0 15px rgba(56, 189, 248, 0.25)",
            backdropFilter: "blur(12px)",
          }}
        >
          {isOpen ? (
            <X className={`h-5 w-5 ${isDark ? "text-slate-200" : "text-slate-800"} transition-transform duration-200 group-hover:rotate-90`} />
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-white p-1 shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <img
                    src="/images/gk-letter-logo.png"
                    alt="GK Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              </div>
              <span className="tracking-wide text-xs sm:text-[13px] font-semibold text-white truncate">
                GK Nexergy AI
              </span>
            </div>
          )}
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. REFINED FLOATING AI ASSISTANT PANEL                    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            data-testid="ai-chatbot-window"
            role="dialog"
            aria-label="GK Nexergy AI Assistant"
            className="flex flex-col overflow-hidden font-sans"
            style={{
              position: "fixed",
              bottom: "74px",
              right: "16px",
              zIndex: 99999998,
              width: isExpanded ? "min(680px, calc(100vw - 32px))" : "min(400px, calc(100vw - 32px))",
              height: isExpanded ? "min(680px, calc(100dvh - 90px))" : "min(580px, calc(100dvh - 90px))",
              maxHeight: "calc(100dvh - 90px)",
              backgroundColor: isDark ? "#090d16" : "#ffffff",
              border: isDark ? "1px solid rgba(59, 130, 246, 0.22)" : "1px solid rgba(203, 213, 225, 0.9)",
              borderRadius: "20px",
              boxShadow: isDark
                ? "0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 35px -5px rgba(37, 99, 235, 0.18)"
                : "0 20px 45px -10px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 25px -5px rgba(37, 99, 235, 0.08)",
              color: isDark ? "#f8fafc" : "#0f172a",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* --- COMPACT SLEEK HEADER --- */}
            <div
              className="flex items-center justify-between px-3.5 py-3 relative z-10 shrink-0 gap-1.5"
              style={{
                background: isDark
                  ? "linear-gradient(180deg, #111a2e 0%, #0c1322 100%)"
                  : "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
                borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(226, 232, 240, 0.9)",
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <AIAvatarMark size={32} isResponding={isTyping} className="sm:w-9 sm:h-9" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className={`text-xs sm:text-[13px] font-bold tracking-tight truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                      GK Nexergy AI
                    </h3>
                    <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-emerald-500 shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
                      Online
                    </span>
                  </div>
                  <p className={`text-[9.5px] sm:text-[10px] truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Your intelligent digital guide
                  </p>
                </div>
              </div>

              {/* Minimal Header Controls */}
              <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                <button
                  data-testid="ai-key-btn"
                  onClick={() => setShowKeyModal(true)}
                  title="Configure OpenAI Key (Optional)"
                  aria-label="Configure OpenAI Key"
                  className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                    isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/60"
                  }`}
                >
                  <Key className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </button>

                <button
                  data-testid="ai-clear-btn"
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                    isDark ? "text-slate-400 hover:text-rose-400 hover:bg-slate-800" : "text-slate-500 hover:text-rose-600 hover:bg-slate-200/60"
                  }`}
                >
                  <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </button>

                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  title={isExpanded ? "Collapse width" : "Expand width"}
                  aria-label={isExpanded ? "Collapse width" : "Expand width"}
                  className={`hidden sm:flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                    isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/60"
                  }`}
                >
                  {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>

                <button
                  data-testid="ai-close-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  aria-label="Close assistant"
                  className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                    isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* --- CONVERSATION FEED (Smooth Native Scroll Container) --- */}
            <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden h-full">
              <div
                ref={chatFeedRef}
                onScroll={handleFeedScroll}
                className="flex-1 overflow-y-auto p-2.5 sm:p-4 space-y-3 sm:space-y-4 text-xs select-text"
                style={{
                  scrollBehavior: "smooth",
                  maxHeight: "100%",
                }}
              >
                {messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-full`}
                    >
                      {/* Message Bubble / Natural Text Container */}
                      <div
                        className={`relative max-w-[92%] sm:max-w-[88%] leading-relaxed break-words [overflow-wrap:anywhere] shadow-xs ${
                          isUser
                            ? "bg-blue-600 text-white rounded-2xl rounded-tr-xs px-3 py-2 sm:px-3.5 sm:py-2.5 text-[11.5px] sm:text-xs font-normal border border-blue-500/50 shadow-blue-500/20"
                            : isDark
                            ? "bg-[#111a2e] text-slate-200 rounded-2xl rounded-tl-xs px-3 py-2.5 sm:px-4 sm:py-3 border border-white/10 shadow-black/20"
                            : "bg-[#f8fafc] text-slate-800 rounded-2xl rounded-tl-xs px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-200/90 shadow-slate-200/40"
                        }`}
                      >
                        {/* Natural Markdown Content */}
                        <div className="space-y-2 whitespace-pre-line text-[11.5px] sm:text-[12.5px] leading-relaxed">
                          {msg.text.split("\n\n").map((paragraph, pIdx) => {
                            if (paragraph.includes("- ") || paragraph.includes("• ") || paragraph.includes("1. ")) {
                              const lines = paragraph.split("\n");
                              return (
                                <div key={pIdx} className="space-y-1.5 my-1.5">
                                  {lines.map((line, lIdx) => {
                                    const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
                                    const isNumbered = /^\d+\.\s/.test(line.trim());
                                    const cleanText = line.replace(/^[-•]\s*/, "").replace(/^\d+\.\s*/, "");

                                    return (
                                      <div key={lIdx} className="flex items-start gap-1.5 pl-0.5">
                                        {isBullet && (
                                          <span className={`mt-0.5 font-bold text-xs shrink-0 ${isDark ? "text-sky-400" : "text-blue-600"}`}>•</span>
                                        )}
                                        {isNumbered && (
                                          <span className={`font-semibold text-[11px] mt-0.5 shrink-0 ${isDark ? "text-sky-400" : "text-blue-600"}`}>
                                            {line.match(/^\d+\./)?.[0]}
                                          </span>
                                        )}
                                        <span dangerouslySetInnerHTML={{ __html: formatMarkdown(cleanText, isDark) }} />
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            }

                            return (
                              <p
                                key={pIdx}
                                dangerouslySetInnerHTML={{ __html: formatMarkdown(paragraph, isDark) }}
                              />
                            );
                          })}
                        </div>

                        {/* Contextual Action Pills */}
                        {msg.routes && msg.routes.length > 0 && (
                          <div className="mt-2.5 pt-2 flex flex-wrap gap-1.5 border-t border-slate-200/30 dark:border-white/10">
                            {msg.routes.slice(0, 2).map((route, rIdx) => (
                              <button
                                key={rIdx}
                                onClick={() => {
                                  if (route.external) {
                                    window.open(route.to, "_blank", "noopener,noreferrer");
                                  } else {
                                    setIsOpen(false);
                                    navigate(route.to);
                                  }
                                }}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] sm:text-[11px] font-medium transition-all duration-150 cursor-pointer ${
                                  isDark
                                    ? "bg-blue-950/70 hover:bg-blue-900/90 text-sky-300 border border-blue-700/50"
                                    : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80"
                                }`}
                              >
                                <span>{route.label}</span>
                                {route.external ? (
                                  <ExternalLink className="h-3 w-3 opacity-70" />
                                ) : (
                                  <ChevronRight className="h-3 w-3 opacity-70" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <span className={`text-[9.5px] mt-1 px-1 font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        {msg.time}
                      </span>
                    </motion.div>
                  );
                })}

                {/* Subtle Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 pl-1 py-1 text-xs"
                  >
                    <div
                      className={`flex items-center gap-1 px-3 py-2 rounded-xl ${
                        isDark ? "bg-[#111a2e] text-slate-400 border border-white/10" : "bg-[#f8fafc] text-slate-500 border border-slate-200/90"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Floating "↓ New message" Indicator */}
              <AnimatePresence>
                {hasNewMessageBelow && (
                  <motion.button
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    onClick={() => scrollToBottom("smooth")}
                    className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium shadow-lg cursor-pointer transition-transform hover:scale-105"
                    style={{
                      background: isDark ? "#1e293b" : "#ffffff",
                      color: isDark ? "#38bdf8" : "#2563eb",
                      border: isDark ? "1px solid rgba(56, 189, 248, 0.35)" : "1px solid rgba(37, 99, 235, 0.25)",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                    }}
                  >
                    <ArrowDown className="h-3 w-3" />
                    <span>New message</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* --- LIGHTWEIGHT STARTER SUGGESTIONS --- */}
            {messages.length <= 2 && !isTyping && (
              <div
                className="px-2.5 py-2 sm:px-3.5 sm:py-2.5 flex gap-1.5 overflow-x-auto no-scrollbar relative z-10 shrink-0"
                style={{
                  background: isDark ? "#080c14" : "#f8fafc",
                  borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(226, 232, 240, 0.9)",
                }}
              >
                {STARTER_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className={`shrink-0 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shadow-2xs ${
                      isDark
                        ? "bg-[#111a2e] text-slate-300 hover:text-white hover:bg-blue-600/25 border border-white/10 hover:border-blue-500/40"
                        : "bg-white text-slate-700 hover:text-blue-700 hover:bg-blue-50/90 border border-slate-200/90 hover:border-blue-300"
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* --- SLEEK MODERN INPUT BAR --- */}
            <div
              className="p-2.5 sm:p-3 relative z-10 shrink-0"
              style={{
                background: isDark ? "#0c1322" : "#ffffff",
                borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(226, 232, 240, 0.9)",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-1.5 sm:gap-2"
              >
                <div
                  className="flex-1 min-w-0 flex items-center rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/30"
                  style={{
                    background: isDark ? "#0d1527" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid rgba(203, 213, 225, 0.9)",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask GK Nexergy anything..."
                    data-testid="ai-chat-input"
                    className="w-full text-[11px] sm:text-xs font-normal outline-none bg-transparent py-0.5 min-w-0"
                    style={{
                      color: isDark ? "#f8fafc" : "#0f172a",
                    }}
                  />
                </div>

                {(() => {
                  const isEnabled = chatInput.trim().length > 0 && !isTyping;
                  return (
                    <button
                      type="submit"
                      disabled={!isEnabled}
                      data-testid="ai-send-btn"
                      aria-label="Send message"
                      style={{
                        display: "flex",
                        height: "34px",
                        width: "34px",
                        minWidth: "34px",
                        flexShrink: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        backgroundColor: isEnabled
                          ? "#2563eb"
                          : isDark
                          ? "#172033"
                          : "#f1f5f9",
                        color: isEnabled
                          ? "#ffffff"
                          : isDark
                          ? "#64748b"
                          : "#94a3b8",
                        border: isEnabled
                          ? "1px solid #1d4ed8"
                          : isDark
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid #cbd5e1",
                        boxShadow: isEnabled
                          ? "0 4px 14px rgba(37, 99, 235, 0.4)"
                          : "none",
                        cursor: isEnabled ? "pointer" : "not-allowed",
                        transition: "all 0.2s ease",
                      }}
                      className="active:scale-95 hover:brightness-110"
                    >
                      <Send
                        style={{
                          width: "14px",
                          height: "14px",
                          marginLeft: "2px",
                          color: "inherit",
                          stroke: "currentColor",
                        }}
                      />
                    </button>
                  );
                })()}
              </form>
            </div>

            {/* --- OPTIONAL API KEY MODAL --- */}
            <AnimatePresence>
              {showKeyModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-xs"
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className={`w-full max-w-[calc(100vw-32px)] sm:max-w-sm rounded-xl p-3.5 sm:p-5 shadow-2xl ${
                      isDark ? "bg-[#0c1424] text-white border border-slate-800" : "bg-white text-slate-900 shadow-2xl"
                    }`}
                  >
                    <div className={`flex items-center justify-between pb-2.5 border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                      <div className="flex items-center gap-1.5">
                        <Key className="h-3.5 w-3.5 text-blue-500" />
                        <h4 className="text-[11px] sm:text-xs font-semibold">OpenAI API Key (Optional)</h4>
                      </div>
                      <button
                        onClick={() => setShowKeyModal(false)}
                        className={`rounded-lg p-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-800"}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className={`mt-2.5 text-[10px] sm:text-[11px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      Our built-in knowledge engine answers instantly offline. You may optionally provide an OpenAI API key for live GPT-4o inference.
                    </p>

                    <div className="mt-3 space-y-2.5">
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="sk-..."
                        className={`w-full rounded-lg px-2.5 py-1.5 text-xs outline-none ${
                          isDark
                            ? "bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:border-blue-500"
                            : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                        }`}
                      />

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setKeyInput("");
                            setApiKey("");
                            localStorage.removeItem("gk_openai_key");
                            setShowKeyModal(false);
                          }}
                          className="px-2 py-1 rounded-lg text-[11px] font-medium text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                        >
                          Clear
                        </button>

                        <button
                          type="button"
                          onClick={handleSaveKey}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-medium transition-colors cursor-pointer shadow-sm"
                        >
                          {keySaved ? <Check className="h-3 w-3" /> : null}
                          <span>{keySaved ? "Saved" : "Save Key"}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return chatbotJSX;
};

// Helper for formatting markdown syntax: links [text](url), **bold**, *italics*
function formatMarkdown(str, isDark = true) {
  if (!str) return "";
  const strongClass = isDark ? "font-semibold text-sky-300" : "font-semibold text-blue-600";
  const emClass = isDark ? "text-slate-300" : "text-slate-600";
  const linkClass = isDark
    ? "font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-2 decoration-sky-400/40"
    : "font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-600/40";

  return str
    .replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer" class="${linkClass}">$1</a>`)
    .replace(/\*\*(.*?)\*\*/g, `<strong class="${strongClass}">$1</strong>`)
    .replace(/\*(.*?)\*/g, `<em class="${emClass}">$1</em>`);
}

export default AIChatbot;
