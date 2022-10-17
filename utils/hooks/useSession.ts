import { AuthSession } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useSession() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session);
        }
        setIsLoading(false);
      }
    }

    getInitialSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;
      data?.subscription.unsubscribe();
    };
  }, []);

  return { session, isSessionLoading: isLoading };
}
