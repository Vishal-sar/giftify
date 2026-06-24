create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  slug text not null unique,
  name text not null,
  description text not null,
  category text not null,
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2),
  image_url text not null,
  gallery jsonb not null default '[]'::jsonb,
  views_360 jsonb not null default '[]'::jsonb,
  custom_fields jsonb not null default '{}'::jsonb,
  rating numeric(2, 1) not null default 0 check (rating >= 0 and rating <= 5),
  review_count integer not null default 0 check (review_count >= 0),
  badge text,
  is_featured boolean not null default false,
  is_best_seller boolean not null default false,
  in_stock boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (is_featured);
create index if not exists products_best_seller_idx on public.products (is_best_seller);

alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products
  for select
  using (true);

create policy "Authenticated users can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  full_name text not null,
  email text unique not null,
  phone text,
  addresses jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  order_number text not null unique,
  customer_id uuid references public.customers (id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  status text not null default 'Pending' check (status in ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
  payment_status text not null default 'Unpaid' check (payment_status in ('Unpaid', 'Paid', 'Refunded')),
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  shipping_cost numeric(10, 2) not null default 0 check (shipping_cost >= 0),
  total numeric(10, 2) not null check (total >= 0),
  items jsonb not null default '[]'::jsonb,
  shipping_address jsonb not null default '{}'::jsonb,
  tracking_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text,
  body text not null,
  status text not null default 'Pending' check (status in ('Pending', 'Published', 'Hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  file_name text not null,
  file_path text not null,
  file_type text,
  storage_bucket text not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;
alter table public.uploads enable row level security;

create policy "Customers readable by authenticated users"
  on public.customers
  for select
  to authenticated
  using (true);

create policy "Customers writable by authenticated users"
  on public.customers
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Orders readable by authenticated users"
  on public.orders
  for select
  to authenticated
  using (true);

create policy "Orders writable by authenticated users"
  on public.orders
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Reviews readable by everyone"
  on public.reviews
  for select
  using (true);

create policy "Reviews writable by authenticated users"
  on public.reviews
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Uploads readable by authenticated users"
  on public.uploads
  for select
  to authenticated
  using (true);

create policy "Uploads writable by authenticated users"
  on public.uploads
  for all
  to authenticated
  using (true)
  with check (true);
