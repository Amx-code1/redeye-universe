"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setProfile(data);
    setLoading(false);
  }

  return {
    profile,
    loading,
    reload: loadProfile,
  };
}