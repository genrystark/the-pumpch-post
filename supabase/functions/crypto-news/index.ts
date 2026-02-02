import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
}

// Fetch from multiple free RSS feeds and aggregate (real links only)
async function fetchCryptoNews(): Promise<NewsItem[]> {
  const news: NewsItem[] = [];
  const feeds: { url: string; source: string; max: number }[] = [
    { url: 'https://cointelegraph.com/rss', source: 'CoinTelegraph', max: 8 },
    { url: 'https://decrypt.co/feed', source: 'Decrypt', max: 8 },
    { url: 'https://bitcoinmagazine.com/.rss/full/', source: 'Bitcoin Magazine', max: 6 },
    { url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', source: 'CoinDesk', max: 8 },
    { url: 'https://cryptonews.com/news/feed/', source: 'CryptoNews', max: 6 },
    { url: 'https://www.theblock.co/rss.xml', source: 'The Block', max: 6 },
  ];

  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, { headers: { 'User-Agent': 'DeclawBot/1.0' } });
      if (res.ok) {
        const xml = await res.text();
        const items = parseRSS(xml, feed.source, feed.max);
        news.push(...items);
      }
    } catch (e) {
      console.error(`${feed.source} fetch failed:`, e);
    }
  }

  news.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return news.slice(0, 30);
}

function parseRSS(xml: string, source: string, maxItems: number): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/;
  const linkRegex = /<link>(.*?)<\/link>|<link><!\[CDATA\[(.*?)\]\]>|<link\s+href="([^"]+)"/;
  const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;

  let match;
  let index = 0;
  while ((match = itemRegex.exec(xml)) !== null && index < maxItems) {
    const itemContent = match[1];
    const titleMatch = titleRegex.exec(itemContent);
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').trim() : '';
    const linkMatch = linkRegex.exec(itemContent);
    let link = linkMatch ? (linkMatch[1] || linkMatch[2] || linkMatch[3] || '').trim() : '';
    if (link && !link.startsWith('http')) link = '';
    const pubDateMatch = pubDateRegex.exec(itemContent);
    const pubDate = pubDateMatch ? pubDateMatch[1] : new Date().toISOString();

    if (title && link && link.startsWith('http')) {
      items.push({
        id: `${source}-${index}-${Date.now()}`,
        title: title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/<[^>]+>/g, ''),
        source,
        publishedAt: formatDate(pubDate),
        url: link,
      });
      index++;
    }
  }
  return items;
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const news = await fetchCryptoNews();

    return new Response(JSON.stringify({ news }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
