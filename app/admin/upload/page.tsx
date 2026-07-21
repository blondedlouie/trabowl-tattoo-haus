"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

// Safe initialization of Supabase Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only instantiate the client if both strings are valid and present
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function AdminUploadPanel() {
  const [title, setTitle] = useState<string>(" ");
  const [category, setCategory] = useState<string>("FINE LINE");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Quick structural fallback layout state if configurations are completely missing
  if (!supabase) {
    return (
      <main className="min-h-screen bg-[#FBF9F6] dark:bg-[#0B0B0B] text-neutral-900 dark:text-neutral-100 p-8 flex items-center justify-center">
        <div className="w-full max-w-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 p-6 rounded-2xl text-sm font-medium shadow-md">
          <p className="font-bold uppercase tracking-wider text-xs mb-1">
            Configuration Reference Error
          </p>
          Missing Supabase environment variables. Make sure your local{" "}
          <code className="bg-rose-500/10 px-1 py-0.5 rounded text-xs font-mono">
            .env.local
          </code>{" "}
          file is populated correctly and restart your development server.
        </div>
      </main>
    );
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile || !title.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please fill in all layout data fields and choose an image asset.",
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      // 1. Sanitize file name string and declare destination layout paths
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // 2. Upload raw binary payload to Supabase Storage Bucket
      const { error: storageError } = await supabase.storage
        .from("portfolio-gallery")
        .upload(filePath, imageFile);

      if (storageError) throw storageError;

      // 3. Resolve the public CDN asset string location
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-gallery").getPublicUrl(filePath);

      // 4. Inject structural record row parameters directly into Postgres table references
      const { error: dbError } = await supabase
        .from("portfolio_posts")
        .insert([
          { title, category, image_url: publicUrl, storage_path: filePath },
        ]);

      if (dbError) throw dbError;

      setStatusMessage({
        type: "success",
        text: "Asset successfully added to live studio portfolio gallery!",
      });
      setTitle("");
      setImageFile(null);
    } catch (error: any) {
      setStatusMessage({
        type: "error",
        text: error.message || "Processing transmission failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF9F6] dark:bg-[#0B0B0B] text-neutral-900 dark:text-neutral-100 p-8 flex items-center justify-center transition-colors">
      <div className="w-full max-w-xl bg-neutral-100 dark:bg-[#121212] p-8 rounded-3xl border border-neutral-300 dark:border-neutral-800 shadow-xl">
        <div className="mb-6">
          <span className="text-[10px] font-bold tracking-widest text-[#A47E4B] dark:text-[#C5A880] uppercase block">
            Studio Core Management
          </span>
          <h1 className="text-3xl font-serif mt-1">Upload Portfolio Work</h1>
        </div>

        {statusMessage && (
          <div
            className={`p-4 rounded-xl mb-6 text-xs font-medium border ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-5">
          {/* Work Title Input */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold block text-neutral-700 dark:text-neutral-400 mb-2">
              Tattoo Design Name / Description
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Delicate Floral Sleeve Setup"
              className="w-full px-4 py-3 text-sm rounded-xl bg-neutral-200/50 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-800 focus:outline-none focus:border-[#A47E4B] dark:focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* Category Dropdown Selection */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold block text-neutral-700 dark:text-neutral-400 mb-2">
              Dynamic Filter Tag
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl bg-neutral-200/50 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-800 focus:outline-none focus:border-[#A47E4B] dark:focus:border-[#C5A880] text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <option value="FINE LINE">FINE LINE</option>
              <option value="BLACK & GREY">BLACK & GREY</option>
              <option value="REALISM">REALISM</option>
              <option value="COLOUR">COLOUR</option>
              <option value="PIERCING">PIERCING</option>
            </select>
          </div>

          {/* Asset Binary File Input */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold block text-neutral-700 dark:text-neutral-400 mb-2">
              Media File Asset (.png, .jpg, .webp)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs text-neutral-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-neutral-300 dark:file:bg-neutral-800 file:text-neutral-800 dark:file:text-neutral-200 hover:file:opacity-80 transition-all cursor-pointer"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A47E4B] hover:bg-[#8E6A3E] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl disabled:opacity-40 shadow-md transition-all duration-300"
          >
            {loading
              ? "Processing Upload Execution..."
              : "Publish to Live Showcase"}
          </button>
        </form>
      </div>
    </main>
  );
}
