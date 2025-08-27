import {useGlobalStore} from "@/shared/store/globalStore";
import {useEffect, useState} from "react";
import {useClientApi} from "@/shared/hooks/useClientApi";

export function useAuth() {

  const {user, setUser} = useGlobalStore(state => state)
  const [loading, setLoading] = useState(true);
  const api = useClientApi();

  useEffect(() => {
    if (!user) {
      api.get('/api/auths/me', {})
        .then(res => {
          if (!res.ok) throw new Error('unauthenticated');
          return res.json();
        })
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [])


  // useEffect(() => {
  //   if (!user) {
  //     fetch('/apis/api/auths/me', {credentials: 'include'})
  //       .then(res => {
  //         if (!res.ok) throw new Error('unauthenticated');
  //         return res.json();
  //       })
  //       .then(setUser)
  //       .catch(() => setUser(null))
  //       .finally(() => setLoading(false));
  //   } else {
  //     setLoading(false);
  //   }
  // }, [])

  return {user, loading, isLoggedIn: !!user}
}