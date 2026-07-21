// app/api/portfolio/delete/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { id, imageUrl } = await request.json();

    if (!id || !imageUrl) {
      return NextResponse.json(
        { error: "Missing design entry id or target media file url references." },
        { status: 400 }
      );
    }

    // Initialize the Supabase client directly using your environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Missing Supabase environment credentials on the server configuration." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Purge the media file asset out of your portfolio-gallery cloud bucket
    const urlParts = imageUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];

    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from("portfolio-gallery")
        .remove([fileName]);

      if (storageError) {
        console.error("Supabase Storage purge failed:", storageError.message);
      }
    }

    // 2. Drop the corresponding core index database entry record row completely
    const { error: dbError } = await supabase
      .from("portfolio_posts")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("Supabase Database deletion failed:", dbError.message);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, droppedId: id });
  } catch (error: any) {
    console.error("Internal API route crash:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}