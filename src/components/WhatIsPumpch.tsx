import { Bot, TrendingUp, Zap, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "./AnimatedSection";

const WhatIsDeclaw = () => {
  const features = [
    {
      icon: TrendingUp,
      bg: "bg-orange",
      title: "Not a Signal Bot",
      description: "declaw is not a trading algorithm that blindly follows charts. It's an AI agent designed for the meme token economy.",
    },
    {
      icon: MessageSquare,
      bg: "bg-[#000080]",
      title: "Narrative Tracker",
      description: "It watches narratives on X, tracks token activity in real-time, and helps users turn ideas into live tokens.",
    },
    {
      icon: Zap,
      bg: "bg-green-600",
      title: "Instant Analysis",
      description: "Analyzes token behavior patterns and social signals to identify opportunities before they pump.",
    },
    {
      icon: Bot,
      bg: "bg-purple-600",
      title: "One Conversation",
      description: "One agent. Complete context. Your companion from idea to declaw to trade.",
    },
  ];

  return (
    <section id="what-is-declaw" className="py-8">
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
              <Bot className="w-4 h-4" />
              <span className="text-xs sm:text-sm">About declaw</span>
            </div>
            <div className="flex gap-1">
              <button className="win95-control-btn text-[8px]">_</button>
              <button className="win95-control-btn text-[8px]">□</button>
              <button className="win95-control-btn text-[8px]">×</button>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] p-6">
            {/* Section header */}
            <div className="text-center mb-6">
              <span className="font-mono text-[10px] text-[#808080] uppercase tracking-widest">
                About the Agent
              </span>
              <h2 className="font-mono text-xl md:text-2xl text-white mt-1">
                THE AGENT THAT TRADES
                <br />
                <span className="text-orange">AND DECLAWS WITH YOU</span>
              </h2>
            </div>

            {/* Features grid */}
            <StaggerContainer className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <StaggerItem key={feature.title}>
                  <div className="win95-outset p-4 bg-[#c0c0c0] h-full">
                    <div className="flex items-start gap-3">
                      <motion.div 
                        className={`w-8 h-8 ${feature.bg} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <feature.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-mono text-sm font-bold text-black mb-1">{feature.title}</h3>
                        <p className="font-mono text-xs text-[#404040]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          
          <div className="win95-statusbar">
            <div className="win95-statusbar-inset flex-1 text-[10px]">
              Built on OpenClaw | Launched in Moltbook
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsDeclaw;
