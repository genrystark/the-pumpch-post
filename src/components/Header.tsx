import { Link } from "react-router-dom";
import { Minus, Square, X, Menu, MessageSquare } from "lucide-react";
import { useState } from "react";
import pumpchLogo from "@/assets/pumpch-logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="win95-window">
      {/* Title Bar */}
      <div className="win95-titlebar">
        <div className="flex items-center gap-2">
          <img 
            src={pumpchLogo} 
            alt="Pumpster" 
            className="w-4 h-4" 
            style={{ imageRendering: 'pixelated' }}
          />
          <Link to="/">
            <span className="cursor-pointer text-white font-bold text-xs sm:text-sm">
              <span className="hidden sm:inline">pumpster.claw - AI Token Agent</span>
              <span className="sm:hidden">pumpster.claw</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <button className="win95-control-btn hidden sm:flex" title="Minimize">
            <Minus className="w-2 h-2" />
          </button>
          <button className="win95-control-btn hidden sm:flex" title="Maximize">
            <Square className="w-2 h-2" />
          </button>
          <button className="win95-control-btn hidden sm:flex" title="Close">
            <X className="w-2 h-2" />
          </button>
          <button 
            className="win95-control-btn sm:hidden flex"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="win95-menubar flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-start sm:items-center`}>
          <nav className="flex flex-col sm:flex-row items-start sm:items-center">
            <a href="#launched-tokens" onClick={(e) => { e.preventDefault(); document.getElementById('launched-tokens')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="win95-menu-item text-[11px]">Launches</span>
            </a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="win95-menu-item text-[11px]">How It Works</span>
            </a>
            <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="win95-menu-item text-[11px]">Features</span>
            </a>
            <Link to="/chat">
              <span className="win95-menu-item win95-menu-item-active flex items-center gap-1 text-[11px]">
                <MessageSquare className="w-3 h-3" />
                Pumpster
              </span>
            </Link>
            <a 
              href="https://pump.fun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="win95-menu-item text-[11px]"
            >
              Pump.fun
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="win95-menu-item flex items-center gap-1 text-[11px]"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
              X
            </a>
          </nav>
        </div>
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex items-center gap-2 mt-2 sm:mt-0 pb-2 sm:pb-0`}>
          <button className="win95-button-primary font-mono text-xs font-bold">
            [CONNECT PHANTOM]
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
