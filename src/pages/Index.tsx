import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AgentCard from "@/components/AgentCard";
import WhatIsDeclaw from "@/components/WhatIsPumpch";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ChatCTA from "@/components/ChatCTA";
import Footer from "@/components/Footer";
import LaunchedTokens from "@/components/LaunchedTokens";
import AgentExplorer from "@/components/AgentExplorer";
import ReadmeModal from "@/components/ReadmeModal";
import CreateAgentModal from "@/components/CreateAgentModal";
import LoadingScreen from "@/components/LoadingScreen";
import DraggableWindow from "@/components/DraggableWindow";
import { motion } from "framer-motion";
import { Plus, FileText, Bot, Github } from "lucide-react";
import { Link } from "react-router-dom";
import declawLogo from "@/assets/declaw-logo.png";
import DeployAgentGitHubModal from "@/components/DeployAgentGitHubModal";

const Index = () => {
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [createAgentOpen, setCreateAgentOpen] = useState(false);
  const [deployAgentGitHubOpen, setDeployAgentGitHubOpen] = useState(false);
  const [agentExplorerKey, setAgentExplorerKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground scanlines"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <ReadmeModal isOpen={readmeOpen} onClose={() => setReadmeOpen(false)} />
      <CreateAgentModal
        isOpen={createAgentOpen}
        onClose={() => setCreateAgentOpen(false)}
        onSaved={() => setAgentExplorerKey((k) => k + 1)}
      />
      <DeployAgentGitHubModal
        isOpen={deployAgentGitHubOpen}
        onClose={() => setDeployAgentGitHubOpen(false)}
      />

      {/* Desktop Icons */}
      <div className="win95-desktop">
        <div className="max-w-7xl mx-auto">
          {/* Desktop shortcuts */}
          <div className="hidden sm:flex gap-2 mb-4 flex-wrap items-center">
            <Link to="/chat">
              <motion.div 
                className="win95-icon flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 bg-orange flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </Link>
            <motion.button 
              onClick={() => setReadmeOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="win95-icon flex flex-col items-center">
                <div className="w-10 h-10 bg-[#000080] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.button>
            <motion.button 
              onClick={() => setCreateAgentOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="win95-icon flex flex-col items-center">
                <div className="w-10 h-10 bg-[#008000] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.button>
            <motion.button 
              onClick={() => setDeployAgentGitHubOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="win95-icon flex flex-col items-center">
                <div className="w-10 h-10 bg-[#333] flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.button>
            <Link to="/chat">
              <motion.div 
                className="win95-icon flex flex-col items-center"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={declawLogo} alt="declaw" className="w-10 h-10 object-contain" />
              </motion.div>
            </Link>
          </div>

          {/* Four windows: 2x2 grid, left-aligned, Token/Agent Explorer same height */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 lg:items-stretch">
            <div className="lg:col-span-2 min-w-0 flex">
              <DraggableWindow className="w-full">
                <HeroSection />
              </DraggableWindow>
            </div>
            <div className="lg:col-span-1 min-w-0 flex">
              <DraggableWindow className="w-full">
                <AgentCard />
              </DraggableWindow>
            </div>
            <div className="lg:col-span-2 min-w-0 flex lg:-mt-10 lg:-ml-8 lg:-mr-8">
              <DraggableWindow className="w-full flex-1 min-h-0">
                <LaunchedTokens />
              </DraggableWindow>
            </div>
            <div className="lg:col-span-1 min-w-0 flex">
              <DraggableWindow className="w-full flex-1 min-h-0">
                <AgentExplorer refreshKey={agentExplorerKey} />
              </DraggableWindow>
            </div>
          </div>
          
          {/* Info Sections */}
          <WhatIsDeclaw />
          <HowItWorks />
          <Features />
          <ChatCTA />
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
