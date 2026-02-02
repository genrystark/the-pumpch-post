const WhatIsPumpch = () => {
  return (
    <section id="what-is-pumpch" className="py-16 md:py-24 bg-paper-aged border-y-2 border-ink">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="label-editorial">About the Agent</span>
          <h2 className="masthead text-4xl md:text-5xl text-ink mt-2">
            THE AGENT THAT TRADES<br />AND LAUNCHES WITH YOU
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left column */}
          <div className="editorial-frame">
            <p className="font-body text-lg text-ink leading-relaxed drop-cap">
              Pumpch is not a signal bot. It's not a trading algorithm that blindly 
              follows charts and indicators. Pumpch is something fundamentally different—
              an AI agent designed specifically for the Pump.fun economy.
            </p>
          </div>

          {/* Right column */}
          <div className="editorial-frame">
            <p className="font-body text-lg text-ink leading-relaxed">
              It watches narratives on X, tracks token launches in real-time, 
              analyzes token behavior patterns, and helps users turn ideas into 
              live tokens—all from a single conversation.
            </p>
            <div className="mt-6 pt-4 border-t border-ink/20">
              <p className="font-mono text-xs text-ink-faded uppercase tracking-widest">
                One agent. Complete context. Your Pump.fun companion.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative quote */}
        <div className="mt-12 text-center">
          <div className="inline-block border-l-4 border-accent pl-6 py-2 text-left">
            <p className="font-headline text-xl md:text-2xl text-ink italic">
              "Not just analysis. Not just launches. The whole picture."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsPumpch;
