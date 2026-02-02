import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AgentCard from "@/components/AgentCard";
import WhatIsDeclaw from "@/components/WhatIsPumpch";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ChatCTA from "@/components/ChatCTA";
import Footer from "@/components/Footer";
import LaunchedTokens from "@/components/LaunchedTokens";
import ReadmeModal from "@/components/ReadmeModal";
import LoadingScreen from "@/components/LoadingScreen";
import DraggableWindow from "@/components/DraggableWindow";
import { motion } from "framer-motion";
import { Plus, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import declawLogo from "@/assets/declaw-logo.png";

const Index = () => {
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if we've already shown loading screen in this session
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("declaw-loaded");
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("declaw-loaded", "true");
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

      {/* Desktop Icons */}
      <div className="win95-desktop">
        <div className="max-w-7xl mx-auto">
          {/* Desktop shortcuts */}
          <div className="hidden sm:flex gap-4 mb-4 flex-wrap">
            <Link to="/chat">
              <motion.div 
                className="win95-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 bg-orange flex items-center justify-center mb-1">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="win95-icon-label text-[10px]">New Declaw</span>
              </motion.div>
            </Link>
            <motion.button 
              onClick={() => setReadmeOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="win95-icon">
                <div className="w-10 h-10 bg-[#000080] flex items-center justify-center mb-1">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="win95-icon-label text-[10px]">README.txt</span>
              </div>
            </motion.button>
            <Link to="/chat">
              <motion.div 
                className="win95-icon"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={declawLogo} alt="declaw" className="w-10 h-10 mb-1 object-contain" />
                <span className="win95-icon-label text-[10px]">declaw</span>
              </motion.div>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2">
              <DraggableWindow>
                <HeroSection />
              </DraggableWindow>
            </div>
            <div className="lg:col-span-1">
              <DraggableWindow>
                <AgentCard />
              </DraggableWindow>
            </div>
          </div>

          {/* Token Explorer */}
          <DraggableWindow>
            <LaunchedTokens />
          </DraggableWindow>
          
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
