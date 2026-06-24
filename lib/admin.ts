import { supabase } from "@/lib/supabase/client";

export async function isAdmin(): Promise<boolean> {
  try {
    const {
  data: { session },
} = await supabase.auth.getSession();

const user = session?.user;

    if (!user) return false;

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Admin check failed:", error);
      return false;
    }

    return data?.role === "admin";
  } catch (error) {
    console.error("Admin check exception:", error);
    return false;
  }
}