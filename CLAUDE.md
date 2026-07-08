# CLAUDE.md — Amazing Tiger Publishing Master Guide

> Purpose: This repository is the official website and learning platform for Amazing Tiger Publishing.
> When the user asks to build, update, or extend the site, Claude Code must follow this guide before writing code.

---

## 0. Current Project Context

### GitHub

- Account: `k-mama`
- Repository: `k-mama/amazingtiger-site`
- Repository URL: `https://github.com/k-mama/amazingtiger-site`
- Repository name: `amazingtiger-site`
- Description: `Official website for Amazing Tiger Publishing.`
- Visibility: Public

### Cloudflare Pages

- Project: `amazingtiger-site`
- Default domain: `amazingtiger-site.pages.dev`
- Production branch: `main`
- Framework preset: `Next.js Static HTML Export`
- Build command: `npx next build`
- Build output directory: `out`
- Automatic deployments: Enabled

### Supabase

- Organization: `Amazing Tiger`
- Project: `amazingtiger`
- Plan: Free
- Status: Healthy
- Region: South Asia Mumbai
- GitHub linked repo: `k-mama/amazingtiger-site`

---

## 1. Product Direction

This is not a simple publishing website.

Build it as a premium global publishing house and luxury commerce ready learning web app.

Amazing Tiger Publishing is a quiet global literary house inside the Emma Kwon and EMMAESTRO universe.

It must feel like a North America facing luxury publishing brand.

Primary audience:

- North American VVIP readers
- Literary memoir readers
- Premium gift buyers
- Collectors
- Global English readers
- People sensitive to refined books, music, art, memoir, and intelligent creation

This site should eventually support:

- Premium homepage
- Multilingual structure
- Membership signup
- Login
- Member dashboard
- Admin dashboard
- FAQ and Q&A management
- Consultation request form
- Consultation chatbot
- Email automation
- AI assisted reply drafts
- Luxury shopping page
- Product catalogue for books and selected goods
- Future order management
- Author and publishing project management

---

## 2. Language and International Expansion Direction

Primary market: North America  
Default language: English

The root route `/` must show the English homepage directly.

Do not make `/` a language selection page.

### Launch and Expansion Locale Strategy

English is the canonical primary experience for launch.

Korean, Spanish, Japanese, and Hindi must be prepared from the beginning as expansion languages, even if some pages begin with polished placeholder copy.

Active launch locale structure:

```text
/        → English primary homepage
/en      → English mirror route
/ko      → Korean
/es      → Spanish
/ja      → Japanese
/hi      → Hindi
```

Future expansion locales should be easy to add without changing the app architecture:

```text
zh-TW    → Traditional Chinese
fr       → French
de       → German
pt-BR    → Brazilian Portuguese
ar       → Arabic, RTL support later
```

Rules:

- `/` and `/en` show English.
- English is the canonical primary version for North American VVIP readers.
- `/ko`, `/es`, `/ja`, and `/hi` must use the same route architecture as English.
- Do not build English only components that later require rewriting.
- Do not hardcode translatable UI copy inside components.
- Use dictionaries or content modules for all visible UI copy.
- Future languages must be added by editing locale config and dictionary files, not by changing every component.

### Required i18n Architecture

Use a lightweight TypeScript dictionary system first. Do not install a heavy i18n library in the first pass.

Required i18n files:

```text
lib/i18n/config.ts
lib/i18n/types.ts
lib/i18n/routing.ts
lib/i18n/getDictionary.ts
lib/i18n/dictionaries/en.ts
lib/i18n/dictionaries/ko.ts
lib/i18n/dictionaries/es.ts
lib/i18n/dictionaries/ja.ts
lib/i18n/dictionaries/hi.ts
```

`lib/i18n/config.ts` must define:

```ts
export const defaultLocale = "en";
export const activeLocales = ["en", "ko", "es", "ja", "hi"] as const;
export const futureLocales = ["zh-TW", "fr", "de", "pt-BR", "ar"] as const;
```

