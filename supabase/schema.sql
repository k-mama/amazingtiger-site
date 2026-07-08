-- Amazing Tiger Publishing — database schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Safe to re-run individual sections if you drop and recreate a table while iterating.

-- =========================================================================
-- Extensions
-- =========================================================================
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- =========================================================================
-- profiles
-- One row per authenticated user. Created automatically on signup via the
-- handle_new_user trigger below. role drives admin access everywhere else.
-- =========================================================================
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new Supabase Auth user is created.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Helper used by admin-only policies below. SECURITY DEFINER avoids RLS
-- recursion when a policy on `profiles` needs to check `profiles.role`.
create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

create policy "Admins can view all profiles"
  on profiles for select
  using (is_admin());

-- =========================================================================
-- faqs (locale aware)
-- =========================================================================
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  locale text not null default 'en',
  question text not null,
  answer text not null,
  category text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table faqs enable row level security;

create policy "Public can read published FAQs"
  on faqs for select
  using (status = 'published');

create policy "Admins can manage FAQs"
  on faqs for all
  using (is_admin())
  with check (is_admin());

-- =========================================================================
-- consultations (locale aware)
-- =========================================================================
create table if not exists consultations (
  id uuid primary key default gen_random_uuid(),
  locale text not null default 'en',
  name text not null,
  email text not null,
  phone text,
  project_type text,
  message text not null,
  preferred_contact text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

alter table consultations enable row level security;

create policy "Anyone can submit a consultation request"
  on consultations for insert
  with check (true);

create policy "Admins can manage consultations"
  on consultations for all
  using (is_admin())
  with check (is_admin());

-- =========================================================================
-- chat_sessions / chat_messages (locale aware)
-- First-pass policy: authenticated users own their sessions; anonymous
-- guest sessions (user_id is null) may be created and read without auth.
-- Harden this later (e.g. signed guest tokens) before enabling real traffic.
-- =========================================================================
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  guest_identifier text,
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

alter table chat_sessions enable row level security;

create policy "Users can access their own chat sessions"
  on chat_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Guests can create anonymous chat sessions"
  on chat_sessions for insert
  with check (user_id is null);

create policy "Guests can read anonymous chat sessions"
  on chat_sessions for select
  using (user_id is null);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references chat_sessions (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

alter table chat_messages enable row level security;

create policy "Messages follow session access"
  on chat_messages for all
  using (
    exists (
      select 1 from chat_sessions s
      where s.id = chat_messages.session_id
        and (s.user_id = auth.uid() or s.user_id is null)
    )
  )
  with check (
    exists (
      select 1 from chat_sessions s
      where s.id = chat_messages.session_id
        and (s.user_id = auth.uid() or s.user_id is null)
    )
  );

-- =========================================================================
-- admin_notes — internal only
-- =========================================================================
create table if not exists admin_notes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users (id) on delete set null,
  subject_type text not null,
  subject_id uuid not null,
  note text not null,
  created_at timestamptz not null default now()
);

alter table admin_notes enable row level security;

create policy "Admins can manage admin notes"
  on admin_notes for all
  using (is_admin())
  with check (is_admin());

-- =========================================================================
-- products — locale-independent core (price, category, status, media)
-- Translatable copy (title, subtitle, description) lives in
-- product_translations so one product can carry many languages.
-- This same pattern (parent table + *_translations table) is the template
-- to follow for any future content type that needs multi-language support.
-- =========================================================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  category text not null check (category in ('books', 'limited', 'objects', 'gifts')),
  price_cents integer not null,
  currency text not null default 'USD',
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  badge text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table products enable row level security;

create policy "Public can read active products"
  on products for select
  using (status = 'active');

create policy "Admins can manage products"
  on products for all
  using (is_admin())
  with check (is_admin());

create table if not exists product_translations (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  locale text not null default 'en',
  title text not null,
  subtitle text,
  description text,
  unique (product_id, locale)
);

alter table product_translations enable row level security;

create policy "Public can read translations of active products"
  on product_translations for select
  using (
    exists (select 1 from products p where p.id = product_translations.product_id and p.status = 'active')
  );

create policy "Admins can manage product translations"
  on product_translations for all
  using (is_admin())
  with check (is_admin());

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  variant_name text not null,
  sku_suffix text,
  price_cents_override integer,
  inventory_count integer not null default 0,
  sort_order integer not null default 0
);

alter table product_variants enable row level security;

create policy "Public can read variants of active products"
  on product_variants for select
  using (
    exists (select 1 from products p where p.id = product_variants.product_id and p.status = 'active')
  );

create policy "Admins can manage product variants"
  on product_variants for all
  using (is_admin())
  with check (is_admin());

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0
);

alter table product_images enable row level security;

create policy "Public can read images of active products"
  on product_images for select
  using (
    exists (select 1 from products p where p.id = product_images.product_id and p.status = 'active')
  );

create policy "Admins can manage product images"
  on product_images for all
  using (is_admin())
  with check (is_admin());

-- =========================================================================
-- carts / cart_items — authenticated users manage their own cart
-- =========================================================================
create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'converted', 'abandoned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table carts enable row level security;

create policy "Users can manage their own cart"
  on carts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references carts (id) on delete cascade,
  product_id uuid not null references products (id),
  variant_id uuid references product_variants (id),
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now()
);

alter table cart_items enable row level security;

create policy "Users can manage items in their own cart"
  on cart_items for all
  using (exists (select 1 from carts c where c.id = cart_items.cart_id and c.user_id = auth.uid()))
  with check (exists (select 1 from carts c where c.id = cart_items.cart_id and c.user_id = auth.uid()));

-- =========================================================================
-- orders / order_items — created server-side (Cloudflare Pages Function
-- with the service role key) after checkout. Regular users may only read
-- their own orders; there is intentionally no client-side insert policy.
-- =========================================================================
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'fulfilled', 'cancelled', 'refunded')),
  total_cents integer not null default 0,
  currency text not null default 'USD',
  shipping_address jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table orders enable row level security;

create policy "Users can view their own orders"
  on orders for select
  using (auth.uid() = user_id);

create policy "Admins can manage orders"
  on orders for all
  using (is_admin())
  with check (is_admin());

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  product_id uuid references products (id),
  variant_id uuid references product_variants (id),
  quantity integer not null,
  unit_price_cents integer not null,
  created_at timestamptz not null default now()
);

alter table order_items enable row level security;

create policy "Users can view items of their own orders"
  on order_items for select
  using (exists (select 1 from orders o where o.id = order_items.order_id and o.user_id = auth.uid()));

create policy "Admins can manage order items"
  on order_items for all
  using (is_admin())
  with check (is_admin());

-- =========================================================================
-- Role grants — required alongside RLS, and easy to miss.
--
-- RLS policies only filter *rows*; Postgres still requires the anon/
-- authenticated roles to hold base table-level privileges before a policy
-- ever gets evaluated. Supabase's dashboard "New Table" UI applies these
-- grants automatically, but tables created by running raw SQL in the SQL
-- Editor (like this file) do not get them for free — without this block,
-- every insert/select above fails with "permission denied for table X"
-- even though the RLS policies are otherwise correct.
-- =========================================================================
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;
alter default privileges in schema public grant select, insert, update, delete on tables to anon, authenticated;
alter default privileges in schema public grant usage, select on sequences to anon, authenticated;

-- =========================================================================
-- Promote the first admin (run manually, once):
--
--   update profiles set role = 'admin' where email = 'you@example.com';
--
-- See README.md for the full walkthrough.
-- =========================================================================
