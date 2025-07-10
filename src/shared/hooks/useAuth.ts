import {useGlobalStore} from "@/shared/store/globalStore";
import {useEffect, useState} from "react";

export function useAuth () {

  const { user, setUser } = useGlobalStore(state=> state)
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    if(!user) {
      fetch('/api/me', { credentials: 'include'})
        .then(res=> {
          if (!res.ok) throw new Error('unauthenticated');
          return res.json();
        })
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  },[])

  return { user, loading, isLoggedIn: !!user }
}