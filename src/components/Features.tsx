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
    <section id="features" className="py-16 md:py-24 bg-paper-aged border-y-2 border-ink">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="label-editorial">Capabilities</span>
          <h2 className="masthead text-4xl md:text-5xl text-ink mt-2">
            INSIDE PUMPCH
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="editorial-frame flex gap-4 hover:bg-paper-dark transition-colors"
            >
              {/* Icon box */}
              <div className="flex-shrink-0 w-12 h-12 border-2 border-ink flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-ink" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-headline text-lg text-ink mb-1 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="font-body text-ink-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="w-16 h-px bg-ink/30" />
            <span className="font-mono text-xs text-ink-faded uppercase tracking-widest">
              Built for Pump.fun
            </span>
            <div className="w-16 h-px bg-ink/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
