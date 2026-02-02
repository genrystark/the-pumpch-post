import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Check, X, Link } from "lucide-react";
import { toast } from "sonner";

interface TwitterConnectProps {
  connected: boolean;
  username: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

const TwitterConnect = ({ connected, username, onConnect, onDisconnect }: TwitterConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onConnect();
    setIsConnecting(false);
    toast.success("X account connected!");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <Twitter className="w-3 h-3 text-accent" />
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
          X Integration
        </h3>
      </div>

      {connected ? (
        <div className="border border-accent bg-accent/5 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-accent" />
              <span className="font-mono text-xs text-ink">
                @{username}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-destructive hover:text-destructive"
              onClick={onDisconnect}
            >
              <X className="w-3 h-3 mr-1" />
              Disconnect
            </Button>
          </div>
          <p className="font-mono text-xs text-ink-faded mt-1">
            Bot can post on your behalf
          </p>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full justify-start gap-2 h-10"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          <Link className="w-4 h-4" />
          <span className="font-mono text-xs">
            {isConnecting ? "Connecting..." : "Connect X Account"}
          </span>
        </Button>
      )}
    </div>
  );
};

export default TwitterConnect;
