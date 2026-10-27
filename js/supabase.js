const SUPABASE_URL = "https://lzsgyygicnyjhwdjilav.supabase.co":
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6c2d5eWdpY255amh3ZGppbGF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNTI0MDEsImV4cCI6MjEwNjcyODQwMX0.cAGsirKMNchf6uIV93ROZ5WaYR7xmoitf1AUbHMMZlw"
drop policy if exists "admin reads all" on bookings;
drop policy if exists "admin updates" on bookings;

create policy "admin reads all" on bookings for select to authenticated
  using ((auth.jwt() ->> 'email') = 'wofdmi.hq@gmail.com');
create policy "admin updates" on bookings for update to authenticated
  using ((auth.jwt() ->> 'email') = 'wofdmi.hq@gmail.com');