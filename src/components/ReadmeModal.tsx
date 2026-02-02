import { useState } from "react";
import { FileText, X } from "lucide-react";
import pumpchLogo from "@/assets/pumpch-logo.png";

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReadmeModal = ({ isOpen, onClose }: ReadmeModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="win95-window max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="win95-titlebar">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs sm:text-sm">README.txt - declaw token</span>
          </div>
          <div className="flex gap-1">
            <button className="win95-control-btn text-[8px]">_</button>
            <button className="win95-control-btn text-[8px]">□</button>
            <button className="win95-control-btn text-[8px]" onClick={onClose}>
              <X className="w-2 h-2" />
            </button>
          </div>
        </div>
        
        <div className="win95-menubar">
          <span className="win95-menu-item text-[11px]">File</span>
          <span className="win95-menu-item text-[11px]">Edit</span>
          <span className="win95-menu-item text-[11px]">View</span>
          <span className="win95-menu-item text-[11px]">Help</span>
        </div>

        <div className="bg-white p-4 overflow-y-auto flex-1 text-black font-mono text-xs leading-relaxed">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#808080]">
            <img src={pumpchLogo} alt="declaw" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-lg font-bold">declaw token</h1>
              <p className="text-[10px] text-[#808080]">AI Token Agent v1.0</p>
            </div>
          </div>

          <pre className="whitespace-pre-wrap">
{`========================================
         DECLAW TOKEN README
========================================

DESCRIPTION
-----------
declaw is an AI agent designed for 
the meme token economy on Solana.

Built on OpenClaw infrastructure.
Launched in Moltbook platform.

FEATURES
--------
• Token Research & Analysis
• Narrative Tracking on X
• Token Declaw Assistance
• Real-time Market Signals
• AI-powered Trade Suggestions

HOW IT WORKS
------------
1. Tell declaw your idea or question
2. Agent analyzes X and on-chain data
3. Get recommendations or declaw tokens
4. Track performance in real-time

POWERED BY
----------
- OpenClaw AI Infrastructure
- Moltbook Launch Platform
- Solana Blockchain

DISCLAIMER
----------
Trading involves risk. Never invest more
than you can afford to lose. This is not
financial advice.

========================================
       © 2024 declaw token
========================================`}
          </pre>
        </div>

        <div className="win95-statusbar">
          <div className="win95-statusbar-inset flex-1 text-[10px]">
            README.txt | 1.2 KB
          </div>
          <div className="win95-statusbar-inset text-[10px]">
            Ln 1, Col 1
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeModal;
