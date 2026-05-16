-- NovaPay GitHub Pages + Supabase setup.
-- Run this in Supabase SQL Editor after payment_promises and collection_audit_events exist.

create extension if not exists pgcrypto;

drop function if exists public.complete_novapay_session(uuid, text, text, text);
drop function if exists public.get_novapay_session(uuid, text);
drop function if exists public.create_novapay_session(integer, integer, integer, bigint, text, text, text, numeric, text);

create table if not exists public.novapay_sessions (
  session_id uuid primary key default gen_random_uuid(),
  session_token text not null default encode(gen_random_bytes(24), 'hex'),
  customer_id integer not null references public.customers(customer_id),
  credit_card_id integer references public.credit_cards(credit_card_id),
  bill_id integer references public.credit_card_billing(bill_id),
  promise_id bigint references public.payment_promises(promise_id),
  phone_number text,
  card_last4 text,
  customer_email text,
  amount numeric not null,
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'failed', 'expired')),
  confirmation_code text,
  paid_card_last4 text,
  created_at timestamptz default now(),
  completed_at timestamptz
);

alter table public.novapay_sessions enable row level security;

create or replace function public.create_novapay_session(
  p_customer_id integer,
  p_credit_card_id integer,
  p_bill_id integer,
  p_promise_id bigint,
  p_phone_number text,
  p_card_last4 text,
  p_customer_email text,
  p_amount numeric,
  p_payment_page_url text
)
returns table (
  session_id uuid,
  session_token text,
  payment_url text
)
as $function$
declare
  v_session public.novapay_sessions;
begin
  if p_amount is null or p_amount <= 0 then
    raise exception 'amount must be greater than zero';
  end if;

  insert into public.novapay_sessions (
    customer_id,
    credit_card_id,
    bill_id,
    promise_id,
    phone_number,
    card_last4,
    customer_email,
    amount
  ) values (
    p_customer_id,
    p_credit_card_id,
    p_bill_id,
    p_promise_id,
    p_phone_number,
    p_card_last4,
    p_customer_email,
    p_amount
  )
  returning * into v_session;

  return query select
    v_session.session_id,
    v_session.session_token,
    concat(
      rtrim(p_payment_page_url, '/'),
      '?sessionId=',
      v_session.session_id::text,
      '&token=',
      v_session.session_token
    );
end;
$function$
language plpgsql
security definer
set search_path = public;

create or replace function public.get_novapay_session(
  p_session_id uuid,
  p_session_token text
)
returns table (
  session_id uuid,
  amount numeric,
  status text,
  customer_email text,
  card_last4 text,
  confirmation_code text
)
as $function$
begin
  return query
  select
    ns.session_id,
    ns.amount,
    ns.status,
    ns.customer_email,
    ns.card_last4,
    ns.confirmation_code
  from public.novapay_sessions ns
  where ns.session_id = p_session_id
    and ns.session_token = p_session_token;
end;
$function$
language plpgsql
security definer
set search_path = public;

create or replace function public.complete_novapay_session(
  p_session_id uuid,
  p_session_token text,
  p_paid_card_last4 text,
  p_confirmation_code text
)
returns table (
  session_id uuid,
  amount numeric,
  status text,
  paid_card_last4 text,
  confirmation_code text
)
as $function$
declare
  v_session public.novapay_sessions;
begin
  select *
  into v_session
  from public.novapay_sessions
  where novapay_sessions.session_id = p_session_id
    and novapay_sessions.session_token = p_session_token
  for update;

  if not found then
    raise exception 'payment session not found';
  end if;

  if v_session.status = 'completed' then
    return query select
      v_session.session_id,
      v_session.amount,
      v_session.status,
      v_session.paid_card_last4,
      v_session.confirmation_code;
    return;
  end if;

  update public.novapay_sessions
  set
    status = 'completed',
    paid_card_last4 = right(coalesce(p_paid_card_last4, ''), 4),
    confirmation_code = p_confirmation_code,
    completed_at = now()
  where novapay_sessions.session_id = p_session_id
  returning * into v_session;

  if v_session.promise_id is not null then
    update public.payment_promises
    set
      status = 'Kept',
      updated_at = now()
    where payment_promises.promise_id = v_session.promise_id;
  end if;

  if v_session.bill_id is not null then
    update public.credit_card_billing
    set status = 'Paid'
    where credit_card_billing.bill_id = v_session.bill_id;
  end if;

  insert into public.collection_audit_events (
    customer_id,
    credit_card_id,
    bill_id,
    promise_id,
    phone_number,
    card_last4,
    event_type,
    event_detail,
    performed_by,
    call_recording_url
  ) values (
    v_session.customer_id,
    v_session.credit_card_id,
    v_session.bill_id,
    v_session.promise_id,
    v_session.phone_number,
    coalesce(v_session.paid_card_last4, v_session.card_last4),
    'Payment Completed',
    concat('NovaPay payment completed for ', v_session.amount::text, '. Confirmation code: ', v_session.confirmation_code, '.'),
    'NovaPay',
    null
  );

  return query select
    v_session.session_id,
    v_session.amount,
    v_session.status,
    v_session.paid_card_last4,
    v_session.confirmation_code;
end;
$function$
language plpgsql
security definer
set search_path = public;

grant execute on function public.create_novapay_session(integer, integer, integer, bigint, text, text, text, numeric, text) to anon, authenticated;
grant execute on function public.get_novapay_session(uuid, text) to anon, authenticated;
grant execute on function public.complete_novapay_session(uuid, text, text, text) to anon, authenticated;
