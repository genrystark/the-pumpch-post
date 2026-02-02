import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TELEGRAM_API = "https://api.telegram.org";

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    chat: { id: number; type: string };
    from?: { id: number; username?: string; first_name?: string };
    text?: string;
  };
}

function getEnv(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

async function sendTelegram(
  token: string,
  method: string,
  body: Record<string, unknown>
): Promise<Response> {
  return fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function buildDeclawLink(name: string, ticker: string, description?: string): string {
  const base = Deno.env.get("APP_BASE_URL") || "https://the-pumpch-post.vercel.app";
  const params = new URLSearchParams();
  params.set("name", name);
  params.set("ticker", ticker.toUpperCase());
  if (description) params.set("description", description);
  return `${base.replace(/\/$/, "")}/chat?${params.toString()}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("OK", { status: 200 });
  }

  try {
    const token = getEnv("TELEGRAM_BOT_TOKEN");
    const update: TelegramUpdate = await req.json();
    const message = update.message;
    if (!message?.text) return new Response("OK", { status: 200 });

    const chatId = message.chat.id;
    const text = message.text.trim();

    // /start
    if (text === "/start") {
      await sendTelegram(token, "sendMessage", {
        chat_id: chatId,
        text: `🐾 *declaw* — твой агент для мем-токенов на Solana.\n\n` +
          `Чтобы задеплоить токен:\n` +
          `• Напиши: \`/create Название TICKER\`\n` +
          `• Или: \`Название TICKER\`\n\n` +
          `Пример: \`/create Pumpch PUMP\` или \`Pumpch PUMP\`\n\n` +
          `Я пришлю ссылку на десктоп — открой её, подключи Phantom и нажми Declaw.`,
        parse_mode: "Markdown",
      });
      return new Response("OK", { status: 200 });
    }

    // /create Name TICKER or "Name TICKER" (ticker = last word, 2–10 chars)
    const raw = text.startsWith("/create ") ? text.slice(8).trim() : text;
    const parts = raw.split(/\s+/).filter(Boolean);
    const last = parts[parts.length - 1] ?? "";
    const isTicker = /^[A-Za-z0-9]{2,10}$/.test(last) && parts.length >= 2;

    if (isTicker) {
      const ticker = last;
      const name = parts.slice(0, -1).join(" ").trim();
      if (!name) {
        await sendTelegram(token, "sendMessage", {
          chat_id: chatId,
          text: "Укажи название и тикер, например: `/create Pumpch PUMP` или `Pumpch PUMP`",
          parse_mode: "Markdown",
        });
        return new Response("OK", { status: 200 });
      }
      const link = buildDeclawLink(name, ticker);
      await sendTelegram(token, "sendMessage", {
        chat_id: chatId,
        text: `✅ Токен *${name}* ($${ticker.toUpperCase()})\n\n` +
          `Открой ссылку, подключи Phantom и нажми *Declaw*:\n${link}`,
        parse_mode: "Markdown",
      });
      return new Response("OK", { status: 200 });
    }

    // Unknown
    await sendTelegram(token, "sendMessage", {
      chat_id: chatId,
      text: "Напиши `/create Название TICKER` или просто `Название TICKER`, например: `Pumpch PUMP`.",
      parse_mode: "Markdown",
    });
    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error("declaw-telegram-bot error:", e);
    return new Response("OK", { status: 200 }); // Always 200 so Telegram doesn't retry
  }
});
