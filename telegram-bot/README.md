# Declaw Telegram-бот (без Supabase)

Бот работает через **long polling**: ты запускаешь скрипт на своём компьютере — он получает сообщения и отвечает. **Пока скрипт не запущен — бот молчит.**

## 1. Переменные

В корне проекта в файле `.env` добавь:

```
TELEGRAM_BOT_TOKEN=твой_токен_от_BotFather
APP_BASE_URL=https://the-pumpch-post.vercel.app
```

`APP_BASE_URL` можно не указывать.

## 2. Проверка (разовая)

Сначала сбрось webhook и проверь токен:

```bash
bun run telegram-bot:check
```

или `npx tsx telegram-bot/check.ts`. Скрипт покажет, что бот ок, и если был webhook (например на Supabase) — сбросит его. Иначе long polling не получит сообщения.

## 3. Запуск бота

**Из корня проекта:**

```bash
bun run telegram-bot
```

**Через Node (нужен tsx):**

```bash
npx tsx telegram-bot/run.ts
```

В консоли должно появиться: `Webhook сброшен, используем long polling.` и `Бот запущен. Ждём сообщения...`. **Окно не закрывай** — пока процесс запущен, бот отвечает. Напиши боту в Telegram `/start` или `/deploy`.

## 4. Команды

- `/start` — меню (что умеет бот)
- `/deploy` — бот попросит ввести имя и тикер
- `/deploy Name TICKER` или `деплой Name TICKER` — сразу ссылка на деплой
- `/create Name TICKER` или `Name TICKER` — то же (например: `Pumpch PUMP`)

## Важно

- **Бот отвечает только пока запущен `bun run telegram-bot`.** Закрыл терминал — бот перестал отвечать.
- Если раньше вешал webhook на Supabase — один раз запусти `bun run telegram-bot:check`, потом уже `bun run telegram-bot`.
