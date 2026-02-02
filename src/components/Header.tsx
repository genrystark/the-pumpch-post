import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-paper">
      {/* Main navigation */}
      <div className="container py-3">
        <div className="flex items-center justify-between">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-4">
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
            <h1 className="masthead text-2xl md:text-3xl text-accent tracking-tight">
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
    </header>
  );
};

export default Header;
