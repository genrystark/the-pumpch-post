import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="win95-window">
      <div className="win95-titlebar">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-xs sm:text-sm">Welcome to declaw token</span>
        </div>
        <div className="flex gap-1">
          <button className="win95-control-btn text-[8px]">_</button>
          <button className="win95-control-btn text-[8px]">□</button>
          <button className="win95-control-btn text-[8px]">×</button>
        </div>
      </div>
      
      <div className="bg-[#1a1a1a] p-6">
        {/* Main headline */}
        <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
          <span className="text-orange">DECLAW</span> THE PUMP
          <span className="animate-blink">_</span>
        </h1>

        {/* Subheadline */}
        <p className="font-mono text-sm md:text-base text-[#b0b0b0] max-w-xl mb-6 leading-relaxed">
          <span className="text-orange font-bold">declaw</span> is an AI agent built on <span className="text-green-400">OpenClaw</span>, launched in <span className="text-blue-400">Moltbook</span>. 
          Talk to declaw, and it declaws opportunities for you.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link to="/chat">
            <button className="win95-button-primary flex items-center gap-2 text-sm hover-elevate active-elevate-2">
              <span>START CHATTING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link to="/#how-it-works">
            <button className="win95-button text-sm hover-elevate active-elevate-2">
              LEARN MORE
            </button>
          </Link>
        </div>

        {/* Powered by */}
        <div className="mt-6 flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] text-[#808080] uppercase tracking-wider">
            Powered by:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {["Solana", "X", "OpenClaw", "Moltbook"].map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#b0b0b0] uppercase tracking-wider hover:text-orange transition-colors cursor-default whitespace-nowrap">
                  {item}
                </span>
                {i < 3 && <span className="text-[#404040]">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
