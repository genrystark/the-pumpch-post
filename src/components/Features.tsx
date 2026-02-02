import { Sparkles, Wallet, Image, BarChart3, Zap, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Research",
      description: "Deep narrative analysis from X and on-chain data",
    },
    {
      icon: Wallet,
      title: "Wallet Integration",
      description: "Create or import Solana wallets securely",
    },
    {
      icon: Image,
      title: "Logo Generation",
      description: "AI-generated logos and banners for your tokens",
    },
    {
      icon: BarChart3,
      title: "Real-Time Stats",
      description: "Track launches, volume, and social signals",
    },
    {
      icon: Zap,
      title: "Fast Launches",
      description: "Deploy tokens in seconds via Pump.fun",
    },
    {
      icon: Shield,
      title: "Smart Alerts",
      description: "Get notified when opportunities arise",
    },
  ];

  return (
    <section id="features" className="py-8">
      <div className="container">
        <div className="win95-window">
          <div className="win95-titlebar-green">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Features - System Properties</span>
            </div>
            <div className="flex gap-1">
              <button className="win95-control-btn text-[8px]">_</button>
              <button className="win95-control-btn text-[8px]">□</button>
              <button className="win95-control-btn text-[8px]">×</button>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] p-6">
            <div className="text-center mb-6">
              <span className="font-mono text-[10px] text-[#808080] uppercase tracking-widest">
                Agent Capabilities
              </span>
              <h2 className="font-mono text-xl md:text-2xl text-white mt-1">
                WHAT <span className="text-green-400">PUMPSTER</span> CAN DO
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {features.map((feature) => (
                <div 
                  key={feature.title} 
                  className="win95-outset p-3 bg-[#c0c0c0] hover-elevate cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-mono text-xs font-bold text-black mb-1">
                        {feature.title}
                      </h3>
                      <p className="font-mono text-[10px] text-[#404040]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="win95-statusbar">
            <div className="win95-statusbar-inset flex-1 text-[10px]">
              6 features installed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
