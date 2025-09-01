-- Lounge members table
create table if not exists public.lounge_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  tier text,
  joined_at timestamptz default now()
);

-- Lounge messages table
create table if not exists public.lounge_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  message text not null,
  created_at timestamptz default now()
);

-- Lounge reports (moderation)
create table if not exists public.lounge_reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null,
  reporter_id uuid,
  reason text,
  resolved boolean default false,
  created_at timestamptz default now()
);