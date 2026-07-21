"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export const FloatingBookNow = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-5 z-30 sm:hidden"
  >
    <Link
      href="/book"
      className="bg-[#C5A880] text-[#0B0B0B] border-none cursor-pointer px-6 py-3.5 text-[0.65rem] font-bold tracking-[0.22em] flex items-center gap-2 shadow-glow inline-block"
      style={{
        boxShadow: '0 4px 32px rgba(197,168,128,0.35)',
      }}
      aria-label="Book appointment"
    >
      <span>✦</span>
      <span>BOOK NOW</span>
    </Link>
  </motion.div>
);