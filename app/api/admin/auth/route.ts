import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json(
        { error: "Server authentication configuration missing." },
        { status: 500 }
      );
    }

    if (password === expectedPassword) {
      const response = NextResponse.json({ success: true });
      
      // Set an HTTP-only secure cookie that lasts 7 days
      response.cookies.set("trabowl_admin_token", "authenticated_session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, 
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid studio password credential." }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}