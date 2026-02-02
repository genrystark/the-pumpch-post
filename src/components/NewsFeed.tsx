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
    // Refresh news every 60 seconds
    const interval = setInterval(fetchNews, 60000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <div className="h-full flex flex-col bg-paper border-l border-border">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-accent" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink">
            Live News
          </h3>
        </div>
        <button 
          onClick={fetchNews}
          className="text-ink-faded hover:text-accent transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* News list */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-3 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-3 bg-muted rounded w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {news.map((item, index) => (
              <div 
                key={item.id} 
                className="p-3 hover:bg-muted/50 transition-all duration-200 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-accent transition-colors"
                >
                  <p className="font-body text-sm text-ink leading-snug mb-1 line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ink-faded">
                      {item.source}
                    </span>
                    <span className="font-mono text-xs text-ink-faded">
                      {item.publishedAt}
                    </span>
                  </div>
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full h-7 text-xs font-mono uppercase tracking-wider text-accent hover:text-accent-foreground hover:bg-accent hover:scale-[1.02] transition-all duration-200"
                  onClick={() => onLaunchIdea(item.title)}
                >
                  <Rocket className="w-3 h-3 mr-1" />
                  Launch Idea
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
