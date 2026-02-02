import { Image, Type, FileText, Rocket, Wallet } from "lucide-react";
import { WalletInfo } from "./WalletManager";

export interface TokenData {
  name: string;
  ticker: string;
  description: string;
  logo: string | null;
  banner: string | null;
  launchMode: "dev" | "dev_bundle" | "dev_bundle_snipe";
}

interface TokenPreviewProps {
  tokenData: TokenData;
  wallets: WalletInfo[];
}

const TokenPreview = ({ tokenData, wallets }: TokenPreviewProps) => {
  const launchModeLabels = {
    dev: "Dev Buy",
    dev_bundle: "Dev + Bundle",
    dev_bundle_snipe: "Dev + Bundle + Snipe",
  };

  const devWallets = wallets.filter((w) => w.type === "dev");
  const bundleWallets = wallets.filter((w) => w.type === "bundle");
  const sniperWallets = wallets.filter((w) => w.type === "sniper");

  return (
    <div className="border border-border bg-paper p-3 space-y-3">
      <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded border-b border-border pb-2">
        Token Preview
      </h3>

      {/* Logo & Name */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 border border-border bg-muted flex items-center justify-center shrink-0">
          {tokenData.logo ? (
            <img src={tokenData.logo} alt="Token logo" className="w-full h-full object-cover" />
          ) : (
            <Image className="w-5 h-5 text-ink-faded" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Type className="w-3 h-3 text-accent" />
            <span className="font-headline text-sm text-ink truncate">
              {tokenData.name || "Token Name"}
            </span>
          </div>
          <p className="font-mono text-xs text-accent mt-0.5">
            ${tokenData.ticker || "TICKER"}
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-3 h-3 text-ink-faded" />
          <span className="font-mono text-xs text-ink-faded uppercase">Description</span>
        </div>
        <p className="font-body text-xs text-ink leading-relaxed line-clamp-3">
          {tokenData.description || "No description yet..."}
        </p>
      </div>

      {/* Banner */}
      {tokenData.banner && (
        <div>
          <span className="font-mono text-xs text-ink-faded uppercase">Banner</span>
          <div className="mt-1 h-16 border border-border overflow-hidden">
            <img src={tokenData.banner} alt="Token banner" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Launch Mode */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Rocket className="w-3 h-3 text-accent" />
          <span className="font-mono text-xs text-ink-faded uppercase">Launch Mode</span>
        </div>
        <span className="inline-block border border-accent text-accent px-2 py-0.5 font-mono text-xs uppercase">
          {launchModeLabels[tokenData.launchMode]}
        </span>
      </div>

      {/* Wallets Summary */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="w-3 h-3 text-ink-faded" />
          <span className="font-mono text-xs text-ink-faded uppercase">Wallets</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-center">
          <div className="border border-border p-1">
            <p className="font-headline text-lg text-ink">{devWallets.length}</p>
            <p className="font-mono text-xs text-ink-faded">Dev</p>
          </div>
          <div className="border border-border p-1">
            <p className="font-headline text-lg text-ink">{bundleWallets.length}</p>
            <p className="font-mono text-xs text-ink-faded">Bundle</p>
          </div>
          <div className="border border-border p-1">
            <p className="font-headline text-lg text-ink">{sniperWallets.length}</p>
            <p className="font-mono text-xs text-ink-faded">Snipe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPreview;
