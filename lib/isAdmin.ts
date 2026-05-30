import { supabase } from "@/lib/supabase";

export async function isAdmin(email: string) {
  const { data } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  return !!data;
}