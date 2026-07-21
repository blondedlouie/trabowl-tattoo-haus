// app/admin/portfolio/page.tsx
import { createClient } from "@/lib/supabase";
import AdminDashboardClient from "./admin-client";

export const revalidate = 0; // Prevent Next.js from caching stale data loops

export default async function AdminPortfolioPage() {
  const supabase = await createClient();

  // Fetch the latest studio posts
  const { data: posts, error } = await supabase
    .from("portfolio_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database fetch failed on Admin page:", error.message);
  }

  return (
    <main className="min-h-screen bg-[#FBF9F6] dark:bg-[#0B0B0B] transition-colors">
      <AdminDashboardClient initialItems={posts || []} />
    </main>
  );
}
