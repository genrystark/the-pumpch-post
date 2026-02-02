# Lovable: How to fix token deploy (Declaw / pumpfun-proxy)

The **"No transaction returned from PumpPortal"** error happens because Supabase is running the **old** version of the `pumpfun-proxy` Edge Function. The repo already has the fixed code — you need to deploy it to Supabase.

## Option 1: Via Supabase Dashboard (easiest)

1. Open **Supabase**: https://supabase.com/dashboard  
2. Select your project (ref from `.env`: `ovvyknjmlvyuiqfprqam`).  
3. Left sidebar: **Edge Functions** → select **pumpfun-proxy**.  
4. Click **Edit** / **Deploy new version** (or equivalent).  
5. Replace the function code with the code from the repo file:  
   **`supabase/functions/pumpfun-proxy/index.ts`**  
   Main change: on success, read the PumpPortal response body as **bytes** (`response.arrayBuffer()`), encode to base64, and return `{ transaction: "<base64>" }`.  
6. Save and deploy (Deploy / Save).

After deploy, Declaw should work.

---

## Option 2: Via Lovable chat

1. Open your project in **Lovable** (https://lovable.dev).  
2. In chat, write something like:  
   *"Fix the pumpfun-proxy Edge Function: PumpPortal trade-local API returns raw transaction bytes, not JSON. Read the response with arrayBuffer(), encode to base64 and return to the client `{ transaction: '<base64>' }`. The function code is in the repo at `supabase/functions/pumpfun-proxy/index.ts` — use it and deploy to Supabase."*  
3. Lovable may update the code and deploy the function to your Supabase project.

---

## Option 3: Via Supabase CLI (if you have terminal access)

```bash
cd /Users/nikita/the-pumpch-post
npx supabase login
npx supabase functions deploy pumpfun-proxy --project-ref ovvyknjmlvyuiqfprqam
```

After a successful deploy with any option — reload the app and try Declaw again.
