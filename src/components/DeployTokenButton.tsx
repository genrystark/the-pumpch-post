import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Rocket, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createPumpFunToken, TokenMetadata, DeployTokenResult } from '@/lib/pumpfun';
import { checkMinimumBalance, getWalletBalance } from '@/lib/solana';
import { saveDeployedToken } from '@/hooks/useDeployedTokens';

interface DeployTokenButtonProps {
  tokenData: {
    name?: string;
    ticker?: string;
    description?: string;
    logo?: string | null;
    twitter?: string | null;
  };
  devBuyAmountSol?: number;
  onDeployStart?: () => void;
  onDeployComplete?: (result: DeployTokenResult) => void;
}

const DeployTokenButton = ({ 
  tokenData, 
  devBuyAmountSol = 0.1,
  onDeployStart,
  onDeployComplete 
}: DeployTokenButtonProps) => {
  const { publicKey, connected } = useWallet();
  const wallet = useWallet();
  const { connection } = useConnection();
  const [isDeploying, setIsDeploying] = useState(false);
  const [lastResult, setLastResult] = useState<DeployTokenResult | null>(null);

  const isReady = tokenData.name && tokenData.ticker && connected;

  const handleDeploy = async () => {
    if (!isReady || !publicKey) {
      if (!connected) {
        toast.error('Connect your Phantom wallet first');
      } else {
        toast.error('Fill in token name and ticker first');
      }
      return;
    }

    // Check balance
    const balance = await getWalletBalance(connection, publicKey);
    const requiredBalance = devBuyAmountSol + 0.02; // Extra for fees
    
    if (!checkMinimumBalance(balance) || balance < requiredBalance) {
      toast.error(`Insufficient balance. Need at least ${requiredBalance.toFixed(3)} SOL`);
      return;
    }

    setIsDeploying(true);
    onDeployStart?.();

    try {
      toast.info('🚀 Starting token declaw on pump.fun...');

      const metadata: TokenMetadata = {
        name: tokenData.name || 'Unnamed Token',
        symbol: tokenData.ticker || 'TOKEN',
        description: tokenData.description || 'Token created with declaw',
        imageUrl: tokenData.logo || 'https://pump.fun/img/pump-logo.png',
        ...(tokenData.twitter && { twitter: tokenData.twitter.startsWith('http') ? tokenData.twitter : `https://x.com/${tokenData.twitter.replace(/^@/, '')}` }),
      };

      const result = await createPumpFunToken(connection, wallet, {
        metadata,
        devBuyAmountSol,
      });

      setLastResult(result);
      onDeployComplete?.(result);

      if (result.success) {
        // Save to database
        try {
          await saveDeployedToken({
            name: metadata.name,
            ticker: metadata.symbol,
            description: metadata.description,
            logoUrl: metadata.imageUrl,
            mintAddress: result.mintAddress!,
            pumpUrl: result.pumpUrl!,
            creatorWallet: publicKey.toBase58(),
            devBuyAmountSol,
            transactionSignature: result.signature,
          });
        } catch (saveError) {
          console.error('Failed to save token to DB:', saveError);
        }

        toast.success(
          <div className="flex flex-col gap-1">
            <span>🎉 Token declawed successfully!</span>
            <a 
              href={result.pumpUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs underline flex items-center gap-1"
            >
              View on pump.fun <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        );
      } else {
        toast.error(`Declaw failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Deploy error:', error);
      toast.error(`Declaw failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleDeploy}
        disabled={!isReady || isDeploying}
        className={`w-full flex items-center gap-2 justify-center py-3 font-mono text-sm ${
          isReady && !isDeploying
            ? 'win95-button-primary hover-elevate'
            : 'win95-button opacity-60 cursor-not-allowed'
        }`}
      >
        {isDeploying ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Declawing...</span>
          </>
        ) : (
          <>
            <Rocket className="w-4 h-4" />
            <span>DECLAW TOKEN</span>
          </>
        )}
      </button>

      {!connected && (
        <div className="flex items-center gap-1 justify-center text-[10px] text-[#ff6b00]">
          <AlertCircle className="w-3 h-3" />
          <span>Connect Phantom wallet to declaw</span>
        </div>
      )}

      {connected && !tokenData.name && (
        <div className="flex items-center gap-1 justify-center text-[10px] text-[#808080]">
          <AlertCircle className="w-3 h-3" />
          <span>Enter token name in chat to enable</span>
        </div>
      )}

      {lastResult?.success && lastResult.pumpUrl && (
        <a
          href={lastResult.pumpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="win95-button w-full flex items-center gap-2 justify-center py-1 text-xs"
        >
          <ExternalLink className="w-3 h-3 text-black" />
          <span className="text-black">View on Pump.fun</span>
        </a>
      )}
    </div>
  );
};

export default DeployTokenButton;
