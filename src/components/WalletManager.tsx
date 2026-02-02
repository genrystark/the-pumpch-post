import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet, Plus, Import, Copy, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

export interface WalletInfo {
  id: string;
  name: string;
  address: string;
  type: "dev" | "bundle" | "sniper";
}

interface WalletManagerProps {
  wallets: WalletInfo[];
  onAddWallet: (wallet: WalletInfo) => void;
  onRemoveWallet: (id: string) => void;
}

const WalletManager = ({ wallets, onAddWallet, onRemoveWallet }: WalletManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"choose" | "create" | "import">("choose");
  const [walletName, setWalletName] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [walletType, setWalletType] = useState<"dev" | "bundle" | "sniper">("dev");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateMockWallet = () => {
    // Generate a mock Solana address (base58)
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let address = "";
    for (let i = 0; i < 44; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address;
  };

  const handleCreate = () => {
    if (!walletName.trim()) {
      toast.error("Please enter wallet name");
      return;
    }

    const newWallet: WalletInfo = {
      id: Date.now().toString(),
      name: walletName,
      address: generateMockWallet(),
      type: walletType,
    };

    onAddWallet(newWallet);
    toast.success(`Wallet "${walletName}" created!`);
    resetForm();
  };

  const handleImport = () => {
    if (!walletName.trim() || !privateKey.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    // Basic validation for Solana private key (base58, 64-88 chars)
    if (privateKey.length < 64 || privateKey.length > 88) {
      toast.error("Invalid private key format");
      return;
    }

    const newWallet: WalletInfo = {
      id: Date.now().toString(),
      name: walletName,
      address: generateMockWallet(), // In real app, derive from private key
      type: walletType,
    };

    onAddWallet(newWallet);
    toast.success(`Wallet "${walletName}" imported!`);
    resetForm();
  };

  const resetForm = () => {
    setWalletName("");
    setPrivateKey("");
    setWalletType("dev");
    setMode("choose");
    setIsOpen(false);
  };

  const copyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    toast.success("Address copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Wallet className="w-3 h-3 text-accent" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faded">
            Wallets
          </h3>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm bg-paper border-border">
            <DialogHeader>
              <DialogTitle className="font-headline text-ink">
                {mode === "choose" && "Add Wallet"}
                {mode === "create" && "Create New Wallet"}
                {mode === "import" && "Import Wallet"}
              </DialogTitle>
            </DialogHeader>

            {mode === "choose" && (
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-14"
                  onClick={() => setMode("create")}
                >
                  <Plus className="w-5 h-5 text-accent" />
                  <div className="text-left">
                    <p className="font-headline text-sm">Create New</p>
                    <p className="font-mono text-xs text-ink-faded">Generate a new Solana wallet</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-14"
                  onClick={() => setMode("import")}
                >
                  <Import className="w-5 h-5 text-accent" />
                  <div className="text-left">
                    <p className="font-headline text-sm">Import Existing</p>
                    <p className="font-mono text-xs text-ink-faded">Use your private key</p>
                  </div>
                </Button>
              </div>
            )}

            {(mode === "create" || mode === "import") && (
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs text-ink-faded uppercase tracking-wider">
                    Wallet Name
                  </label>
                  <Input
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                    placeholder="My Dev Wallet"
                    className="mt-1"
                  />
                </div>

                {mode === "import" && (
                  <div>
                    <label className="font-mono text-xs text-ink-faded uppercase tracking-wider">
                      Private Key
                    </label>
                    <Input
                      type="password"
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                      placeholder="Enter your private key"
                      className="mt-1"
                    />
                  </div>
                )}

                <div>
                  <label className="font-mono text-xs text-ink-faded uppercase tracking-wider">
                    Wallet Type
                  </label>
                  <div className="flex gap-2 mt-1">
                    {(["dev", "bundle", "sniper"] as const).map((type) => (
                      <Button
                        key={type}
                        variant={walletType === type ? "editorial" : "outline"}
                        size="sm"
                        onClick={() => setWalletType(type)}
                        className="flex-1"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setMode("choose")} className="flex-1">
                    Back
                  </Button>
                  <Button
                    variant="editorial"
                    onClick={mode === "create" ? handleCreate : handleImport}
                    className="flex-1"
                  >
                    {mode === "create" ? "Create" : "Import"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Wallet list */}
      <div className="space-y-1">
        {wallets.length === 0 ? (
          <p className="font-mono text-xs text-ink-faded italic">No wallets added</p>
        ) : (
          wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="flex items-center justify-between p-2 border border-border bg-paper-aged hover:border-accent transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink font-medium truncate">
                    {wallet.name}
                  </span>
                  <span className="font-mono text-xs text-accent uppercase px-1 border border-accent">
                    {wallet.type}
                  </span>
                </div>
                <p className="font-mono text-xs text-ink-faded">
                  {truncateAddress(wallet.address)}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyAddress(wallet.address, wallet.id)}
                >
                  {copiedId === wallet.id ? (
                    <Check className="w-3 h-3 text-accent" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  onClick={() => onRemoveWallet(wallet.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WalletManager;
