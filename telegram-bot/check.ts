/**
 * Проверка токена и webhook для @declaw_bot.
 * Запуск: bun run telegram-bot/check.ts   или   npx tsx telegram-bot/check.ts
 *
 * Если webhook установлен — бот через long polling (run.ts) не получит сообщения.
 * Этот скрипт сбрасывает webhook и показывает статус.
 */

import fs from "node:fs";
import path from "node:path";

function loadEnv(): void {
  const candidates = [
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), "..", ".env"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf-8");
      for (const line of content.split("\n")) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (m) process.env[m[1]!] = m[2]!.replace(/^["']|["']$/g, "").trim();
      }
      return;
    }
  }
}

loadEnv();
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("В .env нет TELEGRAM_BOT_TOKEN. Добавь в корень проекта:\n  TELEGRAM_BOT_TOKEN=...");
  process.exit(1);
}

const TELEGRAM_API = "https://api.telegram.org";

async function api(method: string, body: Record<string, unknown> = {}): Promise<unknown> {
  const res = await fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function main() {
  console.log("Проверка бота...\n");

  const me = await api("getMe") as { ok: boolean; result?: { username?: string; first_name?: string } };
  if (!me.ok) {
    console.error("Токен неверный или бот недоступен:", me);
    process.exit(1);
  }
  console.log("Бот:", me.result?.username ? `@${me.result.username}` : me.result?.first_name, "\n");

  const wh = await api("getWebhookInfo") as { ok: boolean; result?: { url?: string } };
  if (wh.result?.url) {
    console.log("Сейчас webhook установлен на:", wh.result.url);
    console.log("Из-за этого long polling не получает сообщения.\n");
    const del = await api("deleteWebhook", {}) as { ok: boolean };
    if (del.ok) console.log("Webhook сброшен. Теперь запусти: bun run telegram-bot");
    else console.error("Не удалось сбросить webhook:", del);
  } else {
    console.log("Webhook не установлен — можно использовать long polling.\n");
    console.log("Запусти бота: bun run telegram-bot");
    console.log("(или: npx tsx telegram-bot/run.ts)\n");
    console.log("После запуска пиши боту в Telegram /start");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
