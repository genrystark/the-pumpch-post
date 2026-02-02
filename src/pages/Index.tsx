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
        {/* Hero with Agent */}
        <section className="py-12 md:py-16 bg-paper">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Hero Content */}
              <div className="lg:col-span-2">
                <HeroSection />
              </div>
              
              {/* Right: Agent Mascot */}
              <div className="lg:col-span-1 opacity-0 animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
                <div className="border border-border p-6 bg-paper h-full flex flex-col items-center justify-center hover:border-accent hover:shadow-md transition-all duration-300">
                  <img 
                    src={pumpchLogo} 
                    alt="Pumpch AI Agent" 
                    className="w-56 h-56 object-contain mb-4"
                  />
                  <p className="font-headline text-lg text-ink italic text-center">
                    "The Agent That Reads the Pump"
                  </p>
                  <div className="mt-4">
                    <Button asChild variant="editorial" size="lg" className="group">
                      <Link to="/chat">
                        Talk to Agent
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Feed Section */}
        <section className="py-12 bg-paper-aged border-y border-border">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: News Feed */}
              <div className="lg:col-span-2 opacity-0 animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
                <div className="border border-border bg-paper h-[400px] overflow-hidden">
                  <NewsFeed onLaunchIdea={handleLaunchIdea} />
                </div>
              </div>
              
              {/* Right: CTA */}
              <div className="lg:col-span-1 flex flex-col justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="border border-border p-6 bg-paper">
                  <h3 className="font-headline text-xl text-ink mb-3">
                    Spot Opportunities First
                  </h3>
                  <p className="font-body text-ink-light mb-4">
                    Real-time crypto news analyzed by our AI agent. Click "Launch Idea" to generate token concepts based on trending narratives.
                  </p>
                  <Button asChild variant="editorial" size="sm" className="group w-full">
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
