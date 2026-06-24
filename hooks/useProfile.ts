"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";

export function useProfile() {
  const { user, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    loadProfile(user.id);
  }, [user, authLoading]);

  async function loadProfile(userId: string) {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error(error);
        setProfile(null);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error(error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    profile,
    loading,
    reload: () => {
      if (user) {
        loadProfile(user.id);
      }
    },
  };
}