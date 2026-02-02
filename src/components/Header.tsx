import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full border-b-2 border-ink bg-paper">
      {/* Top date line */}
      <div className="border-b border-ink/20 py-1">
        <div className="container flex justify-between items-center">
          <span className="font-mono text-xs text-ink-faded uppercase tracking-widest">
            The Pump.fun Chronicle
          </span>
          <span className="font-mono text-xs text-ink-faded">
            Est. 2024 • Solana Network
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/#how-it-works" 
              className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/#features" 
              className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
            >
              Agent
            </Link>
            <Link 
              to="/#what-is-pumpch" 
              className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
            >
              Research
            </Link>
            <a 
              href="https://pump.fun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
            >
              Pump.fun
            </a>
          </nav>

          {/* Center masthead */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="masthead text-4xl md:text-5xl text-ink tracking-tight">
              PUMPCH
            </h1>
          </Link>

          {/* Right CTA */}
          <div className="ml-auto">
            <Button asChild variant="editorial" size="sm">
              <Link to="/chat">Start Chatting</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="border-t-4 border-double border-ink" />
    </header>
  );
};

export default Header;
