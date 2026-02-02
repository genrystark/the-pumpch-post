import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatIsPumpch from "@/components/WhatIsPumpch";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ChatCTA from "@/components/ChatCTA";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import LaunchedTokens from "@/components/LaunchedTokens";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import pumpchLogo from "@/assets/pumpch-logo.png";

const Index = () => {
  const [, setSelectedNews] = useState("");

  const handleLaunchIdea = (newsTitle: string) => {
    setSelectedNews(newsTitle);
    // Navigate to chat with the news context
    window.location.href = `/chat?prompt=${encodeURIComponent(`Based on this news: "${newsTitle}" - suggest a token launch idea`)}`;
  };

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        {/* Hero with News Feed */}
        <section className="py-12 md:py-16 bg-paper">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Hero Content */}
              <div className="lg:col-span-2">
                <HeroSection />
              </div>
              
              {/* Right: Agent + News Feed */}
              <div className="lg:col-span-1 opacity-0 animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
                {/* Agent Mascot */}
                <div className="border border-border p-4 bg-paper mb-4 hover:border-accent hover:shadow-md transition-all duration-300">
                  <div className="text-center">
                    <img 
                      src={pumpchLogo} 
                      alt="Pumpch AI Agent" 
                      className="w-40 h-40 mx-auto object-contain mb-3"
                    />
                    <p className="font-headline text-sm text-ink italic">
                      "The Agent That Reads the Pump"
                    </p>
                  </div>
                </div>
                
                {/* News Feed */}
                <div className="border border-border bg-paper h-[350px] overflow-hidden">
                  <NewsFeed onLaunchIdea={handleLaunchIdea} />
                </div>
                <div className="mt-3 text-center">
                  <Button asChild variant="editorial" size="sm" className="group">
                    <Link to="/chat">
                      Open Full Chat
                      <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LaunchedTokens />
        <WhatIsPumpch />
        <HowItWorks />
        <Features />
        <ChatCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
