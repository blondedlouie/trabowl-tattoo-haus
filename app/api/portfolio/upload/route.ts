// app/api/portfolio/upload/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null; 
    const title = formData.get("title") as string || "Untitled Artwork";
    const category = formData.get("category") as string || "FINE LINE";

    if (!file) {
      return NextResponse.json({ error: "No media file provided for upload." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // CRITICAL: We strictly look for the service role key to pass through RLS rules
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ 
        error: "Server configuration mismatch: SUPABASE_SERVICE_ROLE_KEY is missing from environment variables." 
      }, { status: 500 });
    }

    // Creates the admin-privileged client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload asset to bucket
    const { error: storageError } = await supabase.storage
      .from("portfolio-gallery")
      .upload(uniqueFileName, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false
      });

    if (storageError) {
      return NextResponse.json({ error: `Storage upload failed: ${storageError.message}` }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("portfolio-gallery")
      .getPublicUrl(uniqueFileName);

    const imageUrl = urlData.publicUrl;

   // Insert database record with elevated privileges
    const { data: dbData, error: dbError } = await supabase
      .from("portfolio_posts")
      .insert([
        {
          title,
          category,      
          image_url: imageUrl,
          storage_path: uniqueFileName, // CRITICAL FIX: Supplies the required path to satisfy the NOT NULL constraint
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: `Database insertion failed: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json(dbData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}