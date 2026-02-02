# Declaw Telegram bot: setup

Бот принимает команды в Telegram и отдаёт ссылку на деплой токена в веб-приложении (подключить Phantom → Declaw).

## 1. Секреты Supabase

В Supabase Dashboard → Project Settings → Edge Functions → Secrets добавьте:

| Secret | Value |
|--------|--------|
| `TELEGRAM_BOT_TOKEN` | Токен бота от [@BotFather](https://t.me/BotFather) (например: `8518102228:AAG...`) |
| `APP_BASE_URL` | URL приложения, например `https://the-pumpch-post.vercel.app` или Lovable URL |

**Важно:** не храните токен бота в коде и не коммитьте его в репозиторий — только в Supabase Secrets (или в локальном `.env` для тестов).

## 2. Deploy Edge Function

**Важно:** Telegram при отправке обновлений на webhook **не передаёт** заголовок `Authorization`. Поэтому функцию нужно деплоить **без проверки JWT** (`--no-verify-jwt`), иначе все запросы от Telegram будут получать 401 и бот не ответит.

```bash
cd /path/to/the-pumpch-post
npx supabase login
npx supabase functions deploy declaw-telegram-bot --project-ref ovvyknjmlvyuiqfprqam --no-verify-jwt
```

После деплоя функция доступна по адресу:
`https://ovvyknjmlvyuiqfprqam.supabase.co/functions/v1/declaw-telegram-bot`

## 3. Set Telegram webhook

Send a request (replace with your token and project URL):

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://ovvyknjmlvyuiqfprqam.supabase.co/functions/v1/declaw-telegram-bot"}'
```

Or in the browser (replace `YOUR_BOT_TOKEN`):
```
https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://ovvyknjmlvyuiqfprqam.supabase.co/functions/v1/declaw-telegram-bot
```

Ответ должен быть `{"ok":true}`.

**Проверить webhook:** откройте в браузере (подставьте свой токен):
```
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo
```
В ответе должно быть `"url": "https://ovvyknjmlvyuiqfprqam.supabase.co/functions/v1/declaw-telegram-bot"`. Если `url` пустой — webhook не установлен.

## 4. Команды бота

- **/start** — меню: что умеет бот (деплой, создание токена).
- **/deploy** — деплой проекта: бот попросит ввести данные (имя и тикер).
- **/deploy Name TICKER** или **деплой Name TICKER** — деплой с данными (например: `/deploy Pumpch PUMP`).
- **/create Name TICKER** — создать токен по имени и тикеру (например: `/create Pumpch PUMP`).
- **Name TICKER** — то же без команды (например: `Pumpch PUMP`).

Бот присылает ссылку на приложение с подставленными именем и тикером. Пользователь открывает ссылку, подключает Phantom и нажимает Declaw.
