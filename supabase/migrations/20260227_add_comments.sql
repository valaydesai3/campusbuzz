-- Day 6: Comments table
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)

-- 1. Create the comments table
create table public.comments (
  id         uuid        default gen_random_uuid() primary key,
  post_id    uuid        not null references public.posts(id) on delete cascade,
  user_id    uuid        not null references public.profiles(id) on delete cascade,
  content    text        not null check (char_length(content) between 1 and 500),
  created_at timestamptz default now()
);

-- 2. Index for fast lookup by post
create index comments_post_id_idx on public.comments(post_id);

-- 3. Enable RLS
alter table public.comments enable row level security;

-- 4. RLS Policies
-- Everyone (including anon) can read comments
create policy "Comments are publicly readable"
  on public.comments
  for select
  using (true);

-- Only the comment author can insert (user_id must match the JWT)
create policy "Authenticated users can add comments"
  on public.comments
  for insert
  with check (auth.uid() = user_id);

-- Only the comment author can delete their own comment
create policy "Users can delete their own comments"
  on public.comments
  for delete
  using (auth.uid() = user_id);
