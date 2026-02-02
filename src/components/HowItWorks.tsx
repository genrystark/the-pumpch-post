import { FileText, Search, Rocket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "./AnimatedSection";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Tell declaw Your Idea",
      description: "Describe the token you want to create or the narrative you want to explore.",
      color: "bg-orange",
    },
    {
      icon: Search,
      title: "Agent Analyzes",
      description: "declaw scans X and on-chain data for relevant signals.",
      color: "bg-[#000080]",
    },
    {
      icon: Rocket,
      title: "Declaw or Trade",
      description: "Generate logos, declaw tokens, or get trade recommendations.",
      color: "bg-green-600",
    },
    {
      icon: TrendingUp,
      title: "Track & Iterate",
      description: "Monitor your declaws and get real-time insights on performance.",
      color: "bg-purple-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-8">
      <div className="container">
        <motion.div 
          className="win95-window"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
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
                HOW <span className="text-orange">DECLAW</span> WORKS
              </h2>
            </div>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.15}>
              {steps.map((step, index) => (
                <StaggerItem key={step.title}>
                  <div className="win95-outset p-4 bg-[#c0c0c0] h-full">
                    <div className="flex flex-col items-center text-center">
                      <motion.div 
                        className="font-mono text-2xl font-bold text-[#808080] mb-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                      >
                        0{index + 1}
                      </motion.div>
                      <motion.div 
                        className={`w-10 h-10 ${step.color} flex items-center justify-center mb-3`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="font-mono text-xs font-bold text-black mb-2">
                        {step.title}
                      </h3>
                      <p className="font-mono text-[10px] text-[#404040]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          
          <div className="win95-statusbar">
            <div className="win95-statusbar-inset flex-1 text-[10px]">
              4 steps to success
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
