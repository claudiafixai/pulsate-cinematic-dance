
-- Fix search_path on all validation functions
alter function public.validate_dancer() set search_path = public;
alter function public.validate_judge() set search_path = public;
alter function public.validate_vendor() set search_path = public;
alter function public.validate_email_log() set search_path = public;
