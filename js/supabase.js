// Paste your own values from Supabase: Project Settings > API.
// Only the anon public key goes here. Never use the service_role key.
const SUPABASE_URL = "http://localhost:3000";
const SUPABASE_ANON_KEY = "https://lzsgyygicnyjhwdjilav.supabase.co/rest/v1/";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s ?? "";
  return d.innerHTML;
}
