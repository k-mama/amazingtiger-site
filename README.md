# Amazing Tiger Publishing

Official website for Amazing Tiger Publishing — a quiet global literary house inside the Emma Kwon and EMMAESTRO universe. Built as a database-ready, multilingual, luxury-commerce-ready learning web app, not a static brochure site.

## Dual identity

The site carries two identities under one house, and both must read as premium, restrained, and editorial — never as a template, a self-publishing service, or an AI book generator:

1. **Publishing house** — the homepage, featured works, founder, studio notes, and shop present Amazing Tiger as a small, selective literary publisher.
2. **Book Making Atelier** (`/en/atelier`, `/ko/atelier`) — a high-touch service for selected authors, founders, artists, and memoir writers who want a life, manuscript, archive, or brand story turned into a finished book (memoirs, author books, founder stories, brand books, artist books, children's books, AI-assisted creative books, multilingual editions, KDP-ready packages, author websites, launch assets, editorial design systems). Copy for this section deliberately avoids "instant," "easy," "cheap," "one-click," "AI-generated," "mass production," "discount," and "limited-time" language — the Atelier is positioned as selective and high-touch, not transactional.

**Primary market: North America. Default public language: English.** `/` and `/en` both render the English homepage — English is the first impression, not a language-selection screen.

## Stack

- **Next.js 14** (App Router), **TypeScript**, static export (`output: "export"`)
- **Supabase** for database and authentication, secured with Row Level Security
- **Cloudflare Pages** for hosting, **Cloudflare Pages Functions** for secure server-side endpoints
- Lightweight hand-rolled i18n (no i18n library) — English default, Korean live, more locales planned
- No heavy animation libraries — CSS-only fades and reveals

This app intentionally avoids Vercel-only features (Next API routes, Server Actions, SSR, dynamic rendering) so it stays deployable as a fully static site on Cloudflare Pages.

## Project structure

```
app/
  layout.tsx            Root layout — fonts, default (English) metadata, <html lang="en">
  page.tsx               Root route "/" — renders the English homepage directly
  globals.css
  [locale]/
    layout.tsx            Locale layout — generateStaticParams for en/ko, Header/Footer, per-locale metadata
    page.tsx               Homepage
    login/page.tsx
    signup/page.tsx
    dashboard/page.tsx     Member dashboard (placeholder)
    admin/page.tsx         Admin dashboard (placeholder)
    faq/page.tsx
    consultation/page.tsx
    shop/page.tsx           Luxury catalogue UI
    atelier/page.tsx        Book Making Atelier — services, who it's for, inquiry CTA
components/               Header, Footer, LanguageSwitcher, HomeContent, ProductCard, ShopPreview,
                           AtelierPreview, LoginForm, SignupForm, ConsultationForm, Reveal, LocaleHtmlLang
lib/
  supabaseClient.ts        Browser-safe Supabase client (public keys only)
  types.ts                 Shared DB row types
  i18n/
    config.ts               Supported locales, default locale
    types.ts                 Dictionary shape (all translatable UI copy)
    dictionaries/en.ts       English copy
    dictionaries/ko.ts       Korean copy
    getDictionary.ts         Locale -> dictionary lookup
functions/api/
  consultation.ts           Skeleton — will save consultation form submissions
  chat.ts                   Skeleton — will power the consultation chatbot
  create-checkout.ts        Skeleton — will create a checkout session
supabase/schema.sql        Full DB schema + RLS policies
```

## Routing and languages

- `/` and `/en` both render the English homepage — English is the primary experience for the North American launch market.
- `/ko` renders the Korean homepage.
- Every other route lives under a locale prefix: `/en/faq`, `/ko/faq`, `/en/shop`, `/ko/shop`, `/en/atelier`, `/ko/atelier`, etc.
- No middleware is used (middleware isn't compatible with static export). Locale routing is handled entirely by the `[locale]` dynamic segment plus `generateStaticParams` in `app/[locale]/layout.tsx`, which pre-renders `/en` and `/ko` at build time.
- The `<html lang>` attribute is fixed to `"en"` at build time in the root layout (it sits above `[locale]` and never receives locale params). `components/LocaleHtmlLang.tsx` corrects it client-side on `/ko` pages — a pragmatic workaround for static export without middleware.
- The small `EN / KR` switcher in the header (`components/LanguageSwitcher.tsx`) preserves the current page when switching languages (e.g. `/en/faq` → `/ko/faq`).

`lib/i18n/config.ts` splits locales into two lists:

- `activeLocales` (`en`, `ko`) — the only locales wired into `generateStaticParams`, the language switcher, and routing. This is what actually ships.
- `plannedLocales` (`es`, `ja`, `hi`, `zh-TW`, `fr`, `de`, `pt-BR`, `ar`) — reserved codes for future markets. They are not activated, not built, and have no dictionary files yet. Listing them here is just a shared checklist so the repo shape doesn't need to change later.

**Adding a new language later:**

1. Add the locale code to `activeLocales` in `lib/i18n/config.ts` (and remove it from `plannedLocales`).
2. Create `lib/i18n/dictionaries/<locale>.ts` implementing the `Dictionary` type from `lib/i18n/types.ts`.
3. Register it in `lib/i18n/getDictionary.ts`.
4. Add the locale to the `languages` map in the metadata blocks (`app/layout.tsx`, `app/[locale]/layout.tsx`) for hreflang.
5. Add locale-aware rows for that language in the Supabase content tables (`faqs`, `product_translations`, etc. — see "Multilingual content pattern" below).
6. Run `npx next build` and confirm the new locale's static routes (e.g. `/es`, `/es/shop`, `/es/faq`) appear in `out/`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values once you have them. **Never commit `.env.local`.**

```
NEXT_PUBLIC_SUPABASE_URL=            # public — safe in browser code
NEXT_PUBLIC_SUPABASE_ANON_KEY=       # public — safe in browser code
SUPABASE_SERVICE_ROLE_KEY=           # secret — Cloudflare Pages Functions ONLY
RESEND_API_KEY=                      # secret — Cloudflare Pages Functions ONLY
TURNSTILE_SECRET_KEY=                # secret — Cloudflare Pages Functions ONLY
AI_API_KEY=                          # secret — Cloudflare Pages Functions ONLY
PAYMENT_SECRET_KEY=                  # secret — Cloudflare Pages Functions ONLY
```

`lib/supabaseClient.ts` falls back to harmless placeholder values when the public env vars are unset, purely so `next build` succeeds before real keys exist (the Supabase SDK throws on an empty URL). Auth calls will simply fail at runtime until real keys are set.

**Security rule:** `SUPABASE_SERVICE_ROLE_KEY` (and every other secret above) must only ever be read inside `functions/api/*.ts`. It must never be imported into anything under `app/` or `components/`.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npx next build     # static export -> ./out
```

## Supabase setup

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Paste the entire contents of `supabase/schema.sql` and run it. This creates every table (`profiles`, `faqs`, `consultations`, `chat_sessions`, `chat_messages`, `admin_notes`, `products`, `product_translations`, `product_variants`, `product_images`, `carts`, `cart_items`, `orders`, `order_items`), enables Row Level Security on all of them, and creates a trigger that auto-creates a `profiles` row for every new signup.
3. Copy **Project URL** and **anon public key** from **Settings → API** into `.env.local` (and later into Cloudflare Pages environment variables).

### Promoting the first admin

There is no admin email hardcoded anywhere in the UI. To make yourself an admin, sign up normally through `/en/signup`, then in the Supabase SQL Editor run:

```sql
update profiles set role = 'admin' where email = 'you@example.com';
```

Any future admin can be promoted the same way, or later from the admin dashboard once that write path is built.

### Multilingual content pattern

`faqs`, `consultations`, `chat_sessions`, and `chat_messages` each carry their own `locale` column directly, since each row is inherently single-language content.

`products` uses a different, more scalable pattern: the parent `products` row holds locale-independent data (price, category, status, SKU), and `product_translations` holds one row per `(product_id, locale)` pair with the translatable copy (title, subtitle, description). **This parent + `*_translations` pattern is the template to reuse for any future content type that needs multiple languages** — e.g. a future `articles` / `article_translations` pair for Studio Notes once they move into the database.

## Cloudflare Pages

Framework preset: **Next.js (Static HTML Export)** — build command `npx next build`, output directory `out`. Once this repo is pushed:

1. Confirm the latest deployment picked up this commit (Cloudflare Pages → your project → Deployments).
2. Add the environment variables listed above under **Settings → Environment Variables** (both Production and Preview), then trigger a redeploy — a static site only picks up env vars at build time.
3. `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `AI_API_KEY`, and `PAYMENT_SECRET_KEY` are only consumed by `functions/api/*.ts` (Pages Functions), not by the static build itself — but Cloudflare needs them available at request time for those functions to work once implemented.
4. Visit the deployed `/`, `/en`, and `/ko` routes to confirm the static export renders correctly.

## What's implemented vs. placeholder (first pass)

- **Implemented:** full premium homepage (EN/KO) with Hero, Philosophy, Featured Works, Publishing House, Book Making Atelier preview, Shop preview, Founder, Studio Notes, Membership, and Consultation sections; the standalone Atelier page; luxury shop catalogue UI; FAQ page; consultation form UI (with the updated inquiry-type list: Publish with Amazing Tiger, Build My Book with Amazing Tiger Atelier, Author Website Inquiry, Shop Support, Membership Support, Other); login/signup forms wired to Supabase Auth client calls; static DB schema with RLS.
- **Placeholder (visually complete, not yet functional):** consultation and Atelier inquiries do not persist to Supabase yet (see `functions/api/consultation.ts`); chatbot is not implemented (see `functions/api/chat.ts`); shop cart/checkout do not process anything yet (see `functions/api/create-checkout.ts`, intentionally left as a `not_implemented` skeleton — no real payment, no real orders); member dashboard and admin dashboard are protected-looking static pages with no real session/role gating yet.

These are the natural next steps once real Supabase keys are supplied.
