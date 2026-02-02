import { useState, useEffect, useCallback } from "react";
import { Newspaper, Rocket, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
}

interface XPost {
  id: string;
  text: string;
  author: string;
  url: string;
  publishedAt: string;
}

interface NewsFeedProps {
  onLaunchIdea: (idea: string) => void;
}

type Tab = "news" | "x";

const NewsFeed = ({ onLaunchIdea }: NewsFeedProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("news");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [tweets, setTweets] = useState<XPost[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [xLoading, setXLoading] = useState(false);

  const fetchNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("crypto-news");
      if (error) throw error;
      if (data?.news?.length) {
        setNews(data.news.filter((n: NewsItem) => n.url && n.url.startsWith("http")));
      } else {
        setNews([]);
      }
    } catch (e) {
      console.error("Failed to fetch news:", e);
      setNews([]);
    }
    setNewsLoading(false);
  }, []);

  const fetchXFeed = useCallback(async () => {
    setXLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("x-feed");
      if (error) throw error;
      setTweets(data?.tweets ?? []);
    } catch (e) {
      console.error("Failed to fetch X feed:", e);
      setTweets([]);
    }
    setXLoading(false);
  }, []);

  useEffect(() => {
    fetchNews();
    const t = setInterval(fetchNews, 45000);
    return () => clearInterval(t);
  }, [fetchNews]);

  useEffect(() => {
    if (activeTab === "x") fetchXFeed();
  }, [activeTab, fetchXFeed]);

  return (
    <div className="win95-window h-full flex flex-col">
      <div className="win95-titlebar">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Newspaper className="w-4 h-4 shrink-0" />
          <div className="flex border border-[#808080] bg-[#c0c0c0] p-0.5 gap-0 flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setActiveTab("news")}
              className={`flex-1 min-w-0 px-2 py-0.5 text-[10px] font-mono border shrink-0 ${
                activeTab === "news"
                  ? "border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0]"
                  : "win95-button"
              }`}
            >
              Live News
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("x")}
              className={`flex-1 min-w-0 px-2 py-0.5 text-[10px] font-mono border shrink-0 ${
                activeTab === "x"
                  ? "border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0]"
                  : "win95-button"
              }`}
            >
              X Feed
            </button>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            type="button"
            onClick={activeTab === "news" ? fetchNews : fetchXFeed}
            disabled={activeTab === "news" ? newsLoading : xLoading}
            className="win95-control-btn text-[8px]"
          >
            <RefreshCw className={`w-3 h-3 ${(activeTab === "news" ? newsLoading : xLoading) ? "animate-spin" : ""}`} />
          </button>
          <button type="button" className="win95-control-btn text-[8px]">_</button>
          <button type="button" className="win95-control-btn text-[8px]">×</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#1a1a1a] min-h-0">
        {activeTab === "news" ? (
          newsLoading ? (
            <div className="p-2 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse p-2 bg-[#2a2a2a]">
                  <div className="h-3 bg-[#3a3a3a] w-3/4 mb-2" />
                  <div className="h-2 bg-[#3a3a3a] w-1/2" />
                </div>
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="p-4 font-mono text-xs text-[#808080] text-center">
              No news right now. Try again later.
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
                      <span className="font-mono text-[10px] text-[#808080]">{item.source}</span>
                      <span className="font-mono text-[10px] text-[#808080]">{item.publishedAt}</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="win95-button-primary w-full mt-2 text-[10px] py-1 flex items-center justify-center gap-1"
                    onClick={() => onLaunchIdea(item.title)}
                  >
                    <Rocket className="w-3 h-3" />
                    Declaw
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          xLoading ? (
            <div className="p-2 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse p-2 bg-[#2a2a2a]">
                  <div className="h-3 bg-[#3a3a3a] w-full mb-2" />
                  <div className="h-2 bg-[#3a3a3a] w-1/3" />
                </div>
              ))}
            </div>
          ) : tweets.length === 0 ? (
            <div className="p-4 font-mono text-xs text-[#808080] text-center">
              No posts right now. Try again later.
            </div>
          ) : (
            <div className="p-1 space-y-1">
              {tweets.map((post) => (
                <div
                  key={post.id}
                  className="p-2 bg-[#2a2a2a] border border-[#3a3a3a] hover:bg-[#3a3a3a] transition-colors"
                >
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <p className="font-mono text-xs text-[#00ff00] leading-snug mb-1 line-clamp-3">
                      {post.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#808080]">{post.author}</span>
                      <span className="font-mono text-[10px] text-[#808080]">{post.publishedAt}</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="win95-button-primary w-full mt-2 text-[10px] py-1 flex items-center justify-center gap-1"
                    onClick={() => onLaunchIdea(post.text)}
                  >
                    <Rocket className="w-3 h-3" />
                    Declaw
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <div className="win95-statusbar text-[10px]">
        <div className="win95-statusbar-inset flex-1">
          {activeTab === "news" ? `${news.length} items` : `${tweets.length} posts`} •{" "}
          {activeTab === "news" ? "Auto-refresh 45s" : "X Feed"}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
