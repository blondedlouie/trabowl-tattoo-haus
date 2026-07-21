// app/portfolio/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0; // Prevent Next.js from caching stale data loops

import { createClient } from "@/lib/supabase";
import PortfolioClient from "./portfolio-client";

export default async function PortfolioPage() {
  const supabase = await createClient();

  // Fetch the latest studio posts using the correct column name 'category'
  const { data: posts, error } = await supabase
    .from("portfolio_posts")
    .select(
      `
      id,
      title,
      image_url,
      category
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "Database fetch failed on public portfolio page:",
      error.message,
    );
  }

  return (
    <main className="bg-[#FBF9F6] dark:bg-[#0B0B0B] min-h-screen transition-colors">
      <PortfolioClient items={posts || []} />
    </main>
  );
}
