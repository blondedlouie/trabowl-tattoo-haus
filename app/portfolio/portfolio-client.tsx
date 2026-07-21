"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const heights = [340, 280, 310, 260, 330, 290, 350, 270, 300];

interface PortfolioItem {
  id: string;
  title: string;
  image?: string;
  image_url?: string;
}

export default function PortfolioClient({
  items = [],
}: {
  items?: PortfolioItem[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const safeItems = items || [];

  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + safeItems.length) % safeItems.length : null,
    );
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % safeItems.length : null));

  if (safeItems.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-[2rem] mx-5 md:mx-8 mt-6">
        <p className="text-sm text-neutral-500">
          No showcase items uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="p-8 md:p-12 border-b border-neutral-300 dark:border-[rgba(197,168,128,0.12)]">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#A47E4B] dark:text-[#C5A880] mb-2 font-semibold">
          OUR WORK
        </p>
        <h1 className="font-display text-[clamp(2.5rem,9vw,4.5rem)] font-black text-neutral-900 dark:text-[#F5F5F5] leading-[0.95] tracking-[-0.03em]">
          The <span className="italic text-[#C5A880]">Portfolio</span>
        </h1>
      </div>

      <div className="p-5 md:p-8 columns-1 sm:columns-2 lg:columns-3 gap-3">
        {safeItems.map((item, i) => {
          const itemImg = item.image || item.image_url || "";

          return (
            <motion.div
              key={`${item.id}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="break-inside-avoid mb-3 relative overflow-hidden rounded-[2rem] border border-neutral-300 dark:border-[rgba(197,168,128,0.12)] bg-white dark:bg-[#161616] cursor-pointer group shadow-sm"
              style={{ height: `${heights[i % heights.length]}px` }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={itemImg}
                alt={item.title || "Tattoo Artwork"}
                fill
                className="object-cover transition-transform duration-400 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.7)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-4 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-white font-medium text-sm drop-shadow-md">
                  {item.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center p-4 bg-white/95 dark:bg-[rgba(0,0,0,0.95)] backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 bg-transparent border-none text-[#C5A880] text-2xl cursor-pointer z-[510] p-2"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative h-[80vh] w-full max-w-4xl overflow-hidden rounded-[2rem]"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 70) prev();
                if (info.offset.x < -70) next();
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={
                  safeItems[lightboxIndex].image ||
                  safeItems[lightboxIndex].image_url ||
                  ""
                }
                alt={safeItems[lightboxIndex].title || "Tattoo Detail"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            <div
              className="flex items-center gap-6 mt-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={prev}
                className="bg-transparent border border-[#A47E4B]/40 dark:border-[rgba(197,168,128,0.4)] text-[#A47E4B] dark:text-[#C5A880] w-10 h-10 cursor-pointer text-base rounded-full flex items-center justify-center transition hover:bg-[#A47E4B]/10"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={next}
                className="bg-transparent border border-[#A47E4B]/40 dark:border-[rgba(197,168,128,0.4)] text-[#A47E4B] dark:text-[#C5A880] w-10 h-10 cursor-pointer text-base rounded-full flex items-center justify-center transition hover:bg-[#A47E4B]/10"
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