The app must use `generateStaticParams` for active locale routes so static export can generate all locale pages at build time.

Do not rely on middleware because the project must remain compatible with static export.

### Required Route Strategy

Use locale based routes for every major page:

```text
app/page.tsx                         → English primary homepage
app/[locale]/layout.tsx
app/[locale]/page.tsx
app/[locale]/login/page.tsx
app/[locale]/signup/page.tsx
app/[locale]/dashboard/page.tsx
app/[locale]/admin/page.tsx
app/[locale]/faq/page.tsx
app/[locale]/consultation/page.tsx
app/[locale]/shop/page.tsx
```

If a page exists in English, it must have a locale ready route.

### Language Switcher

Create a small, refined, subtle language switcher.

Initial display:

```text
EN
KR
ES
JP
HI
```

Rules:

- Preserve the current page when possible.
- Example: `/en/shop` → `/ko/shop`, `/es/shop`, `/ja/shop`, `/hi/shop`.
- Do not make language switching the main visual focus.
- Use native labels where appropriate in later phases.

### Copy Priority

- Write the strongest copy in English first.
- Korean copy should feel natural, calm, literary, and elegant.
- Spanish copy should feel refined and global, not casual marketplace copy.
- Japanese copy should feel quiet, restrained, and literary.
- Hindi copy should be dignified, clear, and premium.
- No language should feel like direct machine translation.

### Multilingual SEO Direction

Prepare language aware metadata from the beginning:

- Locale specific title.
- Locale specific description.
- Canonical English launch version.
- Hreflang ready structure where possible within static export constraints.
- Future sitemap structure should support every active locale.

---

## 3. Technical Architecture

Frontend must remain compatible with Cloudflare Pages static export.

Use:

- Next.js
- TypeScript
- App Router
- Static export
- Supabase client structure
- Supabase Auth
- Supabase RLS
- Cloudflare Pages Functions
- Modular file structure
- Lightweight CSS based interactions

Required `next.config.js`:

```js
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Do not use:

- Vercel
- Next API routes
- Server actions
- SSR
- Dynamic server rendering
- Database password in code
- Supabase service role key in browser code
- `.env.local` committed to GitHub
- Heavy animation libraries
- Generic ecommerce templates
- Cheap template UI

Important first pass rule:

- The first code pass must build successfully even without real Supabase keys.
- Use environment variable placeholders.
- Do not ask for real Supabase keys yet.
- Do not ask for the database password.
- Do not expose secrets.
- Do not commit `.env.local`.

---

## 4. Required Project Structure

Create and maintain this structure:

```text
package.json
next.config.js
app/layout.tsx
app/page.tsx
app/globals.css
app/[locale]/layout.tsx
app/[locale]/page.tsx
app/[locale]/login/page.tsx
app/[locale]/signup/page.tsx
app/[locale]/dashboard/page.tsx
app/[locale]/admin/page.tsx
app/[locale]/faq/page.tsx
app/[locale]/consultation/page.tsx
app/[locale]/shop/page.tsx
components/
components/Header.tsx
components/Footer.tsx
components/LanguageSwitcher.tsx
components/ProductCard.tsx
components/ShopPreview.tsx
components/AuthForm.tsx
components/ConsultationForm.tsx
components/ChatPreview.tsx
lib/supabaseClient.ts
lib/types.ts
lib/i18n/config.ts
lib/i18n/types.ts
lib/i18n/routing.ts
lib/i18n/getDictionary.ts
lib/i18n/dictionaries/en.ts
lib/i18n/dictionaries/ko.ts
lib/i18n/dictionaries/es.ts
lib/i18n/dictionaries/ja.ts
lib/i18n/dictionaries/hi.ts
content/
content/products/
content/faqs/
content/pages/
functions/api/consultation.ts
functions/api/chat.ts
functions/api/create-checkout.ts
supabase/schema.sql
.env.example
README.md
public/
```

Repository composition rules:

- `app/` contains routes only.
- `components/` contains reusable UI.
- `lib/i18n/` owns all locale config, route helpers, and dictionaries.
- `content/` holds static editorial data that may later move to Supabase.
- `supabase/schema.sql` is the source of truth for database planning.
- `functions/api/` contains Cloudflare Pages Functions only.
- Do not mix translated copy inside business logic.
- Do not duplicate product identity data per language. Use translation layers.

`.env.example` must include:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
TURNSTILE_SECRET_KEY=
AI_API_KEY=
PAYMENT_SECRET_KEY=
```

