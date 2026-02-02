import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import pumpchLogo from "@/assets/pumpch-logo.png";

const HeroSection = () => {
  return (
    <div className="text-center lg:text-left">
      {/* Main headline */}
      <h1 className="masthead text-4xl md:text-5xl lg:text-6xl text-ink mb-4 leading-[0.9] opacity-0 animate-fade-in-up">
        HUNT THE<br />PUMP
      </h1>

      {/* Decorative divider */}
      <div className="flex items-center justify-center lg:justify-start gap-3 my-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="w-16 h-px bg-accent" />
        <div className="w-1.5 h-1.5 bg-accent rotate-45" />
        <div className="w-16 h-px bg-accent" />
      </div>

      {/* Subheadline */}
      <p className="font-body text-base md:text-lg text-ink-light max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <span className="font-headline font-semibold text-accent">Pumpch</span> is an AI agent for Pump.fun traders and creators. 
        Talk to Pumpch, and it hunts opportunities down.
      </p>

      {/* CTA */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <Button asChild variant="editorial" size="lg" className="group hover:scale-105 transition-all duration-200">
          <Link to="/chat">
            Start Chatting
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      {/* Powered by */}
      <div className="mt-6 flex items-center justify-center lg:justify-start gap-2 flex-wrap opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <span className="font-mono text-xs text-ink-faded uppercase tracking-wider">
          Powered by
        </span>
        <div className="flex items-center gap-2">
          {["Solana", "Pump.fun", "X", "OpenClaw"].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink uppercase tracking-wider hover:text-accent transition-colors cursor-default">
                {item}
              </span>
              {i < 3 && <span className="text-ink-faded">•</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Mascot illustration */}
      <div className="mt-8 flex justify-center lg:justify-start opacity-0 animate-scale-in" style={{ animationDelay: "0.6s" }}>
        <div className="border border-border p-3 bg-paper max-w-[140px] hover:border-accent hover:shadow-md transition-all duration-300">
          <div className="text-center">
            <img 
              src={pumpchLogo} 
              alt="Pumpch AI Agent" 
              className="w-24 h-24 mx-auto object-contain mb-2"
            />
            <p className="font-headline text-xs text-ink italic">
              "The Agent That Reads the Pump"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
