import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ReserveAccess = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("You're on the list! We'll be in touch.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 md:py-24 bg-paper-dark border-y-2 border-ink">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative header */}
          <div className="inline-block mb-6">
            <span className="stamp">Early Access</span>
          </div>

          <h2 className="masthead text-4xl md:text-5xl text-ink mb-4">
            RESERVE YOUR<br />PUMPCH ACCESS
          </h2>

          <p className="font-body text-lg text-ink-light mb-8">
            Be one of the first to chat with Pumpch, track Pump.fun launches, 
            and turn ideas into tokens.
          </p>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-paper border-2 border-ink text-ink placeholder:text-ink-faded font-mono text-sm h-12"
            />
            <Button 
              type="submit" 
              variant="editorial"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join"}
            </Button>
          </form>

          <p className="font-mono text-xs text-ink-faded mt-4">
            We only email with launch milestones.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReserveAccess;
