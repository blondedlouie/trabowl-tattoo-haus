"use client";
import { ReactNode, useEffect, useState } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { FloatingBookNow } from "./floating-book-now";
export function PageShell({ children }: { children: ReactNode }) { const [point,setPoint]=useState({x:0,y:0}); const [light, setLight] = useState(false); useEffect(()=>{ const fn=(e:MouseEvent)=>setPoint({x:e.clientX,y:e.clientY}); window.addEventListener("pointermove",fn,{passive:true}); return()=>window.removeEventListener("pointermove",fn);},[]); useEffect(() => { const checkTheme = () => { setLight(document.body.dataset.theme === "light"); }; checkTheme(); const observer = new MutationObserver(checkTheme); observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] }); return () => observer.disconnect(); }, []); return <><div className="pointer-events-none fixed inset-0 z-0 hidden lg:block" style={{background:`radial-gradient(500px circle at ${point.x}px ${point.y}px, rgba(197,168,128,.075), transparent 45%)`}}/><SiteHeader/><main className="relative z-10 pt-[70px]">{children}</main><SiteFooter/><FloatingBookNow/></>; }
