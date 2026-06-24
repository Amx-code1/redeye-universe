import { supabase } from "@/lib/supabase/client";

export async function isAdmin(email: string) {
  const { data } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  return !!data;
}