Security rule:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` may be used in browser code.
- `SUPABASE_SERVICE_ROLE_KEY` must only be used inside Cloudflare Pages Functions.
- Never import the service role key into client components.
- Never hardcode secrets.

---

## 5. Brand System

The site must feel like:

- Quiet luxury
- Literary
- Cinematic
- Museum like
- Apple clean
- Warm
- Spacious
- Emotionally intelligent
- Global premium

Avoid:

- Tiger illustrations
- Orange tiger patterns
- Generic gradients
- Cheap stock image feeling
- Flashy effects
- Bouncing animation
- Too many CTAs
- Template look
- Typical marketplace feeling
- Discount heavy commerce language
- Loud personal brand energy
- Startup style slogans

Visual system:

- Warm ivory
- Deep ink black
- Soft champagne gold
- Muted bronze
- Very light stone gray
- One restrained accent color

Gold must be minimal. Luxury does not need to shout.

Typography:

- Elegant serif for large headings.
- Clean sans serif for body.
- Spacious English rhythm.
- No cheap display fonts.

Copy rules:

- Premium English copy first.
- No hype.
- No aggressive sales language.
- No discount language.
- Avoid hyphenated prose unless technically necessary.
- Korean copy must be calm, elegant, literary, and human.

Hero copy direction:

```text
This is not a store.
This is an entrance.
```

Core meaning:

Amazing Tiger Publishing is a refined entrance into Emma Kwon’s publishing universe: books, memoirs, music, AI assisted creation, rare voices, and selected objects.

---

## 6. Homepage Structure

The homepage should be a premium one page entrance with room for expansion.

Required sections:

1. Hero
2. Philosophy
3. Featured Works
4. Publishing House
5. Founder
6. Studio Notes
7. Shop Preview
8. Membership Invitation
9. Consultation Invitation

First impression rule:

- Do not over explain.
- Open the world with one strong sentence.
- Make the visitor feel they entered a quiet literary house, not a template homepage.

---

## 7. Luxury Shop Direction

Create a refined Shop page.

It must not look like a normal cheap ecommerce page.

It should feel like:

- Private catalogue
- Luxury museum shop
- Literary salon
- Collector page

The shop should be able to sell:

- Books
- Memoirs
- Limited editions
- Hardcover editions
- Paperback editions
- Art prints
- Stationery
- Writing objects
- Music related goods
- Gift sets
- Digital downloads later
- Membership access later

For the first pass:

- Create a polished static product catalogue UI.
- Create product cards.
- Create product category filter UI.
- Create product detail ready visual structure.
- Create cart ready UI placeholder.
- Create checkout button placeholder.
- Do not implement real payment yet.
- Do not process payments yet.
- Do not store real orders yet.

Shop copy direction:

A private catalogue of books, objects, and quiet artifacts from the Amazing Tiger universe.

Not merch.  
Not souvenirs.  
Objects with memory, voice, and literary gravity.

Required shop sections:

1. Shop Hero
2. Featured Books
3. Limited Editions
4. Objects and Goods
5. Gift Sets
6. Coming Soon
7. Private Inquiry

---

## 8. Membership Direction

Membership must feel like access, not a cheap signup.

Use language like:

- Private reading room
- Collector notes
- Selected releases
- Studio letters
- Early access to limited objects

Signup and login pages should be beautiful, calm, and premium even if they are not fully connected yet.

---

## 9. Database Direction

Create `supabase/schema.sql`.

It should include these tables:

- profiles
- faqs
- consultations
- chat_sessions
- chat_messages
- admin_notes
- products
- product_translations
- product_variants
- product_images
- carts
- cart_items
- orders
- order_items

All tables must have RLS enabled.

Starter policy direction:

- Users can read and update their own profile.
- Public users can read published FAQs.
- Public users can read active products.
- Public users can insert consultation requests.
- Authenticated users can manage their own cart.
- Authenticated users can read their own orders.
- Admins can manage FAQs.
- Admins can manage products.
- Admins can manage consultations.
- Admins can manage orders.
- Chat messages belong to their session or authenticated user.
- Admin notes are admin only.

Admin role:

- Use `profiles.role` with values `member` and `admin`.
- Do not hardcode an admin email in the UI.
- Document in README how to manually promote the first admin in Supabase SQL Editor.

Multilingual database rule:

- Keep stable business entities separate from translated copy.
- Products should store identity level data such as SKU, status, price, inventory, and category in `products`.
- Product language copy must live in `product_translations`.
- FAQ identity and ordering can live in `faqs`; language copy must support `locale` or `faq_translations`.
- Consultations must include `locale` so the admin can filter by language.
- Chat sessions and chat messages must include `locale`.
- Orders should not be duplicated by language. Only customer facing product snapshots may store locale specific names at checkout later.
- Recommended active locale values: `en`, `ko`, `es`, `ja`, `hi`.
- Future locale values: `zh-TW`, `fr`, `de`, `pt-BR`, `ar`.

---

## 10. Cloudflare Pages Functions

Use Cloudflare Pages Functions for secure server side actions.

Required skeletons:

```text
functions/api/consultation.ts
functions/api/chat.ts
functions/api/create-checkout.ts
```

First pass behavior:

- `consultation.ts` can validate request shape and return a placeholder response.
- `chat.ts` can return a placeholder chatbot response.
- `create-checkout.ts` can return a placeholder checkout response.
- Do not process payments yet.
- Do not call real AI yet.
- Do not send real email yet unless explicitly asked in a later phase.

Later functions may use:

- Supabase service role key
- Resend API key
- Turnstile secret key
- AI API key
- Payment secret key

Never expose these keys to the browser.

---

## 11. Admin Dashboard Direction

Create a protected looking admin dashboard placeholder.

Required placeholder sections:

- Overview
- Members
- FAQ by language
- Consultations by language
- Products
- Orders
- Translation queue
- AI reply drafts
- Chat sessions
- Studio notes

Do not rely on a simple hidden password page for the final system.

The final direction is:

- Supabase Auth
- `profiles.role = 'admin'`
- RLS protected admin access
- Admin tools inside the app

---

## 12. Consultation and Chatbot Direction

Consultation system future flow:

```text
Visitor submits consultation form
→ Cloudflare Pages Function validates data
→ Turnstile spam check
→ Supabase saves consultation
→ Resend sends admin notification
→ Resend sends applicant confirmation email
→ AI creates internal reply draft
→ Admin reviews and sends
```

Important:

- AI must not automatically send business replies without admin approval.
- First AI feature should be summary and reply draft only.
- Human review must stay in the loop.

Chatbot future flow:

```text
Visitor asks a question
→ Cloudflare Pages Function receives message
→ AI generates answer from approved FAQ and brand knowledge
→ Chat session and messages are saved
→ Admin can review conversations
```

First pass:

- Create chatbot UI or placeholder.
- Do not call real AI yet.
- Do not save messages yet unless the user explicitly asks for the integration phase.

---

## 13. Development Phases

### Phase 1: Foundation

Goal: Create the first working Cloudflare compatible Next.js app.

Deliver:

- Premium homepage
- Multilingual route structure
- English default
- Korean, Spanish, Japanese, and Hindi routes ready
- Easy future expansion to Traditional Chinese, French, German, Brazilian Portuguese, and Arabic
- Luxury shop page UI
- Signup/login UI
- Dashboard placeholders
- Admin placeholder
- FAQ page UI
- Consultation page UI
- Function skeletons
- `schema.sql`
- `.env.example`
- Successful build

Build must pass:

```bash
npm install
npx next build
```

Output must be:

```text
out
```

Commit message:

```text
Initial luxury commerce ready Amazing Tiger app
```

Push to:

```text
main
```

### Phase 2: Supabase Schema

Goal: Run `supabase/schema.sql` in Supabase SQL Editor and confirm RLS.

Do not ask for database password.  
Use only safe project API values when needed.

### Phase 3: Auth

Goal: Connect Supabase Auth.

Features:

- Signup
- Login
- Logout
- Member profile
- Protected dashboard behavior
- First admin promotion guide

### Phase 4: FAQ and Q&A

Goal: Connect FAQ data to Supabase.

Features:

- Published FAQ list
- Locale aware FAQ
- Admin FAQ management
- Q&A ready structure

### Phase 5: Consultation Automation

Goal: Make consultation form real.

Features:

- Turnstile
- Supabase insert
- Resend admin notification
- Applicant confirmation email
- Admin consultation list

### Phase 6: Luxury Commerce

Goal: Make shop data driven.

Features:

- Products
- Product translations
- Product variants
- Cart
- Order placeholder
- Payment integration planning

### Phase 7: Chatbot and AI Drafts

Goal: Add safe AI features.

Features:

- FAQ assisted chatbot
- Chat session storage
- Internal summary
- AI reply draft
- Admin approval workflow

---

## 14. Build and Deployment Rules

Cloudflare Pages settings must remain:

```text
Framework preset: Next.js Static HTML Export
Build command: npx next build
Build output directory: out
Production branch: main
```

Do not switch to Vercel.

Do not add server only Next.js features that break static export.

Before pushing:

```bash
npm install
npx next build
```

Fix all build errors before commit.

After pushing:

- Tell the user to check Cloudflare Pages deployment status.
- Tell the user to open `amazingtiger-site.pages.dev`.
- Tell the user what exact success or error message to look for.

---

## 15. Security Rules

Absolute rules:

- Never commit `.env.local`.
- Never hardcode API keys.
- Never put the database password in code.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client components.
- Never build admin access with only a visible password field as final security.
- Always use RLS for user owned data.
- Always separate public anon key and server only service role key.
- Do not implement payment processing until explicitly asked.
- Do not automatically send AI written business replies to users.

Security checklist:

- AuthN and AuthZ separation
- Least privilege
- RLS enabled
- CORS awareness
- CSRF awareness
- XSS prevention
- SQL injection prevention
- HTTPS
- Rate limit plan
- Secret management
- Audit trail planning

---

## 16. Design Quality Rules

Do not create a generic landing page.

Every page must feel like part of one high end literary house.

Required interaction style:

- Slow fade
- Soft reveal
- Refined hover states
- Quiet transitions
- No bouncing
- No loud motion
- No generic startup gradient

Buttons:

- Must have hover state.
- Must have focus state.
- Must have active state.
- Must have disabled state where applicable.
- Must feel premium, not app template default.

Cards:

- Avoid generic `shadow-md` feeling.
- Use subtle borders, spacing, warm backgrounds, and restrained depth.

Color:

- Do not use Tailwind default blue or indigo as primary brand color.
- Use a custom brand palette.

---

## 17. Working Style

When the user asks to continue:

1. Inspect the current repository state.
2. Explain only the next necessary step.
3. Ask at most one essential question.
4. Prefer progress over long lectures.
5. Do not repeat already known setup.
6. Keep technical guidance screen based and practical.
7. Preserve the long term teaching value of the workflow.

The user wants reusable systems, not one click shortcuts.

Build in a way that can later be reused for:

- DUFERI cosmetics website
- Author websites
- Publishing project websites
- Premium product catalogues
- Consultation automation systems
- Multilingual brand sites

---

## 18. First Task Instruction

If the repository still only has `README.md` and `.gitignore`, start with Phase 1 Foundation.

Create the full initial codebase, run build, commit, and push.

Do not wait for another long interview because the core direction is already defined in this file.

First commit message:

```text
Initial luxury commerce ready Amazing Tiger app
```
