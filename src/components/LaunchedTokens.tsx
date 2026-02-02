import { Rocket, TrendingUp, Users } from "lucide-react";

interface LaunchedToken {
  id: string;
  name: string;
  ticker: string;
  marketCap: string;
  holders: number;
  launchDate: string;
  logo: string;
}

const LaunchedTokens = () => {
  // Mock data - в будущем будет загружаться из базы данных
  const tokens: LaunchedToken[] = [
    {
      id: "1",
      name: "PumpCat",
      ticker: "$PCAT",
      marketCap: "$125K",
      holders: 342,
      launchDate: "2 hours ago",
      logo: "🐱",
    },
    {
      id: "2",
      name: "SolanaAI",
      ticker: "$SOLAI",
      marketCap: "$89K",
      holders: 218,
      launchDate: "5 hours ago",
      logo: "🤖",
    },
    {
      id: "3",
      name: "MoonDoge",
      ticker: "$MDOGE",
      marketCap: "$256K",
      holders: 567,
      launchDate: "1 day ago",
      logo: "🐕",
    },
    {
      id: "4",
      name: "CryptoFrog",
      ticker: "$FROG",
      marketCap: "$45K",
      holders: 123,
      launchDate: "2 days ago",
      logo: "🐸",
    },
  ];

  return (
    <section className="py-16 bg-paper-aged border-y border-border">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10 opacity-0 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-accent" />
            <Rocket className="w-5 h-5 text-accent" />
            <div className="w-12 h-px bg-accent" />
          </div>
          <h2 className="masthead text-3xl md:text-4xl text-ink mb-3">
            LAUNCHED WITH PUMPCH
          </h2>
          <p className="font-body text-ink-light max-w-lg mx-auto">
            Tokens created and launched using our AI agent
          </p>
        </div>

        {/* Tokens Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tokens.map((token, index) => (
            <div
              key={token.id}
              className="border border-border bg-paper p-4 hover:border-accent hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in-up cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Token Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-muted rounded-none border border-border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {token.logo}
                </div>
                <div>
                  <h3 className="font-headline font-bold text-ink group-hover:text-accent transition-colors">
                    {token.name}
                  </h3>
                  <span className="font-mono text-xs text-accent">
                    {token.ticker}
                  </span>
                </div>
              </div>

              {/* Token Stats */}
              <div className="space-y-2 border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-faded flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Market Cap
                  </span>
                  <span className="font-mono text-sm text-ink font-medium">
                    {token.marketCap}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-faded flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Holders
                  </span>
                  <span className="font-mono text-sm text-ink">
                    {token.holders}
                  </span>
                </div>
              </div>

              {/* Launch Date */}
              <div className="mt-3 pt-2 border-t border-border">
                <span className="font-mono text-xs text-ink-faded">
                  Launched {token.launchDate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="text-center mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="font-mono text-xs text-ink-faded uppercase tracking-wider">
            More tokens launching soon • Be the first to create yours
          </p>
        </div>
      </div>
    </section>
  );
};

export default LaunchedTokens;
