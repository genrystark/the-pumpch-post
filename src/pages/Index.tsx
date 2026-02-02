import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AgentCard from "@/components/AgentCard";
import WhatIsPumpster from "@/components/WhatIsPumpch";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ChatCTA from "@/components/ChatCTA";
import Footer from "@/components/Footer";
import LaunchedTokens from "@/components/LaunchedTokens";
import { Plus, FileText, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import pumpchLogo from "@/assets/pumpch-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scanlines">
      <Header />
      
      {/* Desktop Icons */}
      <div className="win95-desktop">
        <div className="max-w-7xl mx-auto">
          {/* Desktop shortcuts */}
          <div className="hidden sm:flex gap-4 mb-4 flex-wrap">
            <Link to="/chat">
              <div className="win95-icon">
                <div className="w-10 h-10 bg-orange flex items-center justify-center mb-1">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="win95-icon-label text-[10px]">New Token</span>
              </div>
            </Link>
            <Link to="/#how-it-works">
              <div className="win95-icon">
                <div className="w-10 h-10 bg-[#000080] flex items-center justify-center mb-1">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="win95-icon-label text-[10px]">README.txt</span>
              </div>
            </Link>
            <Link to="/chat">
              <div className="win95-icon">
                <img src={pumpchLogo} alt="Pumpster" className="w-10 h-10 mb-1 object-contain" />
                <span className="win95-icon-label text-[10px]">Pumpster</span>
              </div>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2">
              <HeroSection />
            </div>
            <div className="lg:col-span-1">
              <AgentCard />
            </div>
          </div>

          {/* Token Explorer */}
          <LaunchedTokens />
          
          {/* Info Sections */}
          <WhatIsPumpster />
          <HowItWorks />
          <Features />
          <ChatCTA />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
