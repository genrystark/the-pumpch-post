import { Folder, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const LaunchedTokens = () => {
  const mockTokens = [
    { name: "PUMPSTER", ticker: "PUMP", progress: 45, price: "0.00000042", marketCap: "$42.5K", age: "2h ago" },
    { name: "DEGEN CAT", ticker: "DCAT", progress: 78, price: "0.00000089", marketCap: "$89.2K", age: "5h ago" },
    { name: "MOON FROG", ticker: "MFROG", progress: 23, price: "0.00000015", marketCap: "$15.3K", age: "1d ago" },
  ];

  return (
    <section className="py-8">
      <div className="container">
        <div className="win95-window">
          <div className="win95-titlebar">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Token Explorer - Recent Launches</span>
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
                <select className="win95-input text-xs">
                  <option>All Tokens</option>
                  <option>Active</option>
                  <option>Graduated</option>
                </select>
                <Link to="/chat">
                  <button className="win95-button-primary text-xs flex items-center gap-1">
                    <Plus className="w-3 h-3" />
                    New Token
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="bg-[#1a1a1a] p-3 flex justify-center gap-4 border-b border-[#3a3a3a]">
            <div className="win95-groupbox px-4 py-2">
              <span className="win95-groupbox-title text-[9px]">Active</span>
              <div className="text-lg font-bold text-orange text-center">12</div>
            </div>
            <div className="win95-groupbox px-4 py-2">
              <span className="win95-groupbox-title text-[9px]">Graduated</span>
              <div className="text-lg font-bold text-yellow-500 text-center">3</div>
            </div>
            <div className="win95-groupbox px-4 py-2">
              <span className="win95-groupbox-title text-[9px]">SOL Raised</span>
              <div className="text-lg font-bold text-green-500 text-center">145.2</div>
            </div>
          </div>
          
          {/* Token List */}
          <div className="bg-[#1a1a1a] p-2">
            <div className="win95-listview overflow-hidden">
              {/* Mobile view */}
              <div className="sm:hidden space-y-2 p-2">
                {mockTokens.map((token) => (
                  <div key={token.ticker} className="win95-outset p-3 cursor-pointer hover-elevate">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-black">{token.ticker}</span>
                          <span className="text-[10px] px-1 bg-orange text-white">LINEAR</span>
                        </div>
                        <span className="text-[#808080] text-xs">{token.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-orange text-sm font-bold">{token.price}</div>
                        <div className="text-[#808080] text-[10px]">SOL</div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="win95-progress h-3">
                        <div className="win95-progress-bar-orange" style={{ width: `${token.progress}%` }} />
                      </div>
                      <div className="text-[10px] text-[#808080] mt-1">{token.progress}% to graduation</div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#808080]">
                      <span>MC: {token.marketCap}</span>
                      <span>{token.age}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop view */}
              <table className="hidden sm:table w-full text-xs">
                <thead className="win95-listview-header">
                  <tr>
                    <th className="text-left p-2 text-black">Token</th>
                    <th className="text-left p-2 text-black">Type</th>
                    <th className="text-left p-2 text-black">Progress</th>
                    <th className="text-right p-2 text-black">Price</th>
                    <th className="text-right p-2 text-black">Market Cap</th>
                    <th className="text-right p-2 text-black">Age</th>
                    <th className="text-center p-2 text-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTokens.map((token) => (
                    <tr key={token.ticker} className="win95-listview-row-orange cursor-pointer border-b border-[#c0c0c0]">
                      <td className="p-2">
                        <div className="flex flex-col">
                          <span className="font-bold text-black">{token.ticker}</span>
                          <span className="text-[#808080] text-[10px]">{token.name}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className="text-[10px] px-1 bg-orange text-white">LINEAR</span>
                      </td>
                      <td className="p-2">
                        <div className="w-24">
                          <div className="win95-progress h-3">
                            <div className="win95-progress-bar-orange" style={{ width: `${token.progress}%` }} />
                          </div>
                          <div className="text-[9px] text-[#808080]">{token.progress}%</div>
                        </div>
                      </td>
                      <td className="p-2 text-right text-orange font-bold">{token.price}</td>
                      <td className="p-2 text-right text-[#000080]">{token.marketCap}</td>
                      <td className="p-2 text-right text-[#808080]">{token.age}</td>
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="win95-button-primary text-[10px] px-2 py-1">BUY</button>
                          <button className="win95-button text-[10px] px-2 py-1">SELL</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="win95-statusbar flex justify-between items-center">
            <div className="win95-statusbar-inset flex-1 text-[10px]">
              {mockTokens.length} token(s) | Pump.fun Network
            </div>
            <div className="win95-statusbar-inset text-[10px]">
              Solana Mainnet
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaunchedTokens;
