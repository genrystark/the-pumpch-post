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
    <section className="py-10 md:py-14 bg-paper">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section header */}
          <span className="label-editorial">The Interface</span>
          <h2 className="masthead text-2xl md:text-3xl text-ink mt-1 mb-3">
            CHAT WITH PUMPCH
          </h2>
          
          <p className="font-body text-sm text-ink-light mb-6">
            Ask Pumpch anything about the Pump.fun ecosystem.
          </p>

          {/* Example prompts */}
          <div className="border border-border bg-paper p-4 mb-6">
            <p className="font-mono text-xs text-ink-faded uppercase tracking-widest mb-3">
              Example Prompts
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {examplePrompts.map((prompt) => (
                <div 
                  key={prompt} 
                  className="bg-muted border border-border px-3 py-2 text-left"
                >
                  <p className="font-mono text-xs text-ink">{prompt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button asChild variant="editorial" size="lg" className="group">
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
