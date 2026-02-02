import { useMemo, useState } from "react";
import { Folder, Plus, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDeployedTokens, DeployedToken } from "@/hooks/useDeployedTokens";
import { useDexScreenerTokens } from "@/hooks/useDexScreenerTokens";
import { formatPrice, formatMarketCapShort, ageFromTimestamp } from "@/lib/dexscreener";
import { useAgents, DEFAULT_AGENT_ID } from "@/hooks/useAgents";
import hqmLogo from "@/assets/tokens/hqm.png";
import juffLogo from "@/assets/tokens/juff.png";
import helenLogo from "@/assets/tokens/helen.png";

// Fallback tokens for showcase
const fallbackTokens = [
  { 
    id: "fallback-1",
    name: "highest quality meme", 
    ticker: "HQM", 
    progress: 67, 
    price: "0.00000089", 
    marketCap: "$89.5K", 
    age: "1h ago",
    mint_address: "Cp7pMBHYdYfCCosyqCFzg7hhxZQwtesbCpMjUgEVkgQf",
    logo_url: hqmLogo,
    pump_url: "https://pump.fun/Cp7pMBHYdYfCCosyqCFzg7hhxZQwtesbCpMjUgEVkgQf",
    agent_id: DEFAULT_AGENT_ID,
    agent_name: "declaw",
  },
  { 
    id: "fallback-2",
    name: "Juffrey Epstuin", 
    ticker: "JUFF", 
    progress: 45, 
    price: "0.00000042", 
    marketCap: "$42.5K", 
    age: "2h ago",
    mint_address: "DVuB8E4r4DbLPSYP2pob14xi6r7cYPVh6Cdx2Az4pump",
    logo_url: juffLogo,
    pump_url: "https://pump.fun/DVuB8E4r4DbLPSYP2pob14xi6r7cYPVh6Cdx2Az4pump",
    agent_id: DEFAULT_AGENT_ID,
    agent_name: "declaw",
  },
  { 
    id: "fallback-3",
    name: "Helen of Troy", 
    ticker: "HELEN", 
    progress: 23, 
    price: "0.00000015", 
    marketCap: "$15.3K", 
    age: "5h ago",
    mint_address: "B2N5xBkrDHaTPokHNgVx2UfZndbTtPF3B9iNRsNapump",
    logo_url: helenLogo,
    pump_url: "https://pump.fun/B2N5xBkrDHaTPokHNgVx2UfZndbTtPF3B9iNRsNapump",
    agent_id: DEFAULT_AGENT_ID,
    agent_name: "declaw",
  },
];

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const LaunchedTokens = () => {
  const { data: agents = [] } = useAgents();
  const [filterAgentId, setFilterAgentId] = useState<string | null>(null);
  const { data: dbTokens, isLoading } = useDeployedTokens(filterAgentId);

  // Helper to get agent name by id
  const getAgentName = (agentId: string | null): string => {
    if (!agentId) return "declaw";
    const agent = agents.find(a => a.id === agentId);
    return agent?.name ?? "declaw";
  };

  // Raw list: DB tokens + fallback (for mint addresses and base fields)
  const rawTokens = useMemo(
    () => [
      ...(dbTokens || []).map((t: DeployedToken) => ({
        id: t.id,
        name: t.name,
        ticker: t.ticker,
        mint_address: t.mint_address,
        logo_url: t.logo_url || "https://pump.fun/img/pump-logo.png",
        pump_url: t.pump_url,
        agent_name: getAgentName(t.agent_id),
        created_at: t.created_at,
      })),
      ...fallbackTokens.map((f) => ({
        id: f.id,
        name: f.name,
        ticker: f.ticker,
        mint_address: f.mint_address,
        logo_url: f.logo_url,
        pump_url: f.pump_url,
        agent_name: f.agent_name,
        created_at: null as string | null,
      })),
    ],
    [dbTokens, agents]
  );

  const mintAddresses = useMemo(() => rawTokens.map((t) => t.mint_address), [rawTokens]);
  const { data: dexData } = useDexScreenerTokens(mintAddresses);

  // Progress: 100% when market cap >= $50K, else (marketCap / 50000) * 100
  const GRADUATE_CAP_USD = 50000;
  const progressFromMarketCap = (marketCap: number | null): number => {
    if (marketCap == null || marketCap <= 0) return 0;
    if (marketCap >= GRADUATE_CAP_USD) return 100;
    return Math.min(99, Math.round((marketCap / GRADUATE_CAP_USD) * 100));
  };

  // Merge DexScreener data: real price, marketCap, age when available
  const allTokens = useMemo(
    () =>
      rawTokens.map((t) => {
        const dex = dexData.get(t.mint_address);
        const progress = dex?.marketCap != null ? progressFromMarketCap(dex.marketCap) : 0;
        return {
          id: t.id,
          name: t.name,
          ticker: t.ticker,
          progress,
          price: dex ? formatPrice(dex.priceUsd) : "—",
          marketCap: dex?.marketCap != null ? formatMarketCapShort(dex.marketCap) : "—",
          age: dex?.pairCreatedAt != null ? ageFromTimestamp(dex.pairCreatedAt) : (t.created_at ? formatTimeAgo(t.created_at) : "—"),
          mint_address: t.mint_address,
          logo_url: t.logo_url,
          pump_url: t.pump_url,
          agent_name: t.agent_name,
        };
      }),
    [rawTokens, dexData]
  );

  return (
    <section id="launched-tokens" className="py-8">
      <div className="container">
        <motion.div 
          className="win95-window"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="win95-titlebar">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Token Explorer - Recent Declaws</span>
            </div>
            <div className="flex gap-1">
              <button className="win95-control-btn text-[8px]">_</button>
              <button className="win95-control-btn text-[8px]">□</button>
              <button className="win95-control-btn text-[8px]">×</button>
            </div>
          </div>
          
          {/* Toolbar */}
          <div className="bg-[#1a1a1a] p-2 border-b border-[#3a3a3a]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-1 flex-1">
                <Search className="w-4 h-4 text-[#808080] flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search tokens..." 
                  className="win95-input flex-1 sm:w-40 md:w-60"
                />
              </div>
              <div className="flex items-center gap-2">
                <select 
                  className="win95-input text-xs"
                  value={filterAgentId || ""}
                  onChange={(e) => setFilterAgentId(e.target.value || null)}
                >
                  <option value="">All Agents</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
                <Link to="/chat">
                  <motion.button 
                    className="win95-button-primary text-xs flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-3 h-3" />
                    New Declaw
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="bg-[#1a1a1a] p-3 flex flex-wrap justify-center gap-2 sm:gap-4 border-b border-[#3a3a3a]">
            {[
              { label: "Declawed", value: allTokens.length, color: "text-orange" },
              { label: "Graduated", value: 0, color: "text-yellow-500" },
              { label: "SOL Raised", value: 0, color: "text-green-500" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="win95-groupbox px-3 sm:px-4 py-2 min-w-[80px]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="win95-groupbox-title text-[8px] sm:text-[9px] whitespace-nowrap">{stat.label}</span>
                <div className={`text-lg font-bold ${stat.color} text-center`}>{stat.value}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Token List */}
          <div className="bg-[#1a1a1a] p-2">
            <div className="win95-listview overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-orange" />
                  <span className="ml-2 text-black">Loading tokens...</span>
                </div>
              ) : (
                <>
                  {/* Mobile view */}
                  <div className="sm:hidden space-y-2 p-2">
                    {allTokens.map((token, index) => (
                      <motion.a 
                        key={token.id} 
                        href={token.pump_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="win95-outset p-3 cursor-pointer block"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <motion.img 
                            src={token.logo_url} 
                            alt={token.name} 
                            className="w-10 h-10 object-cover flex-shrink-0"
                            whileHover={{ rotate: 10 }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-black">{token.ticker}</span>
                                <span className="text-[10px] px-1 bg-orange text-white">LINEAR</span>
                              </div>
                              <div className="text-right">
                                <div className="text-orange text-sm font-bold">{token.price}</div>
                                <div className="text-[#808080] text-[10px]">SOL</div>
                              </div>
                            </div>
                            <span className="text-[#808080] text-xs block truncate">{token.name}</span>
                            <span className="text-[10px] text-[#000080] mt-0.5">Agent: {token.agent_name}</span>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="win95-progress h-3">
                            <motion.div 
                              className="win95-progress-bar-orange" 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${token.progress ?? 0}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                          <div className="text-[10px] text-[#808080] mt-1">
                            {token.progress >= 100 ? "Graduated ($50K+)" : `${token.progress}% to $50K`}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-[#808080]">
                          <span>MC: {token.marketCap}</span>
                          <span>{token.age}</span>
                        </div>
                        <div className="text-[8px] text-[#808080] mt-1 truncate">
                          CA: {token.mint_address}
                        </div>
                      </motion.a>
                    ))}
                  </div>
              
              {/* Desktop view */}
              <table className="hidden sm:table w-full text-xs">
                <thead className="win95-listview-header">
                  <tr>
                    <th className="text-left p-2 text-black">Token</th>
                    <th className="text-left p-2 text-black">Agent</th>
                    <th className="text-left p-2 text-black">Type</th>
                    <th className="text-left p-2 text-black">Progress</th>
                    <th className="text-right p-2 text-black">Price</th>
                    <th className="text-right p-2 text-black">Market Cap</th>
                    <th className="text-right p-2 text-black">Age</th>
                    <th className="text-center p-2 text-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allTokens.map((token, index) => (
                    <motion.tr 
                      key={token.id} 
                      className="win95-listview-row-orange cursor-pointer border-b border-[#c0c0c0]"
                      onClick={() => window.open(token.pump_url, '_blank')}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ backgroundColor: "rgba(255, 107, 74, 0.1)" }}
                    >
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <motion.img 
                            src={token.logo_url} 
                            alt={token.name} 
                            className="w-8 h-8 object-cover flex-shrink-0"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                          />
                          <div className="flex flex-col">
                            <span className="font-bold text-black">{token.ticker}</span>
                            <span className="text-[#808080] text-[10px] truncate max-w-[120px]">{token.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className="font-mono text-[11px] text-[#000080]">{token.agent_name}</span>
                      </td>
                      <td className="p-2">
                        <span className="text-[10px] px-1 bg-orange text-white">LINEAR</span>
                      </td>
                      <td className="p-2">
                        <div className="w-24">
                          <div className="win95-progress h-3">
                            <motion.div 
                              className="win95-progress-bar-orange" 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${token.progress ?? 0}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            />
                          </div>
                          <div className="text-[9px] text-[#808080]">{token.progress >= 100 ? "100%" : `${token.progress}%`}</div>
                        </div>
                      </td>
                      <td className="p-2 text-right text-orange font-bold">{token.price}</td>
                      <td className="p-2 text-right text-[#000080]">{token.marketCap}</td>
                      <td className="p-2 text-right text-[#808080]">{token.age}</td>
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <motion.a 
                            href={token.pump_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="win95-button-primary text-[10px] px-2 py-1"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            VIEW
                          </motion.a>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              </>
              )}
            </div>
          </div>
          
          <div className="win95-statusbar flex justify-between items-center">
            <div className="win95-statusbar-inset flex-1 text-[10px]">
              {allTokens.length} token(s) | Solana Network
            </div>
            <div className="win95-statusbar-inset text-[10px]">
              Solana Mainnet
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchedTokens;
