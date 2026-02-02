import { MessageSquare, Search, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Your Intent",
    description: "Talk to Pumpch in natural language.",
    examples: [
      '"What\'s heating up today?"',
      '"Analyze this Pump.fun token"',
      '"Help me launch a meme coin"',
    ],
  },
  {
    icon: Search,
    title: "Research & Analysis",
    description: "Pumpch scans X, tracks narratives, analyzes Pump.fun tokens, and compares them to historical launch patterns.",
  },
  {
    icon: Rocket,
    title: "Trade or Launch",
    description: "Use insights to trade confidently or launch a new token directly on Pump.fun.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-10 md:py-14 bg-paper">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-3">
          <span className="label-editorial">The Process</span>
          <h2 className="masthead text-2xl md:text-3xl text-ink mt-1 mb-2">
            HOW IT WORKS
          </h2>
          <p className="font-body text-sm text-ink-light max-w-xl mx-auto">
            Pumpch is designed for the Pump.fun ecosystem. Agentic trading and launching.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-6" />

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <div key={step.title} className="border border-border bg-paper p-4 relative">
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent text-accent-foreground flex items-center justify-center font-headline text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-3">
                <step.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-headline text-base text-ink mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-body text-xs text-ink-light leading-relaxed mb-3">
                {step.description}
              </p>

              {/* Examples if any */}
              {step.examples && (
                <div className="border-t border-border pt-3">
                  <p className="font-mono text-xs text-ink-faded uppercase tracking-widest mb-1">
                    Examples:
                  </p>
                  <ul className="space-y-0.5">
                    {step.examples.map((example) => (
                      <li key={example} className="font-mono text-xs text-ink">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
