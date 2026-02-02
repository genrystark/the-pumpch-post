import { Link } from "react-router-dom";
import { MessageSquare, ArrowRight } from "lucide-react";
import pumpchLogo from "@/assets/pumpch-logo.png";

const ChatCTA = () => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="win95-window max-w-2xl mx-auto">
          <div className="win95-titlebar-green">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Start Chat - pumpster.claw</span>
            </div>
            <div className="flex gap-1">
              <button className="win95-control-btn text-[8px]">_</button>
              <button className="win95-control-btn text-[8px]">□</button>
              <button className="win95-control-btn text-[8px]">×</button>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 text-center">
            <img 
              src={pumpchLogo} 
              alt="Pumpster" 
              className="w-24 h-24 mx-auto mb-4 object-contain"
            />
            
            <h2 className="font-mono text-xl md:text-2xl text-white mb-2">
              READY TO <span className="text-green-400">HUNT</span>?
            </h2>
            
            <p className="font-mono text-sm text-[#b0b0b0] mb-6 max-w-md mx-auto">
              Start a conversation with Pumpster and discover the next big opportunity on Pump.fun.
            </p>
            
            <Link to="/chat">
              <button className="win95-button-primary text-sm flex items-center gap-2 mx-auto hover-elevate active-elevate-2">
                OPEN PUMPSTER.CLAW
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          
          <div className="win95-statusbar">
            <div className="win95-statusbar-inset flex-1 text-[10px]">
              Free to use | No registration required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatCTA;
