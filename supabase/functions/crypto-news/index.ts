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

// Fetch from multiple free RSS feeds and aggregate
async function fetchCryptoNews(): Promise<NewsItem[]> {
  const news: NewsItem[] = [];
  
  try {
    // Try CoinTelegraph RSS
    const ctResponse = await fetch('https://cointelegraph.com/rss');
    if (ctResponse.ok) {
      const ctXml = await ctResponse.text();
      const ctItems = parseRSS(ctXml, 'CoinTelegraph');
      news.push(...ctItems.slice(0, 5));
    }
  } catch (e) {
    console.error('CoinTelegraph fetch failed:', e);
  }

  try {
    // Try Decrypt RSS
    const decryptResponse = await fetch('https://decrypt.co/feed');
    if (decryptResponse.ok) {
      const decryptXml = await decryptResponse.text();
      const decryptItems = parseRSS(decryptXml, 'Decrypt');
      news.push(...decryptItems.slice(0, 5));
    }
  } catch (e) {
    console.error('Decrypt fetch failed:', e);
  }

  try {
    // Try Bitcoin Magazine RSS
    const btcResponse = await fetch('https://bitcoinmagazine.com/.rss/full/');
    if (btcResponse.ok) {
      const btcXml = await btcResponse.text();
      const btcItems = parseRSS(btcXml, 'Bitcoin Magazine');
      news.push(...btcItems.slice(0, 3));
    }
  } catch (e) {
    console.error('Bitcoin Magazine fetch failed:', e);
  }

  // Sort by newest first (based on publishedAt time) and limit
  news.sort((a, b) => {
    // Parse time strings to compare
    const timeA = a.publishedAt;
    const timeB = b.publishedAt;
    return timeB.localeCompare(timeA);
  });
  
  return news.slice(0, 15);
}

function parseRSS(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/;
  const linkRegex = /<link>(.*?)<\/link>|<link><!\[CDATA\[(.*?)\]\]>|<link\s+href="([^"]+)"/;
  const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;

  let match;
  let index = 0;
  while ((match = itemRegex.exec(xml)) !== null && index < 10) {
    const itemContent = match[1];
    
    const titleMatch = titleRegex.exec(itemContent);
    const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : '';
    
    const linkMatch = linkRegex.exec(itemContent);
    const link = linkMatch ? (linkMatch[1] || linkMatch[2] || linkMatch[3]) : '';
    
    const pubDateMatch = pubDateRegex.exec(itemContent);
    const pubDate = pubDateMatch ? pubDateMatch[1] : new Date().toISOString();

    if (title && link && link !== '#') {
      items.push({
        id: `${source}-${index}-${Date.now()}`,
        title: title.trim().replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
        source,
        publishedAt: formatDate(pubDate),
        url: link.trim(),
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
    
    // If no news from feeds, return mock data
    if (news.length === 0) {
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'Solana TVL hits new ATH as meme coins surge on Pump.fun',
          source: 'CryptoNews',
          publishedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          url: '#',
        },
        {
          id: '2',
          title: 'AI agents gaining traction in DeFi ecosystem',
          source: 'The Block',
          publishedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          url: '#',
        },
        {
          id: '3',
          title: 'New Pump.fun tokens see 300% volume increase',
          source: 'Decrypt',
          publishedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          url: '#',
        },
        {
          id: '4',
          title: 'Cat-themed tokens lead today\'s narratives on Solana',
          source: 'CoinDesk',
          publishedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          url: '#',
        },
        {
          id: '5',
          title: 'Gaming tokens show early momentum signals',
          source: 'BlockWorks',
          publishedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          url: '#',
        },
      ];
      return new Response(JSON.stringify({ news: mockNews }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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
