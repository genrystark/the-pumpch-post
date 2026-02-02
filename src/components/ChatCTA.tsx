import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const examplePrompts = [
  '"Is this token already dead?"',
  '"What should I launch today?"',
  '"Why is this pumping?"',
  '"What failed launches look like this?"',
];

const ChatCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-paper paper-texture">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <span className="label-editorial">The Interface</span>
          <h2 className="masthead text-4xl md:text-5xl text-ink mt-2 mb-4">
            CHAT WITH PUMPCH
          </h2>
          
          <p className="font-body text-lg text-ink-light mb-8">
            Ask Pumpch anything about the Pump.fun ecosystem.
          </p>

          {/* Example prompts */}
          <div className="editorial-frame-thick mb-8">
            <p className="font-mono text-xs text-ink-faded uppercase tracking-widest mb-4">
              Example Prompts
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {examplePrompts.map((prompt) => (
                <div 
                  key={prompt} 
                  className="bg-paper-aged border border-ink/20 px-4 py-3 text-left"
                >
                  <p className="font-mono text-sm text-ink">{prompt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button asChild variant="editorial" size="xl" className="group">
            <Link to="/chat">
              Start Chatting
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatCTA;
