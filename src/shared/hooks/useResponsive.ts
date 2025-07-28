import { useState, useEffect } from "react";

export const useResponsive = () => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize =  () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return ()=> window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width <= 700,
    isTablet: width <= 1024 && width > 700,
    isDesktop: width > 1024
  }
}