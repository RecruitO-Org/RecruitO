import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Sparkles } from "lucide-react";

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi 👋 I'm RecruitO AI. Ask me about jobs, skills, interviews or resume tips.",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "How to improve my resume?",
    "Top skills for frontend developer?",
    "How to crack technical interviews?",
    "Best internships for AI/ML?"
  ];

  const sendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: messageText },
      {
        role: "ai",
        text: "Smart AI responses will appear here once backend is connected 🤖",
      },
    ]);

    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[88vh] w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] border border-white/10">

      {/* LEFT CHAT HISTORY */}
      <div className="w-64 border-r border-white/10 p-6 hidden lg:block">
        <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
          <Sparkles size={16} />
          AI Sessions
        </h2>

        <div className="space-y-3 text-sm text-white/60">
          <div className="p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition">
            Resume Tips Chat
          </div>
          <div className="p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition">
            Interview Guidance
          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex flex-col flex-1 p-10 relative">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            RecruitO AI Assistant
          </h1>
          <p className="text-white/50 mt-1">
            Your personal 24/7 career mentor
          </p>
        </div>

        {/* SUGGESTIONS */}
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-6 py-4 rounded-3xl max-w-xl text-sm leading-relaxed shadow-lg ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                    : "bg-white/10 backdrop-blur-xl text-white border border-white/10"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="mt-8">
          <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 shadow-xl">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, jobs, interview tips..."
              className="flex-1 bg-transparent outline-none text-white placeholder-white/40 text-sm"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={() => sendMessage()}
              className="ml-4 h-11 w-11 flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:scale-110 transition-all duration-200 shadow-lg"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}