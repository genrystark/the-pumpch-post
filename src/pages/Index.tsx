import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatIsPumpch from "@/components/WhatIsPumpch";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ChatCTA from "@/components/ChatCTA";
import ReserveAccess from "@/components/ReserveAccess";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <HeroSection />
        <WhatIsPumpch />
        <HowItWorks />
        <Features />
        <ChatCTA />
        <ReserveAccess />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
