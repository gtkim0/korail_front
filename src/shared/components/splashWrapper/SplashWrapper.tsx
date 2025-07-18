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
      <div style={{width: '100%', height: '100vh', position: 'relative', display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Image
          src={'/splash.png'}
          alt=""
          width={1920}
          height={1080}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
          priority
        />
     </div>
    )
  }
  return <>{children}</>
}