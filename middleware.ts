import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the user has the active authentication session token
  const hasToken = request.cookies.has("trabowl_admin_token");

  // Protect all /admin routes, but let the login page and auth API bypass the check
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!hasToken) {
      // Redirect unauthenticated visitors straight to the login interface
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent logged-in admins from bouncing back into the login screen
  if (pathname.startsWith("/admin/login") && hasToken) {
    const dashboardUrl = new URL("/admin/portfolio", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Target specific route matches to ensure middleware stays lightweight and efficient
export const config = {
  matcher: ["/admin/:path*"],
};