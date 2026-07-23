import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fsyqsenggdudvddekoij.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeXFzZW5nZ2R1ZHZkZGVrb2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NjMyOTEsImV4cCI6MjEwMDEzOTI5MX0.ixr0Wx2rlJiKR8ps0q4tPkE3hPQOdPwLzTQBP7yBiTA",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore if called from Server Component
          }
        },
      },
    }
  );
};
