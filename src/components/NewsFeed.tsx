import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Newspaper, Rocket, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
}

interface NewsFeedProps {
  onLaunchIdea: (newsTitle: string) => void;
}

const NewsFeed = ({ onLaunchIdea }: NewsFeedProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('crypto-news');
      
      if (error) {
        console.error('Error fetching news:', error);
        setNews(getMockNews());
      } else if (data?.news) {
        setNews(data.news);
      } else {
        setNews(getMockNews());
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setNews(getMockNews());
    }
    setLoading(false);
  }, []);

  const getMockNews = (): NewsItem[] => [
    {
      id: "1",
      title: "Solana TVL hits new ATH as meme coins surge",
      source: "CoinDesk",
      publishedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      url: "#",
    },
    {
      id: "2", 
      title: "AI agents gaining traction in DeFi ecosystem",
      source: "The Block",
      publishedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      url: "#",
    },
    {
      id: "3",
      title: "New Pump.fun tokens see 300% volume increase",
      source: "Decrypt",
      publishedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      url: "#",
    },
    {
      id: "4",
      title: "Cat-themed tokens lead today's narratives",
      source: "CryptoNews",
      publishedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      url: "#",
    },
    {
      id: "5",
      title: "Gaming tokens show early momentum signals",
      source: "BlockWorks",
      publishedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      url: "#",
    },
  ];

  useEffect(() => {
    fetchNews();
    // Refresh news every 30 seconds for more real-time feel
    const interval = setInterval(fetchNews, 30000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <div className="win95-window h-full flex flex-col">
      <div className="win95-titlebar">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4" />
          <span className="text-xs">Live News</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={fetchNews}
            className="win95-control-btn text-[8px]"
            disabled={loading}
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button className="win95-control-btn text-[8px]">_</button>
          <button className="win95-control-btn text-[8px]">×</button>
        </div>
      </div>

      {/* News list */}
      <div className="flex-1 overflow-y-auto bg-[#1a1a1a]">
        {loading ? (
          <div className="p-2 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse p-2 bg-[#2a2a2a]">
                <div className="h-3 bg-[#3a3a3a] w-3/4 mb-2" />
                <div className="h-2 bg-[#3a3a3a] w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-1 space-y-1">
            {news.map((item) => (
              <div 
                key={item.id} 
                className="p-2 bg-[#2a2a2a] border border-[#3a3a3a] hover:bg-[#3a3a3a] transition-colors"
              >
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <p className="font-mono text-xs text-[#00ff00] leading-snug mb-1 line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#808080]">
                      {item.source}
                    </span>
                    <span className="font-mono text-[10px] text-[#808080]">
                      {item.publishedAt}
                    </span>
                  </div>
                </a>
                <button
                  className="win95-button-primary w-full mt-2 text-[10px] py-1 flex items-center justify-center gap-1"
                  onClick={() => onLaunchIdea(item.title)}
                >
                  <Rocket className="w-3 h-3" />
                  Launch Idea
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="win95-statusbar text-[10px]">
        <div className="win95-statusbar-inset flex-1">
          {news.length} items • Auto-refresh 30s
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
