import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Monitor } from "lucide-react";
import pumpchLogo from "@/assets/pumpch-logo.png";

const AgentCard = () => {
  return (
    <div className="win95-window h-full flex flex-col">
      <div className="win95-titlebar">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          <span className="text-xs sm:text-sm">pumpster.claw - Agent Terminal</span>
        </div>
        <div className="flex gap-1">
          <button className="win95-control-btn text-[8px]">_</button>
          <button className="win95-control-btn text-[8px]">□</button>
          <button className="win95-control-btn text-[8px]">×</button>
        </div>
      </div>
      
      {/* Menu bar */}
      <div className="win95-menubar">
        <span className="win95-menu-item text-[11px]">File</span>
        <span className="win95-menu-item text-[11px]">Edit</span>
        <span className="win95-menu-item text-[11px]">View</span>
        <span className="win95-menu-item text-[11px]">Help</span>
      </div>
      
      {/* Content area styled as terminal */}
      <div className="bg-[#000080] flex-1 p-4 flex flex-col items-center justify-center min-h-[280px]">
        <div className="win95-outset bg-[#c0c0c0] p-4 mb-4">
          <img 
            src={pumpchLogo} 
            alt="pumpster.claw Agent" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
        </div>
        
        <div className="text-center mb-4">
          <div className="font-mono text-white text-lg font-bold mb-1">
            PUMPSTER.CLAW
          </div>
          <div className="font-mono text-[#00ff00] text-xs">
            ● AGENT ONLINE
          </div>
        </div>
        
        <div className="win95-outset bg-[#c0c0c0] p-3 mb-4 w-full max-w-[200px]">
          <div className="text-[10px] text-black font-mono text-center">
            <div className="flex justify-between mb-1">
              <span>Status:</span>
              <span className="text-green-700 font-bold">READY</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Network:</span>
              <span>Solana</span>
            </div>
            <div className="flex justify-between">
              <span>Mode:</span>
              <span>Hunt</span>
            </div>
          </div>
        </div>
        
        <Link to="/chat" className="w-full max-w-[200px]">
          <button className="win95-button-primary w-full flex items-center justify-center gap-2 text-xs hover-elevate active-elevate-2">
            <MessageSquare className="w-3 h-3" />
            OPEN TERMINAL
            <ArrowRight className="w-3 h-3" />
          </button>
        </Link>
      </div>
      
      <div className="win95-statusbar">
        <div className="win95-statusbar-inset flex-1 text-[10px]">
          Agent Ready | Built on OpenClaw
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
