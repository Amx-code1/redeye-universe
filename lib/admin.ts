import { supabase } from "@/lib/supabase";

export async function isAdmin(): Promise<boolean> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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