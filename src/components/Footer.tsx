import { Copy, Send } from "lucide-react";
import { toast } from "sonner";

const CONTRACT_ADDRESS = "DECLAW_CONTRACT_ADDRESS_HERE"; // Replace with actual CA
const TG_BOT_URL = "https://t.me/declaw_bot";

const Footer = () => {
  const handleCopyCA = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast.success("CA copied to clipboard!");
  };

  return (
    <footer className="py-4">
      <div className="container">
        <div className="win95-window">
          <div className="win95-statusbar flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="win95-statusbar-inset text-[10px]">
              © 2026 declaw token | Built on OpenClaw | Launched in Moltbook
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCA}
                className="win95-button !px-2 !py-0.5 text-[10px] flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                COPY CA
              </button>
              <a
                href={TG_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="win95-button !px-2 !py-0.5 text-[10px] flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                @declaw_bot
              </a>
            </div>
            <div className="win95-statusbar-inset text-[10px]">
              Solana Mainnet
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
