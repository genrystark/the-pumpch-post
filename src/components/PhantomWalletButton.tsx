import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import { Wallet, LogOut, Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { getWalletBalance, shortenAddress, formatSolBalance } from '@/lib/solana';

const PhantomWalletButton = () => {
  const { publicKey, connected, disconnect, connecting } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch balance when connected
  useEffect(() => {
    if (connected && publicKey) {
      const fetchBalance = async () => {
        const bal = await getWalletBalance(connection, publicKey);
        setBalance(bal);
      };
      fetchBalance();
      
      // Refresh balance every 30 seconds
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, connection]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      toast.error('Failed to disconnect');
    }
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      toast.success('Address copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (connected && publicKey) {
    return (
      <div className="win95-groupbox p-2">
        <span className="win95-groupbox-title">Phantom Wallet</span>
        
        <div className="win95-inset p-2 bg-white mt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse" />
              <span className="font-mono text-xs text-black font-bold">Connected</span>
            </div>
            <button
              onClick={handleDisconnect}
              className="win95-button text-[10px] px-2 py-0.5 flex items-center gap-1"
            >
              <LogOut className="w-3 h-3 text-black" />
              <span className="text-black">Disconnect</span>
            </button>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#808080]">Address:</span>
              <div className="flex items-center gap-1">
                <span className="font-mono text-xs text-black">{shortenAddress(publicKey.toString())}</span>
                <button onClick={handleCopyAddress} className="p-0.5 hover:bg-[#d4d4d4]">
                  {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-[#808080]" />}
                </button>
                <a 
                  href={`https://solscan.io/account/${publicKey.toString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-0.5 hover:bg-[#d4d4d4]"
                >
                  <ExternalLink className="w-3 h-3 text-[#808080]" />
                </a>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#808080]">Balance:</span>
              <span className="font-mono text-xs text-[#ff6b00] font-bold">
                {balance !== null ? `${formatSolBalance(balance)} SOL` : 'Loading...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="win95-groupbox p-2">
      <span className="win95-groupbox-title">Phantom Wallet</span>
      
      <button
        onClick={handleConnect}
        disabled={connecting}
        className="win95-button-primary w-full flex items-center gap-2 justify-center mt-2 py-2"
      >
        <Wallet className="w-4 h-4" />
        <span className="font-mono text-xs">
          {connecting ? 'Connecting...' : 'Connect Phantom'}
        </span>
      </button>
      
      <p className="font-mono text-[10px] text-[#808080] mt-2 text-center">
        Required for declawing tokens
      </p>
    </div>
  );
};

export default PhantomWalletButton;
