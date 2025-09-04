-- Supabase schema
create table if not exists scans (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  sku text,
  affiliate_id uuid,
  utm jsonb,
  ip inet,
  user_agent text
);

create table if not exists affiliates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  handle text unique,
  wallet text,
  tier text default 'base'
);

create table if not exists payouts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  affiliate_id uuid references affiliates(id),
  amount_cents int,
  status text default 'pending'
);

create table if not exists links (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  source text,
  utm jsonb,
  target text
);

create table if not exists bot_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  user_id text,
  command text,
  payload jsonb
);

create table if not exists legend_board (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  order_id text,
  customer text,
  value_cents int
);

-- RLS enable
alter table scans enable row level security;
alter table affiliates enable row level security;
alter table payouts enable row level security;
alter table links enable row level security;
alter table bot_logs enable row level security;
alter table legend_board enable row level security;

-- Public insert on scans/links; restricted read
create policy p_scans_insert on scans for insert to anon using (true);
create policy p_links_insert on links for insert to anon using (true);
