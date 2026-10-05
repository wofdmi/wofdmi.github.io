// Paste your own values from Supabase: Project Settings > API.
// Only the anon public key goes here. Never use the service_role key.
const SUPABASE_URL = "YOUR_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s ?? "";
  return d.innerHTML;
}
