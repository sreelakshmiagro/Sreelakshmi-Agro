import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fsyqsenggdudvddekoij.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeXFzZW5nZ2R1ZHZkZGVrb2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NjMyOTEsImV4cCI6MjEwMDEzOTI5MX0.ixr0Wx2rlJiKR8ps0q4tPkE3hPQOdPwLzTQBP7yBiTA"
  );
