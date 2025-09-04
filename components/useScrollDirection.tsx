"use client";
import { useEffect, useState } from "react";
export default function useScrollDirection(threshold = 8){
  const [dir, setDir] = useState<'up'|'down'>('up');
  useEffect(()=>{
    let last = window.scrollY;
    const onScroll = ()=>{
      const y = window.scrollY;
      if (Math.abs(y - last) > threshold){ setDir(y > last ? 'down' : 'up'); last = y; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return ()=> window.removeEventListener('scroll', onScroll);
  },[threshold]);
  return dir;
}
