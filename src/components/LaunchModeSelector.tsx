import { Button } from "@/components/ui/button";
import { Rocket, Boxes, Target, Lock } from "lucide-react";

export type LaunchMode = "dev" | "dev_bundle" | "dev_bundle_snipe";

interface LaunchModeSelectorProps {
  mode: LaunchMode;
  onModeChange: (mode: LaunchMode) => void;
}

const LaunchModeSelector = ({ mode, onModeChange }: LaunchModeSelectorProps) => {
  const modes = [
    {
      id: "dev" as LaunchMode,
      label: "Dev Buy",
      icon: Rocket,
      description: "Simple dev wallet buy",
      available: true,
    },
    {
      id: "dev_bundle" as LaunchMode,
      label: "Dev + Bundle",
      icon: Boxes,
      description: "Dev + multiple wallets",
      available: false,
    },
    {
      id: "dev_bundle_snipe" as LaunchMode,
      label: "Dev + Bundle + Snipe",
      icon: Target,
      description: "Full launch suite",
      available: false,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <Rocket className="w-3 h-3 text-accent" />
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
          Launch Mode
        </h3>
      </div>

      <div className="space-y-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => m.available && onModeChange(m.id)}
            disabled={!m.available}
            className={`w-full flex items-center gap-2 p-2 border transition-all duration-200 text-left ${
              mode === m.id
                ? "border-accent bg-accent/5"
                : m.available
                ? "border-border bg-paper hover:border-accent"
                : "border-border bg-muted opacity-60 cursor-not-allowed"
            }`}
          >
            <m.icon className={`w-4 h-4 ${mode === m.id ? "text-accent" : "text-ink-faded"}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs uppercase ${mode === m.id ? "text-accent" : "text-ink"}`}>
                  {m.label}
                </span>
                {!m.available && (
                  <Lock className="w-3 h-3 text-ink-faded" />
                )}
              </div>
              <p className="font-body text-xs text-ink-faded truncate">
                {m.description}
              </p>
            </div>
            {mode === m.id && (
              <div className="w-2 h-2 bg-accent rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LaunchModeSelector;
