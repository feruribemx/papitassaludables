-- ============================================================
-- PAPITAS SALUDABLES — Fase 2 (tiempo real)
-- Pega TODO esto en Supabase -> SQL Editor -> Run
-- ============================================================

-- Distribuidoras registradas (con su código provisional secuencial)
create table if not exists public.distribuidoras (
  id bigint generated always as identity primary key,
  codigo text unique not null,
  nombre text not null,
  telefono text,
  correo text,
  estado text,
  ciudad text,
  costo_base numeric not null default 39,   -- costo por bolsa (provisional)
  estatus text not null default 'provisional',
  creado timestamptz default now()
);

-- Movimientos de las distribuidoras (cada pedido que hacen)
create table if not exists public.pedidos_dist (
  id bigint generated always as identity primary key,
  codigo text not null,                     -- código de la distribuidora
  fecha date not null default current_date,
  sku text,
  sabor text,
  categoria text,
  cantidad int not null check (cantidad > 0),
  costo_unit numeric not null default 0,    -- a qué precio la compró
  precio_publico numeric not null default 50,
  creado timestamptz default now()
);

-- Seguridad (MVP para equipo interno: la app usa la anon key)
alter table public.distribuidoras enable row level security;
alter table public.pedidos_dist enable row level security;

drop policy if exists dist_ins on public.distribuidoras;
create policy dist_ins on public.distribuidoras for insert with check (true);
drop policy if exists dist_sel on public.distribuidoras;
create policy dist_sel on public.distribuidoras for select using (true);

drop policy if exists ped_ins on public.pedidos_dist;
create policy ped_ins on public.pedidos_dist for insert with check (true);
drop policy if exists ped_sel on public.pedidos_dist;
create policy ped_sel on public.pedidos_dist for select using (true);

-- Tiempo real (para el boletín y el panel de distribuidora)
alter publication supabase_realtime add table public.pedidos_dist;
alter publication supabase_realtime add table public.distribuidoras;

-- ============================================================
-- PEDIDOS DE LA TIENDA (para que lleguen al Panel de la admin)
-- ============================================================
create table if not exists public.pedidos (
  id bigint generated always as identity primary key,
  folio text unique not null,
  telefono text,
  estatus text,
  pagado boolean default false,
  fecha timestamptz,
  data jsonb not null,           -- el pedido completo (cliente, productos, totales…)
  actualizado timestamptz default now()
);

alter table public.pedidos enable row level security;

drop policy if exists pedidos_ins on public.pedidos;
create policy pedidos_ins on public.pedidos for insert with check (true);
drop policy if exists pedidos_sel on public.pedidos;
create policy pedidos_sel on public.pedidos for select using (true);
drop policy if exists pedidos_upd on public.pedidos;
create policy pedidos_upd on public.pedidos for update using (true);
drop policy if exists pedidos_del on public.pedidos;
create policy pedidos_del on public.pedidos for delete using (true);

alter publication supabase_realtime add table public.pedidos;

-- ============================================================
-- ACCESO DE DISTRIBUIDORAS (usuario y contraseña que ellas crean)
-- ============================================================
alter table public.distribuidoras add column if not exists usuario text;
alter table public.distribuidoras add column if not exists clave text;
create unique index if not exists distribuidoras_usuario_key
  on public.distribuidoras (usuario) where usuario is not null;

-- ============================================================
-- FOLIOS SECUENCIALES DE PEDIDOS (empiezan en 125: 125,126,127…)
-- ============================================================
create sequence if not exists public.folio_seq start with 125;
create or replace function public.siguiente_folio()
returns bigint language sql security definer
set search_path = public as $$
  select nextval('public.folio_seq');
$$;
grant execute on function public.siguiente_folio() to anon;
