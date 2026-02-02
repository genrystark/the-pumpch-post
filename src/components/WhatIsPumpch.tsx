import { Bot, TrendingUp, Zap, MessageSquare } from "lucide-react";

const WhatIsPumpster = () => {
  return (
    <section id="what-is-pumpster" className="py-8">
      <div className="container">
        <div className="win95-window">
          <div className="win95-titlebar">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span className="text-xs sm:text-sm">About pumpster.claw</span>
            </div>
            <div className="flex gap-1">
              <button className="win95-control-btn text-[8px]">_</button>
              <button className="win95-control-btn text-[8px]">□</button>
              <button className="win95-control-btn text-[8px]">×</button>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] p-6">
            {/* Section header */}
            <div className="text-center mb-6">
              <span className="font-mono text-[10px] text-[#808080] uppercase tracking-widest">
                About the Agent
              </span>
              <h2 className="font-mono text-xl md:text-2xl text-white mt-1">
                THE AGENT THAT TRADES
                <br />
                <span className="text-orange">AND LAUNCHES WITH YOU</span>
              </h2>
            </div>

            {/* Features grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="win95-outset p-4 bg-[#c0c0c0]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-black mb-1">Not a Signal Bot</h3>
                    <p className="font-mono text-xs text-[#404040]">
                      Pumpster is not a trading algorithm that blindly follows charts. 
                      It's an AI agent designed specifically for the Pump.fun economy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="win95-outset p-4 bg-[#c0c0c0]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#000080] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-black mb-1">Narrative Tracker</h3>
                    <p className="font-mono text-xs text-[#404040]">
                      It watches narratives on X, tracks token launches in real-time, 
                      and helps users turn ideas into live tokens.
                    </p>
                  </div>
                </div>
              </div>

              <div className="win95-outset p-4 bg-[#c0c0c0]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-black mb-1">Instant Analysis</h3>
                    <p className="font-mono text-xs text-[#404040]">
                      Analyzes token behavior patterns and social signals 
                      to identify opportunities before they pump.
                    </p>
                  </div>
                </div>
              </div>

              <div className="win95-outset p-4 bg-[#c0c0c0]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-black mb-1">One Conversation</h3>
                    <p className="font-mono text-xs text-[#404040]">
                      One agent. Complete context. Your Pump.fun companion 
                      from idea to launch to trade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="win95-statusbar">
            <div className="win95-statusbar-inset flex-1 text-[10px]">
              Built on OpenClaw | Launched in Moltbook
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsPumpster;
