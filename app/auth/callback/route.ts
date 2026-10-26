import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const oauthError = requestUrl.searchParams.get("error");
  const errorDescription =
    requestUrl.searchParams.get("error_description");

  if (oauthError) {
    console.error("Google OAuth error:", oauthError, errorDescription);

    return NextResponse.redirect(
      new URL("/?error=oauth_failed", requestUrl.origin)
    );
  }

  if (!code) {
    console.error("OAuth callback: authorization code is missing");

    return NextResponse.redirect(
      new URL("/?error=oauth_callback_failed", requestUrl.origin)
    );
  }

  const response = NextResponse.redirect(
    new URL("/dashboard/gallery", requestUrl.origin)
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error(
      "OAuth session exchange failed:",
      error.message
    );

    return NextResponse.redirect(
      new URL("/?error=oauth_failed", requestUrl.origin)
    );
  }

  return response;
}