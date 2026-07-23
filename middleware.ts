import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Add the current pathname to headers so server components can read it
  supabaseResponse.headers.set('x-pathname', request.nextUrl.pathname);
  request.headers.set('x-pathname', request.nextUrl.pathname);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fsyqsenggdudvddekoij.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeXFzZW5nZ2R1ZHZkZGVrb2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NjMyOTEsImV4cCI6MjEwMDEzOTI5MX0.ixr0Wx2rlJiKR8ps0q4tPkE3hPQOdPwLzTQBP7yBiTA",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.headers.set('x-pathname', request.nextUrl.pathname);
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthRoute = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && !isAuthRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Optional: Check if user has admin role in a real production app
    // For now we just require authentication for /admin
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
