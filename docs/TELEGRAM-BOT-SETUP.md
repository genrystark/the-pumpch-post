# Telegram-бот Declaw: настройка

Бот принимает команды в Telegram и выдаёт ссылку на деплой токена в веб-приложении (подключи Phantom → Declaw).

## 1. Секреты в Supabase

В Supabase Dashboard → Project Settings → Edge Functions → Secrets добавь:

| Secret | Значение |
|--------|----------|
| `TELEGRAM_BOT_TOKEN` | Токен бота от [@BotFather](https://t.me/BotFather) |
| `APP_BASE_URL` | URL приложения, например `https://your-app.vercel.app` или Lovable URL |

## 2. Деплой Edge Function

```bash
cd /path/to/the-pumpch-post
npx supabase login
npx supabase functions deploy declaw-telegram-bot --project-ref ovvyknjmlvyuiqfprqam
```

После деплоя функция будет доступна по адресу:
`https://ovvyknjmlvyuiqfprqam.supabase.co/functions/v1/declaw-telegram-bot`

## 3. Установка webhook в Telegram

Отправь запрос (подставь свой токен и URL проекта):

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://ovvyknjmlvyuiqfprqam.supabase.co/functions/v1/declaw-telegram-bot"}'
```

Или в браузере (замени `YOUR_BOT_TOKEN`):
```
https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://ovvyknjmlvyuiqfprqam.supabase.co/functions/v1/declaw-telegram-bot
```

В ответ должно прийти `{"ok":true}`.

## 4. Использование бота

- **/start** — приветствие и подсказки
- **/create Название TICKER** — создать токен (пример: `/create Pumpch PUMP`)
- **Название TICKER** — то же без команды (пример: `Pumpch PUMP`)

Бот пришлёт ссылку на приложение с подставленными name и ticker. Пользователь открывает ссылку, подключает Phantom и нажимает Declaw.
