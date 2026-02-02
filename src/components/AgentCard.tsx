import { useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, Send } from "lucide-react";
import pumpchLogo from "@/assets/pumpch-logo.png";

const AgentCard = () => {
  const [inputValue, setInputValue] = useState("");
  
  const terminalLines = [
    { type: "system", text: "C:\\PUMPSTER> Initializing pumpster.claw..." },
    { type: "system", text: "C:\\PUMPSTER> Agent loaded successfully." },
    { type: "system", text: "C:\\PUMPSTER> Ready to assist." },
    { type: "prompt", text: "Type a message or click 'Start Chat'..." },
  ];

  return (
    <div className="win95-window h-full flex flex-col">
      {/* Title Bar */}
      <div className="win95-titlebar">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span className="text-xs sm:text-sm">pumpster.claw - Terminal</span>
        </div>
        <div className="flex gap-1">
          <button className="win95-control-btn text-[8px]">_</button>
          <button className="win95-control-btn text-[8px]">□</button>
          <button className="win95-control-btn text-[8px]">×</button>
        </div>
      </div>
      
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-1 py-0.5 flex gap-4">
        <span className="text-[11px] text-black hover:bg-[#000080] hover:text-white px-1 cursor-pointer">File</span>
        <span className="text-[11px] text-black hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="text-[11px] text-black hover:bg-[#000080] hover:text-white px-1 cursor-pointer">View</span>
        <span className="text-[11px] text-black hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Help</span>
      </div>
      
      {/* Terminal Content */}
      <div className="bg-black flex-1 p-3 font-mono text-xs overflow-y-auto min-h-[200px]">
        {/* Agent Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src={pumpchLogo} 
            alt="Pumpster AI Agent" 
            className="w-20 h-20 object-contain opacity-80"
          />
        </div>
        
        {/* Terminal Lines */}
        <div className="space-y-1">
          {terminalLines.map((line, index) => (
            <div 
              key={index} 
              className={`${
                line.type === "system" 
                  ? "text-green-500" 
                  : "text-[#808080] italic"
              }`}
            >
              {line.text}
              {index === terminalLines.length - 1 && (
                <span className="animate-pulse ml-1">_</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Input Area */}
      <div className="bg-[#c0c0c0] p-2 border-t-2 border-white">
        <div className="flex gap-2">
          <div className="flex-1 win95-inset bg-white flex items-center">
            <span className="text-black text-xs px-1">{">"}</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter command..."
              className="flex-1 bg-transparent text-black text-xs outline-none py-1 pr-2 font-mono"
            />
          </div>
          <button className="win95-button px-2 py-1 text-[10px] flex items-center gap-1">
            <Send className="w-3 h-3" />
            Send
          </button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="bg-[#c0c0c0] p-2 pt-0 flex gap-2">
        <Link to="/chat" className="flex-1">
          <button className="win95-button-primary w-full py-2 text-xs">
            Start Chat
          </button>
        </Link>
        <button className="win95-button px-3 py-2 text-xs">
          Clear
        </button>
      </div>
      
      {/* Status Bar */}
      <div className="win95-statusbar flex justify-between items-center">
        <div className="win95-statusbar-inset flex-1 text-[10px] flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Agent Online
        </div>
        <div className="win95-statusbar-inset text-[10px]">
          v1.0.0
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
