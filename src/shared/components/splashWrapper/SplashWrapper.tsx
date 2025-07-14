'use client'

import {useEffect, useState} from 'react'
import Image from "next/image";

export default function SplashWrapper({children}: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return (
      <div style={{width: '100%', height: '100vh', position: 'relative'}}>
        <Image src={'/splash.png'} alt={''} fill/>
     </div>
    )
  }
  return <>{children}</>
}