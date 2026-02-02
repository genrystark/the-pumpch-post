import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import pumpchMascot from "@/assets/pumpch-mascot.png";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-paper paper-texture">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative stamp */}
          <div className="inline-block mb-8">
            <span className="stamp bg-accent text-accent-foreground">
              Breaking News
            </span>
          </div>

          {/* Main headline */}
          <h1 className="masthead text-6xl md:text-8xl lg:text-9xl text-ink mb-6 leading-[0.85]">
            HUNT THE<br />PUMP
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-24 h-px bg-ink" />
            <div className="w-2 h-2 bg-ink rotate-45" />
            <div className="w-24 h-px bg-ink" />
          </div>

          {/* Subheadline */}
          <p className="font-body text-xl md:text-2xl text-ink-light max-w-2xl mx-auto mb-10 leading-relaxed">
            <span className="font-headline font-semibold text-ink">Pumpch</span> is an AI agent for Pump.fun traders and creators. 
            Talk to Pumpch, and it hunts opportunities down.
          </p>

          {/* CTA */}
          <Button asChild variant="editorial" size="xl" className="group">
            <Link to="/chat">
              Start Chatting
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          {/* Powered by */}
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-ink-faded uppercase tracking-wider">
              Powered by
            </span>
            <div className="flex items-center gap-3">
              {["Solana", "Pump.fun", "X", "OpenClaw"].map((item, i) => (
                <span key={item} className="flex items-center gap-3">
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
        <div className="mt-16 flex justify-center">
          <div className="editorial-frame-thick p-6 max-w-xs">
            <div className="text-center">
              <img 
                src={pumpchMascot} 
                alt="Pumpch AI Agent Mascot" 
                className="w-48 h-48 mx-auto object-contain mb-4"
              />
              <p className="font-headline text-lg text-ink italic">
                "The Agent That Reads the Pump"
              </p>
              <p className="font-mono text-xs text-ink-faded mt-2 uppercase tracking-widest">
                — Financial Times of Pump.fun
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
