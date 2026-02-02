import { FileText, Search, Rocket, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Tell Pumpster Your Idea",
      description: "Describe the token you want to create or the narrative you want to explore.",
      color: "bg-orange",
    },
    {
      icon: Search,
      title: "Agent Analyzes",
      description: "Pumpster scans X, Pump.fun, and on-chain data for relevant signals.",
      color: "bg-[#000080]",
    },
    {
      icon: Rocket,
      title: "Launch or Trade",
      description: "Generate logos, deploy tokens, or get trade recommendations.",
      color: "bg-green-600",
    },
    {
      icon: TrendingUp,
      title: "Track & Iterate",
      description: "Monitor your launches and get real-time insights on performance.",
      color: "bg-purple-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-8">
      <div className="container">
        <div className="win95-window">
          <div className="win95-titlebar">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              <span className="text-xs sm:text-sm">How It Works - README.txt</span>
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
                Getting Started
              </span>
              <h2 className="font-mono text-xl md:text-2xl text-white mt-1">
                HOW <span className="text-orange">PUMPSTER</span> WORKS
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="win95-outset p-4 bg-[#c0c0c0]">
                  <div className="flex flex-col items-center text-center">
                    <div className="font-mono text-2xl font-bold text-[#808080] mb-2">
                      0{index + 1}
                    </div>
                    <div className={`w-10 h-10 ${step.color} flex items-center justify-center mb-3`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-mono text-xs font-bold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="font-mono text-[10px] text-[#404040]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="win95-statusbar">
            <div className="win95-statusbar-inset flex-1 text-[10px]">
              4 steps to success
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
