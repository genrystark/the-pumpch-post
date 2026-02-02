import { Radar, LineChart, Rocket, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Radar,
    title: "Market Radar",
    description: "Tracks narratives, memes, and early attention shifts across X and Pump.fun.",
  },
  {
    icon: LineChart,
    title: "Token Analysis",
    description: "Lifecycle detection: early, mid, late. Pattern recognition from past launches.",
  },
  {
    icon: Rocket,
    title: "Token Launch Assistant",
    description: "Idea generation, meme validation, timing, and deployment via Pump.fun.",
  },
  {
    icon: MessageCircle,
    title: "Agent Chat",
    description: "One conversation. Full context. Pumpch remembers, isolates, and adapts.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-10 md:py-14 bg-muted border-y border-border">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-8">
          <span className="label-editorial">Capabilities</span>
          <h2 className="masthead text-2xl md:text-3xl text-ink mt-1">
            INSIDE PUMPCH
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="border border-border bg-paper p-3 flex gap-3 hover:border-accent transition-colors"
            >
              {/* Icon box */}
              <div className="flex-shrink-0 w-10 h-10 border border-border flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-headline text-sm text-ink mb-0.5 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="font-body text-xs text-ink-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
