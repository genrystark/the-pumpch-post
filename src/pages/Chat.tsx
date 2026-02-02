import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft, TrendingUp, Rocket, Search, Image, FileImage, Sliders } from "lucide-react";
import NewsFeed from "@/components/NewsFeed";
import WalletManager, { WalletInfo } from "@/components/WalletManager";
import TokenPreview, { TokenData } from "@/components/TokenPreview";
import LaunchModeSelector, { LaunchMode } from "@/components/LaunchModeSelector";
import TwitterConnect from "@/components/TwitterConnect";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "wallet_prompt" | "logo_prompt" | "banner_prompt";
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Good morning, trader. I'm Pumpch, your AI agent for the Pump.fun economy. I track narratives, analyze tokens, and help you launch. What brings you to the floor today?",
    timestamp: new Date(),
  },
];

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Wallet state
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  // Token state
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    ticker: "",
    description: "",
    logo: null,
    banner: null,
    launchMode: "dev",
  });

  // Twitter state
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState<string | null>(null);

  // Stats (real data placeholders - would come from API)
  const [stats, setStats] = useState({
    analyzed: 0,
    activeLaunches: 0,
  });

  // Load real stats
  useEffect(() => {
    // Simulate loading real stats
    const loadStats = async () => {
      // In real app, fetch from API
      setStats({
        analyzed: Math.floor(Math.random() * 50) + 100,
        activeLaunches: Math.floor(Math.random() * 10) + 5,
      });
    };
    loadStats();
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle URL prompt parameter
  useEffect(() => {
    const promptParam = searchParams.get("prompt");
    if (promptParam) {
      setInput(promptParam);
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleWalletAdd = (wallet: WalletInfo) => {
    setWallets((prev) => [...prev, wallet]);
  };

  const handleWalletRemove = (id: string) => {
    setWallets((prev) => prev.filter((w) => w.id !== id));
  };

  const handleLaunchModeChange = (mode: LaunchMode) => {
    setTokenData((prev) => ({ ...prev, launchMode: mode }));
  };

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
    const userInput = input.trim().toLowerCase();
    setInput("");
    setIsTyping(true);

    // Check for launch idea requests
    const isLaunchIdea = userInput.includes("launch idea") || userInput.includes("token launch") || userInput.includes("suggest a token");

    setTimeout(() => {
      let response: Message;

      if (isLaunchIdea) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I can help you launch a token! First, let's set up your wallets. Would you like to:\n\n1. **Create a new Solana wallet** - I'll generate a fresh wallet for you\n2. **Import an existing wallet** - Use your private key\n\nPlease add your wallets using the panel on the left. You'll need at least one Dev wallet to proceed with the launch.",
          timestamp: new Date(),
          type: "wallet_prompt",
        };
      } else if (userInput.includes("logo") || userInput.includes("generate image")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I can generate a logo for your token! Just describe what you want:\n\n**Example prompts:**\n- \"A cute green frog wearing sunglasses\"\n- \"Abstract geometric pattern in blue and gold\"\n- \"A rocket ship with flames\"\n\nDescribe your ideal logo and I'll create it for you.",
          timestamp: new Date(),
          type: "logo_prompt",
        };
      } else if (userInput.includes("banner")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I can generate a banner for your token! Describe the banner you want:\n\n**Example prompts:**\n- \"Epic landscape with mountains at sunset\"\n- \"Cyber city with neon lights\"\n- \"Abstract wave patterns in vibrant colors\"\n\nDescribe your ideal banner and I'll create it.",
          timestamp: new Date(),
          type: "banner_prompt",
        };
      } else {
        const responses = [
          "Interesting inquiry. Let me scan the current narrative landscape for you. Based on my analysis of X activity and Pump.fun launches in the past 24 hours, there's notable momentum building around AI-themed tokens.",
          "I've analyzed this token's lifecycle. It appears to be in the mid-stage with declining volume. Historical patterns suggest caution—similar launches have seen 60% drawdowns at this phase.",
          "For a launch today, I'd recommend focusing on the current meta. Gaming and AI narratives are showing strength. I can help you develop a concept and timing strategy.",
          "That's a complex pattern. Looking at historical data from similar tokens, the pump is likely driven by coordinated social activity. Monitor the holder distribution closely.",
        ];

        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, response]);
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
      {/* Left Sidebar - Token Setup */}
      <aside className="w-64 bg-paper border-r border-border hidden lg:flex flex-col shrink-0 overflow-y-auto">
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
            Launch Desk
          </p>
        </div>

        {/* Real Stats */}
        <div className="p-3 border-b border-border">
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-border p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Search className="w-3 h-3 text-accent" />
              </div>
              <p className="font-headline text-lg text-ink">{stats.analyzed}</p>
              <p className="font-mono text-xs text-ink-faded">Analyzed</p>
            </div>
            <div className="border border-border p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Rocket className="w-3 h-3 text-accent" />
              </div>
              <p className="font-headline text-lg text-ink">{stats.activeLaunches}</p>
              <p className="font-mono text-xs text-ink-faded">Active</p>
            </div>
          </div>
        </div>

        {/* Token Preview */}
        <div className="p-3 border-b border-border">
          <TokenPreview tokenData={tokenData} wallets={wallets} />
        </div>

        {/* Launch Mode Selector */}
        <div className="p-3 border-b border-border">
          <LaunchModeSelector mode={tokenData.launchMode} onModeChange={handleLaunchModeChange} />
        </div>

        {/* Distribution Button */}
        <div className="p-3 border-b border-border">
          <Button variant="outline" className="w-full justify-start gap-2" disabled>
            <Sliders className="w-4 h-4" />
            <span className="font-mono text-xs">Distribution</span>
            <span className="ml-auto font-mono text-xs text-ink-faded">Soon</span>
          </Button>
        </div>

        {/* Generation Buttons */}
        <div className="p-3 border-b border-border space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Image className="w-3 h-3 text-accent" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
              Generate
            </h3>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 h-9"
            onClick={() => setInput("Generate a logo for my token")}
          >
            <Image className="w-4 h-4" />
            <span className="font-mono text-xs">Logo</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 h-9"
            onClick={() => setInput("Generate a banner for my token")}
          >
            <FileImage className="w-4 h-4" />
            <span className="font-mono text-xs">Banner</span>
          </Button>
        </div>

        {/* Twitter Connect */}
        <div className="p-3 border-b border-border">
          <TwitterConnect
            connected={twitterConnected}
            username={twitterUsername}
            onConnect={() => {
              setTwitterConnected(true);
              setTwitterUsername("pumpch_user");
            }}
            onDisconnect={() => {
              setTwitterConnected(false);
              setTwitterUsername(null);
            }}
          />
        </div>

        {/* Wallet Manager */}
        <div className="p-3 flex-1">
          <WalletManager
            wallets={wallets}
            onAddWallet={handleWalletAdd}
            onRemoveWallet={handleWalletRemove}
          />
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
                Direct line to the launch desk
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-ink-faded">
                  {stats.analyzed} analyzed
                </span>
                <span className="text-ink-faded">•</span>
                <span className="font-mono text-xs text-accent">
                  {stats.activeLaunches} active
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} opacity-0 animate-fade-in-up`}
              style={{ animationDelay: "0.1s" }}
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
                <div className="font-body text-sm leading-relaxed whitespace-pre-line">
                  {message.content}
                </div>
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
