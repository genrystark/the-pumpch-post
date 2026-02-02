import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import pumpchLogo from "@/assets/pumpch-logo.png";

const AgentCard = () => {
  return (
    <div className="win95-window h-full">
      <div className="win95-titlebar-green">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Pumpster Agent</span>
        </div>
        <div className="flex gap-1">
          <button className="win95-control-btn text-[8px]">_</button>
          <button className="win95-control-btn text-[8px]">□</button>
          <button className="win95-control-btn text-[8px]">×</button>
        </div>
      </div>
      
      <div className="bg-[#1a1a1a] p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
        <img 
          src={pumpchLogo} 
          alt="Pumpster AI Agent" 
          className="w-32 h-32 md:w-40 md:h-40 object-contain mb-4"
        />
        
        <p className="font-mono text-sm text-white italic text-center mb-4">
          "The Agent That Reads the Pump"
        </p>
        
        <div className="win95-groupbox px-4 py-2 mb-4">
          <span className="win95-groupbox-title">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-mono">ONLINE</span>
          </div>
        </div>
        
        <Link to="/chat" className="w-full">
          <button className="win95-button-primary w-full flex items-center justify-center gap-2 text-sm hover-elevate active-elevate-2">
            Talk to Pumpster
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AgentCard;
