-- Primero, eliminar todo lo existente para empezar limpio
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop policy if exists "Enable read access for all users" on profiles;
drop policy if exists "Enable insert for authenticated users only" on profiles;
drop policy if exists "Enable update for users based on id" on profiles;
drop table if exists profiles;

-- Crear la tabla profiles
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text not null,
    premium_access boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table profiles enable row level security;

-- Crear políticas básicas
create policy "Anyone can view profiles"
    on profiles for select
    using ( true );

create policy "Authenticated users can insert their own profile"
    on profiles for insert
    with check ( auth.uid() = id );

create policy "Users can update their own profile"
    on profiles for update
    using ( auth.uid() = id );

-- Dar permisos necesarios
grant usage on schema public to anon, authenticated;
grant all on profiles to anon, authenticated;

-- Crear función para manejar nuevos usuarios
create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
begin
    insert into public.profiles (id, email)
    values (new.id, new.email);
    return new;
end;
$$;

-- Crear trigger que se ejecuta después de insertar un nuevo usuario
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
