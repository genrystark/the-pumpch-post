import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft, TrendingUp, Rocket, Search } from "lucide-react";
import NewsFeed from "@/components/NewsFeed";

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

  const handleLaunchIdea = (newsTitle: string) => {
    const prompt = `Based on this news: "${newsTitle}" - suggest a token launch idea for Pump.fun`;
    setInput(prompt);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-screen bg-paper flex overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-56 bg-paper border-r border-border hidden lg:flex flex-col shrink-0">
        {/* Sidebar header */}
        <div className="p-3 border-b border-border">
          <Link to="/" className="flex items-center gap-2 text-ink hover:text-accent transition-colors">
            <ArrowLeft className="w-3 h-3" />
            <span className="font-mono text-xs uppercase tracking-widest">Back</span>
          </Link>
        </div>

        {/* Masthead */}
        <div className="p-3 border-b border-border">
          <h1 className="masthead text-xl text-accent">PUMPCH</h1>
          <p className="font-mono text-xs text-ink-faded uppercase tracking-wider">
            Trading Desk
          </p>
        </div>

        {/* Today's Narratives */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3 h-3 text-accent" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
              Narratives
            </h3>
          </div>
          <ul className="space-y-1">
            {sidebarData.narratives.map((narrative, i) => (
              <li key={i} className="font-body text-xs text-ink leading-snug">
                • {narrative}
              </li>
            ))}
          </ul>
        </div>

        {/* Active Launches */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-3 h-3 text-accent" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
              Active Launches
            </h3>
          </div>
          <ul className="space-y-1">
            {sidebarData.activeLaunches.map((launch, i) => (
              <li key={i} className="flex justify-between items-center">
                <span className="font-mono text-xs text-ink">{launch.name}</span>
                <span className="font-mono text-xs text-ink-faded uppercase">
                  {launch.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recently Analyzed */}
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-3 h-3 text-accent" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
              Analyzed
            </h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {sidebarData.recentTokens.map((token, i) => (
              <span
                key={i}
                className="inline-block border border-border px-1.5 py-0.5 font-mono text-xs text-ink"
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <header className="p-3 border-b border-border bg-paper shrink-0">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              <Link to="/" className="flex items-center gap-2 text-ink hover:text-accent transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="masthead text-lg text-accent">PUMPCH</span>
              </Link>
            </div>
            <div className="hidden lg:block">
              <h2 className="font-headline text-base text-ink">Agent Chat</h2>
              <p className="font-mono text-xs text-ink-faded uppercase tracking-wider">
                Direct line to the trading floor
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xl ${
                  message.role === "user"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted border border-border"
                } p-3 rounded-sm`}
              >
                {/* Message header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-70">
                    {message.role === "user" ? "You" : "Pumpch"}
                  </span>
                  <span className="font-mono text-xs opacity-50">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                {/* Message content */}
                <p className="font-body text-sm leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted border border-border p-3 rounded-sm">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-faded">
                  Pumpch is analyzing...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-border bg-paper shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Pumpch anything..."
              className="flex-1 bg-paper border border-border text-ink placeholder:text-ink-faded font-body h-10 text-sm"
            />
            <Button type="submit" variant="editorial" size="default" disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Send</span>
            </Button>
          </form>
          <p className="font-mono text-xs text-ink-faded mt-1.5 text-center">
            Press Enter to send • Pumpch does not provide financial advice
          </p>
        </div>
      </main>

      {/* Right News Panel */}
      <aside className="w-72 hidden xl:block shrink-0">
        <NewsFeed onLaunchIdea={handleLaunchIdea} />
      </aside>
    </div>
  );
};

export default Chat;
