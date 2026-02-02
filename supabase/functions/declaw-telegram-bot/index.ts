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
    let update: TelegramUpdate;
    try {
      update = await req.json();
    } catch {
      console.error("declaw-telegram-bot: invalid JSON body");
      return new Response("OK", { status: 200 });
    }
    const token = getEnv("TELEGRAM_BOT_TOKEN");
    const message = update.message;
    if (!message?.text) return new Response("OK", { status: 200 });

    const chatId = message.chat.id;
    const text = message.text.trim();

    // /start — меню: что умеет бот
    if (text === "/start") {
      await sendTelegram(token, "sendMessage", {
        chat_id: chatId,
        text:
          `🐾 *Declaw* — бот для деплоя мем-токенов на Solana.\n\n` +
          `*Что умеет:*\n` +
          `• /deploy — задеплоить проект (можно ввести данные)\n` +
          `• /create Name TICKER — создать токен по имени и тикеру\n` +
          `• Или просто: \`Name TICKER\` (например: Pumpch PUMP)\n\n` +
          `*Как деплоить:*\n` +
          `Напишите \`/deploy\` — бот подскажет. Или сразу: \`/deploy Pumpch PUMP\` или \`/create Pumpch PUMP\`.\n` +
          `Откроете ссылку → подключите Phantom → нажмите Declaw.`,
        parse_mode: "Markdown",
      });
      return new Response("OK", { status: 200 });
    }

    // /deploy или "деплой" — деплой с возможностью ввести данные
    const isDeployCmd = text === "/deploy" || text === "деплой" || text.startsWith("/deploy ") || text.startsWith("деплой ");
    const deployRaw = text.startsWith("/deploy ")
      ? text.slice(8).trim()
      : text.startsWith("деплой ")
        ? text.slice(7).trim()
        : (text === "/deploy" || text === "деплой") ? "" : null;

    if (deployRaw !== null) {
      if (!deployRaw) {
        await sendTelegram(token, "sendMessage", {
          chat_id: chatId,
          text:
            `📤 *Деплой токена*\n\n` +
            `Введите *имя* и *тикер* (2–10 букв/цифр), например:\n` +
            `\`Pumpch PUMP\`\n` +
            `или\n` +
            `\`/deploy Pumpch PUMP\`\n\n` +
            `После этого пришлю ссылку — откройте, подключите Phantom и нажмите Declaw.`,
          parse_mode: "Markdown",
        });
        return new Response("OK", { status: 200 });
      }
      const parts = deployRaw.split(/\s+/).filter(Boolean);
      const last = parts[parts.length - 1] ?? "";
      const isTicker = /^[A-Za-z0-9]{2,10}$/.test(last) && parts.length >= 2;
      if (isTicker) {
        const ticker = last;
        const name = parts.slice(0, -1).join(" ").trim();
        const link = buildDeclawLink(name, ticker);
        await sendTelegram(token, "sendMessage", {
          chat_id: chatId,
          text: `✅ Токен *${name}* ($${ticker.toUpperCase()})\n\nОткройте ссылку, подключите Phantom и нажмите *Declaw*:\n${link}`,
          parse_mode: "Markdown",
        });
        return new Response("OK", { status: 200 });
      }
      await sendTelegram(token, "sendMessage", {
        chat_id: chatId,
        text: "Укажите имя и тикер, например: `Pumpch PUMP` или `/deploy Pumpch PUMP`.",
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
          text: "Provide name and ticker, e.g. `/create Pumpch PUMP` or `Pumpch PUMP`",
          parse_mode: "Markdown",
        });
        return new Response("OK", { status: 200 });
      }
      const link = buildDeclawLink(name, ticker);
      await sendTelegram(token, "sendMessage", {
        chat_id: chatId,
        text: `✅ Token *${name}* ($${ticker.toUpperCase()})\n\n` +
          `Open the link, connect Phantom and hit *Declaw*:\n${link}`,
        parse_mode: "Markdown",
      });
      return new Response("OK", { status: 200 });
    }

    // Unknown
    await sendTelegram(token, "sendMessage", {
      chat_id: chatId,
      text: "Используйте /start — меню команд. Деплой: `/deploy` или `/deploy Name TICKER`, либо `/create Name TICKER` / `Name TICKER` (например: Pumpch PUMP).",
      parse_mode: "Markdown",
    });
    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error("declaw-telegram-bot error:", e);
    return new Response("OK", { status: 200 }); // Always 200 so Telegram doesn't retry
  }
});
