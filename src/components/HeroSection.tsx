import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import pumpchLogo from "@/assets/pumpch-logo.png";

const HeroSection = () => {
  return (
    <section className="py-12 md:py-16 bg-paper">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="masthead text-4xl md:text-6xl lg:text-7xl text-ink mb-4 leading-[0.9]">
            HUNT THE<br />PUMP
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="w-16 h-px bg-accent" />
            <div className="w-1.5 h-1.5 bg-accent rotate-45" />
            <div className="w-16 h-px bg-accent" />
          </div>

          {/* Subheadline */}
          <p className="font-body text-base md:text-lg text-ink-light max-w-xl mx-auto mb-8 leading-relaxed">
            <span className="font-headline font-semibold text-accent">Pumpch</span> is an AI agent for Pump.fun traders and creators. 
            Talk to Pumpch, and it hunts opportunities down.
          </p>

          {/* CTA */}
          <Button asChild variant="editorial" size="lg" className="group">
            <Link to="/chat">
              Start Chatting
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          {/* Powered by */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-ink-faded uppercase tracking-wider">
              Powered by
            </span>
            <div className="flex items-center gap-2">
              {["Solana", "Pump.fun", "X", "OpenClaw"].map((item, i) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink uppercase tracking-wider">
                    {item}
                  </span>
                  {i < 3 && <span className="text-ink-faded">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mascot illustration */}
        <div className="mt-10 flex justify-center">
          <div className="border border-border p-4 bg-paper max-w-[180px]">
            <div className="text-center">
              <img 
                src={pumpchLogo} 
                alt="Pumpch AI Agent" 
                className="w-32 h-32 mx-auto object-contain mb-3"
              />
              <p className="font-headline text-sm text-ink italic">
                "The Agent That Reads the Pump"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
