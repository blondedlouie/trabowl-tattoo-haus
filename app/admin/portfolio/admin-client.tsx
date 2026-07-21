"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
}

export default function AdminDashboardClient({
  initialItems = [],
}: {
  initialItems: PortfolioItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("FINE LINE");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = [
    "FINE LINE",
    "BLACK & GREY",
    "REALISM",
    "COLOUR",
    "PIERCING",
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Fallback
    }

    // Clear cookie locally as well
    document.cookie =
      "trabowl_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Use hard window navigation instead of client router to clear session cache
    window.location.href = "/admin";
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title)
      return alert(
        "Please fill in all layout fields and choose an artwork image.",
      );

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("file", file);

      const res = await fetch("/api/portfolio/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Upload handler failed with status: ${res.status}`,
        );
      }

      const newItem = await res.json();
      setItems((prev) => [newItem, ...prev]);
      setTitle("");
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement).value = "";

      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert("Error adding artwork: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (
      !confirm(
        "Are you sure you want to permanently delete this artwork from the studio database?",
      )
    )
      return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/portfolio/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, imageUrl }),
      });

      if (!res.ok) throw new Error("Deletion handler failed.");

      setItems((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert("Failed to drop artwork: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      {/* Header Banner */}
      <div className="border-b border-neutral-200 dark:border-neutral-900 pb-6 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#A47E4B] dark:text-[#C5A880] uppercase tracking-widest block mb-1">
            Internal Workspace Engine
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-neutral-900 dark:text-neutral-50">
            Studio Gallery Manager
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider text-neutral-400 hover:text-[#C5A880] border border-neutral-300 dark:border-neutral-800 rounded-xl transition hover:border-[#C5A880]/40 bg-white dark:bg-[#161616]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>SIGN OUT</span>
        </button>
      </div>

      {/* Two-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* LEFT COLUMN: Upload Controller Card */}
        <div className="bg-white dark:bg-[#121212] p-6 rounded-3xl border border-neutral-200 dark:border-neutral-900 shadow-xl lg:sticky lg:top-6">
          <h2 className="text-lg font-serif mb-6 text-neutral-900 dark:text-neutral-100">
            Publish New Artwork
          </h2>

          <form onSubmit={handleUpload} className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase mb-2 text-neutral-500">
                Design Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Geometric Mandala Sleeve"
                className="w-full text-sm p-3 rounded-xl bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#A47E4B] text-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider uppercase mb-2 text-neutral-500">
                Style Classification
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm p-3 rounded-xl bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#A47E4B] text-neutral-900 dark:text-neutral-100"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider uppercase mb-2 text-neutral-500">
                Artwork Media File
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 dark:file:bg-neutral-800 file:text-neutral-700 dark:file:text-neutral-300 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-700"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 mt-4 text-xs font-bold uppercase tracking-wider bg-[#A47E4B] text-white rounded-xl hover:bg-[#8A673B] transition disabled:opacity-50"
            >
              {uploading ? "Uploading to Cloud..." : "Deploy to Live Portfolio"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Active Management Grid Canvas */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-serif mb-6 text-neutral-400">
            Active Records ({items.length})
          </h2>

          {items.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-3xl">
              <p className="text-sm text-neutral-500">
                No media pieces match the query records.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden bg-neutral-100 dark:bg-[#121212] rounded-2xl border border-neutral-200 dark:border-neutral-900 shadow aspect-[3/4]"
                >
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900/90 px-2 py-0.5 rounded">
                        id: {item.id.slice(0, 6)}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id, item.image_url)}
                        disabled={deletingId === item.id}
                        className="bg-red-600 hover:bg-red-700 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-lg transition disabled:bg-neutral-800"
                      >
                        {deletingId === item.id ? "Dropping..." : "✕ Drop"}
                      </button>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-[#C5A880] tracking-widest uppercase block">
                        {item.category}
                      </span>
                      <h4 className="text-white font-medium text-sm mt-0.5 truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
