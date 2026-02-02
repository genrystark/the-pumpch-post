import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-paper">
      <div className="container py-8">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Logo section */}
          <div>
            <h2 className="masthead text-xl text-accent mb-2">PUMPCH</h2>
            <p className="font-body text-xs text-ink-light leading-relaxed">
              The AI agent for Pump.fun traders and creators.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faded mb-1">
              Navigation
            </span>
            <Link to="/#how-it-works" className="font-mono text-xs text-ink hover:text-accent transition-colors">
              How It Works
            </Link>
            <Link to="/#features" className="font-mono text-xs text-ink hover:text-accent transition-colors">
              Features
            </Link>
            <Link to="/chat" className="font-mono text-xs text-ink hover:text-accent transition-colors">
              Chat
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faded mb-1">
              Legal
            </span>
            <a href="#" className="font-mono text-xs text-ink hover:text-accent transition-colors">
              Terms
            </a>
            <a href="#" className="font-mono text-xs text-ink hover:text-accent transition-colors">
              Privacy
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-mono text-xs text-ink hover:text-accent transition-colors"
            >
              X
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="font-mono text-xs text-ink-faded">
              © 2026 Pumpch. All rights reserved.
            </p>
            <p className="font-body text-xs text-ink-faded text-center max-w-lg italic">
              Pumpch is an experimental AI agent. It does not provide financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
