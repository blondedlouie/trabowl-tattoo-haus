"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { navItems } from "@/lib/data";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"; // Import next-themes

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Ensure component is mounted to avoid SSR hydration mismatches with theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNav = () => {
    setMenuOpen(false);
  };

  // Prevent rendering incorrect theme icons on initial server load
  const isLight = mounted && theme === "light";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
        style={{
          background: isLight ? "rgba(238,234,226,0.9)" : "rgba(11,11,11,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(197,168,128,0.12)",
        }}
        data-header-theme
      >
        <nav className="frame flex h-[60px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={handleNav}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
              <Image
                src="/brand/trabowl-logo.png"
                alt="Trabowl Tattoo Haus"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-sm font-black leading-none tracking-[0.08em] text-neutral-900 dark:text-white">
                TRABOWL
              </span>
              <div className="text-[0.5rem] tracking-[0.3em] text-[#C5A880] font-medium mt-0.5">
                TATTOO HAUS · MURANGA/NAIROBI
              </div>
            </div>
            <span className="sr-only">Trabowl Tattoo Haus — Nairobi</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems
              .filter(([, href]) => href !== "/")
              .map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-[0.7rem] tracking-[0.2em] font-medium transition-colors ${
                    pathname === href
                      ? "text-[#C5A880]"
                      : "text-neutral-900 dark:text-neutral-100 hover:text-[#C5A880]"
                  }`}
                >
                  {label.toUpperCase()}
                </Link>
              ))}
            <Link
              href="/book"
              className="bg-[#C5A880] text-[#0B0B0B] border-none px-[1.1rem] py-[0.45rem] text-[0.65rem] tracking-[0.18em] font-semibold cursor-pointer transition hover:bg-neutral-200 dark:hover:bg-[#F5F5F5]"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle light mode"
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-full border border-neutral-300 dark:border-white/15 text-bronze"
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden grid p-2"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={
                    menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                  }
                  className="block w-[22px] h-[1.5px] bg-[#C5A880]"
                  style={{ transformOrigin: "center" }}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-[22px] h-[1.5px] bg-neutral-900 dark:bg-[#F5F5F5]"
                />
                <motion.span
                  animate={
                    menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                  }
                  className="block w-[22px] h-[1.5px] bg-[#C5A880]"
                  style={{ transformOrigin: "center" }}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-neutral-100 dark:bg-[#0B0B0B] flex flex-col items-start pt-[70px] p-6"
            onClick={() => setMenuOpen(false)}
          >
            {/* Decorative gold line */}
            <div className="w-10 h-px bg-[#C5A880] mb-6 ml-2" />
            {navItems.map(([label, href], i) => (
              <motion.div
                key={href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.03 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={href}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNav();
                  }}
                  className="background-none border-none cursor-pointer font-display text-2xl md:text-3xl font-bold text-left px-2 py-0.5 mt-0 block text-[#C5A880]"
                  style={{
                    color:
                      href === "/book"
                        ? "#C5A880"
                        : pathname === href
                          ? "#C5A880"
                          : undefined,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    fontStyle: href === "/book" ? "italic" : "normal",
                    fontWeight: href === "/book" ? 400 : 700,
                    fontSize: href === "/book" ? "2.2rem" : "2.8rem",
                    marginTop: href === "/book" ? "1.5rem" : 0,
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
