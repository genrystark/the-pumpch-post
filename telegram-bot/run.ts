/**
 * Declaw Telegram bot — без Supabase.
 * Long polling: запусти и бот будет получать сообщения и отвечать.
 *
 * В .env задай:
 *   TELEGRAM_BOT_TOKEN=...
 *   APP_BASE_URL=https://the-pumpch-post.vercel.app  (опционально)
 *
 * Запуск: bun run telegram-bot   или   npx tsx telegram-bot/run.ts
 */

import fs from "node:fs";
import path from "node:path";

const TELEGRAM_API = "https://api.telegram.org";

function loadEnv(): void {
  try {
    // ищем .env в текущей папке или в корне проекта (на уровень выше)
    const candidates = [
      path.join(process.cwd(), ".env"),
      path.join(process.cwd(), "..", ".env"),
    ];
    const envPath = candidates.find((p) => fs.existsSync(p));
    if (envPath) {
      const content = fs.readFileSync(envPath!, "utf-8");
      for (const line of content.split("\n")) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (m) process.env[m[1]!] = m[2]!.replace(/^["']|["']$/g, "").trim();
      }
    }
  } catch {
    // ignore
  }
}
loadEnv();

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Нужна переменная ${name} в .env (или export)`);
  return v;
}

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    chat: { id: number; type: string };
    from?: { id: number; username?: string; first_name?: string };
    text?: string;
  };
}

async function api(
  token: string,
  method: string,
  body: Record<string, unknown>
): Promise<{ ok: boolean; result?: unknown }> {
  const res = await fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<{ ok: boolean; result?: unknown }>;
}

async function sendMessage(
  token: string,
  chatId: number,
  text: string,
  parseMode: "Markdown" = "Markdown"
): Promise<void> {
  let out = await api(token, "sendMessage", { chat_id: chatId, text, parse_mode: parseMode });
  if (!out.ok && String((out as { description?: string }).description || "").includes("Markdown")) {
    out = await api(token, "sendMessage", { chat_id: chatId, text: text.replace(/\*/g, "").replace(/`/g, "") });
  }
  if (!out.ok) console.error("sendMessage error:", out);
}

function buildDeclawLink(name: string, ticker: string, description?: string): string {
  const base = process.env.APP_BASE_URL || "https://the-pumpch-post.vercel.app";
  const params = new URLSearchParams();
  params.set("name", name);
  params.set("ticker", ticker.toUpperCase());
  if (description) params.set("description", description);
  return `${base.replace(/\/$/, "")}/chat?${params.toString()}`;
}

async function handleMessage(token: string, chatId: number, text: string): Promise<void> {
  // /start
  if (text === "/start") {
    await sendMessage(
      token,
      chatId,
      "🐾 *Declaw* — бот для деплоя мем-токенов на Solana.\n\n" +
        "*Что умеет:*\n" +
        "• /deploy — задеплоить проект (можно ввести данные)\n" +
        "• /create Name TICKER — создать токен по имени и тикеру\n" +
        "• Или просто: `Name TICKER` (например: Pumpch PUMP)\n\n" +
        "*Как деплоить:*\n" +
        "Напишите `/deploy` — бот подскажет. Или сразу: `/deploy Pumpch PUMP` или `/create Pumpch PUMP`.\n" +
        "Откроете ссылку → подключите Phantom → нажмите Declaw."
    );
    return;
  }

  // /deploy или "деплой"
  const deployRaw =
    text.startsWith("/deploy ") ? text.slice(8).trim()
    : text.startsWith("деплой ") ? text.slice(7).trim()
    : (text === "/deploy" || text === "деплой") ? ""
    : null;

  if (deployRaw !== null) {
    if (!deployRaw) {
      await sendMessage(
        token,
        chatId,
        "📤 *Деплой токена*\n\n" +
          "Введите *имя* и *тикер* (2–10 букв/цифр), например:\n" +
          "`Pumpch PUMP`\nили\n`/deploy Pumpch PUMP`\n\n" +
          "После этого пришлю ссылку — откройте, подключите Phantom и нажмите Declaw."
      );
      return;
    }
    const parts = deployRaw.split(/\s+/).filter(Boolean);
    const last = parts[parts.length - 1] ?? "";
    const isTicker = /^[A-Za-z0-9]{2,10}$/.test(last) && parts.length >= 2;
    if (isTicker) {
      const ticker = last;
      const name = parts.slice(0, -1).join(" ").trim();
      const link = buildDeclawLink(name, ticker);
      await sendMessage(
        token,
        chatId,
        `✅ Токен *${name}* ($${ticker.toUpperCase()})\n\nОткройте ссылку, подключите Phantom и нажмите *Declaw*:\n${link}`
      );
      return;
    }
    await sendMessage(
      token,
      chatId,
      "Укажите имя и тикер, например: `Pumpch PUMP` или `/deploy Pumpch PUMP`."
    );
    return;
  }

  // /create Name TICKER or "Name TICKER"
  const raw = text.startsWith("/create ") ? text.slice(8).trim() : text;
  const parts = raw.split(/\s+/).filter(Boolean);
  const last = parts[parts.length - 1] ?? "";
  const isTicker = /^[A-Za-z0-9]{2,10}$/.test(last) && parts.length >= 2;

  if (isTicker) {
    const ticker = last;
    const name = parts.slice(0, -1).join(" ").trim();
    if (!name) {
      await sendMessage(
        token,
        chatId,
        "Укажите имя и тикер, например: `/create Pumpch PUMP` или `Pumpch PUMP`"
      );
      return;
    }
    const link = buildDeclawLink(name, ticker);
    await sendMessage(
      token,
      chatId,
      `✅ Токен *${name}* ($${ticker.toUpperCase()})\n\nОткройте ссылку, подключите Phantom и нажмите *Declaw*:\n${link}`
    );
    return;
  }

  await sendMessage(
    token,
    chatId,
    "Используйте /start — меню команд. Деплой: `/deploy` или `/deploy Name TICKER`, либо `/create Name TICKER` / `Name TICKER` (например: Pumpch PUMP)."
  );
}

async function main(): Promise<void> {
  const token = getEnv("TELEGRAM_BOT_TOKEN");

  // Убираем webhook, чтобы получать обновления через getUpdates
  const del = await api(token, "deleteWebhook", {});
  if (del.ok) console.log("Webhook сброшен, используем long polling.");
  else console.warn("deleteWebhook:", del);

  let offset = 0;
  console.log("Бот запущен. Ждём сообщения...");

  for (;;) {
    try {
      const res = await api(token, "getUpdates", {
        offset,
        timeout: 30,
        allowed_updates: ["message"],
      });
      const data = res as { ok: boolean; result?: TelegramUpdate[] };
      if (!data.ok || !Array.isArray(data.result)) {
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      for (const update of data.result) {
        offset = update.update_id + 1;
        const msg = update.message;
        if (!msg?.text) continue;
        const chatId = msg.chat.id;
        const text = msg.text.trim();
        console.log("->", chatId, text);
        try {
          await handleMessage(token, chatId, text);
        } catch (e) {
          console.error("handleMessage error:", e);
        }
      }
    } catch (e) {
      console.error("getUpdates error:", e);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

main();
