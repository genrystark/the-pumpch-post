const WhatIsPumpch = () => {
  return (
    <section id="what-is-pumpch" className="py-10 md:py-14 bg-muted border-y border-border">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <span className="label-editorial">About the Agent</span>
          <h2 className="masthead text-2xl md:text-3xl text-ink mt-1">
            THE AGENT THAT TRADES<br />AND LAUNCHES WITH YOU
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* Left column */}
          <div className="border border-border bg-paper p-4 opacity-0 animate-fade-in-left hover:border-accent hover:shadow-md transition-all duration-300" style={{ animationDelay: "0.2s" }}>
            <p className="font-body text-sm text-ink leading-relaxed">
              Pumpch is not a signal bot. It's not a trading algorithm that blindly 
              follows charts and indicators. Pumpch is something fundamentally different—
              an AI agent designed specifically for the Pump.fun economy.
            </p>
          </div>

          {/* Right column */}
          <div className="border border-border bg-paper p-4 opacity-0 animate-fade-in-right hover:border-accent hover:shadow-md transition-all duration-300" style={{ animationDelay: "0.3s" }}>
            <p className="font-body text-sm text-ink leading-relaxed">
              It watches narratives on X, tracks token launches in real-time, 
              analyzes token behavior patterns, and helps users turn ideas into 
              live tokens—all from a single conversation.
            </p>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="font-mono text-xs text-ink-faded uppercase tracking-widest">
                One agent. Complete context. Your Pump.fun companion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsPumpch;
