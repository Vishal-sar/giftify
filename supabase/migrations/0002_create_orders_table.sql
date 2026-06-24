create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
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
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_payment_status_idx on public.orders (payment_status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.orders enable row level security;

create policy "Authenticated users can read orders"
  on public.orders
  for select
  to authenticated
  using (true);

create policy "Authenticated users can insert orders"
  on public.orders
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update orders"
  on public.orders
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete orders"
  on public.orders
  for delete
  to authenticated
  using (true);
