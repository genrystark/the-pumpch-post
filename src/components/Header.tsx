import { Link } from "react-router-dom";
import { Minus, Square, X, Menu, MessageSquare, Wallet } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import declawLogo from "@/assets/declaw-logo.png";
import { shortenAddress } from "@/lib/solana";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { publicKey, connected, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const handleWalletClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  return (
    <header className="win95-window">
      {/* Title Bar */}
      <div className="win95-titlebar">
        <div className="flex items-center gap-2">
          <motion.img 
            src={declawLogo} 
            alt="declaw" 
            className="w-5 h-5" 
            whileHover={{ rotate: 20, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <Link to="/">
            <span className="cursor-pointer text-white font-bold text-xs sm:text-sm">
              <span className="hidden sm:inline">declaw token - AI Token Agent</span>
              <span className="sm:hidden">declaw</span>
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
              <motion.span 
                className="px-2 py-0.5 text-black hover:bg-[#000080] hover:text-white cursor-pointer text-[11px]"
                whileHover={{ backgroundColor: "#000080", color: "#fff" }}
              >
                Declaws
              </motion.span>
            </a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <motion.span 
                className="px-2 py-0.5 text-black hover:bg-[#000080] hover:text-white cursor-pointer text-[11px]"
                whileHover={{ backgroundColor: "#000080", color: "#fff" }}
              >
                How It Works
              </motion.span>
            </a>
            <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <motion.span 
                className="px-2 py-0.5 text-black hover:bg-[#000080] hover:text-white cursor-pointer text-[11px]"
                whileHover={{ backgroundColor: "#000080", color: "#fff" }}
              >
                Features
              </motion.span>
            </a>
            <Link to="/chat">
              <motion.span 
                className="px-2 py-0.5 bg-[#ff6b4a] text-white flex items-center gap-1 text-[11px] cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-3 h-3" />
                declaw
              </motion.span>
            </Link>
            <a 
              href="https://x.com/i/communities/2018414171243573608/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2 py-0.5 text-black hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-1 text-[11px]"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
              X
            </a>
          </nav>
        </div>
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex items-center gap-2 mt-2 sm:mt-0 pb-2 sm:pb-0`}>
          <motion.button 
            onClick={handleWalletClick}
            disabled={connecting}
            className={`font-mono text-xs font-bold flex items-center gap-1 ${
              connected ? 'win95-button' : 'win95-button-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Wallet className="w-3 h-3" />
            {connecting ? (
              'CONNECTING...'
            ) : connected && publicKey ? (
              <>
                <motion.span 
                  className="w-2 h-2 bg-[#00ff00] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                {shortenAddress(publicKey.toString())}
              </>
            ) : (
              '[CONNECT PHANTOM]'
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
