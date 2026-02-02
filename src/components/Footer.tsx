import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-4 border-double border-ink bg-paper-aged">
      <div className="container py-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo section */}
          <div>
            <h2 className="masthead text-3xl text-ink mb-4">PUMPCH</h2>
            <p className="font-body text-sm text-ink-light leading-relaxed">
              The AI agent for Pump.fun traders and creators. 
              Hunt the pump, launch the coin.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faded mb-2">
              Navigation
            </span>
            <Link to="/#how-it-works" className="font-mono text-sm text-ink hover:text-accent transition-colors">
              How It Works
            </Link>
            <Link to="/#features" className="font-mono text-sm text-ink hover:text-accent transition-colors">
              Features
            </Link>
            <Link to="/chat" className="font-mono text-sm text-ink hover:text-accent transition-colors">
              Chat
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faded mb-2">
              Legal
            </span>
            <a href="#" className="font-mono text-sm text-ink hover:text-accent transition-colors">
              Terms
            </a>
            <a href="#" className="font-mono text-sm text-ink hover:text-accent transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-sm text-ink hover:text-accent transition-colors">
              Docs
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-mono text-sm text-ink hover:text-accent transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ink/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-ink-faded">
              © 2026 Pumpch. All rights reserved.
            </p>
            <p className="font-body text-xs text-ink-faded text-center max-w-xl italic">
              Pumpch is an experimental AI agent. It does not provide financial advice 
              and does not guarantee profits. Trade responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
