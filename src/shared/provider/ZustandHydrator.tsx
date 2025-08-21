'use client';
import {ReactNode, useEffect, useRef} from "react";
import {useGlobalStore} from "@/shared/store/globalStore";

type CommonCodes = {}

interface Props {
  initial: CommonCodes;
  children: ReactNode;
}

export default function ZustandHydrator({initial, children}: Props) {

  const hydrateRef = useRef(false);
  const setCodes = useGlobalStore(state => state.setCodes);

  useEffect(() => {
    if (!hydrateRef.current) {
      setCodes(initial);
      hydrateRef.current = true;
    }
  }, [initial, setCodes]);

  return <>{children}</>
}