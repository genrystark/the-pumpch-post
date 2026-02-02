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
    <section id="how-it-works" className="py-16 md:py-24 bg-paper paper-texture">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-4">
          <span className="label-editorial">The Process</span>
          <h2 className="masthead text-4xl md:text-5xl text-ink mt-2 mb-4">
            HOW IT WORKS
          </h2>
          <p className="font-body text-lg text-ink-light max-w-2xl mx-auto">
            Pumpch is bespokely designed for the Pump.fun ecosystem. 
            Agentic trading and launching.
          </p>
        </div>

        {/* Divider */}
        <div className="divider-double my-8" />

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="editorial-frame-thick relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-ink text-paper flex items-center justify-center font-headline text-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-4">
                <step.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-headline text-xl text-ink mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-body text-ink-light leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Examples if any */}
              {step.examples && (
                <div className="border-t border-ink/20 pt-4">
                  <p className="font-mono text-xs text-ink-faded uppercase tracking-widest mb-2">
                    Examples:
                  </p>
                  <ul className="space-y-1">
                    {step.examples.map((example) => (
                      <li key={example} className="font-mono text-sm text-ink">
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
