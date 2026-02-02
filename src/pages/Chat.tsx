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
    content: "Good morning, trader. I'm pumpster.claw, your AI agent for the Pump.fun economy. I track narratives, analyze tokens, and help you launch. What brings you to the floor today?",
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
    <div className="h-screen bg-[#008080] flex overflow-hidden p-2 sm:p-4">
      {/* Left Sidebar - Token Setup */}
      <aside className="w-72 hidden lg:flex flex-col shrink-0 mr-2 max-h-full">
        <div className="win95-window h-full flex flex-col overflow-hidden">
          <div className="win95-titlebar">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              <span className="text-xs">Launch Desk</span>
            </div>
            <div className="flex gap-1">
              <button className="win95-control-btn text-[8px]">_</button>
              <button className="win95-control-btn text-[8px]">□</button>
              <button className="win95-control-btn text-[8px]">×</button>
            </div>
          </div>
          
          <div className="bg-[#c0c0c0] flex-1 overflow-y-auto">
            {/* Header */}
            <div className="p-2 border-b-2 border-[#808080]">
              <Link to="/" className="flex items-center gap-2 text-[#000080] hover:underline">
                <ArrowLeft className="w-3 h-3" />
                <span className="font-mono text-xs">← Back to Desktop</span>
              </Link>
            </div>

            {/* Masthead */}
            <div className="p-3 border-b-2 border-[#808080] bg-[#000080] text-white">
              <h1 className="font-['VT323'] text-xl text-[#ff6b00]">pumpster.claw</h1>
              <p className="font-mono text-[10px] text-[#c0c0c0]">
                LAUNCH DESK v1.0
              </p>
            </div>

            {/* Real Stats */}
            <div className="p-2">
              <div className="win95-groupbox p-2">
                <span className="win95-groupbox-title">Statistics</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="win95-inset p-2 text-center bg-white">
                    <Search className="w-3 h-3 mx-auto mb-1 text-black" />
                    <p className="font-bold text-lg text-black">{stats.analyzed}</p>
                    <p className="font-mono text-[10px] text-black">Analyzed</p>
                  </div>
                  <div className="win95-inset p-2 text-center bg-white">
                    <Rocket className="w-3 h-3 mx-auto mb-1 text-[#ff6b00]" />
                    <p className="font-bold text-lg text-[#ff6b00]">{stats.activeLaunches}</p>
                    <p className="font-mono text-[10px] text-black">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Preview */}
            <div className="p-2">
              <TokenPreview tokenData={tokenData} wallets={wallets} />
            </div>

            {/* Launch Mode Selector */}
            <div className="p-2">
              <LaunchModeSelector mode={tokenData.launchMode} onModeChange={handleLaunchModeChange} />
            </div>

            {/* Distribution Button */}
            <div className="p-2">
              <button className="win95-button w-full flex items-center gap-2 justify-center py-2" disabled>
                <Sliders className="w-4 h-4 text-black" />
                <span className="font-mono text-xs text-black">Distribution</span>
                <span className="ml-2 text-[10px] text-[#808080]">[Soon]</span>
              </button>
            </div>

            {/* Generation Buttons */}
            <div className="p-2">
              <div className="win95-groupbox p-2">
                <span className="win95-groupbox-title">Generate</span>
                <div className="space-y-2 mt-2">
                  <button
                    className="win95-button w-full flex items-center gap-2 py-1"
                    onClick={() => setInput("Generate a logo for my token")}
                  >
                    <Image className="w-4 h-4 text-black" />
                    <span className="font-mono text-xs text-black">Logo</span>
                  </button>
                  <button
                    className="win95-button w-full flex items-center gap-2 py-1"
                    onClick={() => setInput("Generate a banner for my token")}
                  >
                    <FileImage className="w-4 h-4 text-black" />
                    <span className="font-mono text-xs text-black">Banner</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Twitter Connect */}
            <div className="p-2">
              <TwitterConnect
                connected={twitterConnected}
                username={twitterUsername}
                onConnect={() => {
                  setTwitterConnected(true);
                  setTwitterUsername("pumpster_user");
                }}
                onDisconnect={() => {
                  setTwitterConnected(false);
                  setTwitterUsername(null);
                }}
              />
            </div>

            {/* Wallet Manager */}
            <div className="p-2 flex-1">
              <WalletManager
                wallets={wallets}
                onAddWallet={handleWalletAdd}
                onRemoveWallet={handleWalletRemove}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0 mx-2 max-h-full overflow-hidden">
        <div className="win95-window h-full flex flex-col overflow-hidden">
          <div className="win95-titlebar-green">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span className="text-xs">pumpster.claw - Agent Chat</span>
            </div>
            <div className="flex gap-1">
              <button className="win95-control-btn text-[8px]">_</button>
              <button className="win95-control-btn text-[8px]">□</button>
              <button className="win95-control-btn text-[8px]">×</button>
            </div>
          </div>
          
          {/* Chat header */}
          <div className="bg-[#c0c0c0] p-2 border-b-2 border-[#808080] flex items-center justify-between">
            <div className="lg:hidden">
              <Link to="/" className="flex items-center gap-2 text-[#000080] hover:underline">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-['VT323'] text-lg text-[#ff6b00]">pumpster.claw</span>
              </Link>
            </div>
            <div className="hidden lg:block">
              <h2 className="font-bold text-sm">Direct line to the launch desk</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span>{stats.analyzed} analyzed</span>
                <span>•</span>
                <span className="text-[#008000] font-bold">{stats.activeLaunches} active</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#1a1a1a]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xl ${
                    message.role === "user"
                      ? "bg-[#000080] text-white border-2 border-t-[#0000ff] border-l-[#0000ff] border-b-[#000040] border-r-[#000040]"
                      : "bg-[#2a2a2a] text-[#00ff00] border border-[#3a3a3a]"
                  } p-3`}
                >
                  {/* Message header */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs uppercase opacity-70">
                      {message.role === "user" ? "You" : "pumpster.claw"}
                    </span>
                    <span className="font-mono text-[10px] opacity-50">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  {/* Message content */}
                  <div className="font-mono text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#2a2a2a] border border-[#3a3a3a] p-3">
                  <span className="font-mono text-xs text-[#00ff00] animate-pulse">
                    pumpster.claw is analyzing...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="bg-[#c0c0c0] p-2 border-t-2 border-[#dfdfdf]">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask pumpster.claw anything..."
                className="win95-inset flex-1 px-2 py-1 font-mono text-sm bg-white"
              />
              <button 
                type="submit" 
                className="win95-button-primary px-4 flex items-center gap-1"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
            <p className="font-mono text-[10px] text-[#808080] mt-1 text-center">
              Press Enter to send • pumpster.claw does not provide financial advice
            </p>
          </div>
        </div>
      </main>

      {/* Right News Panel */}
      <aside className="w-72 hidden xl:flex flex-col shrink-0 ml-2 max-h-full">
        <NewsFeed onLaunchIdea={handleLaunchIdea} />
      </aside>
    </div>
  );
};

export default Chat;
