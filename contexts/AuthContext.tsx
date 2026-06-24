"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { User, Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Auth timeout")), 8000),
        );

        const sessionPromise = supabase.auth.getSession();

        const result = (await Promise.race([
          sessionPromise,
          timeout,
        ])) as Awaited<ReturnType<typeof supabase.auth.getSession>>;

        if (!mounted) return;

        const session = result.data.session;

        setSession(session);
        setUser(session?.user ?? null);
      } catch (err) {
        setSession(null);
        setUser(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
