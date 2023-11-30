import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ohkczmvytuxfzhturqvj.supabase.co";

export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa2N6bXZ5dHV4ZnpodHVycXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyNjE0NDksImV4cCI6MjAxMTgzNzQ0OX0.A7QWf_Ny5gcqFsFGOcnj_tBrZTtBkb65uxJrBGIxVPA";

export const supabase = createClient(supabaseUrl, supabaseKey);
