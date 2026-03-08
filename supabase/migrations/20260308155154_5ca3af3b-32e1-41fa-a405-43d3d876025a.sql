
-- Dancers table
create table public.dancers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  age_group text,
  level text,
  group_type text,
  group_size integer,
  dance_style text,
  video_url text,
  status text default 'Submitted',
  payment_status text default 'Unpaid',
  waiver_signed boolean default false,
  workshop_pass boolean default false,
  vip_pass boolean default false,
  internal_notes text
);

-- Judges table
create table public.judges (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  bio text,
  specialty text,
  role text,
  status text default 'Invited',
  contract_signed boolean default false,
  internal_notes text
);

-- Vendors table
create table public.vendors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  organization text not null,
  contact_name text not null,
  email text not null,
  type text,
  package text,
  status text default 'Prospect',
  contract_signed boolean default false,
  internal_notes text
);

-- Email log table
create table public.email_log (
  id uuid primary key default gen_random_uuid(),
  sent_at timestamptz default now(),
  recipient_email text not null,
  recipient_type text,
  email_type text not null,
  status text,
  resend_id text
);

-- Validation triggers for dancers
create or replace function public.validate_dancer() returns trigger language plpgsql as $$
begin
  if NEW.age_group is not null and NEW.age_group not in ('Kids','Teens','Adults','Seniors') then
    raise exception 'Invalid age_group value';
  end if;
  if NEW.level is not null and NEW.level not in ('Beginner','Intermediate','Advanced','Professional') then
    raise exception 'Invalid level value';
  end if;
  if NEW.group_type is not null and NEW.group_type not in ('Solo','Duo','Group') then
    raise exception 'Invalid group_type value';
  end if;
  if NEW.status is not null and NEW.status not in ('Submitted','Under Review','Selected','Not Selected') then
    raise exception 'Invalid status value';
  end if;
  if NEW.payment_status is not null and NEW.payment_status not in ('Unpaid','Paid') then
    raise exception 'Invalid payment_status value';
  end if;
  return NEW;
end;
$$;

create trigger trg_validate_dancer before insert or update on public.dancers for each row execute function public.validate_dancer();

-- Validation triggers for judges
create or replace function public.validate_judge() returns trigger language plpgsql as $$
begin
  if NEW.role is not null and NEW.role not in ('Judge','Workshop Artist','Both') then
    raise exception 'Invalid role value';
  end if;
  if NEW.status is not null and NEW.status not in ('Invited','Confirmed','Declined') then
    raise exception 'Invalid status value';
  end if;
  return NEW;
end;
$$;

create trigger trg_validate_judge before insert or update on public.judges for each row execute function public.validate_judge();

-- Validation triggers for vendors
create or replace function public.validate_vendor() returns trigger language plpgsql as $$
begin
  if NEW.type is not null and NEW.type not in ('Production Sponsor','Creative Collaborator','Community Partner') then
    raise exception 'Invalid type value';
  end if;
  if NEW.package is not null and NEW.package not in ('Community','Gold','Custom') then
    raise exception 'Invalid package value';
  end if;
  if NEW.status is not null and NEW.status not in ('Prospect','Proposal Sent','Confirmed','Invoiced','Paid') then
    raise exception 'Invalid status value';
  end if;
  return NEW;
end;
$$;

create trigger trg_validate_vendor before insert or update on public.vendors for each row execute function public.validate_vendor();

-- Validation trigger for email_log
create or replace function public.validate_email_log() returns trigger language plpgsql as $$
begin
  if NEW.recipient_type is not null and NEW.recipient_type not in ('dancer','judge','vendor') then
    raise exception 'Invalid recipient_type value';
  end if;
  if NEW.status is not null and NEW.status not in ('sent','failed') then
    raise exception 'Invalid status value';
  end if;
  return NEW;
end;
$$;

create trigger trg_validate_email_log before insert or update on public.email_log for each row execute function public.validate_email_log();

-- Enable RLS
alter table public.dancers enable row level security;
alter table public.judges enable row level security;
alter table public.vendors enable row level security;
alter table public.email_log enable row level security;

-- RLS policies: full access for authenticated users
create policy "Authenticated full access dancers" on public.dancers for all to authenticated using (true) with check (true);
create policy "Authenticated full access judges" on public.judges for all to authenticated using (true) with check (true);
create policy "Authenticated full access vendors" on public.vendors for all to authenticated using (true) with check (true);
create policy "Authenticated full access email_log" on public.email_log for all to authenticated using (true) with check (true);
