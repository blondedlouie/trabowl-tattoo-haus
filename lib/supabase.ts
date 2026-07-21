import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase Environment Variables!");
  }

  return supabaseCreateClient(supabaseUrl || "", supabaseAnonKey || "");
};