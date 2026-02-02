import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft, TrendingUp, Rocket, Search } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const sidebarData = {
  narratives: [
    "AI agents trending on X",
    "Cat coins revival wave",
    "Gaming tokens early buzz",
  ],
  activeLaunches: [
    { name: "$PUMP", status: "Early" },
    { name: "$MEME", status: "Mid" },
    { name: "$DEGEN", status: "Late" },
  ],
  recentTokens: ["$CAT", "$DOG", "$FROG", "$APE"],
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Good morning, trader. I'm Pumpch, your AI agent for the Pump.fun economy. I track narratives, analyze tokens, and help you launch. What brings you to the floor today?",
    timestamp: new Date(),
  },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Interesting inquiry. Let me scan the current narrative landscape for you. Based on my analysis of X activity and Pump.fun launches in the past 24 hours, there's notable momentum building around AI-themed tokens.",
        "I've analyzed this token's lifecycle. It appears to be in the mid-stage with declining volume. Historical patterns suggest caution—similar launches have seen 60% drawdowns at this phase.",
        "For a launch today, I'd recommend focusing on the current meta. Gaming and AI narratives are showing strength. I can help you develop a concept and timing strategy.",
        "That's a complex pattern. Looking at historical data from similar tokens, the pump is likely driven by coordinated social activity. Monitor the holder distribution closely.",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Sidebar */}
      <aside className="w-64 bg-paper-aged border-r-2 border-ink hidden lg:flex flex-col">
        {/* Sidebar header */}
        <div className="p-4 border-b-2 border-ink">
          <Link to="/" className="flex items-center gap-2 text-ink hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest">Back to Front Page</span>
          </Link>
        </div>

        {/* Masthead */}
        <div className="p-4 border-b border-ink/30">
          <h1 className="masthead text-2xl text-ink">PUMPCH</h1>
          <p className="font-mono text-xs text-ink-faded uppercase tracking-wider mt-1">
            Trading Desk
          </p>
        </div>

        {/* Today's Narratives */}
        <div className="p-4 border-b border-ink/30">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
              Today's Narratives
            </h3>
          </div>
          <ul className="space-y-2">
            {sidebarData.narratives.map((narrative, i) => (
              <li key={i} className="font-body text-sm text-ink leading-relaxed">
                • {narrative}
              </li>
            ))}
          </ul>
        </div>

        {/* Active Launches */}
        <div className="p-4 border-b border-ink/30">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-4 h-4 text-accent" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
              Active Launches
            </h3>
          </div>
          <ul className="space-y-2">
            {sidebarData.activeLaunches.map((launch, i) => (
              <li key={i} className="flex justify-between items-center">
                <span className="font-mono text-sm text-ink">{launch.name}</span>
                <span className="font-mono text-xs text-ink-faded uppercase">
                  {launch.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recently Analyzed */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-accent" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
              Recently Analyzed
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sidebarData.recentTokens.map((token, i) => (
              <span
                key={i}
                className="inline-block border border-ink/30 px-2 py-1 font-mono text-xs text-ink"
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        {/* Chat header */}
        <header className="p-4 border-b-2 border-ink bg-paper">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              <Link to="/" className="flex items-center gap-2 text-ink hover:text-accent transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="masthead text-xl">PUMPCH</span>
              </Link>
            </div>
            <div className="hidden lg:block">
              <h2 className="font-headline text-xl text-ink">Agent Chat</h2>
              <p className="font-mono text-xs text-ink-faded uppercase tracking-wider">
                Direct line to the trading floor
              </p>
            </div>
            <div className="stamp bg-accent text-accent-foreground">
              Live
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl ${
                  message.role === "user"
                    ? "bg-ink text-paper"
                    : "bg-paper-aged border-2 border-ink"
                } p-4`}
              >
                {/* Message header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">
                    {message.role === "user" ? "You" : "Pumpch"}
                  </span>
                  <span className="font-mono text-xs opacity-40">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                {/* Message content */}
                <p className="font-body leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-paper-aged border-2 border-ink p-4">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-faded">
                  Pumpch is analyzing...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t-2 border-ink bg-paper-aged">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Pumpch anything..."
              className="flex-1 bg-paper border-2 border-ink text-ink placeholder:text-ink-faded font-body h-12"
            />
            <Button type="submit" variant="editorial" size="lg" disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
          <p className="font-mono text-xs text-ink-faded mt-2 text-center">
            Press Enter to send • Pumpch does not provide financial advice
          </p>
        </div>
      </main>
    </div>
  );
};

export default Chat;
