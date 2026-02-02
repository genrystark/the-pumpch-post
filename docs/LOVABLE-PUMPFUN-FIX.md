# Lovable: как починить деплой токенов (Declaw / pumpfun-proxy)

Ошибка **"No transaction returned from PumpPortal"** появляется, потому что в Supabase крутится **старая** версия Edge Function `pumpfun-proxy`. В репозитории уже лежит исправленный код — его нужно задеплоить в Supabase.

## Вариант 1: через Supabase Dashboard (проще всего)

1. Открой **Supabase**: https://supabase.com/dashboard  
2. Выбери проект (ref из `.env`: `ovvyknjmlvyuiqfprqam`).  
3. Слева: **Edge Functions** → выбери **pumpfun-proxy**.  
4. Нажми **Edit** / **Deploy new version** (или аналог).  
5. Замени весь код функции на код из файла в репо:  
   **`supabase/functions/pumpfun-proxy/index.ts`**  
   Главное: при успешном ответе от PumpPortal читать тело как **байты** (`response.arrayBuffer()`), кодировать в base64 и возвращать `{ transaction: "<base64>" }`.  
6. Сохрани и задеплой (Deploy / Save).

После деплоя Declaw должен заработать.

---

## Вариант 2: через Lovable чат

1. Открой проект в **Lovable** (https://lovable.dev).  
2. В чате напиши что-то вроде:  
   *«Исправь Edge Function pumpfun-proxy: API PumpPortal для trade-local возвращает сырые байты транзакции, а не JSON. Нужно читать ответ как arrayBuffer(), кодировать в base64 и возвращать клиенту объект `{ transaction: "<base64>" }`. Код функции лежит в репо в `supabase/functions/pumpfun-proxy/index.ts` — возьми оттуда и задеплой в Supabase.»*  
3. Lovable может обновить код и задеплоить функцию в твой Supabase-проект.

---

## Вариант 3: через Supabase CLI (если есть доступ к терминалу)

```bash
cd /Users/nikita/the-pumpch-post
npx supabase login
npx supabase functions deploy pumpfun-proxy --project-ref ovvyknjmlvyuiqfprqam
```

После успешного деплоя любой из способов — перезагрузи приложение и снова попробуй Declaw.
